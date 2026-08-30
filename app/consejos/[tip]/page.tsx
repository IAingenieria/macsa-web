import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumb, CTAFinal, Seccion } from '@/components/landing/Secciones'
import { Reproductor, TarjetaTip } from '@/components/landing/Consejos'
import FormularioProspecto from '@/components/landing/FormularioProspecto'
import { TIPS, posterUrl, tip as buscarTip, videoUrl } from '@/lib/tips'
import { FAMILIAS, familia as buscarFamilia } from '@/lib/familias'
import { ANCLAS } from '@/lib/anclas'
import { SITE_URL } from '@/lib/site'
import { breadcrumbSchema, ld } from '@/lib/schema'

/**
 * Página de un consejo.
 *
 * Lleva `VideoObject` en JSON-LD porque es lo que hace que el video pueda
 * salir con miniatura en los resultados de búsqueda. Google lo pide con
 * nombre, descripción, miniatura, fecha de subida y duración en ISO 8601.
 */

export function generateStaticParams() {
  return TIPS.map((t) => ({ tip: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tip: string }>
}): Promise<Metadata> {
  const { tip } = await params
  const t = buscarTip(tip)
  if (!t) return {}

  return {
    title: `${t.titulo} — consejo de cocina en video`,
    description: `${t.gancho} ${t.puntos[0]}`.slice(0, 158),
    alternates: { canonical: `/consejos/${t.slug}/` },
    openGraph: {
      type: 'video.other',
      images: [{ url: posterUrl(t, 1200), alt: t.titulo }],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ tip: string }> }) {
  const { tip } = await params
  const t = buscarTip(tip)
  if (!t) notFound()

  const migas = [
    { nombre: 'Inicio', url: '/' },
    { nombre: 'Consejos', url: '/consejos/' },
    { nombre: t.titulo },
  ]

  const otros = TIPS.filter((x) => x.slug !== t.slug).slice(0, 3)
  const familias = FAMILIAS.filter((f) => t.relacionado.includes(f.slug))
  const anclas = ANCLAS.filter((a) => t.relacionado.includes(a.slug))

  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: t.titulo,
    description: [t.gancho, ...t.puntos].join(' '),
    thumbnailUrl: [posterUrl(t, 1200)],
    contentUrl: videoUrl(t),
    uploadDate: '2026-08-07',
    duration: `PT${t.segundos}S`,
    inLanguage: 'es-MX',
    isFamilyFriendly: true,
    publisher: { '@id': `${SITE_URL}/#organizacion` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(videoSchema)} />

      <Breadcrumb items={migas} />

      <article className="contenedor grid gap-10 py-12 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-16 lg:py-16">
        <div className="mx-auto w-full max-w-[360px]">
          <Reproductor t={t} prioridad />
        </div>

        <div>
          <p className="eyebrow !text-fry">
            Consejo {String(t.n).padStart(2, '0')} · {t.segundos} segundos
          </p>
          <h1 className="mt-3 font-display text-[2rem] font-bold leading-tight tracking-tight text-navy sm:text-[2.6rem]">
            {t.titulo}
          </h1>

          <p className="mt-5 max-w-prosa text-[18px] leading-relaxed text-humo-900">
            <span className="ancla">{t.gancho}</span>
          </p>

          <ul className="mt-6 max-w-prosa space-y-3 border-l-4 border-hielo-300 pl-5">
            {t.puntos.map((p) => (
              <li key={p} className="text-[16px] leading-relaxed text-humo">
                {p}
              </li>
            ))}
          </ul>

          <dl className="mt-9 divide-y divide-hielo-300 border-y border-hielo-300">
            <div className="flex flex-wrap justify-between gap-3 py-3">
              <dt className="text-[14px] text-humo-400">Para quién es</dt>
              <dd className="font-display text-[14.5px] font-semibold text-navy">{t.publico}</dd>
            </div>
            <div className="flex flex-wrap justify-between gap-3 py-3">
              <dt className="text-[14px] text-humo-400">Qué resuelve</dt>
              <dd className="max-w-md text-right text-[14.5px] text-humo-900">{t.dolor}</dd>
            </div>
            <div className="flex flex-wrap justify-between gap-3 py-3">
              <dt className="text-[14px] text-humo-400">De dónde sale el dato</dt>
              <dd className="text-right text-[14.5px] text-humo-900">{t.fuente}</dd>
            </div>
          </dl>

          {(familias.length > 0 || anclas.length > 0) && (
            <>
              <h2 className="mt-9 font-display text-[16px] font-bold text-navy">
                Productos de los que habla
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {[...anclas.map((a) => ({ slug: a.slug, nombre: a.nombre })), ...familias.map((f) => ({ slug: f.slug, nombre: f.nombre }))]
                  .filter((v, i, arr) => arr.findIndex((x) => x.slug === v.slug) === i)
                  .map((x) => (
                    <li key={x.slug}>
                      <Link
                        href={`/${x.slug}/`}
                        className="inline-block border border-hielo-300 bg-white px-4 py-2 text-[14px] text-humo-900 transition-colors hover:border-fry hover:text-fry-700"
                      >
                        {x.nombre}
                      </Link>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      </article>

      <Seccion eyebrow="Más consejos" titulo="Otros que le puedes pasar a tu cocina" fondo="hielo">
        <div className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-3">
          {otros.map((x) => (
            <TarjetaTip key={x.slug} t={x} />
          ))}
        </div>
        <Link href="/consejos/" className="btn-secundario mt-8">
          Ver los {TIPS.length} consejos
        </Link>
      </Seccion>

      <Seccion eyebrow="Contacto" titulo="¿Lo probamos en tu cocina?">
        <div className="max-w-2xl">
          <FormularioProspecto producto="una muestra para probar en mi freidora" />
        </div>
      </Seccion>

      <CTAFinal
        titulo="La única forma honesta de comparar"
        texto="Te llevamos una muestra sin compromiso y la fríes tú, con tu freidora y tu gente."
        mensaje={`Hola, vi el consejo «${t.titulo}». Me interesa una muestra.`}
      />
    </>
  )
}
