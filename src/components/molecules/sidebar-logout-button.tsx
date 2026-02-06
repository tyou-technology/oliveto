"use client";

import { LogOut } from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
import { authStorage } from "@/lib/auth-storage";

export function SidebarLogoutButton() {
  const { clearUser } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    authStorage.removeToken();
    clearUser();
    router.push(ROUTES.ADMIN.LOGIN);
  };

  return (
    <div className="mt-auto p-6 border-t border-white/10">
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Sair</span>
      </button>
    </div>
  );
}
