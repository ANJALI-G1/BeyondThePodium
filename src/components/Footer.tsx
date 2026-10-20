import Link from "next/link";
import { nav, site } from "@/content/site";
import { socialIcons, MailIcon } from "./Icons";
import { Container } from "./ui";

export default function Footer() {
  return (
    <footer className="bg-plum-900 text-plum-100">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-[1.5fr_1fr_1fr] md:gap-12 md:py-16">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-2xl text-ivory">{site.brand}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold-300">with {site.name}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-plum-100/80 md:mt-5">{site.title}.</p>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Explore</p>
          <ul className="mt-3 space-y-0.5 text-sm md:mt-4 md:space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-10 items-center transition-colors hover:text-ivory md:min-h-8">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Connect</p>
          <ul className="mt-3 space-y-0.5 text-sm md:mt-4 md:space-y-1">
            {site.socials.map((s) => {
              const Icon = socialIcons[s.label];
              return (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2.5 transition-colors hover:text-ivory md:min-h-8">
                    <Icon className="h-4 w-4 shrink-0" /> {s.label}
                  </a>
                </li>
              );
            })}
            {site.contact.email && (
              <li>
                <a href={`mailto:${site.contact.email}`} className="inline-flex min-h-10 items-center gap-2.5 break-all transition-colors hover:text-ivory md:min-h-8">
                  <MailIcon className="h-4 w-4 shrink-0" /> {site.contact.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-1.5 py-5 text-xs md:gap-2 md:py-6 text-plum-100/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.brand}. All rights reserved.</p>
          <p>Speak with clarity. Lead with presence.</p>
        </Container>
      </div>
    </footer>
  );
}
