'use client'

import { useState } from 'react'
import UploadZone from '@/components/upload/UploadZone'
import PreviewComparison from '@/components/preview/PreviewComparison'
import PaymentGateway from '@/components/payment/PaymentGateway'
import DownloadManager from '@/components/download/DownloadManager'

type AppState = 'upload' | 'preview' | 'payment' | 'download'

export default function Home() {
  const [currentState, setCurrentState] = useState<AppState>('upload')
  const [photos, setPhotos] = useState<File[]>([])
  const [selectedVariant, setSelectedVariant] = useState<'A' | 'B' | 'both'>('A')
  const [orderId, setOrderId] = useState<string>('')

  const handleFilesChange = (files: File[]) => {
    setPhotos(files)
    if (files.length > 0) {
      setCurrentState('preview')
    }
  }

  const handleVariantSelect = (variant: 'A' | 'B' | 'both') => {
    setSelectedVariant(variant)
    setCurrentState('payment')
  }

  const handlePaymentSuccess = (newOrderId: string) => {
    setOrderId(newOrderId)
    setCurrentState('download')
  }

  const restartFlow = () => {
    setCurrentState('upload')
    setPhotos([])
    setSelectedVariant('A')
    setOrderId('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header Simple */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">Studio Nexora</span>
            </div>
            <nav className="flex gap-6">
              <button 
                onClick={() => window.location.href = '/affiliados'}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Afiliados
              </button>
              <button 
                onClick={() => window.location.href = '/referidos'}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Recomendaciones
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        {currentState === 'upload' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Fotos Profesionales con IA
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Transforma tus selfies en fotos de estudio profesionales. 
                100% fidelidad, resultados en minutos.
              </p>
              
              {/* Botones de Acción Rápida */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button 
                  onClick={() => window.location.href = '/affiliados'}
                  className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
                >
                  🎯 Gana 40% como Afiliado
                </button>
                <button 
                  onClick={() => window.location.href = '/referidos'}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  💰 15% OFF por Recomendar
                </button>
              </div>
            </div>
            
            <UploadZone onFilesChange={handleFilesChange} maxFiles={3} />
          </div>
        )}

        {currentState === 'preview' && (
          <PreviewComparison photos={photos} onVariantSelect={handleVariantSelect} />
        )}

        {currentState === 'payment' && (
          <PaymentGateway
            selectedVariant={selectedVariant}
            photoCount={photos.length}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {currentState === 'download' && (
          <DownloadManager orderId={orderId} />
        )}

        {/* Restart Button */}
        {currentState !== 'upload' && (
          <div className="text-center mt-8">
            <button
              onClick={restartFlow}
              className="text-blue-600 hover:text-blue-800 transition-colors font-semibold"
            >
              ← Crear nuevas fotos
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
