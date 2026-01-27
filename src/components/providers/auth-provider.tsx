"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoadingScreen } from "../molecules/loading-screen";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen isLoading={true} />;
  }

  return <>{children}</>;
}
