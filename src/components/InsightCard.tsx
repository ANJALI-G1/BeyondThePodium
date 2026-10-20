import Link from "next/link";
import { formatDate, type Article } from "@/content/insights";
import ArtPanel from "./ArtPanel";
import { ArrowIcon } from "./ui";

const covers = ["wave", "rings", "podium"] as const;

export default function InsightCard({ article, index }: { article: Article; index: number }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-plum-700/10 bg-ivory transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-plum-900/10">
      {/* IMAGE SLOT: replace with a cover image per article if desired */}
      <ArtPanel variant={covers[index % covers.length]} className="aspect-[16/10] lg:aspect-[16/7] short:aspect-[16/6]">
        <span className="absolute left-5 top-5 rounded-full bg-ivory/90 px-3 py-1 text-xs font-semibold text-plum-700">
          {article.category}
        </span>
      </ArtPanel>
      <div className="flex flex-1 flex-col p-7 lg:p-6 short:p-5">
        <p className="text-xs uppercase tracking-wider text-muted">
          <time dateTime={article.date}>{formatDate(article.date)}</time> · {article.readMinutes} min read
        </p>
        <h3 className="mt-3 font-display text-xl leading-snug text-plum-900">
          <Link href={`/insights/${article.slug}/`} className="after:absolute after:inset-0 focus:outline-none">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{article.excerpt}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-plum-700 lg:mt-4">
          Read article <ArrowIcon />
        </span>
      </div>
    </article>
  );
}
