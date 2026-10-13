import type { Metadata } from 'next'
import PaginaIntencion from '@/components/landing/PaginaIntencion'
import { intencionEnCiudad } from '@/lib/intenciones'

/* [S182] Distribuidor directo de Heinz en Torreón: la entrega real del corredor. */
const it = intencionEnCiudad('distribuidor-de-heinz-monterrey', 'torreon')

export const metadata: Metadata = {
  title: it.titulo,
  description: it.descripcion,
  alternates: { canonical: '/distribuidor-de-heinz-en-torreon/' },
  other: { 'geo.region': 'MX-COA', 'geo.placename': 'Torreón, Coahuila' },
}

export default function Page() {
  return <PaginaIntencion slug="distribuidor-de-heinz-monterrey" ciudad="torreon" />
}
