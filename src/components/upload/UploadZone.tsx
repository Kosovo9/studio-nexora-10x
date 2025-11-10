'use client'

import { useState, useCallback } from 'react'
import { Upload, X, CheckCircle2, AlertCircle } from 'lucide-react'

interface UploadZoneProps {
  onFilesChange: (files: File[]) => void
  maxFiles?: number
}

export default function UploadZone({ onFilesChange, maxFiles = 3 }: UploadZoneProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const validateFile = (file: File): string | null => {
    // Validar formato
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (!validTypes.includes(file.type)) {
      return `El archivo ${file.name} no es un formato válido (JPG/PNG)`
    }

    // Validar tamaño (5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return `El archivo ${file.name} excede 5MB`
    }

    return null
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }, [])

  const onFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    handleFiles(selectedFiles)
  }, [])

  const handleFiles = (newFiles: File[]) => {
    const newErrors: string[] = []
    const validFiles: File[] = []

    newFiles.forEach(file => {
      const error = validateFile(file)
      if (error) {
        newErrors.push(error)
      } else {
        validFiles.push(file)
      }
    })

    // Limitar cantidad de archivos
    const remainingSlots = maxFiles - files.length
    const filesToAdd = validFiles.slice(0, remainingSlots)

    if (filesToAdd.length < validFiles.length) {
      newErrors.push(`Solo puedes subir máximo ${maxFiles} fotos`)
    }

    setErrors(newErrors)
    const updatedFiles = [...files, ...filesToAdd]
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    setErrors([])
    onFilesChange(newFiles)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDrop={onDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => document.getElementById('file-input')?.click()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
          ${isDragging 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
        `}
      >
        <Upload className={`mx-auto h-12 w-12 mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
        <h3 className="text-lg font-semibold mb-2">Sube tus fotos</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-2">Arrastra o haz clic para seleccionar</p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Formatos: JPG, PNG • Máximo {maxFiles} fotos • 5MB por foto
        </p>
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/jpg"
          onChange={onFileSelect}
          className="hidden"
        />
      </div>

      {errors.length > 0 && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-red-800 dark:text-red-400 mb-1">Errores de validación:</h4>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                {errors.map((error, idx) => (
                  <li key={idx}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="font-medium">Fotos seleccionadas ({files.length}/{maxFiles})</h4>
          {files.map((file, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(index)
                }}
                className="text-red-500 hover:text-red-700 p-1 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

