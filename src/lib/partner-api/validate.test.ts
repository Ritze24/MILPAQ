import { test } from "node:test";
import assert from "node:assert/strict";
import { validateMetadata } from "./validate.ts";
import { SUPPORTED_TERMS_VERSIONS } from "./config.ts";

const NOW = new Date("2026-10-20T12:00:00Z");

function valid() {
  return {
    external_request_id: "ctrx_01JABC123XYZ",
    company: { name: "Example Supply Company" },
    contact: { name: "Jane Smith", email: "jane@example.com", phone: "+1-555-555-0100" },
    solicitation: { number: "SPE3SE-27-T-0021" },
    packaging: {
      number_of_units: 12,
      unit_dimensions: { length: 18, width: 14, height: 12, unit: "in" },
      unit_weight: { value: 25.5, unit: "lb" },
      source_origin_inspection_required: true,
      destination_inspection_required: false,
    },
    additional_notes: "Handle with care",
    terms_acceptance: {
      accepted: true,
      version: SUPPORTED_TERMS_VERSIONS[0],
      accepted_at: "2026-10-20T11:59:00Z",
      accepted_by_user_id: "user_1",
    },
  };
}

test("accepts the spec example", () => {
  const r = validateMetadata(valid(), NOW);
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.value.numberOfUnits, 12);
    assert.equal(r.value.termsAcceptedAt, "2026-10-20T11:59:00.000Z");
  }
});

test("reports field paths exactly as in the spec", () => {
  const body = valid();
  delete (body.packaging as Record<string, unknown>).unit_weight;
  const r = validateMetadata(body, NOW);
  assert.equal(r.ok, false);
  if (!r.ok) {
    const fields = r.errors.map((e) => e.field);
    assert.ok(fields.includes("packaging.unit_weight.value"));
    assert.ok(fields.includes("packaging.unit_weight.unit"));
  }
});

test("rejects bad units, quantities and dimensions", () => {
  const body = valid();
  body.packaging.unit_dimensions.unit = "ft";
  body.packaging.number_of_units = 1.5;
  body.packaging.unit_dimensions.length = -2;
  const r = validateMetadata(body, NOW);
  assert.equal(r.ok, false);
  if (!r.ok) {
    const by = Object.fromEntries(r.errors.map((e) => [e.field, e.code]));
    assert.equal(by["packaging.unit_dimensions.unit"], "invalid_value");
    assert.equal(by["packaging.number_of_units"], "invalid_value");
    assert.equal(by["packaging.unit_dimensions.length"], "out_of_range");
  }
});

test("rejects missing or false T&C acceptance and unknown versions", () => {
  const a = valid();
  a.terms_acceptance.accepted = false;
  const ra = validateMetadata(a, NOW);
  assert.ok(!ra.ok && ra.errors.some((e) => e.field === "terms_acceptance.accepted" && e.code === "must_be_true"));

  const b = valid();
  b.terms_acceptance.version = "0.0-unknown";
  const rb = validateMetadata(b, NOW);
  assert.ok(!rb.ok && rb.errors.some((e) => e.code === "unsupported_version"));

  const c = valid() as Record<string, unknown>;
  delete c.terms_acceptance;
  const rc = validateMetadata(c, NOW);
  assert.ok(!rc.ok && rc.errors.some((e) => e.field === "terms_acceptance.accepted" && e.code === "required"));
});

test("rejects future accepted_at and bad email/phone", () => {
  const body = valid();
  body.terms_acceptance.accepted_at = "2026-10-20T13:00:00Z";
  body.contact.email = "not-an-email";
  body.contact.phone = "abc";
  const r = validateMetadata(body, NOW);
  assert.equal(r.ok, false);
  if (!r.ok) {
    const fields = r.errors.map((e) => e.field);
    assert.ok(fields.includes("terms_acceptance.accepted_at"));
    assert.ok(fields.includes("contact.email"));
    assert.ok(fields.includes("contact.phone"));
  }
});

test("both inspection flags are required booleans", () => {
  const body = valid();
  delete (body.packaging as Record<string, unknown>).destination_inspection_required;
  (body.packaging as Record<string, unknown>).source_origin_inspection_required = "yes";
  const r = validateMetadata(body, NOW);
  assert.ok(!r.ok);
  if (!r.ok) {
    const by = Object.fromEntries(r.errors.map((e) => [e.field, e.code]));
    assert.equal(by["packaging.destination_inspection_required"], "required");
    assert.equal(by["packaging.source_origin_inspection_required"], "invalid_type");
  }
});

test("non-object metadata is rejected", () => {
  assert.equal(validateMetadata("x", NOW).ok, false);
  assert.equal(validateMetadata(null, NOW).ok, false);
  assert.equal(validateMetadata([], NOW).ok, false);
});
