"use client";

import { useState } from "react";
import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { DashboardSidebar } from "@/components/organisms/dashboard-sidebar";
import { DashboardHeader } from "@/components/organisms/dashboard-header";
import { useUserStore } from "@/stores/useUserStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useUserStore();

  const getFormattedName = (fullName: string | undefined) => {
    if (!fullName) return "Usuário";
    const names = fullName.trim().split(/\s+/);
    if (names.length === 1) return names[0];
    return `${names[0]} ${names[names.length - 1]}`;
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-neutral-950 text-white flex">
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 min-w-0">
          <DashboardHeader
            onMenuClick={() => setSidebarOpen(true)}
            title={`Bem-vindo, ${getFormattedName(user?.name)}`}
            subtitle="Painel Administrativo"
          />
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
