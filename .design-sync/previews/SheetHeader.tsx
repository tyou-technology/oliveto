import * as React from "react";
import { SheetHeader } from "oliveto-contabilidade";
import { Surface } from "./_surface";

// SheetHeader is a layout slot (a styled flex container) used at the top of a
// SheetContent — shown here with plain heading/description children.
export function Header() {
  return (
    <Surface>
      <div style={{ maxWidth: 380, border: "1px solid #27272a", borderRadius: 12 }}>
        <SheetHeader>
          <h3 style={{ margin: 0, fontWeight: 600, fontSize: 18 }}>Filtrar leads</h3>
          <p style={{ margin: 0, color: "#a1a1aa", fontSize: 13 }}>
            Refine a lista por status, serviço e período.
          </p>
        </SheetHeader>
      </div>
    </Surface>
  );
}
