"use client";

import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";
import { AnalyticsStats } from "@/features/dashboard/components/organisms/analytics-stats";
import { ArticlesPerformanceList } from "@/features/dashboard/components/organisms/articles-performance-list";
import { LeadsByStatusCard } from "@/features/dashboard/components/organisms/leads-by-status-card";
import { TrendingTagsCard } from "@/features/dashboard/components/organisms/trending-tags-card";
import { RecentLeads } from "@/features/dashboard/components/organisms/recent-leads";

export default function DashboardPage() {
  const { recentLeads, recentArticles, stats, leadsByStatus, trendingTags, isLoading } =
    useDashboardData();

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Visão Geral</h1>
        <p className="text-sm text-neutral-400">Resumo do desempenho de leads e artigos.</p>
      </div>

      <AnalyticsStats stats={stats} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ArticlesPerformanceList articles={recentArticles} isLoading={isLoading} />
        </div>

        <div className="space-y-6">
          <LeadsByStatusCard leadsByStatus={leadsByStatus} isLoading={isLoading} />
          <TrendingTagsCard tags={trendingTags} isLoading={isLoading} />
        </div>
      </div>

      <RecentLeads data={recentLeads} isLoading={isLoading} />
    </div>
  );
}
