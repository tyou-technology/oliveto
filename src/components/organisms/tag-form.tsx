"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { CreateTagDTO, CreateTagSchema } from "@/lib/types/article";
import { useUserStore } from "@/stores/useUserStore";

interface TagFormProps {
  onSubmit: (data: CreateTagDTO) => void;
  isPending: boolean;
}

export function TagForm({ onSubmit, isPending }: TagFormProps) {
  const { user } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTagDTO>({
    resolver: zodResolver(CreateTagSchema),
    defaultValues: {
      firmId: user?.firmId || "00000000-0000-0000-0000-000000000000",
      color: "#00FF90",
    },
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 space-y-6">
        <div>
          <label className="block text-sm text-neutral-400 mb-3">
            Nome da Tag
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="Ex: Tributário, Agro, Notícias..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-lg font-medium placeholder:text-neutral-600 focus:outline-none focus:border-[#00FF90]/50 transition-colors"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-3">
            Descrição (Opcional)
          </label>
          <textarea
            {...register("description")}
            placeholder="Breve descrição sobre a tag..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:border-[#00FF90]/50 transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-3">Cor</label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              {...register("color")}
              className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-none"
            />
            <input
              type="text"
              {...register("color")}
              placeholder="#000000"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:border-[#00FF90]/50 transition-colors uppercase"
            />
          </div>
          {errors.color && (
            <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>
          )}
        </div>

        <div className="pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#00FF90] text-black font-medium rounded-xl hover:bg-[#00FF90]/90 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            Salvar Tag
          </button>
        </div>
      </div>
    </div>
  );
}
