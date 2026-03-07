import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TokenValidationResponse } from "@/features/auth/types/auth.types";

interface UserState {
  user: TokenValidationResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: TokenValidationResponse) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      clearAuth: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      partialize: (state) => ({ accessToken: state.accessToken, refreshToken: state.refreshToken }), // only persist tokens
    }
  )
);
