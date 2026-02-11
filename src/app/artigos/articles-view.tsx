"use client";

import { useMemo } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import { PageBackgroundWords } from "@/components/atoms/page-background-words";
import { FilterBar } from "@/components/molecules/filter-bar";
import { ArticleGridItem } from "@/components/molecules/article-grid-item";
import { LoadMoreButton } from "@/components/atoms/load-more-button";
import { articlesPageContent } from "@/lib/constants/articles-page";
import { useInfiniteArticles } from "@/features/articles/hooks/useInfiniteArticles";
import { useTags } from "@/features/articles/hooks/useTags";
import { env } from "@/lib/env";
import { Loader2 } from "lucide-react";
import { TagResponseDTO, ArticleResponseDTO } from "@/lib/types/article";
import { PaginatedResponse } from "@/features/articles/api/articles.api";

interface ArticlesViewProps {
  initialArticles?: { pages: PaginatedResponse<ArticleResponseDTO>[]; pageParams: unknown[] };
  initialTags?: { content: TagResponseDTO[] };
}

export function ArticlesView({ initialArticles, initialTags }: ArticlesViewProps) {
  const {
    articles,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingArticles,
    totalElements,
  } = useInfiniteArticles(
    env.NEXT_PUBLIC_FIRM_ID,
    6, // size
    true, // publishedOnly
    initialArticles
  );

  const { tags, isLoadingTags } = useTags(env.NEXT_PUBLIC_FIRM_ID, true, initialTags);

  const tagsMap = useMemo(() => {
    return new Map<string, TagResponseDTO>(tags.map((t) => [t.id, t]));
  }, [tags]);

  if (!isLoadingArticles && totalElements === 0) {
    notFound();
  }

  const handleLoadMore = () => {
    fetchNextPage();
  };

  const isLoading = isLoadingArticles || isLoadingTags;

  return (
    <main className="min-h-screen bg-secondary text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-primary pt-24 pb-12 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-black">
            {articlesPageContent.pageTitle}
          </h1>
        </div>
        <PageBackgroundWords />
      </section>

      <section className="container mx-auto px-6 py-8 text-white">
        <FilterBar availableCount={totalElements} />

        {/* Articles Grid */}
        {isLoading && articles.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 py-12">
            {articles.map((artigo) => (
              <ArticleGridItem
                key={artigo.id}
                article={artigo}
                tagsMap={tagsMap}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        {hasNextPage && (
          <LoadMoreButton
            text={articlesPageContent.loadMoreButtonText}
            onClick={handleLoadMore}
            loading={isFetchingNextPage}
            disabled={isFetchingNextPage}
          />
        )}
      </section>

      <Footer />
    </main>
  );
}
