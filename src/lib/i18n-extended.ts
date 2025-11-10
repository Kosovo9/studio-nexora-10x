// Sistema de internacionalización extendido
import { useState, useEffect } from 'react'

export type Language = 'es' | 'en'

export const translations = {
  es: {
    // Navegación
    home: 'Inicio',
    pricing: 'Precios',
    affiliates: 'Afiliados',
    referrals: 'Recomendaciones',
    dashboard: 'Dashboard',
    
    // Hero
    heroTitle: 'Fotos Profesionales con IA',
    heroSubtitle: 'Transforma tus selfies en fotos de estudio profesionales',
    ctaButton: 'Crear Mis Fotos',
    
    // Precios
    individual: 'Individual',
    pets: 'Mascotas',
    family: 'Familia',
    teams: 'Equipos',
    perPhoto: 'por foto',
    save: 'Ahorra',
    
    // Features
    feature1: '100% Fidelidad',
    feature1Desc: 'Tus rasgos faciales preservados perfectamente',
    feature2: '2 Variantes',
    feature2Desc: 'Elige entre natural o mejoras profesionales',
    feature3: 'Descarga Inmediata',
    feature3Desc: 'Recibe tus fotos en minutos, no días',
    
    // Footer
    disclaimer: 'Studio Nexora genera imágenes usando IA. El cliente conserva todos los derechos sobre sus imágenes. Tus fotos se procesan de forma segura y se eliminan después de 30 días.',
    rights: 'Todos los derechos reservados.',
    
    // Legal
    terms: 'Términos de Servicio',
    privacy: 'Privacidad',
    contact: 'Contacto',
  },
  en: {
    // Navigation
    home: 'Home',
    pricing: 'Pricing',
    affiliates: 'Affiliates',
    referrals: 'Referrals',
    dashboard: 'Dashboard',
    
    // Hero
    heroTitle: 'Professional Photos with AI',
    heroSubtitle: 'Transform your selfies into professional studio photos',
    ctaButton: 'Create My Photos',
    
    // Pricing
    individual: 'Individual',
    pets: 'Pets',
    family: 'Family',
    teams: 'Teams',
    perPhoto: 'per photo',
    save: 'Save',
    
    // Features
    feature1: '100% Accuracy',
    feature1Desc: 'Your facial features perfectly preserved',
    feature2: '2 Variants',
    feature2Desc: 'Choose between natural or professional enhancements',
    feature3: 'Instant Download',
    feature3Desc: 'Receive your photos in minutes, not days',
    
    // Footer
    disclaimer: 'Studio Nexora generates images using AI. Client retains all rights to their images. Your photos are processed securely and deleted after 30 days.',
    rights: 'All rights reserved.',
    
    // Legal
    terms: 'Terms of Service',
    privacy: 'Privacy',
    contact: 'Contact',
  },
}

// Hook para usar traducciones
export function useTranslation() {
  if (typeof window === 'undefined') {
    return {
      t: (key: keyof typeof translations.es) => translations.es[key] || key,
      language: 'es' as Language,
      switchLanguage: () => {},
    }
  }

  const [language, setLanguage] = useState<Language>('es')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const t = (key: keyof typeof translations.es) => {
    return translations[language][key] || key
  }

  const switchLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  return { t, language, switchLanguage }
}

