import * as React from "react";
import { TagListItem } from "oliveto-contabilidade";
import { Surface } from "./_surface";

const noop = () => {};
const tag = (id: string, name: string, color: string) => ({
  id,
  name,
  color,
  description: null,
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
});

export function List() {
  return (
    <Surface>
      <div style={{ display: "grid", gap: 8 }}>
        <TagListItem tag={tag("1", "Perícia", "#00ff90") as never} onEdit={noop} onDelete={noop} />
        <TagListItem tag={tag("2", "Tributário", "#00a5b4") as never} onEdit={noop} onDelete={noop} />
        <TagListItem tag={tag("3", "Auditoria", "#c8a96e") as never} onEdit={noop} onDelete={noop} />
      </div>
    </Surface>
  );
}
