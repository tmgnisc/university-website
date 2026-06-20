// Admin auth. When VITE_CMS_API_URL is set, this calls the real backend
// (POST /api/auth/login) and stores the returned JWT. Otherwise it falls back
// to a local mock checking dev credentials from .env.

const TOKEN_KEY = "wcbt-cms:token";
const API_URL = import.meta.env.VITE_CMS_API_URL;
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "admin123";

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
    return;
  }

  // Mock fallback (no backend configured).
  await new Promise((resolve) => setTimeout(resolve, 150));
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem(TOKEN_KEY, btoa(`${username}:${Date.now()}`));
    return;
  }
  throw new Error("Invalid username or password");
}

export function logout(): void {
  if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}
