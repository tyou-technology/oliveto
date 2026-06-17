import * as React from "react";
import { Button } from "oliveto-contabilidade";
import { ArrowUpRight } from "lucide-react";
import { Surface } from "./_surface";

export function Variants() {
  return (
    <Surface>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <Button>Falar com perito</Button>
        <Button variant="secondary">Secundário</Button>
        <Button variant="outline">Saiba mais</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Ver artigos</Button>
        <Button variant="destructive">Excluir</Button>
      </div>
    </Surface>
  );
}

export function Sizes() {
  return (
    <Surface>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <Button size="sm">Pequeno</Button>
        <Button size="default">Padrão</Button>
        <Button size="lg">Grande</Button>
        <Button size="icon" aria-label="Ação">
          <ArrowUpRight />
        </Button>
      </div>
    </Surface>
  );
}

export function States() {
  return (
    <Surface>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <Button>Ativo</Button>
        <Button disabled>Desabilitado</Button>
        <Button loading>Enviando</Button>
        <Button>
          Solicitar orçamento <ArrowUpRight />
        </Button>
      </div>
    </Surface>
  );
}
