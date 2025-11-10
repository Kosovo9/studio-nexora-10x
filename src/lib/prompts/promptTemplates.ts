// =============================================
// STUDIO NEXORA - SISTEMA DE PROMPTS PROFESIONALES
// =============================================
// Este archivo contiene todos los prompts optimizados para IA
// Organizados por categoría y tipo de servicio

export interface PromptTemplate {
  id: string
  category: 'individual' | 'mascotas' | 'familia' | 'grupales'
  subcategory?: string
  variantA: string  // 100% fidelidad - Natural
  variantB: string  // Mejoras realistas - Beauty Pro
  variables: {
    gender?: 'hombre' | 'mujer' | 'niño' | 'niña'
    ageRange?: string
    style?: string
    background?: string
  }
  tags: string[]
}

// =======================
// PROMPTS INDIVIDUALES
// =======================
export const individualPrompts: PromptTemplate[] = [
  {
    id: 'indv-001',
    category: 'individual',
    subcategory: 'retrato-profesional',
    variantA: `Retrato profesional de estudio, iluminación suave natural, fondo neutro, 85mm f/1.8, alta fidelidad a rasgos faciales, piel natural con textura, ojos nítidos, expresión auténtica, calidad fotográfica 8K`,
    variantB: `Retrato profesional premium, iluminación cinematográfica suave, mejoras sutiles en piel manteniendo textura natural, ojos realzados naturalmente, expresión confiada, fondo profesional desenfocado, calidad estudio premium`,
    variables: {
      gender: 'hombre',
      ageRange: 'adulto',
      style: 'profesional'
    },
    tags: ['retrato', 'profesional', 'linkedin']
  },
  {
    id: 'indv-002',
    category: 'individual',
    subcategory: 'estilo-moderno',
    variantA: `Retrato contemporáneo, iluminación lateral suave, expresión natural, fondo minimalista, fidelidad absoluta a características faciales, textura de piel real, cabello natural, 50mm f/2.8`,
    variantB: `Retrato moderno mejorado, iluminación de estudio profesional, piel con mejoras sutiles manteniendo autenticidad, expresión optimizada, fondo creativo desenfocado, estilo editorial contemporáneo`,
    variables: {
      gender: 'mujer',
      ageRange: 'adulto-joven',
      style: 'moderno'
    },
    tags: ['moderno', 'contemporáneo', 'redes-sociales']
  }
]

// =======================
// PROMPTS MASCOTAS
// =======================
export const mascotasPrompts: PromptTemplate[] = [
  {
    id: 'masc-001',
    category: 'mascotas',
    subcategory: 'perro-retrato',
    variantA: `Retrato profesional de perro, iluminación natural suave, expresión canina auténtica, fondo neutro, enfoque nítido en ojos y características, pelaje natural detallado, 100mm f/2.8, calidad fotográfica`,
    variantB: `Retrato premium de mascota, iluminación de estudio profesional, expresión enfatizada naturalmente, pelaje realzado manteniendo textura, fondo creativo desenfocado, estilo photography pet profesional`,
    variables: {
      style: 'retrato'
    },
    tags: ['mascota', 'perro', 'retrato']
  }
]

// =======================
// PROMPTS FAMILIA
// =======================
export const familiaPrompts: PromptTemplate[] = [
  {
    id: 'fam-001',
    category: 'familia',
    subcategory: 'grupo-familiar',
    variantA: `Fotografía familiar profesional, composición natural, iluminación suave uniforme, expresiones auténticas, fondo armónico, fidelidad individual a cada rostro, 35mm f/4, estilo documental premium`,
    variantB: `Sesión familiar premium, iluminación de estudio optimizada, cohesión grupal natural, mejoras sutiles individuales manteniendo autenticidad, fondo profesional, estilo retrato familiar contemporáneo`,
    variables: {
      style: 'tradicional'
    },
    tags: ['familia', 'grupo', 'tradicional']
  }
]

// =======================
// PROMPTS GRUPALES
// =======================
export const grupalesPrompts: PromptTemplate[] = [
  {
    id: 'grup-001',
    category: 'grupales',
    subcategory: 'equipo-corporativo',
    variantA: `Fotografía corporativa grupal, composición profesional, iluminación uniforme, expresiones confiadas, vestimenta coherente, fondo de oficina premium, fidelidad individual, 50mm f/5.6`,
    variantB: `Retrato de equipo corporativo premium, iluminación de estudio profesional, cohesión grupal, mejoras sutiles manteniendo profesionalismo, fondo ejecutivo, estilo corporativo moderno`,
    variables: {
      style: 'corporativo'
    },
    tags: ['corporativo', 'equipo', 'profesional']
  }
]

// Función para seleccionar prompt según categoría
export function getPromptForCategory(category: string, variables?: any): PromptTemplate {
  const prompts = {
    individual: individualPrompts,
    mascotas: mascotasPrompts,
    familia: familiaPrompts,
    grupales: grupalesPrompts
  }

  const categoryPrompts = prompts[category as keyof typeof prompts] || individualPrompts
  // Lógica para seleccionar el prompt más adecuado basado en variables
  return categoryPrompts[0] // Por ahora devuelve el primero, se puede mejorar la lógica
}

// Función para validar y sanitizar prompts
export function sanitizePrompt(prompt: string, userVariables: any): string {
  // Aquí iría la lógica para sanitizar y personalizar prompts
  return prompt
}

