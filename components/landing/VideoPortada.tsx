'use client'

import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'

/**
 * Video vertical de la portada (11-nov-2026).
 *
 * Cómo cuida la carga:
 *  - Al abrir la página no se baja NADA del video (`preload="none"`, sin atributo `poster`).
 *  - La portada es una imagen aparte con `loading="lazy"`: se pide hasta que la sección se acerca a la pantalla.
 *    (El atributo `poster` de <video> no se puede diferir: el navegador lo pide siempre.)
 *  - No hay reproducción automática: el video arranca, con sonido, cuando la persona lo toca.
 *
 * ⚠️ iPhone: `play()` se llama dentro del mismo toque, sin esperar nada antes. Si se mueve a un efecto o detrás
 * de un `await`, Safari lo bloquea (el mismo defecto de la cámara en las apps de chofer).
 *
 * El botón de reproducir va abajo, no al centro: así no tapa un rostro ni el texto de la portada.
 *
 * `compacto` (el hero): en celular el video no ocupa la pantalla; se ve una tarjeta chica con la cara de la
 * persona (6 KB) y, al tocarla, se abre el video ahí mismo. En escritorio se ve la portada completa.
 */
export default function VideoPortada({
  src,
  poster,
  titulo,
  segundos,
  clave,
  compacto,
}: {
  src: string
  poster: string
  titulo: string
  segundos: number
  clave: string
  compacto?: { miniatura: string; nombre: string; cargo: string }
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [activo, setActivo] = useState(false)

  function reproducir() {
    const v = ref.current
    if (!v) return
    // Uno a la vez: si otro video de la página está sonando, se pausa.
    document.querySelectorAll<HTMLVideoElement>('video[data-video-portada]').forEach((o) => {
      if (o !== v) o.pause()
    })
    // flushSync: la caja del video ya está a la vista cuando se llama a play(), todo dentro del mismo toque.
    flushSync(() => setActivo(true))
    v.play().catch(() => {})
    try {
      ;(window as unknown as { macsaEvento?: (n: string, d: object) => void }).macsaEvento?.('video_reproducir', {
        video: clave,
        pagina: location.pathname,
      })
    } catch {}
  }

  const etiqueta = `Reproducir el video «${titulo}», ${segundos} segundos`

  return (
    <div>
      {compacto && !activo && (
        <button
          type="button"
          onClick={reproducir}
          aria-label={etiqueta}
          data-video-chip={clave}
          className="flex w-full max-w-sm items-center gap-4 border border-white/15 bg-white/5 p-3 text-left lg:hidden"
        >
          <img
            src={compacto.miniatura}
            alt=""
            width={192}
            height={256}
            loading="lazy"
            decoding="async"
            className="h-24 w-[72px] shrink-0 object-cover"
          />
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-fry">
              Video · {segundos} s
            </span>
            <span className="mt-1 block font-display text-[16px] font-bold leading-tight text-white">
              {compacto.nombre}
            </span>
            <span className="mt-0.5 block text-[13px] leading-snug text-hielo-200">{compacto.cargo}</span>
          </span>
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-fry"
          >
            <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-navy-900">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
      <div
        className={`relative aspect-[9/16] w-full overflow-hidden bg-navy-900 ${
          compacto ? (activo ? 'max-lg:max-w-[300px]' : 'max-lg:hidden') : ''
        }`}
      >
        <video
          ref={ref}
          data-video-portada={clave}
          controls={activo}
          playsInline
          preload="none"
          aria-label={`Video: ${titulo}`}
          className="absolute inset-0 h-full w-full"
          onPlay={(e) => {
            const yo = e.currentTarget
            document.querySelectorAll<HTMLVideoElement>('video[data-video-portada]').forEach((o) => {
              if (o !== yo) o.pause()
            })
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
        {!activo && (
          <button
            type="button"
            onClick={reproducir}
            aria-label={etiqueta}
            className="group absolute inset-0 block h-full w-full cursor-pointer"
          >
            <img
              src={poster}
              alt=""
              width={540}
              height={960}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-navy-900/90 to-transparent px-4 pb-4 pt-10"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-fry shadow-panel transition-transform group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-navy-900">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="text-left font-display text-[14px] font-semibold leading-tight text-white">
                Ver video
                <span className="block font-mono text-[11px] font-normal text-hielo-200">{segundos} s · con sonido</span>
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
