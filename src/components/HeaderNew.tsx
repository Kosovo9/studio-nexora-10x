'use client'

import { useState } from 'react'

export default function HeaderNew() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header>
      <div className="logo">NEXORA AI</div>
      <nav>
        <button onClick={() => {
          document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
        }}>
          Programar un demo
        </button>
        <div 
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
    </header>
  )
}

