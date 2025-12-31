import { ArrowUpRight } from "lucide-react"

const services = [
  { title: "PERÍCIA", href: "#pericia" },
  { title: "CONTABILIDADE", href: "#contabilidade" },
  { title: "AUDITORIA", href: "#auditoria" },
]

export function ServicesSection() {
  return (
    <section id="servicos" className="px-8 py-16 md:px-16 md:py-24 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-gray-500 mb-8">Serviços.</p>

        <div className="grid md:grid-cols-3 gap-4">
          {services.map((service) => (
            <a
              key={service.title}
              href={service.href}
              className="group relative border border-gray-700 p-8 py-16 hover:border-[#00ff00] transition-colors"
            >
              <h3 className="text-lg font-medium tracking-wider text-center">{service.title}</h3>
              <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-[#00ff00] flex items-center justify-center group-hover:bg-[#00ff00] transition-colors">
                <ArrowUpRight className="w-4 h-4 text-[#00ff00] group-hover:text-black" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
