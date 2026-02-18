import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { LoginForm } from './login-form'
import { useLogin } from '@/features/auth/hooks/useLogin'

// Mock useLogin hook
vi.mock('@/features/auth/hooks/useLogin', () => ({
  useLogin: vi.fn(),
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}))

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders login form correctly', () => {
    (useLogin as any).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    })

    render(<LoginForm />)

    expect(screen.getByLabelText(/^Email$/i)).toBeTruthy()
    expect(screen.getByLabelText(/^Senha$/i)).toBeTruthy()
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeTruthy()
  })

  it('shows loading state correctly with accessibility attributes', () => {
    (useLogin as any).mockReturnValue({
      mutate: vi.fn(),
      isPending: true,
    })

    render(<LoginForm />)

    // Select the submit button specifically
    // Since text is replaced by spinner currently, we can find it by type="submit"
    // In the improved version, we expect "Carregando..." text

    // We can't rely on text yet as it's not implemented.
    // But once implemented, we expect screen reader text "Carregando..."

    // Let's find the button by its type attribute for now to check attributes
    const buttons = screen.getAllByRole('button')
    const submitButton = buttons.find(b => b.getAttribute('type') === 'submit')

    expect(submitButton).toBeTruthy()

    // Check if button is disabled
    expect(submitButton?.hasAttribute('disabled')).toBe(true)

    // Check for aria-busy
    expect(submitButton?.getAttribute('aria-busy')).toBe('true')

    // Check for screen reader only text "Carregando..."
    expect(screen.getByText(/Carregando/i)).toBeTruthy()
  })
})
