import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { articlesService } from "@/services/articles.service";
import { ApiListResponse } from "@/lib/types/api.types";
import { ArticleResponseDTO } from "@/lib/types/article";
import { QUERY_CONFIG } from "@/lib/config/query";
import { QUERY_KEYS } from "@/lib/config/query-keys";

export const useInfiniteArticles = (
  size = 10,
  publishedOnly = false,
  initialData?: { pages: ApiListResponse<ArticleResponseDTO>[]; pageParams: unknown[] }
) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: QUERY_KEYS.ARTICLES.INFINITE(size, publishedOnly),
      queryFn: ({ pageParam }) =>
        publishedOnly
          ? articlesService.getPublished((pageParam as number) + 1, size)
          : articlesService.getAll((pageParam as number) + 1, size),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (lastPage.meta.page < lastPage.meta.totalPages) {
          return lastPage.meta.page;
        }
        return undefined;
      },
      staleTime: QUERY_CONFIG.ARTICLES_STALE_TIME,
      initialData,
    });

  const articles = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);
  const totalElements = data?.pages[0]?.meta?.total ?? 0;

  return useMemo(
    () => ({ articles, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, totalElements }),
    [articles, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, totalElements]
  );
};
