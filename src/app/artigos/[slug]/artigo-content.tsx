"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import { CategoryBadge } from "@/components/atoms/category-badge";
import { ReadingProgress } from "@/components/atoms/reading-progress";
import { articlesService } from "@/services/articles.service";
import { sanitizeHtml } from "@/lib/utils/sanitizer";
import { getArticleTags, type ArticleResponseDTO } from "@/lib/types/article";

interface ArtigoContentProps {
  slug: string;
}

export function ArtigoContent({ slug }: ArtigoContentProps) {
  const router = useRouter();
  const [article, setArticle] = useState<ArticleResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Try by slug first, fall back to ID
        const data = await articlesService.getBySlug(slug).catch(() =>
          articlesService.getById(slug)
        );
        setArticle(data);
      } catch {
        router.replace("/artigos");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="h-2 bg-primary" />
        <section className="bg-black py-12">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-5xl space-y-6 animate-pulse">
            <div className="h-4 w-32 bg-white/10 rounded" />
            <div className="h-10 w-3/4 bg-white/10 rounded" />
            <div className="h-5 w-1/2 bg-white/10 rounded" />
            <div className="aspect-video w-full bg-white/10 rounded-xl" />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!article) return null;

  const tags = getArticleTags(article);
  const sanitizedContent = article.content ? sanitizeHtml(article.content) : "";

  return (
    <div className="min-h-screen bg-black text-white">
      <ReadingProgress />
      <Header />

      <div className="h-2 bg-primary" />

      {/* Article Header */}
      <section className="bg-black py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-5xl">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-1 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/artigos" className="hover:text-primary transition-colors">
                  Artigos
                </Link>
              </li>
            </ol>
          </nav>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <CategoryBadge key={tag.id} category={tag.name} color={tag.color} />
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6 max-w-3xl">
            {article.title}
          </h1>

          {/* Briefing + Author + Date */}
          <div className="flex flex-col gap-4 text-sm text-muted-foreground mb-2">
            {article.briefing && (
              <p className="text-lg mb-2 font-thin leading-relaxed">{article.briefing}</p>
            )}
            <div className="flex gap-4 items-center">
              <p>
                Autor: <span className="text-primary">{article.author?.name}</span>
              </p>
              {article.publishedAt && (
                <>
                  <span className="w-1 h-1 rounded-full bg-neutral-600" />
                  <p>
                    {format(new Date(article.publishedAt), "dd 'de' MMMM 'de' yyyy", {
                      locale: ptBR,
                    })}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Cover Image
          {article.coverUrl && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8">
              <img
                src={article.coverUrl}
                alt={article.title}
                className="object-cover w-full h-full"
              />
            </div>
          )} */}
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-secondary text-white py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-5xl">
          {sanitizedContent && (
            <div
              className="prose prose-invert max-w-none prose-custom prose-p:text-gray-300 prose-headings:text-white prose-a:text-primary hover:prose-a:text-primary/80"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          )}

          <div className="border-t border-gray-300 my-12" />

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
