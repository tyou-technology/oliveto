import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { getSecurityHeaders } from '@/lib/config/security-headers.mjs';
import { getCsp } from '@/lib/config/csp.mjs';

describe('vercel.json security configuration', () => {
  const vercelConfigPath = path.resolve(process.cwd(), 'vercel.json');
  let vercelConfig: any;

  beforeAll(() => {
    if (fs.existsSync(vercelConfigPath)) {
      const fileContent = fs.readFileSync(vercelConfigPath, 'utf-8');
      vercelConfig = JSON.parse(fileContent);
    }
  });

  it('should exist', () => {
    expect(fs.existsSync(vercelConfigPath)).toBe(true);
  });

  it('should contain security headers for all routes', () => {
    expect(vercelConfig).toBeDefined();
    const headersConfig = vercelConfig.headers.find((h: any) => h.source === '/(.*)');
    expect(headersConfig).toBeDefined();

    const headers = headersConfig.headers;
    const expectedHeaders = getSecurityHeaders();

    expectedHeaders.forEach((expectedHeader) => {
      const header = headers.find((h: any) => h.key === expectedHeader.key);
      expect(header).toBeDefined();
      expect(header.value).toBe(expectedHeader.value);
    });
  });

  it('should contain correct CSP header matching production config', () => {
    expect(vercelConfig).toBeDefined();
    const headersConfig = vercelConfig.headers.find((h: any) => h.source === '/(.*)');
    const cspHeader = headersConfig.headers.find((h: any) => h.key === 'Content-Security-Policy');

    expect(cspHeader).toBeDefined();

    // Production CSP (isDev = false)
    const expectedCsp = getCsp(false);
    expect(cspHeader.value).toBe(expectedCsp);
  });
});
