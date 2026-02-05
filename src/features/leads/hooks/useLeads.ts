import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { leadsApi } from "../api/leads.api";
import { LeadFilters } from "../types";

export function useLeads(filters: LeadFilters) {
  const { page = 0, size = 10, isRead } = filters;

  return useQuery({
    queryKey: ["leads", { page, size, isRead }],
    queryFn: () => leadsApi.findAll(page, size, isRead),
    placeholderData: keepPreviousData,
  });
}
