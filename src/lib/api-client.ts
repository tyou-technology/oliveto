import axios from "axios";
import { env } from "@/lib/env";
import { authStorage } from "./auth-storage";
import { useUserStore } from "@/stores/useUserStore";
import { ROUTES } from "@/lib/config/routes";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = authStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authStorage.removeToken();
      useUserStore.getState().clearUser();

      if (typeof window !== "undefined" && !window.location.pathname.includes(ROUTES.ADMIN.LOGIN)) {
        window.location.href = ROUTES.ADMIN.LOGIN;
      }
    }
    return Promise.reject(error);
  }
);
