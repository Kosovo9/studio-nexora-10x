'use client'

import { useState } from 'react'
import { MessageCircle, Mail, Phone, Clock, CheckCircle } from 'lucide-react'

export default function SoportePage() {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'status'>('faq')
  const [messageSent, setMessageSent] = useState(false)

  const faqs = [
    {
      question: '¿Cómo funciona el proceso?',
      answer: 'Subes 1-3 fotos, elegís entre dos variantes (natural o mejorada), pagás y descargás tus fotos sin watermark. Todo en menos de 2 horas.'
    },
    {
      question: '¿Qué calidad tienen las fotos?',
      answer: 'Todas las fotos son en alta resolución (hasta 4K) y mantienen 100% de fidelidad a tus rasgos faciales.'
    },
    {
      question: '¿Puedo pedir reembolso?',
      answer: 'Sí, ofrecemos garantía de 200% de reembolso si no estás satisfecho con los resultados.'
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos Stripe (tarjetas, Apple Pay) y Lemon Squeezy para pagos internacionales.'
    },
    {
      question: '¿Cuánto tiempo tardan las entregas?',
      answer: 'Entrega estándar: 2-4 horas. Entrega express: 1 hora (disponible para órdenes urgentes).'
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessageSent(true)
    setTimeout(() => setMessageSent(false), 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <MessageCircle className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Centro de Soporte
          </h1>
          <p className="text-xl text-gray-600">
            Estamos aquí para ayudarte 24/7
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b">
            <nav className="flex -mb-px">
              {[
                { id: 'faq', name: 'Preguntas Frecuentes', icon: '❓' },
                { id: 'contact', name: 'Contacto Directo', icon: '📧' },
                { id: 'status', name: 'Estado del Servicio', icon: '🟢' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-4 text-center border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="text-lg mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Preguntas Frecuentes</h2>
                {faqs.map((faq, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Contacto Directo</h2>
                {messageSent ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">¡Mensaje Enviado!</h3>
                    <p className="text-gray-600">
                      Te contactaremos en menos de 1 hora. Revisa tu email.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Asunto
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>Problemas técnicos</option>
                          <option>Consultas de precios</option>
                          <option>Soporte post-venta</option>
                          <option>Programa de afiliados</option>
                          <option>Otro</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mensaje
                        </label>
                        <textarea
                          rows={4}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                      >
                        Enviar Mensaje
                      </button>
                    </form>

                    <div className="space-y-6">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Mail className="h-5 w-5 text-blue-500" />
                          <h3 className="font-semibold">Email</h3>
                        </div>
                        <p className="text-gray-600">soporte@studio-nexora.com</p>
                        <p className="text-sm text-gray-500">Respuesta en 1 hora</p>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Phone className="h-5 w-5 text-green-500" />
                          <h3 className="font-semibold">WhatsApp</h3>
                        </div>
                        <p className="text-gray-600">+52 1 XXX XXX XXXX</p>
                        <p className="text-sm text-gray-500">Respuesta inmediata</p>
                      </div>
                      
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Clock className="h-5 w-5 text-purple-500" />
                          <h3 className="font-semibold">Horario de Atención</h3>
                        </div>
                        <p className="text-gray-600">24/7 - 365 días al año</p>
                        <p className="text-sm text-gray-500">Soporte siempre disponible</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Status Tab */}
            {activeTab === 'status' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Todos los Sistemas Operativos</h3>
                <p className="text-gray-600 mb-4">
                  Nuestra plataforma está funcionando al 100% sin interrupciones.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="font-semibold">Upload</p>
                    <p className="text-green-600">Operacional</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="font-semibold">Procesamiento</p>
                    <p className="text-green-600">Operacional</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="font-semibold">Descargas</p>
                    <p className="text-green-600">Operacional</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA de Emergencia */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">¿Problemas Urgentes?</h3>
          <p className="text-gray-600 mb-4">
            Si tienes problemas con una orden existente, contáctanos inmediatamente
          </p>
          <button
            onClick={() => setActiveTab('contact')}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Soporte Urgente
          </button>
        </div>
      </div>
    </div>
  )
}

