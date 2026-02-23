import { ColumnDef } from "@tanstack/react-table";
import { Eye, Edit2, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";

import { DashboardLead } from "../../types";
import { StatusBadge } from "../molecules/status-badge";

interface RecentLeadsColumnsProps {
  onView: (lead: DashboardLead) => void;
  onEdit: (lead: DashboardLead) => void;
}

export const getRecentLeadsColumns = ({
  onView,
  onEdit,
}: RecentLeadsColumnsProps): ColumnDef<DashboardLead>[] => [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div className="font-medium text-foreground">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row }) => {
      const dateStr = row.getValue("createdAt") as string;
      const date = new Date(dateStr);
      return (
        <span className="text-muted-foreground text-xs font-mono">
          {format(date, "d 'de' MMMM", { locale: ptBR })}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const lead = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" aria-label={`Ações para ${lead.name}`}>
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => onView(lead)}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Visualizar</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onEdit(lead)}
              className="cursor-pointer"
            >
              <Edit2 className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Editar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
