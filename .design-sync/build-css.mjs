#!/usr/bin/env node
// design-sync CSS build: compile the app's Tailwind 4 globals.css into a real,
// self-contained stylesheet (the raw `@import "tailwindcss"` can't load in a
// browser), then append the brand @font-face rules and the font-family CSS vars
// that next/font injects at runtime in the real app but that previews lack.
// Output: .design-sync/compiled.css  (wired as cfg.cssEntry).
// Re-run via cfg.buildCmd on every sync so the stylesheet tracks globals.css.

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)); // .design-sync/
const repoRoot = resolve(here, "..");
// Call the CLI's JS entry directly with `node` — cross-platform (the .bin shim
// isn't directly execFile-able on Windows).
const tailwindCli = join(repoRoot, ".ds-sync", "node_modules", "@tailwindcss", "cli", "dist", "index.mjs");
const input = join(repoRoot, "src", "app", "globals.css");
const compiled = join(repoRoot, ".design-sync", ".cache", "tw.css");
const out = join(repoRoot, ".design-sync", "compiled.css");

// Tailwind v4 auto-detects content from cwd (repoRoot) — picks up src/**.
execFileSync(process.execPath, [tailwindCli, "-i", input, "-o", compiled], {
  cwd: repoRoot,
  stdio: "inherit",
});

const base = readFileSync(compiled, "utf8");

// Brand additions appended AFTER the compiled output so :root overrides win.
// - @font-face: Golos Text (body / --font-sans) and Outfit (headings / --font-heading).
//   url()s resolve relative to this file (.design-sync/), bounded to the repo.
// - :root font vars: next/font sets --font-sans / --font-heading on <html> in the
//   real app; previews have no such injection, so define them to the brand families.
const brand = `

/* === design-sync brand additions (appended; not part of globals.css) === */
@font-face {
  font-family: "Golos Text";
  src: url("../public/fonts/golos-text-latin-wght-normal.woff2") format("woff2");
  font-weight: 400 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Outfit";
  src: url("../public/fonts/outfit-latin-wght-normal.woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
:root {
  --font-sans: "Golos Text";
  --font-heading: "Outfit";
}
`;

writeFileSync(out, base + brand);
console.error(`design-sync: wrote ${out} (${(base.length + brand.length) / 1024 | 0} KB)`);
