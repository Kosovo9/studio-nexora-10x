export default function SolutionsSection() {
  const solutions = [
    {
      title: 'Shopify Editions',
      url: 'https://www.shopify.com/editions',
      description: 'Soluciones e-commerce avanzadas'
    },
    {
      title: 'Maopify Editions AI',
      url: 'https://www.shopify.com/',
      description: 'IA para transformación digital'
    }
  ]

  return (
    <section className="relative z-10 px-6 py-16 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          NEXORA AI PLATFORM
        </h2>
        <a 
          href="https://www.nexora.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-nexora-gold hover:text-nexora-lightGold transition-colors text-lg inline-block"
        >
          www.nexora.com
        </a>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {solutions.map((solution, index) => (
          <a
            key={index}
            href={solution.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)'
              const h3 = e.currentTarget.querySelector('h3')
              if (h3) h3.style.color = '#D4AF37'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              const h3 = e.currentTarget.querySelector('h3')
              if (h3) h3.style.color = 'white'
            }}
          >
            <h3 className="text-xl font-semibold text-white mb-2 transition-colors">
              {solution.title}
            </h3>
            <p className="text-gray-400 text-sm">
              {solution.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  )
}

