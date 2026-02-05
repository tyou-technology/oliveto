"use client";

import { memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import { LeadResponseDTO } from "../types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Eye, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeadsTableProps {
  leads: LeadResponseDTO[];
  isLoading: boolean;
  onViewDetails: (lead: LeadResponseDTO) => void;
}

interface LeadRowProps {
  lead: LeadResponseDTO;
  onViewDetails: (lead: LeadResponseDTO) => void;
}

// Optimization: Memoize row component to prevent re-renders when parent state changes
// (e.g., when opening the details modal or changing filters that don't affect this row).
const LeadRow = memo(({ lead, onViewDetails }: LeadRowProps) => {
  return (
    <TableRow
      className={cn(
        "border-white/10 transition-colors",
        !lead.isRead
          ? "bg-[#00FF90]/5 font-medium hover:bg-[#00FF90]/10"
          : "hover:bg-white/5",
      )}
    >
      <TableCell
        className={cn(!lead.isRead ? "text-white" : "text-neutral-400")}
      >
        {format(new Date(lead.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
      </TableCell>
      <TableCell
        className={cn(!lead.isRead ? "text-white" : "text-neutral-400")}
      >
        {lead.name}
      </TableCell>
      <TableCell className="text-neutral-400">{lead.email}</TableCell>
      <TableCell className="text-neutral-400">{lead.phone}</TableCell>
      <TableCell className="text-right">
        <button
          onClick={() => onViewDetails(lead)}
          className="p-2 hover:bg-[#00FF90]/20 text-[#00FF90] rounded-lg transition-colors"
          title="Ver Detalhes"
        >
          <Eye className="w-4 h-4" />
        </button>
      </TableCell>
    </TableRow>
  );
});

LeadRow.displayName = "LeadRow";

export function LeadsTable({
  leads,
  isLoading,
  onViewDetails,
}: LeadsTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#00FF90]" />
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-neutral-400">
        <p>Nenhum contato encontrado.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-neutral-400">Data</TableHead>
            <TableHead className="text-neutral-400">Nome</TableHead>
            <TableHead className="text-neutral-400">Email</TableHead>
            <TableHead className="text-neutral-400">Telefone</TableHead>
            <TableHead className="text-right text-neutral-400">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <LeadRow
              key={lead.id}
              lead={lead}
              onViewDetails={onViewDetails}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
