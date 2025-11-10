'use client'

import { useState } from 'react'
import { CreditCard, Zap, Shield, CheckCircle } from 'lucide-react'

interface PaymentGatewayProps {
  selectedVariant: 'A' | 'B' | 'both'
  photoCount: number
  onPaymentSuccess: (orderId: string) => void
}

const PRICING = {
  individual: {
    1: 200,
    2: 350,
    3: 500
  },
  mascotas: 250,
  familia: {
    '2-3': 1000,
    '4-5': 1500,
    '6+': 2000
  }
}

export default function PaymentGateway({ selectedVariant, photoCount, onPaymentSuccess }: PaymentGatewayProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<'stripe' | 'lemon'>('stripe')

  const calculateTotal = () => {
    const basePrice = PRICING.individual[photoCount as keyof typeof PRICING.individual] || 200
    return selectedVariant === 'both' ? Math.round(basePrice * 1.4) : basePrice
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock de pago exitoso
    const orderId = 'order_' + Date.now()
    const orderData = {
      id: orderId,
      variant: selectedVariant,
      photoCount,
      total: calculateTotal(),
      status: 'paid',
      createdAt: new Date().toISOString()
    }
    
    localStorage.setItem(orderId, JSON.stringify(orderData))
    
    // Guardar en lista de órdenes
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push(orderData)
    localStorage.setItem('orders', JSON.stringify(orders))
    
    onPaymentSuccess(orderId)
    setIsProcessing(false)
  }

  const total = calculateTotal()
  const basePrice = PRICING.individual[photoCount as keyof typeof PRICING.individual] || 200
  const discount = selectedVariant === 'both' ? Math.round(basePrice * 0.3) : 0

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Completa tu pedido</h2>
        
        {/* Resumen del pedido */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3">Resumen del pedido</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Fotos seleccionadas:</span>
              <span className="font-medium">{photoCount} foto{photoCount > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Variante:</span>
              <span className="font-medium">
                {selectedVariant === 'A' ? 'Natural' : 
                 selectedVariant === 'B' ? 'Mejorada' : 'Ambas variantes'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Precio base:</span>
              <span className="font-medium">${basePrice} MXN</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 dark:text-green-400">
                <span>Descuento (30%):</span>
                <span>-${discount} MXN</span>
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
              className={`
                p-4 border-2 rounded-lg text-center transition-all
                ${selectedMethod === 'stripe' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              <CreditCard className="h-8 w-8 mx-auto mb-2" />
              <span className="font-medium">Stripe</span>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Tarjetas, Apple Pay</p>
            </button>
            
            <button
              onClick={() => setSelectedMethod('lemon')}
              className={`
                p-4 border-2 rounded-lg text-center transition-all
                ${selectedMethod === 'lemon' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              <Zap className="h-8 w-8 mx-auto mb-2" />
              <span className="font-medium">Lemon Squeezy</span>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Pagos globales</p>
            </button>
          </div>
        </div>

        {/* Garantías */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-5 w-5 text-blue-500" />
            <span className="font-semibold">Garantía Studio Nexora</span>
          </div>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
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

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
          Pago seguro • SSL encriptado • Sin comisiones adicionales
        </p>
      </div>
    </div>
  )
}

