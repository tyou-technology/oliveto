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

// Request interceptor to attach mandatory X-Client-Token
api.interceptors.request.use((config) => {
  // Attach the client token to every request.
  // This token is required by the backend security layer to identify the client application.
  // It is safe to expose in the client bundle (NEXT_PUBLIC_) as it validates the application source,
  // not a specific user. User authentication (JWT) happens after this check.
  config.headers['X-Client-Token'] = env.NEXT_PUBLIC_CLIENT_TOKEN;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useUserStore.getState().clearUser();

      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        const loginPath = ROUTES.ADMIN.LOGIN;

        // Prevent redirect loop if already on login page
        // Check for exact match or trailing slash
        const isLoginPage = currentPath === loginPath || currentPath === `${loginPath}/`;

        if (!isLoginPage) {
          window.location.href = loginPath;
        }
      }
    }
    return Promise.reject(error);
  }
);
