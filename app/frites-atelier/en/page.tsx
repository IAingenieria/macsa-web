import type { Metadata } from 'next'
import PaginaFritesAtelier from '@/components/landing/PaginaFritesAtelier'
import { FA_EN } from '@/lib/fritesAtelier'
import { asset } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Frites Atelier for Mexico, through MACSA',
  description:
    'The fries of the brand created by three-Michelin-star chef Sergio Herman, produced in the Netherlands by Lamb Weston. Available for Mexico through MACSA.',
  alternates: { canonical: '/frites-atelier/en/', languages: { 'es-MX': '/frites-atelier/', en: '/frites-atelier/en/' } },
  openGraph: { locale: 'en_US', images: [{ url: asset('/frites-atelier/charola.webp'), alt: 'A tray of Frites Atelier' }] },
}

export default function Page() {
  return <PaginaFritesAtelier t={FA_EN} />
}
