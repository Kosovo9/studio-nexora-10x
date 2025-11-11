'use client'

import { useState, FormEvent } from 'react'
import { useInView } from 'react-intersection-observer'

export default function ContactForm() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simular envío (reemplazar con tu API)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section 
      id="contacto" 
      ref={ref} 
      className="relative z-10 px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-[#1a1f4c] to-[#2c327c]"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Ponte en Contacto
        </h2>
        
        <p 
          className={`text-gray-300 mb-12 text-base sm:text-lg transition-all duration-700 delay-200 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          ¿Listo para llevar tu negocio al siguiente nivel? Déjanos un mensaje.
        </p>

        <form 
          onSubmit={handleSubmit}
          className={`max-w-2xl mx-auto transition-all duration-700 delay-300 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-[#3a4a9f]/30 backdrop-blur-sm border border-[#3a4a9f] rounded-xl text-white placeholder-transparent focus:border-[#f0b90b] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/50 transition-all"
                placeholder="Tu Nombre"
              />
              <label 
                htmlFor="name"
                className={`absolute left-4 transition-all duration-300 ${
                  formData.name 
                    ? '-top-2 bg-[#1a1f4c] px-2 text-[#f0b90b] text-xs font-semibold' 
                    : 'top-4 text-gray-400 text-base pointer-events-none'
                }`}
              >
                Tu Nombre
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-[#3a4a9f]/30 backdrop-blur-sm border border-[#3a4a9f] rounded-xl text-white placeholder-transparent focus:border-[#f0b90b] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/50 transition-all"
                placeholder="Tu Correo Electrónico"
              />
              <label 
                htmlFor="email"
                className={`absolute left-4 transition-all duration-300 ${
                  formData.email 
                    ? '-top-2 bg-[#1a1f4c] px-2 text-[#f0b90b] text-xs font-semibold' 
                    : 'top-4 text-gray-400 text-base pointer-events-none'
                }`}
              >
                Tu Correo Electrónico
              </label>
            </div>

            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-4 bg-[#3a4a9f]/30 backdrop-blur-sm border border-[#3a4a9f] rounded-xl text-white placeholder-transparent focus:border-[#f0b90b] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/50 transition-all resize-vertical min-h-[120px]"
                placeholder="Tu Mensaje"
              />
              <label 
                htmlFor="message"
                className={`absolute left-4 transition-all duration-300 ${
                  formData.message 
                    ? '-top-2 bg-[#1a1f4c] px-2 text-[#f0b90b] text-xs font-semibold' 
                    : 'top-4 text-gray-400 text-base pointer-events-none'
                }`}
              >
                Tu Mensaje
              </label>
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-500/20 border border-green-500 rounded-xl p-4 text-green-400 text-sm">
                ¡Mensaje enviado exitosamente! Te contactaremos pronto.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 text-red-400 text-sm">
                Error al enviar el mensaje. Por favor, intenta nuevamente.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#3a4a9f] to-[#4a5ac7] text-white py-4 rounded-xl font-bold hover:from-[#4a5ac7] hover:to-[#5a6ad7] transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                'Enviar Mensaje'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

