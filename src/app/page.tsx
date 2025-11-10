'use client'

import { useState } from 'react'
import { Phone, Check, Star, ArrowRight, Camera, Sparkles } from 'lucide-react'
import { createOrder } from '@/lib/orders'

export default function LandingPage() {
  const [formData, setFormData] = useState({ name: '', whatsapp: '', email: '', package: 'Pro' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Crear orden
    const order = createOrder({
      name: formData.name,
      whatsapp: formData.whatsapp,
      email: formData.email,
      package: formData.package,
    })

    // Guardar lead también
    const leads = JSON.parse(localStorage.getItem('leads') || '[]')
    leads.push({ ...formData, date: new Date().toISOString() })
    localStorage.setItem('leads', JSON.stringify(leads))
    
    setSubmitted(true)
    setFormData({ name: '', whatsapp: '', email: '', package: 'Pro' })
  }

  const whatsappNumber = '521234567890' // Reemplazar con número real
  const whatsappMessage = encodeURIComponent('¡Hola! Me interesa Studio Nexora 🚀')

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium">Fotos Profesionales con IA</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Transforma Tus Fotos en Obras de Arte
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Sesiones fotográficas profesionales con inteligencia artificial. 
            Resultados épicos en minutos, no en días.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Hablar por WhatsApp
            </a>
            <a
              href="/home"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Ver Experiencia 3D
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Antes/Después */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Resultados Reales
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <Camera className="w-16 h-16 text-gray-600" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Antes</span>
                    <ArrowRight className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-blue-400">Después</span>
                  </div>
                  <p className="text-sm text-gray-300">Transformación profesional con IA</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="px-4 py-16 bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Elige Tu Paquete
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Básico', price: '$299', features: ['3 fotos', '1 estilo', 'Entrega 24h'] },
              { name: 'Pro', price: '$599', features: ['10 fotos', '2 estilos', 'Entrega 12h', 'Revisión incluida'], popular: true },
              { name: 'Premium', price: '$999', features: ['20 fotos', 'Todos los estilos', 'Entrega 6h', 'Revisión ilimitada', 'Soporte prioritario'] },
            ].map((pkg) => (
              <div
                key={pkg.name}
                className={`bg-gray-800 rounded-lg p-6 cursor-pointer transition-transform hover:scale-105 ${
                  pkg.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                } ${formData.package === pkg.name ? 'ring-2 ring-green-500' : ''}`}
                onClick={() => setFormData({ ...formData, package: pkg.name })}
              >
                {pkg.popular && (
                  <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    MÁS POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold mb-6">{pkg.price}</div>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {formData.package === pkg.name && (
                  <div className="text-center text-green-400 font-semibold mb-2">✓ Seleccionado</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            ¿Listo para Transformar Tus Fotos?
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Déjanos tus datos y te contactamos en menos de 5 minutos
          </p>

          {submitted ? (
            <div className="bg-green-500/20 border border-green-500 rounded-lg p-6 text-center">
              <Check className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">¡Gracias!</h3>
              <p className="text-gray-300 mb-4">Tu orden ha sido creada. Te contactaremos pronto por WhatsApp</p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-blue-400 hover:text-blue-300"
              >
                Crear otra orden
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="WhatsApp (10 dígitos)"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                required
                pattern="[0-9]{10}"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email (opcional)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Crear Mi Orden
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-4 py-16 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Lo Que Dicen Nuestros Clientes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'María G.', text: 'Increíble servicio. Mis fotos quedaron perfectas.', rating: 5 },
              { name: 'Carlos R.', text: 'Rápido, profesional y resultados épicos.', rating: 5 },
              { name: 'Ana L.', text: 'Superó todas mis expectativas. 100% recomendado.', rating: 5 },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para Empezar?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Habla con nosotros ahora por WhatsApp
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-10 py-5 rounded-lg font-semibold text-xl transition-colors shadow-lg"
          >
            <Phone className="w-6 h-6" />
            Contactar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
