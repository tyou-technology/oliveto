import Image from "next/image";
import Link from "next/link";
import { ArticleResponseDTO, TagResponseDTO } from "@/lib/types/article";

interface ArticleGridItemProps {
  article: ArticleResponseDTO;
  allTags: TagResponseDTO[];
}

export function ArticleGridItem({ article, allTags }: Readonly<ArticleGridItemProps>) {
  const getCategoryName = () => {
    if (article.tagIds && article.tagIds.length > 0 && allTags) {
      const firstTagId = article.tagIds[0];
      const foundTag = allTags.find(tag => tag.id === firstTagId);
      return foundTag?.name || "Geral";
    }
    
    if (article.tags && article.tags.length > 0) {
      return article.tags[0].name;
    }

    return "Geral";
  };

  const category = getCategoryName();

  return (
    <Link href={`/artigos/${article.id}`}>
      <article className="group cursor-pointer">
        <div className="relative aspect-[4/3] overflow-hidden rounded mb-4">
          <Image
            src={article.imageUrl || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <span className="text-primary text-sm font-medium">
          {category}
        </span>
        <p className="text-foreground text-sm text-white mt-2 leading-relaxed">
          {article.title}
        </p>
      </article>
    </Link>
  );
}
