import DOMPurify from "isomorphic-dompurify";

// Add a hook to enforce rel="noopener noreferrer" for links with target="_blank"
// This prevents reverse tabnabbing attacks.
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A" && node.getAttribute("target")?.toLowerCase() === "_blank") {
    const rel = node.getAttribute("rel") || "";
    const parts = rel.split(/\s+/).filter(Boolean);

    let changed = false;
    if (!parts.includes("noopener")) {
      parts.push("noopener");
      changed = true;
    }
    if (!parts.includes("noreferrer")) {
      parts.push("noreferrer");
      changed = true;
    }

    if (changed) {
      node.setAttribute("rel", parts.join(" "));
    }
  }
});

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * Uses isomorphic-dompurify to work on both client and server.
 *
 * Configuration allows:
 * - Standard rich text tags (headings, paragraphs, lists, formatting)
 * - Images (with src, alt, title, width, height)
 * - Links (with href, target, rel)
 * - Inline styles (for text alignment, colors) - filtered by DOMPurify
 * - Tables
 */
export function sanitizeHtml(content: string | undefined | null): string {
  if (!content) return "";

  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      "p", "br", "b", "i", "em", "strong", "u", "s", "strike", "del",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li", "dl", "dt", "dd",
      "blockquote", "pre", "code",
      "a", "img", "figure", "figcaption",
      "table", "thead", "tbody", "tfoot", "tr", "th", "td",
      "div", "span", "hr"
    ],
    ALLOWED_ATTR: [
      "href", "target", "rel",
      "src", "alt", "title", "width", "height",
      "class",
      "align", "valign", "colspan", "rowspan"
    ],
    // Force rel="noopener noreferrer" for external links if target="_blank" is used
    // This is enforced by the afterSanitizeAttributes hook above.
    ADD_ATTR: ["target"],
    // Stripping style attribute to prevent CSS-based XSS (e.g. background-image: javascript:...)
    FORBID_TAGS: ["script", "iframe", "object", "embed", "form", "style"],
    FORBID_ATTR: ["onmouseover", "onload", "onclick", "onerror"],
  });
}
