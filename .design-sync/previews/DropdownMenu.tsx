import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Button,
} from "oliveto-contabilidade";
import { Pencil, Send, Archive, Trash2 } from "lucide-react";
import { Surface } from "./_surface";

export function Menu() {
  return (
    <Surface style={{ minHeight: 360 }}>
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Ações do artigo</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Gerenciar artigo</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Pencil /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Send /> Publicar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Archive /> Arquivar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Trash2 /> Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Surface>
  );
}
