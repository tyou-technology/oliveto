import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { leadsService } from "@/services/leads.service";
import { LeadFilters } from "@/lib/types/lead";
import { QUERY_KEYS } from "@/lib/config/query-keys";

export function useLeads(filters: LeadFilters) {
  const { page = 1, limit = 10, isRead, status, origin } = filters;

  return useQuery({
    queryKey: QUERY_KEYS.LEADS.LIST({ page, limit, isRead, status, origin }),
    queryFn: () => leadsService.findAll(page, limit, isRead, status, origin),
    placeholderData: keepPreviousData,
  });
}
