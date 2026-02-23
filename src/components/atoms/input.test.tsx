import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Input } from './input'

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(input.tagName).toBe('INPUT')
  })

  it('forwards type prop', () => {
    render(<Input type="email" placeholder="Email" />)
    const input = screen.getByPlaceholderText('Email')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('handles disabled state', () => {
    render(<Input disabled placeholder="Disabled" />)
    const input = screen.getByPlaceholderText('Disabled')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:cursor-not-allowed')
  })

  it('merges custom classes', () => {
    render(<Input className="custom-class" placeholder="Custom" />)
    const input = screen.getByPlaceholderText('Custom')
    expect(input).toHaveClass('custom-class')
    // Should still have base classes
    expect(input).toHaveClass('border-input')
  })

  it('forwards other props', () => {
    render(<Input data-testid="input-test" aria-label="Input Label" />)
    const input = screen.getByTestId('input-test')
    expect(input).toHaveAttribute('aria-label', 'Input Label')
  })
})
