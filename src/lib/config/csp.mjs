/**
 * Generates the Content Security Policy (CSP) string based on the environment.
 * @param {boolean} isDev - Whether the environment is development.
 * @returns {string} The CSP string.
 */
export function getCsp(isDev) {
  return `default-src 'self'; script-src 'self' 'unsafe-inline'${
    isDev ? " 'unsafe-eval'" : ""
  } https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:${
    isDev ? " http://localhost:8080" : ""
  }; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; upgrade-insecure-requests;`;
}
