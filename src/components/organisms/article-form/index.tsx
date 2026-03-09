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
} from "@/lib/types/article";
import { useEffect } from "react";
import { ArticleMainContent } from "./article-main-content";
import { ArticleSidebar } from "./article-sidebar";
import { toast } from "sonner";

interface ArticleFormProps {
  onSubmit: (data: CreateArticleDTO, shouldPublish?: boolean) => void;
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
      tagIds: initialData?.tags ? initialData.tags.map((t) => t.id) : (initialData?.tagIds || []),
      title: initialData?.title || "",
      briefing: initialData?.briefing || "",
      coverUrl: initialData?.coverUrl || "",
      readingTime: initialData?.readingTime || 1,
      seoTitle: initialData?.seoTitle || "",
      seoDescription: initialData?.seoDescription || "",
    },
  });

  // Update values if initialData changes after mount
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        briefing: initialData.briefing || "",
        content: initialData.content || "",
        tagIds: initialData.tags ? initialData.tags.map((t) => t.id) : (initialData.tagIds || []),
        coverUrl: initialData.coverUrl || "",
        readingTime: initialData.readingTime || 1,
        seoTitle: initialData.seoTitle || "",
        seoDescription: initialData.seoDescription || "",
      });
    }
  }, [initialData, reset]);

  const handleStatusChange = (status: ArticleStatus) => {
    if (readOnly) return;
    const shouldPublish = status === ArticleStatus.PUBLISHED;
    handleSubmit((data) => onSubmit(data, shouldPublish))();
  };

  const getTitle = () => {
    if (readOnly) return "Visualizar Artigo";
    if (initialData) return "Editar Artigo";
    return "Novo Artigo";
  };

  const onInvalid = (errors: any) => {
    console.error("Form errors:", errors);
    toast.error("Por favor, corrija os erros no formulário antes de enviar.");
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, false), onInvalid)} className="space-y-6">
      {/* Header with Back Button if onCancel is provided */}
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
        {/* Main Form */}
        <ArticleMainContent
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          readOnly={readOnly}
          control={control}
        />

        {/* Sidebar */}
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
          onStatusChange={handleStatusChange}
        />
      </div>
    </form>
  );
}
