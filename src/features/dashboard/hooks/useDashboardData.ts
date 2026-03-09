import { useMemo } from "react";
import { env } from "@/lib/env";
import { useLeads } from "@/features/leads/hooks/useLeads";
import { useArticles } from "@/features/articles/hooks/useArticles";
import { useUnreadLeadsCount } from "@/features/leads/hooks/useUnreadLeadsCount";
import { DashboardArticle, DashboardLead, DashboardStats, LeadStatus } from "../types";
import { ArticleResponseDTO } from "@/lib/types/article";
import { LeadResponseDTO } from "@/features/leads/types";

// Helper to generate deterministic mock numbers
const getMockNumber = (seed: string, min: number, max: number) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  const range = max - min + 1;
  return Math.abs(hash % range) + min;
};

// Helper to calculate reading time (mocked based on content length or random)
const getReadingTime = (content: string = "") => {
  let wordCount = 0;
  let inWord = false;

  for (let i = 0; i < content.length; i++) {
    // charCode <= 32 covers space, tab, LF, CR and other control characters
    if (content.charCodeAt(i) <= 32) {
      inWord = false;
    } else if (!inWord) {
      wordCount++;
      inWord = true;
    }
  }

  const time = Math.ceil(wordCount / 200); // Average 200 words per minute
  return time < 1 ? "1 min" : `${time} min`;
};

// Helper to map status
const getLeadStatus = (lead: LeadResponseDTO): LeadStatus => {
  if (!lead.isRead) return "New";
  // TODO: Implement real status logic when backend supports it.
  // Mock: If ID ends in even number -> Qualified, else Contacted
  const lastChar = lead.id.slice(-1);
  return parseInt(lastChar, 16) % 2 === 0 ? "Qualified" : "Contacted";
};

export const useDashboardData = () => {

  // 1. Fetch Recent Leads (Page 1, Limit 5)
  const { data: leadsData, isLoading: isLoadingLeads } = useLeads({
    page: 1,
    limit: 5,
  });

  // 2. Fetch Unread Count
  const { data: unreadCountData, isLoading: isLoadingUnread } = useUnreadLeadsCount();

  // 3. Fetch Recent Articles (Page 0, Size 4, Published only)
  const { articles: articlesList, isLoadingArticles } = useArticles(
    1,
    4,
    true
  );

  // Process Data with Mocks
  const dashboardData = useMemo(() => {
    // Enrich Leads
    const recentLeads: DashboardLead[] = (leadsData?.data || []).map((lead) => ({
      ...lead,
      status: getLeadStatus(lead),
    }));

    // Enrich Articles
    const articlesWithMetrics: DashboardArticle[] = (articlesList || []).map((article: ArticleResponseDTO) => {
      // TODO: Fetch real views from backend when available
      const views = getMockNumber(article.id, 50, 5000);
      const readingTime = getReadingTime(article.content || article.briefing || "Mock content");
      return {
        ...article,
        views,
        readingTime,
      };
    });

    // Find Top Article (by views)
    const topArticle =
      articlesWithMetrics.length > 0
        ? articlesWithMetrics.reduce((prev, current) =>
            prev.views > current.views ? prev : current
          )
        : null;

    // TODO: Calculate real conversion rate based on visits vs leads
    const conversionRate = 2.4;

    const stats: DashboardStats = {
      totalLeads: leadsData?.meta?.total || 0,
      unreadLeads: unreadCountData?.unread || 0,
      conversionRate,
      topArticle,
    };

    return {
      recentLeads,
      recentArticles: articlesWithMetrics,
      stats,
    };
  }, [leadsData, unreadCountData, articlesList]);

  return {
    ...dashboardData,
    isLoading: isLoadingLeads || isLoadingUnread || isLoadingArticles,
  };
};
