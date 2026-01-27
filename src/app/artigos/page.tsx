"use client";

import { useState } from "react";
import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import { PageBackgroundWords } from "@/components/atoms/page-background-words";
import { FilterBar } from "@/components/molecules/filter-bar";
import { ArticleGridItem } from "@/components/molecules/article-grid-item";
import { LoadMoreButton } from "@/components/atoms/load-more-button";
import { articlesPageContent } from "@/lib/constants/articles-page";
import { articlesPageData } from "@/lib/constants/articles-page-data";

export default function ArtigosPage() {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const visibleArticles = articlesPageData.slice(0, visibleCount);
  const hasMore = visibleCount < articlesPageData.length;

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

      {/* Filters */}
      <section className="container mx-auto px-6 py-8 text-white">
        <FilterBar availableCount={articlesPageData.length} />

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
          {visibleArticles.map((artigo) => (
            <ArticleGridItem key={artigo.id} article={artigo} />
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <LoadMoreButton
            text={articlesPageContent.loadMoreButtonText}
            onClick={handleLoadMore}
          />
        )}
      </section>

      <Footer />
    </main>
  );
}
