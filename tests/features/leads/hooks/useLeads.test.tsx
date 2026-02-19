import { renderHook, waitFor } from '@testing-library/react';
import { useLeads } from '@/features/leads/hooks/useLeads';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { leadsApi } from '@/features/leads/api/leads.api';
import type { PaginatedResponse } from '@/features/leads/api/leads.api';
import { LeadOrigin, type LeadResponseDTO } from '@/features/leads/types';

// Mock the API
vi.mock('@/features/leads/api/leads.api', () => ({
  leadsApi: {
    findAll: vi.fn(),
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

describe('useLeads Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch leads successfully', async () => {
    const mockData = {
      content: [
        {
          id: '1',
          name: 'Lead 1',
          email: 'test@example.com',
          phone: '123456789',
          message: 'Hello',
          origin: LeadOrigin.CONTACT,
          isRead: false,
          createdAt: '2023-01-01T00:00:00Z'
        }
      ],
      page: {
        size: 10,
        number: 0,
        totalElements: 1,
        totalPages: 1,
      },
    } as PaginatedResponse<LeadResponseDTO>;

    vi.mocked(leadsApi.findAll).mockResolvedValue(mockData);

    const { result } = renderHook(() => useLeads({ page: 0, size: 10 }), {
      wrapper: createWrapper(),
    });

    // Initial loading state
    expect(result.current.isLoading).toBe(true);

    // Wait for success
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(leadsApi.findAll).toHaveBeenCalledWith(0, 10, undefined);
  });

  it('should handle filters correctly', async () => {
    const mockData = {
      content: [],
      page: { size: 10, number: 0, totalElements: 0, totalPages: 0 }
    } as PaginatedResponse<LeadResponseDTO>;

    vi.mocked(leadsApi.findAll).mockResolvedValue(mockData);

    const { result } = renderHook(() => useLeads({ page: 1, size: 20, isRead: true }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(leadsApi.findAll).toHaveBeenCalledWith(1, 20, true);
  });
});
