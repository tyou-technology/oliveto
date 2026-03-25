"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
import { FullPageLoader } from "@/components/molecules/FullPageLoader";
import { QUERY_KEYS } from "@/lib/config/query-keys";

/**
 * Renders children (the login page) only when the user is not authenticated.
 * If the browser still has a valid HttpOnly refresh_token cookie, the user is
 * silently refreshed and redirected to the dashboard before the login form appears.
 */
export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { setSession, setAccessToken, accessToken } = useAuthStore();

  // Attempt a silent refresh if there is no token in memory (page reload).
  const {
    data: refreshData,
    isLoading: isRefreshing,
    isError: refreshFailed,
  } = useQuery({
    queryKey: QUERY_KEYS.AUTH.REFRESH,
    queryFn: authService.refresh,
    retry: false,
    enabled: !accessToken,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (refreshData?.accessToken) {
      setAccessToken(refreshData.accessToken);
    }
  }, [refreshData, setAccessToken]);

  const effectiveToken = accessToken ?? refreshData?.accessToken ?? null;

  const { data: user, isLoading: isLoadingUser, isSuccess } = useQuery({
    queryKey: QUERY_KEYS.AUTH.ME,
    queryFn: authService.getMe,
    retry: 0,
    enabled: !!effectiveToken,
  });

  useEffect(() => {
    if (isSuccess && user && effectiveToken) {
      setSession(user, effectiveToken);
      router.push(ROUTES.ADMIN.DASHBOARD.HOME);
    }
  }, [isSuccess, user, effectiveToken, router, setSession]);

  const isLoading = (!accessToken && isRefreshing) || (!!effectiveToken && isLoadingUser);
  const isRedirecting = isSuccess && !!user;

  if (isLoading || isRedirecting) {
    return <FullPageLoader />;
  }

  // Refresh failed or no cookie present — user is not authenticated, show login.
  if (refreshFailed || !effectiveToken) {
    return <>{children}</>;
  }

  return <>{children}</>;
};
