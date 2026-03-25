import { TrendingUp, Tag } from "lucide-react";
import { Skeleton } from "@/components/atoms/skeleton";
import { TrendingTag } from "../../types";

interface TrendingTagsCardProps {
  tags: TrendingTag[];
  isLoading: boolean;
}

export function TrendingTagsCard({ tags, isLoading }: TrendingTagsCardProps) {
  const maxViews = tags[0]?.totalViews ?? 1;

  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Tags em Alta</h2>
        <TrendingUp className="w-5 h-5 text-primary" aria-hidden="true" />
      </div>

      <div className="p-6 space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-1.5 w-full rounded-full" />
            </div>
          ))
        ) : tags.length === 0 ? (
          <p className="text-sm text-neutral-400">Nenhuma tag encontrada.</p>
        ) : (
          tags.map(({ name, totalViews, articleCount }, idx) => (
            <div key={name} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500 w-4">{idx + 1}</span>
                  <Tag className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  <span className="text-sm font-medium text-white">{name}</span>
                  <span className="text-xs text-neutral-500">
                    {articleCount} {articleCount === 1 ? "artigo" : "artigos"}
                  </span>
                </div>
                <span className="text-sm font-bold text-white">{totalViews.toLocaleString()}</span>
              </div>
              <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${(totalViews / maxViews) * 100}%` }}
                  role="meter"
                  aria-valuenow={totalViews}
                  aria-valuemax={maxViews}
                  aria-label={`${name}: ${totalViews.toLocaleString()} visitas`}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
