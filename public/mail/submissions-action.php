<?php
// Approve or reject a hackathon team registration. Sends the applicant an
// email with the decision and updates the persisted record. Auth required.

declare(strict_types=1);

require __DIR__ . '/lib.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail(405, 'Method not allowed');
}

$config = load_mail_config();
require_admin($config);

$body = read_json_body();
$id = str_field($body, 'id');
$action = str_field($body, 'action');

if ($id === '') fail(400, 'Missing submission id');
if (!in_array($action, ['approve', 'reject'], true)) fail(400, 'Action must be approve or reject');

// The whole find + validate + status flip + email send happens inside one
// locked read-modify-write, so a double-click or a second admin tab can't
// race and send two decision emails for the same submission.
$result = mutate_submissions(function (array $rows) use ($id, $action, $config) {
    $index = null;
    foreach ($rows as $i => $row) {
        if (($row['id'] ?? '') === $id) {
            $index = $i;
            break;
        }
    }
    if ($index === null) return [$rows, ['error' => [404, 'Submission not found']]];

    $submission = $rows[$index];
    if (($submission['purpose'] ?? '') !== 'Hackathon Registration') {
        return [$rows, ['error' => [400, 'Only hackathon registrations can be approved or rejected']]];
    }
    if (($submission['status'] ?? '') !== 'pending') {
        return [$rows, ['error' => [409, 'This submission has already been decided']]];
    }

    $newStatus = $action === 'approve' ? 'approved' : 'rejected';
    $rows[$index]['status'] = $newStatus;
    $rows[$index]['decidedAt'] = date(DATE_ATOM);

    $email = (string) ($submission['email'] ?? '');
    $name = (string) ($submission['name'] ?? '');
    $teamName = (string) ($submission['teamName'] ?? '');
    $teamMembers = is_array($submission['teamMembers'] ?? null) ? $submission['teamMembers'] : [];

    $mailError = null;
    if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        try {
            send_hackathon_decision_mail($config, $email, $name, $teamName, $teamMembers, $newStatus === 'approved');
        } catch (Throwable $e) {
            $mailError = $e->getMessage();
        }
    }

    return [$rows, ['submission' => $rows[$index], 'mailError' => $mailError]];
});

if (isset($result['error'])) {
    [$status, $message] = $result['error'];
    fail($status, $message);
}

echo json_encode(['ok' => true, 'submission' => $result['submission'], 'mailError' => $result['mailError']]);

function send_hackathon_decision_mail(array $config, string $to, string $name, string $teamName, array $teamMembers, bool $approved): void {
    $subject = $approved
        ? 'Your team has been approved — Hackathon at White House College'
        : 'Update on your Hackathon registration — White House College';

    $lines = ["Hi $name,", ""];
    if ($approved) {
        $lines[] = "Great news — your team has been reviewed and approved for the Hackathon at White House College of Business and Technology.";
    } else {
        $lines[] = "Thank you for registering for the Hackathon at White House College of Business and Technology. After review, we're not able to confirm your team's spot for this event.";
    }
    $lines[] = "";
    if ($teamName !== '') $lines[] = "Team: $teamName";
    if (count($teamMembers) > 0) {
        $lines[] = "Team members:";
        foreach ($teamMembers as $i => $m) {
            $memberName = is_array($m) ? ($m['name'] ?? '') : '';
            $memberContact = is_array($m) ? ($m['contact'] ?? '') : '';
            $lines[] = "  " . ($i + 1) . ". $memberName — $memberContact";
        }
    }
    $lines[] = "";
    $lines[] = $approved
        ? "Our team will follow up shortly with event details and next steps."
        : "We hope to see you at future events — thanks again for your interest.";
    $text = implode("\r\n", $lines);

    $htmlParts = ["<p>Hi " . esc_html($name) . ",</p>"];
    $htmlParts[] = $approved
        ? "<p>Great news — your team has been reviewed and <strong>approved</strong> for the Hackathon at White House College of Business and Technology.</p>"
        : "<p>Thank you for registering for the Hackathon at White House College of Business and Technology. After review, we're not able to confirm your team's spot for this event.</p>";
    if ($teamName !== '') $htmlParts[] = "<p><strong>Team:</strong> " . esc_html($teamName) . "</p>";
    if (count($teamMembers) > 0) {
        $items = array_map(function ($m) {
            $memberName = is_array($m) ? ($m['name'] ?? '') : '';
            $memberContact = is_array($m) ? ($m['contact'] ?? '') : '';
            return "<li>" . esc_html($memberName) . " — " . esc_html($memberContact) . "</li>";
        }, $teamMembers);
        $htmlParts[] = "<p><strong>Team members:</strong></p><ol>" . implode('', $items) . "</ol>";
    }
    $htmlParts[] = $approved
        ? "<p>Our team will follow up shortly with event details and next steps.</p>"
        : "<p>We hope to see you at future events — thanks again for your interest.</p>";
    $html = implode("\n", $htmlParts);

    $replyTo = $config['request_form_to'] ?? $config['mail_from_address'];
    send_via_local_mail($config, $to, $replyTo, $subject, $text, $html);
}
