import {
  Bell,
  ClipboardCheck,
  FileText,
  FolderOpen,
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  Scale,
  Settings,
} from "lucide-react";
import { ROUTES } from "@/lib/config/routes";

export const navigationItems = [
  {
    icon: LayoutDashboard,
    label: "Visão Geral",
    href: ROUTES.ADMIN.DASHBOARD.HOME,
    active: true,
  },
  // {
  //   icon: FileText,
  //   label: "Documentos",
  //   href: ROUTES.ADMIN.DASHBOARD.DOCUMENTOS,
  // },
  // { icon: Scale, label: "Perícias", href: ROUTES.ADMIN.DASHBOARD.PERICIAS },
  // {
  //   icon: FolderOpen,
  //   label: "Contabilidade",
  //   href: ROUTES.ADMIN.DASHBOARD.CONTABILIDADE,
  // },
  // {
  //   icon: ClipboardCheck,
  //   label: "Auditorias",
  //   href: ROUTES.ADMIN.DASHBOARD.AUDITORIAS,
  // },
  { icon: Newspaper, label: "Artigos", href: ROUTES.ADMIN.DASHBOARD.ARTIGOS },
  {
    icon: MessageSquare,
    label: "Contatos",
    href: ROUTES.ADMIN.DASHBOARD.CONTATOS,
  },
  // {
  //   icon: MessageSquare,
  //   label: "Mensagens",
  //   href: ROUTES.ADMIN.DASHBOARD.MENSAGENS,
  //   badge: 3,
  // },
  // {
  //   icon: Bell,
  //   label: "Notificações",
  //   href: ROUTES.ADMIN.DASHBOARD.NOTIFICACOES,
  //   badge: 5,
  // },
  // {
  //   icon: Settings,
  //   label: "Configurações",
  //   href: ROUTES.ADMIN.DASHBOARD.CONFIGURACOES,
  // },
];

export const recentDocuments = [
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

export const activeProcesses = [
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

export const upcomingTasks = [
  { title: "Reunião de alinhamento", date: "22 Dez", time: "14:00" },
  { title: "Entrega de documentos fiscais", date: "28 Dez", time: "18:00" },
  { title: "Prazo IRPJ", date: "31 Dez", time: "23:59" },
];
