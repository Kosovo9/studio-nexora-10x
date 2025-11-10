'use client'

import { useState } from 'react'
import { Check, Star, Zap, Shield, Users, TrendingUp } from 'lucide-react'

export default function LandingPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('¡Gracias! Te enviaremos ofertas exclusivas.')
    setEmail('')
  }

  const testimonials = [
    {
      name: 'María G.',
      role: 'Influencer',
      content: 'Increíble calidad. Mis seguidores no pueden creer que son fotos con IA.',
      rating: 5
    },
    {
      name: 'Carlos R.',
      role: 'Profesional',
      content: 'Perfecto para mi perfil de LinkedIn. Mucho mejor que fotógrafo tradicional.',
      rating: 5
    },
    {
      name: 'Ana L.',
      role: 'Emprendedora',
      content: 'El mejor ROI que he tenido en mi branding personal. 100% recomendado.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Fotos de Estudio
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Sin Salir de Casa
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transforma tus selfies en fotos profesionales con IA. 
            <span className="text-white font-semibold"> 100% fidelidad, resultados en 2 horas.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => window.location.href = '/crear'}
              className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-all transform hover:scale-105"
            >
              Crear Mis Fotos Gratis
            </button>
            <button
              onClick={() => window.location.href = '/precios'}
              className="border border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all"
            >
              Ver Precios
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span>4.9/5 (2,500+ reseñas)</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>10,000+ clientes satisfechos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Por qué elegir Studio Nexora
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-12 w-12 text-blue-500" />,
                title: 'Velocidad Lightning',
                description: 'Recibe tus fotos en 2-4 horas vs días en estudio tradicional'
              },
              {
                icon: <Shield className="h-12 w-12 text-green-500" />,
                title: 'Garantía 200%',
                description: 'Si no te gusta, te devolvemos el doble de tu dinero'
              },
              {
                icon: <TrendingUp className="h-12 w-12 text-purple-500" />,
                title: 'Resultados Comprobados',
                description: 'Miles de clientes satisfechos con resultados profesionales'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            ¿Listo para transformar tus fotos?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Únete a miles de clientes que ya tienen sus fotos profesionales
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/crear'}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Comenzar Ahora
            </button>
            <button
              onClick={() => window.location.href = '/precios'}
              className="border border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all"
            >
              Ver Planes y Precios
            </button>
          </div>

          {/* Guarantee Badge */}
          <div className="mt-8 flex items-center justify-center gap-2 text-white">
            <Shield className="h-5 w-5" />
            <span>Garantía de satisfacción 200% • Sin preguntas</span>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ofertas Exclusivas por Email
          </h3>
          <p className="text-gray-400 mb-6">
            Recibe descuentos especiales y tips para tus fotos profesionales
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

