import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {articlesApi} from "../api/articles.api";
import {UpdateTagDTO, TagResponseDTO} from "@/lib/types/article";
import {toast} from "sonner";
import {getFriendlyErrorMessage} from "@/lib/utils/error-handler";
import {QUERY_CONFIG} from "@/lib/config/query";
import { useMemo } from "react";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

// Performance: Stable empty array reference to prevent unnecessary re-renders in memoized consumers
const EMPTY_ARRAY: TagResponseDTO[] = [];

export const useTags = (publishedOnly = false, initialData?: TagResponseDTO[]) => {
  const queryClient = useQueryClient();

  const { data: tagsData, isLoading: isLoadingTags } = useQuery({
    queryKey: ["tags", publishedOnly],
    queryFn: () => publishedOnly
      ? articlesApi.getPublishedTags()
      : articlesApi.getAllTags(),
    staleTime: QUERY_CONFIG.ARTICLES_STALE_TIME,
    initialData,
  });

  const createTag = useMutation({
    mutationFn: articlesApi.createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag criada com sucesso!");
    },
    onError: (error) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });

  const updateTag = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTagDTO }) =>
      articlesApi.updateTag(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag atualizada com sucesso!");
    },
    onError: (error) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });

  const deleteTag = useMutation({
    mutationFn: articlesApi.deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag excluída com sucesso!");
    },
    onError: (error) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });

  return useMemo(
    () => ({
      tags: tagsData || EMPTY_ARRAY,
      isLoadingTags,
      createTag,
      updateTag,
      deleteTag,
    }),
    [tagsData, isLoadingTags, createTag, updateTag, deleteTag]
  );
};
