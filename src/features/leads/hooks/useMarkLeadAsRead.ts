import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leadsService } from "@/services/leads.service";

export function useMarkLeadAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => leadsService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads", "unread-count"] });
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}
