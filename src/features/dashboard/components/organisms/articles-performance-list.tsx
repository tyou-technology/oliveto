import Link from "next/link";
import { Eye, Clock, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/atoms/skeleton";
import { ROUTES } from "@/lib/config/routes";
import { DashboardArticle } from "../../types";

interface ArticlesPerformanceListProps {
  articles: DashboardArticle[];
  isLoading: boolean;
}

function ArticlesPerformanceListSkeleton() {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <Skeleton className="h-6 w-56" />
        <Skeleton className="h-4 w-20" />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-6 border-b border-white/5 last:border-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3 w-32" />
            </div>
            <div className="flex gap-6">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ArticlesPerformanceList({ articles, isLoading }: ArticlesPerformanceListProps) {
  if (isLoading) return <ArticlesPerformanceListSkeleton />;

  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Artigos Mais Visitados</h2>
        <Link
          href={ROUTES.ADMIN.DASHBOARD.ARTIGOS}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          Ver todos <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="divide-y divide-white/5">
        {articles.length === 0 ? (
          <p className="p-6 text-sm text-neutral-400">Nenhum artigo encontrado.</p>
        ) : (
          articles.map((article) => (
            <div key={article.id} className="p-6 hover:bg-white/5 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white truncate">{article.title}</h3>
                  <p className="text-sm text-neutral-500 mt-1">
                    {article.publishedAt
                      ? `Publicado em ${new Date(article.publishedAt).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" })}`
                      : "Não publicado"}
                  </p>
                </div>

                <div className="flex items-center gap-6 text-right shrink-0">
                  <div>
                    <div className="flex items-center gap-1 text-neutral-400">
                      <Eye className="w-4 h-4" aria-hidden="true" />
                      <span className="font-medium text-white">{article.views.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-neutral-500">visitas</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-neutral-400">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      <span className="font-medium text-white">{article.readingTime}</span>
                    </div>
                    <p className="text-xs text-neutral-500">leitura</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
