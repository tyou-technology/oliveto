import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { PageBackgroundWords } from "@/components/page-background-words";

export default function ServicosPage() {
  const periciaServices = [
    "Financiamentos imobiliários (Sistema Financeiro de Habitação - SFH / Financiamento através da carteira hipotecária)",
    "Financiamentos veiculares",
    "Cartão de Crédito",
    "Cédulas de Crédito Rural",
    "Cheque especial",
    "Leasing – Arrendamento mercantil",
    "Créditos rotativos em conta corrente/conta garantida",
    "Empréstimos para capital de giro e desconto de títulos",
    "Cédulas de crédito comercial e industrial",
    "Avaliação de empresas",
    "Dissolução de sociedades",
    "Lucros cessantes",
    "Penhora sobre faturamento",
    "Cálculos Trabalhistas",
    "Defesa em execução, embargos e busca e apreensão;",
  ];

  const contabilidadeServices = [
    "Contabilidade Integrada (todas as operações do negócio)",
    "Contabilidade Departamentalizada e por Filiais",
    "Orçamentos",
    "Avaliação de desempenho",
    "Contabilidade Societária",
    "Escrituração Contábil",
    "Escrituração Fiscal",
    "Rotinas Trabalhistas e Previdenciárias",
    "Assessoria contábil, fiscal e trabalhista",
    "Abertura, alterações, regularizações e baixas de empresas",
    "Consultoria Empresarial",
    "Elaboração de Planos Estratégicos e Operacionais, com acompanhamento e revisão",
    "Implantação ou adequação de controles e fluxo financeiro, de estoques e outros",
    "Implantação de controle patrimonial (ativo fixo)",
    "Reestruturação de empresas ou departamentos",
    "Valluation: definição do valor da empresa por métricas de mercado ou financeiras",
    "Estudos em: formação de preço, análise de investimentos, viabilidade, finanças e ponto de equilíbrio.",
  ];

  const auditoriaServices = [
    "Auditoria das demonstrações contábeis",
    "Auditoria interna (controles internos e processos)",
    "Due Diligence",
    "Auditoria trabalhista e previdenciária",
    "Auditoria de Gestão (desempenho)",
    "Auditoria operacional em áreas específicas",
  ];

  return (
    <main className="min-h-screen bg-secondary text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-black pt-24 pb-12 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            SERVIÇOS
          </h1>
        </div>
        <PageBackgroundWords />
      </section>

      {/* Services Grid */}
      <section className="bg-secondary container mx-auto px-6  py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Perícia */}
          <div>
            <div className="border border-muted-foreground/30 p-6 mb-6">
              <h2 className="text-xl font-bold text-primary text-center tracking-wider">
                PERÍCIA
              </h2>
            </div>
            <ul className="space-y-4">
              {periciaServices.map((service, index) => (
                <li key={index} className="text-sm text-white leading-relaxed">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contabilidade */}
          <div>
            <div className="border border-muted-foreground/30 p-6 mb-6">
              <h2 className="text-xl font-bold text-primary text-center tracking-wider">
                CONTABILIDADE
              </h2>
            </div>
            <ul className="space-y-4">
              {contabilidadeServices.map((service, index) => (
                <li key={index} className="text-sm text-white leading-relaxed">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Auditoria */}
          <div>
            <div className="border border-muted-foreground/30 p-6 mb-6">
              <h2 className="text-xl font-bold text-primary text-center tracking-wider">
                AUDITORIA
              </h2>
            </div>
            <ul className="space-y-4">
              {auditoriaServices.map((service, index) => (
                <li key={index} className="text-sm text-white leading-relaxed">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
