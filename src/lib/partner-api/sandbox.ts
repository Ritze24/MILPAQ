import type { Pool } from "mysql2/promise";
import { rows } from "./db.ts";
import { buildStubPdf } from "./pdf.ts";
import { changeStatus, type QuoteRequestRow } from "./service.ts";

// Sandbox only. A scheduled tick moves test requests through their lifecycle so
// partners can exercise every status without MILPAQ staff involvement.
//
// The scenario is chosen by the solicitation number:
//   contains INFO     → under_review → additional_information_required (waits for a
//                       message) → under_review → quote_completed
//   contains DECLINE  → under_review → declined
//   contains CANCEL   → under_review → cancelled
//   anything else     → under_review → quote_completed
const STEP_AFTER_SECONDS = 30;

export async function advanceSandbox(pool: Pool): Promise<number> {
  const cutoff = new Date(Date.now() - STEP_AFTER_SECONDS * 1000);
  const waiting = await rows<QuoteRequestRow>(
    pool,
    "SELECT * FROM quote_requests WHERE status IN ('received', 'under_review') AND updated_at <= ? ORDER BY updated_at LIMIT 50",
    [cutoff],
  );
  let advanced = 0;
  for (const row of waiting) {
    try {
      if (row.status === "received") {
        await changeStatus(pool, "sandbox", row.id, "under_review");
      } else {
        const sol = row.solicitation_number.toUpperCase();
        if (sol.includes("DECLINE")) {
          await changeStatus(pool, "sandbox", row.id, "declined", { message: "Sandbox: declined by the test scenario." });
        } else if (sol.includes("CANCEL")) {
          await changeStatus(pool, "sandbox", row.id, "cancelled", { message: "Sandbox: cancelled by the test scenario." });
        } else if (sol.includes("INFO") && !(await hasPartnerReply(pool, row.id))) {
          await changeStatus(pool, "sandbox", row.id, "additional_information_required", {
            message: "Sandbox: please confirm the packaged unit dimensions.",
          });
        } else {
          const number = `MILPAQ-Q-SBX-${row.id.slice(-6)}`;
          await changeStatus(pool, "sandbox", row.id, "quote_completed", {
            quote: {
              currency: "USD",
              packagingPrice: 425,
              shippingPrice: 75,
              totalAmount: 500,
              quoteNumber: number,
              expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              notes: "Sandbox quote. Not a real quotation.",
            },
            quotePdf: { bytes: buildStubPdf(`MILPAQ sandbox quote ${number} - test data only`), filename: `${number}.pdf` },
          });
        }
      }
      advanced++;
    } catch (err) {
      console.error("[partner-api] sandbox advance failed", row.id, err instanceof Error ? err.message : "unknown");
    }
  }
  return advanced;
}

async function hasPartnerReply(pool: Pool, requestId: string): Promise<boolean> {
  const found = await rows<{ n: number }>(pool, "SELECT COUNT(*) AS n FROM request_messages WHERE request_id = ? AND direction = 'partner'", [requestId]);
  return (found[0]?.n ?? 0) > 0;
}
