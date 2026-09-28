import { IMAGES } from "@/lib/constants/images";

export interface HeroSlide {
  category: string;
  title: string;
  description: string;
}

export const heroContent = {
  slides: [
    {
      category: "Geral",
      title: "Nenhum número sai daqui sem origem.",
      description:
        "Nem na perícia, nem na reforma. Cada projeção aponta a norma e o dado que a sustentam.",
    },
    {
      category: "Contabilidade",
      title: "Contabilidade que devolve decisão, não arquivo.",
      description:
        "Guia em dia é o mínimo. O que muda o seu resultado é o que vem antes dela.",
    },
    {
      category: "Contabilidade",
      title: "Sobre a reforma, a gente só afirma o que calculou.",
      description:
        "Estudo de impacto feito com o seu balancete, não com a média do seu setor.",
    },
    {
      category: "Perícia",
      title: "Número não se opina. Se prova.",
      description:
        "Perícia contábil, auditoria e inteligência tributária para quem precisa sustentar cada valor — diante da Receita, do banco ou do juiz.",
    },
    {
      category: "Perícia",
      title: "Quando o número precisa se sustentar.",
      description:
        "Perícia, auditoria e planejamento tributário para empresas, produtores rurais e advogados.",
    },
    {
      category: "Consultoria",
      title:
        "Reforma Tributária: A pergunta não é se muda. É quanto, quando e em qual das suas empresas.",
      description:
        "Estudo de impacto por CNPJ, com cenário de margem, preço e regime até o fim da transição.",
    },
    {
      category: "Consultoria",
      title:
        "Duas empresas do mesmo setor, na mesma rua, dão resultado oposto.",
      description:
        "É por isso que o estudo é do seu CNPJ, não do seu segmento.",
    },
    {
      category: "Consultoria",
      title: "Reforma tributária não se opina. Se calcula.",
      description:
        "Estudo de impacto com o seu balancete: quanto muda, em qual das suas empresas, e o que precisa ser decidido antes da virada.",
    },
  ] satisfies HeroSlide[],
  backgroundImage: IMAGES.BANNER_WORDS,
};
