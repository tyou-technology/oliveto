import { describe, it, expect } from 'vitest';
import { getSecurityHeaders } from '../../src/lib/config/security-headers.mjs';

describe('getSecurityHeaders', () => {
  it('should return the correct security headers', () => {
    const headers = getSecurityHeaders();

    const expectedHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      { key: 'X-Frame-Options', value: 'DENY' },
    ];

    expect(headers).toHaveLength(expectedHeaders.length);
    expectedHeaders.forEach((expectedHeader) => {
      expect(headers).toContainEqual(expectedHeader);
    });
  });
});
