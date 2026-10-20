"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { enquiryModes, enquiryRoles, programs, site } from "@/content/site";
import { submitForm, type FormType } from "@/lib/forms";
import { PROGRAM_EVENT } from "../EnquireButton";
import { CheckIcon } from "../Icons";
import { FormIdContext, SelectField, TextArea, TextField } from "./Field";

type Status = "idle" | "submitting" | "success" | "error" | "not-configured";
type Errors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s-]{7,16}$/;

function validate(type: FormType, d: Record<string, string>): Errors {
  const e: Errors = {};
  if (!d.name || d.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(d.email ?? "")) e.email = "Please enter a valid email address.";
  if (d.phone && !PHONE_RE.test(d.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (type === "enquiry") {
    if (!d.program) e.program = "Please choose a program.";
    if (!d.role) e.role = "Please tell us who you are.";
  } else {
    if (!d.message || d.message.trim().length < 10) e.message = "Please write a short message (10+ characters).";
  }
  if (d.consent !== "yes") e.consent = "Please confirm you're happy to be contacted.";
  return e;
}

function useLeadForm(type: FormType) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = Object.fromEntries(
      Array.from(new FormData(form).entries()).map(([k, v]) => [k, String(v).trim()])
    ) as Record<string, string>;

    if (data.company_website) return; // honeypot: silently drop bots
    delete data.company_website;

    const found = validate(type, data);
    setErrors(found);
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    const res = await submitForm({
      ...data,
      formType: type,
      submittedAt: new Date().toISOString(),
      page: window.location.pathname,
    });
    if (res.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus(res.reason);
    }
  }

  return { status, setStatus, errors, onSubmit };
}

function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this empty
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function Consent({ error, form }: { error?: string; form: FormType }) {
  const errId = `${form}-consent-error`;
  return (
    <div className="sm:col-span-2 lg:col-span-12">
      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          name="consent"
          value="yes"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          className="mt-0.5 h-4 w-4 shrink-0 rounded accent-plum-700"
        />
        I&apos;m happy to be contacted about my enquiry. My details won&apos;t be shared.
      </label>
      {error && (
        <p id={errId} role="alert" className="mt-1.5 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitRow({ status, label }: { status: Status; label: string }) {
  const contactLine = site.contact.email
    ? `email ${site.contact.email}`
    : "message on Instagram or LinkedIn";
  return (
    <div className="sm:col-span-2 lg:col-span-12">
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-plum-700 px-8 py-4 font-semibold text-ivory shadow-lg shadow-plum-700/20 transition-all hover:bg-plum-900 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" && (
          <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-ivory/40 border-t-ivory" />
        )}
        {status === "submitting" ? "Sending…" : label}
      </button>
      <div aria-live="polite" className="mt-4 text-sm">
        {status === "error" && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-red-800">
            Something went wrong. Please try again, or {contactLine}.
          </p>
        )}
        {status === "not-configured" && (
          <p className="rounded-xl bg-gold-300/25 px-4 py-3 text-gold-700">
            Online enquiries are being set up. In the meantime, please {contactLine}.
          </p>
        )}
      </div>
    </div>
  );
}

function Success({ onReset, message }: { onReset: () => void; message: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <div ref={ref} tabIndex={-1} role="status" className="flex flex-col items-center py-12 text-center focus:outline-none">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-plum-700 text-gold-300">
        <CheckIcon className="h-8 w-8" />
      </span>
      <p className="mt-6 font-display text-2xl text-plum-900">Thank you!</p>
      <p className="mt-2 max-w-sm text-muted">{message}</p>
      <button type="button" onClick={onReset} className="mt-8 text-sm font-semibold text-plum-700 underline underline-offset-4">
        Send another message
      </button>
    </div>
  );
}

/* ─────────────────────────── Enquiry form ─────────────────────────── */

