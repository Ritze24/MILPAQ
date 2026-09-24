import { FORMS_TO, getTransport, isMailerConfigured } from "@/lib/mailer";

const FORM_NAMES: Record<string, string> = {
  contact: "Contact Form",
  "oem-partnership": "OEM Partnership Discovery Call",
  "strategic-growth-retainer": "Strategic Growth Retainer Application",
  "packaging-rfq": "Military Packaging RFQ",
  brochure: "Brochure Download",
};

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Internal fields that are never included in the email body.
const RESERVED_FIELDS = new Set(["formName", "website"]);

function humanize(name: string) {
  const spaced = name.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export async function POST(request: Request) {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return Response.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill the "website" field.
  if (String(data.get("website") ?? "").trim()) {
    return Response.json({ ok: true });
  }

  const formLabel = FORM_NAMES[String(data.get("formName") ?? "")];
  if (!formLabel) {
    return Response.json({ error: "Unknown form." }, { status: 400 });
  }

  const email = String(data.get("email") ?? "").trim();
  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const lines: string[] = [];
  const attachments: { filename: string; content: Buffer; contentType?: string }[] = [];
  let attachmentBytes = 0;

  for (const [key, value] of data.entries()) {
    if (RESERVED_FIELDS.has(key)) continue;
    if (typeof value === "string") {
      const text = value === "on" ? "Yes" : value.trim();
      if (text) lines.push(`${humanize(key)}: ${text}`);
    } else if (value.size > 0) {
      attachmentBytes += value.size;
      if (attachmentBytes > MAX_ATTACHMENT_BYTES) {
        return Response.json(
          { error: "Attachments must be 10 MB or smaller in total." },
          { status: 413 },
        );
      }
      attachments.push({
        filename: value.name || "attachment",
        content: Buffer.from(await value.arrayBuffer()),
        contentType: value.type || undefined,
      });
      lines.push(`${humanize(key)}: ${value.name} (attached)`);
    }
  }

  if (!isMailerConfigured()) {
    console.error("[forms] SMTP_USER/SMTP_PASS not set; submission not sent:", formLabel);
    return Response.json(
      { error: "We couldn't send your submission right now. Please email milpaq@305aerosupplies.com directly." },
      { status: 503 },
    );
  }

  const submitter =
    String(data.get("name") ?? data.get("contactName") ?? "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 100) || email;

  try {
    await getTransport().sendMail({
      from: `"MILPAQ Website" <${process.env.SMTP_USER}>`,
      to: FORMS_TO,
      replyTo: email,
      subject: `[milpaq.com] ${formLabel} — ${submitter}`,
      text: `New ${formLabel} submission from milpaq.com\n\n${lines.join("\n")}\n`,
      attachments,
    });
  } catch (error) {
    console.error("[forms] Failed to send submission:", formLabel, error);
    return Response.json(
      { error: "We couldn't send your submission right now. Please email milpaq@305aerosupplies.com directly." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
