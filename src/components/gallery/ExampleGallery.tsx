'use client'

import { useState } from 'react'
import { ZoomIn, X } from 'lucide-react'

export default function ExampleGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Placeholder para las imágenes de ejemplo
  const exampleImages = [
    {
      id: 1,
      title: 'Retrato Profesional',
      description: 'Transformación de selfie a foto de estudio',
      before: '/examples/before-1.jpg',
      after: '/examples/after-1.jpg'
    },
    {
      id: 2,
      title: 'Sesión Familiar',
      description: 'Grupo familiar con fondo profesional',
      before: '/examples/before-2.jpg',
      after: '/examples/after-2.jpg'
    },
    {
      id: 3,
      title: 'Mascotas',
      description: 'Retrato profesional para mascotas',
      before: '/examples/before-3.jpg',
      after: '/examples/after-3.jpg'
    },
    {
      id: 4,
      title: 'Equipo Corporativo',
      description: 'Fotos profesionales para empresa',
      before: '/examples/before-4.jpg',
      after: '/examples/after-4.jpg'
    }
  ]

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {exampleImages.map((image, index) => (
          <div key={image.id} className="text-center">
            <div 
              className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedImage(index)}
            >
              <div className="text-center p-4">
                <div className="text-3xl mb-2">📸</div>
                <p className="text-sm font-semibold text-gray-700">{image.title}</p>
                <p className="text-xs text-gray-500 mt-1">{image.description}</p>
                <div className="flex justify-center mt-2">
                  <ZoomIn className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de imagen ampliada */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full bg-white rounded-xl overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <h3 className="font-semibold mb-2">Antes</h3>
                  <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
                    <div className="text-6xl">👤</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Selfie original</p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold mb-2">Después</h3>
                  <div className="bg-gradient-to-br from-blue-200 to-purple-200 rounded-lg aspect-square flex items-center justify-center">
                    <div className="text-6xl">🌟</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Foto profesional Studio Nexora</p>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <h3 className="text-xl font-bold mb-2">{exampleImages[selectedImage].title}</h3>
                <p className="text-gray-600">{exampleImages[selectedImage].description}</p>
              </div>
            </div>
            
            <button
              className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-opacity"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

