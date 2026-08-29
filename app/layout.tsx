import type { Metadata } from 'next'
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppFab from '@/components/layout/WhatsAppFab'
import { EMPRESA, NOINDEX, SITE_URL } from '@/lib/site'
import { ld, organizacionSchema } from '@/lib/schema'

const display = Archivo({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'MACSA Foodservice — Distribuidor de alimentos congelados en Monterrey',
    template: '%s | MACSA Foodservice',
  },
  description: EMPRESA.descripcion,
  // ⚠️ El canonical NO se define aquí. Un canonical global heredado hace que
  // toda página sin canonical propio se declare duplicado del home. Cada
  // page.tsx define el suyo con `alternates.canonical`.
  openGraph: {
    type: 'website',
    siteName: EMPRESA.nombre,
    locale: 'es_MX',
  },
  twitter: { card: 'summary_large_image' },
  other: {
    'geo.region': 'MX-NLE',
    'geo.placename': 'Guadalupe, Nuevo León',
  },
  // Mientras el sitio viva en el dominio provisional de Cloudflare va noindex:
  // así el día del dominio definitivo no se arrastran mil duplicados.
  ...(NOINDEX ? { robots: { index: false, follow: false } } : {}),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={ld(organizacionSchema)} />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50
                     focus:bg-fry focus:px-4 focus:py-2 focus:font-semibold focus:text-navy-900"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  )
}
