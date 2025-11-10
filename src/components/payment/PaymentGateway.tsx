'use client'

import { useState } from 'react'
import { CreditCard, Zap, Shield } from 'lucide-react'

interface PaymentGatewayProps {
  selectedVariant: 'A' | 'B' | 'both'
  photoCount: number
  packageType: 'individual' | 'mascotas' | 'familia' | 'grupales'
  onPaymentSuccess: (orderId: string) => void
}

const PRICING = {
  individual: {
    1: 100,   // 100 MXN por 1 foto
    2: 350,   // 350 MXN por 2 fotos
    3: 500    // 500 MXN por 3 fotos
  },
  mascotas: 250,     // 250 MXN por mascota
  familia: 800,      // 800 MXN hasta 6 personas
  grupales: 1200     // 1,200 MXN menos de 10 personas
}

export default function PaymentGateway({ selectedVariant, photoCount, packageType, onPaymentSuccess }: PaymentGatewayProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<'stripe' | 'lemon'>('stripe')

  const calculateTotal = () => {
    if (packageType === 'individual') {
      const basePrice = PRICING.individual[photoCount as keyof typeof PRICING.individual] || 100
      return selectedVariant === 'both' ? Math.round(basePrice * 1.4) : basePrice
    } else {
      const basePrice = PRICING[packageType]
      return selectedVariant === 'both' ? Math.round(basePrice * 1.4) : basePrice
    }
  }

  const getPackageDescription = () => {
    switch (packageType) {
      case 'mascotas':
        return '1 mascota - Incluye 3 fotos profesionales'
      case 'familia':
        return 'Hasta 6 personas - Sesión familiar completa'
      case 'grupales':
        return 'Hasta 10 personas - Perfecto para equipos'
      default:
        return `${photoCount} foto${photoCount > 1 ? 's' : ''} individuales`
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock de pago exitoso
    const orderId = 'order_' + Date.now()
    localStorage.setItem(orderId, JSON.stringify({
      id: orderId,
      variant: selectedVariant,
      packageType,
      photoCount,
      total: calculateTotal(),
      status: 'paid',
      createdAt: new Date().toISOString()
    }))
    
    // Guardar en lista de órdenes
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push({
      id: orderId,
      variant: selectedVariant,
      packageType,
      photoCount,
      total: calculateTotal(),
      status: 'paid',
      createdAt: new Date().toISOString()
    })
    localStorage.setItem('orders', JSON.stringify(orders))
    
    onPaymentSuccess(orderId)
    setIsProcessing(false)
  }

  const total = calculateTotal()
  const discount = selectedVariant === 'both' ? '30%' : '0%'

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Completa tu pedido</h2>
        
        {/* Resumen del pedido */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3">Resumen del pedido</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Paquete:</span>
              <span className="font-medium capitalize">{packageType}</span>
            </div>
            <div className="flex justify-between">
              <span>Descripción:</span>
              <span className="text-right">{getPackageDescription()}</span>
            </div>
            <div className="flex justify-between">
              <span>Variante:</span>
              <span>
                {selectedVariant === 'A' ? 'Natural' : 
                 selectedVariant === 'B' ? 'Mejorada' : 'Ambas variantes'}
              </span>
            </div>
            {discount !== '0%' && (
              <div className="flex justify-between text-green-600">
                <span>Descuento:</span>
                <span>{discount}</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${total} MXN</span>
              </div>
            </div>
          </div>
        </div>

        {/* Métodos de pago */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Método de pago</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedMethod('stripe')}
              className={`p-4 border-2 rounded-lg text-center transition-all ${
                selectedMethod === 'stripe' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard className="h-8 w-8 mx-auto mb-2" />
              <span className="font-medium">Stripe</span>
              <p className="text-xs text-gray-600 mt-1">Tarjetas, Apple Pay</p>
            </button>
            
            <button
              onClick={() => setSelectedMethod('lemon')}
              className={`p-4 border-2 rounded-lg text-center transition-all ${
                selectedMethod === 'lemon' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Zap className="h-8 w-8 mx-auto mb-2" />
              <span className="font-medium">Lemon Squeezy</span>
              <p className="text-xs text-gray-600 mt-1">Pagos globales</p>
            </button>
          </div>
        </div>

        {/* Garantías */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <span className="font-semibold">Garantía Studio Nexora</span>
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Preview antes de pagar - 0 riesgo</li>
            <li>• 200% reembolso si no te gusta el resultado</li>
            <li>• Soporte prioritario 24/7</li>
            <li>• Descarga inmediata post-pago</li>
          </ul>
        </div>

        {/* Botón de pago */}
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Procesando pago...
            </>
          ) : (
            `Pagar $${total} MXN`
          )}
        </button>

        <p className="text-center text-xs text-gray-500 mt-3">
          Pago seguro • SSL encriptado • Sin comisiones adicionales
        </p>
      </div>
    </div>
  )
}
