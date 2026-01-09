import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types/article";

interface ArticleGridItemProps {
  article: Article;
}

export function ArticleGridItem({ article }: ArticleGridItemProps) {
  return (
    <Link href={`/artigos/${article.slug}`}>
      <article className="group cursor-pointer">
        <div className="relative aspect-[4/3] overflow-hidden rounded mb-4">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <span className="text-primary text-sm font-medium">
          {article.category}
        </span>
        <p className="text-foreground text-sm text-white mt-2 leading-relaxed">
          {article.title}
        </p>
      </article>
    </Link>
  );
}
