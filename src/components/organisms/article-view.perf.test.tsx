import { render } from '@testing-library/react';
import { ArticleView } from './article-view';
import * as sanitizer from '@/lib/utils/sanitizer';
import { ArticleStatus } from '@/lib/types/article';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import React from 'react';

describe('ArticleView Performance', () => {
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

    const onBack = vi.fn();

    // Initial render
    const { rerender } = render(
      <ArticleView article={article} onBack={onBack} />
    );

    // Should be called once initially
    expect(sanitizeSpy).toHaveBeenCalledTimes(1);

    // Force re-render with identical props
    rerender(
      <ArticleView article={article} onBack={onBack} />
    );

    // If NOT memoized, it will be 2. If memoized, it should remain 1.
    // The goal of this task is to make it remain 1.
    expect(sanitizeSpy).toHaveBeenCalledTimes(1);
  });
});
