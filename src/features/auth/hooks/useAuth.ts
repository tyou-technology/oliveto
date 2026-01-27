import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTES } from "@/lib/config/routes";

export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginRoute = pathname === ROUTES.ADMIN.LOGIN;
  const isAdminRoute = pathname.startsWith("/admin") && !isLoginRoute;

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
    if (!shouldValidate) {
      setIsChecking(false);
      return;
    }

    if (isLoading) {
      return;
    }

    if (isAdminRoute) {
      if (!hasToken) {
        router.push(ROUTES.ADMIN.LOGIN);
        setIsChecking(false);
        return;
      }

      if (isError) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push(ROUTES.ADMIN.LOGIN);
        setIsChecking(false);
        return;
      }
    }

    if (isLoginRoute && isSuccess && data?.valid) {
      router.push(ROUTES.ADMIN.DASHBOARD.HOME);
      return;
    }

    setIsChecking(false);

  }, [isAdminRoute, isLoginRoute, hasToken, isError, isSuccess, data, router, shouldValidate, isLoading]);

  return {
    user: data,
    isLoading: isChecking || isLoading,
    isAuthenticated: !!data?.valid,
  };
};
