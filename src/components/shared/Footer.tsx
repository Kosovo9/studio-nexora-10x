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
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t.about}</h3>
            <p className="text-sm">
              Studio Nexora - Fotos profesionales con inteligencia artificial. 
              Transforma tus fotos en obras de arte.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t.services}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/crear" className="hover:text-white transition-colors">Crear Fotos</a></li>
              <li><a href="/dashboard" className="hover:text-white transition-colors">Mi Dashboard</a></li>
              <li><a href="/affiliados" className="hover:text-white transition-colors">Programa Afiliados</a></li>
              <li><a href="/referidos" className="hover:text-white transition-colors">Recomendaciones</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t.legal}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacidad" className="hover:text-white transition-colors">{t.privacy}</a></li>
              <li><a href="/terminos" className="hover:text-white transition-colors">{t.terms}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t.contact}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@studionexora.com" className="hover:text-white transition-colors">
                  support@studionexora.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="https://wa.me/521234567890" className="hover:text-white transition-colors">
                  WhatsApp
                </a>
              </li>
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

        {/* Disclaimer Legal */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
            {t.disclaimer}
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Studio Nexora. {t.rights}</p>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <Globe className="w-4 h-4" />
              <span>studio-nexora.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

