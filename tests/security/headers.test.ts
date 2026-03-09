import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { getSecurityHeaders } from '../../src/lib/config/security-headers.mjs';

describe('Security Headers', () => {
  it('should have .htaccess synchronized with security-headers.mjs', () => {
    const htaccessPath = path.resolve(process.cwd(), '.htaccess');

    // Ensure .htaccess exists
    if (!fs.existsSync(htaccessPath)) {
      console.warn('.htaccess not found, skipping test');
      return;
    }

    const htaccessContent = fs.readFileSync(htaccessPath, 'utf-8');
    const expectedHeaders = getSecurityHeaders();

    expectedHeaders.forEach((header) => {
      // Create a regex to find the header definition in .htaccess
      // It looks like: Header set Header-Name "Header-Value"
      const regex = new RegExp(`Header set ${header.key} "(.*?)"`, 'i');
      const match = htaccessContent.match(regex);

      // Verify header exists
      expect(match, `Header ${header.key} not found in .htaccess`).not.toBeNull();

      if (match) {
        const actualValue = match[1];
        // Verify header value matches
        expect(actualValue, `Header ${header.key} value mismatch in .htaccess`).toBe(header.value);
      }
    });
  });
});
