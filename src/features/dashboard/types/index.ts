import { ArticleResponseDTO } from "@/lib/types/article";
import { LeadResponseDTO } from "@/features/leads/types";

export type LeadStatus = "New" | "Contacted" | "Qualified";

export interface DashboardLead extends LeadResponseDTO {
  status: LeadStatus;
}

export interface DashboardArticle extends ArticleResponseDTO {
  views: number;
  readingTime: string;
}

export interface DashboardStats {
  totalLeads: number;
  unreadLeads: number;
  conversionRate: number; // Percentage
  topArticle: DashboardArticle | null;
}
