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
} from "lucide-react";
import { categories } from "@/lib/constants/articles";
import {
  CreateArticleDTO,
  CreateArticleSchema,
  ArticleStatus,
} from "@/lib/types/article";
import { useState } from "react";
import { TiptapEditor } from "@/components/molecules/tiptap-editor";

interface ArticleFormProps {
  onSubmit: (data: CreateArticleDTO) => void;
  isPending: boolean;
}

export function ArticleForm({ onSubmit, isPending }: ArticleFormProps) {
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
      authorId: "00000000-0000-0000-0000-000000000000", // Placeholder, should come from auth context
      firmId: "00000000-0000-0000-0000-000000000000", // Placeholder
      content: "",
    },
  });

  const handleFormSubmit = (status: ArticleStatus) => {
    setValue("status", status);
    handleSubmit(onSubmit)();
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

          {/* Category */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#00FF90]" />
              Categoria
            </h3>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
              >
                <span className="text-neutral-500">
                  Selecione uma categoria (Tags)
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showCategoryDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden z-10">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => {
                        // Logic to add tag ID to array
                        setShowCategoryDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors text-sm"
                    >
                      {cat.label}
                    </button>
                  ))}
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
              value="Augusto Favareto Paes" // Should come from user store
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:border-[#00FF90]/50 transition-colors opacity-50 cursor-not-allowed"
            />
          </div>

          {/* Schedule */}
          {/*<div className="bg-[#111111] border border-white/10 rounded-2xl p-6">*/}
          {/*  <h3 className="font-semibold mb-4 flex items-center gap-2">*/}
          {/*    <Calendar className="w-4 h-4 text-[#00FF90]" />*/}
          {/*    Agendar Publicação*/}
          {/*  </h3>*/}
          {/*  <input*/}
          {/*    type="datetime-local"*/}
          {/*    {...register("publishedAt")}*/}
          {/*    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00FF90]/50 transition-colors text-neutral-400"*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
}
