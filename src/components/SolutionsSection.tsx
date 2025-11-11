'use client'

import { useInView } from 'react-intersection-observer'

export default function SolutionsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  return (
    <section 
      ref={ref} 
      className="relative z-10 px-4 sm:px-6 lg:px-8 py-20 bg-[#0d102a] text-center"
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          className={`text-gray-400 font-medium tracking-wider text-xs sm:text-sm uppercase mb-4 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          SOLUCIONES CLAVE
        </h2>
        
        <h3 
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 transition-all duration-700 delay-200 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          NEXORA AI PLATFORM
        </h3>
        
        <p 
          className={`text-gray-400 mb-10 text-base sm:text-lg transition-all duration-700 delay-300 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Lista para llevar tu negocio al siguiente nivel
        </p>

        <a 
          href="https://www.nexora.com" 
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block bg-gradient-to-r from-[#3a4a9f] to-[#4a5ac7] text-white px-8 py-4 rounded-full mb-16 font-semibold transition-all duration-700 delay-400 hover:scale-105 hover:shadow-xl ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          https://www.nexora.com
        </a>

        {/* Solutions Grid */}
        <div 
          className={`grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto transition-all duration-700 delay-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-[#3a4a9f]/50 backdrop-blur-md border border-[#f0b90b] rounded-2xl p-8 hover:scale-105 hover:border-[#ffd700] hover:shadow-xl transition-all duration-300">
            <h4 className="text-xl font-bold text-[#f0b90b] mb-3">1. Shopify Editions</h4>
            <a 
              href="https://www.shopify.com/editions" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm break-all"
            >
              https://www.shopify.com/editions
            </a>
          </div>
          
          <div 
            className={`bg-[#3a4a9f]/50 backdrop-blur-md border border-[#f0b90b] rounded-2xl p-8 hover:scale-105 hover:border-[#ffd700] hover:shadow-xl transition-all duration-300 delay-100 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h4 className="text-xl font-bold text-[#f0b90b] mb-3">2. Maopify Editions AI</h4>
            <a 
              href="https://www.shopify.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm break-all"
            >
              https://www.shopify.com/
            </a>
          </div>
        </div>

        {/* Contact Button */}
        <a 
          href="#contacto" 
          className={`inline-block bg-gradient-to-r from-[#3a4a9f] to-[#4a5ac7] text-white px-12 py-4 rounded-full text-lg font-bold transition-all duration-700 delay-600 hover:scale-105 hover:shadow-xl ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          CONTACTO
        </a>
      </div>
    </section>
  )
}

