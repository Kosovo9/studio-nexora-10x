'use client'

import { useState, useEffect } from 'react'
import { Check, Loader2, Sparkles, Download } from 'lucide-react'
import { getOrderById, updateOrderStatus, type Order } from '@/lib/orders'

interface Preview {
  id: string
  variant: 'A' | 'B'
  selected: boolean
  url?: string
}

interface PreviewGeneratorProps {
  orderId: string
  onComplete?: () => void
}

export default function PreviewGenerator({ orderId, onComplete }: PreviewGeneratorProps) {
  const [order, setOrder] = useState<Order | null>(null)
  const [previews, setPreviews] = useState<Preview[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    loadOrder()
  }, [orderId])

  const loadOrder = () => {
    const orderData = getOrderById(orderId)
    if (orderData) {
      setOrder(orderData)
      generatePreviews()
    }
  }

  const generatePreviews = () => {
    setLoading(true)
    
    // Simular carga de procesamiento
    setTimeout(() => {
      const newPreviews: Preview[] = [
        { id: 'prev-1', variant: 'A', selected: false },
        { id: 'prev-2', variant: 'A', selected: false },
        { id: 'prev-3', variant: 'B', selected: false },
        { id: 'prev-4', variant: 'B', selected: false },
        { id: 'prev-5', variant: 'A', selected: false },
        { id: 'prev-6', variant: 'B', selected: false },
      ]
      setPreviews(newPreviews)
      setLoading(false)
    }, 2000)
  }

  const toggleSelection = (id: string) => {
    setPreviews(prev =>
      prev.map(p => (p.id === id ? { ...p, selected: !p.selected } : p))
    )
  }

  const processSelection = () => {
    const selected = previews.filter(p => p.selected)
    if (selected.length === 0) {
      alert('Por favor selecciona al menos una foto')
      return
    }

    setProcessing(true)

    // Simular procesamiento
    setTimeout(() => {
      setProcessing(false)
      setCompleted(true)
      
      // Actualizar orden a completado
      if (order) {
        updateOrderStatus(order.id, 'completado')
      }
      
      // Guardar selección
      const selection = {
        orderId,
        selectedPreviews: selected.map(p => p.id),
        date: new Date().toISOString(),
      }
      const selections = JSON.parse(localStorage.getItem('preview-selections') || '[]')
      selections.push(selection)
      localStorage.setItem('preview-selections', JSON.stringify(selections))
      
      onComplete?.()
    }, 3000)
  }

  const getVariantColor = (variant: 'A' | 'B') => {
    return variant === 'A' 
      ? 'from-blue-500 to-purple-600' 
      : 'from-pink-500 to-orange-600'
  }

  const selectedCount = previews.filter(p => p.selected).length

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 animate-spin text-blue-400 mb-4" />
        <p className="text-gray-400">Generando previews...</p>
        <p className="text-sm text-gray-500 mt-2">Esto puede tomar unos segundos</p>
      </div>
    )
  }

  if (completed) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">¡Previews Procesados!</h3>
        <p className="text-gray-400 mb-6">Tus fotos seleccionadas están siendo procesadas</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
        >
          Ver Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-2">Selecciona Tus Fotos Favoritas</h3>
          <p className="text-gray-400">
            {selectedCount > 0 
              ? `${selectedCount} foto${selectedCount > 1 ? 's' : ''} seleccionada${selectedCount > 1 ? 's' : ''}`
              : 'Haz clic en las fotos para seleccionarlas'}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-lg">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-semibold">Variantes A/B</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {previews.map((preview) => (
          <div
            key={preview.id}
            onClick={() => toggleSelection(preview.id)}
            className={`
              relative aspect-square rounded-lg overflow-hidden cursor-pointer
              transition-all duration-300
              ${preview.selected 
                ? 'ring-4 ring-blue-500 scale-95' 
                : 'hover:scale-105 hover:ring-2 hover:ring-gray-500'
              }
            `}
          >
            {/* Placeholder visual atractivo */}
            <div className={`
              w-full h-full bg-gradient-to-br ${getVariantColor(preview.variant)}
              flex items-center justify-center
            `}>
              <div className="text-center text-white">
                <div className="text-4xl mb-2">📸</div>
                <div className="text-xs font-semibold bg-white/20 px-2 py-1 rounded">
                  Variante {preview.variant}
                </div>
              </div>
            </div>

            {/* Overlay de selección */}
            {preview.selected && (
              <div className="absolute inset-0 bg-blue-500/30 flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
              </div>
            )}

            {/* Badge de variante */}
            <div className={`
              absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold
              ${preview.variant === 'A' 
                ? 'bg-blue-500 text-white' 
                : 'bg-pink-500 text-white'
              }
            `}>
              {preview.variant}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-gray-800 rounded-lg">
        <div className="text-sm text-gray-400">
          <p>Selecciona las fotos que más te gusten</p>
          <p className="text-xs mt-1">Puedes seleccionar múltiples variantes</p>
        </div>
        <button
          onClick={processSelection}
          disabled={selectedCount === 0 || processing}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors
            ${selectedCount === 0 || processing
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
            }
          `}
        >
          {processing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Procesar {selectedCount > 0 && `(${selectedCount})`}
            </>
          )}
        </button>
      </div>

      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <p className="text-sm text-yellow-300">
          💡 <strong>Tip:</strong> Las variantes A y B tienen estilos diferentes. 
          Selecciona las que mejor representen tu visión.
        </p>
      </div>
    </div>
  )
}

