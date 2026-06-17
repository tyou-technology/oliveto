import * as React from "react";
import { Table, TableCaption, TableBody, TableRow, TableCell } from "oliveto-contabilidade";
import { Surface } from "./_surface";

// TableCaption is the table's caption line — shown beneath a small table.
export function WithCaption() {
  return (
    <Surface>
      <Table>
        <TableCaption>Honorários estimados por serviço</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Perícia Contábil</TableCell>
            <TableCell className="text-right">R$ 18.000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Auditoria</TableCell>
            <TableCell className="text-right">R$ 24.000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Surface>
  );
}
