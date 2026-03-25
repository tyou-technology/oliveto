import { Metadata } from "next";
import { articlesService } from "@/services/articles.service";
import { ArtigoContent } from "./artigo-content";

/**
 * Pre-generates all article slug paths at build time.
 * Requires the backend API to be reachable during `next build`.
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const response = await articlesService.getPublicPublished(0, 1000);

    if (!response || !Array.isArray(response.data) || response.data.length === 0) {
      return [];
    }

    return response.data
      .filter((article) => article.slug || article.id)
      .map((article) => ({ slug: article.slug ?? article.id }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const article = await articlesService.getPublicBySlug(slug);

    return {
      title: `${article.title} | Oliveto Contabilidade`,
      description:
        article.briefing ||
        article.seoDescription ||
        `Leia o artigo completo sobre ${article.title}.`,
      openGraph: {
        title: article.seoTitle || article.title,
        description: article.seoDescription || article.briefing || "",
        type: "article",
        authors: article.author?.name ? [article.author.name] : undefined,
        publishedTime: article.publishedAt,
        images: article.coverUrl ? [{ url: article.coverUrl }] : undefined,
      },
    };
  } catch {
    return {
      title: "Artigo | Oliveto Contabilidade",
      description: "Leia nossos artigos sobre contabilidade e finanças.",
    };
  }
}

export default async function ArtigoPage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  return <ArtigoContent slug={slug} />;
}
