'use client'

import { useInView } from 'react-intersection-observer'

export default function HeroStats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  })

  return (
    <section className="relative z-10 text-center px-4 sm:px-6 lg:px-8 pt-32 pb-20">
      <div 
        ref={ref} 
        className={`transition-all duration-1000 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-white to-[#f0b90b] bg-clip-text text-transparent">
            NEXORA AI
          </span>
          <br />
          <span className="text-[#f0b90b]">PLATFORM</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-16 max-w-2xl mx-auto">
          Para impulsar tu negocio al siguiente nivel
        </p>

        {/* Stats Container */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 max-w-6xl mx-auto">
          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
            <div 
              className={`bg-[#3a4a9f]/50 backdrop-blur-md border border-[#f0b90b] rounded-2xl p-8 min-w-[220px] flex-1 transition-all duration-700 delay-200 hover:scale-105 hover:border-[#ffd700] hover:shadow-xl ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#f0b90b] mb-2">500k+</h2>
              <p className="text-gray-300 text-sm font-medium">Clientes Satisfechos</p>
            </div>
            
            <div 
              className={`bg-[#3a4a9f]/50 backdrop-blur-md border border-[#f0b90b] rounded-2xl p-8 min-w-[220px] flex-1 transition-all duration-700 delay-400 hover:scale-105 hover:border-[#ffd700] hover:shadow-xl ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#f0b90b] mb-2">8+ Años</h2>
              <p className="text-gray-300 text-sm font-medium">De experiencia con proyectos</p>
            </div>
          </div>

          {/* Chat Simulation */}
          <div 
            className={`bg-[#3a4a9f]/50 backdrop-blur-md border border-[#f0b90b]/30 rounded-2xl p-6 max-w-md w-full transition-all duration-700 delay-600 hover:border-[#f0b90b] hover:shadow-xl ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#f0b90b] to-[#ffd700] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-[#0d102a] font-bold text-sm">SC</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Sarah Chen</div>
                  <div className="text-gray-400 text-xs">1 FEB // www.nexora.com</div>
                </div>
              </div>
              <div className="w-10 h-10 bg-[#4a5ac7] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#4a5ac7] to-[#3a4a9f] rounded-2xl p-4 relative shadow-lg">
              <div className="absolute -top-2 left-6 w-4 h-4 bg-[#4a5ac7] transform rotate-45"></div>
              <p className="text-white text-sm leading-relaxed">
                Hola, ¿cómo puedo ayudarte con la gestión de tu negocio?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

