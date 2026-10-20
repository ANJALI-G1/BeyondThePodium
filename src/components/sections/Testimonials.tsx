import { testimonials } from "@/content/site";
import { Container, SectionHeading } from "../ui";
import Reveal from "../Reveal";

/** Hidden until real testimonials are added in content/site.ts. */
export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section id="testimonials" className="bg-cream/70 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading center eyebrow="Kind words" title="Stories of finding a voice" />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100} as="figure" className="rounded-3xl bg-ivory p-8 shadow-sm">
              <span aria-hidden className="font-display text-6xl leading-none text-gold-500">“</span>
              <blockquote className="mt-2 leading-relaxed text-ink">{t.quote}</blockquote>
              <figcaption className="mt-6 border-t border-plum-700/10 pt-4">
                <p className="font-semibold text-plum-900">{t.name}</p>
                {t.role && <p className="text-sm text-muted">{t.role}</p>}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
