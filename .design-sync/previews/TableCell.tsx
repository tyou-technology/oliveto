import * as React from "react";
import { Table, TableBody, TableRow, TableCell } from "oliveto-contabilidade";
import { Surface } from "./_surface";

// TableCell is a body cell (<td>) — shown inside table body rows.
export function BodyCells() {
  return (
    <Surface>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Construtora Aurora</TableCell>
            <TableCell>Perícia Contábil</TableCell>
            <TableCell className="text-right">R$ 18.000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">TechPar Ltda</TableCell>
            <TableCell>Valuation</TableCell>
            <TableCell className="text-right">R$ 32.000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Surface>
  );
}
