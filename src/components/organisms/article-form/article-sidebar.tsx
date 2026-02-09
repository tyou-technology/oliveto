import { useState } from "react";
import { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  RotateCcw,
  Save,
  Send,
  Tag,
  User,
  X,
  ChevronDown,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
import {
  CreateArticleDTO,
  ArticleStatus,
  TagResponseDTO,
  ArticleResponseDTO,
} from "@/lib/types/article";

interface ArticleSidebarProps {
  register: UseFormRegister<CreateArticleDTO>;
  watch: UseFormWatch<CreateArticleDTO>;
  setValue: UseFormSetValue<CreateArticleDTO>;
  errors: FieldErrors<CreateArticleDTO>;
  readOnly?: boolean;
  isPending: boolean;
  initialData?: ArticleResponseDTO;
  onCancel?: () => void;
  tags: TagResponseDTO[];
  authorName: string;
  onStatusChange: (status: ArticleStatus) => void;
}

export function ArticleSidebar({
  register,
  watch,
  setValue,
  errors,
  readOnly = false,
  isPending,
  initialData,
  onCancel,
  tags,
  authorName,
  onStatusChange,
}: ArticleSidebarProps) {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const selectedTagIds = watch("tagIds") || [];
  const imageUrl = watch("imageUrl");
  const currentAuthorName = watch("authorName") || authorName;

  const toggleTag = (tagId: string) => {
    if (readOnly) return;
    const currentTags = watch("tagIds") || [];
    if (currentTags.includes(tagId)) {
      setValue(
        "tagIds",
        currentTags.filter((id) => id !== tagId)
      );
    } else {
      setValue("tagIds", [...currentTags, tagId]);
    }
  };

  const getSelectedTags = () => {
    return tags.filter((tag) => selectedTagIds.includes(tag.id));
  };

  return (
    <div className="space-y-6">
      {/* Publish Card */}
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

      {/* Category / Tags */}
      <div className="bg-surface border border-white/10 rounded-2xl p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Tag className="w-4 h-4 text-primary" />
          Tags
        </h3>

        {/* Selected Tags Chips */}
        {selectedTagIds.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {getSelectedTags().map(tag => (
              <span
                key={tag.id}
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border",
                  !tag.color && "bg-primary/10 text-primary border-primary/20"
                )}
                style={tag.color ? {
                  backgroundColor: `${tag.color}20`,
                  color: tag.color,
                  borderColor: `${tag.color}40`
                } : undefined}
              >
                {tag.name}
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className="hover:opacity-70"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
          </div>
        )}

        {!readOnly && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
            >
              <span className="text-neutral-500">
                Selecione as tags
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showCategoryDropdown ? "rotate-180" : ""
                }`}
              />
            </button>
            {showCategoryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-surface-highlight border border-white/10 rounded-xl overflow-hidden z-10 max-h-60 overflow-y-auto">
                {tags.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-neutral-500">
                    Nenhuma tag encontrada. Crie uma nova tag primeiro.
                  </div>
                ) : (
                  tags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => {
                        toggleTag(tag.id);
                        // Don't close dropdown to allow multiple selection
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-white/5 transition-colors text-sm flex items-center justify-between ${
                        selectedTagIds.includes(tag.id) ? "text-primary" : "text-white"
                      }`}
                    >
                      <span style={{ color: tag.color || undefined }}>{tag.name}</span>
                      {selectedTagIds.includes(tag.id) && (
                        <span
                          className={cn("w-2 h-2 rounded-full", !tag.color && "bg-primary")}
                          style={tag.color ? { backgroundColor: tag.color } : undefined}
                        />
                      )}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cover Image */}
      <div className="bg-surface border border-white/10 rounded-2xl p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-primary" />
          Imagem de Capa (URL)
        </h3>
        <input
          type="text"
          {...register("imageUrl")}
          disabled={readOnly}
          placeholder="https://exemplo.com/imagem.jpg"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          maxLength={2048}
        />
        {errors.imageUrl && (
          <p className="text-red-500 text-sm mt-1 mb-2">
            {errors.imageUrl.message}
          </p>
        )}

        {/* Image Preview */}
        {imageUrl && (
          <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10">
            <Image
              src={imageUrl}
              alt="Preview da capa"
              fill
              className="object-cover"
              onError={(e) => {
                // Fallback for broken images if needed, or just let it show broken icon
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* Author */}
      <div className="bg-surface border border-white/10 rounded-2xl p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          Autor
        </h3>
        <input
          type="text"
          disabled
          value={currentAuthorName}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:border-primary/50 transition-colors opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
}
