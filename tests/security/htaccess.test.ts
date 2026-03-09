import { describe, it, expect } from "vitest";
import { getSecurityHeaders } from "@/lib/config/security-headers.mjs";
import fs from "fs";
import path from "path";

describe(".htaccess Security Headers", () => {
  it("should contain all security headers defined in configuration", () => {
    const headers = getSecurityHeaders();
    const htaccessPath = path.resolve(process.cwd(), ".htaccess");

    // Check if .htaccess exists
    if (!fs.existsSync(htaccessPath)) {
      console.warn("⚠️ .htaccess file not found. Skipping test.");
      return;
    }

    const htaccessContent = fs.readFileSync(htaccessPath, "utf-8");

    headers.forEach((header) => {
      // Create a regex to find the header in .htaccess
      // Apache format: Header set Key "Value"
      // We need to escape special characters in the value for regex if necessary,
      // but strict string matching is usually safer for known values.
      // However, values might be split across lines or have different spacing.
      // For simplicity, we'll check for the presence of the key and value in the same line.

      const expectedLine = `Header set ${header.key} "${header.value}"`;

      // If the value is long (like CSP or Permissions-Policy), it might be worth checking key and value separately
      // or just ensuring the value is contained within the file associated with the key.

      // For now, let's try exact match on the line, assuming standard formatting.
      // We normalize whitespace to be safe.
      const normalizedContent = htaccessContent.replace(/\s+/g, " ");
      const normalizedExpected = expectedLine.replace(/\s+/g, " ");

      // Since .htaccess might have multiple spaces, regex is better.
      const regex = new RegExp(`Header\\s+set\\s+${header.key}\\s+"${header.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'i');

      const match = htaccessContent.match(regex);

      if (!match) {
        // Fallback for debugging: check if key is present but value is different
        const keyRegex = new RegExp(`Header\\s+set\\s+${header.key}\\s+"([^"]+)"`, 'i');
        const keyMatch = htaccessContent.match(keyRegex);
        if (keyMatch) {
             throw new Error(`Header mismatch for ${header.key}.\nExpected: "${header.value}"\nFound:    "${keyMatch[1]}"`);
        } else {
             throw new Error(`Header ${header.key} not found in .htaccess`);
        }
      }

      expect(match).toBeTruthy();
    });
  });
});
