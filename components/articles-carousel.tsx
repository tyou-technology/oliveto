"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const articles = [
  {
    id: 1,
    slug: "deducao-despesas-jcp-agro",
    category: "Agro.",
    title:
      "A dedução das despesas a título de Juros sobre o Capital Próprio (JCP) é crucial para a diminuição da carga tributária",
    image: "/business-meeting-office.png",
  },
  {
    id: 2,
    slug: "deducao-despesas-jcp-tributaria",
    category: "Tributária.",
    title: "Principais mudanças na legislação tributária para empresas em 2025",
    image: "/man-working-laptop-coffee.jpg",
  },
  {
    id: 3,
    slug: "deducao-despesas-jcp-brasil",
    category: "Brasil.",
    title: "Como a reforma tributária impacta os negócios brasileiros",
    image: "/barista-coffee-shop.jpg",
  },
  {
    id: 4,
    slug: "deducao-despesas-jcp-politica",
    category: "Política.",
    title:
      "Novas políticas fiscais e seus impactos na contabilidade empresarial",
    image: "/modern-architecture-building.png",
  },
  {
    id: 5,
    slug: "deducao-despesas-jcp-londrina",
    category: "Londrina.",
    title: "Oportunidades tributárias para empresas da região de Londrina",
    image: "/photographer-camera.jpg",
  },
];

export function ArticlesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsPerView = 3;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev + 1 >= articles.length - itemsPerView + 1 ? 0 : prev + 1
    );
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? articles.length - itemsPerView : prev - 1
    );
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-neutral-500 text-sm tracking-wider">
              Blog.
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-white mt-2">
              Artigos <span className="text-[#00FF90]">recentes</span>
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
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  nextSlide();
                  setIsAutoPlaying(false);
                }}
                className="p-3 border border-neutral-700 hover:border-[#00FF90] hover:text-[#00FF90] transition-colors"
                aria-label="Próximo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Ver todos */}
            <Link
              href="/artigos"
              className="hidden md:flex items-center gap-2 text-sm text-neutral-400 hover:text-[#00FF90] transition-colors group"
            >
              Ver todos
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
              <Link
                key={article.id}
                href={`/artigos/${article.slug}`}
                className="min-w-[calc(33.333%-16px)] group"
              >
                <article className="relative">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden mb-4">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Content */}
                  <span className="text-[#00FF90] text-sm font-medium">
                    {article.category}
                  </span>
                  <h3 className="text-white text-base mt-2 leading-relaxed line-clamp-3 group-hover:text-neutral-300 transition-colors">
                    {article.title}
                  </h3>

                  {/* Read more indicator */}
                  <div className="flex items-center gap-2 mt-4 text-neutral-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Ler artigo</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </article>
              </Link>
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
            href="/artigos"
            className="flex items-center gap-2 text-sm border border-neutral-700 px-6 py-3 hover:border-[#00FF90] hover:text-[#00FF90] transition-colors"
          >
            Ver todos os artigos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
