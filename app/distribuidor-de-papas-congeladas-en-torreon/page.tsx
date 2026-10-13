import type { Metadata } from 'next'
import PaginaIntencion from '@/components/landing/PaginaIntencion'
import { intencionEnCiudad } from '@/lib/intenciones'

/* [S182] Página de búsqueda en torreon: misma frase del comprador, con la entrega real de esa ciudad. */
const it = intencionEnCiudad('distribuidor-de-papas-congeladas-monterrey', 'torreon')

export const metadata: Metadata = {
  title: it.titulo,
  description: it.descripcion,
  alternates: { canonical: '/distribuidor-de-papas-congeladas-en-torreon/' },
  other: { 'geo.region': 'MX-COA', 'geo.placename': 'Torreón, Coahuila' },
}

export default function Page() {
  return <PaginaIntencion slug="distribuidor-de-papas-congeladas-monterrey" ciudad="torreon" />
}
