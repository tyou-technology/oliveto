import { useQuery } from "@tanstack/react-query";
import { leadsApi } from "../api/leads.api";

export function useUnreadLeadsCount() {
  return useQuery({
    queryKey: ["leads", "unread-count"],
    queryFn: () => leadsApi.countUnread(),
    // Refetch often or rely on invalidation?
    // Given the prompt: "On mount, fetch..."
    // I'll stick to defaults but maybe shorter stale time if realtime is needed.
    // For now, defaults are fine.
  });
}
