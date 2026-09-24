// Posts a form to /api/forms, which emails it to the MILPAQ inboxes.
// Resolves to null on success, or an error message to show the visitor.
export async function submitForm(form: HTMLFormElement, formName: string): Promise<string | null> {
  const data = new FormData(form);
  data.set("formName", formName);

  try {
    const res = await fetch("/api/forms", { method: "POST", body: data });
    if (res.ok) return null;
    const body = await res.json().catch(() => null);
    return body?.error ?? "Something went wrong. Please try again or email milpaq@305aerosupplies.com.";
  } catch {
    return "Network error. Please check your connection and try again.";
  }
}
