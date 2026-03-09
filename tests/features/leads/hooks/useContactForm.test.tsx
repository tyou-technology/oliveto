import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock env before other imports
vi.mock('@/lib/env', () => ({
  env: {
    NEXT_PUBLIC_API_URL: 'http://test-api.com',
  },
}));

import { renderHook, act } from '@testing-library/react';
import { useContactForm } from '@/features/leads/hooks/useContactForm';
import { useCreateLead } from '@/features/leads/hooks/useCreateLead';
import { toast } from 'sonner';


// Mock dependencies
vi.mock('@/features/leads/hooks/useCreateLead');
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock useForm to bypass validation and just execute the submit handler
vi.mock('react-hook-form', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-hook-form')>();
  return {
    ...actual,
    useForm: () => ({
      handleSubmit: (fn: (data: any) => void) => async (data: any) => {
          await fn(data);
      },
      reset: vi.fn(),
      control: {},
      register: vi.fn(),
      formState: { errors: {} },
    }),
  };
});

describe('useContactForm', () => {
  const mockCreateLead = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useCreateLead as any).mockReturnValue({
      mutateAsync: mockCreateLead,
      isPending: false,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should log error to console when submission fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Submission failed');
    mockCreateLead.mockRejectedValue(error);

    const { result } = renderHook(() => useContactForm());

    const formData = {
      nome: 'John Doe',
      email: 'john@example.com',
      telefone: '1234567890',
      mensagem: 'Hello',
      cidade: 'City',
    };

    await act(async () => {
      // With our mock, onSubmit takes the data directly
      await result.current.onSubmit(formData as any);
    });

    expect(mockCreateLead).toHaveBeenCalled();
    // Verify the fix: generic message is logged, NOT the error object
    expect(consoleSpy).toHaveBeenCalledWith("Error submitting contact form");
    expect(consoleSpy).not.toHaveBeenCalledWith(error);
  });
});
