import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { CreateArticleDTO } from "@/lib/types/article";
import { TiptapEditor } from "@/components/molecules/tiptap-editor";

interface ArticleMainContentProps {
  register: UseFormRegister<CreateArticleDTO>;
  errors: FieldErrors<CreateArticleDTO>;
  watch: UseFormWatch<CreateArticleDTO>;
  setValue: UseFormSetValue<CreateArticleDTO>;
  readOnly?: boolean;
}

export function ArticleMainContent({
  register,
  errors,
  watch,
  setValue,
  readOnly = false,
}: ArticleMainContentProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Title */}
      <div className="bg-surface border border-white/10 rounded-2xl p-6">
        <label className="block text-sm text-neutral-400 mb-3">
          Título do Artigo
        </label>
        <input
          type="text"
          {...register("title")}
          disabled={readOnly}
          placeholder="Digite o título do artigo..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-lg font-medium placeholder:text-neutral-600 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          maxLength={255}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Excerpt */}
      <div className="bg-surface border border-white/10 rounded-2xl p-6">
        <label className="block text-sm text-neutral-400 mb-3">
          Resumo / Descrição Curta
        </label>
        <textarea
          {...register("briefing")}
          disabled={readOnly}
          placeholder="Uma breve descrição que aparecerá na listagem de artigos..."
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:border-primary/50 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          maxLength={500}
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
          readOnly={readOnly}
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
      </div>
    </div>
  );
}
