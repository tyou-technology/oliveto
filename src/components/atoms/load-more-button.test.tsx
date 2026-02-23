import { render, screen, fireEvent } from '@testing-library/react'
import { LoadMoreButton } from './load-more-button'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'

describe('LoadMoreButton', () => {
  it('renders correctly', () => {
    render(<LoadMoreButton text="Load More" />)
    expect(screen.getByRole('button', { name: /Load More/i })).toBeDefined()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<LoadMoreButton text="Load More" onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<LoadMoreButton text="Load More" disabled />)
    expect(screen.getByRole('button')).toHaveProperty('disabled', true)
  })

  it('shows loading spinner when loading is true', () => {
    render(<LoadMoreButton text="Load More" loading />)
    // Expect spinner to be present
    expect(screen.getByLabelText('Carregando...')).toBeDefined()
    // Expect button to be disabled
    expect(screen.getByRole('button')).toHaveProperty('disabled', true)
    // Expect aria-busy to be true
    expect(screen.getByRole('button').getAttribute('aria-busy')).toBe('true')
  })
})
