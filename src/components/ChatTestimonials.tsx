'use client'

import { useInView } from 'react-intersection-observer'

export default function ChatTestimonials() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section 
      ref={ref}
      className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 max-w-5xl mx-auto"
    >
      <div 
        className={`bg-[#3a4a9f]/30 backdrop-blur-lg rounded-3xl border border-white/10 p-8 shadow-2xl transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* User Profile */}
        <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-white/10">
          <div className="w-14 h-14 bg-gradient-to-br from-[#f0b90b] to-[#ffd700] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-[#0d102a] font-bold text-lg">SC</span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Sarah Chen</h3>
            <p className="text-gray-400 text-sm">1 FEB // www.nexora.com</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="space-y-4">
          <div className="flex justify-end">
            <div className="max-w-[80%] bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <p className="text-sm md:text-base text-white leading-relaxed">
                Hola, ¿cómo puedo ayudarte con el crecimiento de tu negocio?
              </p>
            </div>
          </div>
          
          <div className="flex justify-start">
            <div 
              className="max-w-[80%] rounded-2xl p-4 border"
              style={{
                backgroundColor: 'rgba(240, 185, 11, 0.2)',
                borderColor: 'rgba(240, 185, 11, 0.3)'
              }}
            >
              <p className="text-sm md:text-base text-white leading-relaxed">
                Implementamos estrategias de crecimiento escalables exponencialmente mediante IA avanzada, automatización de procesos y análisis predictivo para multiplicar tus resultados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

