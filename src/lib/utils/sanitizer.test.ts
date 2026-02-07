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
});
