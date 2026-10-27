import { test } from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { requestFingerprint, stableStringify, sha256Hex } from "./fingerprint.ts";
import { signWebhook, verifyWebhook } from "./webhook-signing.ts";
import { signDownloadToken, verifyDownloadToken } from "./download-token.ts";
import { decryptSecret, deriveKey, encryptSecret, generateWebhookSecret } from "./crypto-box.ts";
import { envFromKey, extractBearer, generateApiKey, hashApiKey } from "./keys.ts";
import { MAX_ATTEMPTS, retryDelaySeconds } from "./backoff.ts";
import { newId } from "./ids.ts";
import { buildStubPdf, hasPdfMagic } from "./pdf.ts";

test("fingerprint ignores key order, changes with content or PDF", () => {
  const pdf = sha256Hex("pdf-bytes");
  const a = requestFingerprint({ a: 1, b: { c: 2, d: 3 } }, pdf);
  const b = requestFingerprint({ b: { d: 3, c: 2 }, a: 1 }, pdf);
  assert.equal(a, b);
  assert.notEqual(a, requestFingerprint({ a: 2, b: { c: 2, d: 3 } }, pdf));
  assert.notEqual(a, requestFingerprint({ a: 1, b: { c: 2, d: 3 } }, sha256Hex("other")));
  assert.equal(stableStringify({ z: [1, { y: 1, x: 2 }] }), '{"z":[1,{"x":2,"y":1}]}');
});

test("webhook signature: verifies, rejects tampering, stale timestamps, wrong secret", () => {
  const secret = generateWebhookSecret();
  const body = '{"event_id":"evt_1"}';
  const ts = 1_800_000_000;
  const header = signWebhook([secret], ts, body);
  assert.match(header, /^v1=[0-9a-f]{64}$/);
  const now = { nowSeconds: ts + 10 };
  assert.equal(verifyWebhook(secret, header, ts, body, now), true);
  assert.equal(verifyWebhook(secret, header, ts, body + " ", now), false);
  assert.equal(verifyWebhook("whsec_other", header, ts, body, now), false);
  assert.equal(verifyWebhook(secret, header, ts, body, { nowSeconds: ts + 301 }), false);
  assert.equal(verifyWebhook(secret, header, ts, body, { nowSeconds: ts + 299 }), true);
});

test("webhook signature during rotation carries one v1 value per secret", () => {
  const oldS = generateWebhookSecret();
  const newS = generateWebhookSecret();
  const header = signWebhook([newS, oldS], 1_800_000_000, "{}");
  assert.equal(header.split(",").length, 2);
  const now = { nowSeconds: 1_800_000_000 };
  assert.equal(verifyWebhook(oldS, header, 1_800_000_000, "{}", now), true);
  assert.equal(verifyWebhook(newS, header, 1_800_000_000, "{}", now), true);
});

test("download tokens: valid, expired, tampered", () => {
  const key = randomBytes(32);
  const claims = { e: "sandbox" as const, r: "mpq_X", f: "file_1", x: 2_000_000_000 };
  const token = signDownloadToken(claims, key);
  assert.deepEqual(verifyDownloadToken(token, key, 1_900_000_000), claims);
  assert.equal(verifyDownloadToken(token, key, 2_000_000_001), null);
  assert.equal(verifyDownloadToken(token.slice(0, -2) + "xx", key, 1_900_000_000), null);
  assert.equal(verifyDownloadToken(token, randomBytes(32), 1_900_000_000), null);
  assert.equal(verifyDownloadToken("garbage", key), null);
});

test("secrets are encrypted at rest and round-trip", () => {
  const key = deriveKey(randomBytes(32), "secret-encryption");
  const stored = encryptSecret("whsec_abc", key);
  assert.ok(!stored.includes("whsec_abc"));
  assert.equal(decryptSecret(stored, key), "whsec_abc");
  assert.throws(() => decryptSecret(stored, deriveKey(randomBytes(32), "secret-encryption")));
  assert.notDeepEqual(deriveKey(Buffer.alloc(32, 1), "secret-encryption"), deriveKey(Buffer.alloc(32, 1), "download-signing"));
});

test("api keys: prefix picks the environment, only a hash is derived", () => {
  const t = generateApiKey("sandbox");
  const l = generateApiKey("live");
  assert.ok(t.key.startsWith("mpq_test_") && l.key.startsWith("mpq_live_"));
  assert.equal(envFromKey(t.key), "sandbox");
  assert.equal(envFromKey(l.key), "live");
  assert.equal(envFromKey("sk_nope"), null);
  assert.equal(t.hash, hashApiKey(t.key));
  assert.notEqual(t.hash, t.key);
  assert.equal(extractBearer(`Bearer ${t.key}`), t.key);
  assert.equal(extractBearer("Basic abc"), null);
  assert.equal(extractBearer(null), null);
});

test("retry schedule is bounded (~22h) and ends with null", () => {
  assert.equal(retryDelaySeconds(1), 60);
  assert.equal(retryDelaySeconds(MAX_ATTEMPTS - 1), 43200);
  assert.equal(retryDelaySeconds(MAX_ATTEMPTS), null);
});

test("ids are prefixed, unique and time-sortable", () => {
  const a = newId("mpq_", 1_000);
  const b = newId("mpq_", 2_000);
  assert.ok(a.startsWith("mpq_") && a.length === 4 + 26);
  assert.ok(a < b);
  assert.notEqual(newId("mpq_", 1_000), a);
});

test("pdf helpers", () => {
  const pdf = buildStubPdf("Sandbox quote (test)");
  assert.equal(hasPdfMagic(pdf), true);
  assert.equal(hasPdfMagic(new TextEncoder().encode("<html>")), false);
  const text = new TextDecoder().decode(pdf);
  const xrefPos = Number(/startxref\n(\d+)/.exec(text)![1]);
  assert.equal(text.slice(xrefPos, xrefPos + 4), "xref");
});
