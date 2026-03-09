"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import {
  CreateArticleDTO,
  CreateArticleSchema,
  ArticleStatus,
  TagResponseDTO,
  ArticleResponseDTO,
  getArticleTags,
} from "@/lib/types/article";
import { useEffect } from "react";
import { ArticleMainContent } from "./article-main-content";
import { ArticleSidebar } from "./article-sidebar";
import { toast } from "sonner";

interface ArticleFormProps {
  onSubmit: (data: CreateArticleDTO) => void;
  isPending: boolean;
  tags: TagResponseDTO[];
  authorId: string;
  authorName: string;
  initialData?: ArticleResponseDTO;
  onCancel?: () => void;
  readOnly?: boolean;
}

export function ArticleForm({
  onSubmit,
  isPending,
  tags,
  authorId,
  authorName,
  initialData,
  onCancel,
  readOnly = false,
}: ArticleFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateArticleDTO>({
    resolver: zodResolver(CreateArticleSchema),
    defaultValues: {
      content: initialData?.content || "",
      tagIds: initialData
        ? (getArticleTags(initialData).map((t) => t.id).length > 0
            ? getArticleTags(initialData).map((t) => t.id)
            : (initialData.tagIds || []))
        : [],
      title: initialData?.title || "",
      briefing: initialData?.briefing || "",
      coverUrl: initialData?.coverUrl || "",
      readingTime: initialData?.readingTime || 1,
      seoTitle: initialData?.seoTitle || "",
      seoDescription: initialData?.seoDescription || "",
      status: initialData?.status ?? ArticleStatus.DRAFT,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        briefing: initialData.briefing || "",
        content: initialData.content || "",
        tagIds: getArticleTags(initialData).map((t) => t.id).length > 0
          ? getArticleTags(initialData).map((t) => t.id)
          : (initialData.tagIds || []),
        coverUrl: initialData.coverUrl || "",
        readingTime: initialData.readingTime || 1,
        seoTitle: initialData.seoTitle || "",
        seoDescription: initialData.seoDescription || "",
        status: initialData.status ?? ArticleStatus.DRAFT,
      });
    }
  }, [initialData, reset]);

  const getTitle = () => {
    if (readOnly) return "Visualizar Artigo";
    if (initialData) return "Editar Artigo";
    return "Novo Artigo";
  };

  const onInvalid = () => {
    toast.error("Por favor, corrija os erros no formulário antes de enviar.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6">
      {onCancel && (
        <div className="flex items-center gap-4 mb-2">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-neutral-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">{getTitle()}</h2>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ArticleMainContent
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          readOnly={readOnly}
          control={control}
        />

        <ArticleSidebar
          register={register}
          watch={watch}
          setValue={setValue}
          errors={errors}
          readOnly={readOnly}
          isPending={isPending}
          initialData={initialData}
          onCancel={onCancel}
          tags={tags}
          authorName={authorName}
        />
      </div>
    </form>
  );
}
