"use client";

import { useValidateToken } from "../hooks/useValidateToken";
import { FullPageLoader } from "@/components/molecules/FullPageLoader";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useValidateToken();

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
