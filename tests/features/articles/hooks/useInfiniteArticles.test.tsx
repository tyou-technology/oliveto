import { renderHook, waitFor } from '@testing-library/react';
import { useInfiniteArticles } from '@/features/articles/hooks/useInfiniteArticles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { articlesApi } from '@/features/articles/api/articles.api';

// Mock the environment variable to avoid runtime errors
vi.mock('@/lib/env', () => ({
  env: {
    NEXT_PUBLIC_FIRM_ID: 'test-firm-id',
    NEXT_PUBLIC_API_URL: 'http://localhost:3000/api',
  },
}));

// Mock the API
vi.mock('@/features/articles/api/articles.api', () => ({
  articlesApi: {
    getAllByFirmId: vi.fn(),
    getPublishedByFirmId: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useInfiniteArticles Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Verifies that the articles array maintains referential equality across re-renders
  // when the underlying data has not changed. This is critical for preventing unnecessary
  // re-renders in downstream components.
  it('should return a stable articles array reference when data has not changed', async () => {
    const mockPage = {
      content: [{ id: '1', title: 'Article 1' }],
      page: {
        size: 10,
        number: 0,
        totalElements: 1,
        totalPages: 1,
      },
    };

    // @ts-ignore
    articlesApi.getAllByFirmId.mockResolvedValue(mockPage);

    const { result, rerender } = renderHook(
      () => useInfiniteArticles('test-firm-id', 10, false),
      {
        wrapper: createWrapper(),
      }
    );

    // Wait for data to load
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const firstResult = result.current;

    // Rerender with same props
    rerender();

    const secondResult = result.current;

    // Verify referential stability of the 'articles' property
    expect(secondResult.articles).toBe(firstResult.articles);
    expect(secondResult.articles).toEqual(mockPage.content);
  });
});
