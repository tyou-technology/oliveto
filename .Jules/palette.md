## 2024-05-22 - Icon-Only Button Standardization
**Learning:** Found multiple instances of raw HTML `button` elements used for icon-only actions (Edit/Delete) instead of the design system's `Button` component. This resulted in missing focus rings, inconsistent hover states, and lack of ARIA labels.
**Action:** Replace raw buttons with `<Button variant="ghost" size="icon-sm">` and strictly enforce `aria-label` for all icon-only interactions to ensure keyboard accessibility and visual consistency.

## 2024-05-23 - Form Label Association
**Learning:** Found visible `label` elements that were not programmatically associated with their `input` fields using `htmlFor` and `id`. This prevents screen readers from announcing the label when the input is focused and breaks the click-to-focus behavior.
**Action:** Always ensure `label` elements have a `htmlFor` attribute that matches the `id` of the corresponding `input`.
