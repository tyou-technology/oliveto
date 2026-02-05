"use client";

import type React from "react";

import { useState } from "react";
import { ArrowRight, FileText, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useCreateLead } from "@/features/leads/hooks";
import { LeadOrigin } from "@/features/leads/types";

export function NewsletterSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutateAsync: createLead, isPending } = useCreateLead();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createLead({
        name,
        email,
        phone,
        message: "Inscrição em Newsletter / Download E-book",
        origin: LeadOrigin.RICH_MATERIAL,
      });

      setIsSubmitted(true);
      toast.success("Inscrição realizada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao realizar inscrição. Tente novamente.");
    }
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative bg-gradient-to-br from-[#00FF90]/10 to-transparent border border-[#00FF90]/30 rounded-2xl p-8 md:p-12 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF90]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00FF90]/5 rounded-full blur-3xl" />

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#00FF90]/20 text-[#00FF90] text-sm px-3 py-1 rounded-full mb-4">
                <FileText className="w-4 h-4" />
                E-book Gratuito
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Guia Completo de{" "}
                <span className="text-[#00FF90]">Recuperação Tributária</span>
              </h2>

              <p className="text-gray-400 mb-6">
                Descubra como sua empresa pode recuperar impostos pagos
                indevidamente nos últimos 5 anos. Cadastre-se e receba nosso
                e-book exclusivo com um passo a passo completo.
              </p>

              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00FF90]" />
                  Análise de tributos pagos a maior
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00FF90]" />
                  Passo a passo para solicitar restituição
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00FF90]" />
                  Casos reais de recuperação
                </li>
              </ul>
            </div>

            {/* Form */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              {!isSubmitted ? (
                /* Security: maxLength limits prevent excessive payload/DoS attacks */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      required
                      maxLength={100}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF90]/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                      maxLength={100}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF90]/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(00) 00000-0000"
                      maxLength={20}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF90]/50 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#00FF90] text-black font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#00FF90]/90 transition-colors disabled:opacity-50"
                  >
                    {isPending ? (
                      "Enviando..."
                    ) : (
                      <>
                        Quero o E-book Gratuito
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Ao se cadastrar, você concorda com nossa política de
                    privacidade.
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#00FF90]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-[#00FF90]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Cadastro Realizado!
                  </h3>
                  <p className="text-gray-400">
                    Confira seu e-mail para acessar o e-book gratuito.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
