import * as React from "react";
import { SheetFooter, Button } from "oliveto-contabilidade";
import { Surface } from "./_surface";

// SheetFooter is a layout slot used at the bottom of a SheetContent — shown
// here with action buttons.
export function Footer() {
  return (
    <Surface>
      <div style={{ maxWidth: 380, border: "1px solid #27272a", borderRadius: 12 }}>
        <SheetFooter>
          <Button>Aplicar filtros</Button>
          <Button variant="outline">Limpar</Button>
        </SheetFooter>
      </div>
    </Surface>
  );
}
