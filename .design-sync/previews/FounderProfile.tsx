import * as React from "react";
import { FounderProfile } from "oliveto-contabilidade";
import { Surface } from "./_surface";

const founder = {
  name: "Augusto Favareto",
  role: "Perito Contábil · Sócio-fundador",
  education: [
    "Bacharel em Ciências Contábeis — UEL",
    "Pós-graduação em Perícia e Auditoria",
    "Especialização em Valuation",
  ],
  expertise:
    "Atuação em perícias judiciais, cálculos de liquidação de sentença e recuperação tributária para empresas e escritórios de advocacia.",
};

export function Default() {
  return (
    <Surface>
      <div style={{ maxWidth: 420 }}>
        <FounderProfile founder={founder} />
      </div>
    </Surface>
  );
}
