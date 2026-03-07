import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { articlesApi } from "../api/articles.api";
import { UpdateArticleDTO, ArticleResponseDTO } from "@/lib/types/article";
import { toast } from "sonner";
import { getFriendlyErrorMessage } from "@/lib/utils/error-handler";
import { QUERY_CONFIG } from "@/lib/config/query";

const EMPTY_ARRAY: ArticleResponseDTO[] = [];

export const useArticles = (page = 1, size = 10, publishedOnly = false) => {
  const queryClient = useQueryClient();

  const { data: articlesData, isLoading: isLoadingArticles } = useQuery({
    queryKey: ["articles", page, size, publishedOnly],
    queryFn: () => publishedOnly 
      ? articlesApi.getPublished(page, size)
      : articlesApi.getAll(page, size),
    staleTime: QUERY_CONFIG.ARTICLES_STALE_TIME,
  });

  const createArticle = useMutation({
    mutationFn: articlesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast.success("Artigo criado com sucesso!");
    },
    onError: (error) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });

  const updateArticle = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateArticleDTO }) =>
      articlesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast.success("Artigo atualizado com sucesso!");
    },
    onError: (error) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });

  const deleteArticle = useMutation({
    mutationFn: articlesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast.success("Artigo excluído com sucesso!");
    },
    onError: (error) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });

  return useMemo(() => ({
    articles: articlesData?.data || EMPTY_ARRAY,
    totalPages: articlesData?.meta?.totalPages || 0,
    totalElements: articlesData?.meta?.total || 0,
    isLoadingArticles,
    createArticle,
    updateArticle,
    deleteArticle,
  }), [
    articlesData,
    isLoadingArticles,
    createArticle,
    updateArticle,
    deleteArticle
  ]);
};
