import { useQuery } from "@tanstack/react-query";
import { articlesApi } from "../api/articles.api";

export const useArticle = (idOrSlug: string | null) => {
  const { data: article, isLoading, error } = useQuery({
    queryKey: ["article", idOrSlug],
    queryFn: () => {
      // Simple heuristic: if it looks like a UUID, assume ID, otherwise assume slug
      // UUID regex: 8-4-4-4-12 hex digits
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug!);
      // CUID regex (often used in Prisma): starts with c, followed by 20-30 alphanumeric chars
      const isCuid = /^c[a-z0-9]{20,30}$/i.test(idOrSlug!);
      
      if (isUuid || isCuid) {
        return articlesApi.getById(idOrSlug!);
      } else {
        return articlesApi.getBySlug(idOrSlug!);
      }
    },
    enabled: !!idOrSlug,
  });

  return {
    article,
    isLoading,
    error,
  };
};
