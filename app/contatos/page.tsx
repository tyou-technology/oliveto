import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"

export default function ContatosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#0a0a0a] pt-24 pb-12 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">CONTATOS</h1>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <svg viewBox="0 0 400 200" className="w-full h-full">
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-none stroke-primary text-[120px] font-bold"
              strokeWidth="1"
            >
              OLIVETO
            </text>
          </svg>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-border">
            {/* Telefone */}
            <div>
              <p className="text-muted-foreground text-sm mb-4">Telefone.</p>
              <a
                href="tel:+5543991231726"
                className="inline-block border border-primary px-6 py-3 text-primary hover:bg-primary hover:text-background transition-colors"
              >
                +55 (43) 99123.1726
              </a>
            </div>

            {/* Escritório */}
            <div>
              <p className="text-muted-foreground text-sm mb-4">Escritório.</p>
              <p className="text-foreground">Av, Madre Leônia Milito nº1500</p>
              <p className="text-foreground">Sala 1311, Atsushi Yoshii Tower</p>
              <p className="text-foreground">Londrina - Paraná</p>
            </div>

            {/* Email e Horário */}
            <div>
              <p className="text-foreground">contato@</p>
              <p className="text-foreground">olivetocontabilidade.com</p>
              <p className="text-foreground mt-4">Seg - Sex. 8h Às 19h</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="pt-12">
            <p className="text-foreground font-medium mb-1">Escreva sua mensagem,</p>
            <p className="text-muted-foreground mb-8">em breve nossa equipe entrará em contato com você.</p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="nome."
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  type="email"
                  placeholder="email."
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="cidade."
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  type="tel"
                  placeholder="telefone."
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <textarea
                placeholder="mensagem."
                rows={6}
                className="w-full bg-transparent border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
              <button
                type="submit"
                className="flex items-center gap-8 border border-border px-6 py-3 text-foreground hover:border-primary hover:text-primary transition-colors group"
              >
                <span className="font-medium">ENVIAR.</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
