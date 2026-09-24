"use client";

import { useState, type FormEvent } from "react";
import { FormHoneypot } from "@/components/form-honeypot";
import { submitForm } from "@/lib/submit-form";

export type LeadFormField =
  | { label: string; name: string; type: "text" | "email" | "tel"; required?: boolean }
  | { label: string; name: string; type: "select"; options: string[]; required?: boolean }
  | { label: string; name: string; type: "textarea"; required?: boolean };

export function SimpleLeadForm({
  formName,
  fields,
  submitLabel,
  confirmationTitle,
  confirmationMessage,
}: {
  formName: string;
  fields: LeadFormField[];
  submitLabel: string;
  confirmationTitle: string;
  confirmationMessage: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = await submitForm(event.currentTarget, formName);
    setSubmitting(false);
    if (result) setError(result);
    else setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-milpaq-olive bg-milpaq-tan-light p-8">
        <h3 className="font-display text-xl font-semibold text-milpaq-dark">{confirmationTitle}</h3>
        <p className="mt-2 text-sm text-milpaq-dark/80">{confirmationMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4 rounded-lg border border-milpaq-tan bg-white p-8">
      {fields.map((field) => (
        <label key={field.name} className="block text-sm font-medium text-milpaq-dark">
          {field.label}
          {field.required && <span className="text-red-600"> *</span>}
          {field.type === "select" ? (
            <select
              name={field.name}
              required={field.required}
              className="mt-1 block w-full rounded-md border border-milpaq-tan px-3 py-2 text-sm font-normal"
            >
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea
              name={field.name}
              required={field.required}
              rows={4}
              className="mt-1 block w-full rounded-md border border-milpaq-tan px-3 py-2 text-sm font-normal"
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              required={field.required}
              className="mt-1 block w-full rounded-md border border-milpaq-tan px-3 py-2 text-sm font-normal"
            />
          )}
        </label>
      ))}
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
        {submitting ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
