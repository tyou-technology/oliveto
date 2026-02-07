import Image from "next/image";
import { Eye, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/atoms/card";
import { Badge } from "@/components/atoms/badge";
import { DashboardArticle } from "../../types";
import { cn } from "@/lib/utils";

interface ArticlePerformanceCardProps {
  article: DashboardArticle;
}

export function ArticlePerformanceCard({ article }: ArticlePerformanceCardProps) {
  const isPublished = article.status === "PUBLISHED";

  return (
    <Card className="group overflow-hidden border-white/10 bg-card transition-all duration-200 hover:border-primary/50 hover:shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground bg-white/5">
            Sem imagem
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge
            variant={isPublished ? "default" : "secondary"}
            className={cn(
              "shadow-sm backdrop-blur-md",
              isPublished ? "bg-emerald-500/90 hover:bg-emerald-500" : "bg-neutral-500/90 hover:bg-neutral-500"
            )}
          >
            {isPublished ? "Publicado" : "Rascunho"}
          </Badge>
        </div>
      </div>

      <CardContent className="flex flex-col gap-3 p-4">
        <div className="space-y-1">
          <h3 className="line-clamp-1 font-semibold tracking-tight group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {article.briefing || "Sem descrição..."}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            <span>{article.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{article.readingTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
