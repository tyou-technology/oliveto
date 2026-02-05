import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leadsApi } from "../api/leads.api";
import { CreateLeadDTO } from "../types";

export function useCreateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLeadDTO) => leadsApi.create(data),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}
