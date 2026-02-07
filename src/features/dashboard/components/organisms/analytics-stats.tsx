import { Users, TrendingUp, MessageCircle, Trophy } from "lucide-react";
import { AnalyticsCard } from "../molecules/analytics-card";
import { DashboardStats } from "../../types";

interface AnalyticsStatsProps {
  stats: DashboardStats;
  isLoading: boolean;
}

export function AnalyticsStats({ stats, isLoading }: AnalyticsStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <AnalyticsCard
        title="Total de Leads"
        value={stats.totalLeads.toLocaleString()}
        icon={Users}
        description="Leads capturados até o momento"
        isLoading={isLoading}
      />
      <AnalyticsCard
        title="Novas Mensagens"
        value={stats.unreadLeads.toLocaleString()}
        icon={MessageCircle}
        description="Aguardando resposta"
        isLoading={isLoading}
      />
      <AnalyticsCard
        title="Taxa de Conversão"
        value={`${stats.conversionRate}%`}
        icon={TrendingUp}
        description="Baseada em visitas vs. leads"
        isLoading={isLoading}
      />
      <AnalyticsCard
        title="Artigo Mais Lido"
        value={stats.topArticle?.views.toLocaleString() || "-"}
        icon={Trophy}
        description={stats.topArticle?.title || "Sem dados suficientes"}
        isLoading={isLoading}
        className="bg-gradient-to-br from-card to-primary/5 border-primary/20"
      />
    </div>
  );
}
