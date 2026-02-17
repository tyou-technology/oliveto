import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FormField } from './form-field'

describe('FormField', () => {
  it('renders input with correct accessibility attributes when error is present', () => {
    const errorMsg = 'Invalid email'
    render(
      <FormField
        label="Email"
        name="email"
        error={errorMsg}
        placeholder="Enter email"
      />
    )

    const input = screen.getByPlaceholderText('Enter email')

    // Check if input has aria-invalid="true"
    expect(input.getAttribute('aria-invalid')).toBe('true')

    // Check if input is described by the error message
    const errorElement = screen.getByText(errorMsg)
    const errorId = errorElement.getAttribute('id')
    expect(errorId).toBeTruthy()
    expect(input.getAttribute('aria-describedby')).toBe(errorId)

    // Check if error message has role="alert"
    expect(errorElement.getAttribute('role')).toBe('alert')
  })

  it('renders input without error attributes when no error is present', () => {
    render(
      <FormField
        label="Email"
        name="email"
        placeholder="Enter email"
      />
    )

    const input = screen.getByPlaceholderText('Enter email')
    expect(input.hasAttribute('aria-invalid')).toBe(false)
    expect(input.hasAttribute('aria-describedby')).toBe(false)
  })

  it('uses provided id if available', () => {
    render(
      <FormField
        label="Email"
        name="email"
        id="custom-email-id"
        placeholder="Enter email"
      />
    )

    const input = screen.getByPlaceholderText('Enter email')
    expect(input.getAttribute('id')).toBe('custom-email-id')

    // Label should point to the custom ID
    const label = screen.getByText('Email')
    expect(label.getAttribute('for')).toBe('custom-email-id')
  })

  it('falls back to name as id if id is not provided', () => {
    render(
      <FormField
        label="Email"
        name="email"
        placeholder="Enter email"
      />
    )

    const input = screen.getByPlaceholderText('Enter email')
    expect(input.getAttribute('id')).toBe('email')

    // Label should point to name
    const label = screen.getByText('Email')
    expect(label.getAttribute('for')).toBe('email')
  })

  it('password toggle button has focus styles', () => {
      render(
          <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter password"
          />
      )

      const toggleButton = screen.getByLabelText('Mostrar senha')
      expect(toggleButton.className).toContain('focus-visible:ring-2')
  })
})
