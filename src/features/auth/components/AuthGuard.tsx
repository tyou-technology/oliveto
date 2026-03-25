"use client";

import { useEffect } from "react";
import { useValidateToken } from "../hooks/useValidateToken";
import { FullPageLoader } from "@/components/molecules/FullPageLoader";
import { ROUTES } from "@/lib/config/routes";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useValidateToken();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Hard redirect fully resets React/React Query state,
      // preventing stale cache from keeping the user in a broken state.
      window.location.href = ROUTES.ADMIN.LOGIN;
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
