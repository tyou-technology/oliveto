import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { StatsSection } from "@/components/stats-section";
import { CalculatorBanner } from "@/components/calculator-banner";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { ServicesSection } from "@/components/services-section";
import { ArticlesCarousel } from "@/components/articles-carousel";
import { FaqSection } from "@/components/faq-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { PartnersSection } from "@/components/partners-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />
      <HeroSection />
      <AboutSection />
      {/* <StatsSection /> */}
      {/* <CalculatorBanner /> */}
      <HowItWorksSection />
      <ServicesSection />
      <ArticlesCarousel />
      {/* <FaqSection /> */}
      <TestimonialsSection />
      {/* <PartnersSection /> */}
      {/* <NewsletterSection /> */}
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
