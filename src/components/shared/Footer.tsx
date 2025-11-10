'use client'

import { useState } from 'react'
import { Mail, Phone, Globe } from 'lucide-react'
import { getLanguage, setLanguage, type Language } from '@/lib/i18n'

export default function Footer() {
  const [lang, setLang] = useState<Language>(getLanguage())

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang)
    setLang(newLang)
    window.location.reload()
  }

  const translations = {
    es: {
      about: 'Acerca de',
      services: 'Servicios',
      legal: 'Legal',
      contact: 'Contacto',
      disclaimer: 'Studio Nexora genera imágenes usando inteligencia artificial. El cliente conserva todos los derechos sobre sus imágenes generadas. Las imágenes se procesan de forma segura y se eliminan después de 30 días por privacidad y seguridad.',
      privacy: 'Privacidad',
      terms: 'Términos',
      rights: 'Todos los derechos reservados',
      language: 'Idioma',
    },
    en: {
      about: 'About',
      services: 'Services',
      legal: 'Legal',
      contact: 'Contact',
      disclaimer: 'Studio Nexora generates images using artificial intelligence. The client retains all rights to their generated images. Images are processed securely and deleted after 30 days for privacy and security.',
      privacy: 'Privacy',
      terms: 'Terms',
      rights: 'All rights reserved',
      language: 'Language',
    },
  }

  const t = translations[lang]

  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Studio Nexora</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Studio Nexora genera imágenes usando IA. El cliente conserva todos los derechos sobre sus imágenes. 
              Tus fotos se procesan de forma segura y se eliminan después de 30 días. Al usar nuestro servicio 
              aceptas nuestros términos y condiciones.
            </p>
            <p className="text-gray-300 text-sm">
              Studio Nexora generates images using AI. Client retains all rights to their images. 
              Your photos are processed securely and deleted after 30 days. By using our service 
              you accept our terms and conditions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="/affiliados" className="hover:text-white transition-colors">Afiliados</a></li>
              <li><a href="/referidos" className="hover:text-white transition-colors">Recomendaciones</a></li>
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/terminos" className="hover:text-white transition-colors">Términos de Servicio</a></li>
              <li><a href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</a></li>
            </ul>
            <div className="mt-4">
              <label className="block text-sm mb-2">{t.language}</label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleLanguageChange('es')}
                  className={`px-3 py-1 rounded text-sm ${
                    lang === 'es' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3 py-1 rounded text-sm ${
                    lang === 'en' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Studio Nexora. Todos los derechos reservados. | All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

