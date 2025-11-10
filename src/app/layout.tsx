import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Studio Nexora - Fotos Profesionales con IA',
  description: 'Transforma tus fotos en experiencias épicas con inteligencia artificial',
}

function ClerkProviderFallback({ children }: { children: React.ReactNode }) {
  // Si no hay clave de Clerk, usar modo demo
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <html lang="es">
        <body className={inter.className}>
          <div className="min-h-screen bg-black">
            {children}
          </div>
        </body>
      </html>
    )
  }
  
  // Si hay Clerk, usar el provider real
  try {
    const { ClerkProvider } = require('@clerk/nextjs')
    return (
      <ClerkProvider>
        <html lang="es">
          <body className={inter.className}>
            <div className="min-h-screen bg-black">
              {children}
            </div>
          </body>
        </html>
      </ClerkProvider>
    )
  } catch (error) {
    // Fallback si Clerk no está disponible
    return (
      <html lang="es">
        <body className={inter.className}>
          <div className="min-h-screen bg-black">
            {children}
          </div>
        </body>
      </html>
    )
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClerkProviderFallback>{children}</ClerkProviderFallback>
}
