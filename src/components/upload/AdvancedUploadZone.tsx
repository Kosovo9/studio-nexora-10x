'use client'

import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, CheckCircle, AlertCircle, Image as ImageIcon } from 'lucide-react'

interface UploadedFile extends File {
  preview: string
  id: string
  status: 'uploading' | 'success' | 'error' | 'processing'
  progress?: number
}

interface AdvancedUploadZoneProps {
  onFilesChange: (files: UploadedFile[]) => void
  maxFiles?: number
  acceptedFormats?: string[]
}

export const AdvancedUploadZone: React.FC<AdvancedUploadZoneProps> = ({ 
  onFilesChange, 
  maxFiles = 10, 
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp'] 
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
      ...file,
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
      status: 'uploading',
      progress: 0
    }))

    // Simular progreso de upload
    newFiles.forEach((file) => {
      simulateUpload(file, (progress) => {
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, progress } : f
        ))
        
        if (progress === 100) {
          setTimeout(() => {
            setFiles(prev => prev.map(f => 
              f.id === file.id ? { ...f, status: 'success' } : f
            ))
          }, 500)
        }
      })
    })

    setFiles(prev => [...prev, ...newFiles])
    onFilesChange([...files, ...newFiles])
  }, [files, onFilesChange])

  const simulateUpload = (file: UploadedFile, onProgress: (progress: number) => void) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
      }
      onProgress(progress)
    }, 200)
  }

  const removeFile = (id: string) => {
    setFiles(prev => {
      const updated = prev.filter(file => {
        if (file.id === id) {
          URL.revokeObjectURL(file.preview)
        }
        return file.id !== id
      })
      onFilesChange(updated)
      return updated
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': acceptedFormats
    },
    maxFiles,
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [files])

  return (
    <div className="space-y-6">
      {/* Zona de Drop */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-semibold mb-2">
          {isDragActive ? 'Suelta las imágenes aquí' : 'Arrastra tus imágenes o haz clic'}
        </p>
        <p className="text-sm text-gray-500">
          PNG, JPG, WEBP hasta 10MB. Máximo {maxFiles} archivos.
        </p>
      </div>

      {/* Preview de Archivos */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <div key={file.id} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border bg-gray-100">
                <img
                  src={file.preview}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay de Estado */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  {file.status === 'uploading' && (
                    <div className="text-white text-center">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-xs">{Math.round(file.progress || 0)}%</p>
                    </div>
                  )}
                  {file.status === 'success' && (
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  )}
                  {file.status === 'error' && (
                    <AlertCircle className="w-8 h-8 text-red-400" />
                  )}
                </div>
              </div>
              
              {/* Botón Eliminar */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(file.id)
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              
              {/* Info del Archivo */}
              <div className="mt-2">
                <p className="text-xs font-medium truncate">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

