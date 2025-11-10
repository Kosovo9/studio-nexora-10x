'use client'

import { Check, Star, Zap, Shield, Users } from 'lucide-react'

export default function PreciosPage() {
  const pricingPlans = [
    {
      name: 'Individual',
      description: 'Perfecto para redes sociales y perfiles personales',
      prices: [
        { photos: 1, price: 100, save: 0, perPhoto: 100 },
        { photos: 2, price: 350, save: 50, perPhoto: 175 },
        { photos: 3, price: 500, save: 100, perPhoto: 167 }
      ],
      features: [
        '2 variantes por foto (Natural + Mejorada)',
        'Watermark en preview',
        'Descarga HD sin marca',
        'Re-descargas ilimitadas por 30 días',
        'Soporte prioritario'
      ],
      popular: true
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Precios Transparentes
          </h1>
          <p className="text-xl text-gray-600">
            Sin sorpresas, sin contratos. Solo resultados profesionales a precios accesibles.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    MEJOR VALOR
                  </div>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">{plan.name}</h3>
                <p className="text-gray-600 text-center mb-8">{plan.description}</p>

                {/* Precios */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {plan.prices.map((price, priceIndex) => (
                    <div key={priceIndex} className="bg-gray-50 rounded-lg p-6 text-center">
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-gray-900">{price.photos}</span>
                        <span className="text-gray-600"> foto{price.photos > 1 ? 's' : ''}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-3xl font-bold text-gray-900">${price.price}</span>
                        <span className="text-gray-600"> MXN</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        ${price.perPhoto} por foto
                      </div>
                      {price.save > 0 && (
                        <div className="text-green-600 font-semibold">
                          Ahorras ${price.save}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors"
                >
                  Comenzar Ahora
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparativa de Valor */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">¿Por qué Studio Nexora?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Entrega Express</h3>
              <p className="text-gray-600">
                Recibe tus fotos en 2-4 horas vs días en estudio tradicional
              </p>
            </div>
            
            <div className="text-center">
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Garantía 200%</h3>
              <p className="text-gray-600">
                Si no te gusta, te devolvemos el doble de tu dinero
              </p>
            </div>
            
            <div className="text-center">
              <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">10,000+ Clientes</h3>
              <p className="text-gray-600">
                Únete a miles de clientes satisfechos worldwide
              </p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">¿Listo para transformar tus fotos?</h3>
          <p className="text-gray-600 mb-6">
            Comienza ahora mismo con nuestros precios accesibles
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors"
          >
            Crear Mis Fotos por $100 MXN
          </button>
        </div>
      </div>
    </div>
  )
}
