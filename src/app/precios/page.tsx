'use client'

import { Check, Star, Zap } from 'lucide-react'
import { useTranslation } from '@/lib/i18n-extended'

export default function PreciosPage() {
  const { t } = useTranslation()

  const pricingPlans = [
    {
      name: t('individual'),
      description: 'Perfecto para redes sociales y perfiles personales',
      prices: [
        { photos: 1, price: 200, save: 0 },
        { photos: 2, price: 350, save: 50 },
        { photos: 3, price: 500, save: 100 }
      ],
      features: [
        '2 variantes por foto (Natural + Mejorada)',
        'Watermark en preview',
        'Descarga HD sin marca',
        'Re-descargas ilimitadas por 30 días',
        'Soporte prioritario'
      ],
      popular: false
    },
    {
      name: t('pets'),
      description: 'Fotos profesionales para tus mascotas',
      prices: [
        { photos: 1, price: 250, save: 0 }
      ],
      features: [
        '2 variantes por foto',
        'Enfoque en expresiones naturales',
        'Backgrounds profesionales',
        'Perfecto para redes sociales',
        'Entrega en 2-4 horas'
      ],
      popular: false
    },
    {
      name: t('family'),
      description: 'Sesiones familiares y de grupos pequeños',
      prices: [
        { people: '2-3', photos: 3, price: 1000, save: 200 },
        { people: '4-5', photos: 5, price: 1500, save: 300 },
        { people: '6+', photos: 8, price: 2000, save: 500 }
      ],
      features: [
        'Fotos individuales y grupales',
        'Composición profesional',
        'Atención a cada rostro',
        'Backgrounds armoniosos',
        'Coordinación de estilos'
      ],
      popular: true
    },
    {
      name: t('teams'),
      description: 'Equipos corporativos y deportivos',
      prices: [
        { people: '2-5', photos: 5, price: 1200, save: 300 },
        { people: '6-10', photos: 8, price: 2000, save: 500 },
        { people: '11-20', photos: 12, price: 3500, save: 800 }
      ],
      features: [
        'Estilo corporativo uniforme',
        'Coordinación de vestimenta',
        'Fotos individuales + grupales',
        'Backgrounds profesionales',
        'Entrega express 24h'
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Precios Transparentes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sin sorpresas, sin contratos. Solo resultados profesionales a precios accesibles.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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
                    MÁS POPULAR
                  </div>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                {/* Precios */}
                <div className="space-y-3 mb-6">
                  {plan.prices.map((price, priceIndex) => {
                    const hasPhotos = 'photos' in price
                    const displayText = hasPhotos 
                      ? `${price.photos} foto${price.photos > 1 ? 's' : ''}`
                      : `${(price as any).people} personas`
                    return (
                    <div key={priceIndex} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold">
                          {displayText}
                        </span>
                        <div className="text-right">
                          <span className="text-lg font-bold text-gray-900">${price.price} MXN</span>
                          {price.save > 0 && (
                            <span className="block text-sm text-green-600">
                              Ahorras ${price.save}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    )
                  })}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => window.location.href = '/crear'}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Comenzar Ahora
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparativa de Valor */}
        <div className="bg-white rounded-xl shadow-lg p-8">
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
              <div className="text-2xl mx-auto mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-2">Calidad Premium</h3>
              <p className="text-gray-600">
                Resultados de estudio profesional a fracción del costo
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mx-auto mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Garantía 200%</h3>
              <p className="text-gray-600">
                Si no te gusta, te devolvemos el doble de tu dinero
              </p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold mb-4">¿Listo para transformar tus fotos?</h3>
          <p className="text-gray-600 mb-6">
            Únete a miles de clientes satisfechos que ya tienen sus fotos profesionales
          </p>
          <button
            onClick={() => window.location.href = '/crear'}
            className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors"
          >
            Crear Mis Fotos Profesionales
          </button>
        </div>
      </div>
    </div>
  )
}

