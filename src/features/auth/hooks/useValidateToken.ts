import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { QUERY_KEYS } from "@/lib/config/query-keys";
import { isAxiosError } from "axios";

/**
 * Validates the current session and hydrates the auth store.
 *
 * Flow:
 * 1. If no access token is in memory (page reload), attempt a silent refresh
 *    using the HttpOnly refresh_token cookie. If it succeeds the new access
 *    token is stored in-memory and the user profile is fetched.
 * 2. If an access token already exists (same session), skip the refresh and
 *    go straight to fetching the user profile.
 * 3. If either step fails the session is cleared and the caller can redirect
 *    to the login page.
 */
export const useValidateToken = () => {
  const { setSession, setAccessToken, clearSession, accessToken } = useAuthStore();

  // Step 1 — silent refresh (only when there is no in-memory token).
  const {
    data: refreshData,
    isError: refreshFailed,
    isLoading: isRefreshing,
  } = useQuery({
    queryKey: QUERY_KEYS.AUTH.REFRESH,
    queryFn: authService.refresh,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !accessToken,
    staleTime: Infinity,
  });

  // Persist the refreshed token in-memory so the request interceptor can use it.
  useEffect(() => {
    if (refreshData?.accessToken) {
      setAccessToken(refreshData.accessToken);
    }
  }, [refreshData, setAccessToken]);

  const effectiveToken = accessToken ?? refreshData?.accessToken ?? null;

  // Step 2 — fetch the user profile once we have a valid access token.
  const {
    data: user,
    isError: meFailed,
    error: meError,
    isLoading: isLoadingMe,
  } = useQuery({
    queryKey: QUERY_KEYS.AUTH.ME,
    queryFn: authService.getMe,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!effectiveToken,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (user && effectiveToken) {
      setSession(user, effectiveToken);
    }
  }, [user, effectiveToken, setSession]);

  useEffect(() => {
    // Clear session only on definitive auth failures:
    // - refresh failed (no valid cookie)
    // - ME returned 401 (token rejected by server)
    // Transient network errors on ME do NOT clear the session to avoid
    // logging the user out due to temporary connectivity issues.
    const isAuthFailure =
      meFailed && isAxiosError(meError) && meError.response?.status === 401;

    if (refreshFailed || isAuthFailure) {
      clearSession();
    }
  }, [refreshFailed, meFailed, meError, clearSession]);

  // Show loading while refreshing (no token yet) or while fetching the profile.
  const isLoading = (!accessToken && isRefreshing) || (!!effectiveToken && isLoadingMe);

  return {
    isAuthenticated: !!user,
    user,
    isLoading,
    isError: refreshFailed || meFailed,
    error: null,
  };
};
