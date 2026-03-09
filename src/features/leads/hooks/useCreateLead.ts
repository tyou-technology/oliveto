import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leadsService } from "@/services/leads.service";
import { CreateLeadDTO } from "@/lib/types/lead";

export function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLeadDTO) => leadsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}
