import { useQuery } from "@tanstack/react-query";
import { leadsService } from "@/services/leads.service";

export function useUnreadLeadsCount() {
  return useQuery({
    queryKey: ["leads", "unread-count"],
    queryFn: () => leadsService.countUnread(),
  });
}
