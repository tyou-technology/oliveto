"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, User, Building, Phone, Mail } from "lucide-react";
import { Skeleton } from "@/components/atoms/skeleton";
import { ROUTES } from "@/lib/config/routes";
import { LeadDetailsModal } from "@/features/leads/components/LeadDetailsModal";
import { LeadEditModal } from "@/features/leads/components/LeadEditModal";
import { LeadResponseDTO } from "@/lib/types/lead";
import { StatusBadge } from "../molecules/status-badge";
import { DashboardLead } from "../../types";

interface RecentLeadsProps {
  data: DashboardLead[];
  isLoading: boolean;
}

const ORIGIN_LABELS: Record<string, string> = {
  CONTACT_FORM: "Formulário",
  NEWSLETTER: "Newsletter",
  REFERRAL: "Indicação",
  SOCIAL_MEDIA: "Redes Sociais",
  GOOGLE_ADS: "Google Ads",
  ORGANIC_SEARCH: "Busca Orgânica",
};

export function RecentLeads({ data, isLoading }: RecentLeadsProps) {
  const [selectedLead, setSelectedLead] = useState<DashboardLead | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Leads Recentes</h2>
        <Link
          href={ROUTES.ADMIN.DASHBOARD.CONTATOS}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          Ver todos <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-neutral-500 border-b border-white/5">
              <th className="px-6 py-4 font-medium">Lead</th>
              <th className="px-6 py-4 font-medium">Empresa</th>
              <th className="px-6 py-4 font-medium">Interesse</th>
              <th className="px-6 py-4 font-medium">Origem</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Contato</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-sm text-neutral-400">
                  Nenhum lead encontrado.
                </td>
              </tr>
            ) : (
              data.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedLead(lead);
                    setIsViewModalOpen(true);
                  }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-neutral-400" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{lead.name}</p>
                        <p className="text-sm text-neutral-500">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {lead.company ? (
                      <div className="flex items-center gap-2 text-white">
                        <Building className="w-4 h-4 text-neutral-500" aria-hidden="true" />
                        <span>{lead.company}</span>
                      </div>
                    ) : (
                      <span className="text-neutral-500">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-neutral-400">
                    {lead.service ?? "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-white/10 text-neutral-300 px-2 py-1 rounded">
                      {ORIGIN_LABELS[lead.origin] ?? lead.origin}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="flex items-center justify-end gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {lead.phone && (
                        <a
                          href={`tel:${lead.phone}`}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          aria-label={`Ligar para ${lead.name}`}
                        >
                          <Phone className="w-4 h-4 text-neutral-400" />
                        </a>
                      )}
                      <a
                        href={`mailto:${lead.email}`}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        aria-label={`Enviar e-mail para ${lead.name}`}
                      >
                        <Mail className="w-4 h-4 text-neutral-400" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedLead && isViewModalOpen && (
        <LeadDetailsModal
          lead={selectedLead as unknown as LeadResponseDTO}
          onClose={() => {
            setSelectedLead(null);
            setIsViewModalOpen(false);
          }}
        />
      )}

      {selectedLead && isEditModalOpen && (
        <LeadEditModal
          lead={selectedLead as unknown as LeadResponseDTO}
          onClose={() => {
            setSelectedLead(null);
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
