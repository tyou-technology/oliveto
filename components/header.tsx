import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header({ pathname = "/" }: { pathname?: string }) {
  return (
    <header className="flex items-center justify-between px-8 py-6 md:px-16">
      <Link href="/" className="text-xl font-bold tracking-wider">
        OLI<span className="font-light">V</span>ETO
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        <Link
          href="/sobre"
          className={`text-sm transition-colors ${
            pathname === "/sobre"
              ? "text-[#00FF90]"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Sobre
        </Link>
        <Link
          href="/servicos"
          className={`text-sm transition-colors ${
            pathname === "/servicos"
              ? "text-[#00FF90]"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Serviços
        </Link>
        <Link
          href="/artigos"
          className={`text-sm transition-colors ${
            pathname === "/artigos"
              ? "text-[#00FF90]"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Artigos
        </Link>
        <Link
          href="/contatos"
          className={`text-sm transition-colors ${
            pathname === "/contatos"
              ? "text-[#00FF90]"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Contatos
        </Link>
      </nav>

      <Button
        variant="outline"
        className="border-white text-white bg-transparent hover:bg-white hover:text-black text-sm px-6"
      >
        Login
      </Button>
    </header>
  );
}
