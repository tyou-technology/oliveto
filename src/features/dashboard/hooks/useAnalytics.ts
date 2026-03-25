import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "@/services/analytics.service";
import { QUERY_KEYS } from "@/lib/config/query-keys";

export const useAnalytics = () => {
  return useQuery({
    queryKey: QUERY_KEYS.ANALYTICS.DASHBOARD,
    queryFn: analyticsService.getDashboard,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
