<?php
// Shared helpers for the static mailer + submissions inbox. Included by
// send.php, admin-login.php, submissions.php, submissions-action.php.

declare(strict_types=1);

function load_mail_config(): array {
    $configPath = __DIR__ . '/../mail-config.php';
    if (!is_file($configPath)) {
        fail(500, 'Email service is not configured yet');
    }
    return require $configPath;
}

function fail(int $status, string $error) {
    header('Content-Type: application/json; charset=utf-8');
    http_response_code($status);
    echo json_encode(['error' => $error]);
    exit;
}

function str_field(array $body, string $key, string $default = ''): string {
    $value = $body[$key] ?? $default;
    return is_string($value) ? trim($value) : $default;
}

function esc_html(string $value): string {
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function read_json_body(): array {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw ?: '', true);
    return is_array($body) ? $body : [];
}

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

// --- Submissions data store ------------------------------------------------
// Flat-file JSON "database" so the inbox works on plain PHP shared hosting
// with no database engine required. The file is prefixed with a PHP guard
// line that exits immediately if requested directly over HTTP, so the data
// stays private even if .htaccess protection isn't honored by the host.

function submissions_path(): string {
    $dir = __DIR__ . '/data';
    if (!is_dir($dir)) {
        mkdir($dir, 0700, true);
    }
    return $dir . '/submissions.php';
}

const SUBMISSIONS_GUARD = "<?php http_response_code(403); exit; ?>\n";

function read_submissions(): array {
    $path = submissions_path();
    if (!is_file($path)) return [];

    $fh = fopen($path, 'r');
    if ($fh === false) return [];
    flock($fh, LOCK_SH);
    $raw = stream_get_contents($fh);
    flock($fh, LOCK_UN);
    fclose($fh);

    $jsonStart = strpos($raw, "\n");
    $json = $jsonStart === false ? $raw : substr($raw, $jsonStart + 1);
    $data = json_decode($json, true);
    return is_array($data) ? $data : [];
}

function write_rows_locked($fh, array $rows): void {
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, SUBMISSIONS_GUARD . json_encode(array_values($rows), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    fflush($fh);
}

function write_submissions(array $rows): void {
    $fh = fopen(submissions_path(), 'c+');
    if ($fh === false) throw new RuntimeException('Could not open submissions store');
    flock($fh, LOCK_EX);
    write_rows_locked($fh, $rows);
    flock($fh, LOCK_UN);
    fclose($fh);
}

// Opens the store once, holds an exclusive lock for the whole
// read-modify-write, and always persists whatever $mutator returns for the
// row list. Use this (rather than read_submissions + write_submissions) for
// any read-then-write sequence, so two concurrent requests (a new form
// submission racing an admin approve/reject, say) can't clobber each other.
// $mutator: fn(array $rows): array{0: array $newRows, 1: mixed $result}
function mutate_submissions(callable $mutator) {
    $fh = fopen(submissions_path(), 'c+');
    if ($fh === false) throw new RuntimeException('Could not open submissions store');
    try {
        flock($fh, LOCK_EX);
        $raw = stream_get_contents($fh);
        $jsonStart = strpos($raw, "\n");
        $json = $jsonStart === false ? $raw : substr($raw, $jsonStart + 1);
        $rows = json_decode($json, true);
        if (!is_array($rows)) $rows = [];

        [$newRows, $result] = $mutator($rows);
        write_rows_locked($fh, $newRows);
        return $result;
    } finally {
        flock($fh, LOCK_UN);
        fclose($fh);
    }
}

function append_submission(array $row): void {
    mutate_submissions(function (array $rows) use ($row) {
        $rows[] = $row;
        return [$rows, null];
    });
}

// --- Admin auth --------------------------------------------------------
// Stateless signed token (HMAC-SHA256), independent of the front-end's mock
// CMS login — this guards real applicant PII (name/phone/email) so it must
// be verified server-side against mail-config.php credentials.

function issue_admin_token(array $config, string $username): array {
    $exp = time() + 12 * 60 * 60; // 12 hours
    $payload = base64_encode(json_encode(['sub' => $username, 'exp' => $exp]));
    $sig = base64_encode(hash_hmac('sha256', $payload, $config['admin_token_secret'], true));
    return ['token' => "$payload.$sig", 'expiresAt' => $exp * 1000];
}

function verify_admin_token(array $config, ?string $token): bool {
    if (!$token || !str_contains($token, '.')) return false;
    [$payload, $sig] = explode('.', $token, 2);
    $expectedSig = base64_encode(hash_hmac('sha256', $payload, $config['admin_token_secret'], true));
    if (!hash_equals($expectedSig, $sig)) return false;

    $data = json_decode(base64_decode($payload), true);
    if (!is_array($data) || !isset($data['exp'])) return false;
    return (int) $data['exp'] >= time();
}

function bearer_token(): ?string {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/Bearer\s+(\S+)/i', $header, $m)) return $m[1];
    return null;
}

function require_admin(array $config): void {
    if (!verify_admin_token($config, bearer_token())) {
        fail(401, 'Not authorized');
    }
}
