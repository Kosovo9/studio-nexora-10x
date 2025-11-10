'use client'

import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Página No Encontrada</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver Atrás
          </button>
          <a
            href="/"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Ir al Inicio
          </a>
        </div>
      </div>
    </div>
  )
}

