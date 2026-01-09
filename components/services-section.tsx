import { services } from "@/lib/constants/services";
import { ServiceCard } from "@/components/molecules/service-card";

export function ServicesSection() {
  return (
    <section
      id="servicos"
      className="px-8 py-16 md:px-16 md:py-24 border-t border-gray-800 bg-secondary"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-gray-500 mb-8">Serviços.</p>

        <div className="grid md:grid-cols-3 gap-4">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
