## 2024-05-23 - Next.js Static Export Security Headers
**Vulnerability:** Missing security headers (X-Frame-Options, X-Content-Type-Options, etc.) in a Next.js Static Export.
**Learning:** `next.config.js` headers configuration is ignored when using `output: "export"`. Security headers must be configured on the web server (e.g., via `.htaccess` for Apache, `vercel.json` for Vercel, or Nginx config).
**Prevention:** Always verify how the application is served (Static vs. Server) and apply security headers at the appropriate infrastructure layer. In this case, `.htaccess` was used.
