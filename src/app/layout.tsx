import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/shared/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://studio-nexora.com'),
  title: {
    default: 'Studio Nexora - Fotos Profesionales con IA',
    template: '%s | Studio Nexora',
  },
  description: 'Transforma tus fotos en experiencias épicas con inteligencia artificial. Sesiones fotográficas profesionales con IA. Resultados épicos en minutos.',
  keywords: ['fotos profesionales', 'IA', 'inteligencia artificial', 'fotografía', 'retratos', 'Studio Nexora'],
  authors: [{ name: 'Studio Nexora' }],
  creator: 'Studio Nexora',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://studio-nexora.com',
    siteName: 'Studio Nexora',
    title: 'Studio Nexora - Fotos Profesionales con IA',
    description: 'Transforma tus fotos en experiencias épicas con inteligencia artificial',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Studio Nexora',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Nexora - Fotos Profesionales con IA',
    description: 'Transforma tus fotos en experiencias épicas con inteligencia artificial',
    images: ['/og-image.jpg'],
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
  description: 'Servicio de fotos profesionales generadas con inteligencia artificial',
  url: 'https://studio-nexora.com',
  telephone: '+52-XXX-XXX-XXXX',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MX',
  },
  priceRange: '$$',
  serviceType: 'Fotografía Profesional con IA',
  areaServed: {
    '@type': 'Country',
    name: 'México',
  },
  offers: {
    '@type': 'Offer',
    price: '200',
    priceCurrency: 'MXN',
    availability: 'https://schema.org/InStock',
  },
})

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
