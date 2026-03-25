import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { articlesService } from "@/services/articles.service";
import { UpdateArticleDTO, ArticleResponseDTO } from "@/lib/types/article";
import { toast } from "sonner";
import { getFriendlyErrorMessage } from "@/lib/utils/error-handler";
import { QUERY_CONFIG } from "@/lib/config/query";
import { QUERY_KEYS } from "@/lib/config/query-keys";

const EMPTY_ARRAY: ArticleResponseDTO[] = [];

export const useArticles = (page = 1, size = 10, publishedOnly = false) => {
  const queryClient = useQueryClient();

  const { data: articlesData, isLoading: isLoadingArticles } = useQuery({
    queryKey: QUERY_KEYS.ARTICLES.LIST({ page, size, publishedOnly }),
    queryFn: () =>
      publishedOnly
        ? articlesService.getPublished(page, size)
        : articlesService.getAll(page, size),
    staleTime: QUERY_CONFIG.ARTICLES_STALE_TIME,
  });

  const createArticle = useMutation({
    mutationFn: articlesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ARTICLES.ALL });
      toast.success("Artigo criado com sucesso!");
    },
    onError: (error) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });

  const updateArticle = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateArticleDTO }) =>
      articlesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ARTICLES.ALL });
      toast.success("Artigo atualizado com sucesso!");
    },
    onError: (error) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });

  const deleteArticle = useMutation({
    mutationFn: articlesService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ARTICLES.ALL });
      toast.success("Artigo excluído com sucesso!");
    },
    onError: (error) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });

  return useMemo(
    () => ({
      articles: articlesData?.data ?? EMPTY_ARRAY,
      totalPages: articlesData?.meta?.totalPages ?? 0,
      totalElements: articlesData?.meta?.total ?? 0,
      isLoadingArticles,
      createArticle,
      updateArticle,
      deleteArticle,
    }),
    [articlesData, isLoadingArticles, createArticle, updateArticle, deleteArticle]
  );
};
