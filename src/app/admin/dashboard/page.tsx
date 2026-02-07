"use client";

import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";
import { AnalyticsStats } from "@/features/dashboard/components/organisms/analytics-stats";
import { RecentLeads } from "@/features/dashboard/components/organisms/recent-leads";
import { ArticlesInsight } from "@/features/dashboard/components/organisms/articles-insight";
import { Separator } from "@/components/atoms/separator";

export default function DashboardPage() {
  const { recentLeads, recentArticles, stats, isLoading } = useDashboardData();

  return (
      <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 bg-background text-foreground">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h2>
            <p className="text-muted-foreground">
              Visão geral do desempenho de leads e artigos.
            </p>
          </div>
        </div>

        <Separator className="bg-border" />

        {/* KPI Stats */}
        <section className="space-y-4">
          <h3 className="text-lg font-medium tracking-tight text-foreground">Métricas Principais</h3>
          <AnalyticsStats stats={stats} isLoading={isLoading} />
        </section>

        {/* Recent Leads */}
        <section className="space-y-4">
          <RecentLeads data={recentLeads} isLoading={isLoading} />
        </section>

        {/* Articles Insight */}
        <section className="space-y-4">
          <div>
            <h3 className="text-lg font-medium tracking-tight text-foreground">Performance de Artigos</h3>
            <p className="text-sm text-muted-foreground">
              Métricas dos últimos artigos publicados.
            </p>
          </div>
          <ArticlesInsight articles={recentArticles} isLoading={isLoading} />
        </section>
      </div>
  );
}
