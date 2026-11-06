import Link from 'next/link'
import { asset } from '@/lib/site'

/** Banda que lleva a la página de Frites Atelier desde la portada y las páginas de papa (S206). */
export default function BandaFritesAtelier() {
  return (
    <section style={{ background: '#212B55' }} className="text-white">
      <div className="contenedor flex flex-wrap items-center gap-x-8 gap-y-4 py-7">
        <img
          src={asset('/frites-atelier/logo-frites-atelier-chico.png')}
          alt="Frites Atelier"
          width={120}
          height={106}
          loading="lazy"
          className="h-16 w-auto"
        />
        <p className="min-w-[240px] flex-1 text-[16.5px] leading-snug" style={{ fontFamily: 'Georgia, serif', color: '#FAF3E4' }}>
          Frites Atelier, la marca del chef Sergio Herman, disponible para México a través de MACSA.
        </p>
        <Link href="/frites-atelier/" className="btn-primario !py-2.5">
          Conocer la marca
        </Link>
      </div>
    </section>
  )
}
