import type { Metadata } from 'next'
import PaginaIntencion from '@/components/landing/PaginaIntencion'
import { intencion } from '@/lib/intenciones'

/* [S182] Página de búsqueda (Heinz). Datos en lib/intenciones.ts. */
const it = intencion('mayonesa-heinz-por-mayoreo')!

export const metadata: Metadata = {
  title: it.titulo,
  description: it.descripcion,
  alternates: { canonical: '/mayonesa-heinz-por-mayoreo/' },
}

export default function Page() {
  return <PaginaIntencion slug="mayonesa-heinz-por-mayoreo" />
}
