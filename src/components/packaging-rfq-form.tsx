"use client";

import { useState, type FormEvent } from "react";
import { company } from "@/lib/constants";
import { FormHoneypot } from "@/components/form-honeypot";
import { submitForm } from "@/lib/submit-form";
import { termsVersion } from "@/lib/terms-content";

export function PackagingRfqForm() {
  const [originInspection, setOriginInspection] = useState(false);
  const [dims, setDims] = useState({ length: "", width: "", height: "", unit: "in" });
  const [weight, setWeight] = useState({ value: "", unit: "lb" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dimensions and weight are entered as numbers + units, then sent in the same
  // "dimensions" / "weight" text fields the inbox email has always used, so
  // downstream parsing of those lines is unchanged.
  const dimensionsText = dims.length && dims.width && dims.height ? `${dims.length} x ${dims.width} x ${dims.height} ${dims.unit}` : "";
  const weightText = weight.value ? `${weight.value} ${weight.unit}` : "";

  // Submissions (including the uploaded contract) are emailed to the
  // MILPAQ inboxes via /api/forms. Monday.com automation for Phase 1 is
  // still pending — no CRM/job record is created here yet.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = await submitForm(event.currentTarget, "packaging-rfq");
    setSubmitting(false);
    if (result) setError(result);
    else setSubmitted(true);
  }

  if (submitted) {
    return (
      <div id="quote" className="rounded-lg border border-milpaq-olive bg-milpaq-tan-light p-8">
        <h3 className="font-display text-xl font-semibold text-milpaq-dark">Request received</h3>
        <p className="mt-2 text-sm text-milpaq-dark/80">
          Thank you for your submission. MILPAQ will review your contract/solicitation and
          packaging requirements and follow up with a quote.
        </p>
      </div>
    );
  }

  return (
    <form
      id="quote"
      onSubmit={handleSubmit}
      className="relative space-y-8 rounded-lg border border-milpaq-tan bg-white p-8"
    >
      <div>
        <h3 className="font-display text-lg font-semibold text-milpaq-dark">1. Company Information</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Company Name" name="companyName" required />
          <Field label="Contact Name" name="contactName" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Phone" name="phone" type="tel" required />
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold text-milpaq-dark">2. Contract Information</h3>
        <div className="mt-4">
          <label className="block text-sm font-medium text-milpaq-dark">
            Upload Contract or Solicitation <span className="text-red-600">*</span>
          </label>
          <input
            type="file"
            name="contractFile"
            required
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.zip"
            className="mt-2 block w-full text-sm text-milpaq-dark/80 file:mr-4 file:rounded-md file:border-0 file:bg-milpaq-olive file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
          />
        </div>
        <div className="mt-4 sm:max-w-sm">
          <Field label="Solicitation Number" name="solicitationNumber" />
          <p className="mt-1 text-xs text-milpaq-dark/70">Optional. As shown on the solicitation, for example SPE3SE-27-T-0021. If you leave it blank, our team will take it from your uploaded document.</p>
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold text-milpaq-dark">3. Packaging Information</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Number of Units" name="units" type="number" required min="1" step="1" />
          <div />
          <fieldset>
            <legend className="text-sm font-medium text-milpaq-dark">
              Unit Dimensions (L x W x H) <span className="text-red-600">*</span>
            </legend>
            <div className="mt-1 flex gap-2">
              {(["length", "width", "height"] as const).map((k) => (
                <input
                  key={k}
                  type="number"
                  aria-label={k}
                  placeholder={k[0].toUpperCase()}
                  required
                  min="0.01"
                  step="any"
                  value={dims[k]}
                  onChange={(e) => setDims({ ...dims, [k]: e.target.value })}
                  className="block w-full min-w-0 rounded-md border border-milpaq-tan px-3 py-2 text-sm font-normal"
                />
              ))}
              <select
                aria-label="Dimension unit"
                value={dims.unit}
                onChange={(e) => setDims({ ...dims, unit: e.target.value })}
                className="rounded-md border border-milpaq-tan px-2 py-2 text-sm"
              >
                <option value="in">in</option>
                <option value="cm">cm</option>
              </select>
            </div>
            <input type="hidden" name="dimensions" value={dimensionsText} />
          </fieldset>
          <fieldset>
            <legend className="text-sm font-medium text-milpaq-dark">
              Unit Weight <span className="text-red-600">*</span>
            </legend>
            <div className="mt-1 flex gap-2">
              <input
                type="number"
                aria-label="Unit weight"
                required
                min="0.01"
                step="any"
                value={weight.value}
                onChange={(e) => setWeight({ ...weight, value: e.target.value })}
                className="block w-full min-w-0 rounded-md border border-milpaq-tan px-3 py-2 text-sm font-normal"
              />
              <select
                aria-label="Weight unit"
                value={weight.unit}
                onChange={(e) => setWeight({ ...weight, unit: e.target.value })}
                className="rounded-md border border-milpaq-tan px-2 py-2 text-sm"
              >
                <option value="lb">lb</option>
                <option value="kg">kg</option>
              </select>
            </div>
            <input type="hidden" name="weight" value={weightText} />
          </fieldset>
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold text-milpaq-dark">4. Inspection Requirements</h3>
        <div className="mt-4 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-milpaq-dark">
            <input
              type="checkbox"
              name="originInspection"
              checked={originInspection}
              onChange={(e) => setOriginInspection(e.target.checked)}
            />
            Source / Origin Inspection
          </label>
          <label className="flex items-center gap-2 text-sm text-milpaq-dark">
            <input type="checkbox" name="destinationInspection" />
            Destination Inspection
          </label>
        </div>
        {originInspection && (
          <p className="mt-3 rounded-md bg-milpaq-tan-light p-3 text-sm text-milpaq-dark">
            Source Inspection requires MILPAQ to be listed as the packaging and/or inspection
            location where applicable. Our CAGE Code is {company.cageCode}. Additional
            coordination instructions will be provided after quote approval.
          </p>
        )}
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold text-milpaq-dark">5. Additional Notes</h3>
        <textarea
          name="notes"
          rows={4}
          className="mt-4 w-full rounded-md border border-milpaq-tan px-3 py-2 text-sm"
          placeholder="Special instructions..."
        />
      </div>

      <div>
        <label className="flex items-start gap-2 text-sm text-milpaq-dark">
          <input type="checkbox" required className="mt-1" />
          I agree to MILPAQ Solutions&apos; Terms &amp; Conditions. <span className="text-red-600">*</span>
        </label>
        <input type="hidden" name="termsVersion" value={termsVersion} />
      </div>

      <FormHoneypot />
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-milpaq-olive px-6 py-3 text-sm font-semibold text-white hover:bg-milpaq-olive-dark disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Sending…" : "Submit Quote Request"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  min,
  step,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  min?: string;
  step?: string;
}) {
  return (
    <label className="block text-sm font-medium text-milpaq-dark">
      {label}
      {required && <span className="text-red-600"> *</span>}
      <input
        type={type}
        name={name}
        required={required}
        min={min}
        step={step}
        className="mt-1 block w-full rounded-md border border-milpaq-tan px-3 py-2 text-sm font-normal"
      />
    </label>
  );
}
