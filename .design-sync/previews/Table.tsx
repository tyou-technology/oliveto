import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  Badge,
} from "oliveto-contabilidade";
import { Surface } from "./_surface";

const rows = [
  { lead: "Construtora Aurora", servico: "Perícia Contábil", status: "Novo", valor: "R$ 18.000" },
  { lead: "Mariana Advogados", servico: "Cálculos Judiciais", status: "Em contato", valor: "R$ 7.500" },
  { lead: "TechPar Ltda", servico: "Valuation", status: "Qualificado", valor: "R$ 32.000" },
];

export function LeadsTable() {
  return (
    <Surface>
      <Table>
        <TableCaption>Leads recebidos no último mês</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.lead}>
              <TableCell className="font-medium">{r.lead}</TableCell>
              <TableCell>{r.servico}</TableCell>
              <TableCell>
                <Badge variant="secondary">{r.status}</Badge>
              </TableCell>
              <TableCell className="text-right">{r.valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">R$ 57.500</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Surface>
  );
}
