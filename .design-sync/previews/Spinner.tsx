import * as React from "react";
import { Spinner } from "oliveto-contabilidade";
import { Surface } from "./_surface";

export function Sizes() {
  return (
    <Surface>
      <div style={{ display: "flex", gap: 24, alignItems: "center", color: "#00ff90" }}>
        <Spinner className="size-4" />
        <Spinner className="size-6" />
        <Spinner className="size-8" />
        <Spinner className="size-10" />
      </div>
    </Surface>
  );
}
