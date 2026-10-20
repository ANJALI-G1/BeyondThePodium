/**
 * ═════════════════════════════════════════════════════════════════════════════
 *  FORM INTEGRATION POINT  (Google Apps Script + Google Sheets)
 * ═════════════════════════════════════════════════════════════════════════════
 *  Every form on the site calls `submitForm()` below — it is the ONLY place you
 *  need to change to connect the forms.
 *
 *  1. Deploy your Apps Script as a Web App and copy its /exec URL.
 *  2. Put it in `.env.local` (and your CI secrets):
 *        NEXT_PUBLIC_FORM_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
 *  3. Replace the body of `submitForm()` with your request (example below).
 *
 *  Payload shape (one flat object — maps neatly to Sheet columns):
 *    formType     "enquiry" | "contact"
 *    submittedAt  ISO timestamp
 *    page         URL path the form was sent from
 *    ...fields    name, email, phone, role, program, mode, subject, message, consent
 * ═════════════════════════════════════════════════════════════════════════════
 */

export type FormType = "enquiry" | "contact";

export type FormPayload = {
  formType: FormType;
  submittedAt: string;
  page: string;
} & Record<string, string>;

export type SubmitResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "error"; message?: string };

export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

export async function submitForm(payload: FormPayload): Promise<SubmitResult> {
  // ── TODO(integration): replace this block with your Apps Script request ────
  //
  // Example (Apps Script web apps don't return CORS headers for JSON, so a
  // simple text/plain POST is the usual approach; parse JSON in doPost(e)):
  //
  //   try {
  //     const res = await fetch(FORM_ENDPOINT, {
  //       method: "POST",
  //       headers: { "Content-Type": "text/plain;charset=utf-8" },
  //       body: JSON.stringify(payload),
  //     });
  //     const data = await res.json();
  //     return data.result === "success" ? { ok: true } : { ok: false, reason: "error" };
  //   } catch {
  //     return { ok: false, reason: "error" };
  //   }
  // ───────────────────────────────────────────────────────────────────────────

  // Development only: simulate success so the UI states can be tested.
  if (process.env.NODE_ENV === "development") {
    console.info("[forms] payload (not sent — integration pending):", payload);
    await new Promise((r) => setTimeout(r, 700));
    return { ok: true };
  }

  return { ok: false, reason: "not-configured" };
}
