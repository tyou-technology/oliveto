import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { env } from "@/lib/env";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/lib/config/routes";
import { AuthTokenResponse } from "@/lib/types/api.types";

// Auth endpoints must never trigger a token-refresh retry — doing so would
// cause infinite loops (refresh calling refresh) or incorrect session clears
// (login with bad credentials clearing an existing session).
const AUTH_ENDPOINTS = ["/auth/login", "/auth/register", "/auth/refresh", "/auth/logout"];
const isAuthEndpoint = (url?: string): boolean =>
  !!url && AUTH_ENDPOINTS.some((path) => url.includes(path));

export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL.replace(/\/$/, ""),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000,
});

// Request interceptor — attach Authorization header from in-memory store.
// The access token is never read from localStorage; it only lives in Zustand.
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

const redirectToLogin = () => {
  if (
    typeof window !== "undefined" &&
    !window.location.pathname.includes(ROUTES.ADMIN.LOGIN)
  ) {
    window.location.href = ROUTES.ADMIN.LOGIN;
  }
};

// Response interceptor — transparent token refresh on 401.
// The refresh token is an HttpOnly cookie; the browser sends it automatically
// on every POST /auth/refresh — no manual token reading or passing needed.
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Auth endpoints propagate their 401s directly to the calling hook.
    if (isAuthEndpoint(originalRequest?.url)) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      // Retried with a fresh token but still got 401 — give up.
      useAuthStore.getState().clearSession();
      redirectToLogin();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue this request; it will be retried once the in-flight refresh finishes.
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest._retry = true;
          originalRequest.headers!["Authorization"] = `Bearer ${token}`;
          return apiClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Use raw axios (not apiClient) to bypass this interceptor.
      // withCredentials ensures the browser sends the HttpOnly refresh_token cookie.
      const { data } = await axios.post<{ data: AuthTokenResponse }>(
        `${env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        undefined,
        { withCredentials: true }
      );

      useAuthStore.getState().setAccessToken(data.data.accessToken);
      originalRequest.headers!["Authorization"] = `Bearer ${data.data.accessToken}`;

      processQueue(null, data.data.accessToken);
      return apiClient(originalRequest);
    } catch (refreshErr) {
      processQueue(refreshErr, null);
      useAuthStore.getState().clearSession();
      redirectToLogin();
      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  }
);
