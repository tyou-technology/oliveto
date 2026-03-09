import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DataTable } from "./data-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";

// Mock ResizeObserver which is used by some Radix components
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
];

describe("DataTable Accessibility", () => {
  it("renders search input with aria-label", () => {
    render(<DataTable columns={columns} data={data} searchKey="email" />);

    // Check if input exists
    const searchInput = screen.getByPlaceholderText("Filtrar...");
    expect(searchInput).toBeTruthy();
    expect(searchInput.getAttribute("aria-label")).toBe("Filtrar tabela");
  });

  it("renders pagination controls with correct accessibility attributes", () => {
    render(<DataTable columns={columns} data={data} />);

    const rowsPerPageLabel = screen.getByText("Linhas por página");
    expect(rowsPerPageLabel.getAttribute("id")).toBe("rows-per-page-label");

    const selectTrigger = screen.getByRole("combobox");
    expect(selectTrigger.getAttribute("aria-labelledby")).toBe("rows-per-page-label");
  });

  it("renders pagination icons with aria-hidden", () => {
    render(<DataTable columns={columns} data={data} />);

    const firstPageButton = screen.getByRole("button", { name: /primeira página/i });
    const firstPageIcon = firstPageButton.querySelector("svg");
    expect(firstPageIcon?.getAttribute("aria-hidden")).toBe("true");

    const previousPageButton = screen.getByRole("button", { name: /página anterior/i });
    const previousPageIcon = previousPageButton.querySelector("svg");
    expect(previousPageIcon?.getAttribute("aria-hidden")).toBe("true");

    const nextPageButton = screen.getByRole("button", { name: /próxima página/i });
    const nextPageIcon = nextPageButton.querySelector("svg");
    expect(nextPageIcon?.getAttribute("aria-hidden")).toBe("true");

    const lastPageButton = screen.getByRole("button", { name: /última página/i });
    const lastPageIcon = lastPageButton.querySelector("svg");
    expect(lastPageIcon?.getAttribute("aria-hidden")).toBe("true");
  });
});
