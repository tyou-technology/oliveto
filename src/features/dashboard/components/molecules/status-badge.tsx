import { Badge } from "@/components/atoms/badge";
import { cn } from "@/lib/utils";
import { LeadStatus } from "../../types";

interface StatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const styles = {
    New: "bg-primary/15 text-primary border-primary/20 hover:bg-primary/25",
    Contacted: "bg-amber-500/15 text-amber-500 border-amber-500/20 hover:bg-amber-500/25",
    Qualified: "bg-blue-500/15 text-blue-500 border-blue-500/20 hover:bg-blue-500/25",
  };

  return (
    <Badge variant="outline" className={cn("font-normal", styles[status], className)}>
      {status === "New" && "Novo"}
      {status === "Contacted" && "Contatado"}
      {status === "Qualified" && "Qualificado"}
    </Badge>
  );
}
