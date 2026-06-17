import * as React from "react";
import { ArticleGridItem } from "oliveto-contabilidade";
import { Surface, mockArticle } from "./_surface";

export function Default() {
  return (
    <Surface>
      <div style={{ maxWidth: 380 }}>
        <ArticleGridItem article={mockArticle()} />
      </div>
    </Surface>
  );
}
