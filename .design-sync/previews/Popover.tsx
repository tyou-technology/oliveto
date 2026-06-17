import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Label,
  Input,
} from "oliveto-contabilidade";
import { Surface } from "./_surface";

export function QuickEdit() {
  return (
    <Surface style={{ minHeight: 300 }}>
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="outline">Período</Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <div style={{ display: "grid", gap: 10 }}>
            <p style={{ margin: 0, fontWeight: 600 }}>Filtrar por data</p>
            <Label htmlFor="p-from">De</Label>
            <Input id="p-from" type="date" />
            <Label htmlFor="p-to">Até</Label>
            <Input id="p-to" type="date" />
          </div>
        </PopoverContent>
      </Popover>
    </Surface>
  );
}
