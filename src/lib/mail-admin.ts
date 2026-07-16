// Client for the submissions inbox, backed by the static PHP mailer
// (public/mail/*.php) rather than the CMS's Node/SQL backend — there isn't
// one deployed for this site. Auth here is separate from the CMS's
// login/token (see cms/auth.ts): it's verified server-side against
// mail-config.php since it exposes applicant PII and can send emails.

const TOKEN_KEY = "wcbt-inbox:token";

export type TeamMember = { name: string; contact: string };

export type Submission = {
  id: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected" | "received";
  name: string;
  phone: string;
  email: string;
  address: string;
  purpose: string;
  program: string;
  eligibility: string;
  teamName: string;
  teamMembers: TeamMember[];
  message: string;
  decidedAt?: string;
};

function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function isInboxAuthenticated(): boolean {
  return getToken() !== null;
}

export function inboxLogout(): void {
  localStorage.removeItem(TOKEN_KEY);
}

// Server responses are expected to be JSON. If they're not (e.g. a broken
// mail-config.php causes a PHP fatal error, or a missing endpoint file falls
// through to the SPA's index.html catch-all), surface a clear message
// instead of crashing on `data.whatever` of null.
const UNEXPECTED_RESPONSE =
  "Server returned an unexpected response — check that the public/mail PHP files were uploaded and mail-config.php has no syntax errors.";

export async function inboxLogin(username: string, password: string): Promise<void> {
  const res = await fetch("/mail/admin-login.php", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? "Invalid username or password");
  if (!data?.token) throw new Error(UNEXPECTED_RESPONSE);
  localStorage.setItem(TOKEN_KEY, data.token);
}

async function authedFetch(path: string, init?: RequestInit): Promise<Response> {
  const token = getToken();
  const res = await fetch(path, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });
  if (res.status === 401) {
    inboxLogout();
    throw new Error("Session expired — please log in again");
  }
  return res;
}

export async function fetchSubmissions(): Promise<Submission[]> {
  const res = await authedFetch("/mail/submissions.php");
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? "Could not load submissions");
  if (!Array.isArray(data)) throw new Error(UNEXPECTED_RESPONSE);
  return data as Submission[];
}

export async function decideSubmission(
  id: string,
  action: "approve" | "reject",
): Promise<Submission> {
  const res = await authedFetch("/mail/submissions-action.php", {
    method: "POST",
    body: JSON.stringify({ id, action }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? "Could not update submission");
  if (!data?.submission) throw new Error(UNEXPECTED_RESPONSE);
  return data.submission as Submission;
}
