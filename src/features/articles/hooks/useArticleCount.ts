import { useQuery } from "@tanstack/react-query";
import { articlesApi } from "../api/articles.api";
import { QUERY_CONFIG } from "@/lib/config/query";

interface UseArticleCountOptions {
  enabled?: boolean;
}

export const useArticleCount = (options: UseArticleCountOptions = {}) => {
  const { enabled = true } = options;

  const { data: count, isLoading } = useQuery({
    queryKey: ["articles", "count"],
    queryFn: articlesApi.count,
    enabled,
    staleTime: QUERY_CONFIG.ARTICLES_STALE_TIME,
  });

  return {
    count: count ?? 0,
    isLoading,
  };
};
