import { describe, it, expect } from 'vitest';
import { getCsp } from './csp';

describe('getCsp', () => {
  it('should return correct CSP for development without API URL', () => {
    const csp = getCsp(true);
    expect(csp).toContain("script-src 'self' 'unsafe-inline' 'unsafe-eval'");
    // Verify default behavior when no API URL is provided
    expect(csp).toContain("connect-src 'self'  https://*.olivetocontabilidade.com https://*.vercel-analytics.com https://*.vercel-insights.com http://localhost:8080 ws://localhost:*");
    expect(csp).toContain("form-action 'self'");
  });

  it('should return correct CSP for development with API URL', () => {
    const apiUrl = 'https://api.dev.com';
    const csp = getCsp(true, apiUrl);
    expect(csp).toContain(`connect-src 'self' ${apiUrl} https://*.olivetocontabilidade.com https://*.vercel-analytics.com https://*.vercel-insights.com http://localhost:8080 ws://localhost:*`);
    expect(csp).toContain("form-action 'self'");
  });

  it('should return correct CSP for production', () => {
    const apiUrl = 'https://api.prod.com';
    const csp = getCsp(false, apiUrl);
    expect(csp).toContain("script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com");
    expect(csp).not.toContain("'unsafe-eval'");
    expect(csp).not.toContain("http://localhost:8080");
    expect(csp).toContain(`connect-src 'self' ${apiUrl} https://*.olivetocontabilidade.com https://*.vercel-analytics.com https://*.vercel-insights.com`);
    expect(csp).not.toContain("ws://localhost:*");
    expect(csp).toContain("form-action 'self'");
  });
});
