"use client";

import { useState, type FormEvent } from "react";
import { company } from "@/lib/constants";

export function PackagingRfqForm() {
  const [originInspection, setOriginInspection] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Intake is UI-only until MILPAQ provides Monday.com/email credentials for
  // Phase 1 automation (see RFQ Workflow Step 3: quote sits unautomated in a
  // review queue until the client pays — no CRM/job record is created here).
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div id="quote" className="rounded-lg border border-milpaq-olive bg-milpaq-tan-light p-8">
        <h3 className="text-xl font-semibold text-milpaq-dark">Request received</h3>
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
      className="space-y-8 rounded-lg border border-milpaq-tan bg-white p-8"
    >
      <div>
        <h3 className="text-lg font-semibold text-milpaq-dark">1. Company Information</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Company Name" name="companyName" required />
          <Field label="Contact Name" name="contactName" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Phone" name="phone" type="tel" required />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-milpaq-dark">2. Contract Information</h3>
        <div className="mt-4">
          <label className="block text-sm font-medium text-milpaq-dark">
            Upload Contract or Solicitation
          </label>
          <input
            type="file"
            name="contractFile"
            required
            className="mt-2 block w-full text-sm text-milpaq-dark/80 file:mr-4 file:rounded-md file:border-0 file:bg-milpaq-olive file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-milpaq-dark">3. Packaging Information</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Number of Units" name="units" type="number" required />
          <Field label="Unit Dimensions (L x W x H)" name="dimensions" required />
          <Field label="Unit Weight" name="weight" required />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-milpaq-dark">4. Inspection Requirements</h3>
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
        <h3 className="text-lg font-semibold text-milpaq-dark">5. Additional Notes</h3>
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
          I agree to MILPAQ Solutions&apos; Terms &amp; Conditions.
        </label>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-milpaq-olive px-6 py-3 text-sm font-semibold text-white hover:bg-milpaq-olive-dark sm:w-auto"
      >
        Submit Quote Request
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-milpaq-dark">
      {label}
      <input
        type={type}
        name={name}
        required={required}
        className="mt-1 block w-full rounded-md border border-milpaq-tan px-3 py-2 text-sm font-normal"
      />
    </label>
  );
}
