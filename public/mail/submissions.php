<?php
// Lists persisted form submissions for the admin inbox. Auth required —
// this returns applicant names, phone numbers, and emails.

declare(strict_types=1);

require __DIR__ . '/lib.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    fail(405, 'Method not allowed');
}

$config = load_mail_config();
require_admin($config);

$rows = read_submissions();
usort($rows, fn($a, $b) => strcmp($b['createdAt'] ?? '', $a['createdAt'] ?? ''));

echo json_encode($rows);
