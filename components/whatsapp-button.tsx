"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)

  const phoneNumber = "5543991231726"
  const message = "Olá! Gostaria de mais informações sobre os serviços da Oliveto."

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popup */}
      <div
        className={`absolute bottom-20 right-0 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-[#25D366] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm">Oliveto</h4>
                <p className="text-white/80 text-xs">Online agora</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="bg-gray-100 rounded-lg p-3 mb-4">
            <p className="text-gray-700 text-sm">
              Olá! 👋 Como podemos ajudar você hoje? Nossa equipe está pronta para atender.
            </p>
            <span className="text-gray-400 text-xs mt-1 block">Agora</span>
          </div>

          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#25D366] text-white text-center py-3 rounded-lg font-medium hover:bg-[#20BD5A] transition-colors"
          >
            Iniciar Conversa
          </a>
        </div>
      </div>

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative"
      >
        <MessageCircle className="w-7 h-7 text-white" />

        {/* Pulse Animation */}
        <span className="absolute w-full h-full rounded-full bg-[#25D366] animate-ping opacity-30" />

        {/* Online Badge */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
      </button>
    </div>
  )
}
