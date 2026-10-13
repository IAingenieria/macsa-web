import type { Metadata } from 'next'
import PaginaIntencion from '@/components/landing/PaginaIntencion'
import { intencionEnCiudad } from '@/lib/intenciones'

/* [S182] Página de búsqueda en saltillo: misma frase del comprador, con la entrega real de esa ciudad. */
const it = intencionEnCiudad('boneless-por-mayoreo', 'saltillo')

export const metadata: Metadata = {
  title: it.titulo,
  description: it.descripcion,
  alternates: { canonical: '/boneless-por-mayoreo-en-saltillo/' },
  other: { 'geo.region': 'MX-COA', 'geo.placename': 'Saltillo, Coahuila' },
}

export default function Page() {
  return <PaginaIntencion slug="boneless-por-mayoreo" ciudad="saltillo" />
}
