import * as React from "react";
import { StepNumber } from "oliveto-contabilidade";
import { Surface } from "./_surface";

// StepNumber is absolutely positioned (-top-3 -left-3) — it must sit on a
// relatively-positioned card, the way it's used in the "how it works" steps.
function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div
      style={{
        position: "relative",
        border: "1px solid #27272a",
        borderRadius: 12,
        padding: 24,
        maxWidth: 240,
      }}
    >
      <StepNumber number={n} />
      <h4 style={{ margin: "0 0 6px", fontWeight: 600 }}>{title}</h4>
      <p style={{ margin: 0, color: "#a1a1aa", fontSize: 13 }}>{body}</p>
    </div>
  );
}

export function Steps() {
  return (
    <Surface>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <Step n={1} title="Diagnóstico" body="Entendemos o caso e os documentos." />
        <Step n={2} title="Análise" body="Apuramos os cálculos e evidências." />
        <Step n={3} title="Laudo" body="Entregamos o parecer técnico." />
      </div>
    </Surface>
  );
}
