import type { Metadata } from 'next'
import PaginaIntencion from '@/components/landing/PaginaIntencion'
import { intencion } from '@/lib/intenciones'

/* [S182] Página de búsqueda: la frase con que busca el comprador. Datos en lib/intenciones.ts. */
const it = intencion('papas-a-la-francesa-por-mayoreo')!

export const metadata: Metadata = {
  title: it.titulo,
  description: it.descripcion,
  alternates: { canonical: '/papas-a-la-francesa-por-mayoreo/' },
}

export default function Page() {
  return <PaginaIntencion slug="papas-a-la-francesa-por-mayoreo" />
}
