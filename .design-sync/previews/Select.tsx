import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "oliveto-contabilidade";
import { Surface } from "./_surface";

export function ServiceSelect() {
  return (
    <Surface style={{ minHeight: 360 }}>
      <Select defaultValue="pericia" defaultOpen>
        <SelectTrigger style={{ width: 280 }}>
          <SelectValue placeholder="Selecione um serviço" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Serviços</SelectLabel>
            <SelectItem value="pericia">Perícia Contábil</SelectItem>
            <SelectItem value="auditoria">Auditoria Independente</SelectItem>
            <SelectItem value="valuation">Valuation</SelectItem>
            <SelectItem value="tributaria">Recuperação Tributária</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Surface>
  );
}
