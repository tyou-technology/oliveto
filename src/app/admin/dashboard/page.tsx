"use client";

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Download,
  Eye,
  FileText,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Newspaper,
  Plus,
  Scale,
  Search,
  Settings,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import {ROUTES} from "@/lib/config/routes";

const navigationItems = [
  {
    icon: LayoutDashboard,
    label: "Visão Geral",
    href: ROUTES.ADMIN.DASHBOARD.HOME,
    active: true,
  },
  { icon: FileText, label: "Documentos", href: ROUTES.ADMIN.DASHBOARD.DOCUMENTOS },
  { icon: Scale, label: "Perícias", href: ROUTES.ADMIN.DASHBOARD.PERICIAS },
  {
    icon: FolderOpen,
    label: "Contabilidade",
    href: ROUTES.ADMIN.DASHBOARD.CONTABILIDADE,
  },
  { icon: ClipboardCheck, label: "Auditorias", href: ROUTES.ADMIN.DASHBOARD.AUDITORIAS },
  { icon: Newspaper, label: "Artigos", href: ROUTES.ADMIN.DASHBOARD.ARTIGOS },
  {
    icon: MessageSquare,
    label: "Mensagens",
    href: ROUTES.ADMIN.DASHBOARD.MENSAGENS,
    badge: 3,
  },
  {
    icon: Bell,
    label: "Notificações",
    href: ROUTES.ADMIN.DASHBOARD.NOTIFICACOES,
    badge: 5,
  },
  { icon: Settings, label: "Configurações", href: ROUTES.ADMIN.DASHBOARD.CONFIGURACOES },
];

const recentDocuments = [
  {
    name: "Balanço Patrimonial Q3 2025",
    type: "PDF",
    date: "20 Dez 2025",
    status: "novo",
  },
  {
    name: "DRE Consolidado",
    type: "XLSX",
    date: "18 Dez 2025",
    status: "visualizado",
  },
  {
    name: "Laudo Pericial - Processo 0012345",
    type: "PDF",
    date: "15 Dez 2025",
    status: "visualizado",
  },
  {
    name: "Relatório de Auditoria Interna",
    type: "PDF",
    date: "12 Dez 2025",
    status: "novo",
  },
];

const activeProcesses = [
  {
    id: "PER-2025-0847",
    title: "Perícia Contábil - Financiamento Imobiliário",
    status: "em_andamento",
    progress: 65,
    deadline: "15 Jan 2026",
  },
  {
    id: "AUD-2025-0234",
    title: "Auditoria das Demonstrações Contábeis",
    status: "em_andamento",
    progress: 40,
    deadline: "30 Jan 2026",
  },
  {
    id: "CON-2025-1102",
    title: "Escrituração Fiscal - Dezembro",
    status: "concluido",
    progress: 100,
    deadline: "10 Jan 2026",
  },
];

