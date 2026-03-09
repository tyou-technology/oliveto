import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leadsApi } from "../api/leads.api";

export function useMarkLeadAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => leadsApi.markAsRead(id),
    onSuccess: () => {
      // Invalidate the unread count
      queryClient.invalidateQueries({ queryKey: ["leads", "unread-count"] });
      // Invalidate the leads lists to update the UI row status
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}
