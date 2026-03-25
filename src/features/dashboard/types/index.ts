import { LeadResponseDTO } from "@/features/leads/types";
import { AnalyticsTrendingTag, AnalyticsLeadsByStatus, AnalyticsStats } from "@/lib/types/analytics";

export type DashboardLeadStatus = "New" | "Contacted" | "Qualified";

export type DashboardLead = Omit<LeadResponseDTO, "status"> & {
  status: DashboardLeadStatus;
};

export interface DashboardArticle {
  id: string;
  title: string;
  slug: string;
  views: number;
  readingTime: string;
  publishedAt: string | null;
}

// Re-export analytics types used across dashboard components
export type { AnalyticsTrendingTag as TrendingTag, AnalyticsLeadsByStatus as LeadsByStatus, AnalyticsStats as DashboardStats };
