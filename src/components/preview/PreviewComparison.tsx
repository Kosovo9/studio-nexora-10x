'use client'

import { useState, useEffect } from 'react'
import { Check, ZoomIn, Download } from 'lucide-react'

interface PreviewComparisonProps {
  photos: File[]
  onVariantSelect: (variant: 'A' | 'B' | 'both') => void
}

export default function PreviewComparison({ photos, onVariantSelect }: PreviewComparisonProps) {
  const [selectedVariant, setSelectedVariant] = useState<'A' | 'B' | 'both'>('A')
  const [isGenerating, setIsGenerating] = useState(true)
  const [zoomImage, setZoomImage] = useState<string | null>(null)

  // Simular generación de previews
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGenerating(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleVariantSelect = (variant: 'A' | 'B' | 'both') => {
    setSelectedVariant(variant)
    onVariantSelect(variant)
  }

  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h3 className="text-xl font-semibold mb-2">Generando tus previews</h3>
        <p className="text-gray-600 dark:text-gray-400">Estamos creando dos variantes únicas para ti...</p>
        <div className="mt-4 w-64 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Elige tu variante favorita</h2>
        <p className="text-gray-600 dark:text-gray-400">Compara las dos versiones y selecciona la que más te guste</p>
      </div>

      {/* Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {(['A', 'B'] as const).map((variant) => (
          <div
            key={variant}
            className={`
              relative border-2 rounded-xl overflow-hidden cursor-pointer transition-all
              ${selectedVariant === variant || selectedVariant === 'both'
                ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }
            `}
            onClick={() => handleVariantSelect(variant)}
          >
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative">
              {/* Mock Preview Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📸</div>
                  <h3 className="text-xl font-semibold mb-2">
                    Variante {variant} {variant === 'A' ? '(Natural)' : '(Mejorada)'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {variant === 'A' ? '100% fidelidad a tus rasgos' : 'Mejoras realistas profesionales'}
                  </p>
                </div>
              </div>
              
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-gray-400 dark:text-gray-600 text-opacity-40 text-6xl font-bold transform -rotate-45">
                  STUDIO NEXORA PREVIEW
                </div>
              </div>

              {/* Selection Badge */}
              {(selectedVariant === variant || selectedVariant === 'both') && (
                <div className="absolute top-4 left-4">
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Check className="h-4 w-4" />
                    Seleccionada
                  </div>
                </div>
              )}

              {/* Zoom Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setZoomImage(variant)
                }}
                className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-opacity"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Both Variants Option */}
      <div
        className={`
          border-2 rounded-xl p-6 cursor-pointer transition-all mb-8
          ${selectedVariant === 'both'
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 ring-2 ring-green-200 dark:ring-green-800'
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }
        `}
        onClick={() => handleVariantSelect('both')}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`
              w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${selectedVariant === 'both' 
                ? 'border-green-500 bg-green-500 text-white' 
                : 'border-gray-300 dark:border-gray-600'
              }
            `}>
              {selectedVariant === 'both' && <Check className="h-4 w-4" />}
            </div>
            <div>
              <h3 className="font-semibold text-lg">Ambas variantes</h3>
              <p className="text-gray-600 dark:text-gray-400">Recibe las dos versiones con descuento especial</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-green-600 dark:text-green-400 font-bold text-lg">30% OFF</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Mejor valor</div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setZoomImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
              <div className="text-8xl mb-4">📸</div>
              <h3 className="text-2xl font-bold mb-2">Variante {zoomImage}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {zoomImage === 'A' 
                  ? 'Versión natural - 100% fidelidad a tus rasgos' 
                  : 'Versión mejorada - Ajustes profesionales realistas'
                }
              </p>
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => setZoomImage(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

