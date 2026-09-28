import { pushToDataLayer } from "@/lib/gtm";

// Posts a form to /api/forms, which emails it to the MILPAQ inboxes.
// Resolves to null on success, or an error message to show the visitor.
// Every call site shares this function, so a single dataLayer push here
// covers GTM tracking for all forms (see [contact, brochure, packaging-rfq,
// oem-partnership, strategic-growth-retainer] formName values).
export async function submitForm(form: HTMLFormElement, formName: string): Promise<string | null> {
  const data = new FormData(form);
  data.set("formName", formName);

  try {
    const res = await fetch("/api/forms", { method: "POST", body: data });
    if (res.ok) {
      pushToDataLayer({ event: "form_submission", form_name: formName });
      return null;
    }
    const body = await res.json().catch(() => null);
    const error = body?.error ?? "Something went wrong. Please try again or email milpaq@305aerosupplies.com.";
    pushToDataLayer({ event: "form_submission_error", form_name: formName, error_message: error });
    return error;
  } catch {
    const error = "Network error. Please check your connection and try again.";
    pushToDataLayer({ event: "form_submission_error", form_name: formName, error_message: error });
    return error;
  }
}
