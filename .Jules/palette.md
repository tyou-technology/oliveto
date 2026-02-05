## 2024-05-22 - Icon-Only Button Standardization
**Learning:** Found multiple instances of raw HTML `button` elements used for icon-only actions (Edit/Delete) instead of the design system's `Button` component. This resulted in missing focus rings, inconsistent hover states, and lack of ARIA labels.
**Action:** Replace raw buttons with `<Button variant="ghost" size="icon-sm">` and strictly enforce `aria-label` for all icon-only interactions to ensure keyboard accessibility and visual consistency.
