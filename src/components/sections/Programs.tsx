import { programs } from "@/content/site";
import EnquireButton from "../EnquireButton";
import { CheckIcon, programIcons } from "../Icons";
import { ArrowIcon, Container, SectionHeading } from "../ui";
import Reveal from "../Reveal";

export default function Programs() {
  return (
    <section id="programs" className="bg-cream/70 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            split
            eyebrow="Programs & services"
            title={
              <>
                Ways we can <span className="italic text-plum-500">work together</span>
              </>
            }
            intro="Whether you're preparing for a big talk, leading a team or stepping into your first interview, there's a path designed for you."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:mt-8 lg:grid-cols-4 lg:gap-5 short:mt-5 short:gap-4">
          {programs.map((p, i) => {
            const Icon = programIcons[p.icon];
            return (
              <Reveal key={p.id} delay={(i % 2) * 120} as="article" className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-plum-700/10 bg-ivory p-8 transition-all duration-500 hover:-translate-y-1 hover:border-plum-300 hover:shadow-2xl hover:shadow-plum-900/10 sm:p-10 lg:p-6 short:p-5">
                  <div aria-hidden className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-plum-50 transition-transform duration-700 group-hover:scale-150" />
                  <div className="relative flex items-start justify-between gap-4 lg:items-center lg:justify-start lg:gap-3">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-plum-700 text-gold-300 lg:h-11 lg:w-11 lg:rounded-xl short:h-10 short:w-10">
                      <Icon className="h-7 w-7 lg:h-6 lg:w-6" />
                    </span>
                    <span className="rounded-full bg-gold-300/30 px-3 py-1 text-xs font-semibold text-gold-700 lg:hidden">{p.audience}</span>
                    <p className="hidden text-[11px] font-semibold uppercase leading-snug tracking-wider text-gold-700 lg:block">{p.audience}</p>
                  </div>
                  <h3 className="relative mt-7 font-display text-2xl text-plum-900 sm:text-[1.7rem] lg:mt-4 lg:text-xl lg:leading-snug short:mt-3 short:text-lg">{p.title}</h3>
                  <p className="relative mt-3 leading-relaxed text-muted lg:mt-2 lg:text-sm short:leading-normal">{p.summary}</p>
                  <ul className="relative mb-8 mt-6 space-y-2.5 lg:mb-4 lg:mt-3 lg:space-y-1.5 short:mb-3 short:space-y-1">
                    {p.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-3 text-sm text-ink lg:gap-2 lg:text-[13px]">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" /> {o}
                      </li>
                    ))}
                  </ul>
                  <div className="relative mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-plum-700/10 pt-6 lg:gap-2 lg:pt-3">
                    <p className="text-xs uppercase tracking-wider text-muted">{p.format}</p>
                    <EnquireButton
                      programTitle={p.title}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-plum-700 hover:text-plum-900"
                    >
                      Enquire <ArrowIcon />
                      <span className="sr-only"> about {p.title}</span>
                    </EnquireButton>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
