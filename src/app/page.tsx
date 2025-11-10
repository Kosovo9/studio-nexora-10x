'use client'

import { useState } from 'react'
import UploadZone from '@/components/upload/UploadZone'
import PreviewComparison from '@/components/preview/PreviewComparison'
import PaymentGateway from '@/components/payment/PaymentGateway'
import DownloadManager from '@/components/download/DownloadManager'
import ExampleGallery from '@/components/gallery/ExampleGallery'
import TermsAndConditions from '@/components/upload/TermsAndConditions'

type AppState = 'upload' | 'preview' | 'payment' | 'download'
type PackageType = 'individual' | 'mascotas' | 'familia' | 'grupales'

export default function Home() {
  const [currentState, setCurrentState] = useState<AppState>('upload')
  const [photos, setPhotos] = useState<File[]>([])
  const [selectedVariant, setSelectedVariant] = useState<'A' | 'B' | 'both'>('A')
  const [selectedPackage, setSelectedPackage] = useState<PackageType>('individual')
  const [orderId, setOrderId] = useState<string>('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleFilesChange = (files: File[]) => {
    setPhotos(files)
  }

  const handlePackageSelect = (pkg: PackageType) => {
    setSelectedPackage(pkg)
  }

  const proceedToPreview = () => {
    if (photos.length > 0 && termsAccepted) {
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
    setSelectedPackage('individual')
    setOrderId('')
    setTermsAccepted(false)
  }

  const getMaxFiles = () => {
    return selectedPackage === 'individual' ? 3 : 1
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

            {/* Galería de Ejemplos */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-center mb-6">Ejemplos de Transformaciones</h2>
              <ExampleGallery />
            </div>

            {/* Selector de Paquete */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-center mb-6">Elige tu Paquete</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button
                  onClick={() => handlePackageSelect('individual')}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    selectedPackage === 'individual' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">👤</div>
                  <h3 className="font-semibold mb-1">Individual</h3>
                  <p className="text-sm text-gray-600 mb-2">1-3 fotos</p>
                  <div className="text-lg font-bold text-gray-900">$100 - $500</div>
                </button>

                <button
                  onClick={() => handlePackageSelect('mascotas')}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    selectedPackage === 'mascotas' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">🐕</div>
                  <h3 className="font-semibold mb-1">Mascotas</h3>
                  <p className="text-sm text-gray-600 mb-2">Por mascota</p>
                  <div className="text-lg font-bold text-gray-900">$250</div>
                </button>

                <button
                  onClick={() => handlePackageSelect('familia')}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    selectedPackage === 'familia' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
                  <h3 className="font-semibold mb-1">Familia</h3>
                  <p className="text-sm text-gray-600 mb-2">Hasta 6 personas</p>
                  <div className="text-lg font-bold text-gray-900">$800</div>
                </button>

                <button
                  onClick={() => handlePackageSelect('grupales')}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    selectedPackage === 'grupales' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">👥</div>
                  <h3 className="font-semibold mb-1">Grupales</h3>
                  <p className="text-sm text-gray-600 mb-2">Hasta 10 personas</p>
                  <div className="text-lg font-bold text-gray-900">$1,200</div>
                </button>
              </div>
            </div>

            {/* Términos y Condiciones */}
            <TermsAndConditions onAccept={setTermsAccepted} />

            {/* Upload Zone */}
            <UploadZone onFilesChange={handleFilesChange} maxFiles={getMaxFiles()} />

            {/* Botón para continuar */}
            {photos.length > 0 && (
              <div className="text-center mt-6">
                <button
                  onClick={proceedToPreview}
                  disabled={!termsAccepted}
                  className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {!termsAccepted ? 'Acepta los términos para continuar' : 'Continuar a Preview'}
                </button>
              </div>
            )}
          </div>
        )}

        {currentState === 'preview' && (
          <PreviewComparison 
            photos={photos} 
            onVariantSelect={handleVariantSelect} 
          />
        )}

        {currentState === 'payment' && (
          <PaymentGateway
            selectedVariant={selectedVariant}
            photoCount={photos.length}
            packageType={selectedPackage}
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
