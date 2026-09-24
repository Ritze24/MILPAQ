import nodemailer from "nodemailer";

// Form submissions are sent through the milpaq.com mailbox on Hostinger.
// SMTP_USER / SMTP_PASS are set as environment variables on the Hostinger
// Web App (never committed). FORMS_TO (comma-separated) overrides recipients.
export const FORMS_TO =
  process.env.FORMS_TO || "milpaq@305aerosupplies.com";

export function isMailerConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

export function getTransport() {
  const port = Number(process.env.SMTP_PORT || 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}
