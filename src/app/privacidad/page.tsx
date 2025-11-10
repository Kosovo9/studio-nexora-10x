'use client'

import { useState } from 'react'
import { getLanguage, type Language } from '@/lib/i18n'

export default function PrivacidadPage() {
  const [lang] = useState<Language>(getLanguage())

  const content = {
    es: {
      title: 'Política de Privacidad',
      lastUpdated: 'Última actualización: Enero 2025',
      sections: [
        {
          title: '1. Información que Recopilamos',
          content: 'Recopilamos información que nos proporcionas directamente, incluyendo imágenes que subes para procesamiento, información de contacto cuando creas una cuenta, y datos de pago cuando realizas una compra.',
        },
        {
          title: '2. Uso de la Información',
          content: 'Utilizamos tu información para procesar tus solicitudes de fotos, mejorar nuestro servicio, comunicarnos contigo sobre tu cuenta y pedidos, y enviar actualizaciones sobre nuestros servicios.',
        },
        {
          title: '3. Almacenamiento de Imágenes',
          content: 'Las imágenes que subes se almacenan de forma segura durante el procesamiento. Todas las imágenes se eliminan automáticamente después de 30 días por privacidad y seguridad. No compartimos tus imágenes con terceros.',
        },
        {
          title: '4. Seguridad',
          content: 'Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal. Sin embargo, ningún método de transmisión por Internet es 100% seguro.',
        },
        {
          title: '5. Cookies',
          content: 'Utilizamos cookies para mejorar tu experiencia, analizar el uso del sitio y personalizar contenido. Puedes controlar las cookies a través de la configuración de tu navegador.',
        },
        {
          title: '6. Tus Derechos',
          content: 'Tienes derecho a acceder, corregir, eliminar o restringir el procesamiento de tu información personal. Puedes ejercer estos derechos contactándonos en support@studionexora.com.',
        },
        {
          title: '7. Cambios a esta Política',
          content: 'Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos de cualquier cambio publicando la nueva política en esta página.',
        },
      ],
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: January 2025',
      sections: [
        {
          title: '1. Information We Collect',
          content: 'We collect information you provide directly, including images you upload for processing, contact information when you create an account, and payment data when you make a purchase.',
        },
        {
          title: '2. Use of Information',
          content: 'We use your information to process your photo requests, improve our service, communicate with you about your account and orders, and send updates about our services.',
        },
        {
          title: '3. Image Storage',
          content: 'Images you upload are stored securely during processing. All images are automatically deleted after 30 days for privacy and security. We do not share your images with third parties.',
        },
        {
          title: '4. Security',
          content: 'We implement technical and organizational security measures to protect your personal information. However, no method of Internet transmission is 100% secure.',
        },
        {
          title: '5. Cookies',
          content: 'We use cookies to improve your experience, analyze site usage, and personalize content. You can control cookies through your browser settings.',
        },
        {
          title: '6. Your Rights',
          content: 'You have the right to access, correct, delete, or restrict processing of your personal information. You can exercise these rights by contacting us at support@studionexora.com.',
        },
        {
          title: '7. Changes to This Policy',
          content: 'We may update this privacy policy occasionally. We will notify you of any changes by posting the new policy on this page.',
        },
      ],
    },
  }

  const t = content[lang]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{t.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{t.lastUpdated}</p>

          <div className="space-y-8">
            {t.sections.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {section.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Para preguntas sobre privacidad, contáctanos en{' '}
              <a href="mailto:support@studionexora.com" className="text-blue-500 hover:text-blue-600">
                support@studionexora.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

