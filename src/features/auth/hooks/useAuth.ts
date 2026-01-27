import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTES } from "@/lib/config/routes";
import { useUserStore } from "@/stores/useUserStore";

export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginRoute = pathname === ROUTES.ADMIN.LOGIN;
  const isAdminRoute = pathname.startsWith("/admin") && !isLoginRoute;
  const { setUser, clearUser } = useUserStore();

  // Initialize checking state based on whether we potentially need to validate
  // If we are on login route or admin route, we start in checking state
  const [isChecking, setIsChecking] = useState(isLoginRoute || isAdminRoute);

  const hasToken = typeof window !== "undefined" && !!localStorage.getItem("token");
  const shouldValidate = isAdminRoute || (isLoginRoute && hasToken);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["auth-validate"],
    queryFn: authApi.validateToken,
    retry: false,
    enabled: shouldValidate,
  });

  useEffect(() => {
    // If we don't need to validate (e.g. public route), stop checking immediately
    if (!shouldValidate) {
      setIsChecking(false);
      return;
    }

    // If validation is still loading, keep checking
    if (isLoading) {
      return;
    }

    // Validation finished (success or error)
    // We only set isChecking to false AFTER we've handled the redirects
    // This keeps the loader visible during the redirect process

    if (isAdminRoute) {
      if (!hasToken) {
        router.push(ROUTES.ADMIN.LOGIN);
        setIsChecking(false);
        return;
      }

      if (isError) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        clearUser();
        router.push(ROUTES.ADMIN.LOGIN);
        setIsChecking(false);
        return;
      }
    }

    if (isLoginRoute && isSuccess && data?.valid) {
      setUser(data);
      router.push(ROUTES.ADMIN.DASHBOARD.HOME);
      // Don't set isChecking to false here, let the redirect happen while loading
      return; 
    }

    if (isSuccess && data?.valid) {
      setUser(data);
    }

    // If no redirect happened, we are done checking
    setIsChecking(false);

  }, [isAdminRoute, isLoginRoute, hasToken, isError, isSuccess, data, router, shouldValidate, isLoading, setUser, clearUser]);

  return {
    user: data,
    isLoading: isChecking || isLoading,
    isAuthenticated: !!data?.valid,
  };
};
