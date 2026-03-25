import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { articlesService } from "@/services/articles.service";
import { UpdateTagDTO, TagResponseDTO } from "@/lib/types/article";
import { toast } from "sonner";
import { getFriendlyErrorMessage } from "@/lib/utils/error-handler";
import { QUERY_CONFIG } from "@/lib/config/query";
import { QUERY_KEYS } from "@/lib/config/query-keys";

const EMPTY_ARRAY: TagResponseDTO[] = [];

export const useTags = (publishedOnly = false, initialData?: TagResponseDTO[]) => {
  const queryClient = useQueryClient();

  const { data: tagsData, isLoading: isLoadingTags } = useQuery({
    queryKey: QUERY_KEYS.TAGS.LIST(publishedOnly),
    queryFn: () =>
      publishedOnly ? articlesService.getPublishedTags() : articlesService.getAllTags(),
    staleTime: QUERY_CONFIG.ARTICLES_STALE_TIME,
    initialData,
  });

  const createTag = useMutation({
    mutationFn: articlesService.createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TAGS.ALL });
      toast.success("Tag criada com sucesso!");
    },
    onError: (error) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });

  const updateTag = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTagDTO }) =>
      articlesService.updateTag(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TAGS.ALL });
      toast.success("Tag atualizada com sucesso!");
    },
    onError: (error) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });

  const deleteTag = useMutation({
    mutationFn: articlesService.deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TAGS.ALL });
      toast.success("Tag excluída com sucesso!");
    },
    onError: (error) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });

  return useMemo(
    () => ({ tags: tagsData ?? EMPTY_ARRAY, isLoadingTags, createTag, updateTag, deleteTag }),
    [tagsData, isLoadingTags, createTag, updateTag, deleteTag]
  );
};
