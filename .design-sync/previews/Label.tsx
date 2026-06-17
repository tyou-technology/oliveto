import * as React from "react";
import { Label, Input } from "oliveto-contabilidade";
import { Surface } from "./_surface";

export function WithInput() {
  return (
    <Surface>
      <div style={{ display: "grid", gap: 8, maxWidth: 320 }}>
        <Label htmlFor="email">E-mail corporativo</Label>
        <Input id="email" type="email" placeholder="contato@empresa.com.br" />
      </div>
    </Surface>
  );
}
