import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { articlesApi, PaginatedResponse } from "../api/articles.api";
import { ArticleResponseDTO } from "@/lib/types/article";
import { QUERY_CONFIG } from "@/lib/config/query";

export const useInfiniteArticles = (
  firmId?: string,
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
    queryKey: ["articles", "infinite", firmId, size, publishedOnly],
    queryFn: ({ pageParam }) =>
      publishedOnly
        ? articlesApi.getPublishedByFirmId(firmId!, pageParam as number, size)
        : articlesApi.getAllByFirmId(firmId!, pageParam as number, size),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.page.number < lastPage.page.totalPages - 1) {
        return lastPage.page.number + 1;
      }
      return undefined;
    },
    enabled: !!firmId,
    staleTime: QUERY_CONFIG.ARTICLES_STALE_TIME,
    initialData,
  });

  // Performance optimization: Memoize the flattened articles array.
  // data.pages.flatMap() creates a new array reference on every render, causing
  // unnecessary re-renders in consumers (e.g. lists).
  // By memoizing, we ensure referential stability when data hasn't changed.
  const articles = useMemo(
    () => data?.pages.flatMap((page) => page.content) || [],
    [data?.pages]
  );
  const totalElements = data?.pages[0]?.page.totalElements || 0;

  return {
    articles,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    totalElements,
  };
};
