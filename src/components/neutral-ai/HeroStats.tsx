export default function HeroStats() {
  const stats = [
    { value: '500K+', label: 'Clientes Satisfechos' },
    { value: '8+', label: 'Años De Experiencia' },
    { value: '99.9%', label: 'Éxito en Proyectos' }
  ]

  return (
    <section className="relative z-10 text-center px-6 py-20">
      {/* Main Title */}
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
        NEXORA AI
        <span className="block text-nexora-gold">PLATFORM</span>
      </h1>
      
      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-2xl mx-auto">
        AI para impulsar tu negocio al siguiente nivel
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-nexora-gold/50 transition-all duration-300 hover:scale-105"
          >
            <div className="text-4xl md:text-5xl font-bold text-nexora-gold mb-2">
              {stat.value}
            </div>
            <div className="text-lg text-gray-300">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

