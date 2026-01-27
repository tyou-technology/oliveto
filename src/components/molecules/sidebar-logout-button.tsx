"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
import { useUserStore } from "@/stores/useUserStore";

export function SidebarLogoutButton() {
  const router = useRouter();
  const { clearUser } = useUserStore();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    clearUser();
    router.push(ROUTES.ADMIN.LOGIN);
  };

  return (
    <div className="p-4 border-t border-white/10">
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 w-full text-neutral-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-200 cursor-pointer"
      >
        <LogOut className="w-5 h-5" />
        <span>Sair</span>
      </button>
    </div>
  );
}
