import type { Metadata } from 'next'
import PaginaIntencion from '@/components/landing/PaginaIntencion'
import { intencion } from '@/lib/intenciones'

/* [S182] Página de búsqueda: la frase con que busca el comprador. Datos en lib/intenciones.ts. */
const it = intencion('distribuidora-de-alimentos-congelados-monterrey')!

export const metadata: Metadata = {
  title: it.titulo,
  description: it.descripcion,
  alternates: { canonical: '/distribuidora-de-alimentos-congelados-monterrey/' },
}

export default function Page() {
  return <PaginaIntencion slug="distribuidora-de-alimentos-congelados-monterrey" />
}
