import { site } from "@/content/site";
import Hero from "@/components/sections/Hero";
import SkillsRibbon from "@/components/sections/SkillsRibbon";
import About from "@/components/sections/About";
import Programs from "@/components/sections/Programs";
import Approach from "@/components/sections/Approach";
import Testimonials from "@/components/sections/Testimonials";
import InsightsPreview from "@/components/sections/InsightsPreview";
import Contact from "@/components/sections/Contact";

// Structured data for search engines — verified facts only.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      honorificPrefix: "Dr.",
      jobTitle: site.title,
      image: `${site.url}${site.headshot}`,
      url: site.url,
      sameAs: site.socials.map((s) => s.href),
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: site.brand,
      description: site.description,
      url: site.url,
      image: `${site.url}${site.headshot}`,
      founder: { "@id": `${site.url}/#person` },
      areaServed: "IN",
      ...(site.contact.email && { email: site.contact.email }),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <SkillsRibbon />
      <About />
      <Programs />
      <Approach />
      <Testimonials />
      <InsightsPreview />
      <Contact />
    </>
  );
}
