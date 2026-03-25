import { Newspaper, Eye, UserPlus, MessageCircle } from "lucide-react";
import { AnalyticsCard } from "../molecules/analytics-card";
import { DashboardStats } from "../../types";

interface AnalyticsStatsProps {
  stats: DashboardStats;
  isLoading: boolean;
}

export function AnalyticsStats({ stats, isLoading }: AnalyticsStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <AnalyticsCard
        title="Artigos Publicados"
        value={stats.publishedArticles.toLocaleString()}
        icon={Newspaper}
        description="Artigos publicados"
        isLoading={isLoading}
        trend="+2 este mês"
        iconClassName="bg-primary/10 text-primary"
        trendClassName="text-primary bg-primary/10"
      />
      <AnalyticsCard
        title="Visualizações Total"
        value={stats.totalViews.toLocaleString()}
        icon={Eye}
        description="Total de visualizações"
        isLoading={isLoading}
        trend="+18% vs mês anterior"
        iconClassName="bg-blue-500/10 text-blue-400"
        trendClassName="text-blue-400 bg-blue-400/10"
      />
      <AnalyticsCard
        title="Leads Total"
        value={stats.totalLeads.toLocaleString()}
        icon={UserPlus}
        description="Leads capturados"
        isLoading={isLoading}
        trend={`${stats.unreadLeads} não lidos`}
        iconClassName="bg-amber-500/10 text-amber-400"
        trendClassName="text-amber-400 bg-amber-400/10"
      />
      <AnalyticsCard
        title="Mensagens Não Lidas"
        value={stats.unreadLeads.toLocaleString()}
        icon={MessageCircle}
        description="Aguardando resposta"
        isLoading={isLoading}
        trend="Em dia"
        iconClassName="bg-purple-500/10 text-purple-400"
        trendClassName="text-purple-400 bg-purple-400/10"
      />
    </div>
  );
}
