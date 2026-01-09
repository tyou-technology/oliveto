import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageBackgroundWords } from "@/components/page-background-words";
import { ServicesList } from "@/components/molecules/services-list";
import {
  servicosPageContent,
  serviceCategories,
} from "@/lib/constants/servicos-page";

export default function ServicosPage() {
  return (
    <main className="min-h-screen bg-secondary text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-black pt-24 pb-12 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            {servicosPageContent.pageTitle}
          </h1>
        </div>
        <PageBackgroundWords />
      </section>

      {/* Services Grid */}
      <section className="bg-secondary container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {serviceCategories.map((category) => (
            <ServicesList
              key={category.title}
              title={category.title}
              services={category.services}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
