'use client'

import React, { useState, useEffect } from 'react'
import { Download, Eye, Calendar, Package } from 'lucide-react'
import { getOrders } from '@/lib/orders'

interface GenerationHistory {
  id: string
  packageType: string
  originalImages: string[]
  generatedImages: string[]
  prompt: string
  status: 'completed' | 'processing' | 'failed'
  createdAt: string
  completedAt?: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<GenerationHistory[]>([])
  const [filter, setFilter] = useState<'all' | 'completed' | 'processing'>('all')

  useEffect(() => {
    // Cargar historial desde localStorage
    const orders = getOrders()
    const historyData: GenerationHistory[] = orders.map(order => ({
      id: order.id,
      packageType: order.package,
      originalImages: ['/examples/before-1.jpg'], // Mock
      generatedImages: ['/examples/after-1.jpg'], // Mock
      prompt: `Retrato profesional - ${order.package}`,
      status: order.status === 'completado' ? 'completed' : 
              order.status === 'pagado' ? 'processing' : 'processing',
      createdAt: order.date,
      completedAt: order.status === 'completado' ? order.date : undefined
    }))
    setHistory(historyData)
  }, [])

  const filteredHistory = history.filter(item => 
    filter === 'all' ? true : item.status === filter
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Historial</h1>
          <p className="text-gray-600">Revisa todas tus generaciones anteriores</p>
        </div>

        {/* Filtros */}
        <div className="flex gap-4 mb-6">
          {['all', 'completed', 'processing'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType as any)}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === filterType
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              {filterType === 'all' && 'Todos'}
              {filterType === 'completed' && 'Completados'}
              {filterType === 'processing' && 'Procesando'}
            </button>
          ))}
        </div>

        {/* Grid de Historial */}
        <div className="grid gap-6">
          {filteredHistory.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Pedido #{item.id.slice(-8)}</h3>
                    <p className="text-sm text-gray-500 capitalize">{item.packageType}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : item.status === 'processing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.status === 'completed' && 'Completado'}
                    {item.status === 'processing' && 'Procesando'}
                    {item.status === 'failed' && 'Fallido'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* Originales */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Imágenes Originales</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {item.originalImages.map((img, index) => (
                      <div key={index} className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
                        <div className="text-4xl">👤</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generadas */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Resultados</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {item.generatedImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <div className="bg-gradient-to-br from-blue-200 to-purple-200 rounded-lg aspect-square flex items-center justify-center">
                          <div className="text-4xl">🌟</div>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 rounded-lg">
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-white p-1">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-white p-1">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600">
                  <strong>Prompt usado:</strong> {item.prompt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No hay generaciones en este filtro</p>
          </div>
        )}
      </div>
    </div>
  )
}

