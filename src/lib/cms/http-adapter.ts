import type { Collection, CmsAdapter, Singleton } from "./adapter";
import { getToken } from "./auth";

// HTTP implementation of CmsAdapter for the future Node/SQL backend. Activated
// automatically when VITE_CMS_API_URL is set (see client.ts). The endpoint shape
// is documented in docs/superpowers/specs/2026-06-20-admin-cms-design.md.

async function request<T>(baseUrl: string, path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(message || `Request failed (${res.status})`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

function collection<T, TInput>(baseUrl: string, resource: string): Collection<T, TInput> {
  const base = `/api/${resource}`;
  return {
    list: () => request<T[]>(baseUrl, base),
    get: (id) => request<T | null>(baseUrl, `${base}/${id}`),
    create: (input) => request<T>(baseUrl, base, { method: "POST", body: JSON.stringify(input) }),
    update: (id, input) =>
      request<T>(baseUrl, `${base}/${id}`, { method: "PUT", body: JSON.stringify(input) }),
    remove: (id) => request<void>(baseUrl, `${base}/${id}`, { method: "DELETE" }),
  };
}

function singleton<T>(baseUrl: string, resource: string): Singleton<T> {
  const base = `/api/${resource}`;
  return {
    get: () => request<T>(baseUrl, base),
    update: (value) => request<T>(baseUrl, base, { method: "PUT", body: JSON.stringify(value) }),
  };
}

export function httpAdapter(baseUrl: string): CmsAdapter {
  const url = baseUrl.replace(/\/$/, "");
  return {
    openings: collection(url, "openings"),
    chatbotEntries: collection(url, "chatbot-entries"),
    programs: collection(url, "programs"),
    news: collection(url, "news"),
    scholarships: collection(url, "scholarships"),
    botSettings: singleton(url, "bot-settings"),
    siteContact: singleton(url, "site-contact"),
    siteMeta: singleton(url, "site-meta"),
    homeStats: singleton(url, "home-stats"),
  };
}
