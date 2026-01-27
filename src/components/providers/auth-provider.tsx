"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuth();
  return <>{children}</>;
}
