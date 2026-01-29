"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronDown,
  ImageIcon,
  Save,
  Send,
  Tag,
  User,
  X,
} from "lucide-react";
import {
  CreateArticleDTO,
  CreateArticleSchema,
  ArticleStatus,
  TagResponseDTO,
} from "@/lib/types/article";
import { useState, useEffect } from "react";
import { TiptapEditor } from "@/components/molecules/tiptap-editor";

interface ArticleFormProps {
  onSubmit: (data: CreateArticleDTO) => void;
  isPending: boolean;
  tags: TagResponseDTO[];
  authorId: string;
  firmId: string;
  authorName: string;
}

export function ArticleForm({
  onSubmit,
  isPending,
  tags,
  authorId,
  firmId,
  authorName,
}: ArticleFormProps) {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateArticleDTO>({
    resolver: zodResolver(CreateArticleSchema),
    defaultValues: {
      status: ArticleStatus.DRAFT,
      authorId: authorId,
      firmId: firmId,
      content: "",
      tagIds: [],
    },
  });

  // Update default values if props change (e.g. initial load)
  useEffect(() => {
    setValue("authorId", authorId);
    setValue("firmId", firmId);
  }, [authorId, firmId, setValue]);

  const selectedTagIds = watch("tagIds") || [];

  const handleFormSubmit = (status: ArticleStatus) => {
    setValue("status", status);
    handleSubmit(onSubmit)();
  };

  const toggleTag = (tagId: string) => {
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
            <label className="block text-sm text-neutral-400 mb-3">
              Título do Artigo
            </label>
            <input
              type="text"
              {...register("title")}
              placeholder="Digite o título do artigo..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-lg font-medium placeholder:text-neutral-600 focus:outline-none focus:border-[#00FF90]/50 transition-colors"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Excerpt */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
            <label className="block text-sm text-neutral-400 mb-3">
              Resumo / Descrição Curta
            </label>
            <textarea
              {...register("briefing")}
              placeholder="Uma breve descrição que aparecerá na listagem de artigos..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:border-[#00FF90]/50 transition-colors resize-none"
            />
          </div>

          {/* Content Editor */}
          <div className="space-y-2">
            <label className="block text-sm text-neutral-400">
              Conteúdo do Artigo
            </label>
            <TiptapEditor
              content={watch("content")}
              onChange={(content) => setValue("content", content)}
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Card */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
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
                <button
                  type="button"
                  onClick={() => handleFormSubmit(ArticleStatus.DRAFT)}
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  Salvar Rascunho
                </button>
                <button
                  type="button"
                  onClick={() => handleFormSubmit(ArticleStatus.PUBLISHED)}
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#00FF90] text-black font-medium rounded-xl hover:bg-[#00FF90]/90 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  Publicar Artigo
                </button>
              </div>
            </div>
          </div>

          {/* Category / Tags */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#00FF90]" />
              Tags
            </h3>
            
            {/* Selected Tags Chips */}
            {selectedTagIds.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {getSelectedTags().map(tag => (
                  <span 
                    key={tag.id} 
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-[#00FF90]/10 text-[#00FF90] border border-[#00FF90]/20"
                  >
                    {tag.name}
                    <button 
                      type="button" 
                      onClick={() => toggleTag(tag.id)}
                      className="hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

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
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden z-10 max-h-60 overflow-y-auto">
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
                          selectedTagIds.includes(tag.id) ? "text-[#00FF90]" : "text-white"
                        }`}
                      >
                        <span>{tag.name}</span>
                        {selectedTagIds.includes(tag.id) && (
                          <span className="w-2 h-2 rounded-full bg-[#00FF90]" />
                        )}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#00FF90]" />
              Imagem de Capa
            </h3>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-[#00FF90]/30 transition-colors cursor-pointer">
              <ImageIcon className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
              <p className="text-sm text-neutral-400 mb-1">
                Arraste uma imagem ou clique para selecionar
              </p>
              <p className="text-xs text-neutral-600">PNG, JPG até 5MB</p>
            </div>
          </div>

          {/* Author */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-[#00FF90]" />
              Autor
            </h3>
            <input
              type="text"
              disabled
              value={authorName}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:border-[#00FF90]/50 transition-colors opacity-50 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
