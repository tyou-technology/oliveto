import { create } from "zustand";
import { TokenValidationResponse } from "@/features/auth/types/auth.types";

interface UserState {
  user: TokenValidationResponse | null;
  setUser: (user: TokenValidationResponse) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
