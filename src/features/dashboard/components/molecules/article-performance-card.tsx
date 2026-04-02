import { Eye, Clock } from "lucide-react";
import { DashboardArticle } from "../../types";
import { cn } from "@/lib/utils";

interface ArticlePerformanceCardProps {
  article: DashboardArticle;
}

export function ArticlePerformanceCard({ article }: ArticlePerformanceCardProps) {
  const isPublished = article.publishedAt !== null;

  return (
    <div className="group bg-surface border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300">
      <div className="flex flex-col gap-3 p-4">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 font-semibold text-white group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            <span className={cn(
              "shrink-0 text-xs px-2 py-1 rounded-full font-medium",
              isPublished
                ? "bg-primary/90 text-black"
                : "bg-white/10 text-white"
            )}>
              {isPublished ? "Publicado" : "Rascunho"}
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-4 text-xs text-neutral-500 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5 text-primary" />
            <span>{article.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span>{article.readingTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
