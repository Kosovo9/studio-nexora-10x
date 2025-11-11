'use client'

import { useInView } from 'react-intersection-observer'

export default function SolutionsSectionNew() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="solutions" ref={ref}>
      <h2 className="section-title">SOLUCIONES CLAVE</h2>
      <h3 className="section-subtitle">Impulsa tu negocio con tecnología de vanguardia</h3>

      <div className="solutions-grid">
        <div 
          className={`solution-card ${inView ? 'animate-in' : ''}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div className="solution-number">1.</div>
          <h3 className="solution-title">Shopify Editions</h3>
          <a href="https://www.shopify.com/editions" target="_blank" rel="noopener noreferrer" className="solution-link">
            Ver más
          </a>
        </div>
        <div 
          className={`solution-card ${inView ? 'animate-in' : ''}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <div className="solution-number">2.</div>
          <h3 className="solution-title">Maopify Editions AI</h3>
          <a href="https://www.shopify.com/" target="_blank" rel="noopener noreferrer" className="solution-link">
            Ver más
          </a>
        </div>
      </div>

      <a 
        href="#contacto" 
        className="cta-button"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        CONTACTO
      </a>
    </section>
  )
}

