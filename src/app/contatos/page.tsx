import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import { PageBackgroundWords } from "@/components/atoms/page-background-words";
import { ContactInfo } from "@/components/molecules/contact-info";
import { ContactForm } from "@/components/molecules/contact-form";
import { contactPageContent } from "@/lib/constants/contact-page";

export default function ContatosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-black pt-24 pb-12 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            {contactPageContent.pageTitle}
          </h1>
        </div>
        <PageBackgroundWords />
      </section>

      {/* Contact Info Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-6">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
