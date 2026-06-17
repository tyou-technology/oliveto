import * as React from "react";
import { WhatsAppButton } from "oliveto-contabilidade";
import { Surface } from "./_surface";

// WhatsAppButton is a fixed floating action button (its chat popup opens on
// click). Statically it shows the green floating button with online badge + pulse.
export function FloatingButton() {
  return (
    <Surface style={{ minHeight: 200, position: "relative", overflow: "hidden" }}>
      <p style={{ margin: 0, color: "#a1a1aa", fontSize: 13 }}>
        Botão flutuante de WhatsApp (canto inferior direito) — abre o chat ao clicar.
      </p>
      <WhatsAppButton />
    </Surface>
  );
}
