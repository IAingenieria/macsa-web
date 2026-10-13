import type { Metadata } from 'next'
import PaginaIntencion from '@/components/landing/PaginaIntencion'
import { intencionEnCiudad } from '@/lib/intenciones'

/* [S182] Distribuidor directo de Heinz en Saltillo: la entrega real del corredor. */
const it = intencionEnCiudad('distribuidor-de-heinz-monterrey', 'saltillo')

export const metadata: Metadata = {
  title: it.titulo,
  description: it.descripcion,
  alternates: { canonical: '/distribuidor-de-heinz-en-saltillo/' },
  other: { 'geo.region': 'MX-COA', 'geo.placename': 'Saltillo, Coahuila' },
}

export default function Page() {
  return <PaginaIntencion slug="distribuidor-de-heinz-monterrey" ciudad="saltillo" />
}
