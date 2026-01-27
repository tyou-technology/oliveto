"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { DashboardSidebar } from "@/components/organisms/dashboard-sidebar";
import { DashboardHeader } from "@/components/organisms/dashboard-header";
import { useUserStore } from "@/stores/useUserStore";
import { ArticleList } from "@/components/organisms/article-list";
import { ArticleForm } from "@/components/organisms/article-form";
import { useArticles } from "@/features/articles/hooks/useArticles";
import { CreateArticleDTO, ArticleResponseDTO } from "@/lib/types/article";

export default function ArtigosPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"list" | "create">("list");
  const { user } = useUserStore();

  // Fetch articles for the current user's firm
  const {
    articles,
    isLoadingArticles,
    createArticle,
    deleteArticle,
    updateArticle,
  } = useArticles(user?.firmId);

  const handleCreateArticle = (data: CreateArticleDTO) => {
    createArticle.mutate(data, {
      onSuccess: () => {
        setActiveTab("list");
      },
    });
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este artigo?")) {
      deleteArticle.mutate(id);
    }
  };

  const handleEditArticle = (article: ArticleResponseDTO) => {
    // Logic to switch to edit mode (could be a new tab or modal)
    console.log("Edit article:", article);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <main className="flex-1 min-w-0">
        <DashboardHeader
          onMenuClick={() => setSidebarOpen(true)}
          title={`Artigos`}
          subtitle="Gerencie os artigos do blog"
        />

        {/* Content */}
        <div className="p-4 lg:p-8">
          {/* Tabs */}
          <div className="flex items-center gap-4 mb-8">
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
          </div>

          {activeTab === "list" ? (
            <ArticleList
              articles={articles}
              onEdit={handleEditArticle}
              onDelete={handleDeleteArticle}
            />
          ) : (
            <ArticleForm
              onSubmit={handleCreateArticle}
              isPending={createArticle.isPending}
            />
          )}
        </div>
      </main>
    </div>
  );
}
