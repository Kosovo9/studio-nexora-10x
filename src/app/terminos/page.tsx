'use client'

import { useState } from 'react'
import { getLanguage, type Language } from '@/lib/i18n'

export default function TerminosPage() {
  const [lang] = useState<Language>(getLanguage())

  const content = {
    es: {
      title: 'Términos de Servicio',
      lastUpdated: 'Última actualización: Enero 2025',
      sections: [
        {
          title: '1. Aceptación de Términos',
          content: 'Al acceder y usar Studio Nexora, aceptas estar sujeto a estos términos de servicio. Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestro servicio.',
        },
        {
          title: '2. Servicio',
          content: 'Studio Nexora proporciona un servicio de generación de fotos profesionales usando inteligencia artificial. El servicio incluye la transformación de imágenes subidas por el usuario en fotos de estudio profesionales.',
        },
        {
          title: '3. Propiedad Intelectual',
          content: 'Todas las imágenes generadas son propiedad del cliente que las solicita. Studio Nexora no reclama derechos sobre las imágenes generadas. El cliente conserva todos los derechos sobre sus imágenes.',
        },
        {
          title: '4. Uso del Servicio',
          content: 'El usuario se compromete a usar el servicio de manera legal y ética. No se permite el uso del servicio para crear contenido ilegal, difamatorio o que viole derechos de terceros.',
        },
        {
          title: '5. Privacidad',
          content: 'Las imágenes subidas se procesan de forma segura y se eliminan automáticamente después de 30 días. No compartimos tus imágenes con terceros sin tu consentimiento explícito.',
        },
        {
          title: '6. Pagos y Reembolsos',
          content: 'Los pagos se procesan de forma segura. Ofrecemos reembolso del 200% si no estás satisfecho con los resultados, sujeto a nuestras políticas de reembolso.',
        },
        {
          title: '7. Limitación de Responsabilidad',
          content: 'Studio Nexora no se hace responsable por el uso que los clientes den a las imágenes generadas. El cliente es responsable de asegurar que tiene los derechos necesarios sobre las imágenes originales.',
        },
      ],
    },
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: January 2025',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: 'By accessing and using Studio Nexora, you agree to be bound by these terms of service. If you do not agree with any part of these terms, you must not use our service.',
        },
        {
          title: '2. Service',
          content: 'Studio Nexora provides a professional photo generation service using artificial intelligence. The service includes transforming user-uploaded images into professional studio photos.',
        },
        {
          title: '3. Intellectual Property',
          content: 'All generated images are the property of the client who requests them. Studio Nexora does not claim rights over generated images. The client retains all rights to their images.',
        },
        {
          title: '4. Use of Service',
          content: 'The user agrees to use the service legally and ethically. Use of the service to create illegal, defamatory, or third-party rights-violating content is not permitted.',
        },
        {
          title: '5. Privacy',
          content: 'Uploaded images are processed securely and automatically deleted after 30 days. We do not share your images with third parties without your explicit consent.',
        },
        {
          title: '6. Payments and Refunds',
          content: 'Payments are processed securely. We offer a 200% refund if you are not satisfied with the results, subject to our refund policies.',
        },
        {
          title: '7. Limitation of Liability',
          content: 'Studio Nexora is not responsible for how clients use the generated images. The client is responsible for ensuring they have the necessary rights to the original images.',
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
              Si tienes preguntas sobre estos términos, contáctanos en{' '}
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

