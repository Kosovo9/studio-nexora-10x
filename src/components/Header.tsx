'use client'

import { useState, useEffect } from 'react'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#1a1f4c]/95 backdrop-blur-md shadow-lg border-b border-[#2a2f6c]/50' 
            : 'bg-[#1a1f4c]/90 backdrop-blur-sm border-b border-[#2a2f6c]/30'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#f0b90b] to-[#ffd700] rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-[#0d102a] font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">neutral ci</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6" role="navigation">
              <a 
                href="#contacto" 
                className="bg-[#3a4a9f] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#4a5ac7] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Programar un demo
              </a>
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="text-white text-2xl hover:text-[#f0b90b] transition-colors p-2"
                aria-label="Abrir menú"
                aria-expanded={isMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </nav>

            {/* Mobile Hamburger */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden text-white text-2xl p-2 hover:text-[#f0b90b] transition-colors"
              aria-label="Abrir menú"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}

