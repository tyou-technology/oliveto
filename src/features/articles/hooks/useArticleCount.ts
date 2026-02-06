import { useQuery } from "@tanstack/react-query";
import { articlesApi } from "../api/articles.api";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

interface UseArticleCountOptions {
  enabled?: boolean;
}

export const useArticleCount = (options: UseArticleCountOptions = {}) => {
  const { enabled = true } = options;

  const { data: count, isLoading } = useQuery({
    queryKey: ["articles", "count"],
    queryFn: articlesApi.count,
    enabled,
    staleTime: STALE_TIME,
  });

  return {
    count: count ?? 0,
    isLoading,
  };
};
