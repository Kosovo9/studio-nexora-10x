'use client'

import { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info, Bell } from 'lucide-react'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  duration?: number
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString()
    const newNotification = { ...notification, id }
    setNotifications(prev => [...prev, newNotification])

    // Auto-remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  // Export function to window for global access
  useEffect(() => {
    // @ts-ignore
    window.showNotification = addNotification
  }, [])

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getBackgroundColor = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getBackgroundColor(notification.type)} border rounded-lg p-4 shadow-lg transform transition-all duration-300`}
        >
          <div className="flex items-start gap-3">
            {getIcon(notification.type)}
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-gray-900">
                {notification.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

// Hook para usar notificaciones
export function useNotifications() {
  const showNotification = (notification: Omit<Notification, 'id'>) => {
    if (typeof window !== 'undefined' && (window as any).showNotification) {
      (window as any).showNotification(notification)
    }
  }

  return {
    showSuccess: (title: string, message: string, duration?: number) =>
      showNotification({ type: 'success', title, message, duration }),
    showError: (title: string, message: string, duration?: number) =>
      showNotification({ type: 'error', title, message, duration }),
    showInfo: (title: string, message: string, duration?: number) =>
      showNotification({ type: 'info', title, message, duration }),
    showWarning: (title: string, message: string, duration?: number) =>
      showNotification({ type: 'warning', title, message, duration })
  }
}

// Notificaciones predefinidas para el negocio
export const BusinessNotifications = {
  orderCreated: (orderId: string) => ({
    type: 'success' as const,
    title: '¡Orden Creada!',
    message: `Tu orden #${orderId.slice(-8)} ha sido procesada correctamente.`,
    duration: 5000
  }),
  paymentSuccess: (amount: number) => ({
    type: 'success' as const,
    title: '¡Pago Exitoso!',
    message: `Pago de $${amount} MXN procesado correctamente.`,
    duration: 5000
  }),
  downloadReady: () => ({
    type: 'info' as const,
    title: 'Descarga Lista',
    message: 'Tus fotos están listas para descargar.',
    duration: 7000
  }),
  uploadError: () => ({
    type: 'error' as const,
    title: 'Error en Upload',
    message: 'Hubo un problema subiendo tus fotos. Intenta nuevamente.',
    duration: 8000
  }),
  processingStarted: () => ({
    type: 'info' as const,
    title: 'Procesando Fotos',
    message: 'Tus fotos están siendo procesadas. Esto puede tomar unos minutos.',
    duration: 6000
  })
}

