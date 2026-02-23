import { UseFormWatch } from "react-hook-form";
import { User } from "lucide-react";
import { CreateArticleDTO } from "@/lib/types/article";

interface SidebarAuthorSectionProps {
  watch: UseFormWatch<CreateArticleDTO>;
  authorName: string;
}

export function SidebarAuthorSection({
  watch,
  authorName,
}: SidebarAuthorSectionProps) {
  const currentAuthorName = watch("authorName") || authorName;

  return (
    <div className="bg-surface border border-white/10 rounded-2xl p-6">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <User className="w-4 h-4 text-primary" />
        Autor
      </h3>
      <input
        type="text"
        disabled
        value={currentAuthorName}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:border-primary/50 transition-colors opacity-50 cursor-not-allowed"
      />
    </div>
  );
}
