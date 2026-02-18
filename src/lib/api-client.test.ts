import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { api } from './api-client';
import { useUserStore } from '@/stores/useUserStore';
import { ROUTES } from '@/lib/config/routes';
import MockAdapter from 'axios-mock-adapter';

// Mock the store
vi.mock('@/stores/useUserStore', () => ({
  useUserStore: {
    getState: vi.fn(),
  },
}));

describe('API Client Interceptor', () => {
  let mock: MockAdapter;
  const originalLocation = window.location;

  beforeEach(() => {
    mock = new MockAdapter(api);

    // Mock window.location
    delete (window as any).location;
    window.location = { ...originalLocation, href: '', pathname: '/' } as any;

    vi.clearAllMocks();
  });

  afterEach(() => {
    mock.restore();
    window.location = originalLocation;
  });

  it('should handle 401 error by clearing user and redirecting', async () => {
    const clearUserSpy = vi.fn();
    (useUserStore.getState as any).mockReturnValue({ clearUser: clearUserSpy });

    // Set pathname to something other than login
    window.location.pathname = '/dashboard';

    mock.onGet('/test').reply(401);

    try {
      await api.get('/test');
    } catch (e) {
      // ignore rejection
    }

    expect(clearUserSpy).toHaveBeenCalled();
    expect(window.location.href).toBe(ROUTES.ADMIN.LOGIN);
  });

  it('should NOT redirect if already on login page (loop prevention)', async () => {
    const clearUserSpy = vi.fn();
    (useUserStore.getState as any).mockReturnValue({ clearUser: clearUserSpy });

    // Set pathname to login
    window.location.pathname = ROUTES.ADMIN.LOGIN;

    mock.onGet('/test').reply(401);

    try {
      await api.get('/test');
    } catch (e) {
      // ignore rejection
    }

    expect(clearUserSpy).toHaveBeenCalled();
    expect(window.location.href).not.toBe(ROUTES.ADMIN.LOGIN);
  });

  it('should NOT redirect if on a sub-route of login (e.g. trailing slash)', async () => {
    const clearUserSpy = vi.fn();
    (useUserStore.getState as any).mockReturnValue({ clearUser: clearUserSpy });

    window.location.pathname = ROUTES.ADMIN.LOGIN + '/';

    mock.onGet('/test').reply(401);

    try {
      await api.get('/test');
    } catch (e) {
      // ignore rejection
    }

    expect(clearUserSpy).toHaveBeenCalled();
    expect(window.location.href).not.toBe(ROUTES.ADMIN.LOGIN);
  });

  it('should redirect if on a page that resembles login but is not login (e.g. login-history)', async () => {
    const clearUserSpy = vi.fn();
    (useUserStore.getState as any).mockReturnValue({ clearUser: clearUserSpy });

    // A hypothetical protected route that shares the prefix but is distinct
    const similarRoute = ROUTES.ADMIN.LOGIN + '-history'; // /admin/login-history
    window.location.pathname = similarRoute;

    mock.onGet('/test').reply(401);

    try {
      await api.get('/test');
    } catch (e) {
      // ignore rejection
    }

    expect(clearUserSpy).toHaveBeenCalled();
    // This expects a redirect because it's a protected page
    expect(window.location.href).toBe(ROUTES.ADMIN.LOGIN);
  });

  it('should have a default timeout of 30 seconds', () => {
    expect(api.defaults.timeout).toBe(30000);
  });
});
