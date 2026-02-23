import { Edit3, Tag, Trash2 } from "lucide-react";
import { TagResponseDTO } from "@/lib/types/article";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/atoms/button";
import { memo } from "react";
import { cn } from "@/lib/utils";

interface TagListItemProps {
  tag: TagResponseDTO;
  onEdit: (tag: TagResponseDTO) => void;
  onDelete: (tag: TagResponseDTO) => void;
}

export const TagListItem = memo(function TagListItem({ tag, onEdit, onDelete }: TagListItemProps) {
  return (
    <tr className="hover:bg-white/5 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={cn("p-2 rounded-lg", !tag.color && "bg-neutral-800")}
            style={tag.color ? { backgroundColor: `${tag.color}20` } : undefined}
          >
            <Tag
              className={cn("w-5 h-5", !tag.color && "text-white")}
              style={tag.color ? { color: tag.color } : undefined}
            />
          </div>
          <span className="font-medium max-w-xs truncate text-white">
            {tag.name}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-neutral-400">
        {tag.description || "-"}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div
            className={cn("w-4 h-4 rounded-full border border-white/10", !tag.color && "bg-white")}
            style={tag.color ? { backgroundColor: tag.color } : undefined}
          />
          <span className="text-sm text-neutral-400">
            {tag.color || "-"}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-neutral-400">
        {tag.createdAt
          ? format(new Date(tag.createdAt), "dd MMM yyyy", {
              locale: ptBR,
            })
          : "-"}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            className="hover:bg-white/10 text-neutral-400 hover:text-white rounded-lg"
            aria-label={`Editar tag: ${tag.name}`}
            title="Editar"
            onClick={() => onEdit(tag)}
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg"
            aria-label={`Excluir tag: ${tag.name}`}
            title="Excluir"
            onClick={() => onDelete(tag)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
});
