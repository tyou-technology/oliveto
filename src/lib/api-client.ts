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
