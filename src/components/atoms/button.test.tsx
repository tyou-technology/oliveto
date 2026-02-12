import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from './button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeDefined()
  })

  it('handles loading state', () => {
    render(<Button loading>Loading...</Button>)
    const button = screen.getByRole('button')

    // Check disabled state
    expect(button).toHaveProperty('disabled', true)

    // Check aria-busy
    expect(button.getAttribute('aria-busy')).toBe('true')

    // Check spinner presence (spinner has aria-label="Loading")
    expect(screen.getByLabelText('Loading')).toBeDefined()
  })

  it('loading overrides disabled', () => {
    render(<Button loading disabled={false}>Loading...</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveProperty('disabled', true)
  })

  it('does not render spinner when asChild is true', () => {
    render(
      <Button asChild loading>
        <a href="#">Link</a>
      </Button>
    )
    const link = screen.getByRole('link', { name: /link/i })

    // Should pass aria-busy. Note: asChild merges props, so aria-busy should be passed.
    // However, `disabled` on <a> tag is not standard HTML, but React might pass it.
    // We mainly care that spinner is NOT rendered.

    expect(link.getAttribute('aria-busy')).toBe('true')
    expect(screen.queryByLabelText('Loading')).toBeNull()
  })
})
