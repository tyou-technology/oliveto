import { useQuery } from "@tanstack/react-query";
import { articlesApi } from "../api/articles.api";

export const useArticle = (id: string | null) => {
  const { data: article, isLoading, error } = useQuery({
    queryKey: ["article", id],
    queryFn: () => articlesApi.getById(id!),
    enabled: !!id,
  });

  return {
    article,
    isLoading,
    error,
  };
};
