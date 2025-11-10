'use client'

import { useState } from 'react'
import UploadZone from '@/components/upload/UploadZone'
import PreviewComparison from '@/components/preview/PreviewComparison'
import PaymentGateway from '@/components/payment/PaymentGateway'
import DownloadManager from '@/components/download/DownloadManager'

type Step = 'upload' | 'preview' | 'payment' | 'download'

export default function CrearPage() {
  const [step, setStep] = useState<Step>('upload')
  const [photos, setPhotos] = useState<File[]>([])
  const [selectedVariant, setSelectedVariant] = useState<'A' | 'B' | 'both'>('A')
  const [orderId, setOrderId] = useState<string | null>(null)

  const handleFilesChange = (files: File[]) => {
    setPhotos(files)
    if (files.length > 0) {
      setStep('preview')
    }
  }

  const handleVariantSelect = (variant: 'A' | 'B' | 'both') => {
    setSelectedVariant(variant)
    setStep('payment')
  }

  const handlePaymentSuccess = (id: string) => {
    setOrderId(id)
    setStep('download')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {(['upload', 'preview', 'payment', 'download'] as Step[]).map((s, idx) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold
                  ${step === s ? 'bg-blue-500 text-white' : 
                    ['upload', 'preview', 'payment', 'download'].indexOf(step) > idx 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}
                `}>
                  {['upload', 'preview', 'payment', 'download'].indexOf(step) > idx ? '✓' : idx + 1}
                </div>
                {idx < 3 && (
                  <div className={`
                    flex-1 h-1 mx-2
                    ${['upload', 'preview', 'payment', 'download'].indexOf(step) > idx 
                      ? 'bg-green-500' 
                      : 'bg-gray-200 dark:bg-gray-700'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">
              {step === 'upload' && 'Sube tus fotos'}
              {step === 'preview' && 'Elige tu variante'}
              {step === 'payment' && 'Completa el pago'}
              {step === 'download' && 'Descarga tus fotos'}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          {step === 'upload' && (
            <UploadZone 
              onFilesChange={handleFilesChange}
              maxFiles={3}
            />
          )}

          {step === 'preview' && photos.length > 0 && (
            <div>
              <PreviewComparison 
                photos={photos}
                onVariantSelect={handleVariantSelect}
              />
              <div className="mt-6 text-center">
                <button
                  onClick={() => setStep('upload')}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  ← Volver a subir fotos
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div>
              <PaymentGateway
                selectedVariant={selectedVariant}
                photoCount={photos.length}
                onPaymentSuccess={handlePaymentSuccess}
              />
              <div className="mt-6 text-center">
                <button
                  onClick={() => setStep('preview')}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  ← Volver a previews
                </button>
              </div>
            </div>
          )}

          {step === 'download' && orderId && (
            <DownloadManager orderId={orderId} />
          )}
        </div>
      </div>
    </div>
  )
}

