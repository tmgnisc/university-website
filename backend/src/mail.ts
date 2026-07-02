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
  const programLine = input.program ? `Program: ${input.program}\n` : "";

  const text = [
    "New request form submission",
    "",
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `Email: ${input.email}`,
    programLine.trim(),
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <h2>New request form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(input.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    ${input.program ? `<p><strong>Program:</strong> ${escapeHtml(input.program)}</p>` : ""}
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
