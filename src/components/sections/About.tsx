import Image from "next/image";
import { about, site } from "@/content/site";
import ArtPanel from "../ArtPanel";
import { Container, Eyebrow } from "../ui";
import Reveal from "../Reveal";

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <Reveal className="relative">
          {/* IMAGE SLOT: replace ArtPanel with a workshop / speaking photo of Dr. Prachi */}
          <ArtPanel variant="podium" className="aspect-[4/5] rounded-[2rem] shadow-2xl shadow-plum-900/20 lg:aspect-auto lg:h-[min(34rem,calc(100svh-8rem))]">
            <blockquote className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <p className="font-display text-2xl leading-snug text-ivory sm:text-3xl">
                “Great communication isn&apos;t reserved for the stage.”
              </p>
              <footer className="mt-4 text-sm tracking-wide text-gold-300">— {site.brand}</footer>
            </blockquote>
          </ArtPanel>
          <div className="absolute -bottom-8 -right-4 h-28 w-28 overflow-hidden rounded-full border-4 border-ivory shadow-xl sm:-right-8 sm:h-36 sm:w-36">
            <Image src={site.headshot} alt="" fill sizes="9rem" className="object-cover object-[50%_25%]" />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-4xl leading-tight text-plum-900 sm:text-5xl short:mt-3 short:text-[2.6rem]">{about.heading}</h2>
            <p className="mt-3 text-sm font-medium text-gold-700">
              {site.name} ({site.credential}) · {site.experience} of experience
            </p>
          </Reveal>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted lg:mt-5 lg:space-y-3 lg:text-base short:mt-4 short:space-y-2.5 short:text-[15px] short:leading-[1.65]">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <ul className="mt-10 grid gap-4 sm:grid-cols-3 lg:mt-6 short:mt-4 short:gap-3">
              {about.pillars.map((p) => (
                <li key={p.title} className="rounded-2xl border border-plum-700/10 bg-cream/60 p-5 lg:p-4 short:px-4 short:py-3">
                  <p className="font-display text-lg text-plum-700">{p.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
