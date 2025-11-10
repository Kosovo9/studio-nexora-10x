'use client'

import { useState, useEffect } from 'react'
import { Phone, Copy, Check, Send, Clock } from 'lucide-react'
import { getOrders, type Order } from '@/lib/orders'

interface WhatsAppMessage {
  id: string
  template: string
  stage: 'reception' | 'preview' | 'reminder' | 'delivery'
  sent: boolean
  sentAt?: string
  orderId?: string
}

const MESSAGE_TEMPLATES = {
  reception: (name: string, packageName: string) => 
    `¡Hola ${name}! 👋\n\nGracias por elegir Studio Nexora. Hemos recibido tu pedido del paquete *${packageName}*.\n\nEstamos procesando tu solicitud y te enviaremos un preview en breve.\n\n¿Tienes alguna pregunta? Estamos aquí para ayudarte. 🚀`,
  
  preview: (name: string) => 
    `¡Hola ${name}! 🎨\n\n¡Buenas noticias! Tu preview está listo. Puedes verlo y seleccionar tus favoritas en tu dashboard.\n\nVisita: [tu-dashboard-url]\n\n¿Te gustan los resultados? ¡Estamos emocionados de escuchar tu opinión! ✨`,
  
  reminder: (name: string) => 
    `Hola ${name}! ⏰\n\nSolo un recordatorio: tu preview está esperando tu selección.\n\nNo olvides revisar tus fotos y elegir tus favoritas. ¡Estamos aquí si necesitas ayuda! 💫`,
  
  delivery: (name: string, packageName: string) => 
    `¡${name}! 🎉\n\n¡Tus fotos del paquete *${packageName}* están listas para descargar!\n\nAccede a tu dashboard para descargarlas:\n[tu-dashboard-url]\n\nGracias por confiar en Studio Nexora. ¡Esperamos verte de nuevo! 🌟`
}

export default function WhatsAppFlow({ orderId }: { orderId?: string }) {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    loadMessages()
  }, [orderId])

  const loadMessages = () => {
    const stored = localStorage.getItem('whatsapp-messages')
    if (stored) {
      const allMessages = JSON.parse(stored)
      const filtered = orderId 
        ? allMessages.filter((m: WhatsAppMessage) => m.orderId === orderId)
        : allMessages
      setMessages(filtered)
    } else {
      // Generar mensajes iniciales si hay órdenes
      const orders = getOrders()
      if (orders.length > 0) {
        generateInitialMessages(orders)
      }
    }
  }

  const generateInitialMessages = (orders: Order[]) => {
    const newMessages: WhatsAppMessage[] = []
    
    orders.forEach(order => {
      if (order.status === 'pendiente') {
        newMessages.push({
          id: `msg-${order.id}-reception`,
          template: MESSAGE_TEMPLATES.reception(order.name, order.package),
          stage: 'reception',
          sent: false,
          orderId: order.id,
        })
      } else if (order.status === 'pagado') {
        newMessages.push({
          id: `msg-${order.id}-preview`,
          template: MESSAGE_TEMPLATES.preview(order.name),
          stage: 'preview',
          sent: false,
          orderId: order.id,
        })
      }
    })

    if (newMessages.length > 0) {
      const allMessages = JSON.parse(localStorage.getItem('whatsapp-messages') || '[]')
      const combined = [...allMessages, ...newMessages.filter(m => 
        !allMessages.some((am: WhatsAppMessage) => am.id === m.id)
      )]
      localStorage.setItem('whatsapp-messages', JSON.stringify(combined))
      setMessages(orderId ? combined.filter(m => m.orderId === orderId) : combined)
    }
  }

  const sendMessage = (message: WhatsAppMessage) => {
    const whatsappNumber = '521234567890' // Reemplazar con número real
    const encodedMessage = encodeURIComponent(message.template)
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    
    window.open(url, '_blank')
    
    // Marcar como enviado
    const updated = messages.map(m =>
      m.id === message.id
        ? { ...m, sent: true, sentAt: new Date().toISOString() }
        : m
    )
    setMessages(updated)
    
    // Guardar en localStorage
    const allMessages = JSON.parse(localStorage.getItem('whatsapp-messages') || '[]')
    const updatedAll = allMessages.map((m: WhatsAppMessage) =>
      m.id === message.id
        ? { ...m, sent: true, sentAt: new Date().toISOString() }
        : m
    )
    localStorage.setItem('whatsapp-messages', JSON.stringify(updatedAll))
    
    // Tracking de conversión
    const conversions = JSON.parse(localStorage.getItem('whatsapp-conversions') || '[]')
    conversions.push({
      messageId: message.id,
      stage: message.stage,
      sentAt: new Date().toISOString(),
    })
    localStorage.setItem('whatsapp-conversions', JSON.stringify(conversions))
  }

  const copyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const getStageLabel = (stage: string) => {
    const labels: Record<string, string> = {
      reception: 'Recepción',
      preview: 'Preview',
      reminder: 'Recordatorio',
      delivery: 'Entrega',
    }
    return labels[stage] || stage
  }

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      reception: 'bg-blue-500/20 text-blue-400',
      preview: 'bg-purple-500/20 text-purple-400',
      reminder: 'bg-yellow-500/20 text-yellow-400',
      delivery: 'bg-green-500/20 text-green-400',
    }
    return colors[stage] || 'bg-gray-500/20 text-gray-400'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Mensajes WhatsApp</h3>
        <button
          onClick={() => {
            const orders = getOrders()
            generateInitialMessages(orders)
          }}
          className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
        >
          Generar Mensajes
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <Phone className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No hay mensajes generados aún</p>
          <p className="text-sm mt-2">Crea una orden para generar mensajes automáticos</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getStageColor(message.stage)}`}>
                    {getStageLabel(message.stage)}
                  </span>
                  {message.sent && (
                    <span className="text-xs text-green-400 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Enviado
                    </span>
                  )}
                </div>
                {message.sentAt && (
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(message.sentAt).toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-gray-300 text-sm mb-4 whitespace-pre-wrap">
                {message.template}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => copyMessage(message.template, message.id)}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm transition-colors"
                >
                  {copied === message.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copiar
                    </>
                  )}
                </button>
                <button
                  onClick={() => sendMessage(message)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {message.sent ? 'Reenviar' : 'Enviar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-sm text-blue-300">
          💡 <strong>Tip:</strong> Los mensajes se generan automáticamente cuando se crean órdenes. 
          Puedes personalizarlos antes de enviarlos.
        </p>
      </div>
    </div>
  )
}

