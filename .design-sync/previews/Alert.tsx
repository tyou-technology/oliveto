import * as React from "react";
import { Alert, AlertTitle, AlertDescription } from "oliveto-contabilidade";
import { CircleCheck, TriangleAlert } from "lucide-react";
import { Surface } from "./_surface";

export function Default() {
  return (
    <Surface>
      <Alert>
        <CircleCheck />
        <AlertTitle>Mensagem enviada com sucesso</AlertTitle>
        <AlertDescription>
          Nossa equipe entrará em contato em até um dia útil.
        </AlertDescription>
      </Alert>
    </Surface>
  );
}

export function Destructive() {
  return (
    <Surface>
      <Alert variant="destructive">
        <TriangleAlert />
        <AlertTitle>Não foi possível enviar o formulário</AlertTitle>
        <AlertDescription>
          Verifique os campos obrigatórios e tente novamente.
        </AlertDescription>
      </Alert>
    </Surface>
  );
}
