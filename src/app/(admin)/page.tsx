'use client'

import { useState, useEffect } from 'react'
import { DollarSign, Users, ShoppingCart, TrendingUp, Phone, Mail } from 'lucide-react'
import WhatsAppFlow from '@/components/shared/WhatsAppFlow'

interface Order {
  id: string
  name: string
  whatsapp: string
  email?: string
  package: string
  price: number
  status: 'pendiente' | 'pagado' | 'completado'
  date: string
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [leads, setLeads] = useState<any[]>([])

  useEffect(() => {
    // Cargar órdenes desde localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(storedOrders)

    // Cargar leads desde localStorage
    const storedLeads = JSON.parse(localStorage.getItem('leads') || '[]')
    setLeads(storedLeads)
  }, [])

  const updateOrderStatus = (id: string, newStatus: Order['status']) => {
    const updated = orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    )
    setOrders(updated)
    localStorage.setItem('orders', JSON.stringify(updated))
  }

  const stats = {
    totalRevenue: orders.filter(o => o.status === 'pagado' || o.status === 'completado').reduce((sum, o) => sum + o.price, 0),
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pendiente').length,
    conversionRate: leads.length > 0 ? ((orders.length / leads.length) * 100).toFixed(1) : '0',
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Panel de Administración</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</span>
            </div>
            <p className="text-gray-400 text-sm">Ingresos Totales</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">{stats.totalOrders}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Órdenes</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold">{stats.pendingOrders}</span>
            </div>
            <p className="text-gray-400 text-sm">Pendientes</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold">{stats.conversionRate}%</span>
            </div>
            <p className="text-gray-400 text-sm">Tasa Conversión</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Órdenes Recientes</h2>
          
          {orders.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No hay órdenes aún</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-3">Cliente</th>
                    <th className="text-left p-3">Paquete</th>
                    <th className="text-left p-3">Precio</th>
                    <th className="text-left p-3">Estado</th>
                    <th className="text-left p-3">Fecha</th>
                    <th className="text-left p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 10).map((order) => (
                    <tr key={order.id} className="border-b border-gray-700">
                      <td className="p-3">
                        <div>
                          <p className="font-semibold">{order.name}</p>
                          <p className="text-sm text-gray-400">{order.whatsapp}</p>
                        </div>
                      </td>
                      <td className="p-3">{order.package}</td>
                      <td className="p-3">${order.price}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          order.status === 'completado' ? 'bg-green-500/20 text-green-400' :
                          order.status === 'pagado' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-gray-400">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          {order.status === 'pendiente' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'pagado')}
                              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                            >
                              Marcar Pagado
                            </button>
                          )}
                          {order.status === 'pagado' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'completado')}
                              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                            >
                              Completar
                            </button>
                          )}
                          <a
                            href={`https://wa.me/${order.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm inline-flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* WhatsApp Flow */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <WhatsAppFlow />
        </div>

        {/* Leads List */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Leads Capturados ({leads.length})</h2>
          
          {leads.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No hay leads aún</p>
          ) : (
            <div className="space-y-3">
              {leads.slice(0, 10).map((lead, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-semibold">{lead.name}</p>
                    <div className="flex gap-4 text-sm text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {lead.whatsapp}
                      </span>
                      {lead.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </span>
                      )}
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${lead.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
                  >
                    Contactar
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

