import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SidebarNavigation } from "./sidebar-navigation";
import { usePathname } from "next/navigation";
import { useUnreadLeadsCount } from "@/features/leads/hooks";
import { ROUTES } from "@/lib/config/routes";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

// Mock useUnreadLeadsCount
vi.mock("@/features/leads/hooks", () => ({
  useUnreadLeadsCount: vi.fn(),
}));

describe("SidebarNavigation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useUnreadLeadsCount as any).mockReturnValue({ data: { count: 0 } });
  });

  it("renders navigation items correctly", () => {
    (usePathname as any).mockReturnValue("/admin/dashboard");
    render(<SidebarNavigation />);

    expect(screen.getByText("Visão Geral")).not.toBeNull();
    expect(screen.getByText("Artigos")).not.toBeNull();
    expect(screen.getByText("Contatos")).not.toBeNull();
  });

  it("highlights the active link based on pathname", () => {
    (usePathname as any).mockReturnValue(ROUTES.ADMIN.DASHBOARD.HOME);
    render(<SidebarNavigation />);

    const activeLink = screen.getByText("Visão Geral").closest("a");
    const inactiveLink = screen.getByText("Artigos").closest("a");

    expect(activeLink?.className).not.toEqual(inactiveLink?.className);
    expect(activeLink?.className).toContain("bg-primary/10");
    expect(activeLink?.className).toContain("text-primary");
  });

  it("shows unread count badge for Contatos when count > 0", () => {
    (usePathname as any).mockReturnValue("/some/other/path");
    (useUnreadLeadsCount as any).mockReturnValue({ data: { count: 5 } });

    render(<SidebarNavigation />);

    const contatosLink = screen.getByText("Contatos").closest("a");
    expect(contatosLink).not.toBeNull();

    const badge = screen.getByText("5");
    expect(badge).not.toBeNull();
    expect(badge.className).toContain("bg-primary");
    expect(badge.className).toContain("text-primary-foreground");
  });

  it("does not show badge if count is 0", () => {
    (usePathname as any).mockReturnValue("/some/other/path");
    (useUnreadLeadsCount as any).mockReturnValue({ data: { count: 0 } });

    render(<SidebarNavigation />);

    const badge = screen.queryByText("0");
    expect(badge).toBeNull();
  });
});
