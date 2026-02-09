import { TagResponseDTO } from "@/lib/types/article";
import { memo } from "react";
import { TagListItem } from "@/components/molecules/tag-list-item";

interface TagListProps {
  tags: TagResponseDTO[];
  onEdit: (tag: TagResponseDTO) => void;
  onDelete: (tag: TagResponseDTO) => void;
}

export const TagList = memo(function TagList({ tags, onEdit, onDelete }: TagListProps) {
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
              <TagListItem
                key={tag.id}
                tag={tag}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
