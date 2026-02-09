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

interface ArticleFormProps {
  onSubmit: (data: CreateArticleDTO) => void;
  isPending: boolean;
  tags: TagResponseDTO[];
  authorId: string;
  firmId: string;
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
  firmId,
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
      status: initialData?.status || ArticleStatus.DRAFT,
      authorId: initialData?.author?.id || initialData?.authorId || authorId,
      firmId: initialData?.firm?.id || initialData?.firmId || firmId,
      content: initialData?.content || "",
      tagIds: initialData?.tags ? initialData.tags.map((t) => t.id) : (initialData?.tagIds || []),
      title: initialData?.title || "",
      briefing: initialData?.briefing || "",
      imageUrl: initialData?.imageUrl || "",
      authorName: initialData?.author?.fullName || initialData?.authorName || authorName,
    },
  });

  // Update values if initialData changes after mount
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        briefing: initialData.briefing || "",
        content: initialData.content || "",
        status: initialData.status,
        authorId: initialData.author?.id || initialData.authorId || authorId,
        firmId: initialData.firm?.id || initialData.firmId || firmId,
        tagIds: initialData.tags ? initialData.tags.map((t) => t.id) : (initialData.tagIds || []),
        imageUrl: initialData.imageUrl || "",
        authorName: initialData.author?.fullName || initialData.authorName || authorName,
      });
    }
  }, [initialData, reset, authorId, firmId, authorName]);

  const handleStatusChange = (status: ArticleStatus) => {
    if (readOnly) return;
    setValue("status", status);
    handleSubmit(onSubmit)();
  };

  const getTitle = () => {
    if (readOnly) return "Visualizar Artigo";
    if (initialData) return "Editar Artigo";
    return "Novo Artigo";
  };

  return (
    <div className="space-y-6">
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
    </div>
  );
}
