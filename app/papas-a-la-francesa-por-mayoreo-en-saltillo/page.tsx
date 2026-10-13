import type { Metadata } from 'next'
import PaginaIntencion from '@/components/landing/PaginaIntencion'
import { intencionEnCiudad } from '@/lib/intenciones'

/* [S182] Página de búsqueda en saltillo: misma frase del comprador, con la entrega real de esa ciudad. */
const it = intencionEnCiudad('papas-a-la-francesa-por-mayoreo', 'saltillo')

export const metadata: Metadata = {
  title: it.titulo,
  description: it.descripcion,
  alternates: { canonical: '/papas-a-la-francesa-por-mayoreo-en-saltillo/' },
  other: { 'geo.region': 'MX-COA', 'geo.placename': 'Saltillo, Coahuila' },
}

export default function Page() {
  return <PaginaIntencion slug="papas-a-la-francesa-por-mayoreo" ciudad="saltillo" />
}
