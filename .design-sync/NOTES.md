# design-sync notes — Oliveto Contabilidade

This repo is a **Next.js 16 application**, not a published component library. The
synced "design system" is the in-repo `src/components/` tree (atoms + molecules +
organisms). Synced in the **package** shape, **synth-entry** mode (no `dist/`).

## Re-sync setup (do this on a fresh clone, before running the converter)

The converter assumes the package lives at `node_modules/<pkg>`. For this app we
create a **self-junction** so `PKG_DIR` resolves to the repo root (needed so
`cfg.cssEntry` / `cfg.tsconfig` under `.design-sync/` resolve correctly):

```sh
node -e "const fs=require('fs');const t=process.cwd();const l=t+'/node_modules/oliveto-contabilidade';try{fs.rmSync(l,{recursive:true,force:true})}catch{};fs.symlinkSync(t,l,'junction')"
```

This junction lives in gitignored `node_modules`, so it must be recreated each clone.

## Key config decisions

- **`cfg.tsconfig` = `.design-sync/tsconfig.bundle.json`** — a dedicated tsconfig (NOT
  the repo's). It maps `@/*` → `src/*` PLUS browser stubs for things that don't work
  outside Next/the browser (see `.design-sync/next-stubs/`):
  - `next/image` → plain `<img>`, `next/link` → `<a>`, `next/navigation` → no-op router,
    `next/font/*` → inert font object.
  - `@/lib/env` → a static-values stub. The real `src/lib/env.ts` validates
    `process.env` via Zod **at module load**, which throws `process is not defined`
    in a browser and broke EVERY component (env is imported transitively via the
    axios client → services → hooks). The stub is the fix.
  - Explicit file targets for `@/` specifiers that resolve to a **directory** (the
    esbuild paths plugin matches the dir before the file and esbuild can't read a dir
    as a file → Windows "Função incorreta"): `@/lib/utils` (a `.ts` file shadowed by a
    same-named dir), `@/features/leads/hooks`, `@/features/leads/types` (real dirs →
    their `index.ts`). If new directory `@/` imports appear in the component graph,
    add explicit mappings here.
- **`package.json` `"types": ".design-sync/types/index.d.ts"`** — bounds the converter's
  `.d.ts` glob. Without it, `findTypesRoot` returns the repo root and ts-morph globs
  the whole tree (incl. node_modules via the self-junction) → OOM. The stub is empty.
- **`cfg.cssEntry` = `.design-sync/compiled.css`**, produced by `cfg.buildCmd`
  (`node .design-sync/build-css.mjs`). The raw `globals.css` uses `@import "tailwindcss"`
  which can't load in a browser, so we compile it with the Tailwind v4 CLI (auto-detects
  `src/**` classes) and append: brand `@font-face` (Golos Text = body/`--font-sans`,
  Outfit = headings/`--font-heading`, from `public/fonts/`) + `:root` font-var overrides
  (next/font injects these at runtime in the real app; previews have no injection).
- **`cfg.srcDir` = `src/components`** — scopes component discovery to the library
  (otherwise it scans all of `src/` and pulls PascalCase exports from features/lib/etc.).
- **`cfg.provider` = QueryProvider** — many components call `useQuery`; without a
  QueryClientProvider they throw. The provider lets them render loading/empty states.
- **`componentSrcMap.FormField = null`** — TWO different `FormField` components exist
  (`atoms/form-field.tsx` custom input + `atoms/form.tsx` shadcn Controller wrapper).
  The synth entry star-exports both → ESM drops the ambiguous name → it's undefined on
  the global. A design system can't have two components under one name, so it's excluded.
  The shadcn Form sub-parts (Form, FormItem, FormControl, FormLabel, FormMessage) still ship.

## Theme / rendering

- The brand is **dark** (app `:root --background: #000000`, light text, brand green
  `#00FF90`). Preview cards have a hardcoded WHITE body background (can't override —
  the card's inline `<style>` loads after `styles.css`). Page-section organisms bring
  their own dark surface and render correctly on white; **atoms/molecules need a
  brand-dark wrapper inside their authored preview** or light text is invisible.

## Known render warns (triaged — not failures)

- **[FONT_MISSING] "Geist" / "Geist Mono"** — these are leftover *fallback* families in
  the theme font stacks. The real app doesn't ship Geist either (it uses next/font for
  Golos Text + Outfit, which we DO ship and apply as the primary families). Faithful to
  the app; the fallback to system only matters if Golos/Outfit fail. Do not "fix" by
  shipping Geist — that would make previews more styled than the real app.

## Re-sync risks (watch-list)

- The self-junction and the playwright/chromium install are not in git — recreate per clone.
- `next-stubs/env.ts` placeholder values are decoupled from the real Zod schema; if
  `src/lib/env.ts` adds a REQUIRED field that a component reads at render, add it here too.
- The `next/*` stubs are minimal; if a component starts using a next/navigation/image API
  the stub doesn't implement, extend the stub.
- Directory `@/` imports: re-scan if the component graph changes (see tsconfig.bundle.json).
