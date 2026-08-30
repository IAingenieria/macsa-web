import Link from 'next/link'
import { asset, waLink } from '@/lib/site'

/**
 * Regla de la anatomía (§3): eyebrow → H1 único → párrafo Answer-First de
 * 40–60 palabras con la keyword en la primera frase → CTAs → chips.
 *
 * Las "frases ancla" se resaltan con color Y peso (nunca sólo color, por
 * accesibilidad) y no deben pasar del 15% de las palabras del párrafo.
 *
 * La fotografía viene de las imágenes que se generaron con KIE.ai para la
 * serie de video. Las de estudio están sobre fondo navy, que es el mismo
 * color de marca, así que la foto se funde con el hero en vez de pelearse
 * con él: se coloca a la derecha y se desvanece hacia el texto con un
 * degradado. El texto nunca queda encima de la foto en pantalla grande.
 */

function resaltar(texto: string, anclas: string[]) {
  if (!anclas.length) return texto
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
  imagen,
  imagenAlt,
  lambWeston = false,
}: {
  eyebrow: string
  h1: string
  answerFirst: string
  anclas?: string[]
  chips?: Chip[]
  ctaWhatsApp: string
  ctaSecundario?: { href: string; label: string }
  /** Nombre del archivo en public/hero, sin extensión */
  imagen?: string
  imagenAlt?: string
  /** Muestra el sello de distribuidor oficial con el logotipo */
  lambWeston?: boolean
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      {/* Fotografía: panel derecho que se funde con el navy del hero */}
      {imagen && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[52%]">
          <img
            src={asset(`/hero/${imagen}.webp`)}
            alt=""
            width={900}
            height={1200}
            className="h-full w-full object-cover object-center"
          />
          {/* Degradado hacia el texto. En móvil cubre casi todo para que el
              titular siga siendo legible sobre la foto. */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/92 to-navy-900/55 lg:from-navy-900 lg:via-navy-900/70 lg:to-transparent" />
          <div className="absolute inset-0 bg-navy-900/45 lg:hidden" />
        </div>
      )}

      {/* Trama de fondo: rejilla de andén refrigerado */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #DCE9F2 1px, transparent 1px), linear-gradient(to bottom, #DCE9F2 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at 20% 0%, black, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 20% 0%, black, transparent 70%)',
        }}
      />

      <div className="contenedor relative py-16 sm:py-20 lg:py-24">
        <div className={imagen ? 'lg:max-w-[54%]' : ''}>
          <p className="eyebrow !text-fry">{eyebrow}</p>

          <h1 className="mt-4 max-w-4xl font-display text-[2.1rem] font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            {h1}
          </h1>

          <p className="mt-6 max-w-prosa text-[17px] leading-relaxed text-hielo-200 sm:text-lg">
            {resaltar(answerFirst, anclas)}
          </p>

          {/* Sello de distribuidor oficial. El logotipo va sobre blanco porque
              es multicolor de marca y no se puede invertir. Uso autorizado
              por Edgar Mayén (Lamb Weston), 2026-08-29. */}
          {lambWeston && (
            <div className="mt-8 inline-flex flex-col gap-3 rounded-sm bg-white px-7 py-5 shadow-panel sm:flex-row sm:items-center sm:gap-6">
              <span className="font-mono text-[10px] font-semibold uppercase leading-tight tracking-[0.16em] text-humo-400 sm:max-w-[7rem]">
                Distribuidor
                <br className="hidden sm:block" /> oficial
              </span>
              <span aria-hidden="true" className="hidden h-10 w-px bg-hielo-300 sm:block" />
              <img
                src={asset('/lamb-weston.png')}
                alt="Lamb Weston — Possibilities in Potatoes"
                width={444}
                height={113}
                className="h-12 w-auto sm:h-14"
              />
            </div>
          )}

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
        </div>

        {chips.length > 0 && (
          <dl className="relative mt-12 grid grid-cols-2 gap-px border border-navy-700 bg-navy-700 sm:grid-cols-4">
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
