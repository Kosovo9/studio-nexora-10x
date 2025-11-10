'use client'

import { useState, useEffect } from 'react'
import { Link, Copy, CheckCircle, TrendingUp, DollarSign, Users, Share2 } from 'lucide-react'

export default function AffiliadosPage() {
  const [affiliateCode, setAffiliateCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState({
    totalReferrals: 0,
    totalEarnings: 0,
    pendingPayout: 0,
    conversionRate: 0,
  })

  useEffect(() => {
    // Generar código único si no existe
    let code = localStorage.getItem('affiliateCode')
    if (!code) {
      code = 'AFF' + Math.random().toString(36).substring(2, 8).toUpperCase()
      localStorage.setItem('affiliateCode', code)
    }
    setAffiliateCode(code)

    // Cargar estadísticas
    const referrals = JSON.parse(localStorage.getItem('affiliateReferrals') || '[]')
    const earnings = referrals.filter((r: any) => r.status === 'paid').reduce((sum: number, r: any) => sum + (r.amount || 0), 0)
    const pending = referrals.filter((r: any) => r.status === 'pending').reduce((sum: number, r: any) => sum + (r.amount || 0), 0)
    
    setStats({
      totalReferrals: referrals.length,
      totalEarnings: earnings,
      pendingPayout: pending,
      conversionRate: referrals.length > 0 ? parseFloat(((referrals.filter((r: any) => r.status === 'paid').length / referrals.length) * 100).toFixed(1)) : 0,
    })
  }, [])

  const affiliateLink = typeof window !== 'undefined' 
    ? `${window.location.origin}?ref=${affiliateCode}`
    : ''

  const copyLink = () => {
    navigator.clipboard.writeText(affiliateLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Únete a Studio Nexora',
          text: 'Obtén fotos profesionales con IA. Usa mi código de referido para un descuento especial.',
          url: affiliateLink,
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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Programa de Afiliados</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Gana 40% de comisión por cada referido que convierta
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold">{stats.totalReferrals}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Referidos</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold">${stats.totalEarnings}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Ganancias Totales</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold">${stats.pendingPayout}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Pendiente de Pago</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold">{stats.conversionRate}%</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Tasa Conversión</p>
          </div>
        </div>

        {/* Código de Afiliado */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Tu Código de Afiliado</h2>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <code className="text-2xl font-mono font-bold">{affiliateCode}</code>
              <button
                onClick={copyLink}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar Link
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">Tu Link de Afiliado</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={affiliateLink}
                  readOnly
                  className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2"
                />
                <button
                  onClick={shareLink}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Compartir
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cómo Funciona */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">¿Cómo Funciona?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Comparte tu Link</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Comparte tu link único con amigos, familiares o en redes sociales
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Ellos Compran</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Cuando alguien usa tu link y realiza una compra, ganas automáticamente
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Gana 40%</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Recibe 40% de comisión por cada venta. Pago mensual mínimo $500 MXN
              </p>
            </div>
          </div>
        </div>

        {/* Términos */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <h3 className="font-semibold mb-3">Términos del Programa</h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li>• Comisión del 40% por cada venta exitosa</li>
            <li>• Cookie de seguimiento de 30 días</li>
            <li>• Pago mensual (mínimo $500 MXN para retiro)</li>
            <li>• Sin límite de referidos</li>
            <li>• Comisiones se pagan el día 15 de cada mes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

