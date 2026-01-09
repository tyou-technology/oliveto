"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { articles } from "@/lib/constants/articles";
import { articlesCarouselContent } from "@/lib/constants/articles-carousel";
import { ArticleCard } from "@/components/molecules/article-card";

export function ArticlesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { itemsPerView, autoPlayInterval } = articlesCarouselContent;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev + 1 >= articles.length - itemsPerView + 1 ? 0 : prev + 1
    );
  }, [itemsPerView]);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? articles.length - itemsPerView : prev - 1
    );
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, autoPlayInterval]);

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-neutral-500 text-sm tracking-wider">
              {articlesCarouselContent.sectionLabel}
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-white mt-2">
              {articlesCarouselContent.title}
              <span className="text-[#00FF90]">
                {articlesCarouselContent.titleHighlight}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Navigation Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  prevSlide();
                  setIsAutoPlaying(false);
                }}
                className="p-3 border border-neutral-700 hover:border-[#00FF90] hover:text-[#00FF90] transition-colors"
                aria-label={articlesCarouselContent.prevButtonLabel}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  nextSlide();
                  setIsAutoPlaying(false);
                }}
                className="p-3 border border-neutral-700 hover:border-[#00FF90] hover:text-[#00FF90] transition-colors"
                aria-label={articlesCarouselContent.nextButtonLabel}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Ver todos */}
            <Link
              href={articlesCarouselContent.viewAllHref}
              className="hidden md:flex items-center gap-2 text-sm text-neutral-400 hover:text-[#00FF90] transition-colors group"
            >
              {articlesCarouselContent.viewAllText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / itemsPerView + 2)
              }%)`,
            }}
          >
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: articles.length - itemsPerView + 1 }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`h-1 transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-[#00FF90]"
                    : "w-4 bg-neutral-700 hover:bg-neutral-600"
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            )
          )}
        </div>

        {/* Mobile: Ver todos */}
        <div className="flex justify-center mt-8 md:hidden">
          <Link
            href={articlesCarouselContent.viewAllHref}
            className="flex items-center gap-2 text-sm border border-neutral-700 px-6 py-3 hover:border-[#00FF90] hover:text-[#00FF90] transition-colors"
          >
            {articlesCarouselContent.viewAllButtonText}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
