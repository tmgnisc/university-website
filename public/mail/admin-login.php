<?php
// Admin login for the submissions inbox. Separate from the site's front-end
// CMS login (which is a client-side mock unless a Node backend is wired
// up) — this one is verified server-side against mail-config.php, since it
// guards real applicant PII and can send approve/reject emails on their
// behalf.

declare(strict_types=1);

require __DIR__ . '/lib.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail(405, 'Method not allowed');
}

$config = load_mail_config();
$body = read_json_body();

$username = str_field($body, 'username');
$password = str_field($body, 'password');

$expectedUsername = $config['admin_username'] ?? '';
$expectedPassword = $config['admin_password'] ?? '';

if ($expectedUsername === '' || $expectedPassword === '') {
    fail(500, 'Admin login is not configured yet');
}

$usernameOk = hash_equals($expectedUsername, $username);
$passwordOk = hash_equals($expectedPassword, $password);

if (!$usernameOk || !$passwordOk) {
    fail(401, 'Invalid username or password');
}

echo json_encode(issue_admin_token($config, $username));
