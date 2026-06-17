import * as React from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Button,
} from "oliveto-contabilidade";
import { Info } from "lucide-react";
import { Surface } from "./_surface";

export function OnButton() {
  return (
    <Surface style={{ minHeight: 200, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: 80 }}>
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Mais informações">
              <Info />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Cálculo conforme a tabela de honorários periciais</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Surface>
  );
}
