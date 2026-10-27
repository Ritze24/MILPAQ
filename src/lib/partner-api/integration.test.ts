import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomBytes } from "node:crypto";
import { SUPPORTED_TERMS_VERSIONS } from "./config.ts";

// Runs only when PARTNER_TEST_DB_URL points at a MySQL/MariaDB database whose
// name contains "sandbox" or "test". It creates the partner schema there and
// writes rows, so it must never be pointed at the live database.
const url = process.env.PARTNER_TEST_DB_URL;
const dbName = url ? new URL(url).pathname.replace(/^\//, "") : "";
const enabled = Boolean(url) && /sandbox|test/i.test(dbName);

const body = (ext: string, solicitation = "SPE3SE-27-T-0021") => ({
  external_request_id: ext,
  company: { name: "Example Supply Company" },
  contact: { name: "Jane Smith", email: "jane@example.com", phone: "+1-555-555-0100" },
  solicitation: { number: solicitation },
  packaging: {
    number_of_units: 12,
    unit_dimensions: { length: 18, width: 14, height: 12, unit: "in" },
    unit_weight: { value: 25.5, unit: "lb" },
    source_origin_inspection_required: true,
    destination_inspection_required: false,
  },
  terms_acceptance: { accepted: true, version: SUPPORTED_TERMS_VERSIONS[0], accepted_at: new Date().toISOString(), accepted_by_user_id: "u1" },
});

test("partner API against a real database", { skip: enabled ? false : "set PARTNER_TEST_DB_URL (db name must contain sandbox or test)" }, async () => {
  process.env.PARTNER_DB_SANDBOX_URL = url;
  process.env.PARTNER_STORAGE_DIR = mkdtempSync(join(tmpdir(), "milpaq-partner-"));
  process.env.PARTNER_MASTER_KEY = randomBytes(32).toString("base64");

  const { requirePool, rows, exec } = await import("./db.ts");
  const { createPartner, rotateWebhookSecret, retireOldWebhookSecrets } = await import("./admin.ts");
  const { createQuoteRequest, getRequestForPartner, changeStatus, addPartnerMessage, toApiView } = await import("./service.ts");
  const { validateMetadata } = await import("./validate.ts");
  const { buildStubPdf } = await import("./pdf.ts");
  const { dispatchDue } = await import("./webhooks.ts");
  const { advanceSandbox } = await import("./sandbox.ts");

  const pool = await requirePool("sandbox");
  await requirePool("sandbox"); // second call: migrations must be idempotent

  const suffix = randomBytes(4).toString("hex");
  const { partnerId, apiKey } = await createPartner(pool, "sandbox", { name: `selftest-${suffix}`, webhookUrl: "https://example.com/hook" });
  assert.match(apiKey, /^mpq_test_/);
  const ctx = { env: "sandbox" as const, pool, partnerId, keyId: 0 };
  const pdf = buildStubPdf("selftest");

  const parse = (b: object) => {
    const r = validateMetadata(b, new Date());
    assert.ok(r.ok);
    return r.value;
  };

  // create + idempotent replay + conflict
  const meta = parse(body(`ext-${suffix}`));
  const a = await createQuoteRequest(ctx, { idempotencyKey: `ext-${suffix}`, meta, pdf, pdfName: "s.pdf" });
  assert.equal(a.replayed, false);
  const b = await createQuoteRequest(ctx, { idempotencyKey: `ext-${suffix}`, meta, pdf, pdfName: "s.pdf" });
  assert.equal(b.replayed, true);
  assert.equal(b.row.id, a.row.id);
  await assert.rejects(createQuoteRequest(ctx, { idempotencyKey: `ext-${suffix}`, meta: parse({ ...body(`ext-${suffix}`), additional_notes: "changed" }), pdf, pdfName: "s.pdf" }), /different request content/);

  // concurrent identical submissions create exactly one row
  const m2 = parse(body(`race-${suffix}`));
  const race = await Promise.allSettled([1, 2, 3, 4].map(() => createQuoteRequest(ctx, { idempotencyKey: `race-${suffix}`, meta: m2, pdf, pdfName: "s.pdf" })));
  assert.ok(race.every((r) => r.status === "fulfilled"));
  const [{ n }] = await rows<{ n: number }>(pool, "SELECT COUNT(*) AS n FROM quote_requests WHERE partner_id = ? AND external_request_id = ?", [partnerId, `race-${suffix}`]);
  assert.equal(Number(n), 1);

  // lifecycle: information request -> partner reply -> completed with quote
  await changeStatus(pool, "sandbox", a.row.id, "under_review");
  await changeStatus(pool, "sandbox", a.row.id, "additional_information_required", { message: "Need the NSN" });
  await assert.rejects(changeStatus(pool, "sandbox", a.row.id, "quote_completed"), /Cannot move|Completing/);
  await addPartnerMessage(ctx, a.row.id, "NSN 1234", []);
  await changeStatus(pool, "sandbox", a.row.id, "quote_completed", {
    quote: { currency: "USD", packagingPrice: 425, shippingPrice: 75, totalAmount: 500, quoteNumber: "Q-1", expiresAt: new Date(Date.now() + 864e5), notes: null },
    quotePdf: { bytes: buildStubPdf("quote"), filename: "quote.pdf" },
  });
  const view = await toApiView(pool, "sandbox", await getRequestForPartner(ctx, a.row.id));
  assert.equal(view.status, "quote_completed");
  assert.ok(JSON.stringify(view).includes("500"));

  // another partner cannot see it
  const other = await createPartner(pool, "sandbox", { name: `other-${suffix}`, webhookUrl: "https://example.com/hook2" });
  await assert.rejects(getRequestForPartner({ ...ctx, partnerId: other.partnerId }, a.row.id), /not found/i);

  // secret rotation + outbox + sandbox simulator run without SQL errors
  await rotateWebhookSecret(pool, partnerId);
  assert.equal((await retireOldWebhookSecrets(pool, partnerId)).retired, 1);
  const outbox = await rows<{ n: number }>(pool, "SELECT COUNT(*) AS n FROM webhook_deliveries WHERE partner_id = ?", [partnerId]);
  assert.ok(Number(outbox[0].n) >= 5);
  await exec(pool, "UPDATE quote_requests SET updated_at = DATE_SUB(NOW(), INTERVAL 5 MINUTE) WHERE partner_id = ? AND status = 'received'", [partnerId]);
  await advanceSandbox(pool);
  await dispatchDue(pool, "sandbox"); // example.com will reject; must record a retry, not throw
  const [st] = await rows<{ status: string }>(pool, "SELECT status FROM webhook_deliveries WHERE partner_id = ? ORDER BY created_at LIMIT 1", [partnerId]);
  assert.ok(["delivered", "pending", "dead"].includes(st.status));

  // website RFQ: saved as source 'website', no webhook queued, staff status change returns null
  process.env.PARTNER_DB_LIVE_URL = url; // same guarded test database
  const { parseWebsiteRfq } = await import("./website-rfq-parse.ts");
  const { saveWebsiteRfq } = await import("./website-rfq.ts");
  const f = new FormData();
  for (const [k, v] of Object.entries({ companyName: "Web Co", contactName: "Wes", email: "wes@example.com", phone: "555", units: "10", dimensions: "8 x 4 x 2 in", weight: "3 lb", termsVersion: "t1" })) f.set(k, v);
  const saved = await saveWebsiteRfq(parseWebsiteRfq(f), { filename: "contract.pdf", bytes: buildStubPdf("web") });
  assert.ok(saved.saved, saved.saved ? "" : saved.reason);
  if (saved.saved) {
    const [web] = await rows<{ source: string; partner: string }>(pool, "SELECT q.source, p.name AS partner FROM quote_requests q JOIN partners p ON p.id = q.partner_id WHERE q.id = ?", [saved.requestId]);
    assert.equal(web.source, "website");
    assert.equal(web.partner, "MILPAQ Website");
    const files = await rows<{ n: number }>(pool, "SELECT COUNT(*) AS n FROM request_files WHERE request_id = ?", [saved.requestId]);
    assert.equal(Number(files[0].n), 1);
    assert.equal(await changeStatus(pool, "live", saved.requestId, "under_review"), null);
    const hooks = await rows<{ n: number }>(pool, "SELECT COUNT(*) AS n FROM webhook_deliveries WHERE request_id = ?", [saved.requestId]);
    assert.equal(Number(hooks[0].n), 0);
  }
});
