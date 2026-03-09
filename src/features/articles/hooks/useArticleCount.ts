import { useQuery } from "@tanstack/react-query";
import { articlesService } from "@/services/articles.service";

interface UseArticleCountOptions {
  enabled?: boolean;
}

export const useArticleCount = ({ enabled = true }: UseArticleCountOptions = {}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["articles", "published", "count"],
    queryFn: () => articlesService.getPublished(1, 1),
    enabled,
    staleTime: 300000, // 5 minutes
  });

  return {
    count: data?.meta?.total ?? 0,
    isLoading,
  };
};
