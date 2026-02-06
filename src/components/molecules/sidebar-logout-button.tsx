"use client";

import { LogOut } from "lucide-react";
import { useLogout } from "@/features/auth/hooks/useLogout";

export function SidebarLogoutButton() {
  const { mutate: logout } = useLogout();

  return (
    <div className="mt-auto p-6 border-t border-white/10">
      <button
        onClick={() => logout()}
        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Sair</span>
      </button>
    </div>
  );
}
