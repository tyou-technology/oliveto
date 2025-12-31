"use client"

import { MessageSquare, FileSearch, FileText, Settings, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    title: "Primeiro Contato",
    description:
      "Entre em contato conosco por telefone, WhatsApp ou formulário. Nossa equipe está pronta para ouvir suas necessidades.",
  },
  {
    icon: FileSearch,
    title: "Análise do Caso",
    description: "Realizamos uma análise detalhada da sua situação para entender exatamente o que você precisa.",
  },
  {
    icon: FileText,
    title: "Proposta Personalizada",
    description: "Elaboramos uma proposta sob medida, com escopo, prazos e investimento claramente definidos.",
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
]

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#00ff00] text-sm tracking-wider uppercase">Processo</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Como <span className="text-[#00ff00]">Funciona</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Um processo simples e transparente para garantir os melhores resultados para você.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00ff00]/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#00ff00] text-black rounded-full flex items-center justify-center font-bold text-sm z-10">
                  {index + 1}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-full hover:border-[#00ff00]/50 transition-all duration-300 group-hover:transform group-hover:-translate-y-1">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-[#00ff00]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#00ff00]/20 transition-colors">
                    <step.icon className="w-7 h-7 text-[#00ff00]" />
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
