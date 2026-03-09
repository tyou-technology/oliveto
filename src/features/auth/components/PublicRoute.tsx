"use client";

import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
import { FullPageLoader } from "@/components/molecules/FullPageLoader";
import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { setUser } = useUserStore();
  
  // Always check validation
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["validateTokenPublic"],
    queryFn: authApi.validateToken,
    retry: 0,
    // We expect 401 if not logged in, which will be handled by isSuccess being false
    enabled: true,
  });

  useEffect(() => {
    if (isSuccess && data?.valid) {
      setUser(data);
      router.push(ROUTES.ADMIN.DASHBOARD.HOME);
    }
  }, [isSuccess, data, router, setUser]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  // If authenticated, we are redirecting, so don't show content
  if (isSuccess && data?.valid) {
    return <FullPageLoader />;
  }

  return <>{children}</>;
};
