import nodemailer from "nodemailer";

import type { RequestFormInput } from "./schemas";

const smtpPort = Number(process.env.SMTP_PORT ?? 587);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "smtp.ethereal.email",
  port: smtpPort,
  secure: process.env.SMTP_SECURE === "true" || smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendRequestFormMail(input: RequestFormInput) {
  const recipient = process.env.REQUEST_FORM_TO ?? process.env.MAIL_TO ?? process.env.SMTP_USER;
  if (!recipient) {
    throw Object.assign(
      new Error("Email destination is not configured. Set REQUEST_FORM_TO or MAIL_TO."),
      { code: "EMAIL_CONFIG" },
    );
  }

  const from =
    process.env.MAIL_FROM ??
    (process.env.SMTP_USER ? `"WCBT Website" <${process.env.SMTP_USER}>` : undefined);
  const subject = input.subject || `New request form submission from ${input.name}`;
  const message = input.message || "No message provided.";
  const programLine = input.program ? `Program / Area of interest: ${input.program}\n` : "";
  const purposeLine = input.purpose ? `Purpose: ${input.purpose}\n` : "";
  const addressLine = input.address ? `Address: ${input.address}\n` : "";
  const teamNameLine = input.teamName ? `Team name: ${input.teamName}\n` : "";
  const teamMembersBlock =
    input.teamMembers && input.teamMembers.length > 0
      ? [
          "Team members:",
          ...input.teamMembers.map((m, i) => `  ${i + 1}. ${m.name} — ${m.contact}`),
        ].join("\n")
      : "";

  const text = [
    "New request form submission",
    "",
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `Email: ${input.email}`,
    addressLine.trim(),
    purposeLine.trim(),
    programLine.trim(),
    teamNameLine.trim(),
    teamMembersBlock,
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const teamMembersHtml =
    input.teamMembers && input.teamMembers.length > 0
      ? `<p><strong>Team members:</strong></p>
        <ol>${input.teamMembers
          .map((m) => `<li>${escapeHtml(m.name)} — ${escapeHtml(m.contact)}</li>`)
          .join("")}</ol>`
      : "";

  const html = `
    <h2>New request form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(input.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    ${input.address ? `<p><strong>Address:</strong> ${escapeHtml(input.address)}</p>` : ""}
    ${input.purpose ? `<p><strong>Purpose:</strong> ${escapeHtml(input.purpose)}</p>` : ""}
    ${input.program ? `<p><strong>Program / Area of interest:</strong> ${escapeHtml(input.program)}</p>` : ""}
    ${input.teamName ? `<p><strong>Team name:</strong> ${escapeHtml(input.teamName)}</p>` : ""}
    ${teamMembersHtml}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  const info = await transporter.sendMail({
    from,
    to: recipient,
    replyTo: input.email,
    subject,
    text,
    html,
  });

  return {
    messageId: info.messageId,
    rejected: info.rejected,
    previewUrl: nodemailer.getTestMessageUrl(info) || null,
  };
}
