import { renderHook, waitFor } from '@testing-library/react';
import { useTags } from '@/features/articles/hooks/useTags';
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
    getAllTags: vi.fn(),
    getPublishedTags: vi.fn(),
    createTag: vi.fn(),
    updateTag: vi.fn(),
    deleteTag: vi.fn(),
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

describe('useTags Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a stable tags array reference when data has not changed', async () => {
    const mockTags = [{ id: '1', name: 'Tag 1' }];
    // @ts-ignore
    articlesApi.getAllTags.mockResolvedValue(mockTags);

    const { result, rerender } = renderHook(() => useTags(), {
      wrapper: createWrapper(),
    });

    // Wait for data to load
    await waitFor(() => expect(result.current.isLoadingTags).toBe(false));

    const firstResult = result.current;

    // Rerender with same props
    rerender();

    const secondResult = result.current;

    // Verify referential stability of the 'tags' property
    expect(secondResult.tags).toBe(firstResult.tags);
    expect(secondResult.tags).toEqual(mockTags);
  });
});
