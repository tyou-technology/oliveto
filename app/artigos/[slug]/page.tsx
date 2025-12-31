import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

// Dados mockados dos artigos
const articlesData: Record<
  string,
  {
    title: string
    author: string
    category: string
    content: {
      subtitle: string
      paragraphs: string[]
    }[]
  }
> = {
  "deducao-despesas-jcp-carga-tributaria": {
    title:
      "A DEDUÇÃO DAS DESPESAS A TÍTULO DE JUROS SOBRE O CAPITAL PRÓPRIO (JCP) É CRUCIAL PARA A DIMINUIÇÃO DA CARGA TRIBUTÁRIA.",
    author: "Augusto Favareto Paes",
    category: "Tributária",
    content: [
      {
        subtitle: "Principais Mudanças na Legislação (Lei 14.789/2023 e MP 1.303/2025)",
        paragraphs: [
          "Base de Cálculo Restrita: A principal mudança introduzida pela Lei nº 14.789/2023 (originada da MP 1.185/2023) e regulamentada por Instruções Normativas da Receita Federal, é a exclusão de certas contas do patrimônio líquido da base de cálculo do JCP. Valores provenientes de subvenções governamentais para investimento, mesmo que já capitalizados, não podem mais compor a base de cálculo para a remuneração do JCP. Isso restringe a capacidade das empresas de maximizar essa dedução fiscal.",
          "Aumento da Alíquota do IRRF: Uma mudança recente proposta pela Medida Provisória nº 1.303/2025 elevou a alíquota do Imposto de Renda Retido na Fonte (IRRF) sobre o JCP de 15% para 20%. Essa alteração impacta diretamente o valor líquido recebido pelos sócios ou acionistas.",
          "Limites Atuais: A dedutibilidade do JCP continua sujeita a limites específicos: o valor calculado não pode exceder 50% do lucro líquido do exercício antes de computar a despesa com juros, ou 50% dos lucros acumulados e reservas de lucros.",
        ],
      },
    ],
  },
  "agro-deducao-despesas": {
    title:
      "A DEDUÇÃO DAS DESPESAS A TÍTULO DE JUROS SOBRE O CAPITAL PRÓPRIO (JCP) É CRUCIAL PARA A DIMINUIÇÃO DA CARGA TRIBUTÁRIA.",
    author: "Augusto Favareto Paes",
    category: "Agro",
    content: [
      {
        subtitle: "Principais Mudanças na Legislação (Lei 14.789/2023 e MP 1.303/2025)",
        paragraphs: [
          "Base de Cálculo Restrita: A principal mudança introduzida pela Lei nº 14.789/2023 (originada da MP 1.185/2023) e regulamentada por Instruções Normativas da Receita Federal, é a exclusão de certas contas do patrimônio líquido da base de cálculo do JCP. Valores provenientes de subvenções governamentais para investimento, mesmo que já capitalizados, não podem mais compor a base de cálculo para a remuneração do JCP. Isso restringe a capacidade das empresas de maximizar essa dedução fiscal.",
          "Aumento da Alíquota do IRRF: Uma mudança recente proposta pela Medida Provisória nº 1.303/2025 elevou a alíquota do Imposto de Renda Retido na Fonte (IRRF) sobre o JCP de 15% para 20%. Essa alteração impacta diretamente o valor líquido recebido pelos sócios ou acionistas.",
          "Limites Atuais: A dedutibilidade do JCP continua sujeita a limites específicos: o valor calculado não pode exceder 50% do lucro líquido do exercício antes de computar a despesa com juros, ou 50% dos lucros acumulados e reservas de lucros.",
        ],
      },
    ],
  },
}

export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articlesData[slug] || articlesData["deducao-despesas-jcp-carga-tributaria"]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Green bar */}
      <div className="h-2 bg-primary" />

      {/* Article Header */}
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-5xl">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-1 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/artigos" className="hover:text-foreground transition-colors">
                  Artigo
                </Link>
              </li>
              <li>/</li>
            </ol>
          </nav>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6 max-w-3xl">{article.title}</h1>

          {/* Author */}
          <p className="text-sm text-muted-foreground">
            Por: <span className="text-primary">{article.author}</span>
          </p>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-white text-black py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-5xl">
          {article.content.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-lg font-semibold mb-6">{section.subtitle}</h2>
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-base leading-relaxed mb-6 text-gray-800">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          {/* Divider */}
          <div className="border-t border-gray-300 my-12" />

          {/* Back button */}
          <Link
            href="/artigos"
            className="inline-block text-sm font-medium text-black hover:text-gray-600 transition-colors"
          >
            VOLTAR
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
