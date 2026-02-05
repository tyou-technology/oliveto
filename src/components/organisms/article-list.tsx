import { Edit3, Eye, Newspaper, Trash2 } from "lucide-react";
import { ArticleResponseDTO, ArticleStatus } from "@/lib/types/article";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/atoms/button";

interface ArticleListProps {
  articles: ArticleResponseDTO[];
  onView: (article: ArticleResponseDTO) => void;
  onEdit: (article: ArticleResponseDTO) => void;
  onDelete: (id: string) => void;
}

export function ArticleList({ articles, onView, onEdit, onDelete }: ArticleListProps) {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-neutral-500 border-b border-white/10">
              <th className="px-6 py-4 font-medium">Título</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Data</th>
              <th className="px-6 py-4 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {articles.map((article) => (
              <tr
                key={article.id}
                className="hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg">
                      <Newspaper className="w-5 h-5 text-[#00FF90]" />
                    </div>
                    <span className="font-medium max-w-xs truncate text-white">
                      {article.title}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {article.status === ArticleStatus.PUBLISHED ? (
                    <span className="text-xs text-[#00FF90] bg-[#00FF90]/10 px-3 py-1 rounded-full">
                      Publicado
                    </span>
                  ) : (
                    <span className="text-xs text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
                      Rascunho
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-neutral-400">
                  {article.publishedAt
                    ? format(new Date(article.publishedAt), "dd MMM yyyy", {
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
                      aria-label="Visualizar artigo"
                      title="Visualizar"
                      onClick={() => onView(article)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="hover:bg-white/10 text-neutral-400 hover:text-white rounded-lg"
                      aria-label="Editar artigo"
                      title="Editar"
                      onClick={() => onEdit(article)}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg"
                      aria-label="Excluir artigo"
                      title="Excluir"
                      onClick={() => onDelete(article.id)}
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
