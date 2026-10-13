import type { Metadata } from 'next'
import PaginaIntencion from '@/components/landing/PaginaIntencion'
import { intencion } from '@/lib/intenciones'

/* [S182] Página de búsqueda (Heinz). Datos en lib/intenciones.ts. */
const it = intencion('insumos-room-service-hotel')!

export const metadata: Metadata = {
  title: it.titulo,
  description: it.descripcion,
  alternates: { canonical: '/insumos-room-service-hotel/' },
}

export default function Page() {
  return <PaginaIntencion slug="insumos-room-service-hotel" />
}
