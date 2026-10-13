import type { Metadata } from 'next'
import PaginaIntencion from '@/components/landing/PaginaIntencion'
import { intencion } from '@/lib/intenciones'

/* [S182] Página de búsqueda (Heinz). Datos en lib/intenciones.ts. */
const it = intencion('distribuidor-de-heinz-monterrey')!

export const metadata: Metadata = {
  title: it.titulo,
  description: it.descripcion,
  alternates: { canonical: '/distribuidor-de-heinz-monterrey/' },
}

export default function Page() {
  return <PaginaIntencion slug="distribuidor-de-heinz-monterrey" />
}
