import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
  Label,
} from "oliveto-contabilidade";
import { Surface } from "./_surface";

export function ContactDialog() {
  return (
    <Surface style={{ minHeight: 440 }}>
      <Dialog defaultOpen modal={false}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitar contato</DialogTitle>
            <DialogDescription>
              Deixe seus dados e um perito retornará em até um dia útil.
            </DialogDescription>
          </DialogHeader>
          <div style={{ display: "grid", gap: 12 }}>
            <Label htmlFor="d-name">Nome</Label>
            <Input id="d-name" placeholder="Seu nome" />
            <Label htmlFor="d-mail">E-mail</Label>
            <Input id="d-mail" type="email" placeholder="voce@empresa.com.br" />
          </div>
          <DialogFooter>
            <Button variant="outline">Cancelar</Button>
            <Button>Enviar solicitação</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Surface>
  );
}
