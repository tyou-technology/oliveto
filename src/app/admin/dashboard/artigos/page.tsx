"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Scale,
  ClipboardCheck,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Search,
  Menu,
  X,
  User,
  Newspaper,
  Plus,
  ImageIcon,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  Quote,
  Code,
  Eye,
  Save,
  Send,
  ChevronDown,
  Trash2,
  Edit3,
  Calendar,
  Tag,
} from "lucide-react";

const navigationItems = [
  { icon: LayoutDashboard, label: "Visão Geral", href: "/dashboard" },
  { icon: FileText, label: "Documentos", href: "/dashboard/documentos" },
  { icon: Scale, label: "Perícias", href: "/dashboard/pericias" },
  {
    icon: FolderOpen,
    label: "Contabilidade",
    href: "/dashboard/contabilidade",
  },
  { icon: ClipboardCheck, label: "Auditorias", href: "/dashboard/auditorias" },
  {
    icon: Newspaper,
    label: "Artigos",
    href: "/dashboard/artigos",
    active: true,
  },
  {
    icon: MessageSquare,
    label: "Mensagens",
    href: "/dashboard/mensagens",
    badge: 3,
  },
  {
    icon: Bell,
    label: "Notificações",
    href: "/dashboard/notificacoes",
    badge: 5,
  },
  { icon: Settings, label: "Configurações", href: "/dashboard/configuracoes" },
];

const categories = [
  { value: "agro", label: "Agro." },
  { value: "tributaria", label: "Tributária." },
  { value: "brasil", label: "Brasil." },
  { value: "politica", label: "Política." },
  { value: "londrina", label: "Londrina." },
  { value: "contabilidade", label: "Contabilidade." },
  { value: "pericia", label: "Perícia." },
  { value: "auditoria", label: "Auditoria." },
];

const existingArticles = [
  {
    id: 1,
    title:
      "A dedução das despesas a título de Juros sobre o Capital Próprio (JCP)...",
    category: "Agro.",
    status: "publicado",
    date: "20 Dez 2025",
  },
  {
    id: 2,
    title: "Principais mudanças na legislação tributária para 2026",
    category: "Tributária.",
    status: "rascunho",
    date: "18 Dez 2025",
  },
  {
    id: 3,
    title: "Como preparar sua empresa para auditoria externa",
    category: "Auditoria.",
    status: "publicado",
    date: "15 Dez 2025",
  },
];

