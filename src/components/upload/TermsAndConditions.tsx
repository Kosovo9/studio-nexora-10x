'use client'

import { useState } from 'react'
import { Check, AlertCircle } from 'lucide-react'

interface TermsAndConditionsProps {
  onAccept: (accepted: boolean) => void
}

export default function TermsAndConditions({ onAccept }: TermsAndConditionsProps) {
  const [accepted, setAccepted] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  const handleAccept = (value: boolean) => {
    setAccepted(value)
    onAccept(value)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Términos y Condiciones de Uso</h3>
          <p className="text-sm text-gray-600">
            Al usar Studio Nexora, confirmas que cumples con nuestros requisitos de uso
          </p>
        </div>
      </div>

      <div className="space-y-3 text-sm text-gray-600 mb-4">
        <div className="flex items-start gap-2">
          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Eres mayor de 18 años o tienes consentimiento parental</span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
          <span>No subirás contenido pornográfico, violento o ilegal</span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Eres responsable del contenido que subes y su uso posterior</span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Studio Nexora no se hace responsable del uso que des a las imágenes generadas</span>
        </div>
      </div>

      <button
        onClick={() => setShowTerms(true)}
        className="text-blue-500 text-sm hover:text-blue-700 transition-colors mb-4"
      >
        👉 Ver términos completos y política de privacidad
      </button>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="terms-accept"
          checked={accepted}
          onChange={(e) => handleAccept(e.target.checked)}
          className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="terms-accept" className="text-sm text-gray-700">
          Acepto los términos y condiciones de uso de Studio Nexora
        </label>
      </div>

      {/* Modal de términos completos */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Términos y Condiciones Completos</h2>
              
              <div className="space-y-4 text-sm text-gray-600">
                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">1. Elegibilidad y Requisitos de Edad</h3>
                  <p>Debes ser mayor de 18 años para utilizar Studio Nexora. Los menores de edad deben contar con el consentimiento y supervisión de un padre o tutor legal.</p>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">2. Contenido Prohibido</h3>
                  <p>Está estrictamente prohibido subir contenido pornográfico, violento, discriminatorio, ilegal o que infrinja derechos de terceros. Nos reservamos el derecho de rechazar cualquier contenido que consideremos inapropiado.</p>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">3. Responsabilidad del Usuario</h3>
                  <p>Eres el único responsable del contenido que subes a nuestra plataforma y del uso que hagas de las imágenes generadas. Studio Nexora actúa como un procesador de imágenes y no se hace responsable del uso final que des a las fotografías generadas.</p>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">4. Propiedad Intelectual</h3>
                  <p>Conservas todos los derechos sobre tus imágenes originales. Las imágenes generadas son de tu propiedad, sujetas a estos términos de uso.</p>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">5. Privacidad y Seguridad</h3>
                  <p>Tus fotos se procesan de forma segura y se eliminan de nuestros servidores después de 30 días. No compartimos tu contenido con terceros.</p>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">6. Limitación de Responsabilidad</h3>
                  <p>Studio Nexora no se hace responsable por daños indirectos, incidentales o consecuentes resultantes del uso de nuestro servicio.</p>
                </section>
              </div>

              <button
                onClick={() => setShowTerms(false)}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold mt-6 hover:bg-blue-600 transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

