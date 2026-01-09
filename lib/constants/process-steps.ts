import {
  MessageSquare,
  FileSearch,
  FileText,
  Settings,
  CheckCircle,
} from "lucide-react";
import type { ProcessStep } from "../types/process-step";

export const processSteps: ProcessStep[] = [
  {
    icon: MessageSquare,
    title: "Primeiro Contato",
    description:
      "Entre em contato conosco por telefone, WhatsApp ou formulário. Nossa equipe está pronta para ouvir suas necessidades.",
  },
  {
    icon: FileSearch,
    title: "Análise do Caso",
    description:
      "Realizamos uma análise detalhada da sua situação para entender exatamente o que você precisa.",
  },
  {
    icon: FileText,
    title: "Proposta Personalizada",
    description:
      "Elaboramos uma proposta sob medida, com escopo, prazos e investimento claramente definidos.",
  },
  {
    icon: Settings,
    title: "Execução",
    description:
      "Nossa equipe especializada executa o trabalho com máxima qualidade e mantém você informado em cada etapa.",
  },
  {
    icon: CheckCircle,
    title: "Entrega e Suporte",
    description:
      "Entregamos os resultados e permanecemos disponíveis para esclarecer dúvidas e oferecer suporte contínuo.",
  },
];
