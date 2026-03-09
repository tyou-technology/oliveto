import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { articlesApi, PaginatedResponse } from "../api/articles.api";
import { ArticleResponseDTO } from "@/lib/types/article";
import { QUERY_CONFIG } from "@/lib/config/query";

export const useInfiniteArticles = (
  size = 10,
  publishedOnly = false,
  initialData?: { pages: PaginatedResponse<ArticleResponseDTO>[]; pageParams: unknown[] }
) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["articles", "infinite", size, publishedOnly],
    queryFn: ({ pageParam }) =>
      publishedOnly
        ? articlesApi.getPublished((pageParam as number) + 1, size)
        : articlesApi.getAll((pageParam as number) + 1, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page; // Assuming pageParam works 0-indexed for `api` or 1-indexed? The function above does pageParam + 1. But wait, `getNextPageParam` should return the next `pageParam`.
      }
      return undefined;
    },
    staleTime: QUERY_CONFIG.ARTICLES_STALE_TIME,
    initialData,
  });

  const articles = useMemo(() => data?.pages.flatMap((page) => page.data) || [], [data]);
  const totalElements = data?.pages[0]?.meta?.total || 0;

  return useMemo(
    () => ({
      articles,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      totalElements,
    }),
    [articles, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, totalElements]
  );
};