const upcomingTasks = [
  { title: "Reunião de alinhamento", date: "22 Dez", time: "14:00" },
  { title: "Entrega de documentos fiscais", date: "28 Dez", time: "18:00" },
  { title: "Prazo IRPJ", date: "31 Dez", time: "23:59" },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);


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
              <Link href={ROUTES.PUBLIC.HOME} className="text-2xl font-bold tracking-tight">
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
                <h1 className="text-xl lg:text-2xl font-bold">
                  Bem-vindo, João
                </h1>
                <p className="text-sm text-neutral-400">
                  Aqui está o resumo da sua conta
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <Search className="w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-transparent border-none outline-none text-sm w-40 placeholder:text-neutral-500"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-white/10 rounded-xl transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#00FF90] rounded-full" />
              </button>

              {/* Profile */}
              <div className="w-10 h-10 bg-[#00FF90]/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-[#00FF90]" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-4 lg:p-8 space-y-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:border-[#00FF90]/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#00FF90]/10 rounded-xl">
                  <Scale className="w-6 h-6 text-[#00FF90]" />
                </div>
                <span className="text-xs text-[#00FF90] bg-[#00FF90]/10 px-2 py-1 rounded-full">
                  +2 este mês
                </span>
              </div>
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm text-neutral-400 mt-1">Perícias Ativas</p>
            </div>

            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:border-[#00FF90]/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <FolderOpen className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">
                  Em dia
                </span>
              </div>
              <p className="text-3xl font-bold">8</p>
              <p className="text-sm text-neutral-400 mt-1">
                Obrigações Contábeis
              </p>
            </div>

            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:border-[#00FF90]/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-amber-500/10 rounded-xl">
                  <ClipboardCheck className="w-6 h-6 text-amber-400" />
                </div>
                <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full">
                  1 pendente
                </span>
              </div>
              <p className="text-3xl font-bold">3</p>
              <p className="text-sm text-neutral-400 mt-1">
                Auditorias em Curso
              </p>
            </div>

            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:border-[#00FF90]/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <FileText className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded-full">
                  4 novos
                </span>
              </div>
              <p className="text-3xl font-bold">47</p>
              <p className="text-sm text-neutral-400 mt-1">Documentos</p>
            </div>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Processes */}
            <div className="lg:col-span-2 bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-lg font-semibold">
                  Processos em Andamento
                </h2>
                <Link
                  href={ROUTES.ADMIN.DASHBOARD.PROCESSOS}
                  className="text-sm text-[#00FF90] hover:underline flex items-center gap-1"
                >
                  Ver todos <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="divide-y divide-white/5">
                {activeProcesses.map((process) => (
                  <div
                    key={process.id}
                    className="p-6 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-neutral-500 font-mono">
                            {process.id}
                          </span>
                          {process.status === "concluido" ? (
                            <span className="text-xs text-[#00FF90] bg-[#00FF90]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Concluído
                            </span>
                          ) : (
                            <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Em andamento
                            </span>
                          )}
                        </div>
                        <h3 className="font-medium">{process.title}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-neutral-500">Prazo</p>
                        <p className="text-sm">{process.deadline}</p>
                      </div>
                    </div>
                    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                          process.status === "concluido"
                            ? "bg-[#00FF90]"
                            : "bg-amber-400"
                        }`}
                        style={{ width: `${process.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">
                      {process.progress}% concluído
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Upcoming tasks */}
              <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h2 className="text-lg font-semibold">Próximos Prazos</h2>
                  <Calendar className="w-5 h-5 text-neutral-400" />
                </div>
                <div className="p-4 space-y-3">
                  {upcomingTasks.map((task, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <div className="text-center min-w-[50px]">
                        <p className="text-lg font-bold text-[#00FF90]">
                          {task.date.split(" ")[0]}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {task.date.split(" ")[1]}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{task.title}</p>
                        <p className="text-xs text-neutral-500">{task.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">Ações Rápidas</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-[#00FF90]/10 hover:border-[#00FF90]/30 border border-transparent rounded-xl transition-all group">
                    <Plus className="w-6 h-6 text-neutral-400 group-hover:text-[#00FF90]" />
                    <span className="text-xs text-neutral-400 group-hover:text-white">
                      Enviar Doc
                    </span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-[#00FF90]/10 hover:border-[#00FF90]/30 border border-transparent rounded-xl transition-all group">
                    <MessageSquare className="w-6 h-6 text-neutral-400 group-hover:text-[#00FF90]" />
                    <span className="text-xs text-neutral-400 group-hover:text-white">
                      Nova Mensagem
                    </span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-[#00FF90]/10 hover:border-[#00FF90]/30 border border-transparent rounded-xl transition-all group">
                    <FileText className="w-6 h-6 text-neutral-400 group-hover:text-[#00FF90]" />
                    <span className="text-xs text-neutral-400 group-hover:text-white">
                      Relatórios
                    </span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-[#00FF90]/10 hover:border-[#00FF90]/30 border border-transparent rounded-xl transition-all group">
                    <TrendingUp className="w-6 h-6 text-neutral-400 group-hover:text-[#00FF90]" />
                    <span className="text-xs text-neutral-400 group-hover:text-white">
                      Análises
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent documents */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-lg font-semibold">Documentos Recentes</h2>
              <Link
                href={ROUTES.ADMIN.DASHBOARD.DOCUMENTOS}
                className="text-sm text-[#00FF90] hover:underline flex items-center gap-1"
              >
                Ver todos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-neutral-500 border-b border-white/5">
                    <th className="px-6 py-4 font-medium">Documento</th>
                    <th className="px-6 py-4 font-medium">Tipo</th>
                    <th className="px-6 py-4 font-medium">Data</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentDocuments.map((doc, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white/5 rounded-lg">
                            <FileText className="w-5 h-5 text-neutral-400" />
                          </div>
                          <span className="font-medium">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs bg-white/10 px-2 py-1 rounded">
                          {doc.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-400">{doc.date}</td>
                      <td className="px-6 py-4">
                        {doc.status === "novo" ? (
                          <span className="text-xs text-[#00FF90] bg-[#00FF90]/10 px-2 py-1 rounded-full">
                            Novo
                          </span>
                        ) : (
                          <span className="text-xs text-neutral-500 bg-white/5 px-2 py-1 rounded-full">
                            Visualizado
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-neutral-400" />
                          </button>
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Download className="w-4 h-4 text-neutral-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
