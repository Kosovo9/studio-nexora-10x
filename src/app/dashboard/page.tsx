'use client'

import { useState, useEffect } from 'react'
import { Package, Download, Phone, Mail, Clock, CheckCircle, XCircle } from 'lucide-react'
import { getOrders, type Order } from '@/lib/orders'
import PreviewGenerator from '@/components/shared/PreviewGenerator'

export default function ClientDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [viewingPreviews, setViewingPreviews] = useState(false)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = () => {
    const clientOrders = getOrders()
    setOrders(clientOrders.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ))
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'completado':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'pagado':
        return <Clock className="w-5 h-5 text-blue-400" />
      default:
        return <XCircle className="w-5 h-5 text-yellow-400" />
    }
  }

  const getStatusLabel = (status: Order['status']) => {
    const labels: Record<Order['status'], string> = {
      pendiente: 'Pendiente',
      pagado: 'En Proceso',
      completado: 'Completado',
    }
    return labels[status]
  }

  const handleReorder = (order: Order) => {
    // Crear nueva orden basada en la anterior
    const newOrder = {
      name: order.name,
      whatsapp: order.whatsapp,
      email: order.email,
      package: order.package,
    }
    
    // Esto debería usar createOrder, pero por simplicidad aquí
    alert(`Reordenando paquete ${order.package}...`)
    window.location.href = '/'
  }

  if (viewingPreviews && selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => {
              setViewingPreviews(false)
              setSelectedOrder(null)
            }}
            className="mb-6 text-blue-400 hover:text-blue-300"
          >
            ← Volver al Dashboard
          </button>
          <PreviewGenerator 
            orderId={selectedOrder}
            onComplete={() => {
              setViewingPreviews(false)
              setSelectedOrder(null)
              loadOrders()
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mi Dashboard</h1>
          <p className="text-gray-400">Gestiona tus órdenes y descarga tus fotos</p>
        </div>

        {/* Stats Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">{orders.length}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Órdenes</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold">
                {orders.filter(o => o.status === 'completado').length}
              </span>
            </div>
            <p className="text-gray-400 text-sm">Completadas</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold">
                {orders.filter(o => o.status === 'pagado' || o.status === 'pendiente').length}
              </span>
            </div>
            <p className="text-gray-400 text-sm">En Proceso</p>
          </div>
        </div>

        {/* Mis Órdenes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Mis Órdenes</h2>
          
          {orders.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-12 text-center">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400 mb-4">No tienes órdenes aún</p>
              <a
                href="/"
                className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
              >
                Crear Mi Primera Orden
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(order.status)}
                        <h3 className="text-xl font-bold">{order.package}</h3>
                        <span className={`px-3 py-1 rounded text-sm ${
                          order.status === 'completado' ? 'bg-green-500/20 text-green-400' :
                          order.status === 'pagado' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">
                        Orden #{order.id.slice(-8)} • ${order.price}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(order.date).toLocaleDateString('es-MX', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      {order.status === 'pagado' && (
                        <button
                          onClick={() => {
                            setSelectedOrder(order.id)
                            setViewingPreviews(true)
                          }}
                          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
                        >
                          Ver Previews
                        </button>
                      )}
                      {order.status === 'completado' && (
                        <button
                          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Descargar
                        </button>
                      )}
                      <button
                        onClick={() => handleReorder(order)}
                        className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold text-sm"
                      >
                        Reordenar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Galería de Fotos Entregadas */}
        {orders.filter(o => o.status === 'completado').length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Fotos Entregadas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
                >
                  <Download className="w-8 h-8 text-white opacity-50" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Soporte y Contacto */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">¿Necesitas Ayuda?</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/521234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
            >
              <Phone className="w-5 h-5" />
              WhatsApp
            </a>
            <a
              href="mailto:support@studionexora.com"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
            >
              <Mail className="w-5 h-5" />
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

