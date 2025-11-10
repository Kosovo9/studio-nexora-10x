// Sistema de órdenes con localStorage como fallback

export interface Order {
  id: string
  name: string
  whatsapp: string
  email?: string
  package: string
  price: number
  status: 'pendiente' | 'pagado' | 'completado'
  date: string
}

const PACKAGE_PRICES: Record<string, number> = {
  'Básico': 299,
  'Pro': 599,
  'Premium': 999,
}

export function createOrder(data: {
  name: string
  whatsapp: string
  email?: string
  package: string
}): Order {
  const order: Order = {
    id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: data.name,
    whatsapp: data.whatsapp,
    email: data.email,
    package: data.package,
    price: PACKAGE_PRICES[data.package] || 0,
    status: 'pendiente',
    date: new Date().toISOString(),
  }

  // Guardar en localStorage
  const orders = getOrders()
  orders.push(order)
  localStorage.setItem('orders', JSON.stringify(orders))

  return order
}

export function getOrders(): Order[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem('orders')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function updateOrderStatus(orderId: string, status: Order['status']): Order | null {
  const orders = getOrders()
  const orderIndex = orders.findIndex(o => o.id === orderId)
  
  if (orderIndex === -1) return null

  orders[orderIndex].status = status
  localStorage.setItem('orders', JSON.stringify(orders))
  
  return orders[orderIndex]
}

export function getOrderById(orderId: string): Order | null {
  const orders = getOrders()
  return orders.find(o => o.id === orderId) || null
}

export function getOrdersByStatus(status: Order['status']): Order[] {
  return getOrders().filter(o => o.status === status)
}

export function calculateTotalRevenue(): number {
  return getOrders()
    .filter(o => o.status === 'pagado' || o.status === 'completado')
    .reduce((sum, o) => sum + o.price, 0)
}

