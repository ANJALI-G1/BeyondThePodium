import type { MetadataRoute } from "next";
import { articles } from "@/content/insights";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/insights/`, changeFrequency: "weekly", priority: 0.8 },
    ...articles.map((a) => ({
      url: `${site.url}/insights/${a.slug}/`,
      lastModified: a.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
