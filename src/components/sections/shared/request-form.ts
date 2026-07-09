// Shared "send request form" submission helper used by ContactSection and
// ApplicationForm. Front-end only for now (posts to the backend's
// /api/request-form route); see backend/src/mail.ts for delivery.

export const FIELD_CLASS = "w-full h-12 rounded-xl border border-input bg-background px-4 text-sm";

export type RequestFormPayload = {
  name: string;
  phone: string;
  email: string;
  subject?: string;
  program?: string;
  purpose?: string;
  address?: string;
  message?: string;
};

export async function sendRequestForm(payload: RequestFormPayload) {
  const apiBase = import.meta.env.VITE_CMS_API_URL?.replace(/\/$/, "") ?? "";
  const response = await fetch(`${apiBase}/api/request-form`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error ?? "Could not send your request. Please try again.");
  }
}
