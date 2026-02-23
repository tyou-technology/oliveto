import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useArticles } from '@/features/articles/hooks/useArticles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { env } from '@/lib/env';

// Mock sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// We do NOT mock articlesApi here because we want to test the full flow including the API client.

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

describe('useArticles Integration Hook', () => {
  const firmId = 'firm-123';

  beforeEach(() => {
    // server.resetHandlers() is called automatically by setup.ts
    vi.clearAllMocks();
  });

  it('should fetch articles successfully', async () => {
    const { result } = renderHook(() => useArticles(firmId), {
      wrapper: createWrapper(),
    });

    // Initially loading
    expect(result.current.isLoadingArticles).toBe(true);

    // Wait for data
    await waitFor(() => {
      expect(result.current.isLoadingArticles).toBe(false);
    });

    // Verify data from MSW handler
    expect(result.current.articles).toHaveLength(2);
    expect(result.current.articles[0].title).toBe('Test Article 1');
    expect(result.current.totalElements).toBe(2);
  });

  it('should handle API errors', async () => {
    // Override handler to return 500
    server.use(
      http.get(`${env.NEXT_PUBLIC_API_URL}/articles/by-firm/:firmId`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const { result } = renderHook(() => useArticles(firmId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoadingArticles).toBe(false);
    });

    // Should have empty articles on error (assuming useQuery defaults or error handling returns undefined data)
    // The hook maps `articlesData?.content || EMPTY_ARRAY`. If error, data is undefined.
    expect(result.current.articles).toEqual([]);
  });

  it('should verify X-Client-Token header on fetch', async () => {
    let capturedHeader: string | null = null;

    server.use(
      http.get(`${env.NEXT_PUBLIC_API_URL}/articles/by-firm/:firmId`, ({ request }) => {
        capturedHeader = request.headers.get('X-Client-Token');
        return HttpResponse.json({
          content: [],
          page: { totalElements: 0, totalPages: 0 }
        });
      })
    );

    const { result } = renderHook(() => useArticles(firmId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoadingArticles).toBe(false);
    });

    expect(capturedHeader).toBe(env.NEXT_PUBLIC_CLIENT_TOKEN);
  });
});
