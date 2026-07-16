// Shared "send request form" submission helper used by ContactSection and
// ApplicationForm. Posts to the static PHP mailer at /mail/send.php (see
// public/mail/send.php), which ships alongside the static build — no Node
// backend required.

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
  eligibility?: string;
  teamName?: string;
  teamMembers?: { name: string; contact: string }[];
};

export async function sendRequestForm(payload: RequestFormPayload) {
  const response = await fetch("/mail/send.php", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error ?? "Could not send your request. Please try again.");
  }
}
