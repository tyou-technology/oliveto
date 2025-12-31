import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section id="sobre" className="px-8 py-16 md:px-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <p className="text-[#00ff00] text-lg md:text-xl leading-relaxed mb-6">
            Somos uma contabilidade especializada em perícia e auditoria contábil, com um olhar atual, técnico e
            estratégico.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Atuamos com profundidade e clareza, oferecendo soluções tecnológicas e assertivas que dialogam com o
            presente e preparam nossos clientes para o futuro.
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-4">Sobre.</p>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            A história da Oliveto começa em 2022, quando Augusto Favareto e Murilo de Oliveira decidiram transformar sua
            amizade e a paixão pela contabilidade em uma missão maior: ajudar pessoas a resolver questões judiciais com
            perícia, confiança e clareza, além de levar uma contabilidade mais atual, direta e alinhada à realidade de
            cada cliente.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-8">
            Desde o início, a proposta foi unir inovação e atuação individualizada para diferentes perfis de empresários
            e escritórios, integrando três pilares: Perícia, Contabilidade e Auditoria.
          </p>
          <Button
            variant="outline"
            className="border-white text-white bg-transparent hover:bg-white hover:text-black text-sm"
          >
            Conheça +
          </Button>
        </div>
      </div>
    </section>
  )
}
