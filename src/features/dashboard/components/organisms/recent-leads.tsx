"use client";

import { useState, useMemo } from "react";
import { DataTable } from "@/components/organisms/data-table/data-table";
import { getRecentLeadsColumns } from "./recent-leads-columns";
import { DashboardLead } from "../../types";
import { Skeleton } from "@/components/atoms/skeleton";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/config/routes";
import { LeadDetailsModal } from "@/features/leads/components/LeadDetailsModal";

interface RecentLeadsProps {
  data: DashboardLead[];
  isLoading: boolean;
}

export function RecentLeads({ data, isLoading }: RecentLeadsProps) {
  const [selectedLead, setSelectedLead] = useState<DashboardLead | null>(null);

  const columns = useMemo(
    () => getRecentLeadsColumns({ onViewLead: setSelectedLead }),
    []
  );

  if (isLoading) {
    return (
      <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden p-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Leads Recentes</h2>
        <Link
          href={ROUTES.ADMIN.DASHBOARD.CONTATOS || "#"}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          Ver todos <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="p-0">
        <DataTable
          columns={columns}
          data={data}
        />
      </div>

      {selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}
