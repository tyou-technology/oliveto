import { BarChart3 } from "lucide-react";
import { Skeleton } from "@/components/atoms/skeleton";
import { LeadsByStatus } from "../../types";

interface LeadsByStatusCardProps {
  leadsByStatus: LeadsByStatus;
  isLoading: boolean;
}

const STATUS_ROWS = [
  { key: "new" as const, label: "Novos", dotClass: "bg-primary" },
  { key: "contacted" as const, label: "Contactados", dotClass: "bg-blue-400" },
  { key: "qualified" as const, label: "Qualificados", dotClass: "bg-amber-400" },
  { key: "converted" as const, label: "Convertidos", dotClass: "bg-purple-400" },
  { key: "lost" as const, label: "Perdidos", dotClass: "bg-neutral-500" },
];

export function LeadsByStatusCard({ leadsByStatus, isLoading }: LeadsByStatusCardProps) {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Leads por Status</h2>
        <BarChart3 className="w-5 h-5 text-neutral-400" aria-hidden="true" />
      </div>

      <div className="p-6 space-y-4">
        {STATUS_ROWS.map(({ key, label, dotClass }) => (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${dotClass}`} aria-hidden="true" />
              <span className="text-sm text-white">{label}</span>
            </div>
            {isLoading ? (
              <Skeleton className="h-5 w-8" />
            ) : (
              <span className="font-bold text-white">{leadsByStatus[key]}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
