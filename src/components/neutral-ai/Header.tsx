'use client'

import { Menu } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="relative z-20">
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-nexora-gold rounded-lg flex items-center justify-center">
            <span className="text-nexora-deepBlue font-bold text-sm">N</span>
          </div>
          <span className="text-2xl font-bold text-white">Neutral AI</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button className="bg-nexora-gold text-nexora-deepBlue px-6 py-2 rounded-full font-semibold hover:bg-nexora-lightGold transition-colors duration-300 shadow-md hover:shadow-lg">
            Programar Demo
          </button>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-white cursor-pointer" />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center space-x-4">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-white cursor-pointer" />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="absolute top-full right-6 mt-2 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4 min-w-[200px]">
            <button className="w-full text-left text-white py-2 hover:text-nexora-gold transition-colors">
              Programar Demo
            </button>
            <button className="w-full text-left text-white py-2 hover:text-nexora-gold transition-colors">
              Soluciones
            </button>
            <button className="w-full text-left text-white py-2 hover:text-nexora-gold transition-colors">
              Contacto
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}

