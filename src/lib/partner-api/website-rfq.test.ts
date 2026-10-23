import { test } from "node:test";
import assert from "node:assert/strict";
import { contentTypeFor, parseWebsiteRfq } from "./website-rfq-parse.ts";
import { MIGRATIONS } from "./migrations.ts";

function form(over: Record<string, string> = {}) {
  const f = new FormData();
  const base: Record<string, string> = {
    companyName: "  Example   Supply Co ",
    contactName: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 555 555 0100",
    solicitationNumber: "SPE7L1-26-T-01A8",
    units: "105",
    dimensions: "96 x 1 x 1 in",
    weight: "0.15 lb",
    originInspection: "on",
    notes: "  handle with care ",
    termsVersion: "2026-07",
    ...over,
  };
  for (const [k, v] of Object.entries(base)) f.set(k, v);
  return f;
}

test("parses the website RFQ form fields", () => {
  const r = parseWebsiteRfq(form());
  assert.equal(r.companyName, "Example Supply Co");
  assert.equal(r.numberOfUnits, 105);
  assert.deepEqual([r.length, r.width, r.height, r.dimensionUnit], [96, 1, 1, "in"]);
  assert.deepEqual([r.weight, r.weightUnit], [0.15, "lb"]);
  assert.equal(r.originInspection, true);
  assert.equal(r.destinationInspection, false);
  assert.equal(r.notes, "handle with care");
  assert.equal(r.measurementsParsed, true);
});

test("reads cm and kg", () => {
  const r = parseWebsiteRfq(form({ dimensions: "30.5 x 20 x 10.25 cm", weight: "2.5 kg" }));
  assert.deepEqual([r.length, r.width, r.height, r.dimensionUnit], [30.5, 20, 10.25, "cm"]);
  assert.deepEqual([r.weight, r.weightUnit], [2.5, "kg"]);
});

test("unreadable measurements are flagged, not guessed", () => {
  const r = parseWebsiteRfq(form({ dimensions: "about a foot", weight: "heavy" }));
  assert.equal(r.measurementsParsed, false);
  assert.deepEqual([r.length, r.width, r.height, r.weight], [0, 0, 0, 0]);
  assert.equal(r.rawDimensions, "about a foot");
});

test("bad units, missing solicitation and oversized text are handled", () => {
  const r = parseWebsiteRfq(form({ units: "-5", solicitationNumber: "", companyName: "x".repeat(500), notes: "" }));
  assert.equal(r.numberOfUnits, 0);
  assert.equal(r.solicitationNumber, "");
  assert.equal(r.companyName.length, 200);
  assert.equal(r.notes, null);
  assert.equal(parseWebsiteRfq(form({ units: "9999999999999" })).numberOfUnits, 2_000_000_000);
});

test("upload content type comes from the extension, not the browser", () => {
  assert.equal(contentTypeFor("Contract.PDF"), "application/pdf");
  assert.equal(contentTypeFor("scan.jpeg"), "image/jpeg");
  assert.equal(contentTypeFor("evil.html"), "application/octet-stream");
  assert.equal(contentTypeFor("noextension"), "application/octet-stream");
});

test("migration 2 exists after migration 1 and has runnable steps", () => {
  assert.deepEqual(MIGRATIONS.map((m) => m.version), [1, 2]);
  assert.ok(MIGRATIONS[1].statements.every((s) => typeof s === "function"));
});
