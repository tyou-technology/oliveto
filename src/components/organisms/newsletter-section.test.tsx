import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NewsletterSection } from "./newsletter-section";
import { useCreateLead } from "@/features/leads/hooks";

// Mock the hook module
vi.mock("@/features/leads/hooks", () => ({
  useCreateLead: vi.fn(),
}));

describe("NewsletterSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useCreateLead as any).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
    });
  });

  it("renders the form fields correctly", () => {
    render(<NewsletterSection />);

    expect(screen.getByLabelText(/Nome completo/i)).toBeTruthy();
    expect(screen.getByLabelText(/E-mail/i)).toBeTruthy();
    expect(screen.getByLabelText(/WhatsApp/i)).toBeTruthy();
    expect(screen.getByRole("button", { name: /Quero o E-book Gratuito/i })).toBeTruthy();
  });

  it("validates required fields", async () => {
    render(<NewsletterSection />);

    // Try to submit empty form
    const submitButton = screen.getByRole("button", { name: /Quero o E-book Gratuito/i });
    fireEvent.click(submitButton);

    // Check for validation messages
    // Assuming Shadcn FormMessage renders text
    await waitFor(() => {
      expect(screen.getByText("Nome é obrigatório")).toBeTruthy();
      expect(screen.getByText("Email inválido")).toBeTruthy();
    });
  });

  it("validates email format", async () => {
    const mockMutate = vi.fn();
    (useCreateLead as any).mockReturnValue({
      mutateAsync: mockMutate,
      isPending: false,
    });

    render(<NewsletterSection />);

    fireEvent.change(screen.getByLabelText(/Nome completo/i), { target: { value: "Valid Name" } });

    const emailInput = screen.getByLabelText(/E-mail/i);
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    const submitButton = screen.getByRole("button", { name: /Quero o E-book Gratuito/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Email inválido")).toBeTruthy();
    });

    // Ensure mutate was NOT called
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("submits the form with valid data", async () => {
    const mockMutate = vi.fn().mockResolvedValue({});
    (useCreateLead as any).mockReturnValue({
      mutateAsync: mockMutate,
      isPending: false,
    });

    render(<NewsletterSection />);

    fireEvent.change(screen.getByLabelText(/Nome completo/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/WhatsApp/i), { target: { value: "123456789" } });

    const submitButton = screen.getByRole("button", { name: /Quero o E-book Gratuito/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(expect.objectContaining({
        name: "John Doe",
        email: "john@example.com",
        phone: "123456789",
        origin: "RICH_MATERIAL", // LeadOrigin.RICH_MATERIAL
      }));
    });

    // Expect success message
    await waitFor(() => {
      expect(screen.getByText(/Cadastro Realizado!/i)).toBeTruthy();
    });
  });

  it("handles API error gracefully", async () => {
    const mockMutate = vi.fn().mockRejectedValue(new Error("API Error"));
    (useCreateLead as any).mockReturnValue({
      mutateAsync: mockMutate,
      isPending: false,
    });

    // Mock console.error to avoid noise in test output
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<NewsletterSection />);

    fireEvent.change(screen.getByLabelText(/Nome completo/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: "john@example.com" } });

    const submitButton = screen.getByRole("button", { name: /Quero o E-book Gratuito/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });

    // Should NOT show success message
    expect(screen.queryByText(/Cadastro Realizado!/i)).toBeNull();

    // Should still show form (or at least button)
    expect(screen.getByRole("button", { name: /Quero o E-book Gratuito/i })).toBeTruthy();

    // Verify safe logging
    expect(consoleSpy).toHaveBeenCalledWith("Newsletter subscription failed");

    consoleSpy.mockRestore();
  });

  it("checks maxLength attributes", () => {
    render(<NewsletterSection />);

    expect(screen.getByLabelText(/Nome completo/i).getAttribute("maxLength")).toBe("100");
    expect(screen.getByLabelText(/E-mail/i).getAttribute("maxLength")).toBe("100");
    expect(screen.getByLabelText(/WhatsApp/i).getAttribute("maxLength")).toBe("20");
  });
});
