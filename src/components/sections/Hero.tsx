import Image from "next/image";
import { hero, highlights, site } from "@/content/site";
import { ArrowIcon, ButtonLink, Container, Eyebrow } from "../ui";
import Reveal from "../Reveal";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pt-40 lg:flex lg:min-h-svh lg:items-center lg:pb-10 lg:pt-24">
      {/* soft background shapes */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-plum-100/70 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-gold-300/25 blur-3xl" />

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div>
          <Reveal>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 font-display text-5xl leading-[1.04] tracking-tight text-plum-900 sm:text-6xl lg:mt-4 lg:text-[clamp(2.75rem,min(7.4svh,5.2vw),4.5rem)]">
              {hero.headline[0]}
              <br />
              <span className="italic text-plum-500">{hero.headline[1]}</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted lg:mt-5 lg:text-base xl:text-lg">{hero.sub}</p>
          </Reveal>
          <Reveal delay={300} className="mt-10 flex flex-col gap-4 sm:flex-row lg:mt-7">
            <ButtonLink href={hero.primaryCta.href}>
              {hero.primaryCta.label} <ArrowIcon />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </ButtonLink>
          </Reveal>

          <Reveal delay={400}>
            <dl className="mt-14 grid max-w-lg grid-cols-3 divide-x divide-plum-700/15 border-t border-plum-700/15 pt-8 lg:mt-8 lg:pt-6">
              {highlights.map((h) => (
                <div key={h.label} className="px-4 first:pl-0">
                  <dt className="sr-only">{h.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl text-plum-700 sm:text-3xl">{h.value}</span>
                    <span className="mt-1 block text-xs leading-snug text-muted sm:text-sm">{h.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mx-auto w-full max-w-md lg:w-[min(28rem,calc((100svh-9.5rem)*0.8))] lg:max-w-none">
          {/* gold offset arch */}
          <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full rounded-b-[2rem] border border-gold-500/60" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] bg-plum-100 shadow-2xl shadow-plum-900/20">
            <Image
              src={site.headshot}
              alt={`${site.name}, communication and public speaking coach`}
              fill
              preload
              loading="eager"
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="object-cover object-[50%_30%]"
            />
          </div>

          <div className="absolute -left-4 bottom-12 animate-float rounded-2xl bg-ivory/95 px-5 py-4 shadow-xl shadow-plum-900/10 backdrop-blur sm:-left-10">
            <p className="font-display text-lg leading-tight text-plum-900">{site.name}</p>
            <p className="text-xs text-muted">{site.credential} · Certified Soft Skills Trainer</p>
          </div>
          <div className="absolute -right-2 top-16 rounded-full bg-plum-700 px-4 py-2 text-xs font-semibold tracking-wide text-gold-300 shadow-lg sm:-right-6">
            🎤 Public Speaking Coach
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
