'use client'

import { useState, useEffect } from 'react'
import { Download, CheckCircle, Share2, Star, AlertCircle } from 'lucide-react'

interface DownloadManagerProps {
  orderId: string
}

interface OrderData {
  id: string
  variant: 'A' | 'B' | 'both'
  photoCount: number
  total: number
  status: string
  createdAt: string
}

export default function DownloadManager({ orderId }: DownloadManagerProps) {
  const [order, setOrder] = useState<OrderData | null>(null)
  const [downloadCount, setDownloadCount] = useState(0)
  const maxDownloads = 5

  useEffect(() => {
    // Cargar datos de la orden desde localStorage
    const orderData = localStorage.getItem(orderId)
    if (orderData) {
      setOrder(JSON.parse(orderData))
    }

    // Cargar contador de descargas
    const downloadHistory = JSON.parse(localStorage.getItem('downloadHistory') || '[]')
    const orderDownloads = downloadHistory.filter((d: any) => d.orderId === orderId)
    setDownloadCount(orderDownloads.length)
  }, [orderId])

  const handleDownload = (variant: 'A' | 'B') => {
    if (downloadCount >= maxDownloads) {
      alert('Has alcanzado el límite de descargas. Contáctanos para más descargas.')
      return
    }

    // Simular descarga
    setDownloadCount(prev => prev + 1)
    
    // Mock de descarga - crear blob con imagen placeholder
    const canvas = document.createElement('canvas')
    canvas.width = 800
    canvas.height = 800
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = variant === 'A' ? '#3b82f6' : '#10b981'
      ctx.fillRect(0, 0, 800, 800)
      ctx.fillStyle = 'white'
      ctx.font = '48px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(`Variante ${variant}`, 400, 350)
      ctx.fillText('Studio Nexora', 400, 450)
    }

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `studio-nexora-${variant}-${orderId}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }
    })

    // Guardar en historial
    const downloadHistory = JSON.parse(localStorage.getItem('downloadHistory') || '[]')
    downloadHistory.push({
      orderId,
      variant,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('downloadHistory', JSON.stringify(downloadHistory))
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mis fotos profesionales - Studio Nexora',
          text: '¡Mira mis fotos profesionales generadas con IA!',
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(window.location.href)
      alert('¡Enlace copiado al portapapeles!')
    }
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Cargando tu orden...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header de éxito */}
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">¡Pago Exitoso!</h1>
        <p className="text-gray-600 dark:text-gray-400">Tu orden #{orderId.slice(-8)} está lista para descargar</p>
      </div>

      {/* Información de la orden */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Detalles de tu orden</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Variante:</span>
            <p className="font-medium">
              {order.variant === 'A' ? 'Natural' : 
               order.variant === 'B' ? 'Mejorada' : 'Ambas variantes'}
            </p>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Fotos:</span>
            <p className="font-medium">{order.photoCount}</p>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Total:</span>
            <p className="font-medium">${order.total} MXN</p>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Descargas restantes:</span>
            <p className="font-medium">{maxDownloads - downloadCount} de {maxDownloads}</p>
          </div>
        </div>
      </div>

      {/* Botones de descarga */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {(order.variant === 'A' || order.variant === 'both') && (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 text-center">
            <h3 className="font-semibold mb-3">Variante A - Natural</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">100% fidelidad a tus rasgos</p>
            <button
              onClick={() => handleDownload('A')}
              disabled={downloadCount >= maxDownloads}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <Download className="h-5 w-5" />
              Descargar Variante A
            </button>
          </div>
        )}

        {(order.variant === 'B' || order.variant === 'both') && (
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 text-center">
            <h3 className="font-semibold mb-3">Variante B - Mejorada</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Ajustes profesionales realistas</p>
            <button
              onClick={() => handleDownload('B')}
              disabled={downloadCount >= maxDownloads}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <Download className="h-5 w-5" />
              Descargar Variante B
            </button>
          </div>
        )}
      </div>

      {downloadCount >= maxDownloads && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Límite de descargas alcanzado</h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Has descargado el máximo de veces. Contáctanos para más descargas.
            </p>
          </div>
        </div>
      )}

      {/* Acciones adicionales */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <h3 className="font-semibold mb-4">Más acciones</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            Compartir resultado
          </button>
          
          <a
            href="/affiliados"
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Star className="h-4 w-4" />
            Únete al programa de afiliados
          </a>
        </div>
      </div>

      {/* Recomendación */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          ¿Te gustaron tus fotos? ¡Recomiéndanos y obtén 15% de descuento en tu próxima sesión!
        </p>
        <a
          href="/referidos"
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
        >
          Recomendar y ganar 15% OFF
        </a>
      </div>
    </div>
  )
}

