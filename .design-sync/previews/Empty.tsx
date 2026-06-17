import * as React from "react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  Button,
} from "oliveto-contabilidade";
import { Inbox } from "lucide-react";
import { Surface } from "./_surface";

export function NoArticles() {
  return (
    <Surface>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Inbox />
          </EmptyMedia>
          <EmptyTitle>Nenhum artigo encontrado</EmptyTitle>
          <EmptyDescription>
            Ainda não há artigos publicados nesta categoria. Volte em breve.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline">Limpar filtros</Button>
        </EmptyContent>
      </Empty>
    </Surface>
  );
}
