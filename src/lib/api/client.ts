import axios, { AxiosError } from "axios";
import { env } from "@/lib/env";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/lib/config/routes";
import { TokenPair } from "@/lib/types/api.types";

export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL.replace(/\/$/, ""),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000,
});

// Request interceptor — attach Authorization header
apiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().tokens?.accessToken;
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
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

// Response interceptor — handle 401 with automatic token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean };

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      useAuthStore.getState().clearSession();
      redirectToLogin();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers!["Authorization"] = `Bearer ${token}`;
          return apiClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    const refreshToken = useAuthStore.getState().tokens?.refreshToken;

    if (!refreshToken) {
      useAuthStore.getState().clearSession();
      redirectToLogin();
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const response = await axios.post<{ data: TokenPair }>(
        `${env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        { refreshToken },
        {
          headers: {
            "X-Client-Token": env.NEXT_PUBLIC_CLIENT_TOKEN,
          },
        }
      );

      const newTokens = response.data.data;
      useAuthStore.getState().setTokens(newTokens);

      apiClient.defaults.headers.common["Authorization"] = `Bearer ${newTokens.accessToken}`;
      originalRequest.headers!["Authorization"] = `Bearer ${newTokens.accessToken}`;

      processQueue(null, newTokens.accessToken);
      return apiClient(originalRequest);
    } catch (err) {
      processQueue(err, null);
      useAuthStore.getState().clearSession();
      redirectToLogin();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);
