"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/lib/constants/dashboard";
import { cn } from "@/lib/utils";

export function SidebarNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              isActive
                ? "bg-[#00FF90]/10 text-[#00FF90]"
                : "text-neutral-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon
              className={cn("w-5 h-5", isActive ? "text-[#00FF90]" : "")}
            />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="px-2 py-0.5 text-xs bg-[#00FF90] text-black rounded-full font-medium">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
