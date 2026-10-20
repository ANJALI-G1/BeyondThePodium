import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, formatDate, getArticle, type Block } from "@/content/insights";
import { site } from "@/content/site";
import { ArrowIcon, ButtonLink, Container, Eyebrow } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${article.slug}/` },
    openGraph: { type: "article", title: article.title, description: article.excerpt, publishedTime: article.date },
  };
}

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case "h2":
      return <h2 key={i}>{b.text}</h2>;
    case "ul":
      return (
        <ul key={i}>
          {b.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote key={i} className="my-10 border-l-2 border-gold-500 pl-6 font-display text-2xl italic leading-snug text-plum-700">
          {b.text}
        </blockquote>
      );
    default:
      return <p key={i}>{b.text}</p>;
  }
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 2);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.brand },
    mainEntityOfPage: `${site.url}/insights/${article.slug}/`,
  };

  return (
    <article className="pb-24 pt-36 sm:pt-44">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="max-w-3xl">
        <Link href="/insights/" className="text-sm font-medium text-plum-700 hover:text-plum-900">
          ← All insights
        </Link>
        <div className="mt-8">
          <Eyebrow>{article.category}</Eyebrow>
        </div>
        <h1 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight text-plum-900 sm:text-5xl">{article.title}</h1>
        <div className="mt-8 flex items-center gap-4 border-y border-plum-700/10 py-5">
          <span className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image src={site.headshot} alt="" fill sizes="3rem" className="object-cover" />
          </span>
          <div className="text-sm">
            <p className="font-semibold text-plum-900">{site.name}</p>
            <p className="text-muted">
              <time dateTime={article.date}>{formatDate(article.date)}</time> · {article.readMinutes} min read
            </p>
          </div>
        </div>

        <div className="prose-article mt-10 text-lg">{article.body.map(renderBlock)}</div>

        <div className="mt-16 rounded-[1.75rem] bg-plum-700 p-8 text-center sm:p-12">
          <p className="font-display text-2xl text-ivory sm:text-3xl">Ready to speak with more confidence?</p>
          <p className="mx-auto mt-3 max-w-md text-plum-100">Explore coaching and training designed around your goals.</p>
          <ButtonLink href="/#contact" variant="light" className="mt-8">
            Get in touch <ArrowIcon />
          </ButtonLink>
        </div>

        {more.length > 0 && (
          <nav aria-label="More insights" className="mt-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">Keep reading</p>
            <ul className="mt-4 divide-y divide-plum-700/10">
              {more.map((a) => (
                <li key={a.slug}>
                  <Link href={`/insights/${a.slug}/`} className="group flex items-center justify-between gap-4 py-5">
                    <span className="font-display text-xl text-plum-900 group-hover:text-plum-500">{a.title}</span>
                    <ArrowIcon className="h-5 w-5 shrink-0 text-plum-700" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Container>
    </article>
  );
}
