import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { leadsApi } from "../api/leads.api";
import { LeadFilters } from "../types";

export function useLeads(filters: LeadFilters) {
  const { page = 1, limit = 10, isRead, status, origin } = filters;

  return useQuery({
    queryKey: ["leads", { page, limit, isRead, status, origin }],
    queryFn: () => leadsApi.findAll(page, limit, isRead, status, origin),
    placeholderData: keepPreviousData,
  });
}
