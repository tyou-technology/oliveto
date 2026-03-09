"use client";

import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
import { FullPageLoader } from "@/components/molecules/FullPageLoader";
import { useEffect } from "react";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { setSession, tokens } = useAuthStore();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["auth", "me", "public"],
    queryFn: authService.getMe,
    retry: 0,
    enabled: !!tokens?.accessToken,
  });

  useEffect(() => {
    if (isSuccess && data && tokens) {
      setSession(data, tokens);
      router.push(ROUTES.ADMIN.DASHBOARD.HOME);
    }
  }, [isSuccess, data, tokens, router, setSession]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (isSuccess && data) {
    return <FullPageLoader />;
  }

  return <>{children}</>;
};
