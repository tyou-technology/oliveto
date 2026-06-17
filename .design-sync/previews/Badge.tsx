import * as React from "react";
import { Badge } from "oliveto-contabilidade";
import { Surface } from "./_surface";

export function Variants() {
  return (
    <Surface>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <Badge>Publicado</Badge>
        <Badge variant="secondary">Rascunho</Badge>
        <Badge variant="outline">Arquivado</Badge>
        <Badge variant="destructive">Cancelado</Badge>
      </div>
    </Surface>
  );
}
