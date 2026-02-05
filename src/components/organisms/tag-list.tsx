import { Edit3, Tag, Trash2 } from "lucide-react";
import { TagResponseDTO } from "@/lib/types/article";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/atoms/button";

interface TagListProps {
  tags: TagResponseDTO[];
  onEdit: (tag: TagResponseDTO) => void;
  onDelete: (id: string) => void;
}

export function TagList({ tags, onEdit, onDelete }: TagListProps) {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-neutral-500 border-b border-white/10">
              <th className="px-6 py-4 font-medium">Nome</th>
              <th className="px-6 py-4 font-medium">Descrição</th>
              <th className="px-6 py-4 font-medium">Cor</th>
              <th className="px-6 py-4 font-medium">Data de Criação</th>
              <th className="px-6 py-4 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tags.map((tag) => (
              <tr key={tag.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: tag.color ? `${tag.color}20` : "#333",
                      }}
                    >
                      <Tag
                        className="w-5 h-5"
                        style={{ color: tag.color || "#fff" }}
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
                      className="w-4 h-4 rounded-full border border-white/10"
                      style={{ backgroundColor: tag.color || "#fff" }}
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
                      aria-label="Editar tag"
                      title="Editar"
                      onClick={() => onEdit(tag)}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg"
                      aria-label="Excluir tag"
                      title="Excluir"
                      onClick={() => onDelete(tag.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
