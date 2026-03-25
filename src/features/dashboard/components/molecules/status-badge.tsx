import { cn } from "@/lib/utils";
import { DashboardLeadStatus } from "../../types";

interface StatusBadgeProps {
  status: DashboardLeadStatus;
  className?: string;
}

const STATUS_STYLES: Record<DashboardLeadStatus, { label: string; className: string }> = {
  New: { label: "Novo", className: "text-primary bg-primary/10" },
  Contacted: { label: "Contactado", className: "text-blue-400 bg-blue-400/10" },
  Qualified: { label: "Qualificado", className: "text-amber-400 bg-amber-400/10" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, className: statusClass } = STATUS_STYLES[status];
  return (
    <span className={cn("text-xs px-2 py-1 rounded-full font-medium", statusClass, className)}>
      {label}
    </span>
  );
}
