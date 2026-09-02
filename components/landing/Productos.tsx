import { Seccion } from '@/components/landing/Secciones'
import { destacadosDe, porFamilia, porSkus, type ProductoCatalogo } from '@/lib/catalogo'
import { waLink } from '@/lib/site'

/* ── Tarjeta de producto con foto oficial ──────────────────────────── */

function Tarjeta({ p, ciudad }: { p: ProductoCatalogo; ciudad?: string }) {
  const mensaje = ciudad
    ? `Hola, escribo desde ${ciudad}. Quiero precio del código ${p.sku} — ${p.nombre}.`
    : `Hola, quiero precio del código ${p.sku} — ${p.nombre}.`

  return (
    <article className="flex flex-col bg-white">
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-hielo-50 p-3">
        {/* Foto oficial del fabricante. Se usa <img> y no next/image porque
            el export estático no optimiza y así no hay configuración de
            dominios que mantener. */}
        <img
          src={p.imagen}
          alt={`${p.nombre} — código ${p.sku}, ${p.presentacion ?? 'presentación a confirmar'}`}
          width={320}
          height={240}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain mix-blend-multiply"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fry-700">
          {p.sku}
        </p>
        <h3 className="mt-1.5 font-display text-[15.5px] font-bold leading-snug text-navy">
          {p.nombre}
        </h3>

        <dl className="mt-3 space-y-1 text-[13px] text-humo">
          {p.presentacion && (
            <div className="flex gap-2">
              <dt className="text-humo-400">Presentación</dt>
              <dd className="font-medium text-humo-900">{p.presentacion}</dd>
            </div>
          )}
          {p.marca && (
            <div className="flex gap-2">
              <dt className="text-humo-400">Marca</dt>
              <dd className="font-medium text-humo-900">{p.marca}</dd>
            </div>
          )}
          {p.rendimiento?.tipo === 'piezas' && (
            <div className="flex gap-2">
              <dt className="text-humo-400">Rinde</dt>
              <dd className="font-medium text-humo-900">{p.rendimiento.piezas} piezas por caja</dd>
            </div>
          )}
        </dl>

        <a
          href={waLink(mensaje)}
          className="mt-auto pt-4 font-display text-[13.5px] font-semibold text-navy-600 hover:text-fry-700"
        >
          Pedir precio de {p.sku} →
        </a>
      </div>
    </article>
  )
}

/* ── Galería de la familia ─────────────────────────────────────────── */

export function GaleriaProductos({
  familia,
  skus,
  titulo,
  ciudad,
  limite = 8,
}: {
  familia?: string
  /** Si viene, manda sobre la familia: son los codigos de un producto ancla. */
  skus?: string[]
  titulo: string
  ciudad?: string
  limite?: number
}) {
  const universo = skus ? porSkus(skus) : familia ? porFamilia(familia) : []
  const productos = skus
    ? universo.slice(0, limite)
    : destacadosDe(familia!, limite)
  if (!productos.length) return null

  const total = universo.length

  return (
    <Seccion
      eyebrow="Producto"
      titulo={titulo}
      intro={
        total > productos.length
          ? `Estos son ${productos.length} de los ${total} códigos con ficha fotográfica. El catálogo completo se manda por WhatsApp o se consulta en el portal.`
          : 'Fotografía oficial del fabricante. El catálogo completo se manda por WhatsApp o se consulta en el portal.'
      }
    >
      <div className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-4">
        {productos.map((p) => (
          <Tarjeta key={p.sku} p={p} ciudad={ciudad} />
        ))}
      </div>
    </Seccion>
  )
}
