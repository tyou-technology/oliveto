import * as React from "react";
import { ArticleCard } from "oliveto-contabilidade";
import type { ArticleResponseDTO } from "@/lib/types/article";
import { Surface, COVER_DATA_URI } from "./_surface";

const tag = (id: string, name: string, color: string) => ({
  id,
  name,
  color,
  createdAt: "2026-01-01T00:00:00Z",
});

const article: ArticleResponseDTO = {
  id: "1",
  slug: "pericia-contabil-judicial",
  title: "Perícia Contábil Judicial: como o laudo técnico fortalece sua defesa",
  coverUrl: COVER_DATA_URI,
  status: "PUBLISHED" as ArticleResponseDTO["status"],
  articleTags: [{ tag: tag("t1", "Perícia", "#00ff90") }],
  createdAt: "2026-03-01T00:00:00Z",
  updatedAt: "2026-03-01T00:00:00Z",
};

const article2: ArticleResponseDTO = {
  id: "2",
  slug: "recuperacao-tributaria",
  title: "Recuperação tributária: oportunidades para reduzir a carga fiscal da empresa",
  coverUrl: COVER_DATA_URI,
  status: "PUBLISHED" as ArticleResponseDTO["status"],
  articleTags: [{ tag: tag("t2", "Tributário", "#00a5b4") }],
  createdAt: "2026-02-10T00:00:00Z",
  updatedAt: "2026-02-10T00:00:00Z",
};

export function Default() {
  return (
    <Surface>
      <div style={{ maxWidth: 360 }}>
        <ArticleCard article={article} />
      </div>
    </Surface>
  );
}

export function Grid() {
  return (
    <Surface>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <ArticleCard article={article} />
        <ArticleCard article={article2} />
      </div>
    </Surface>
  );
}
