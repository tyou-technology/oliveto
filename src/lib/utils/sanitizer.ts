import DOMPurify from "isomorphic-dompurify";

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
    // However, DOMPurify doesn't automatically add attributes, it just filters.
    // The rich text editor (Tiptap) should handle the addition.
    // Here we ensure they are allowed.
    ADD_ATTR: ["target"],
    // Stripping style attribute to prevent CSS-based XSS (e.g. background-image: javascript:...)
    FORBID_TAGS: ["script", "iframe", "object", "embed", "form", "style"],
    FORBID_ATTR: ["onmouseover", "onload", "onclick", "onerror"],
  });
}
