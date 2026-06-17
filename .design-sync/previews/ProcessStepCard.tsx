import * as React from "react";
import { ProcessStepCard } from "oliveto-contabilidade";
import { FileSearch, Calculator, FileCheck } from "lucide-react";
import { Surface } from "./_surface";

const steps = [
  { icon: FileSearch, title: "Diagnóstico", description: "Analisamos os documentos e o objeto da perícia." },
  { icon: Calculator, title: "Apuração", description: "Realizamos os cálculos e levantamos as evidências." },
  { icon: FileCheck, title: "Laudo técnico", description: "Entregamos o parecer com fundamentação clara." },
];

export function Steps() {
  return (
    <Surface>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {steps.map((step, i) => (
          <ProcessStepCard key={step.title} step={step} index={i} />
        ))}
      </div>
    </Surface>
  );
}
