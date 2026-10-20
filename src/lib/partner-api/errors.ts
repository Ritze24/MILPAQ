export type FieldError = { field: string; code: string; message: string };

// Documented error catalogue (see docs/partner-api-openapi.yaml).
export const ERROR_CODES = {
  invalid_request: 400,
  unauthorized: 401,
  not_found: 404,
  idempotency_conflict: 409,
  invalid_state: 409,
  payload_too_large: 413,
  validation_failed: 422,
  rate_limited: 429,
  internal_error: 500,
  unavailable: 503,
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;

export class ApiError extends Error {
  readonly status: number;
  constructor(
    readonly code: ErrorCode,
    message: string,
    readonly fields?: FieldError[],
    readonly headers?: Record<string, string>,
  ) {
    super(message);
    this.status = ERROR_CODES[code];
  }
}

export function jsonResponse(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

export function errorResponse(err: ApiError): Response {
  const error: { code: string; message: string; fields?: FieldError[] } = {
    code: err.code,
    message: err.message,
  };
  if (err.fields) error.fields = err.fields;
  return jsonResponse({ error }, err.status, err.headers);
}
