"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/atoms/dialog";
import {
  LeadResponseDTO,
  LeadStatus,
  UpdateLeadNotesDTO,
  UpdateLeadNotesSchema,
  UpdateLeadStatusDTO,
  UpdateLeadStatusSchema,
} from "../types";
import { useUpdateLeadNotes, useUpdateLeadStatus } from "../hooks";
import { Save, X } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

interface LeadEditModalProps {
  lead: LeadResponseDTO;
  onClose: () => void;
}

export function LeadEditModal({ lead, onClose }: LeadEditModalProps) {
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateLeadStatus();
  const { mutate: updateNotes, isPending: isUpdatingNotes } = useUpdateLeadNotes();
  const isPending = isUpdatingStatus || isUpdatingNotes;

  const statusForm = useForm<UpdateLeadStatusDTO>({
    resolver: zodResolver(UpdateLeadStatusSchema),
    defaultValues: { status: lead.status },
  });

  const notesForm = useForm<UpdateLeadNotesDTO>({
    resolver: zodResolver(UpdateLeadNotesSchema),
    defaultValues: { notes: lead.notes ?? "" },
  });

  useEffect(() => {
    statusForm.reset({ status: lead.status });
    notesForm.reset({ notes: lead.notes ?? "" });
  }, [lead, statusForm, notesForm]);

  const onSubmit = (statusData: UpdateLeadStatusDTO) => {
    const notesData = notesForm.getValues();
    let completed = 0;
    const total = 2;
    const finish = () => {
      completed++;
      if (completed === total) {
        toast.success("Lead atualizado com sucesso!");
        onClose();
      }
    };

    updateStatus(
      { id: lead.id, status: statusData.status },
      {
        onSuccess: finish,
        onError: () => toast.error("Erro ao atualizar status do lead."),
      }
    );

    updateNotes(
      { id: lead.id, notes: notesData.notes },
      {
        onSuccess: finish,
        onError: () => toast.error("Erro ao atualizar notas do lead."),
      }
    );
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-surface border-white/10 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Editar Lead</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Atualize o status e as notas internas do lead.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={statusForm.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Status</label>
            <select
              {...statusForm.register("status")}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary/50 transition-colors text-white"
            >
              {Object.values(LeadStatus).map((s) => (
                <option key={s} value={s} className="bg-neutral-900">
                  {s}
                </option>
              ))}
            </select>
            {statusForm.formState.errors.status && (
              <p className="text-xs text-red-500">{statusForm.formState.errors.status.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Notas internas</label>
            <textarea
              {...notesForm.register("notes")}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary/50 transition-colors resize-none"
              placeholder="Anotações internas sobre este lead..."
            />
            {notesForm.formState.errors.notes && (
              <p className="text-xs text-red-500">{notesForm.formState.errors.notes.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isPending ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
