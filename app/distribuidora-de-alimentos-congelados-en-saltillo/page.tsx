import type { Metadata } from 'next'
import PaginaIntencion from '@/components/landing/PaginaIntencion'
import { intencionEnCiudad } from '@/lib/intenciones'

/* [S182] Página de búsqueda en saltillo: misma frase del comprador, con la entrega real de esa ciudad. */
const it = intencionEnCiudad('distribuidora-de-alimentos-congelados-monterrey', 'saltillo')

export const metadata: Metadata = {
  title: it.titulo,
  description: it.descripcion,
  alternates: { canonical: '/distribuidora-de-alimentos-congelados-en-saltillo/' },
  other: { 'geo.region': 'MX-COA', 'geo.placename': 'Saltillo, Coahuila' },
}

export default function Page() {
  return <PaginaIntencion slug="distribuidora-de-alimentos-congelados-monterrey" ciudad="saltillo" />
}
