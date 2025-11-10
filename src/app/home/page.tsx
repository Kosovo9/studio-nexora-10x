'use client'

import dynamic from 'next/dynamic'

// Cargar EarthViewer con fallback
const EarthViewer = dynamic(() => import('@/components/shared/EarthViewer'), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="text-white text-center">
        <div className="text-6xl mb-4">🌍</div>
        <h1 className="text-4xl font-bold mb-2">Studio Nexora</h1>
        <p className="text-xl opacity-90">Cargando experiencia espacial...</p>
      </div>
    </div>
  )
})

export default function HomePage() {
  return (
    <div className="relative h-screen overflow-hidden">
      <EarthViewer 
        width="100vw"
        height="100vh"
        autoRotate={true}
        showSatellite={true}
        language="es"
      />
      <div className="absolute bottom-10 right-10 text-white text-right z-10">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Studio Nexora
        </h1>
        <p className="text-xl opacity-90 mb-4">Fotos profesionales con IA</p>
        <a
          href="/"
          className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
        >
          Ver Landing Page 🚀
        </a>
      </div>
    </div>
  )
}

