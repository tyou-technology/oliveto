import {
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";

import {
  CreateArticleDTO,
  TagResponseDTO,
  ArticleResponseDTO,
} from "@/lib/types/article";
import { SidebarPublishSection } from "./sections/sidebar-publish-section";
import { SidebarTagsSection } from "./sections/sidebar-tags-section";
import { SidebarCoverSection } from "./sections/sidebar-cover-section";
import { SidebarAuthorSection } from "./sections/sidebar-author-section";
import { SidebarSeoSection } from "./sections/sidebar-seo-section";

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
}: ArticleSidebarProps) {
  return (
    <div className="space-y-6">
      <SidebarPublishSection
        watch={watch}
        setValue={setValue}
        isPending={isPending}
        initialData={initialData}
        onCancel={onCancel}
        readOnly={readOnly}
      />

      <SidebarTagsSection
        watch={watch}
        setValue={setValue}
        tags={tags}
        readOnly={readOnly}
      />

      <SidebarCoverSection
        register={register}
        watch={watch}
        errors={errors}
        readOnly={readOnly}
      />

      <SidebarSeoSection
        register={register}
        errors={errors}
        readOnly={readOnly}
      />

      <SidebarAuthorSection authorName={authorName} />
    </div>
  );
}
