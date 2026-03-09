import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    expect(cn('base', 'extra')).toBe('base extra')
  })

  it('should handle conditional classes', () => {
    expect(cn('base', true && 'is-true', false && 'is-false')).toBe('base is-true')
  })

  it('should handle falsy values', () => {
    expect(cn('base', null, undefined, 0, false, '')).toBe('base')
  })

  it('should handle objects', () => {
    expect(cn('base', { 'is-true': true, 'is-false': false })).toBe('base is-true')
  })

  it('should handle arrays', () => {
    expect(cn(['a', 'b'], 'c')).toBe('a b c')
  })

  it('should merge tailwind classes', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-red-500 bg-black', 'text-blue-500')).toBe('bg-black text-blue-500')
  })

  it('should handle mixed inputs', () => {
    expect(cn('base', ['a', 'b'], { c: true, d: false }, 'e')).toBe('base a b c e')
  })
})
