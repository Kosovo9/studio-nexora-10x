'use client'

import { useState, useEffect } from 'react'
import { Download, Calendar, Star, Settings, Package, Users, DollarSign } from 'lucide-react'
import { getOrders, type Order } from '@/lib/orders'

export default function ClientDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [activeTab, setActiveTab] = useState<'orders' | 'downloads' | 'referrals'>('orders')

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = () => {
    const clientOrders = getOrders()
    setOrders(clientOrders.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ))
  }

  const [downloadHistory, setDownloadHistory] = useState<any[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const history = JSON.parse(localStorage.getItem('downloadHistory') || '[]')
      setDownloadHistory(history)
    }
  }, [])

  const stats = {
    totalOrders: orders.length,
    totalSpent: orders.reduce((sum, order) => sum + order.price, 0),
    downloads: downloadHistory.length,
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mi Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Gestiona tus fotos y pedidos</p>
            </div>
            <a
              href="/crear"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Nueva Sesión
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalOrders}</p>
                <p className="text-gray-600 dark:text-gray-400">Órdenes totales</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Download className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.downloads}</p>
                <p className="text-gray-600 dark:text-gray-400">Descargas</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.totalSpent}</p>
                <p className="text-gray-600 dark:text-gray-400">Total invertido</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              {[
                { id: 'orders', name: 'Mis Órdenes', count: orders.length, icon: Package },
                { id: 'downloads', name: 'Descargas', count: stats.downloads, icon: Download },
                { id: 'referrals', name: 'Recomendaciones', count: 0, icon: Users },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center gap-2
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }
                  `}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.name}
                  {tab.count > 0 && (
                    <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-0.5 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Historial de Órdenes</h3>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Aún no tienes órdenes</p>
                    <a
                      href="/crear"
                      className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Crear Mi Primera Orden
                    </a>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">Orden #{order.id.slice(-8)}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {order.package} • ${order.price} MXN
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                          <span className={`
                            inline-block text-xs px-2 py-1 rounded mt-1
                            ${order.status === 'completado' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                              : order.status === 'pagado'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                            }
                          `}>
                            {order.status === 'completado' ? 'Completado' : 
                             order.status === 'pagado' ? 'En Proceso' : 'Pendiente'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'downloads' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mis Descargas</h3>
                {stats.downloads === 0 ? (
                  <div className="text-center py-12">
                    <Download className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Aún no has descargado fotos</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {downloadHistory.slice(0, 10).map((download: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            Variante {download.variant} - Orden #{download.orderId.slice(-8)}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(download.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <Download className="h-5 w-5 text-green-500" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'referrals' && (
              <div className="text-center py-12">
                <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Programa de Recomendaciones</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto">
                  Recomienda Studio Nexora y gana 15% de descuento en tu próxima sesión
                </p>
                <a
                  href="/referidos"
                  className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  Comenzar a Recomendar
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/crear"
              className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            >
              <div className="text-2xl mb-2">📸</div>
              <p className="font-semibold text-gray-900 dark:text-white">Nueva Sesión</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Crear fotos nuevas</p>
            </a>
            
            <a
              href="/affiliados"
              className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center hover:border-purple-500 dark:hover:border-purple-500 transition-colors"
            >
              <div className="text-2xl mb-2">🤝</div>
              <p className="font-semibold text-gray-900 dark:text-white">Programa Afiliados</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Gana 40% de comisión</p>
            </a>
            
            <a
              href="https://wa.me/521234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center hover:border-green-500 dark:hover:border-green-500 transition-colors"
            >
              <div className="text-2xl mb-2">💬</div>
              <p className="font-semibold text-gray-900 dark:text-white">Soporte</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">¿Necesitas ayuda?</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
