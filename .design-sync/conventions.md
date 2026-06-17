# Oliveto Contabilidade — design system conventions

Institutional site for an accounting/forensic-accounting firm. **Dark-themed, brand
green `#00ff90`.** Components are React + Tailwind CSS (shadcn/ui + Radix primitives).
All user-facing copy is **Brazilian Portuguese**.

## Setup & theming (do this or components render wrong)

- **The system is dark.** The page background is near-black (`--background`), text is
  light, accents are brand green. Build screens on a dark surface — e.g. a root
  `<div className="dark bg-background text-foreground font-sans">…</div>`. The `dark`
  class activates the full dark palette and every `dark:` variant; without it, token
  colors fall back to the lighter `:root` values and look off.
- **Fonts:** body text is **Golos Text** (`var(--font-sans)`), headings are **Outfit**
  (`var(--font-heading)`). Apply `font-sans` on the root; headings already use the
  heading family. Both ship with the system.
- **Data components** (anything using TanStack Query — article feeds, lead tables)
  must be wrapped in `QueryProvider` once near the root.

## Styling idiom — Tailwind utilities mapped to brand tokens

Style with utility classes; the brand palette is exposed as both Tailwind color
utilities and CSS variables. Prefer these token-backed names over raw hex:

| Utility | Token | Use |
|---|---|---|
| `bg-primary` / `text-primary` | `--primary` `#00ff90` | brand green — primary CTAs, accents, links |
| `bg-background` / `text-foreground` | `--background` / `--foreground` | page surface + body text |
| `bg-card` / `text-card-foreground` | `--card` | raised card surfaces |
| `bg-surface` / `bg-surface-highlight` | `--surface` `#111` | section/elevated panels |
| `bg-secondary` / `text-secondary-foreground` | `--secondary` | muted fills |
| `bg-accent` | `--accent` | hover/active backgrounds |
| `bg-destructive` | `--destructive` | errors, delete actions |
| `text-muted-foreground` | `--muted-foreground` | secondary/caption text |
| `border-border` | `--border` | hairline borders |

Brand extras available as CSS variables (use `var(--…)` or `style`): `--whatsapp`
`#25d366`, `--whatsapp-hover`, `--brand-tyou` `#00a5b4`, `--accent` `#00ff90`.
Radius: `rounded-md`/`rounded-lg` track `--radius` (`0.625rem`).

**Caveat:** the shipped stylesheet is a *compiled* Tailwind build containing the
utilities the app already uses. Common layout/spacing utilities (`flex`, `grid`,
`gap-*`, `p-*`, `text-*`, the brand colors above) are present; an exotic utility the
app never used may not be. When in doubt, reach for a CSS variable
(`style={{ color: "var(--primary)" }}`) — those always resolve.

## Where the truth lives

- Compiled styles & tokens: `_ds/<folder>/styles.css` → `_ds_bundle.css` (read these
  for the exact token/utility set and the `:root` / `.dark` palettes).
- Per-component API + usage: each component's `.d.ts` (props) and `.prompt.md` (how to
  compose it, with examples). Read those before using a component.

## Idiomatic snippet

```tsx
import { Button, ServiceCard } from "<bundle global>";

function ServicesBlock() {
  return (
    <section className="dark bg-background text-foreground font-sans px-6 py-16">
      <h2 className="text-primary text-2xl font-semibold tracking-wider text-center">
        Nossos serviços
      </h2>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <ServiceCard service={{ title: "Perícia Contábil", href: "/servicos/pericia" }} />
        <ServiceCard service={{ title: "Auditoria", href: "/servicos/auditoria" }} />
      </div>
      <div className="flex justify-center mt-10">
        <Button>Falar com um perito</Button>
      </div>
    </section>
  );
}
```
