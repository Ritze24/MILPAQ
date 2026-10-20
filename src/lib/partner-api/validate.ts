import { SUPPORTED_TERMS_VERSIONS } from "./config.ts";
import type { FieldError } from "./errors.ts";

export type ParsedMetadata = {
  externalRequestId: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  solicitationNumber: string;
  numberOfUnits: number;
  length: number;
  width: number;
  height: number;
  dimensionUnit: "in" | "cm";
  weightValue: number;
  weightUnit: "lb" | "kg";
  originInspectionRequired: boolean;
  destinationInspectionRequired: boolean;
  additionalNotes: string | null;
  termsVersion: string;
  termsAcceptedAt: string; // ISO-8601 UTC
  termsAcceptedBy: string;
};

export type ValidationResult = { ok: true; value: ParsedMetadata } | { ok: false; errors: FieldError[] };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EXTERNAL_ID = /^[A-Za-z0-9_.:-]{1,64}$/;
const SOLICITATION = /^[A-Za-z0-9][A-Za-z0-9 ._/-]{0,59}$/;
const PHONE = /^[0-9+()\-.\s]{7,25}$/;

function get(obj: unknown, path: string): unknown {
  let cur: unknown = obj;
  for (const part of path.split(".")) {
    if (cur === null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[part];
  }
  return cur;
}

export function validateMetadata(raw: unknown, now: Date = new Date()): ValidationResult {
  const errors: FieldError[] = [];
  const fail = (field: string, code: string, message: string) => {
    errors.push({ field, code, message });
  };

  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, errors: [{ field: "metadata", code: "invalid_type", message: "metadata must be a JSON object." }] };
  }

  const text = (field: string, label: string, opts: { max: number; pattern?: RegExp; patternMessage?: string; optional?: boolean }) => {
    const v = get(raw, field);
    if (v === undefined || v === null || (typeof v === "string" && !v.trim())) {
      if (!opts.optional) fail(field, "required", `${label} is required.`);
      return null;
    }
    if (typeof v !== "string") {
      fail(field, "invalid_type", `${label} must be a string.`);
      return null;
    }
    const s = v.trim();
    if (s.length > opts.max) {
      fail(field, "too_long", `${label} must be at most ${opts.max} characters.`);
      return null;
    }
    if (opts.pattern && !opts.pattern.test(s)) {
      fail(field, "invalid_format", opts.patternMessage ?? `${label} is not in a valid format.`);
      return null;
    }
    return s;
  };

  const positive = (field: string, label: string, max: number, integer = false) => {
    const v = get(raw, field);
    if (v === undefined || v === null) {
      fail(field, "required", `${label} is required.`);
      return null;
    }
    if (typeof v !== "number" || !Number.isFinite(v)) {
      fail(field, "invalid_type", `${label} must be a number.`);
      return null;
    }
    if (integer && !Number.isInteger(v)) {
      fail(field, "invalid_value", `${label} must be a whole number.`);
      return null;
    }
    if (v <= 0 || v > max) {
      fail(field, "out_of_range", `${label} must be greater than 0 and at most ${max}.`);
      return null;
    }
    return v;
  };

  const bool = (field: string, label: string) => {
    const v = get(raw, field);
    if (v === undefined || v === null) {
      fail(field, "required", `${label} is required.`);
      return null;
    }
    if (typeof v !== "boolean") {
      fail(field, "invalid_type", `${label} must be true or false.`);
      return null;
    }
    return v;
  };

  const oneOf = <T extends string>(field: string, label: string, allowed: readonly T[]) => {
    const v = get(raw, field);
    if (v === undefined || v === null) {
      fail(field, "required", `${label} is required.`);
      return null;
    }
    if (typeof v !== "string" || !allowed.includes(v as T)) {
      fail(field, "invalid_value", `${label} must be one of: ${allowed.join(", ")}.`);
      return null;
    }
    return v as T;
  };

  const externalRequestId = text("external_request_id", "external_request_id", {
    max: 64,
    pattern: EXTERNAL_ID,
    patternMessage: "external_request_id may only contain letters, digits and _ . : -",
  });
  const companyName = text("company.name", "Company name", { max: 200 });
  const contactName = text("contact.name", "Contact name", { max: 120 });
  const contactEmail = text("contact.email", "Contact email", { max: 254, pattern: EMAIL, patternMessage: "Contact email is not a valid email address." });
  const contactPhone = text("contact.phone", "Contact phone", { max: 25, pattern: PHONE, patternMessage: "Contact phone is not a valid phone number." });
  if (contactPhone && contactPhone.replace(/\D/g, "").length < 7) {
    fail("contact.phone", "invalid_format", "Contact phone must contain at least 7 digits.");
  }
  const solicitationNumber = text("solicitation.number", "Solicitation number", {
    max: 60,
    pattern: SOLICITATION,
    patternMessage: "Solicitation number contains unsupported characters.",
  });

  const numberOfUnits = positive("packaging.number_of_units", "Number of units", 1_000_000, true);
  const length = positive("packaging.unit_dimensions.length", "Unit length", 10_000);
  const width = positive("packaging.unit_dimensions.width", "Unit width", 10_000);
  const height = positive("packaging.unit_dimensions.height", "Unit height", 10_000);
  const dimensionUnit = oneOf("packaging.unit_dimensions.unit", "Dimension unit", ["in", "cm"] as const);
  const weightValue = positive("packaging.unit_weight.value", "Unit weight", 1_000_000);
  const weightUnit = oneOf("packaging.unit_weight.unit", "Weight unit", ["lb", "kg"] as const);
  const originInspection = bool("packaging.source_origin_inspection_required", "source_origin_inspection_required");
  const destinationInspection = bool("packaging.destination_inspection_required", "destination_inspection_required");
  const additionalNotes = text("additional_notes", "Additional notes", { max: 5000, optional: true });

  const accepted = get(raw, "terms_acceptance.accepted");
  if (accepted === undefined || accepted === null) {
    fail("terms_acceptance.accepted", "required", "terms_acceptance.accepted is required.");
  } else if (accepted !== true) {
    fail("terms_acceptance.accepted", "must_be_true", "The user must accept MILPAQ's Terms & Conditions.");
  }
  const termsVersion = text("terms_acceptance.version", "Terms version", { max: 32 });
  if (termsVersion && !SUPPORTED_TERMS_VERSIONS.includes(termsVersion)) {
    fail("terms_acceptance.version", "unsupported_version", `Unsupported Terms version. Supported: ${SUPPORTED_TERMS_VERSIONS.join(", ")}.`);
  }
  const acceptedAtRaw = text("terms_acceptance.accepted_at", "terms_acceptance.accepted_at", { max: 40 });
  let termsAcceptedAt: string | null = null;
  if (acceptedAtRaw) {
    const ms = /^\d{4}-\d{2}-\d{2}T/.test(acceptedAtRaw) ? Date.parse(acceptedAtRaw) : NaN;
    if (Number.isNaN(ms)) {
      fail("terms_acceptance.accepted_at", "invalid_format", "accepted_at must be an ISO-8601 timestamp.");
    } else if (ms > now.getTime() + 5 * 60 * 1000) {
      fail("terms_acceptance.accepted_at", "invalid_value", "accepted_at cannot be in the future.");
    } else {
      termsAcceptedAt = new Date(ms).toISOString();
    }
  }
  const termsAcceptedBy = text("terms_acceptance.accepted_by_user_id", "accepted_by_user_id", { max: 128 });

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: {
      externalRequestId: externalRequestId!,
      companyName: companyName!,
      contactName: contactName!,
      contactEmail: contactEmail!,
      contactPhone: contactPhone!,
      solicitationNumber: solicitationNumber!,
      numberOfUnits: numberOfUnits!,
      length: length!,
      width: width!,
      height: height!,
      dimensionUnit: dimensionUnit!,
      weightValue: weightValue!,
      weightUnit: weightUnit!,
      originInspectionRequired: originInspection!,
      destinationInspectionRequired: destinationInspection!,
      additionalNotes,
      termsVersion: termsVersion!,
      termsAcceptedAt: termsAcceptedAt!,
      termsAcceptedBy: termsAcceptedBy!,
    },
  };
}

export type FileLike = { size: number; bytes: Uint8Array } | null;
