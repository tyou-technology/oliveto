import * as React from "react";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  ToastViewport,
} from "oliveto-contabilidade";
import { Surface } from "./_surface";

export function Notification() {
  return (
    <Surface style={{ minHeight: 220, position: "relative" }}>
      <ToastProvider>
        <Toast open>
          <div style={{ display: "grid", gap: 4 }}>
            <ToastTitle>Mensagem enviada</ToastTitle>
            <ToastDescription>Entraremos em contato em breve.</ToastDescription>
          </div>
          <ToastAction altText="Desfazer envio">Desfazer</ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </Surface>
  );
}
