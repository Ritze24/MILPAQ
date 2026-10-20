import { after } from "next/server";
import { LIMITS } from "@/lib/partner-api/config";
import { ApiError, jsonResponse, type FieldError } from "@/lib/partner-api/errors";
import { authenticate, handle } from "@/lib/partner-api/auth";
import { hasPdfMagic } from "@/lib/partner-api/pdf";
import { createQuoteRequest, enforceRateLimit } from "@/lib/partner-api/service";
import { validateMetadata } from "@/lib/partner-api/validate";
import { dispatchDelivery } from "@/lib/partner-api/webhooks";

export const dynamic = "force-dynamic";

// POST /api/v1/quote-requests: multipart/form-data with a `metadata` part
// (JSON) and a `solicitation_pdf` part. See docs/partner-api-openapi.yaml.
export async function POST(request: Request) {
  return handle(async () => {
    // Cheap size check before the body is buffered.
    if (Number(request.headers.get("content-length") ?? "0") > LIMITS.maxBodyBytes) {
      throw new ApiError("payload_too_large", "Request body is too large. The solicitation PDF may be at most 10 MB.");
    }
    const ctx = await authenticate(request);
    await enforceRateLimit(ctx, "submit", LIMITS.submitPerMinute);

    if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("multipart/form-data")) {
      throw new ApiError("invalid_request", "Content-Type must be multipart/form-data.");
    }
    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      throw new ApiError("invalid_request", "The multipart body could not be read.");
    }

    const errors: FieldError[] = [];

    // `metadata` may arrive as a plain string or as a file part (some HTTP
    // clients send JSON as a Blob, which surfaces here as a File).
    const metadataPart = form.get("metadata");
    let rawMetadata: unknown = undefined;
    if (metadataPart === null) {
      errors.push({ field: "metadata", code: "required", message: "The metadata part is required." });
    } else {
      const text = typeof metadataPart === "string" ? metadataPart : await metadataPart.text();
      try {
        rawMetadata = JSON.parse(text);
      } catch {
        errors.push({ field: "metadata", code: "invalid_json", message: "metadata must be valid JSON." });
      }
    }
    const parsed = rawMetadata === undefined ? null : validateMetadata(rawMetadata);
    if (parsed && !parsed.ok) errors.push(...parsed.errors);

    let pdf: Uint8Array | null = null;
    let pdfName = "solicitation.pdf";
    const pdfPart = form.get("solicitation_pdf");
    if (pdfPart === null) {
      errors.push({ field: "solicitation_pdf", code: "required", message: "The solicitation_pdf part is required." });
    } else if (typeof pdfPart === "string") {
      errors.push({ field: "solicitation_pdf", code: "invalid_type", message: "solicitation_pdf must be a file part." });
    } else if (pdfPart.size === 0) {
      errors.push({ field: "solicitation_pdf", code: "required", message: "The solicitation PDF is empty." });
    } else if (pdfPart.size > LIMITS.maxPdfBytes) {
      errors.push({ field: "solicitation_pdf", code: "too_large", message: "The solicitation PDF must be 10 MB or smaller." });
    } else {
      const bytes = new Uint8Array(await pdfPart.arrayBuffer());
      if (!hasPdfMagic(bytes)) {
        errors.push({ field: "solicitation_pdf", code: "invalid_format", message: "The solicitation file is not a PDF." });
      } else {
        pdf = bytes;
        pdfName = pdfPart.name || pdfName;
      }
    }

    const idempotencyKey = request.headers.get("idempotency-key")?.trim() ?? "";
    if (!idempotencyKey) {
      errors.push({ field: "Idempotency-Key", code: "required", message: "The Idempotency-Key header is required." });
    } else if (parsed?.ok && idempotencyKey !== parsed.value.externalRequestId) {
      errors.push({ field: "Idempotency-Key", code: "mismatch", message: "Idempotency-Key must equal external_request_id." });
    }

    if (errors.length > 0 || !parsed?.ok || !pdf) {
      throw new ApiError("validation_failed", "One or more fields are invalid.", errors);
    }

    const result = await createQuoteRequest(ctx, { idempotencyKey, meta: parsed.value, pdf, pdfName });
    if (!result.replayed && result.deliveryId) {
      const deliveryId = result.deliveryId;
      after(() => dispatchDelivery(ctx.pool, ctx.env, deliveryId));
    }
    return jsonResponse(
      {
        request_id: result.row.id,
        external_request_id: result.row.external_request_id,
        status: result.row.status,
        received_at: result.row.received_at.toISOString(),
        validation_errors: [],
      },
      result.replayed ? 200 : 201,
      result.replayed ? { "Idempotent-Replayed": "true" } : {},
    );
  });
}
