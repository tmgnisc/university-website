<?php
// Static-site apply-form mailer. Receives the same JSON payload the old
// Node backend's /api/request-form accepted and emails it via PHP's local
// mail() (the server's own Exim/sendmail) — most shared hosts block direct
// outbound SMTP to external hosts like Gmail, but always allow this.
//
// Config (recipient/from address) lives in mail-config.php (gitignored),
// one directory up.

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function fail(int $status, string $error) {
    http_response_code($status);
    echo json_encode(['error' => $error]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail(405, 'Method not allowed');
}

$configPath = __DIR__ . '/../mail-config.php';
if (!is_file($configPath)) {
    fail(500, 'Email service is not configured yet');
}
$config = require $configPath;

$raw = file_get_contents('php://input');
$body = json_decode($raw ?: '', true);
if (!is_array($body)) {
    fail(400, 'Invalid request body');
}

function str_field(array $body, string $key, string $default = ''): string {
    $value = $body[$key] ?? $default;
    return is_string($value) ? trim($value) : $default;
}

$name = str_field($body, 'name');
$phone = str_field($body, 'phone');
$email = str_field($body, 'email');
$subject = str_field($body, 'subject', 'New website request');
$program = str_field($body, 'program');
$purpose = str_field($body, 'purpose');
$address = str_field($body, 'address');
$message = str_field($body, 'message');
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

function esc_html(string $value): string {
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

$mailSubject = $subject !== '' ? $subject : "New request form submission from $name";
$mailMessage = $message !== '' ? $message : 'No message provided.';

$lines = ["New request form submission", "", "Name: $name", "Phone: $phone", "Email: $email"];
if ($address !== '') $lines[] = "Address: $address";
if ($purpose !== '') $lines[] = "Purpose: $purpose";
if ($program !== '') $lines[] = "Program / Area of interest: $program";
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
if ($teamName !== '') $htmlParts[] = "<p><strong>Team name:</strong> " . esc_html($teamName) . "</p>";
if (count($teamMembers) > 0) {
    $items = array_map(fn($m) => "<li>" . esc_html($m['name']) . " — " . esc_html($m['contact']) . "</li>", $teamMembers);
    $htmlParts[] = "<p><strong>Team members:</strong></p><ol>" . implode('', $items) . "</ol>";
}
$htmlParts[] = "<p><strong>Message:</strong></p><p>" . nl2br(esc_html($mailMessage)) . "</p>";
$html = implode("\n", $htmlParts);

function send_via_local_mail(array $config, string $to, string $replyTo, string $subject, string $text, string $html): void {
    $fromAddress = $config['mail_from_address'];
    $fromName = $config['mail_from_name'] ?? '';

    $boundary = "wcbt-" . bin2hex(random_bytes(12));
    $encodedSubject = "=?UTF-8?B?" . base64_encode($subject) . "?=";
    $fromHeader = $fromName !== '' ? "=?UTF-8?B?" . base64_encode($fromName) . "?= <$fromAddress>" : $fromAddress;

    $headers = implode("\r\n", [
        "From: $fromHeader",
        "Reply-To: <$replyTo>",
        "MIME-Version: 1.0",
        "Content-Type: multipart/alternative; boundary=\"$boundary\"",
    ]);

    $body = "--$boundary\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($text))
        . "--$boundary\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($html))
        . "--$boundary--";

    $sent = mail($to, $encodedSubject, $body, $headers, "-f$fromAddress");
    if (!$sent) {
        $error = error_get_last();
        throw new RuntimeException($error['message'] ?? 'mail() returned false');
    }
}

try {
    send_via_local_mail($config, $recipient, $email, $mailSubject, $text, $html);
} catch (Throwable $e) {
    fail(502, 'Send failed: ' . $e->getMessage());
}

// Best-effort confirmation email back to the applicant for hackathon
// registrations, sent to the address they entered in the form. Failure here
// must not fail the request — the admin notification above already went out.
if ($purpose === 'Hackathon Registration') {
    try {
        send_hackathon_confirmation($config, $email, $name, $teamName, $teamMembers);
    } catch (Throwable $e) {
        // Swallow: the registration itself already succeeded.
    }
}

echo json_encode(['ok' => true]);

function send_hackathon_confirmation(array $config, string $to, string $name, string $teamName, array $teamMembers): void {
    $subject = 'Registration successful — Hackathon at White House College';

    $lines = [
        "Hi $name,",
        "",
        "Thanks for registering for the Hackathon at White House College of Business and Technology. Your registration has been received successfully.",
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
    $lines[] = "Our team will reach out to you with further details ahead of the event.";
    $lines[] = "";
    $lines[] = "See you there!";
    $text = implode("\r\n", $lines);

    $htmlParts = [
        "<p>Hi " . esc_html($name) . ",</p>",
        "<p>Thanks for registering for the <strong>Hackathon at White House College of Business and Technology</strong>. Your registration has been received successfully.</p>",
    ];
    if ($teamName !== '') $htmlParts[] = "<p><strong>Team:</strong> " . esc_html($teamName) . "</p>";
    if (count($teamMembers) > 0) {
        $items = array_map(fn($m) => "<li>" . esc_html($m['name']) . " — " . esc_html($m['contact']) . "</li>", $teamMembers);
        $htmlParts[] = "<p><strong>Team members:</strong></p><ol>" . implode('', $items) . "</ol>";
    }
    $htmlParts[] = "<p>Our team will reach out to you with further details ahead of the event.</p>";
    $htmlParts[] = "<p>See you there!</p>";
    $html = implode("\n", $htmlParts);

    $replyTo = $config['request_form_to'] ?? $config['mail_from_address'];
    send_via_local_mail($config, $to, $replyTo, $subject, $text, $html);
}
