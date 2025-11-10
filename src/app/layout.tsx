import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/shared/Footer'
import { NotificationSystem } from '@/components/notifications/NotificationSystem'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://studio-nexora.com'),
  title: 'Studio Nexora - Fotos Profesionales con IA | Transforma Selfies en Fotos de Estudio',
  description: 'Transforma tus selfies en fotos de estudio profesionales con IA. 100% fidelidad, 2 variantes, descarga inmediata. Precios desde $200 MXN.',
  keywords: 'fotos profesionales, IA, fotos de estudio, selfies, México, precios accesibles',
  authors: [{ name: 'Studio Nexora' }],
  creator: 'Studio Nexora',
  publisher: 'Studio Nexora',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Studio Nexora - Fotos Profesionales con IA',
    description: 'Transforma tus selfies en fotos de estudio profesionales con IA',
    url: 'https://studio-nexora.com',
    siteName: 'Studio Nexora',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Studio Nexora - Fotos Profesionales con IA',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Nexora - Fotos Profesionales con IA',
    description: 'Transforma tus selfies en fotos de estudio profesionales con IA',
    images: ['/og-image.jpg'],
    creator: '@studionexora',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

// Schema.org JSON-LD para SEO
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Studio Nexora',
  description: 'Servicio de fotos profesionales generadas con IA',
  url: 'https://studio-nexora.com',
  telephone: '+52-XXX-XXX-XXXX',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MX',
  },
  priceRange: '$$',
  serviceType: 'Fotografía digital con IA',
})

function ClerkProviderFallback({ children }: { children: React.ReactNode }) {
  // Si no hay clave de Clerk, usar modo demo
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <html lang="es">
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#000000" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLd }}
          />
        </head>
        <body className={inter.className}>
          <div className="min-h-screen bg-black flex flex-col">
            <main className="flex-1">
              {children}
            </main>
            <Footer />
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
          <head>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: jsonLd }}
            />
          </head>
          <body className={inter.className}>
            <div className="min-h-screen bg-black flex flex-col">
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <NotificationSystem />
          </body>
        </html>
      </ClerkProvider>
    )
  } catch (error) {
    // Fallback si Clerk no está disponible
    return (
      <html lang="es">
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#000000" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLd }}
          />
        </head>
        <body className={inter.className}>
          <div className="min-h-screen bg-black flex flex-col">
            <main className="flex-1">
              {children}
            </main>
            <Footer />
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
