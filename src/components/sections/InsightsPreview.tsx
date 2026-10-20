import { articles } from "@/content/insights";
import { site } from "@/content/site";
import InsightCard from "../InsightCard";
import { InstagramIcon } from "../Icons";
import { ArrowIcon, ButtonLink, Container, SectionHeading } from "../ui";
import Reveal from "../Reveal";

export default function InsightsPreview() {
  const instagram = site.socials[0];
  return (
    <section id="insights" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Insights"
              title={
                <>
                  Ideas to help you <span className="italic text-plum-500">speak better</span>
                </>
              }
              intro="Practical tips on communication, confidence and presence."
            />
          </Reveal>
          <Reveal delay={100} className="flex flex-wrap gap-3">
            <ButtonLink href="/insights/" variant="secondary">
              All insights <ArrowIcon />
            </ButtonLink>
            <a
              href={instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow ${instagram.handle} on Instagram for daily tips`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-plum-700 px-6 py-3.5 text-sm font-semibold tracking-wide text-ivory shadow-lg shadow-plum-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-plum-900"
            >
              <InstagramIcon className="h-4 w-4 text-gold-300" /> Daily tips on Instagram
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:mt-10 short:mt-7">
          {articles.slice(0, 3).map((a, i) => (
            <Reveal key={a.slug} delay={i * 100} className="relative h-full">
              <InsightCard article={a} index={i} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
