import { render } from '@testing-library/react';
import { ArticleViewModal } from './article-view-modal';
import * as sanitizer from '@/lib/utils/sanitizer';
import { ArticleStatus } from '@/lib/types/article';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('ArticleViewModal Performance', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('verifies sanitizeHtml is memoized across re-renders', () => {
    const sanitizeSpy = vi.spyOn(sanitizer, 'sanitizeHtml');

    // Create a large HTML content to simulate work
    const largeContent = '<p>Content</p>'.repeat(1000);

    const article = {
      id: '1',
      title: 'Performance Test Article',
      content: largeContent,
      status: ArticleStatus.PUBLISHED,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      tags: [],
    } as any;

    // Initial render
    const { rerender } = render(
      <ArticleViewModal article={article} isOpen={true} onClose={() => {}} />
    );

    // Should be called once initially
    expect(sanitizeSpy).toHaveBeenCalledTimes(1);

    // Force re-render with identical props (simulating parent re-render or unrelated state change)
    rerender(
      <ArticleViewModal article={article} isOpen={true} onClose={() => {}} />
    );

    // Expectation for OPTIMIZED code: sanitizeHtml is called ONCE total
    console.log(`sanitizeHtml call count: ${sanitizeSpy.mock.calls.length}`);

    expect(sanitizeSpy).toHaveBeenCalledTimes(1);

    // Another re-render
    rerender(
      <ArticleViewModal article={article} isOpen={true} onClose={() => {}} />
    );

    expect(sanitizeSpy).toHaveBeenCalledTimes(1);
  });
});
