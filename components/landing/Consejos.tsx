import Link from 'next/link'
import { Seccion } from '@/components/landing/Secciones'
import { posterUrl, tipsDe, videoUrl, type Tip } from '@/lib/tips'

/* ── Reproductor ───────────────────────────────────────────────────── */

export function Reproductor({ t, prioridad = false }: { t: Tip; prioridad?: boolean }) {
  return (
    <video
      controls
      playsInline
      preload={prioridad ? 'metadata' : 'none'}
      poster={posterUrl(t, prioridad ? 900 : 600)}
      className="aspect-[9/16] w-full bg-navy-900 object-cover"
      aria-label={`Video: ${t.titulo}`}
    >
      <source src={videoUrl(t)} type="video/mp4" />
      Tu navegador no puede reproducir este video.{' '}
      <a href={videoUrl(t)}>Descárgalo aquí</a>.
    </video>
  )
}

/* ── Tarjeta para la rejilla ───────────────────────────────────────── */

export function TarjetaTip({ t }: { t: Tip }) {
  return (
    <Link
      href={`/consejos/${t.slug}/`}
      className="group flex flex-col bg-white transition-colors hover:bg-hielo-50"
    >
      <div className="relative aspect-[9/16] overflow-hidden bg-navy-900">
        <img
          src={posterUrl(t, 500)}
          alt={`Consejo de cocina: ${t.titulo}`}
          width={500}
          height={889}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-fry/95 shadow-panel">
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-navy-900">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
        <span className="absolute bottom-2 right-2 bg-navy-900/85 px-2 py-1 font-mono text-[10px] text-white">
          {t.segundos}s
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fry-700">
          Consejo {String(t.n).padStart(2, '0')}
        </p>
        <h3 className="mt-1.5 font-display text-[16px] font-bold leading-snug text-navy group-hover:text-fry-700">
          {t.titulo}
        </h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-humo">{t.gancho}</p>
        <p className="mt-auto pt-4 font-mono text-[10px] uppercase tracking-wider text-humo-400">
          {t.publico}
        </p>
      </div>
    </Link>
  )
}

/* ── Sección embebible en páginas de producto ──────────────────────── */

export function ConsejosRelacionados({
  slug,
  titulo = 'Consejos de cocina',
  limite = 3,
}: {
  slug: string
  titulo?: string
  limite?: number
}) {
  const tips = tipsDe(slug).slice(0, limite)
  if (!tips.length) return null

  return (
    <Seccion
      eyebrow="Video · 30 segundos"
      titulo={titulo}
      intro="Lo que aprendimos del manual de Potatoes USA y de nuestro propio equipo, en piezas de medio minuto que le puedes reenviar a tu cocina."
      fondo="hielo"
    >
      <div className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((t) => (
          <TarjetaTip key={t.slug} t={t} />
        ))}
      </div>
      <Link href="/consejos/" className="btn-secundario mt-8">
        Ver todos los consejos
      </Link>
    </Seccion>
  )
}
