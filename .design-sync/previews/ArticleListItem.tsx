import * as React from "react";
import { ArticleListItem } from "oliveto-contabilidade";
import { Surface, mockArticle } from "./_surface";

const noop = () => {};

export function AdminRow() {
  return (
    <Surface>
      <div style={{ display: "grid", gap: 12 }}>
        <ArticleListItem article={mockArticle()} onView={noop} onEdit={noop} onDelete={noop} />
        <ArticleListItem
          article={mockArticle({
            id: "2",
            title: "Recuperação tributária: oportunidades para reduzir a carga fiscal",
            status: "DRAFT",
            articleTags: [{ tag: { id: "t2", name: "Tributário", color: "#00a5b4", createdAt: "2026-01-01T00:00:00Z" } }],
          })}
          onView={noop}
          onEdit={noop}
          onDelete={noop}
        />
      </div>
    </Surface>
  );
}
