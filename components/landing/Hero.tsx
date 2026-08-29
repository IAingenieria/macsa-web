import Link from 'next/link'
import { waLink } from '@/lib/site'

/**
 * Regla de la anatomía (§3): eyebrow → H1 único → párrafo Answer-First de
 * 40–60 palabras con la keyword en la primera frase → CTAs → chips.
 *
 * Las "frases ancla" se resaltan con color Y peso (nunca sólo color, por
 * accesibilidad) y no deben pasar del 15% de las palabras del párrafo.
 */

function resaltar(texto: string, anclas: string[]) {
  if (!anclas.length) return texto
  // Se parte el texto por las frases ancla conservando los separadores.
  const escapadas = anclas.map((a) => a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const re = new RegExp(`(${escapadas.join('|')})`, 'g')
  return texto.split(re).map((trozo, i) =>
    anclas.includes(trozo) ? (
      <span key={i} className="ancla">
        {trozo}
      </span>
    ) : (
      <span key={i}>{trozo}</span>
    ),
  )
}

export interface Chip {
  etiqueta: string
  valor: string
}

export default function Hero({
  eyebrow,
  h1,
  answerFirst,
  anclas = [],
  chips = [],
  ctaWhatsApp,
  ctaSecundario,
}: {
  eyebrow: string
  h1: string
  answerFirst: string
  anclas?: string[]
  chips?: Chip[]
  ctaWhatsApp: string
  ctaSecundario?: { href: string; label: string }
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      {/* Trama de fondo: rejilla de andén refrigerado */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #DCE9F2 1px, transparent 1px), linear-gradient(to bottom, #DCE9F2 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 70% 0%, black, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 0%, black, transparent 72%)',
        }}
      />

      <div className="contenedor relative py-16 sm:py-20 lg:py-24">
        <p className="eyebrow !text-fry">{eyebrow}</p>

        <h1 className="mt-4 max-w-4xl font-display text-[2.1rem] font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.4rem]">
          {h1}
        </h1>

        <p className="mt-6 max-w-prosa text-[17px] leading-relaxed text-hielo-200 sm:text-lg">
          {resaltar(answerFirst, anclas)}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a href={waLink(ctaWhatsApp)} className="btn-primario">
            Pedir por WhatsApp
          </a>
          {ctaSecundario && (
            <Link href={ctaSecundario.href} className="btn-fantasma">
              {ctaSecundario.label}
            </Link>
          )}
        </div>

        {chips.length > 0 && (
          <dl className="mt-12 grid grid-cols-2 gap-px border border-navy-700 bg-navy-700 sm:grid-cols-4">
            {chips.map((c) => (
              <div key={c.etiqueta} className="bg-navy-900 px-4 py-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-humo-400">
                  {c.etiqueta}
                </dt>
                <dd className="mt-1.5 font-display text-[15px] font-semibold leading-snug text-white">
                  {c.valor}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}
