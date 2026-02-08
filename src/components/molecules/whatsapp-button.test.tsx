import { render, screen, fireEvent } from '@testing-library/react'
import { WhatsAppButton } from './whatsapp-button'
import { describe, it, expect } from 'vitest'
import React from 'react'

describe('WhatsAppButton', () => {
  it('renders the floating button with accessible label', () => {
    render(<WhatsAppButton />)

    const mainButton = screen.getByRole('button', { name: /Abrir chat do WhatsApp/i })
    expect(mainButton).toBeTruthy()
    expect(mainButton.getAttribute('aria-expanded')).toBe('false')
  })

  it('renders the close button with accessible label when open', () => {
    render(<WhatsAppButton />)

    const mainButton = screen.getByRole('button', { name: /Abrir chat do WhatsApp/i })
    fireEvent.click(mainButton)

    // Main button label should change
    expect(screen.getByRole('button', { name: /^Fechar chat do WhatsApp$/i })).toBeTruthy()
    expect(mainButton.getAttribute('aria-expanded')).toBe('true')

    const closeButton = screen.getByRole('button', { name: /^Fechar chat$/i })
    expect(closeButton).toBeTruthy()
  })

  it('toggles the popup visibility', () => {
    render(<WhatsAppButton />)

    const mainButton = screen.getByRole('button', { name: /Abrir chat do WhatsApp/i })

    fireEvent.click(mainButton)

    const closeButton = screen.getByRole('button', { name: /^Fechar chat$/i })
    fireEvent.click(closeButton)

    // Main button label should revert
    expect(screen.getByRole('button', { name: /Abrir chat do WhatsApp/i })).toBeTruthy()
    expect(mainButton.getAttribute('aria-expanded')).toBe('false')
  })

  it('hides the popup content from accessibility tree when closed', () => {
    render(<WhatsAppButton />)

    // The popup container should be invisible when closed
    const popupText = screen.getByText('Oliveto')
    const popupContainer = popupText.closest('.absolute')

    expect(popupContainer).toBeTruthy()
    // It MUST contain invisible to be accessible
    expect(popupContainer?.className).toContain('invisible')
  })
})
