import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {articlesApi} from "../api/articles.api";
import {UpdateTagDTO} from "@/lib/types/article";
import {toast} from "sonner";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const useTags = (firmId?: string) => {
  const queryClient = useQueryClient();

  const { data: tagsData, isLoading: isLoadingTags } = useQuery({
    queryKey: ["tags", firmId],
    queryFn: () => articlesApi.getAllTagsByFirmId(firmId!),
    enabled: !!firmId,
    staleTime: STALE_TIME,
  });

  const createTag = useMutation({
    mutationFn: articlesApi.createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag criada com sucesso!");
    },
    onError: (error: any) => {
      toast.error("Erro ao criar tag: " + (error.response?.data?.message || error.message));
    },
  });

  const updateTag = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTagDTO }) =>
      articlesApi.updateTag(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag atualizada com sucesso!");
    },
    onError: (error: any) => {
      toast.error("Erro ao atualizar tag: " + (error.response?.data?.message || error.message));
    },
  });

  const deleteTag = useMutation({
    mutationFn: articlesApi.deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag excluída com sucesso!");
    },
    onError: (error: any) => {
      toast.error("Erro ao excluir tag: " + (error.response?.data?.message || error.message));
    },
  });

  return {
    tags: tagsData?.content || [],
    isLoadingTags,
    createTag,
    updateTag,
    deleteTag,
  };
};
