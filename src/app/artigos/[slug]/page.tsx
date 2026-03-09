import {Header} from "@/components/organisms/header";
import {Footer} from "@/components/organisms/footer";
import Link from "next/link";
import {notFound} from "next/navigation";
import {articlesApi} from "@/features/articles/api/articles.api";
import {format} from "date-fns";
import {ptBR} from "date-fns/locale";
import {env} from "@/lib/env";
import {CategoryBadge} from "@/components/atoms/category-badge";
import {sanitizeHtml} from "@/lib/utils/sanitizer";
import { Metadata } from "next";
import { ReadingProgress } from "@/components/atoms/reading-progress";

/**
 * This function is required for `output: "export"` config.
 * It tells Next.js which article pages to generate at build time.
 * NOTE: Your backend API must be accessible during the build process for this to work.
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // We intentionally allow this to throw if the API fails, ensuring the build fails
  // instead of silently generating 0 pages.
  // Performance: Using fetch-based 'getPublicPublished' to enable Data Cache
  const response = await articlesApi.getPublicPublished(0, 1000);

  if (!response || !Array.isArray(response.data)) {
    throw new Error("Invalid API response format: 'data' array missing.");
  }

  if (response.data.length === 0) {
    console.warn("No articles found to generate static params.");
    return [];
  }

  const paths = response.data
    .filter((article: any) => {
      if (!article.slug && !article.id) {
        console.warn(`Article found without Slug or ID: ${article.title || "Unknown Title"}. Skipping.`);
        return false;
      }
      return true;
    })
    .map((article: any) => ({
      slug: article.slug || article.id, // Prefer slug, fallback to ID if slug is missing (though slug is preferred for SEO)
    }));

  return paths;
}

async function getArticle(slug: string) {
  try {
    // Performance: Using fetch-based 'getPublicBySlug' to enable Request Memoization and Data Cache
    return await articlesApi.getPublicBySlug(slug);
  } catch (error) {
    console.error(`Failed to fetch article with slug: ${slug}`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Artigo não encontrado | Oliveto Contabilidade",
      description: "O artigo que você procura não foi encontrado.",
    };
  }

  return {
    title: `${article.title} | Oliveto Contabilidade`,
    description: article.briefing || article.seoDescription || `Leia o artigo completo sobre ${article.title}.`,
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.briefing || "",
      type: "article",
      authors: article.author?.name ? [article.author.name] : undefined,
      publishedTime: article.publishedAt,
      images: article.coverUrl ? [{ url: article.coverUrl }] : undefined,
    },
  };
}

export default async function ArtigoPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ReadingProgress />
      <Header />

      {/* Green bar */}
      <div className="h-2 bg-primary" />

      {/* Article Header */}
      <section className="bg-black py-12 md:py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-5xl">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-1 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/artigos"
                  className="hover:text-primary transition-colors"
                >
                  Artigos
                </Link>
              </li>
            </ol>
          </nav>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <CategoryBadge 
                  key={tag.id} 
                  category={tag.name} 
                  color={tag.color} 
                />
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6 max-w-3xl">
            {article.title}
          </h1>

          {/* Author and Date */}
          <div className="flex flex-col  gap-4 text-sm text-muted-foreground mb-2">
            {article.briefing && (
                <p className="text-lg  mb-2 font-thin leading-relaxed">
                  {article.briefing}
                </p>
            )}
            <div className={"flex  gap-4 items-center"}>
              <p>
                Autor: <span className="text-primary">{article.author?.name}</span>
              </p>
              {article.publishedAt && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-neutral-600"/>
                    <p>
                      {format(new Date(article.publishedAt), "dd 'de' MMMM 'de' yyyy", {locale: ptBR})}
                    </p>
                  </>
              )}
            </div>
          </div>


          {/* Cover Image */}
          {article.coverUrl && (
           <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8">
             <img
               src={article.coverUrl}
               alt={article.title}
               className="object-cover w-full h-full"
             />
           </div>
          )}
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-secondary text-white py-12 md:py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-5xl">

          {article.content && (
            <div
              className="prose prose-invert max-w-none prose-custom prose-p:text-gray-300 prose-headings:text-white prose-a:text-primary hover:prose-a:text-primary/80"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }}
            />
          )}

          {/* Divider */}
          <div className="border-t border-gray-300 my-12" />

          {/* Back button */}
          <Link
            href="/artigos"
            className="inline-block text-sm font-medium text-white hover:text-primary transition-colors"
          >
            VOLTAR
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
