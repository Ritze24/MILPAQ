import { LIMITS } from "./config.ts";
import { hasPdfMagic } from "./pdf.ts";
import type { QuoteInput } from "./service.ts";

export type QuoteFormResult = { ok: true; quote: QuoteInput; pdf: Uint8Array; pdfName: string } | { ok: false; error: string };

const money = (raw: FormDataEntryValue | null): number | null => {
  const text = typeof raw === "string" ? raw.trim().replace(/,/g, "") : "";
  if (!/^\d{1,9}(\.\d{1,2})?$/.test(text)) return null;
  return Math.round(Number(text) * 100) / 100;
};

// Turns the staff "complete quote" form into the API's quote block. The total is
// always packaging + shipping, computed here so it can never disagree.
export async function parseQuoteForm(form: FormData, now = new Date()): Promise<QuoteFormResult> {
  const currency = String(form.get("currency") ?? "USD").trim().toUpperCase();
  if (!/^[A-Z]{3}$/.test(currency)) return { ok: false, error: "Currency must be a 3-letter code such as USD." };

  const packaging = money(form.get("packaging_price"));
  if (packaging === null || packaging <= 0) return { ok: false, error: "Enter a packaging price greater than 0 (up to 2 decimals)." };

  const shippingRaw = String(form.get("shipping_price") ?? "").trim();
  const shipping = shippingRaw === "" ? null : money(shippingRaw);
  if (shippingRaw !== "" && shipping === null) return { ok: false, error: "Shipping price must be a number with up to 2 decimals, or left blank." };

  const quoteNumber = String(form.get("quote_number") ?? "").trim();
  if (!/^[A-Za-z0-9._-]{3,40}$/.test(quoteNumber)) return { ok: false, error: "Quote number must be 3-40 letters, digits, dots, dashes or underscores." };

  const expiry = String(form.get("expires_on") ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(expiry)) return { ok: false, error: "Choose an expiry date." };
  const expiresAt = new Date(`${expiry}T23:59:59.000Z`);
  if (Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() <= now.getTime()) return { ok: false, error: "The expiry date must be in the future." };

  const notes = String(form.get("notes") ?? "").trim().slice(0, 2000) || null;

  const file = form.get("quote_pdf");
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Attach the quote as a PDF." };
  if (file.size > LIMITS.maxPdfBytes) return { ok: false, error: "The PDF is larger than 10 MB." };
  const pdf = new Uint8Array(await file.arrayBuffer());
  if (!hasPdfMagic(pdf)) return { ok: false, error: "The attached file is not a PDF." };

  const total = Math.round((packaging + (shipping ?? 0)) * 100) / 100;
  return {
    ok: true,
    quote: { currency, packagingPrice: packaging, shippingPrice: shipping, totalAmount: total, quoteNumber, expiresAt, notes },
    pdf,
    pdfName: file.name || "quote.pdf",
  };
}
