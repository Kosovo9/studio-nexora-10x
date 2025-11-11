'use client'

export default function ChatTestimonials() {
  const messages = [
    { 
      id: 1, 
      user: 'Sarah Chen', 
      date: '1 FEB//www.nexora.com',
      message: 'Hola, ¿cómo puedo ayudarte con el crecimiento de tu negocio?',
      isAI: false 
    },
    { 
      id: 2, 
      user: 'Nexora AI', 
      date: '',
      message: 'Implementamos estrategias de crecimiento escalables exponencialmente mediante IA avanzada, automatización de procesos y análisis predictivo para multiplicar tus resultados.',
      isAI: true 
    }
  ]

  return (
    <section className="relative z-10 px-6 py-16 max-w-4xl mx-auto">
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 shadow-xl">
        {/* User Profile */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-nexora-gold rounded-full flex items-center justify-center shadow-md">
            <span className="text-nexora-deepBlue font-bold">SC</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">Sarah Chen</h3>
            <p className="text-gray-400 text-sm">1 FEB//www.nexora.com</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex ${msg.isAI ? 'justify-start' : 'justify-end'}`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl p-4 text-white ${
                  msg.isAI 
                    ? 'border' 
                    : 'bg-white/10 border border-white/20'
                }`}
                style={msg.isAI ? {
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  borderColor: 'rgba(212, 175, 55, 0.3)'
                } : {}}
              >
                <p className="text-sm md:text-base leading-relaxed">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

