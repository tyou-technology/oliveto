interface ServicesListProps {
  title: string;
  services: string[];
}

export function ServicesList({ title, services }: ServicesListProps) {
  return (
    <div>
      <div className="border border-muted-foreground/30 p-6 mb-6">
        <h2 className="text-xl font-bold text-primary text-center tracking-wider">
          {title}
        </h2>
      </div>
      <ul className="space-y-4">
        {services.map((service, index) => (
          <li key={index} className="text-sm text-white leading-relaxed">
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
}
