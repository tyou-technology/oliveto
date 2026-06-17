import * as React from "react";
import { Separator } from "oliveto-contabilidade";
import { Surface } from "./_surface";

export function Horizontal() {
  return (
    <Surface>
      <div style={{ maxWidth: 360 }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Perícia Contábil</p>
        <p style={{ margin: "4px 0 0", color: "#a1a1aa", fontSize: 13 }}>
          Laudos técnicos e cálculos judiciais
        </p>
        <Separator className="my-4" />
        <p style={{ margin: 0, fontWeight: 600 }}>Auditoria</p>
        <p style={{ margin: "4px 0 0", color: "#a1a1aa", fontSize: 13 }}>
          Revisão independente de demonstrações
        </p>
      </div>
    </Surface>
  );
}

export function Vertical() {
  return (
    <Surface>
      <div style={{ display: "flex", alignItems: "center", gap: 16, height: 24 }}>
        <span>Início</span>
        <Separator orientation="vertical" />
        <span>Serviços</span>
        <Separator orientation="vertical" />
        <span>Artigos</span>
      </div>
    </Surface>
  );
}