export default function ArtigosPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"list" | "create">("list");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: "",
    coverImage: "",
    author: "Augusto Favareto Paes",
    status: "rascunho",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (status: "rascunho" | "publicado") => {
    setFormData((prev) => ({ ...prev, status }));
    // Aqui seria a lógica de envio para o backend
    alert(
      `Artigo ${
        status === "publicado" ? "publicado" : "salvo como rascunho"
      } com sucesso!`
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#111111] border-r border-white/10 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <Link href="/public" className="text-2xl font-bold tracking-tight">
                <Image src="/logo.png" alt="Logo" width={100} height={100} />
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User info */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <div className="w-10 h-10 bg-[#00FF90]/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-[#00FF90]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">João Silva</p>
                <p className="text-sm text-neutral-400 truncate">
                  joao@empresa.com.br
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  item.active
                    ? "bg-[#00FF90]/10 text-[#00FF90]"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${item.active ? "text-[#00FF90]" : ""}`}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs bg-[#00FF90] text-black rounded-full font-medium">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/10">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-neutral-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-200">
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold">Artigos</h1>
                <p className="text-sm text-neutral-400">
                  Gerencie os artigos do blog
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <Search className="w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Buscar artigos..."
                  className="bg-transparent border-none outline-none text-sm w-40 placeholder:text-neutral-500"
                />
              </div>

              <button className="relative p-2 hover:bg-white/10 rounded-xl transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#00FF90] rounded-full" />
              </button>

              <div className="w-10 h-10 bg-[#00FF90]/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-[#00FF90]" />
              </div>
            </div>
          </div>
        </header>

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
            /* Articles List */
            <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-neutral-500 border-b border-white/10">
                      <th className="px-6 py-4 font-medium">Título</th>
                      <th className="px-6 py-4 font-medium">Categoria</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Data</th>
                      <th className="px-6 py-4 font-medium text-right">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {existingArticles.map((article) => (
                      <tr
                        key={article.id}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-lg">
                              <Newspaper className="w-5 h-5 text-[#00FF90]" />
                            </div>
                            <span className="font-medium max-w-xs truncate">
                              {article.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[#00FF90] text-sm">
                            {article.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {article.status === "publicado" ? (
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
                          {article.date}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              title="Visualizar"
                            >
                              <Eye className="w-4 h-4 text-neutral-400" />
                            </button>
                            <button
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <Edit3 className="w-4 h-4 text-neutral-400" />
                            </button>
                            <button
                              className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Create Article Form */
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Title */}
                  <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
                    <label className="block text-sm text-neutral-400 mb-3">
                      Título do Artigo
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="Digite o título do artigo..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-lg font-medium placeholder:text-neutral-600 focus:outline-none focus:border-[#00FF90]/50 transition-colors"
                    />
                  </div>

                  {/* Excerpt */}
                  <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
                    <label className="block text-sm text-neutral-400 mb-3">
                      Resumo / Descrição Curta
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) =>
                        handleInputChange("excerpt", e.target.value)
                      }
                      placeholder="Uma breve descrição que aparecerá na listagem de artigos..."
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:border-[#00FF90]/50 transition-colors resize-none"
                    />
                  </div>

                  {/* Content Editor */}
                  <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
                    <div className="border-b border-white/10 p-4">
                      <label className="block text-sm text-neutral-400 mb-3">
                        Conteúdo do Artigo
                      </label>
                      {/* Toolbar */}
                      <div className="flex items-center gap-1 flex-wrap">
                        <button
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Negrito"
                        >
                          <Bold className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Itálico"
                        >
                          <Italic className="w-4 h-4" />
                        </button>
                        <div className="w-px h-6 bg-white/10 mx-1" />
                        <button
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Lista"
                        >
                          <List className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Lista Numerada"
                        >
                          <ListOrdered className="w-4 h-4" />
                        </button>
                        <div className="w-px h-6 bg-white/10 mx-1" />
                        <button
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Link"
                        >
                          <Link2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Citação"
                        >
                          <Quote className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Código"
                        >
                          <Code className="w-4 h-4" />
                        </button>
                        <div className="w-px h-6 bg-white/10 mx-1" />
                        <button
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Inserir Imagem"
                        >
                          <ImageIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={formData.content}
                      onChange={(e) =>
                        handleInputChange("content", e.target.value)
                      }
                      placeholder="Escreva o conteúdo do artigo aqui..."
                      rows={15}
                      className="w-full bg-transparent px-6 py-4 placeholder:text-neutral-600 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Publish Card */}
                  <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
                    <h3 className="font-semibold mb-4">Publicação</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-400">Status:</span>
                        <span className="text-amber-400">Rascunho</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-400">Visibilidade:</span>
                        <span>Público</span>
                      </div>
                      <div className="pt-4 border-t border-white/10 space-y-3">
                        <button
                          onClick={() => handleSubmit("rascunho")}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          Salvar Rascunho
                        </button>
                        <button
                          onClick={() => handleSubmit("publicado")}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#00FF90] text-black font-medium rounded-xl hover:bg-[#00FF90]/90 transition-colors"
                        >
                          <Send className="w-4 h-4" />
                          Publicar Artigo
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#00FF90]" />
                      Categoria
                    </h3>
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowCategoryDropdown(!showCategoryDropdown)
                        }
                        className="w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
                      >
                        <span
                          className={
                            formData.category
                              ? "text-white"
                              : "text-neutral-500"
                          }
                        >
                          {formData.category || "Selecione uma categoria"}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            showCategoryDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {showCategoryDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden z-10">
                          {categories.map((cat) => (
                            <button
                              key={cat.value}
                              onClick={() => {
                                handleInputChange("category", cat.label);
                                setShowCategoryDropdown(false);
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors text-sm"
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cover Image */}
                  <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#00FF90]" />
                      Imagem de Capa
                    </h3>
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-[#00FF90]/30 transition-colors cursor-pointer">
                      <ImageIcon className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
                      <p className="text-sm text-neutral-400 mb-1">
                        Arraste uma imagem ou clique para selecionar
                      </p>
                      <p className="text-xs text-neutral-600">
                        PNG, JPG até 5MB
                      </p>
                    </div>
                  </div>

                  {/* Author */}
                  <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <User className="w-4 h-4 text-[#00FF90]" />
                      Autor
                    </h3>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) =>
                        handleInputChange("author", e.target.value)
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder:text-neutral-600 focus:outline-none focus:border-[#00FF90]/50 transition-colors"
                    />
                  </div>

                  {/* Schedule */}
                  <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#00FF90]" />
                      Agendar Publicação
                    </h3>
                    <input
                      type="datetime-local"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00FF90]/50 transition-colors text-neutral-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
