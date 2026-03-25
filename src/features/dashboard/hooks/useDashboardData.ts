import { useMemo } from "react";
import { useLeads } from "@/features/leads/hooks/useLeads";
import { LeadResponseDTO, LeadStatus } from "@/lib/types/lead";
import { useAnalytics } from "./useAnalytics";
import { DashboardArticle, DashboardLead, DashboardLeadStatus } from "../types";

const mapLeadStatus = (lead: LeadResponseDTO): DashboardLeadStatus => {
  if (lead.status === LeadStatus.NEW || !lead.isRead) return "New";
  if (lead.status === LeadStatus.QUALIFIED || lead.status === LeadStatus.CONVERTED) return "Qualified";
  return "Contacted";
};

const formatReadingTime = (minutes: number): string => {
  return minutes < 1 ? "1 min" : `${minutes} min`;
};

export const useDashboardData = () => {
  const { data: analyticsData, isLoading: isLoadingAnalytics } = useAnalytics();
  const { data: leadsData, isLoading: isLoadingLeads } = useLeads({ page: 1, limit: 5 });

  const dashboardData = useMemo(() => {
    const analytics = analyticsData?.data;

    const recentLeads: DashboardLead[] = (leadsData?.data ?? []).map((lead) => ({
      ...lead,
      status: mapLeadStatus(lead),
    }));

    const recentArticles: DashboardArticle[] = (analytics?.articles.topArticles ?? []).map(
      (article) => ({
        id: article.id,
        title: article.title,
        slug: article.slug,
        views: article.visitsCount,
        readingTime: formatReadingTime(article.readingTime),
        publishedAt: article.publishedAt,
      })
    );

    return {
      recentLeads,
      recentArticles,
      stats: analytics?.stats ?? { publishedArticles: 0, totalViews: 0, totalLeads: 0, unreadLeads: 0 },
      leadsByStatus: analytics?.leads.byStatus ?? { new: 0, contacted: 0, qualified: 0, converted: 0, lost: 0 },
      trendingTags: analytics?.articles.trendingTags ?? [],
    };
  }, [analyticsData, leadsData]);

  return {
    ...dashboardData,
    isLoading: isLoadingAnalytics || isLoadingLeads,
  };
};
