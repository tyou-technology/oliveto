import { useQuery } from "@tanstack/react-query";
import { articlesService } from "@/services/articles.service";
import { QUERY_KEYS } from "@/lib/config/query-keys";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const CUID_REGEX = /^c[a-z0-9]{20,30}$/i;

export const useArticle = (idOrSlug: string | null) => {
  const { data: article, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.ARTICLES.BY_SLUG(idOrSlug ?? ""),
    queryFn: () => {
      const isId = UUID_REGEX.test(idOrSlug!) || CUID_REGEX.test(idOrSlug!);
      return isId
        ? articlesService.getById(idOrSlug!)
        : articlesService.getBySlug(idOrSlug!);
    },
    enabled: !!idOrSlug,
  });

  return { article, isLoading, error };
};
