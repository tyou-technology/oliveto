"use client";

import { Bell, LogOut, Menu, Search, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
import { cookieManager } from "@/lib/cookies";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  title: string;
  subtitle: string;
}

export function DashboardHeader({
  onMenuClick,
  title,
  subtitle,
}: DashboardHeaderProps) {
  const { user, clearUser } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    cookieManager.removeToken();
    clearUser();
    router.push(ROUTES.ADMIN.LOGIN);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold">{title}</h1>
            <p className="text-sm text-neutral-400">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          {/*<div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">*/}
          {/*  <Search className="w-4 h-4 text-neutral-400" />*/}
          {/*  <input*/}
          {/*    type="text"*/}
          {/*    placeholder="Buscar..."*/}
          {/*    className="bg-transparent border-none outline-none text-sm w-40 placeholder:text-neutral-500"*/}
          {/*  />*/}
          {/*</div>*/}

          {/* Notifications */}
          {/*<button className="relative p-2 hover:bg-white/10 rounded-xl transition-colors">*/}
          {/*  <Bell className="w-5 h-5" />*/}
          {/*  <span className="absolute top-1 right-1 w-2 h-2 bg-[#00FF90] rounded-full" />*/}
          {/*</button>*/}

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-10 h-10 bg-[#00FF90]/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#00FF90]/30 transition-colors outline-none">
                <User className="w-5 h-5 text-[#00FF90]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[#111] border-white/10 text-white">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-neutral-400">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-400 focus:text-red-400 focus:bg-red-400/10 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
