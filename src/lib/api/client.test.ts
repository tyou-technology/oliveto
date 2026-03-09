import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiClient } from './client';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/lib/config/routes';
import MockAdapter from 'axios-mock-adapter';

vi.mock('@/store/auth.store', () => ({
  useAuthStore: {
    getState: vi.fn(),
  },
}));

describe('API Client Interceptor', () => {
  let mock: MockAdapter;
  const originalLocation = window.location;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);

    delete (window as unknown as Record<string, unknown>).location;
    window.location = { ...originalLocation, href: '', pathname: '/' } as Location;

    vi.clearAllMocks();
  });

  afterEach(() => {
    mock.restore();
    window.location = originalLocation;
  });

  it('should handle 401 error by clearing session and redirecting', async () => {
    const clearSessionSpy = vi.fn();
    (useAuthStore.getState as ReturnType<typeof vi.fn>).mockReturnValue({
      clearSession: clearSessionSpy,
      tokens: null,
    });

    window.location.pathname = '/dashboard';
    mock.onGet('/test').reply(401);

    try {
      await apiClient.get('/test');
    } catch {
      // expected rejection
    }

    expect(clearSessionSpy).toHaveBeenCalled();
    expect(window.location.href).toBe(ROUTES.ADMIN.LOGIN);
  });

  it('should NOT redirect if already on login page', async () => {
    const clearSessionSpy = vi.fn();
    (useAuthStore.getState as ReturnType<typeof vi.fn>).mockReturnValue({
      clearSession: clearSessionSpy,
      tokens: null,
    });

    window.location.pathname = ROUTES.ADMIN.LOGIN;
    mock.onGet('/test').reply(401);

    try {
      await apiClient.get('/test');
    } catch {
      // expected
    }

    expect(window.location.href).not.toBe(ROUTES.ADMIN.LOGIN);
  });

  it('should have a default timeout of 30 seconds', () => {
    expect(apiClient.defaults.timeout).toBe(30000);
  });
});
