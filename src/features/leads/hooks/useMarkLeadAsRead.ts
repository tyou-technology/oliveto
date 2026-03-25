import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leadsService } from "@/services/leads.service";
import { QUERY_KEYS } from "@/lib/config/query-keys";

export function useMarkLeadAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => leadsService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LEADS.UNREAD_COUNT });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LEADS.ALL });
    },
  });
}
