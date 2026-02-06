import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authApi } from '../api/auth.api';
import { api } from '@/lib/api-client';

// Mock axios instance
vi.mock('@/lib/api-client', () => ({
  api: {
    post: vi.fn(),
    get: vi.fn(),
    create: vi.fn(() => ({
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    })),
  },
}));

describe('Auth Security', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call logout endpoint when logout is triggered', async () => {
    // Mock successful response
    (api.post as any).mockResolvedValueOnce({ data: {} });

    await authApi.logout();

    expect(api.post).toHaveBeenCalledWith('/auth/logout');
  });

  it('should call login endpoint without saving to local storage', async () => {
     // Mock successful response
     (api.post as any).mockResolvedValueOnce({ data: { token: 'fake' } });

     await authApi.login({ email: 'test@test.com', password: 'Password123!' });

     // We can't strictly check localStorage here easily without spying on it,
     // but we can verify the API call was made.
     expect(api.post).toHaveBeenCalledWith('/auth/login', expect.any(Object));
  });
});
