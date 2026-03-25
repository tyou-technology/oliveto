import { useQuery } from "@tanstack/react-query";
import { leadsService } from "@/services/leads.service";
import { QUERY_KEYS } from "@/lib/config/query-keys";

export function useUnreadLeadsCount() {
  return useQuery({
    queryKey: QUERY_KEYS.LEADS.UNREAD_COUNT,
    queryFn: () => leadsService.countUnread(),
  });
}
