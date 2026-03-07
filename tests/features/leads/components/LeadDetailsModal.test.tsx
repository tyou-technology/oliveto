import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LeadDetailsModal } from "@/features/leads/components/LeadDetailsModal";
import { LeadOrigin } from "@/features/leads/types";

// Mock the hook
vi.mock("@/features/leads/hooks", () => ({
  useMarkLeadAsRead: () => ({
    mutate: vi.fn(),
  }),
}));

// Mock Dialog components to simplify rendering
vi.mock("@/components/atoms/dialog", () => {
  return {
    Dialog: ({ children, open }: any) => (
        open ? <div data-testid="dialog">{children}</div> : null
    ),
    DialogContent: ({ children }: any) => <div>{children}</div>,
    DialogHeader: ({ children }: any) => <div>{children}</div>,
    DialogTitle: ({ children }: any) => <div>{children}</div>,
    DialogDescription: ({ children }: any) => <div>{children}</div>,
  };
});

describe("LeadDetailsModal", () => {
  const mockLead = {
    id: "123",
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    message: "Hello world",
    origin: LeadOrigin.CONTACT_FORM,
    isRead: false,
    createdAt: "2023-01-01T00:00:00.000Z",
  } as any;

  it("renders lead details correctly", () => {
    render(<LeadDetailsModal lead={mockLead} onClose={() => {}} />);

    expect(screen.getByText("John Doe")).toBeTruthy();
    expect(screen.getByText("john@example.com")).toBeTruthy();
    expect(screen.getByText("1234567890")).toBeTruthy();
    // the label depends on formatting logic which uses CONTACT_FORM now
    expect(screen.getByText("Formulário de Contato")).toBeTruthy();
    expect(screen.getByText("Hello world")).toBeTruthy();
  });
});
