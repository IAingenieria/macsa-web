import type { Metadata } from 'next'
import PaginaFamilia from '@/components/landing/PaginaFamilia'
import { familia, metaDesc } from '@/lib/familias'
import { faqBase } from '@/lib/faq'

const f = familia('aderezos')!

export const metadata: Metadata = {
  title: f.h1,
  description: metaDesc(f),
  alternates: { canonical: '/aderezos/' },
}

export default function Page() {
  return <PaginaFamilia f={f} preguntas={faqBase(f)} />
}
