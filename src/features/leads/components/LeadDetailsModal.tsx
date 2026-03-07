"use client";

import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/atoms/dialog";
import { LeadResponseDTO } from "../types";
import { useMarkLeadAsRead } from "../hooks";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Mail, Phone, User, MessageSquare, Info, LucideIcon } from "lucide-react";

interface LeadDetailsModalProps {
  lead: LeadResponseDTO;
  onClose: () => void;
}

export function LeadDetailsModal({ lead, onClose }: LeadDetailsModalProps) {
  const { mutate: markAsRead } = useMarkLeadAsRead();

  useEffect(() => {
    if (lead && !lead.isRead) {
      markAsRead(lead.id);
    }
  }, [lead, markAsRead]);

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-surface border-white/10 text-white sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Detalhes do Contato</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Recebido em {format(new Date(lead.createdAt), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem icon={User} label="Nome" value={lead.name} />
            <InfoItem icon={Mail} label="Email" value={lead.email} />
            <InfoItem icon={Phone} label="Telefone" value={lead.phone} />
            <InfoItem icon={Info} label="Origem" value={formatOrigin(lead.origin)} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-neutral-400 mb-2">
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-medium">Mensagem</span>
            </div>
            <div className="bg-white/5 p-4 rounded-xl text-neutral-200 text-sm leading-relaxed whitespace-pre-wrap border border-white/5">
              {lead.message || "Nenhuma mensagem fornecida."}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-neutral-400">
        <Icon className="w-4 h-4" aria-hidden="true" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="text-white font-medium pl-6 break-words">{value || "-"}</p>
    </div>
  );
}

function formatOrigin(origin: string) {
  const map: Record<string, string> = {
    NEWSLETTER: "Newsletter",
    CONTACT_FORM: "Formulário de Contato",
    RICH_MATERIAL: "Material Rico",
    OTHER: "Outros",
  };
  return map[origin] || origin;
}
