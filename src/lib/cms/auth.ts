// Admin auth. When VITE_CMS_API_URL is set, this calls the real backend
// (POST /api/auth/login) and stores the returned JWT. Otherwise it falls back
// to a local mock checking dev credentials from .env.

import { inboxLogin, inboxLogout } from "@/lib/mail-admin";

const TOKEN_KEY = "wcbt-cms:token";
const API_URL = import.meta.env.VITE_CMS_API_URL;
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME ?? "AdminWcbt";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "wcbt@dm!n2o26/";

export async function login(username: string, password: string): Promise<void> {
  if (API_URL) {
    const res = await fetch(`${API_URL.replace(/\/$/, "")}/api/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const message = await res
        .json()
        .then((d) => d?.error)
        .catch(() => null);
      throw new Error(message ?? "Invalid username or password");
    }
    const { token } = (await res.json()) as { token: string };
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    // Mock fallback (no backend configured).
    await new Promise((resolve) => setTimeout(resolve, 150));
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      throw new Error("Invalid username or password");
    }
    localStorage.setItem(TOKEN_KEY, btoa(`${username}:${Date.now()}`));
  }

  // Also sign into the submissions inbox with the same credentials, so
  // visiting /admin/inbox doesn't prompt for a second login. Best-effort:
  // if the PHP mailer's admin credentials differ or aren't configured yet,
  // the inbox page falls back to its own login screen.
  try {
    await inboxLogin(username, password);
  } catch {
    // Swallow — inbox login page will handle it if this didn't work.
  }
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  inboxLogout();
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}
