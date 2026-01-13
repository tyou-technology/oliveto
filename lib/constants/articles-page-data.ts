import type { Article } from "../types/article";

// Real articles data - centralized repository for article previews
export const articlesPageData: Article[] = [
  {
    id: 1,
    slug: "reforma-tributaria-2026-iva-pratica",
    category: "Tributária.",
    title:
      "2026 na Reforma Tributária: o ano em que o IVA começa a aparecer na prática (mesmo antes de cobrar)",
    excerpt:
      "Muita gente ouviu que 2026 será um 'ano de teste' da Reforma Tributária e concluiu: 'então não muda nada'. Essa leitura é perigosa.",
    image: "/artigos/artigo1.jpg",
    author: "Augusto Favareto",
    publishDate: "09 de janeiro de 2026",
    readTime: "8 min",
  },
  {
    id: 2,
    slug: "documentos-fiscais-2026-ibs-cbs",
    category: "Tributária.",
    title:
      "Documentos fiscais em 2026: o que muda com IBS e CBS (e como evitar rejeições, retrabalho e sustos no faturamento)",
    excerpt:
      "Desde 1º de janeiro de 2026, a Reforma Tributária do Consumo entrou na sua fase mais 'pé no chão': a fase operacional.",
    image: "/artigos/artigo2.jpg",
    author: "Augusto Favareto",
    publishDate: "09 de janeiro de 2026",
    readTime: "10 min",
  },
  {
    id: 3,
    slug: "lucro-real-presumido-reforma-tributaria",
    category: "Tributária.",
    title:
      "Lucro Real ou Presumido na Reforma Tributária? O impacto das LCs 214/224 e Lei 15.270 na decisão",
    excerpt:
      "A escolha do regime tributário deixou de ser apenas uma conta de IRPJ/CSLL. Com as novas leis de 2025 e 2026, o cálculo agora precisa cruzar consumo, renda, dividendos e governança.",
    image: "/artigos/artigo3.jpg",
    author: "Augusto Favareto",
    publishDate: "09 de janeiro de 2026",
    readTime: "12 min",
  },
];
