"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArrowRight, Loader2 } from "lucide-react";
import { PageBackgroundWords } from "@/components/page-background-words";
import { useState } from "react";

const COMPANY_WHATSAPP = "5543991231726";

export default function ContatosPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cidade: "",
    telefone: "",
    mensagem: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const message = encodeURIComponent(
      `*Nova mensagem do site - Oliveto*\n\n` +
        `*Nome:* ${formData.nome}\n` +
        `*Email:* ${formData.email}\n` +
        `*Cidade:* ${formData.cidade}\n` +
        `*Telefone:* ${formData.telefone}\n\n` +
        `*Mensagem:*\n${formData.mensagem}`
    );

    const whatsappUrl = `https://wa.me/${COMPANY_WHATSAPP}?text=${message}`;

    // Simulate a small delay for better UX
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setLoading(false);
      setFormData({
        nome: "",
        email: "",
        cidade: "",
        telefone: "",
        mensagem: "",
      });
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-black pt-24 pb-12 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            CONTATOS
          </h1>
        </div>
        <PageBackgroundWords />
      </section>

      {/* Contact Info Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-border">
            {/* Telefone */}
            <div>
              <p className="text-muted-foreground text-sm mb-4">Telefone.</p>
              <a
                href={`tel:+${COMPANY_WHATSAPP}`}
                className="inline-block border border-primary px-6 py-3 text-primary hover:bg-primary hover:text-black transition-colors"
                target="_blank"
              >
                +55 (43) 99123.1726
              </a>
            </div>

            {/* Escritório */}
            <div>
              <p className="text-muted-foreground text-sm mb-4">Escritório.</p>
              <p className="text-white">Av, Madre Leônia Milito nº1500</p>
              <p className="text-white">Sala 1311, Atsushi Yoshii Tower</p>
              <p className="text-white">Londrina - Paraná</p>
            </div>

            {/* Email e Horário */}
            <div>
              <p className="text-white">contato@</p>
              <p className="text-white">olivetocontabilidade.com</p>
              <p className="text-white mt-4">Seg - Sex. 8h Às 19h</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="pt-12">
            <p className="text-white font-medium mb-1">Escreva sua mensagem,</p>
            <p className="text-white mb-8">
              em breve nossa equipe entrará em contato com você.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="nome."
                  required
                  className="w-full bg-[#111] border border-border px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email."
                  required
                  className="w-full bg-[#111] border border-border px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  placeholder="cidade."
                  className="w-full bg-[#111] border border-border px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="telefone."
                  required
                  className="w-full bg-[#111] border border-border px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                placeholder="mensagem."
                required
                rows={6}
                className="w-full bg-[#111] border border-border px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-8 border border-border px-6 py-3 text-white hover:border-primary hover:text-primary transition-colors group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="font-medium flex items-center gap-2">
                    ENVIANDO... <Loader2 className="w-4 h-4 animate-spin" />
                  </span>
                ) : (
                  <>
                    <span className="font-medium">ENVIAR.</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
