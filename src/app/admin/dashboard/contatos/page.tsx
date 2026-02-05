"use client";

import { useState } from "react";
import { useLeads } from "@/features/leads/hooks";
import { LeadsTable } from "@/features/leads/components/LeadsTable";
import { LeadResponseDTO } from "@/features/leads/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LeadDetailsModal } from "@/features/leads/components/LeadDetailsModal";

export default function LeadsPage() {
  const [page, setPage] = useState(0);
  const [filterStatus, setFilterStatus] = useState<boolean | null>(null); // null = All, false = Unread, true = Read
  const [selectedLead, setSelectedLead] = useState<LeadResponseDTO | null>(null);

  const size = 10;
  const { data, isLoading } = useLeads({ page, size, isRead: filterStatus });

  const totalPages = data?.page.totalPages || 0;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Contatos</h2>
          <p className="text-neutral-400">Gerencie os leads recebidos pelo site.</p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-xl w-fit">
          <FilterButton
            label="Todos"
            active={filterStatus === null}
            onClick={() => { setFilterStatus(null); setPage(0); }}
          />
          <FilterButton
            label="Não Lidos"
            active={filterStatus === false}
            onClick={() => { setFilterStatus(false); setPage(0); }}
          />
          <FilterButton
            label="Lidos"
            active={filterStatus === true}
            onClick={() => { setFilterStatus(true); setPage(0); }}
          />
        </div>
      </div>

      {/* Table */}
      <LeadsTable
        leads={data?.content || []}
        isLoading={isLoading}
        onViewDetails={setSelectedLead}
      />

      {/* Pagination */}
      {data && totalPages > 1 && (
        <div className="flex items-center justify-end gap-2 text-sm text-neutral-400">
          <span>
            Página {data.page.number + 1} de {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages - 1}
              className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}

function FilterButton({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-[#00FF90] text-black shadow-lg shadow-[#00FF90]/20'
          : 'text-neutral-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );
}
