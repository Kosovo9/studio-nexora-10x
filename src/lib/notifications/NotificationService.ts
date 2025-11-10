// Sistema de notificaciones por email

interface Notification {
  id: string
  type: 'email' | 'sms' | 'push'
  recipient: string
  subject: string
  template: string
  data: any
  status: 'pending' | 'sent' | 'failed'
  createdAt: Date
}

export class NotificationService {
  private static instance: NotificationService

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  async sendOrderConfirmation(order: any) {
    const template = this.getOrderConfirmationTemplate(order)
    
    await this.sendEmail({
      to: order.email || order.whatsapp + '@whatsapp.com',
      subject: 'Confirmación de tu pedido - Studio Nexora',
      html: template
    })
  }

  async sendProcessingUpdate(orderId: string, status: string) {
    // Notificar progreso del procesamiento
    console.log(`Notificando actualización de procesamiento para orden ${orderId}: ${status}`)
  }

  async sendCompletionNotification(order: any, results: any) {
    const template = this.getCompletionTemplate(order, results)
    
    await this.sendEmail({
      to: order.email || order.whatsapp + '@whatsapp.com',
      subject: 'Tus fotos están listas - Studio Nexora',
      html: template
    })
  }

  private getOrderConfirmationTemplate(order: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>¡Gracias por tu pedido!</h1>
        </div>
        <div class="content">
          <p>Hola ${order.name || 'Cliente'},</p>
          <p>Hemos recibido tu pedido <strong>#${order.id.slice(-8)}</strong> para el paquete ${order.package}.</p>
          <p>Estamos procesando tus imágenes y te notificaremos cuando estén listas.</p>
        </div>
        <div class="footer">
          <p>Studio Nexora - Transformando tus momentos</p>
        </div>
      </body>
      </html>
    `
  }

  private getCompletionTemplate(order: any, results: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .header { background: #10B981; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .button { background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>¡Tus fotos están listas!</h1>
        </div>
        <div class="content">
          <p>Hola ${order.name || 'Cliente'},</p>
          <p>Tu pedido <strong>#${order.id.slice(-8)}</strong> ha sido procesado exitosamente.</p>
          <p>Tus fotos profesionales están listas para descargar.</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="https://studio-nexora.com/dashboard" class="button">Ver y Descargar Fotos</a>
          </p>
        </div>
        <div class="footer">
          <p>Studio Nexora - Transformando tus momentos</p>
        </div>
      </body>
      </html>
    `
  }

  private async sendEmail(email: { to: string; subject: string; html: string }) {
    // Integrar con servicio de email (Resend, SendGrid, etc.)
    console.log('Enviando email:', email)
    
    // Ejemplo con Resend (descomentar cuando tengas la API key):
    // if (process.env.RESEND_API_KEY) {
    //   await fetch('https://api.resend.com/emails', {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       from: 'Studio Nexora <hola@studionexora.com>',
    //       to: email.to,
    //       subject: email.subject,
    //       html: email.html,
    //     }),
    //   })
    // }
  }
}

