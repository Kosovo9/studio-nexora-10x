'use client'

import { useState, useEffect } from 'react'
import { Gift, Share2, Copy, CheckCircle, Users, Percent } from 'lucide-react'

export default function ReferidosPage() {
  const [referralCode, setReferralCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [referrals, setReferrals] = useState<any[]>([])

  useEffect(() => {
    // Generar código único si no existe
    let code = localStorage.getItem('referralCode')
    if (!code) {
      code = 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase()
      localStorage.setItem('referralCode', code)
    }
    setReferralCode(code)

    // Cargar referidos
    const stored = JSON.parse(localStorage.getItem('referrals') || '[]')
    setReferrals(stored)
  }, [])

  const referralLink = typeof window !== 'undefined' 
    ? `${window.location.origin}?referral=${referralCode}`
    : ''

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Obtén 15% OFF en Studio Nexora',
          text: 'Usa mi código de referido y obtén 15% de descuento en tus fotos profesionales con IA',
          url: referralLink,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      copyLink()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Gift className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Programa de Recomendaciones</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Recomienda Studio Nexora y ambos obtienen 15% de descuento
          </p>
        </div>

        {/* Código de Referido */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Percent className="w-8 h-8 text-orange-500" />
            <h2 className="text-2xl font-bold">Tu Código de Referido</h2>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Código</p>
              <code className="text-4xl font-mono font-bold text-orange-600 dark:text-orange-400">
                {referralCode}
              </code>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Link de Referido</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3"
                />
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copiar
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={shareLink}
                className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Compartir por WhatsApp
              </button>
              <button
                onClick={() => window.open(`mailto:?subject=15% OFF en Studio Nexora&body=Usa mi código ${referralCode} para obtener 15% de descuento: ${referralLink}`)}
                className="flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Compartir por Email
              </button>
            </div>
          </div>
        </div>

        {/* Cómo Funciona */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">¿Cómo Funciona?</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Comparte tu código</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Comparte tu código único con amigos o familiares que quieran fotos profesionales
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Ellos obtienen 15% OFF</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Cuando usen tu código, obtienen automáticamente 15% de descuento en su primera compra
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Tú también ganas 15% OFF</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Cuando completen su compra, recibes 15% de descuento en tu próxima orden
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Referidos */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Tus Referidos</h2>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="font-semibold">{referrals.length}</span>
            </div>
          </div>

          {referrals.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Aún no tienes referidos. ¡Comparte tu código para empezar!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {referrals.map((ref, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div>
                    <p className="font-semibold">{ref.name || 'Referido'}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(ref.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600 dark:text-green-400">15% OFF</p>
                    <p className="text-xs text-gray-500">{ref.status || 'Pendiente'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

