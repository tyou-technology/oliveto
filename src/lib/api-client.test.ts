import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { api } from './api-client';
import { useUserStore } from '@/stores/useUserStore';
import { ROUTES } from '@/lib/config/routes';
import MockAdapter from 'axios-mock-adapter';
import { env } from '@/lib/env';

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
    // Use Object.defineProperty to allow writable window.location in JSDOM if needed,
    // but the current implementation seems to work for JSDOM.
    delete (window as any).location;
    window.location = { ...originalLocation, href: '', pathname: '/' } as any;

    vi.clearAllMocks();
  });

  afterEach(() => {
    mock.restore();
    window.location = originalLocation;
  });

  it('should handle 401 error by clearing user and redirecting', async () => {
    const clearAuthSpy = vi.fn();
    (useUserStore.getState as any).mockReturnValue({ clearAuth: clearAuthSpy }); // Mock clearAuth

    // Set pathname to something other than login
    window.location.pathname = '/dashboard';

    mock.onGet('/test').reply(401);

    try {
      await api.get('/test');
    } catch (e) {
      // ignore rejection
    }

    expect(clearAuthSpy).toHaveBeenCalled();
    // Check if redirect happened (href changed)
    expect(window.location.href).toBe(ROUTES.ADMIN.LOGIN);
  });

  it('should NOT redirect if already on login page (loop prevention)', async () => {
    const clearAuthSpy = vi.fn();
    (useUserStore.getState as any).mockReturnValue({ clearAuth: clearAuthSpy, refreshToken: null });

    // Set pathname to login
    window.location.pathname = ROUTES.ADMIN.LOGIN;

    mock.onGet('/test').reply(401);

    try {
      await api.get('/test');
    } catch (e) {
      // ignore
    }

    // Redirect should not happen (href remains empty or initial)
    expect(window.location.href).not.toBe(ROUTES.ADMIN.LOGIN);
  });

  it('should NOT redirect if on a sub-route of login (e.g. trailing slash)', async () => {
    const clearAuthSpy = vi.fn();
    (useUserStore.getState as any).mockReturnValue({ clearAuth: clearAuthSpy, refreshToken: null });

    window.location.pathname = ROUTES.ADMIN.LOGIN + '/';

    mock.onGet('/test').reply(401);

    try {
      await api.get('/test');
    } catch (e) {
      // ignore
    }

    expect(window.location.href).not.toBe(ROUTES.ADMIN.LOGIN);
  });

  it('should redirect if on a page that resembles login but is not login (e.g. login-history)', async () => {
    const clearAuthSpy = vi.fn();
    (useUserStore.getState as any).mockReturnValue({ clearAuth: clearAuthSpy, refreshToken: null });

    // A hypothetical protected route that shares the prefix but is distinct
    const similarRoute = ROUTES.ADMIN.LOGIN + '-history'; // /admin/login-history
    window.location.pathname = similarRoute;

    mock.onGet('/test').reply(401);

    try {
      await api.get('/test');
    } catch (e) {
      // ignore
    }

    // This expects a redirect because it's a protected page
    expect(window.location.href).toBe(ROUTES.ADMIN.LOGIN);
  });

  it('should have a default timeout of 30 seconds', () => {
    expect(api.defaults.timeout).toBe(30000);
  });

  it('should attach X-Client-Token header to requests', async () => {
    const token = env.NEXT_PUBLIC_CLIENT_TOKEN;

    mock.onGet('/test-token').reply(200);

    await api.get('/test-token');

    expect(mock.history.get.length).toBe(1);
    const request = mock.history.get[0];

    expect(request.headers).toBeDefined();
    expect(request.headers?.['X-Client-Token']).toBe(token);
  });

  it('should not override existing headers when attaching token', async () => {
    const token = env.NEXT_PUBLIC_CLIENT_TOKEN;

    mock.onPost('/test-post').reply(200);

    await api.post('/test-post', {}, {
      headers: {
        'Custom-Header': 'custom-value'
      }
    });

    expect(mock.history.post.length).toBe(1);
    const request = mock.history.post[0];

    expect(request.headers).toBeDefined();
    expect(request.headers?.['X-Client-Token']).toBe(token);
    expect(request.headers?.['Custom-Header']).toBe('custom-value');
  });
});
