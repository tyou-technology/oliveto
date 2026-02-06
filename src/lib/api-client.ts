import axios from "axios";
import { env } from "@/lib/env";
import { useUserStore } from "@/stores/useUserStore";
import { ROUTES } from "@/lib/config/routes";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
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

      if (typeof window !== "undefined" && !window.location.pathname.includes(ROUTES.ADMIN.LOGIN)) {
        window.location.href = ROUTES.ADMIN.LOGIN;
      }
    }
    return Promise.reject(error);
  }
);
