import { render, screen } from '@testing-library/react'
import { HeroSection } from './hero-section'
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

// Mock ScrambleText
vi.mock('@/components/atoms/scramble-text', () => ({
  ScrambleText: () => <span>Mock ScrambleText</span>
}))

describe('HeroSection', () => {
  it('renders image with sizes prop', () => {
    render(<HeroSection />)
    const img = screen.getByAltText('Banner Words')
    expect(img).toBeTruthy()
    // Assertion for expected sizes prop
    expect(img.getAttribute('sizes')).toBe('(max-width: 1920px) 100vw, 1920px')
  })
})
