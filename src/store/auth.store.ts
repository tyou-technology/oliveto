import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, TokenPair } from "@/lib/types/api.types";

/**
 * Returns null if tokens are absent or contain empty/whitespace values.
 * Prevents stale, corrupted, or partial tokens from being stored or used.
 */
const sanitizeTokens = (tokens: TokenPair | null | undefined): TokenPair | null => {
  if (!tokens) return null;
  if (!tokens.accessToken?.trim() || !tokens.refreshToken?.trim()) return null;
  return tokens;
};

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
      setSession: (user, tokens) => set({ user, tokens: sanitizeTokens(tokens) }),
      setTokens: (tokens) => set({ tokens: sanitizeTokens(tokens) }),
      clearSession: () => set({ user: null, tokens: null }),
    }),
    {
      name: "oliveto-auth",
      // Only persist tokens — user is always fetched fresh from the API.
      partialize: (state) => ({ tokens: state.tokens }),
      // Sanitize persisted tokens on rehydration so invalid/corrupted storage
      // never reaches the app as valid auth state.
      merge: (persisted, current) => ({
        ...current,
        tokens: sanitizeTokens((persisted as Partial<AuthState>).tokens),
      }),
    }
  )
);
