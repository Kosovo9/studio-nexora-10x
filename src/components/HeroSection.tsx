'use client'

import { useInView } from 'react-intersection-observer'
import { useEffect, useState, ReactElement } from 'react'

export default function HeroSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [stars, setStars] = useState<ReactElement[]>([])

  useEffect(() => {
    // Generar estrellas animadas
    const starsArray: ReactElement[] = []
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 3 + 1
      const left = Math.random() * 100
      const top = Math.random() * 100
      const delay = Math.random() * 3

      starsArray.push(
        <div
          key={i}
          className="star"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`
          }}
        />
      )
    }
    setStars(starsArray)
  }, [])

  return (
    <>
      <section className="hero" ref={ref}>
        <div className="hero-content">
          <h1 className="hero-title">NEXORA AI PLATFORM</h1>
          <p className="hero-subtitle">AI impulsa tu negocio al siguiente nivel</p>

          <div className="stats-grid">
            <div 
              className={`stat-card ${inView ? 'animate-in' : ''}`}
              style={{ transitionDelay: '0.1s' }}
            >
              <div className="stat-number">500k+</div>
              <div className="stat-label">Clientes Satisfechos</div>
            </div>
            <div 
              className={`stat-card ${inView ? 'animate-in' : ''}`}
              style={{ transitionDelay: '0.2s' }}
            >
              <div className="stat-number">8+</div>
              <div className="stat-label">Años de experiencia con proyectos</div>
            </div>
          </div>

          <div className="testimonial">
            <div className="testimonial-header">
              <div className="avatar">
                <div className="avatar-placeholder">SC</div>
              </div>
              <div>
                <div className="testimonial-name">Sarah Chen</div>
                <div className="testimonial-role">CEO | www.nexora.com</div>
              </div>
            </div>
            <div className="testimonial-text">
              Hola, ¿cómo puedo ayudarte a personalizar tu negocio con inteligencia artificial?
            </div>
          </div>
        </div>

        <div className="image-container">
          <div className="image-placeholder image-left">
            [FOTO IZQUIERDA - Arrastra aquí tu imagen]
          </div>
          <div className="image-placeholder image-right-top">
            [FOTO DERECHA ARRIBA - Arrastra aquí tu imagen]
          </div>
          <div className="image-placeholder image-right-bottom">
            [FOTO DERECHA ABAJO - Arrastra aquí tu imagen]
          </div>
        </div>
      </section>
      
      {/* Stars Container */}
      <div className="stars">
        {stars}
      </div>
    </>
  )
}

