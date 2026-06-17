import * as React from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "oliveto-contabilidade";
import { Surface } from "./_surface";

// TableHead is a column header cell (<th>) — shown inside a table header row.
export function ColumnHeaders() {
  return (
    <Surface>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serviço</TableHead>
            <TableHead>Prazo</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Perícia Contábil</TableCell>
            <TableCell>15 dias</TableCell>
            <TableCell className="text-right">R$ 18.000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Surface>
  );
}
