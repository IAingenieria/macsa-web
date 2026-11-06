import type { Metadata } from 'next'
import PaginaFritesAtelier from '@/components/landing/PaginaFritesAtelier'
import { FA_ES } from '@/lib/fritesAtelier'
import { asset } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Frites Atelier para México, a través de MACSA',
  description:
    'La papa de la marca creada por el chef Sergio Herman, tres estrellas Michelin, producida en Holanda por Lamb Weston. Disponible para México a través de MACSA. Degustación con reservación.',
  alternates: { canonical: '/frites-atelier/', languages: { 'es-MX': '/frites-atelier/', en: '/frites-atelier/en/' } },
  openGraph: { images: [{ url: asset('/frites-atelier/charola.webp'), alt: 'Charola de Frites Atelier' }] },
}

export default function Page() {
  return <PaginaFritesAtelier t={FA_ES} />
}
