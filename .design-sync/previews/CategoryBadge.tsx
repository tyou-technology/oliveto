import * as React from "react";
import { CategoryBadge } from "oliveto-contabilidade";
import { Surface } from "./_surface";

export function Colors() {
  return (
    <Surface>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <CategoryBadge category="Perícia" color="#00ff90" />
        <CategoryBadge category="Tributário" color="#00a5b4" />
        <CategoryBadge category="Auditoria" color="#c8a96e" />
        <CategoryBadge category="Valuation" color="#a78bfa" />
        <CategoryBadge category="Sem cor (padrão)" />
      </div>
    </Surface>
  );
}
