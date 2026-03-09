import { render, screen } from '@testing-library/react'
import { PageBackgroundWords } from './page-background-words'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/sobre',
}))

describe('PageBackgroundWords', () => {
  it('renders image with sizes prop', () => {
    render(<PageBackgroundWords />)
    const img = screen.getByAltText('Banner Words')
    expect(img).toBeTruthy()
    expect(img.getAttribute('sizes')).toBe('(max-width: 500px) 100vw, 500px')
  })
})
