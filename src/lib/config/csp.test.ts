import { describe, it, expect } from 'vitest';
import { getCsp } from './csp';

describe('getCsp', () => {
  it('should return correct CSP for development', () => {
    const csp = getCsp(true);
    expect(csp).toContain("script-src 'self' 'unsafe-inline' 'unsafe-eval'");
    expect(csp).toContain("connect-src 'self' https: http://localhost:8080");
  });

  it('should return correct CSP for production', () => {
    const csp = getCsp(false);
    expect(csp).toContain("script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com");
    expect(csp).not.toContain("'unsafe-eval'");
    expect(csp).not.toContain("http://localhost:8080");
  });
});
