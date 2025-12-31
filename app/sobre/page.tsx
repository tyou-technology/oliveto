import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header pathname="/sobre" />

      <main>
        {/* Hero Section */}
        <section className="relative px-8 py-16 md:px-16 md:py-24">
          {/* Background decorative text */}
          <div className="absolute inset-0 flex items-start justify-end overflow-hidden pointer-events-none opacity-10">
            <span className="text-[15vw] font-bold tracking-wider text-transparent stroke-text">OLIVETO</span>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-[#00ff00] mb-16">SOBRE.</h1>

            <div className="grid md:grid-cols-2 gap-16">
              {/* Left column - History */}
              <div className="space-y-6">
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  A história da Oliveto começa em 2022, quando Augusto Favareto e Murilo de Oliveira decidiram
                  transformar sua amizade e a paixão pela contabilidade em uma missão maior: ajudar pessoas a resolver
                  questões judiciais com perícia, confiança e clareza, além de levar uma contabilidade mais atual,
                  direta e alinhada à realidade de cada cliente.
                </p>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Desde o início, a proposta foi unir inovação e atuação individualizada para diferentes perfis de
                  empresários e escritórios, integrando três pilares: Perícia, Contabilidade e Auditoria.
                </p>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Unidos por uma visão compartilhada de fazer a diferença, Augusto e Murilo perceberam que seu
                  conhecimento poderia ser um verdadeiro divisor de águas para quem enfrenta desafios no campo judicial
                  e empresarial. Com o desejo de descomplicar as questões financeiras de advogados, empresas e
                  indivíduos, criaram uma empresa que alia excelência técnica a um atendimento humanizado e acessível.
                </p>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Hoje, a Oliveto é mais do que uma empresa de perícia, contabilidade e auditoria. É o reflexo de uma
                  amizade construída sobre valores sólidos, de uma paixão pelo conhecimento e de um propósito claro:
                  Simplificar o complexo, apoiar clientes em momentos cruciais e provar que, com dedicação e método, é
                  possível alcançar resultados extraordinários.
                </p>
              </div>

              {/* Right column - Manifesto */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#00ff00] mb-6">MANIFESTO.</h2>
                <div className="space-y-4 text-sm md:text-base text-gray-300 leading-relaxed">
                  <p>
                    Na OLIVETO, unimos conhecimento técnico e visão estratégica para oferecer serviços de perícia
                    contábil e auditoria com excelência, clareza e responsabilidade.
                  </p>
                  <p>
                    Nascemos do desejo de fazer diferente, de sermos uma contabilidade que fala a língua das pessoas,
                    que entende as dores dos negócios e entrega soluções com propósito.
                  </p>
                  <p>
                    Mais do que fechar balanços ou calcular tributos, estamos aqui para ajudar empresas e profissionais
                    a enxergar com mais nitidez, agir com mais confiança e crescer com mais consciência.
                  </p>
                  <p>Somos atuais, com muita experiência.</p>
                  <p>Somos técnicos, mas acessíveis. Somos contadores do presente com foco no futuro.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="px-8 py-16 md:px-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Founders Image */}
              <div className="relative aspect-[3/4] bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
                <Image
                  src="/two-professional-men-in-suits-business-partners-ac.jpg"
                  alt="Augusto Favareto e Murilo de Oliveira - Sócios fundadores da Oliveto"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Founders Info */}
              <div className="space-y-12">
                {/* Augusto */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#00ff00] mb-2">Augusto Favareto</h3>
                  <p className="text-sm text-gray-400 mb-4">Sócio-fundador | Perito Contábil e Consultor Tributário</p>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Formação e especializações</p>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>Bacharel em Ciências Contábeis – FEMA</li>
                        <li>Especialização em Perícia Contábil e Auditoria – UEL</li>
                        <li>Especialista em Perícia Bancária – IBCAPPA</li>
                        <li>Especialista em Perícia Previdenciária – IBCAPPA</li>
                        <li>Especialista em Contabilidade, Compliance e Direito Tributário – BSSP</li>
                        <li>Recuperação de créditos tributários e previdenciários e Planejamento Tributário – BSSP</li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-2">Atuação:</p>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Laudos, cálculos e pareceres com rastreabilidade e linguagem compreensível. Planejamento
                        tributário e recuperação de créditos (federais, previdenciários e indiretos). Organização
                        contábil gerencial e suporte a decisões (preço, custos, caixa e tributos)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Murilo */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#00ff00] mb-2">Murilo de Oliveira</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Sócio-fundador | Perito Contábil e Especialista em Gestão Rural
                  </p>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Formação e especializações</p>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>Bacharel em Ciências Contábeis – UEL</li>
                        <li>Pós-graduação em Perícia Contábil e Auditoria – UEL</li>
                        <li>Especialista em Perícia Bancária – IBCAPPA</li>
                        <li>Especialista em Perícia Financeira – IBCAPPA</li>
                        <li>MBA em Contabilidade Rural – UniFil</li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-2">Atuação:</p>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Perícia contábil - cálculos, laudos e esclarecimentos técnicos ao Judiciário. Revisão de
                        contratos, perícia bancária e financeira. Contabilidade gerencial com foco em governança,
                        conformidade e eficiência. Gestão financeira para agronegócio e negócios intensivos em capital.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
