import { create } from "zustand";
import { User } from "@/lib/types/api.types";

interface AuthState {
  user: User | null;
  // Access token lives in memory only — never persisted to localStorage.
  // On page reload it is gone; a silent refresh (POST /auth/refresh) restores
  // it from the HttpOnly cookie that the browser sends automatically.
  accessToken: string | null;
  setSession: (user: User, accessToken: string) => void;
  setAccessToken: (accessToken: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  accessToken: null,
  setSession: (user, accessToken) => set({ user, accessToken }),
  setAccessToken: (accessToken) => set({ accessToken }),
  clearSession: () => set({ user: null, accessToken: null }),
}));
