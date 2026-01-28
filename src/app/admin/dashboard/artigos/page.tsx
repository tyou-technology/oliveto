"use client";

import { useState } from "react";
import { Plus, Tag } from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";
import { ArticleList } from "@/components/organisms/article-list";
import { ArticleForm } from "@/components/organisms/article-form";
import { useArticles } from "@/features/articles/hooks/useArticles";
import {
  CreateArticleDTO,
  ArticleResponseDTO,
  CreateTagDTO,
  TagResponseDTO,
} from "@/lib/types/article";
import { useTags } from "@/features/articles/hooks/useTags";
import { TagList } from "@/components/organisms/tag-list";
import { TagForm } from "@/components/organisms/tag-form";

type TabType = "list" | "create" | "tags" | "create-tag";

export default function ArtigosPage() {
  const [activeTab, setActiveTab] = useState<TabType>("list");
  const { user } = useUserStore();

  // Fetch articles and tags for the current user's firm
  const {
    articles,
    isLoadingArticles,
    createArticle,
    deleteArticle,
    updateArticle,
  } = useArticles(user?.firmId);

  const { tags, isLoadingTags, createTag, deleteTag, updateTag } = useTags(
    user?.firmId
  );

  const handleCreateArticle = (data: CreateArticleDTO) => {
    createArticle.mutate(data, {
      onSuccess: () => {
        setActiveTab("list");
      },
    });
  };

  const handleCreateTag = (data: CreateTagDTO) => {
    createTag.mutate(data, {
      onSuccess: () => {
        setActiveTab("tags");
      },
    });
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este artigo?")) {
      deleteArticle.mutate(id);
    }
  };

  const handleDeleteTag = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta tag?")) {
      deleteTag.mutate(id);
    }
  };

  const handleEditArticle = (article: ArticleResponseDTO) => {
    console.log("Edit article:", article);
  };

  const handleEditTag = (tag: TagResponseDTO) => {
    console.log("Edit tag:", tag);
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("list")}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            activeTab === "list"
              ? "bg-[#00FF90] text-black"
              : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          Todos os Artigos
        </button>
        <button
          onClick={() => setActiveTab("create")}
          className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
            activeTab === "create"
              ? "bg-[#00FF90] text-black"
              : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Plus className="w-5 h-5" />
          Novo Artigo
        </button>
        <div className="w-px h-8 bg-white/10 mx-2 hidden md:block" />
        <button
          onClick={() => setActiveTab("tags")}
          className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
            activeTab === "tags"
              ? "bg-[#00FF90] text-black"
              : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Tag className="w-5 h-5" />
          Gerenciar Tags
        </button>
        <button
          onClick={() => setActiveTab("create-tag")}
          className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
            activeTab === "create-tag"
              ? "bg-[#00FF90] text-black"
              : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Plus className="w-5 h-5" />
          Nova Tag
        </button>
      </div>

      {activeTab === "list" && (
        <ArticleList
          articles={articles}
          onEdit={handleEditArticle}
          onDelete={handleDeleteArticle}
        />
      )}

      {activeTab === "create" && (
        <ArticleForm
          onSubmit={handleCreateArticle}
          isPending={createArticle.isPending}
        />
      )}

      {activeTab === "tags" && (
        <TagList
          tags={tags}
          onEdit={handleEditTag}
          onDelete={handleDeleteTag}
        />
      )}

      {activeTab === "create-tag" && (
        <TagForm
          onSubmit={handleCreateTag}
          isPending={createTag.isPending}
        />
      )}
    </div>
  );
}
