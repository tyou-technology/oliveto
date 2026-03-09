import axios from "axios";
import { env } from "@/lib/env";
import { useUserStore } from "@/stores/useUserStore";
import { ROUTES } from "@/lib/config/routes";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL.replace(/\/$/, ""),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor to attach mandatory X-Client-Token and Authorization header
api.interceptors.request.use((config) => {
  // Attach the client token to every request.
  config.headers['X-Client-Token'] = env.NEXT_PUBLIC_CLIENT_TOKEN;

  // Attach Access Token if available
  const accessToken = useUserStore.getState().accessToken;
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401
    if (error.response?.status === 401) {
      // If it was already a retry, it means refresh failed or token is still invalid -> Logout
      if (originalRequest._retry) {
        useUserStore.getState().clearAuth();
        if (typeof window !== "undefined" && !window.location.pathname.includes(ROUTES.ADMIN.LOGIN)) {
           window.location.href = ROUTES.ADMIN.LOGIN;
        }
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = useUserStore.getState().refreshToken;

      if (!refreshToken) {
        useUserStore.getState().clearAuth();
        if (typeof window !== "undefined" && !window.location.pathname.includes(ROUTES.ADMIN.LOGIN)) {
           window.location.href = ROUTES.ADMIN.LOGIN;
        }
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
          refreshToken,
        }, {
            headers: {
                'X-Client-Token': env.NEXT_PUBLIC_CLIENT_TOKEN
            }
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

        useUserStore.getState().setTokens(newAccessToken, newRefreshToken);

        api.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;

        processQueue(null, newAccessToken);
        isRefreshing = false;

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        useUserStore.getState().clearAuth();
        if (typeof window !== "undefined" && !window.location.pathname.includes(ROUTES.ADMIN.LOGIN)) {
           window.location.href = ROUTES.ADMIN.LOGIN;
        }
        isRefreshing = false;
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
