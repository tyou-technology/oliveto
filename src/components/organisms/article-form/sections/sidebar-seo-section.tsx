import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateArticleDTO } from "@/lib/types/article";
import { Search } from "lucide-react";

interface SidebarSeoSectionProps {
  register: UseFormRegister<CreateArticleDTO>;
  errors: FieldErrors<CreateArticleDTO>;
  readOnly?: boolean;
}

export function SidebarSeoSection({
  register,
  errors,
  readOnly = false,
}: SidebarSeoSectionProps) {
  return (
    <div className="bg-surface border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">SEO</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-neutral-400 mb-2">SEO Title</label>
          <input
            type="text"
            {...register("seoTitle")}
            disabled={readOnly}
            placeholder="Título para motores de busca"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
          />
          {errors.seoTitle && (
            <p className="text-red-500 text-xs mt-1">{errors.seoTitle.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-2">SEO Description</label>
          <textarea
            {...register("seoDescription")}
            disabled={readOnly}
            placeholder="Descrição para motores de busca"
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-primary/50 transition-colors resize-none disabled:opacity-50"
          />
          {errors.seoDescription && (
            <p className="text-red-500 text-xs mt-1">{errors.seoDescription.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
