import type { Metadata } from 'next'
import PaginaIntencion from '@/components/landing/PaginaIntencion'
import { intencionEnCiudad } from '@/lib/intenciones'

/* [S182] Página de búsqueda en torreon: misma frase del comprador, con la entrega real de esa ciudad. */
const it = intencionEnCiudad('pechuga-de-pollo-congelada-por-mayoreo', 'torreon')

export const metadata: Metadata = {
  title: it.titulo,
  description: it.descripcion,
  alternates: { canonical: '/pechuga-de-pollo-congelada-por-mayoreo-en-torreon/' },
  other: { 'geo.region': 'MX-COA', 'geo.placename': 'Torreón, Coahuila' },
}

export default function Page() {
  return <PaginaIntencion slug="pechuga-de-pollo-congelada-por-mayoreo" ciudad="torreon" />
}
