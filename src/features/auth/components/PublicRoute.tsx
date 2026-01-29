"use client";

import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
import { FullPageLoader } from "@/components/molecules/FullPageLoader";
import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { cookieManager } from "@/lib/cookies";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { setUser } = useUserStore();
  
  // We only want to check validation if there is a token
  const token = typeof window !== 'undefined' ? cookieManager.getToken() : null;

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["validateTokenPublic"],
    queryFn: authApi.validateToken,
    retry: 0,
    enabled: !!token, // Only run if token exists
  });

  useEffect(() => {
    if (isSuccess && data?.valid) {
      setUser(data);
      router.push(ROUTES.ADMIN.DASHBOARD.HOME);
    }
  }, [isSuccess, data, router, setUser]);

  if (token && isLoading) {
    return <FullPageLoader />;
  }

  // If authenticated, we are redirecting, so don't show content
  if (isSuccess && data?.valid) {
    return <FullPageLoader />;
  }

  return <>{children}</>;
};
