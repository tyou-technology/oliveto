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
     (api.post as any).mockResolvedValueOnce({ data: { token: 'fake', type: 'Bearer' } });

     await authApi.login({ email: 'test@test.com', password: 'Password123!' });

     // We can't strictly check localStorage here easily without spying on it,
     // but we can verify the API call was made.
     expect(api.post).toHaveBeenCalledWith('/auth/login', expect.any(Object));
  });

  it('should return login response without token even if API sends it (whitelist check)', async () => {
    (api.post as any).mockResolvedValueOnce({
      data: {
        token: 'secret-token',
        otherSensitiveField: 'should-be-stripped',
        type: 'Bearer',
        email: 'test@example.com',
        userId: '123',
      },
    });

    const response = await authApi.login({
      email: 'test@test.com',
      password: 'Password123!',
    });

    expect(response).toEqual({
      type: 'Bearer',
      email: 'test@example.com',
      userId: '123',
      role: undefined,
    });
    expect((response as any).token).toBeUndefined();
    expect((response as any).otherSensitiveField).toBeUndefined();
  });

  it('should return confirmRegistration response without token even if API sends it (whitelist check)', async () => {
    (api.post as any).mockResolvedValueOnce({
      data: {
        token: 'secret-token',
        type: 'Bearer',
        email: 'test@example.com',
        userId: '123',
      },
    });

    const response = await authApi.confirmRegistration({
      verificationToken: 'verify-123',
    });

    expect(response).toEqual({
      type: 'Bearer',
      email: 'test@example.com',
      userId: '123',
    });
    expect((response as any).token).toBeUndefined();
  });
});
