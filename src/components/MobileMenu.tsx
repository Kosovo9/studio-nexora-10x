'use client'

import { useEffect, useRef } from 'react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Focus trap
      const firstFocusable = menuRef.current?.querySelector('a, button') as HTMLElement
      firstFocusable?.focus()
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    onClose()
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 300)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menú de navegación">
      {/* Backdrop */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menu Panel */}
      <div 
        ref={menuRef}
        className="absolute right-0 top-0 w-80 sm:w-96 h-full bg-[#0d102a]/98 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-out"
      >
        <div className="p-6 h-full flex flex-col">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white text-2xl hover:text-[#f0b90b] transition-colors p-2 rounded-lg hover:bg-white/10"
            aria-label="Cerrar menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Menu Content */}
          <div className="mt-16 space-y-6 flex-1">
            <a 
              href="#soluciones" 
              onClick={(e) => handleLinkClick(e, '#soluciones')}
              className="block text-white text-xl font-medium hover:text-[#f0b90b] transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
            >
              Soluciones
            </a>
            <a 
              href="#precios" 
              onClick={(e) => handleLinkClick(e, '#precios')}
              className="block text-white text-xl font-medium hover:text-[#f0b90b] transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
            >
              Precios
            </a>
            <a 
              href="#nosotros" 
              onClick={(e) => handleLinkClick(e, '#nosotros')}
              className="block text-white text-xl font-medium hover:text-[#f0b90b] transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
            >
              Nosotros
            </a>
            <a 
              href="#contacto" 
              onClick={(e) => handleLinkClick(e, '#contacto')}
              className="block bg-gradient-to-r from-[#3a4a9f] to-[#4a5ac7] text-white px-6 py-4 rounded-lg text-center font-semibold hover:from-[#4a5ac7] hover:to-[#5a6ad7] transition-all mt-8"
            >
              Programar un demo
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

