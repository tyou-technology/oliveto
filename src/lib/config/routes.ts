export const ROUTES = {
  PUBLIC: {
    HOME: "/",
    SOBRE: "/sobre",
    SERVICOS: "/servicos",
    ARTIGOS: "/artigos",
    CONTATOS: "/contatos",
    CALCULADORA: "/calculadora",
  },
  HEADER: [
    { href: "/sobre", label: "Sobre" },
    { href: "/servicos", label: "Serviços" },
    { href: "/artigos", label: "Artigos" },
    { href: "/contatos", label: "Contatos" },
],
  ADMIN: {
    LOGIN: "/admin/login",
    DASHBOARD: {
      HOME: "/admin/dashboard",
      DOCUMENTOS: "/admin/dashboard/documentos",
      PERICIAS: "/admin/dashboard/pericias",
      CONTABILIDADE: "/admin/dashboard/contabilidade",
      AUDITORIAS: "/admin/dashboard/auditorias",
      ARTIGOS: "/admin/dashboard/artigos",
      MENSAGENS: "/admin/dashboard/mensagens",
      NOTIFICACOES: "/admin/dashboard/notificacoes",
      CONFIGURACOES: "/admin/dashboard/configuracoes",
      PROCESSOS: "/admin/dashboard/processos",
    },
  },
} as const;
