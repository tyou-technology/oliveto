import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageBackgroundWords } from "@/components/page-background-words";

const artigos = [
  {
    id: 1,
    slug: "agro-deducao-despesas",
    categoria: "Agro.",
    titulo:
      "A dedução das despesas a título de Juros sobre o Capital Próprio (JCP) é crucial para a diminuição da carga tributária...",
    imagem: "/business-meeting-office.png",
  },
  {
    id: 2,
    slug: "deducao-despesas-jcp-carga-tributaria",
    categoria: "Tributária.",
    titulo:
      "A dedução das despesas a título de Juros sobre o Capital Próprio (JCP) é crucial para a diminuição da carga tributária...",
    imagem: "/man-working-laptop-coffee.jpg",
  },
  {
    id: 3,
    slug: "brasil-deducao-despesas",
    categoria: "Brasil.",
    titulo:
      "A dedução das despesas a título de Juros sobre o Capital Próprio (JCP) é crucial para a diminuição da carga tributária...",
    imagem: "/barista-coffee-shop.jpg",
  },
  {
    id: 4,
    slug: "politica-deducao-despesas",
    categoria: "Política.",
    titulo:
      "A dedução das despesas a título de Juros sobre o Capital Próprio (JCP) é crucial para a diminuição da carga tributária...",
    imagem: "/modern-architecture-building.png",
  },
  {
    id: 5,
    slug: "londrina-deducao-despesas",
    categoria: "Londrina.",
    titulo:
      "A dedução das despesas a título de Juros sobre o Capital Próprio (JCP) é crucial para a diminuição da carga tributária...",
    imagem: "/photographer-camera.jpg",
  },
  {
    id: 6,
    slug: "agro-deducao-despesas-2",
    categoria: "Agro.",
    titulo:
      "A dedução das despesas a título de Juros sobre o Capital Próprio (JCP) é crucial para a diminuição da carga tributária...",
    imagem: "/person-working-kitchen-food.jpg",
  },
];

export default function ArtigosPage() {
  return (
    <main className="min-h-screen bg-secondary text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-primary pt-24 pb-12 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-black">ARTIGOS</h1>
        </div>
        <PageBackgroundWords />
      </section>

      {/* Filters */}
      <section className="container mx-auto px-6 py-8 text-white">
        <div className="flex flex-wrap items-center gap-4 pb-8 border-b border-muted">
          {/* Year Filter */}
          <div className="relative">
            <select className="appearance-none bg-background border border-muted rounded px-4 py-2 pr-10 text-sm cursor-pointer hover:border-primary transition-colors">
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select className="appearance-none bg-background border border-muted rounded px-4 py-2 pr-10 text-sm cursor-pointer hover:border-primary transition-colors">
              <option>CATEGORIA.</option>
              <option>Agro.</option>
              <option>Tributária.</option>
              <option>Brasil.</option>
              <option>Política.</option>
              <option>Londrina.</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
          </div>

          <span className="text-sm text-muted-foreground ml-auto">
            32 ARTIGOS DISPONÍVEIS
          </span>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
          {artigos.map((artigo) => (
            <Link href={`/artigos/${artigo.slug}`} key={artigo.id}>
              <article className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden rounded mb-4">
                  <Image
                    src={artigo.imagem || "/placeholder.svg"}
                    alt={artigo.titulo}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="text-primary text-sm font-medium">
                  {artigo.categoria}
                </span>
                <p className="text-foreground text-sm text-white mt-2 leading-relaxed">
                  {artigo.titulo}
                </p>
              </article>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="border-t border-muted pt-8">
          <button className="text-sm font-medium hover:text-primary transition-colors">
            CARREGAR MAIS ARTIGOS.
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
