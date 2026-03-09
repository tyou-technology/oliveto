import { useState } from "react";
import { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { Tag, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CreateArticleDTO, TagResponseDTO } from "@/lib/types/article";

interface SidebarTagsSectionProps {
  watch: UseFormWatch<CreateArticleDTO>;
  setValue: UseFormSetValue<CreateArticleDTO>;
  tags: TagResponseDTO[];
  readOnly?: boolean;
}

export function SidebarTagsSection({
  watch,
  setValue,
  tags,
  readOnly = false,
}: SidebarTagsSectionProps) {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const selectedTagIds = watch("tagIds") || [];

  const toggleTag = (tagId: string) => {
    if (readOnly) return;
    const currentTags = watch("tagIds") || [];
    let newTags;
    if (currentTags.includes(tagId)) {
      newTags = currentTags.filter((id) => id !== tagId);
    } else {
      newTags = [...currentTags, tagId];
    }
    setValue("tagIds", newTags, { shouldValidate: true });
  };

  const getSelectedTags = () => {
    return tags.filter((tag) => selectedTagIds.includes(tag.id));
  };

  return (
    <div className="bg-surface border border-white/10 rounded-2xl p-6">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Tag className="w-4 h-4 text-primary" />
        Tags
      </h3>

      {/* Selected Tags Chips */}
      {selectedTagIds.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {getSelectedTags().map((tag) => (
            <span
              key={tag.id}
              className={cn(
                "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border",
                !tag.color && "bg-primary/10 text-primary border-primary/20"
              )}
              style={
                tag.color
                  ? {
                      backgroundColor: `${tag.color}20`,
                      color: tag.color,
                      borderColor: `${tag.color}40`,
                    }
                  : undefined
              }
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
            onClick={() => setShowCategoryDropdown((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
          >
            <span className="text-neutral-500">Selecione as tags</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showCategoryDropdown ? "rotate-180" : ""
              }`}
            />
          </button>
          {showCategoryDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-black border border-white/10 rounded-xl overflow-hidden z-10 max-h-60 overflow-y-auto shadow-xl">
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
                      selectedTagIds.includes(tag.id)
                        ? "text-primary"
                        : "text-white"
                    }`}
                  >
                    <span style={{ color: tag.color || undefined }}>
                      {tag.name}
                    </span>
                    {selectedTagIds.includes(tag.id) && (
                      <span
                        className={cn(
                          "w-2 h-2 rounded-full",
                          !tag.color && "bg-primary"
                        )}
                        style={
                          tag.color ? { backgroundColor: tag.color } : undefined
                        }
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
  );
}
