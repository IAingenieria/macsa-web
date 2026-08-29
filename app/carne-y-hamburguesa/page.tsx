import type { Metadata } from 'next'
import PaginaFamilia from '@/components/landing/PaginaFamilia'
import { familia, metaDesc } from '@/lib/familias'
import { guiaDe, preguntasDe } from '@/lib/guias'

const f = familia('carne-y-hamburguesa')!

export const metadata: Metadata = {
  title: f.h1,
  description: metaDesc(f),
  alternates: { canonical: '/carne-y-hamburguesa/' },
}

export default function Page() {
  return <PaginaFamilia f={f} preguntas={preguntasDe(f)} guia={guiaDe(f.slug)} />
}
