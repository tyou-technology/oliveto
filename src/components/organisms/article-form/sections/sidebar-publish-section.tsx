import { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { Save } from "lucide-react";
import {
  CreateArticleDTO,
  ArticleStatus,
  ArticleResponseDTO,
} from "@/lib/types/article";

interface SidebarPublishSectionProps {
  watch: UseFormWatch<CreateArticleDTO>;
  setValue: UseFormSetValue<CreateArticleDTO>;
  isPending: boolean;
  initialData?: ArticleResponseDTO;
  onCancel?: () => void;
  readOnly?: boolean;
}

const STATUS_OPTIONS: { value: ArticleStatus; label: string; color: string }[] = [
  { value: ArticleStatus.DRAFT, label: "Rascunho", color: "text-amber-400" },
  { value: ArticleStatus.PUBLISHED, label: "Publicado", color: "text-green-400" },
  { value: ArticleStatus.ARCHIVED, label: "Arquivado", color: "text-neutral-400" },
];

export function SidebarPublishSection({
  watch,
  setValue,
  isPending,
  initialData,
  onCancel,
  readOnly = false,
}: SidebarPublishSectionProps) {
  const currentStatus = watch("status") ?? ArticleStatus.DRAFT;
  const currentOption = STATUS_OPTIONS.find((o) => o.value === currentStatus);

  return (
    <div className="bg-surface border border-white/10 rounded-2xl p-6">
      <h3 className="font-semibold mb-4">Publicação</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-neutral-400 mb-2">Status</label>
          {readOnly ? (
            <span className={`text-sm font-medium ${currentOption?.color ?? ""}`}>
              {currentOption?.label ?? "—"}
            </span>
          ) : (
            <div className="relative">
              <select
                value={currentStatus}
                onChange={(e) =>
                  setValue("status", e.target.value as ArticleStatus, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors cursor-pointer pr-10"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-neutral-900 text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-400">Visibilidade:</span>
          <span>Público</span>
        </div>

        {!readOnly && (
          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-black font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {initialData ? "Salvar Alterações" : "Criar Artigo"}
            </button>

            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 font-medium rounded-xl hover:bg-red-500/20 transition-colors"
              >
                Cancelar
              </button>
            )}
          </div>
        )}

        {readOnly && onCancel && (
          <div className="pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onCancel}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-colors"
            >
              Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
