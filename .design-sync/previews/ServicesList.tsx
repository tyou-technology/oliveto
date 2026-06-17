import * as React from "react";
import { ServicesList } from "oliveto-contabilidade";
import { Surface } from "./_surface";

export function Default() {
  return (
    <Surface>
      <div style={{ maxWidth: 360 }}>
        <ServicesList
          title="Perícia & Cálculos"
          services={[
            "Perícia Contábil Judicial",
            "Cálculos de Liquidação de Sentença",
            "Assistência Técnica",
            "Revisão de Cálculos",
            "Pareceres Técnicos",
          ]}
        />
      </div>
    </Surface>
  );
}
