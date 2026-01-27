"use client";

import type React from "react";

import Link from "next/link";
import { Construction, Home, Hammer, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Header } from "./header";

const FEATURES_COMING = [
  "Calculadora Previdenciária Completa",
  "Portal do Cliente",
  "Agendamento Online",
  "Chat em Tempo Real",
];

export default function EmConstrucao() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(30);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      {/* Header simplificado */}
      <Header noLinks />

      {/* Conteúdo principal */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-20">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-12">
            {/* Ícone animado */}
            <div className="relative inline-flex mb-8">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Construction className="w-12 h-12 md:w-16 md:h-16 text-primary animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Hammer className="w-4 h-4 text-primary animate-bounce" />
              </div>
            </div>

            {/* Título */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Página em <span className="text-primary">Construção</span>
            </h1>
            <p className="text-white text-base md:text-lg max-w-lg mx-auto mb-8">
              Estamos trabalhando duro para trazer novidades incríveis para
              você. Em breve, esta página estará disponível com novos recursos.
            </p>

            {/* Barra de progresso */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-white flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Progresso do desenvolvimento
                </span>
                <span className="text-primary font-semibold">{progress}%</span>
              </div>
              <div className="h-3 bg-black rounded-full overflow-hidden border border-border/30">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Features que estão vindo
          <div className="bg-black border border-border/30 rounded-2xl p-6 md:p-8 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />O que está por
              vir
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FEATURES_COMING.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-black border border-border/20"
                >
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm text-white">{feature}</span>
                </div>
              ))}
            </div>
          </div> */}

          {/* Formulário de notificação
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 text-center">
            {!isSubscribed ? (
              <>
                <Bell className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Quer ser notificado?
                </h3>
                <p className="text-white text-sm mb-6 max-w-md mx-auto">
                  Deixe seu e-mail e avisaremos assim que esta página estiver
                  pronta.
                </p>
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-black border-border/30 rounded-full px-6 focus:outline-none focus:ring-primary"
                  />
                  <Button
                    type="submit"
                    className="bg-primary text-black hover:bg-primary/90 rounded-full px-6 cursor-pointer"
                  >
                    Me avise
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </>
            ) : (
              <div className="py-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Inscrição confirmada!
                </h3>
                <p className="text-white text-sm">
                  Você será notificado assim que a página estiver disponível.
                </p>
              </div>
            )}
          </div> */}

          {/* Botão voltar */}
          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="border-border/30 hover:border-primary hover:bg-primary hover:text-black rounded-full px-8 bg-transparent"
            >
              <Link href="/public">
                <Home className="w-4 h-4 mr-2" />
                Voltar ao início
              </Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer simplificado */}
      <footer className="border-t border-border/20 py-6 px-4 text-center">
        <p className="text-sm text-white">
          © {new Date().getFullYear()} Oliveto Contabilidade. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
}
