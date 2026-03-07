import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React, { useState } from 'react';
import { ArticleCard } from './article-card';
import { ArticleResponseDTO, ArticleStatus } from '@/lib/types/article';
import { CategoryBadge } from '@/components/atoms/category-badge';

// Mock child components to track renders
// We need to mock the module, but also allow us to spy on it.
// The easiest way is to mock the component itself.
vi.mock('@/components/atoms/category-badge', () => ({
  CategoryBadge: vi.fn(() => <div data-testid="category-badge">Badge</div>),
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: () => <img alt="article" />,
}));

const mockArticle: ArticleResponseDTO = {
  id: '1',
  title: 'Test Article',
  content: 'Content',
  status: ArticleStatus.PUBLISHED,
  publishedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  tags: [{
    id: 'tag-1',
    name: 'Tech',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }],
  imageUrl: 'https://example.com/image.jpg',
};

function Wrapper() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <div data-testid="count">{count}</div>
      <ArticleCard article={mockArticle} />
    </div>
  );
}

describe('ArticleCard Performance', () => {
  it('should not re-render when parent state changes but props remain stable', async () => {
    // Import the mocked component to access the spy
    const { CategoryBadge } = await import('@/components/atoms/category-badge');

    render(<Wrapper />);

    // Initial render
    expect(CategoryBadge).toHaveBeenCalledTimes(1);

    // Trigger parent re-render
    const button = screen.getByText('Increment');
    fireEvent.click(button);

    // Verify child didn't re-render
    // Currently (before optimization), this expectation will FAIL (it will be 2)
    // After optimization, it will PASS (it will be 1)
    expect(CategoryBadge).toHaveBeenCalledTimes(1);
  });
});
