import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { articlesApi } from "../api/articles.api";
import { UpdateArticleDTO, ArticleResponseDTO } from "@/lib/types/article";
import { toast } from "sonner";
import { getFriendlyErrorMessage } from "@/lib/utils/error-handler";
import { QUERY_CONFIG } from "@/lib/config/query";

const EMPTY_ARRAY: ArticleResponseDTO[] = [];

export const useArticles = (firmId?: string, page = 0, size = 10, publishedOnly = false) => {
  const queryClient = useQueryClient();

  const { data: articlesData, isLoading: isLoadingArticles } = useQuery({
    queryKey: ["articles", firmId, page, size, publishedOnly],
    queryFn: () => publishedOnly 
      ? articlesApi.getPublishedByFirmId(firmId!, page, size)
      : articlesApi.getAllByFirmId(firmId!, page, size),
    enabled: !!firmId,
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

  return {
    articles: articlesData?.content || EMPTY_ARRAY,
    totalPages: articlesData?.page?.totalPages || 0,
    totalElements: articlesData?.page?.totalElements || 0,
    isLoadingArticles,
    createArticle,
    updateArticle,
    deleteArticle,
  };
};
