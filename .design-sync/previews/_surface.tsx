// Shared brand-dark surface for preview cards. The Oliveto site is dark-themed
// (black page, light text, brand green #00FF90), but design-sync preview cards
// have a white background that can't be overridden. Wrap atom/molecule previews
// so light text and brand colors read correctly — page-section organisms that
// bring their own surface don't need it. NOT a component (underscore name), so
// the converter never treats it as a card; imported relatively by previews.
import * as React from "react";

export function Surface({
  children,
  padded = true,
  className = "",
  style,
}: {
  children: React.ReactNode;
  padded?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  // Portaled content (Radix dialogs/menus/sheets/tooltips) mounts at <body>,
  // OUTSIDE this wrapper — so it would escape `.dark` and fall back to the app's
  // near-black :root foreground (invisible on the dark overlay). Mark <body> .dark
  // and give it the brand-dark background so portals are themed correctly too.
  // Only authored previews import Surface, so unauthored floor renders are untouched.
  React.useEffect(() => {
    const el = document.documentElement;
    const body = document.body;
    el.classList.add("dark");
    body.classList.add("dark");
    const prevBg = body.style.background;
    body.style.background = "#0a0a0a";
    return () => {
      body.style.background = prevBg;
    };
  }, []);

  // `dark` activates the brand's dark palette (.dark { --foreground: white, … })
  // and `dark:` utility variants for everything inside — scoped here, so the
  // app's :root (used by unauthored floor renders on the white card) is untouched.
  return (
    <div
      className={"dark font-sans " + className}
      style={{
        background: "#0a0a0a",
        color: "#fafafa",
        padding: padded ? 28 : 0,
        borderRadius: 12,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Shared mock article (matches ArticleResponseDTO) for the article molecules.
export function mockArticle(over: Record<string, unknown> = {}) {
  return {
    id: "1",
    slug: "pericia-contabil-judicial",
    title: "Perícia Contábil Judicial: como o laudo técnico fortalece sua defesa",
    briefing:
      "Entenda o papel do perito-contador e como um laudo bem fundamentado pode mudar o rumo de um processo.",
    coverUrl: COVER_DATA_URI,
    readingTime: 6,
    status: "PUBLISHED",
    publishedAt: "2026-03-01T00:00:00Z",
    createdAt: "2026-03-01T00:00:00Z",
    updatedAt: "2026-03-01T00:00:00Z",
    author: { id: "a1", name: "Augusto Favareto", avatarUrl: null },
    articleTags: [{ tag: { id: "t1", name: "Perícia", color: "#00ff90", createdAt: "2026-01-01T00:00:00Z" } }],
    ...over,
  } as never;
}

// A small brand-tinted SVG cover image (data URI) for article previews — renders
// offline in headless chromium where remote images won't load.
export const COVER_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='240'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='#0f2a22'/><stop offset='1' stop-color='#00ff90'/>
      </linearGradient></defs>
      <rect width='400' height='240' fill='url(#g)'/>
    </svg>`,
  );
