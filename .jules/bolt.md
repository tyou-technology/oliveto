## 2024-05-22 - Missing ESLint Config
**Learning:** The project has a `lint` script but is missing the actual ESLint configuration file (or it is misconfigured), preventing static analysis.
**Action:** When working on this repo, do not rely on `pnpm lint` until the configuration is fixed. Use `tsc --noEmit` for type checking instead.

## 2024-05-22 - [Modal-induced List Re-renders]
**Learning:** Large lists in parent components re-render entirely when local state (like modal visibility) changes, even if list data is stable.
**Action:** Always memoize list components (`React.memo`) and ensure their props (callbacks) are stable (`useCallback`) when they share a parent with interactive UI elements like modals.
