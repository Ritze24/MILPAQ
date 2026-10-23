// Pure parsing of the public packaging RFQ form. Kept free of database imports so
// it can be unit-tested on its own (the database code lives in website-rfq.ts).

export type WebsiteRfq = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  solicitationNumber: string;
  numberOfUnits: number;
  length: number;
  width: number;
  height: number;
  dimensionUnit: "in" | "cm";
  weight: number;
  weightUnit: "lb" | "kg";
  originInspection: boolean;
  destinationInspection: boolean;
  notes: string | null;
  termsVersion: string;
  // The form's own text for dimensions/weight, kept when it could not be parsed.
  rawDimensions: string;
  rawWeight: string;
  measurementsParsed: boolean;
};

const MAX_DECIMAL = 999_999_999.999;
const DIMENSIONS = /^\s*(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)\s*(in|cm)?\s*$/i;
const WEIGHT = /^\s*(\d+(?:\.\d+)?)\s*(lb|kg)?\s*$/i;

const text = (data: FormData, key: string, max: number) => String(data.get(key) ?? "").replace(/\s+/g, " ").trim().slice(0, max);
const decimal = (n: number) => (Number.isFinite(n) && n > 0 ? Math.min(Math.round(n * 1000) / 1000, MAX_DECIMAL) : 0);

export function parseWebsiteRfq(data: FormData): WebsiteRfq {
  const rawDimensions = text(data, "dimensions", 100);
  const rawWeight = text(data, "weight", 50);
  const dims = DIMENSIONS.exec(rawDimensions);
  const weight = WEIGHT.exec(rawWeight);
  const units = Number.parseInt(String(data.get("units") ?? ""), 10);
  const notes = String(data.get("notes") ?? "").trim().slice(0, 5000);

  return {
    companyName: text(data, "companyName", 200),
    contactName: text(data, "contactName", 120),
    email: text(data, "email", 254),
    phone: text(data, "phone", 40),
    solicitationNumber: text(data, "solicitationNumber", 60),
    numberOfUnits: Number.isInteger(units) && units > 0 ? Math.min(units, 2_000_000_000) : 0,
    length: dims ? decimal(Number(dims[1])) : 0,
    width: dims ? decimal(Number(dims[2])) : 0,
    height: dims ? decimal(Number(dims[3])) : 0,
    dimensionUnit: dims?.[4]?.toLowerCase() === "cm" ? "cm" : "in",
    weight: weight ? decimal(Number(weight[1])) : 0,
    weightUnit: weight?.[2]?.toLowerCase() === "kg" ? "kg" : "lb",
    originInspection: Boolean(String(data.get("originInspection") ?? "")),
    destinationInspection: Boolean(String(data.get("destinationInspection") ?? "")),
    notes: notes || null,
    termsVersion: text(data, "termsVersion", 32),
    rawDimensions,
    rawWeight,
    measurementsParsed: Boolean(dims && weight),
  };
}

const CONTENT_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  zip: "application/zip",
};

// The browser-supplied type is not trusted: it is derived from the extension the form allows.
export function contentTypeFor(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  return CONTENT_TYPES[ext] ?? "application/octet-stream";
}
