import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import { apiClient } from './client';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/lib/config/routes';
import MockAdapter from 'axios-mock-adapter';

vi.mock('@/store/auth.store', () => ({
  useAuthStore: {
    getState: vi.fn(),
  },
}));

const mockAccessToken = 'access-token';
const newAccessToken = 'new-access-token';
const mockAuthResponse = { type: 'Bearer', accessToken: newAccessToken, expiresIn: 3600 };

describe('API Client', () => {
  let mock: MockAdapter;
  let originalLocation: Location;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);

    originalLocation = window.location;
    const win = window as unknown as Record<string, unknown>;
    delete win.location;
    win.location = { href: '', pathname: '/' } as unknown as Location;

    vi.clearAllMocks();
  });

  afterEach(() => {
    mock.restore();
    (window as unknown as Record<string, unknown>).location = originalLocation;
  });

  // ─── Defaults ──────────────────────────────────────────────────────────────

  describe('defaults', () => {
    it('has 30 second timeout', () => {
      expect(apiClient.defaults.timeout).toBe(30000);
    });

    it('has withCredentials set to true', () => {
      expect(apiClient.defaults.withCredentials).toBe(true);
    });
  });

  // ─── Request interceptor ───────────────────────────────────────────────────

  describe('request interceptor', () => {
    it('attaches Authorization header when an access token exists in the store', async () => {
      (useAuthStore.getState as ReturnType<typeof vi.fn>).mockReturnValue({
        accessToken: mockAccessToken,
        clearSession: vi.fn(),
        setAccessToken: vi.fn(),
      });

      let capturedAuthHeader: string | undefined;
      mock.onGet('/protected').reply((config) => {
        capturedAuthHeader = (config.headers as Record<string, string>)['Authorization'];
        return [200, {}];
      });

      await apiClient.get('/protected');
      expect(capturedAuthHeader).toBe(`Bearer ${mockAccessToken}`);
    });

    it('does not attach Authorization header when no token is in the store', async () => {
      (useAuthStore.getState as ReturnType<typeof vi.fn>).mockReturnValue({
        accessToken: null,
        clearSession: vi.fn(),
      });

      let capturedAuthHeader: string | undefined;
      mock.onGet('/public').reply((config) => {
        capturedAuthHeader = (config.headers as Record<string, string>)['Authorization'];
        return [200, {}];
      });

      await apiClient.get('/public');
      expect(capturedAuthHeader).toBeUndefined();
    });
  });

  // ─── Non-401 errors ────────────────────────────────────────────────────────

  describe('non-401 errors', () => {
    beforeEach(() => {
      (useAuthStore.getState as ReturnType<typeof vi.fn>).mockReturnValue({
        accessToken: null,
        clearSession: vi.fn(),
      });
    });

    it('passes through 400 errors without modification', async () => {
      mock.onGet('/bad').reply(400, { error: 'Bad Request' });
      await expect(apiClient.get('/bad')).rejects.toMatchObject({ response: { status: 400 } });
    });

    it('passes through 403 errors without modification', async () => {
      mock.onGet('/forbidden').reply(403);
      await expect(apiClient.get('/forbidden')).rejects.toMatchObject({ response: { status: 403 } });
    });

    it('passes through 500 errors without modification', async () => {
      mock.onGet('/error').reply(500);
      await expect(apiClient.get('/error')).rejects.toMatchObject({ response: { status: 500 } });
    });
  });

  // ─── Auth endpoint 401s ────────────────────────────────────────────────────

  describe('401 on auth endpoints', () => {
    const AUTH_PATHS = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout'];

    AUTH_PATHS.forEach((path) => {
      it(`propagates 401 from ${path} without triggering refresh or redirect`, async () => {
        const clearSessionSpy = vi.fn();
        (useAuthStore.getState as ReturnType<typeof vi.fn>).mockReturnValue({
          accessToken: mockAccessToken,
          clearSession: clearSessionSpy,
        });

        window.location.pathname = '/dashboard';
        mock.onPost(path).reply(401);

        await expect(apiClient.post(path, {})).rejects.toMatchObject({ response: { status: 401 } });

        expect(clearSessionSpy).not.toHaveBeenCalled();
        expect(window.location.href).not.toBe(ROUTES.ADMIN.LOGIN);
      });
    });
  });

  // ─── Protected endpoint 401s ───────────────────────────────────────────────

  describe('401 on protected endpoints', () => {
    it('silently refreshes via cookie and retries the original request', async () => {
      const setAccessTokenSpy = vi.fn();
      (useAuthStore.getState as ReturnType<typeof vi.fn>).mockReturnValue({
        accessToken: mockAccessToken,
        setAccessToken: setAccessTokenSpy,
        clearSession: vi.fn(),
      });

      const axiosPostSpy = vi
        .spyOn(axios, 'post')
        .mockResolvedValueOnce({ data: mockAuthResponse });

      mock.onGet('/protected').replyOnce(401).onGet('/protected').reply(200, { data: 'ok' });

      const response = await apiClient.get('/protected');

      expect(response.data).toEqual({ data: 'ok' });
      expect(setAccessTokenSpy).toHaveBeenCalledWith(newAccessToken);
      // Refresh called with no body (cookie-based) — just a POST to /auth/refresh
      expect(axiosPostSpy).toHaveBeenCalledTimes(1);
      expect(axiosPostSpy).toHaveBeenCalledWith(
        expect.stringContaining('/auth/refresh'),
        undefined,
        expect.objectContaining({ withCredentials: true })
      );

      axiosPostSpy.mockRestore();
    });

    it('clears session and redirects when the refresh cookie is expired (refresh returns error)', async () => {
      const clearSessionSpy = vi.fn();
      (useAuthStore.getState as ReturnType<typeof vi.fn>).mockReturnValue({
        accessToken: mockAccessToken,
        setAccessToken: vi.fn(),
        clearSession: clearSessionSpy,
      });

      const axiosPostSpy = vi
        .spyOn(axios, 'post')
        .mockRejectedValueOnce(new Error('Network error'));

      window.location.pathname = '/dashboard';
      mock.onGet('/protected').reply(401);

      await expect(apiClient.get('/protected')).rejects.toBeDefined();

      expect(clearSessionSpy).toHaveBeenCalled();
      expect(window.location.href).toBe(ROUTES.ADMIN.LOGIN);

      axiosPostSpy.mockRestore();
    });

    it('clears session instead of re-refreshing when the retried request also returns 401', async () => {
      const setAccessTokenSpy = vi.fn();
      const clearSessionSpy = vi.fn();
      (useAuthStore.getState as ReturnType<typeof vi.fn>).mockReturnValue({
        accessToken: mockAccessToken,
        setAccessToken: setAccessTokenSpy,
        clearSession: clearSessionSpy,
      });

      const axiosPostSpy = vi
        .spyOn(axios, 'post')
        .mockResolvedValueOnce({ data: mockAuthResponse });

      window.location.pathname = '/dashboard';
      // Both original and retry return 401
      mock.onGet('/protected').reply(401);

      await expect(apiClient.get('/protected')).rejects.toBeDefined();

      // Refresh was attempted only once — _retry flag prevents a second attempt
      expect(axiosPostSpy).toHaveBeenCalledTimes(1);
      expect(clearSessionSpy).toHaveBeenCalled();

      axiosPostSpy.mockRestore();
    });

    it('does not redirect when already on the login page', async () => {
      const clearSessionSpy = vi.fn();
      (useAuthStore.getState as ReturnType<typeof vi.fn>).mockReturnValue({
        accessToken: null,
        clearSession: clearSessionSpy,
      });

      const axiosPostSpy = vi
        .spyOn(axios, 'post')
        .mockRejectedValueOnce(new Error('cookie expired'));

      window.location.pathname = ROUTES.ADMIN.LOGIN;
      mock.onGet('/protected').reply(401);

      await expect(apiClient.get('/protected')).rejects.toBeDefined();

      expect(clearSessionSpy).toHaveBeenCalled();
      expect(window.location.href).not.toBe(ROUTES.ADMIN.LOGIN);

      axiosPostSpy.mockRestore();
    });
  });

  // ─── Concurrent 401s ───────────────────────────────────────────────────────

  describe('concurrent 401s during an active refresh', () => {
    it('queues concurrent requests and retries all of them after a single refresh', async () => {
      const setAccessTokenSpy = vi.fn();
      (useAuthStore.getState as ReturnType<typeof vi.fn>).mockReturnValue({
        accessToken: mockAccessToken,
        setAccessToken: setAccessTokenSpy,
        clearSession: vi.fn(),
      });

      const axiosPostSpy = vi
        .spyOn(axios, 'post')
        .mockResolvedValueOnce({ data: mockAuthResponse });

      mock.onGet('/resource-a').replyOnce(401).onGet('/resource-a').reply(200, { data: 'A' });
      mock.onGet('/resource-b').replyOnce(401).onGet('/resource-b').reply(200, { data: 'B' });

      const [respA, respB] = await Promise.all([
        apiClient.get('/resource-a'),
        apiClient.get('/resource-b'),
      ]);

      expect(respA.data).toEqual({ data: 'A' });
      expect(respB.data).toEqual({ data: 'B' });
      // Refresh cookie endpoint called only once despite two concurrent 401s
      expect(axiosPostSpy).toHaveBeenCalledTimes(1);
      expect(setAccessTokenSpy).toHaveBeenCalledWith(newAccessToken);

      axiosPostSpy.mockRestore();
    });
  });
});
