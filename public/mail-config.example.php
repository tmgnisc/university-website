<?php
// Copy this file to mail-config.php (same directory) and fill in real values.
// mail-config.php is gitignored — never commit real credentials.
//
// Sends via the server's own local mail (PHP mail()) rather than an external
// SMTP server, since most shared hosts block outbound SMTP to hosts like Gmail.
// mail_from_address should be a mailbox on the same domain as this site, or
// receiving mail servers may flag it as spoofed.

return [
    'mail_from_name' => 'WCBT Website',
    'mail_from_address' => 'info@whitehouseeducation.edu.np',

    'request_form_to' => 'info@whitehouseeducation.edu.np',

    // Admin credentials for the submissions inbox (/admin/inbox). Verified
    // server-side on every request — pick a real password and keep this
    // file private (it's gitignored, but also set restrictive file
    // permissions on the server, e.g. chmod 600).
    'admin_username' => 'admin',
    'admin_password' => 'change-me',

    // Random secret used to sign admin session tokens. Generate one with:
    // php -r "echo bin2hex(random_bytes(32));"
    'admin_token_secret' => 'change-me-to-a-long-random-string',
];
