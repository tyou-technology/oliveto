import * as React from "react";
import { Skeleton } from "oliveto-contabilidade";
import { Surface } from "./_surface";

export function ArticleCardLoading() {
  return (
    <Surface>
      <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-3/4 rounded" />
      </div>
    </Surface>
  );
}

export function Profile() {
  return (
    <Surface>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Skeleton className="size-12 rounded-full" />
        <div style={{ display: "grid", gap: 8 }}>
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-3 w-24 rounded" />
        </div>
      </div>
    </Surface>
  );
}
