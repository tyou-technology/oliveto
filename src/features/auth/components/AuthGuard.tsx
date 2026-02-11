"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useValidateToken } from "../hooks/useValidateToken";
import { FullPageLoader } from "@/components/molecules/FullPageLoader";
import { ROUTES } from "@/lib/config/routes";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useValidateToken();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(ROUTES.ADMIN.LOGIN);
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
