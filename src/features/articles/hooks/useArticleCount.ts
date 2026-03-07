import { useQuery } from "@tanstack/react-query";
import { articlesApi } from "../api/articles.api";

interface UseArticleCountOptions {
  enabled?: boolean;
}

export const useArticleCount = (options: UseArticleCountOptions = {}) => {
  const { enabled = true } = options;

  const { data, isLoading } = useQuery({
    queryKey: ["articles", "published", "count"],
    queryFn: () => articlesApi.getPublished(1, 1), // Fetch just one item to get totalElements
    enabled,
    staleTime: 300000, // 5 minutes
  });

  return {
    count: data?.meta?.total ?? 0,
    isLoading,
  };
};
