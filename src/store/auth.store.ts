import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, TokenPair } from "@/lib/types/api.types";

interface AuthState {
  user: User | null;
  tokens: TokenPair | null;
  setSession: (user: User, tokens: TokenPair) => void;
  setTokens: (tokens: TokenPair) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      setSession: (user, tokens) => set({ user, tokens }),
      setTokens: (tokens) => set({ tokens }),
      clearSession: () => set({ user: null, tokens: null }),
    }),
    {
      name: "oliveto-auth",
      partialize: (state) => ({ tokens: state.tokens }),
    }
  )
);
