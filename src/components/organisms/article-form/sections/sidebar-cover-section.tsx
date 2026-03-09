import { UseFormRegister, UseFormWatch, FieldErrors } from "react-hook-form";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { CreateArticleDTO } from "@/lib/types/article";

interface SidebarCoverSectionProps {
  register: UseFormRegister<CreateArticleDTO>;
  watch: UseFormWatch<CreateArticleDTO>;
  errors: FieldErrors<CreateArticleDTO>;
  readOnly?: boolean;
}

export function SidebarCoverSection({
  register,
  watch,
  errors,
  readOnly = false,
}: SidebarCoverSectionProps) {
  const coverUrl = watch("coverUrl");

  return (
    <div className="bg-surface border border-white/10 rounded-2xl p-6">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <ImageIcon className="w-4 h-4 text-primary" />
        Imagem de Capa (URL)
      </h3>
      <input
        type="text"
        {...register("coverUrl")}
        disabled={readOnly}
        placeholder="https://exemplo.com/imagem.jpg"
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        maxLength={2048}
      />
      {errors.coverUrl && (
        <p className="text-red-500 text-sm mt-1 mb-2">
          {errors.coverUrl.message}
        </p>
      )}

      {/* Image Preview */}
      {coverUrl && (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10">
          <Image
            src={coverUrl}
            alt="Preview da capa"
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback for broken images if needed, or just let it show broken icon
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}
    </div>
  );
}
