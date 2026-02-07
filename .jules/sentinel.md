## 2024-05-23 - Next.js Static Export Security Headers
**Vulnerability:** Missing security headers (X-Frame-Options, X-Content-Type-Options, etc.) in a Next.js Static Export.
**Learning:** `next.config.js` headers configuration is ignored when using `output: "export"`. Security headers must be configured on the web server (e.g., via `.htaccess` for Apache, `vercel.json` for Vercel, or Nginx config).
**Prevention:** Always verify how the application is served (Static vs. Server) and apply security headers at the appropriate infrastructure layer. In this case, `.htaccess` was used.

## 2026-02-07 - Input Length Limits (Defense in Depth)
**Vulnerability:** Missing `maxLength` attributes on user input fields (Login, Articles, Tags). While server-side validation exists via Zod, lack of client-side limits allows sending excessively large payloads, potentially causing DoS or buffer issues, and misalignment with backend constraints.
**Learning:** Even with Zod schemas defining limits (e.g., `max(255)`), HTML inputs default to unlimited length unless explicitly constrained.
**Prevention:** Always mirror backend/schema length constraints to the frontend HTML `maxLength` attribute to provide immediate feedback and reduce server load.
