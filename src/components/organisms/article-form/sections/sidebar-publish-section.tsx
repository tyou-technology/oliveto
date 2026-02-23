import { UseFormWatch } from "react-hook-form";
import { RotateCcw, Save, Send } from "lucide-react";
import {
  CreateArticleDTO,
  ArticleStatus,
  ArticleResponseDTO,
} from "@/lib/types/article";

interface SidebarPublishSectionProps {
  watch: UseFormWatch<CreateArticleDTO>;
  isPending: boolean;
  initialData?: ArticleResponseDTO;
  onCancel?: () => void;
  onStatusChange: (status: ArticleStatus) => void;
  readOnly?: boolean;
}

export function SidebarPublishSection({
  watch,
  isPending,
  initialData,
  onCancel,
  onStatusChange,
  readOnly = false,
}: SidebarPublishSectionProps) {
  return (
    <div className="bg-surface border border-white/10 rounded-2xl p-6">
      <h3 className="font-semibold mb-4">Publicação</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-400">Status:</span>
          <span className="text-amber-400">
            {watch("status") === ArticleStatus.PUBLISHED
              ? "Publicado"
              : "Rascunho"}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-400">Visibilidade:</span>
          <span>Público</span>
        </div>
        <div className="pt-4 border-t border-white/10 space-y-3">
          {!readOnly && (
            <>
              {initialData?.status === ArticleStatus.PUBLISHED ? (
                <>
                  <button
                    type="button"
                    onClick={() => onStatusChange(ArticleStatus.DRAFT)}
                    disabled={isPending}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 rounded-xl transition-colors disabled:opacity-50"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Despublicar
                  </button>
                  <button
                    type="button"
                    onClick={() => onStatusChange(ArticleStatus.PUBLISHED)}
                    disabled={isPending}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-black font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    Salvar Alterações
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => onStatusChange(ArticleStatus.DRAFT)}
                    disabled={isPending}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    Salvar Rascunho
                  </button>
                  <button
                    type="button"
                    onClick={() => onStatusChange(ArticleStatus.PUBLISHED)}
                    disabled={isPending}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-black font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    Publicar Artigo
                  </button>
                </>
              )}
            </>
          )}
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-xl transition-colors ${
                readOnly
                  ? "bg-white/5 hover:bg-white/10 text-white"
                  : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
              }`}
            >
              {readOnly ? "Voltar" : "Cancelar"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
