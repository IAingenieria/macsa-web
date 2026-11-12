import Link from 'next/link'
import VideoPortada from '@/components/landing/VideoPortada'
import { rutaFicha } from '@/lib/rutaFicha'
import { waLink } from '@/lib/site'
import {
  HERO_TARJETA,
  PAPAS,
  RAZONES,
  VIDEO_FRIO,
  VIDEO_HERO,
  VIDEO_POR_QUE,
  videoPoster,
  videoSrc,
  type VideoPortada as Video,
} from '@/lib/videosPortada'

/** Las tres secciones con video de la portada (11-nov-2026). Los textos salen de los guiones ya aprobados. */

function Reproductor({ v }: { v: Video }) {
  return <VideoPortada src={videoSrc(v)} poster={videoPoster(v)} titulo={v.titulo} segundos={v.segundos} clave={v.clave} />
}

/**
 * 0 · El hero: la promoción de Frites Atelier, con Alex Jansen. En escritorio va a la derecha del titular; en
 * celular es una tarjeta chica debajo del titular que abre el video ahí mismo.
 */
export function VideoHero() {
  return (
    <figure>
      <VideoPortada
        src={videoSrc(VIDEO_HERO)}
        poster={videoPoster(VIDEO_HERO)}
        titulo={VIDEO_HERO.titulo}
        segundos={VIDEO_HERO.segundos}
        clave={VIDEO_HERO.clave}
        compacto={HERO_TARJETA}
      />
      <figcaption className="mt-3 hidden text-[13px] leading-snug text-hielo-200 lg:block">
        <span className="font-display font-semibold text-white">Frites Atelier</span>, disponible para México a
        través de MACSA. Con Alex Jansen, su Director Comercial, en su visita a Monterrey.{' '}
        <Link href="/frites-atelier/" className="font-semibold text-fry underline-offset-4 hover:underline">
          Conoce Frites Atelier
        </Link>
      </figcaption>
    </figure>
  )
}

/** 1 · «¿Por qué MACSA?» — va arriba, después de la barra de confianza. */
export function SeccionPorQueMacsa() {
  return (
    <section className="bg-white py-16 sm:py-20">
      {/* En celular el orden es título → video → razones; en escritorio el video ocupa la columna izquierda. */}
      <div className="contenedor grid gap-x-14 gap-y-8 md:grid-cols-[minmax(0,300px)_1fr]">
        <div className="md:col-start-2 md:row-start-1 md:self-end">
          <p className="eyebrow">Conócenos en {VIDEO_POR_QUE.segundos} segundos</p>
          <h2 className="mt-2 font-display text-[1.7rem] font-bold leading-tight tracking-tight text-navy sm:text-[2.1rem]">
            ¿Por qué MACSA?
          </h2>
          <p className="mt-4 max-w-prosa text-[16px] leading-relaxed text-humo">
            Nuestro almacén, nuestra gente y nuestras unidades, tal como son. Un solo proveedor para surtir tu cocina.
          </p>
        </div>
        <div className="mx-auto w-full max-w-[300px] md:col-start-1 md:row-span-2 md:row-start-1 md:self-center">
          <Reproductor v={VIDEO_POR_QUE} />
        </div>
        <div className="md:col-start-2 md:row-start-2">
          <ul className="grid gap-px bg-hielo-300 sm:grid-cols-2">
            {RAZONES.map((r) => (
              <li key={r.titulo} className="bg-white p-5">
                <h3 className="font-display text-[16px] font-bold text-navy">{r.titulo}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-humo">{r.texto}</p>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <a data-chat href={waLink('Hola, vi su video y quiero información de sus productos y precios.')} className="btn-primario">
              Pedir información
            </a>
            <Link href="/nosotros/" className="btn-secundario">
              Conocer a MACSA
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/** 2 · «No sólo hay una papa» — va después del catálogo. En celular se desliza de lado para no alargar la página. */
export function SeccionPapasVideo() {
  return (
    <section className="bg-navy py-16 text-white sm:py-20">
      <div className="contenedor">
        <p className="eyebrow !text-fry">Video · 20 segundos cada uno</p>
        <h2 className="mt-2 max-w-3xl font-display text-[1.7rem] font-bold leading-tight tracking-tight sm:text-[2.1rem]">
          No sólo hay una papa
        </h2>
        <p className="mt-4 max-w-prosa text-[16px] leading-relaxed text-hielo-200">
          Cada corte resuelve algo distinto en tu menú. Tres de los que tenemos en almacén, cada uno en un video corto.
        </p>
        <ul className="-mx-5 mt-9 flex snap-x snap-mandatory scroll-pl-5 gap-5 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-10">
          {PAPAS.map((p) => (
            <li key={p.clave} className="w-[68vw] max-w-[260px] shrink-0 snap-start sm:w-auto sm:max-w-[280px]">
              <Reproductor v={p} />
              <h3 className="mt-4 font-display text-[17px] font-bold">{p.titulo}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-hielo-200">{p.texto}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                <a
                  data-chat
                  href={waLink(`Hola, quiero precio del código ${p.sku} — ${p.titulo}.`)}
                  className="font-display text-[14px] font-semibold text-fry hover:text-white"
                >
                  Pedir precio
                </a>
                <Link href={rutaFicha(p.sku)} className="font-display text-[14px] font-semibold text-white underline-offset-4 hover:underline">
                  Ver ficha
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/papa-a-la-francesa/" className="btn-fantasma mt-9">
          Ver toda la papa a la francesa
        </Link>
      </div>
    </section>
  )
}

/** 3 · El corto «En frío», al lado de los pasos de la cadena de frío. */
export function VideoEnFrio() {
  return <Reproductor v={VIDEO_FRIO} />
}
