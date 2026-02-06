## 2024-05-22 - Missing ESLint Config
**Learning:** The project has a `lint` script but is missing the actual ESLint configuration file (or it is misconfigured), preventing static analysis.
**Action:** When working on this repo, do not rely on `pnpm lint` until the configuration is fixed. Use `tsc --noEmit` for type checking instead.
