"use client";

import type React from "react";

import Link from "next/link";
import { Home, ArrowLeft, Search, MessageCircle } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { useMemo, useState } from "react";
import { Header } from "@/components/organisms/header";
import { useArticles } from "@/features/articles/hooks/useArticles";
import { env } from "@/lib/env";
import {ROUTES} from "@/lib/config/routes";

const WHATSAPP_NUMBER = "5543991231726";
const WHATSAPP_MESSAGE =
  "Olá! Estou tentando acessar uma página no site da Oliveto e preciso de ajuda.";

const QUICK_LINKS = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Artigos", href: "/artigos" },
  { label: "Contatos", href: "/contatos" },
];

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");
  const { totalElements } = useArticles( 1, 1, true);

  const quickLinks = useMemo(() => {
    if (totalElements > 0) return QUICK_LINKS;
    return QUICK_LINKS.filter((link) => link.label !== "Artigos");
  }, [totalElements]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/artigos?search=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        WHATSAPP_MESSAGE
      )}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      {/* Header simplificado */}
      <Header noLinks />

      {/* Conteúdo principal */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-20">
        <div className="max-w-2xl w-full text-center">
          {/* Número 404 estilizado */}
          <div className="relative mb-8">
            <h1 className="text-[120px] md:text-[180px] lg:text-[220px] font-bold leading-none text-transparent bg-clip-text bg-primary select-none">
              404
            </h1>
          </div>

          {/* Mensagem */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
            Página não encontrada
          </h2>
          <p className="text-white text-base md:text-lg mb-8 max-w-md mx-auto">
            Ops! Parece que a página que você está procurando foi movida,
            removida ou nunca existiu.
          </p>

          {/* Links rápidos */}
          <div className="mb-8">
            <p className="text-sm text-white mb-4">Links rápidos:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-full border border-border/30 text-sm text-white hover:border-primary hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-primary text-black hover:bg-primary/90 rounded-full px-8"
            >
              <Link href={ROUTES.PUBLIC.HOME}>
                <Home className="w-4 h-4 mr-2" />
                Voltar ao início
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-border/30 hover:border-primary hover:text-black hover:bg-primary rounded-full px-8 bg-transparent cursor-pointer"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Página anterior
            </Button>
            <Button
              variant="outline"
              className="border-border/30 hover:border-primary hover:text-black hover:bg-primary rounded-full px-8 bg-transparent cursor-pointer"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Preciso de ajuda
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
