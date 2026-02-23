import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from './sanitizer';

describe('sanitizeHtml', () => {
  it('should sanitize basic HTML', () => {
    const input = '<p>Hello <b>World</b></p>';
    const output = sanitizeHtml(input);
    expect(output).toBe('<p>Hello <b>World</b></p>');
  });

  it('should remove unsafe tags', () => {
    const input = '<script>alert("XSS")</script><p>Safe</p>';
    const output = sanitizeHtml(input);
    expect(output).toBe('<p>Safe</p>');
  });

  it('should allow target="_blank" but enforce rel="noopener noreferrer"', () => {
    const input = '<a href="https://example.com" target="_blank">External Link</a>';
    const output = sanitizeHtml(input);

    // Check that target="_blank" is preserved
    expect(output).toContain('target="_blank"');

    // Check that rel="noopener noreferrer" is added
    // Note: The attribute order is not guaranteed, so we check inclusion.
    // Also handling case where other rel values might be present if the implementation supports it.
    expect(output).toContain('rel="noopener noreferrer"');
  });

  it('should not add rel="noopener noreferrer" to internal links without target="_blank"', () => {
    const input = '<a href="/internal">Internal Link</a>';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('rel="noopener noreferrer"');
    expect(output).toContain('href="/internal"');
  });

  it('should preserve existing rel attributes and add noopener noreferrer if missing', () => {
     const input = '<a href="https://example.com" target="_blank" rel="nofollow">External Link</a>';
     const output = sanitizeHtml(input);
     expect(output).toContain('rel="nofollow noopener noreferrer"');
  });

  it('should remove javascript: hrefs', () => {
    const input = '<a href="javascript:alert(1)">Click me</a>';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('javascript:');
    expect(output).toContain('Click me');
  });

  it('should remove dangerous attributes like onerror', () => {
    const input = '<img src="x" onerror="alert(1)">';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('onerror');
  });

  it('should strip class attributes to prevent CSS injection/defacement', () => {
    const input = '<div class="fixed inset-0 z-50 bg-red-500">Hacked</div>';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('class="fixed inset-0 z-50 bg-red-500"');
    expect(output).not.toContain('class=');
    expect(output).toContain('<div>Hacked</div>');
  });

  it('should allow data: URIs for img src', () => {
    const input = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==">';
    const output = sanitizeHtml(input);
    expect(output).toContain('src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="');
  });

  it('should remove data: URIs from href', () => {
    const input = '<a href="data:text/html,<script>alert(1)</script>">Malicious</a>';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('data:text/html');
    // Should strip href
    expect(output).not.toContain('href=');
  });

  it('should remove ftp: links', () => {
    const input = '<a href="ftp://example.com">FTP</a>';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('href="ftp://example.com"');
    // Depending on sanitizer behavior, it might remove href or the tag.
    // DOMPurify typically removes the attribute value or attribute if invalid.
  });

  it('should remove vbscript: links', () => {
    const input = '<a href="vbscript:msgbox(1)">VBS</a>';
    const output = sanitizeHtml(input);
    expect(output).not.toContain('vbscript:');
  });

  it('should allow http, https, mailto, and tel schemes', () => {
    const input = `
      <a href="http://example.com">HTTP</a>
      <a href="https://example.com">HTTPS</a>
      <a href="mailto:user@example.com">Mail</a>
      <a href="tel:+1234567890">Phone</a>
    `;
    const output = sanitizeHtml(input);
    expect(output).toContain('href="http://example.com"');
    expect(output).toContain('href="https://example.com"');
    expect(output).toContain('href="mailto:user@example.com"');
    expect(output).toContain('href="tel:+1234567890"');
  });
});
