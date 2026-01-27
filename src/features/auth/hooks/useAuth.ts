import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { ROUTES } from "@/lib/config/routes";

export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginRoute = pathname === ROUTES.ADMIN.LOGIN;
  const isAdminRoute = pathname.startsWith("/admin") && !isLoginRoute;

  // Check if we should run validation (on admin routes OR login route if token exists)
  const hasToken = typeof window !== "undefined" && !!localStorage.getItem("token");
  const shouldValidate = isAdminRoute || (isLoginRoute && hasToken);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["auth-validate"],
    queryFn: authApi.validateToken,
    retry: false,
    enabled: shouldValidate,
  });

  useEffect(() => {
    // Case 1: Protecting Admin Routes
    console.log("IS ADMIN: " + isAdminRoute)
    if (isAdminRoute) {
      console.log("has token: " + hasToken)
      if (!hasToken) {
        router.push(ROUTES.ADMIN.LOGIN);
        return;
      }
      console.log("error: " + isError)
      if (isError) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push(ROUTES.ADMIN.LOGIN);
      }
    }

    // Case 2: Redirecting from Login if already authenticated
    console.log(pathname)
    console.log("is login: " + isLoginRoute + " is succeess: " + isSuccess + " data:" + data)
    if (isLoginRoute && isSuccess && data?.valid) {
      router.push(ROUTES.ADMIN.DASHBOARD.HOME);
    }
  }, [isAdminRoute, isLoginRoute, hasToken, isError, isSuccess, data, router]);

  return {
    user: data,
    isLoading,
    isAuthenticated: !!data?.valid,
  };
};
