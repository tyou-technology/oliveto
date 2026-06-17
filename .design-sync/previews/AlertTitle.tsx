import * as React from "react";
import { Alert, AlertTitle, AlertDescription } from "oliveto-contabilidade";
import { Info } from "lucide-react";
import { Surface } from "./_surface";

// AlertTitle is the heading slot of an Alert — shown in context.
export function InAlert() {
  return (
    <Surface>
      <Alert>
        <Info />
        <AlertTitle>Prazo de entrega do laudo</AlertTitle>
        <AlertDescription>O laudo pericial será concluído em até 15 dias úteis.</AlertDescription>
      </Alert>
    </Surface>
  );
}
