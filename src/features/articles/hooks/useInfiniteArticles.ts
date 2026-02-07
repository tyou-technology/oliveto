import { useInfiniteQuery } from "@tanstack/react-query";
import { articlesApi, PaginatedResponse } from "../api/articles.api";
import { ArticleResponseDTO } from "@/lib/types/article";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

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
    staleTime: STALE_TIME,
    initialData,
  });

  const articles = data?.pages.flatMap((page) => page.content) || [];
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