export function EnquiryForm() {
  const { status, setStatus, errors, onSubmit } = useLeadForm("enquiry");
  const [program, setProgram] = useState("");
  const programOptions = [...programs.map((p) => p.title), "Not sure yet"];

  useEffect(() => {
    const onSelect = (e: Event) => setProgram((e as CustomEvent<string>).detail);
    window.addEventListener(PROGRAM_EVENT, onSelect);
    return () => window.removeEventListener(PROGRAM_EVENT, onSelect);
  }, []);

  if (status === "success")
    return <Success onReset={() => { setStatus("idle"); setProgram(""); }} message="Your enquiry has been received. We'll get back to you soon." />;

  return (
    <FormIdContext.Provider value="enquiry">
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4 short:gap-3" aria-label="Program enquiry form">
      <Honeypot />
      <TextField name="name" label="Full name" required autoComplete="name" className="lg:col-span-4" error={errors.name} />
      <TextField name="email" type="email" label="Email" required autoComplete="email" className="lg:col-span-5" error={errors.email} />
      <TextField className="lg:col-span-3" name="phone" type="tel" label="Phone / WhatsApp" autoComplete="tel" placeholder="+91" error={errors.phone} />
      <SelectField name="role" label="I am a…" required options={enquiryRoles} className="lg:col-span-4" error={errors.role} />
      <SelectField name="program" label="Program of interest" required className="lg:col-span-5" options={programOptions} value={program} onChange={setProgram} error={errors.program} />
      <SelectField name="mode" label="Preferred mode" options={enquiryModes} className="lg:col-span-3" />
      <TextArea name="message" label="What would you like to improve?" rows={3} className="sm:col-span-2 lg:col-span-12" placeholder="Tell us a little about your goals…" />
      <Consent form="enquiry" error={errors.consent} />
      <SubmitRow status={status} label="Send enquiry" />
    </form>
    </FormIdContext.Provider>
  );
}

/* ─────────────────────────── General contact form ─────────────────────────── */

export function ContactForm() {
  const { status, setStatus, errors, onSubmit } = useLeadForm("contact");

  if (status === "success")
    return <Success onReset={() => setStatus("idle")} message="Your message has been received. We'll be in touch soon." />;

  return (
    <FormIdContext.Provider value="contact">
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4 short:gap-3" aria-label="Contact form">
      <Honeypot />
      <TextField name="name" label="Full name" required autoComplete="name" className="lg:col-span-6" error={errors.name} />
      <TextField name="email" type="email" label="Email" required autoComplete="email" className="lg:col-span-6" error={errors.email} />
      <TextField name="subject" label="Subject" className="sm:col-span-2 lg:col-span-12" placeholder="Speaking invitation, collaboration, question…" />
      <TextArea name="message" label="Message" required rows={4} className="sm:col-span-2 lg:col-span-12" error={errors.message} />
      <Consent form="contact" error={errors.consent} />
      <SubmitRow status={status} label="Send message" />
    </form>
    </FormIdContext.Provider>
  );
}

/* ─────────────────────────── Tabs wrapper ─────────────────────────── */

const tabs = [
  { id: "enquiry", label: "Program enquiry" },
  { id: "contact", label: "General message" },
] as const;

export default function LeadForms() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("enquiry");

  useEffect(() => {
    const toEnquiry = () => setActive("enquiry");
    window.addEventListener(PROGRAM_EVENT, toEnquiry);
    return () => window.removeEventListener(PROGRAM_EVENT, toEnquiry);
  }, []);

  return (
    <div>
      <div role="tablist" aria-label="Choose a form" className="mb-8 inline-flex rounded-full bg-cream p-1.5 lg:mb-5 short:mb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setActive(t.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              active === t.id ? "bg-plum-700 text-ivory shadow" : "text-plum-900 hover:text-plum-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* Both stay mounted so the pre-selected program survives tab switches. */}
      <div role="tabpanel" id="panel-enquiry" aria-labelledby="tab-enquiry" hidden={active !== "enquiry"}>
        <EnquiryForm />
      </div>
      <div role="tabpanel" id="panel-contact" aria-labelledby="tab-contact" hidden={active !== "contact"}>
        <ContactForm />
      </div>
    </div>
  );
}
