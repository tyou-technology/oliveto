import { Plus, Newspaper } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { ArticlePerformanceCard } from "../molecules/article-performance-card";
import { DashboardArticle } from "../../types";
import { Skeleton } from "@/components/atoms/skeleton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/atoms/empty";

interface ArticlesInsightProps {
  articles: DashboardArticle[];
  isLoading: boolean;
}

function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function ArticlesInsight({ articles, isLoading }: ArticlesInsightProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <Empty className="bg-card">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Newspaper className="h-6 w-6" />
          </EmptyMedia>
          <EmptyTitle>Nenhum artigo encontrado</EmptyTitle>
          <EmptyDescription>
            Comece a publicar conteúdo para ver métricas de performance aqui.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Criar Artigo
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {articles.map((article) => (
        <ArticlePerformanceCard key={article.id} article={article} />
      ))}
    </div>
  );
}
