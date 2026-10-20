import { test } from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { signStaffSession, verifyStaffSession } from "./staff-session.ts";
import { parseQuoteForm } from "./staff-quote.ts";
import { buildStubPdf } from "./pdf.ts";

const NOW = new Date("2026-10-20T12:00:00Z");

function form(over: Record<string, string | File> = {}) {
  const f = new FormData();
  const base: Record<string, string | File> = {
    currency: "usd",
    packaging_price: "1,425.50",
    shipping_price: "75",
    quote_number: "Q-2026-001",
    expires_on: "2026-11-20",
    notes: "  net 30 ",
    quote_pdf: new File([buildStubPdf("q") as BlobPart], "quote.pdf", { type: "application/pdf" }),
    ...over,
  };
  for (const [k, v] of Object.entries(base)) f.set(k, v);
  return f;
}

test("staff session round-trips, expires and rejects tampering", () => {
  const key = randomBytes(32);
  const token = signStaffSession(key, 1000);
  assert.equal(verifyStaffSession(token, key, 1001), true);
  assert.equal(verifyStaffSession(token, key, 1000 + 9 * 3600), false);
  assert.equal(verifyStaffSession(token, randomBytes(32), 1001), false);
  assert.equal(verifyStaffSession(token + "x", key, 1001), false);
  assert.equal(verifyStaffSession(undefined, key), false);
});

test("quote form: total is packaging + shipping, currency normalised", async () => {
  const r = await parseQuoteForm(form(), NOW);
  assert.ok(r.ok);
  if (r.ok) {
    assert.equal(r.quote.currency, "USD");
    assert.equal(r.quote.packagingPrice, 1425.5);
    assert.equal(r.quote.totalAmount, 1500.5);
    assert.equal(r.quote.notes, "net 30");
  }
});

test("quote form: blank shipping allowed; bad inputs rejected", async () => {
  const noShip = await parseQuoteForm(form({ shipping_price: "" }), NOW);
  assert.ok(noShip.ok && noShip.quote.shippingPrice === null && noShip.quote.totalAmount === 1425.5);
  for (const bad of [
    { packaging_price: "0" },
    { packaging_price: "abc" },
    { shipping_price: "-5" },
    { quote_number: "a b" },
    { expires_on: "2026-10-01" },
    { expires_on: "soon" },
    { currency: "DOLLARS" },
    { quote_pdf: new File(["not a pdf"], "x.pdf") },
  ] as Record<string, string | File>[]) {
    assert.equal((await parseQuoteForm(form(bad), NOW)).ok, false, JSON.stringify(Object.keys(bad)));
  }
});
