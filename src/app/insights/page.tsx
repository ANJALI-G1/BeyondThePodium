import type { Metadata } from "next";
import { articles } from "@/content/insights";
import InsightCard from "@/components/InsightCard";
import Reveal from "@/components/Reveal";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical tips on public speaking, communication, body language and interview confidence.",
  alternates: { canonical: "/insights/" },
};

export default function InsightsPage() {
  return (
    <section className="pb-24 pt-36 sm:pb-32 sm:pt-44">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Insights"
            title={
              <>
                Notes on speaking <span className="italic text-plum-500">with confidence</span>
              </>
            }
            intro="Practical ideas on communication, presence and public speaking — to read, practise and share."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 100} className="relative h-full">
              <InsightCard article={a} index={i} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
