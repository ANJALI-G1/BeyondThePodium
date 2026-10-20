import { approach } from "@/content/site";
import ArtPanel from "../ArtPanel";
import { ArrowIcon, ButtonLink, Container, SectionHeading } from "../ui";
import Reveal from "../Reveal";

export default function Approach() {
  return (
    <section id="approach" className="py-24 sm:py-32">
      <Container>
        <ArtPanel variant="rings" className="rounded-[2.5rem] px-6 py-16 sm:px-12 sm:py-20 lg:px-14 lg:py-12 short:py-9">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-12">
            <Reveal>
              <SectionHeading
                light
                eyebrow="The approach"
                title={
                  <>
                    From nervous to <span className="italic text-gold-300">natural</span>
                  </>
                }
                intro="A simple, supportive process focused on real progress — not perfection."
              />
              <ButtonLink href="#contact" variant="light" className="mt-10 lg:mt-8 short:mt-6">
                Start with a conversation <ArrowIcon />
              </ButtonLink>
            </Reveal>

            <ol className="grid gap-5 sm:grid-cols-2">
              {approach.map((s, i) => (
                <Reveal key={s.step} as="li" delay={i * 100}>
                  <div className="h-full rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm transition-colors hover:bg-white/10 lg:p-6 short:p-5">
                    <span className="font-display text-4xl text-gold-300/80 lg:text-3xl">{s.step}</span>
                    <h3 className="mt-4 font-display text-xl text-ivory lg:mt-3">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-plum-100/85">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </ArtPanel>
      </Container>
    </section>
  );
}
