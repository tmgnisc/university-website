<?php
// Static-site apply-form mailer. Receives the same JSON payload the old
// Node backend's /api/request-form accepted, emails it via PHP's local
// mail() (the server's own Exim/sendmail) — most shared hosts block direct
// outbound SMTP to external hosts like Gmail, but always allow this — and
// persists a copy so the admin inbox (see submissions.php) can list it.
//
// Config (recipient/from address/admin credentials) lives in mail-config.php
// (gitignored), one directory up.

declare(strict_types=1);

require __DIR__ . '/lib.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail(405, 'Method not allowed');
}

$config = load_mail_config();
$body = read_json_body();
if ($body === []) {
    fail(400, 'Invalid request body');
}

$name = str_field($body, 'name');
$phone = str_field($body, 'phone');
$email = str_field($body, 'email');
$subject = str_field($body, 'subject', 'New website request');
$program = str_field($body, 'program');
$purpose = str_field($body, 'purpose');
$address = str_field($body, 'address');
$message = str_field($body, 'message');
$eligibility = str_field($body, 'eligibility');
$teamName = str_field($body, 'teamName');

$teamMembers = [];
if (is_array($body['teamMembers'] ?? null)) {
    foreach ($body['teamMembers'] as $member) {
        if (!is_array($member)) continue;
        $memberName = is_string($member['name'] ?? null) ? trim($member['name']) : '';
        $memberContact = is_string($member['contact'] ?? null) ? trim($member['contact']) : '';
        if ($memberName !== '' || $memberContact !== '') {
            $teamMembers[] = ['name' => $memberName, 'contact' => $memberContact];
        }
    }
}

if ($name === '') fail(400, 'Full name is required');
if ($phone === '') fail(400, 'Phone number is required');
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) fail(400, 'Valid email is required');

$recipient = $config['request_form_to'] ?? '';
if ($recipient === '') fail(500, 'Email service is not configured yet');

$mailSubject = $subject !== '' ? $subject : "New request form submission from $name";
$mailMessage = $message !== '' ? $message : 'No message provided.';

$lines = ["New request form submission", "", "Name: $name", "Phone: $phone", "Email: $email"];
if ($address !== '') $lines[] = "Address: $address";
if ($purpose !== '') $lines[] = "Purpose: $purpose";
if ($program !== '') $lines[] = "Program / Area of interest: $program";
if ($eligibility !== '') $lines[] = "Eligibility: $eligibility";
if ($teamName !== '') $lines[] = "Team name: $teamName";
if (count($teamMembers) > 0) {
    $lines[] = "Team members:";
    foreach ($teamMembers as $i => $m) {
        $lines[] = "  " . ($i + 1) . ". {$m['name']} — {$m['contact']}";
    }
}
$lines[] = "";
$lines[] = "Message:";
$lines[] = $mailMessage;
$text = implode("\r\n", $lines);

$htmlParts = [
    "<h2>New request form submission</h2>",
    "<p><strong>Name:</strong> " . esc_html($name) . "</p>",
    "<p><strong>Phone:</strong> " . esc_html($phone) . "</p>",
    "<p><strong>Email:</strong> " . esc_html($email) . "</p>",
];
if ($address !== '') $htmlParts[] = "<p><strong>Address:</strong> " . esc_html($address) . "</p>";
if ($purpose !== '') $htmlParts[] = "<p><strong>Purpose:</strong> " . esc_html($purpose) . "</p>";
if ($program !== '') $htmlParts[] = "<p><strong>Program / Area of interest:</strong> " . esc_html($program) . "</p>";
if ($eligibility !== '') $htmlParts[] = "<p><strong>Eligibility:</strong> " . esc_html($eligibility) . "</p>";
if ($teamName !== '') $htmlParts[] = "<p><strong>Team name:</strong> " . esc_html($teamName) . "</p>";
if (count($teamMembers) > 0) {
    $items = array_map(fn($m) => "<li>" . esc_html($m['name']) . " — " . esc_html($m['contact']) . "</li>", $teamMembers);
    $htmlParts[] = "<p><strong>Team members:</strong></p><ol>" . implode('', $items) . "</ol>";
}
$htmlParts[] = "<p><strong>Message:</strong></p><p>" . nl2br(esc_html($mailMessage)) . "</p>";
$html = implode("\n", $htmlParts);

try {
    send_via_local_mail($config, $recipient, $email, $mailSubject, $text, $html);
} catch (Throwable $e) {
    fail(502, 'Send failed: ' . $e->getMessage());
}

// Persist a copy for the admin inbox. Hackathon registrations start out
// "pending" so they show up for approve/reject; everything else is just a
// record of the query (no action needed) and is stored as "received".
$isHackathonRegistration = $purpose === 'Hackathon Registration';
append_submission([
    'id' => bin2hex(random_bytes(12)),
    'createdAt' => date(DATE_ATOM),
    'status' => $isHackathonRegistration ? 'pending' : 'received',
    'name' => $name,
    'phone' => $phone,
    'email' => $email,
    'address' => $address,
    'purpose' => $purpose,
    'program' => $program,
    'eligibility' => $eligibility,
    'teamName' => $teamName,
    'teamMembers' => $teamMembers,
    'message' => $message,
]);

// Best-effort confirmation email back to the applicant for hackathon
// registrations, sent to the address they entered in the form. Failure here
// must not fail the request — the admin notification above already went out.
if ($isHackathonRegistration) {
    try {
        send_hackathon_confirmation($config, $email, $name, $teamName, $teamMembers);
    } catch (Throwable $e) {
        // Swallow: the registration itself already succeeded.
    }
}

echo json_encode(['ok' => true]);

function send_hackathon_confirmation(array $config, string $to, string $name, string $teamName, array $teamMembers): void {
    $subject = 'Registration received — Hackathon at White House College';

    $lines = [
        "Hi $name,",
        "",
        "Thanks for registering for the Hackathon at White House College of Business and Technology. Your registration has been received and is pending review.",
        "",
    ];
    if ($teamName !== '') $lines[] = "Team: $teamName";
    if (count($teamMembers) > 0) {
        $lines[] = "Team members:";
        foreach ($teamMembers as $i => $m) {
            $lines[] = "  " . ($i + 1) . ". {$m['name']} — {$m['contact']}";
        }
    }
    $lines[] = "";
    $lines[] = "We'll email you once your team has been reviewed.";
    $lines[] = "";
    $lines[] = "See you there!";
    $text = implode("\r\n", $lines);

    $htmlParts = [
        "<p>Hi " . esc_html($name) . ",</p>",
        "<p>Thanks for registering for the <strong>Hackathon at White House College of Business and Technology</strong>. Your registration has been received and is pending review.</p>",
    ];
    if ($teamName !== '') $htmlParts[] = "<p><strong>Team:</strong> " . esc_html($teamName) . "</p>";
    if (count($teamMembers) > 0) {
        $items = array_map(fn($m) => "<li>" . esc_html($m['name']) . " — " . esc_html($m['contact']) . "</li>", $teamMembers);
        $htmlParts[] = "<p><strong>Team members:</strong></p><ol>" . implode('', $items) . "</ol>";
    }
    $htmlParts[] = "<p>We'll email you once your team has been reviewed.</p>";
    $htmlParts[] = "<p>See you there!</p>";
    $html = implode("\n", $htmlParts);

    $replyTo = $config['request_form_to'] ?? $config['mail_from_address'];
    send_via_local_mail($config, $to, $replyTo, $subject, $text, $html);
}
