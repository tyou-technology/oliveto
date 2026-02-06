import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ArticleResponseDTO } from "@/lib/types/article";
import { CategoryBadge } from "@/components/atoms/category-badge";
import { Key } from "react";
import { IMAGES } from "@/constants/images";

interface ArticleCardProps {
  article: ArticleResponseDTO;
  className?: string;
}

export function ArticleCard({article, className}: Readonly<ArticleCardProps>) {
  return (
      <Link
          href={`/artigos/${article.id}`}
          className={`min-w-[calc(33.333%-16px)] group ${className || ""}`}
      >
        <article className="relative">
          {/* Image */}
          <div className="relative h-56 overflow-hidden mb-4">
            <Image
                src={article.imageUrl || IMAGES.PLACEHOLDER}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
          </div>

          {/* Content */}
          {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag: { id: Key | null | undefined; name: string; }) => (
              <CategoryBadge key={tag.id} category={tag.name} />
            ))}
          </div>
        )}
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
  );
}
