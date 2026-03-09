import { renderHook } from '@testing-library/react';
import { useArticles } from '@/features/articles/hooks/useArticles';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Mock dependencies
vi.mock('@tanstack/react-query', async () => {
  return {
    useQuery: vi.fn(),
    useMutation: vi.fn(),
    useQueryClient: vi.fn(() => ({
      invalidateQueries: vi.fn(),
    })),
  };
});

vi.mock('@/features/articles/api/articles.api', () => ({
  articlesApi: {
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('useArticles Hook Performance', () => {
  const mockArticlesData = {
    content: [{ id: '1', title: 'Test Article' }],
    page: { totalPages: 1, totalElements: 1 },
  };

  const mockMutationObj = { mutate: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup stable returns for useQuery and useMutation
    (useQuery as any).mockReturnValue({
      data: mockArticlesData,
      isLoading: false,
    });

    (useMutation as any).mockReturnValue(mockMutationObj);
  });

  it('should maintain referential stability across re-renders when data is unchanged', () => {
    const { result, rerender } = renderHook(() => useArticles('firm-123'));

    const firstRenderResult = result.current;

    // Force a re-render with the same props
    rerender();

    const secondRenderResult = result.current;

    // This expectation confirms the referential stability after optimization
    expect(secondRenderResult).toBe(firstRenderResult);
  });
});
