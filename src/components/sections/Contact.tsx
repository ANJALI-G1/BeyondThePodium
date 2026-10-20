import { site } from "@/content/site";
import LeadForms from "../forms/LeadForms";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon, socialIcons } from "../Icons";
import { Container, SectionHeading } from "../ui";
import Reveal from "../Reveal";

export default function Contact() {
  const { email, phone, whatsapp, location } = site.contact;
  const details = [
    email && { icon: MailIcon, label: "Email", value: email, href: `mailto:${email}` },
    whatsapp && { icon: WhatsAppIcon, label: "WhatsApp", value: phone || `+${whatsapp}`, href: `https://wa.me/${whatsapp}` },
    !whatsapp && phone && { icon: PhoneIcon, label: "Phone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    location && { icon: PinIcon, label: "Location", value: location },
  ].filter(Boolean) as { icon: typeof MailIcon; label: string; value: string; href?: string }[];

  return (
    <section id="contact" className="bg-cream/70 py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.75fr_1.5fr] lg:items-center lg:gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Get in touch"
            title={
              <>
                Let&apos;s find <span className="italic text-plum-500">your voice</span>
              </>
            }
            intro="Tell us a little about what you're looking for — coaching for yourself, training for your team, or a session for your institution — and we'll get back to you."
          />

          {details.length > 0 && (
            <ul className="mt-10 space-y-5 lg:mt-8 lg:space-y-4">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-plum-700 text-gold-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-muted">{label}</span>
                    {href ? (
                      <a href={href} className="font-medium text-plum-900 hover:text-plum-500" {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}>
                        {value}
                      </a>
                    ) : (
                      <span className="font-medium text-plum-900">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 lg:mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">Follow & connect</p>
            <ul className="mt-4 flex gap-3">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} — ${s.handle}`}
                      className="grid h-12 w-12 place-items-center rounded-full border border-plum-700/20 text-plum-700 transition-all hover:-translate-y-0.5 hover:bg-plum-700 hover:text-gold-300"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-[2rem] bg-ivory p-6 shadow-2xl shadow-plum-900/10 sm:p-10 lg:p-8 short:px-7 short:py-6">
            <LeadForms />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
