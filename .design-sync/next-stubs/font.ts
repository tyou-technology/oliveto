// Browser stub for next/font (local + google) — returns an inert font object.
// Design-sync build only; not imported by any component (only app/layout.tsx).

interface FontResult {
  className: string;
  variable: string;
  style: { fontFamily: string };
}

function font(): FontResult {
  return { className: "", variable: "", style: { fontFamily: "inherit" } };
}

export default font;
