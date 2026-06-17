import * as React from "react";
import { LoadMoreButton } from "oliveto-contabilidade";
import { Surface } from "./_surface";

export function States() {
  return (
    <Surface>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
        <LoadMoreButton text="Carregar mais artigos" onClick={() => {}} />
        <LoadMoreButton text="Carregando" onClick={() => {}} loading />
        <LoadMoreButton text="Sem mais resultados" onClick={() => {}} disabled />
      </div>
    </Surface>
  );
}
