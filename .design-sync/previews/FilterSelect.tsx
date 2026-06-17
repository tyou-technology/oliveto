import * as React from "react";
import { FilterSelect } from "oliveto-contabilidade";
import { Surface } from "./_surface";

export function Default() {
  return (
    <Surface>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <FilterSelect options={["Todas as categorias", "Perícia", "Auditoria", "Tributário", "Valuation"]} />
        <FilterSelect options={["Mais recentes", "Mais antigos", "Mais lidos"]} />
      </div>
    </Surface>
  );
}
