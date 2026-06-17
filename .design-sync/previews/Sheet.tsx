import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  Button,
  Input,
  Label,
} from "oliveto-contabilidade";
import { Surface } from "./_surface";

export function FilterPanel() {
  return (
    <Surface style={{ minHeight: 420, position: "relative" }}>
      <Sheet defaultOpen modal={false}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Filtrar leads</SheetTitle>
            <SheetDescription>
              Refine a lista por status, serviço e período.
            </SheetDescription>
          </SheetHeader>
          <div style={{ display: "grid", gap: 12, padding: "0 16px" }}>
            <Label htmlFor="s-serv">Serviço</Label>
            <Input id="s-serv" placeholder="Perícia, Auditoria…" />
          </div>
          <SheetFooter>
            <Button>Aplicar filtros</Button>
            <Button variant="outline">Limpar</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Surface>
  );
}
