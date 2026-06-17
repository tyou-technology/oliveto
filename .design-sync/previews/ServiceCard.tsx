import * as React from "react";
import { ServiceCard } from "oliveto-contabilidade";
import { Surface } from "./_surface";

const services = [
  { title: "Perícia Contábil", href: "/servicos/pericia-contabil" },
  { title: "Auditoria Independente", href: "/servicos/auditoria" },
  { title: "Valuation", href: "/servicos/valuation" },
  { title: "Recuperação Tributária", href: "/servicos/recuperacao-tributaria" },
];

export function Grid() {
  return (
    <Surface>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {services.map((s) => (
          <ServiceCard key={s.href} service={s} />
        ))}
      </div>
    </Surface>
  );
}

export function Single() {
  return (
    <Surface>
      <div style={{ display: "grid", gridTemplateColumns: "260px" }}>
        <ServiceCard service={services[0]} />
      </div>
    </Surface>
  );
}
