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
          {p.rendimiento && (
            <div className="flex gap-2">
              <dt className="text-humo-400">Rinde</dt>
              <dd className="font-medium text-humo-900">
                ~{p.rendimiento.g150} órdenes de 150 g
              </dd>
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

/* ── Rendimiento por porción ★ ─────────────────────────────────────── */
/* El dato que ningún competidor publica y el que decide la compra.      */

export function Rendimiento({ familia, skus }: { familia?: string; skus?: string[] }) {
  const universo = skus ? porSkus(skus) : familia ? porFamilia(familia) : []
  const conRendimiento = universo.filter((p) => p.rendimiento && p.kg)
  if (conRendimiento.length < 2) return null

  const muestra = conRendimiento.slice(0, 8)

  return (
    <Seccion
      eyebrow="Costeo"
      titulo="Cuántas órdenes salen de una caja"
      intro="Nadie publica este dato y es el que de verdad usas para sacar tu costo por orden. Está calculado sobre el peso real de cada caja; ajústalo al gramaje que sirves."
      fondo="hielo"
    >
      <div className="overflow-x-auto border border-hielo-300 bg-white">
        <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
          <thead>
            <tr className="bg-hielo-100">
              <th className="border-b border-hielo-300 px-4 py-3 font-display text-[12px] font-semibold uppercase tracking-wider text-humo">
                Código
              </th>
              <th className="border-b border-hielo-300 px-4 py-3 font-display text-[12px] font-semibold uppercase tracking-wider text-humo">
                Producto
              </th>
              <th className="border-b border-hielo-300 px-4 py-3 text-right font-display text-[12px] font-semibold uppercase tracking-wider text-humo">
                Caja
              </th>
              <th className="border-b border-hielo-300 px-4 py-3 text-right font-display text-[12px] font-semibold uppercase tracking-wider text-humo">
                Órdenes 150 g
              </th>
              <th className="border-b border-hielo-300 px-4 py-3 text-right font-display text-[12px] font-semibold uppercase tracking-wider text-humo">
                Órdenes 200 g
              </th>
            </tr>
          </thead>
          <tbody>
            {muestra.map((p) => (
              <tr key={p.sku} className="odd:bg-white even:bg-hielo-50">
                <td className="border-b border-hielo-200 px-4 py-3 font-mono text-[13px] font-semibold text-navy-600">
                  {p.sku}
                </td>
                <td className="border-b border-hielo-200 px-4 py-3 text-humo-900">{p.nombre}</td>
                <td className="border-b border-hielo-200 px-4 py-3 text-right font-mono text-[13.5px] tabular-nums text-humo">
                  {p.kg} kg
                </td>
                <td className="border-b border-hielo-200 px-4 py-3 text-right font-mono text-[13.5px] font-semibold tabular-nums text-navy">
                  {p.rendimiento!.g150}
                </td>
                <td className="border-b border-hielo-200 px-4 py-3 text-right font-mono text-[13.5px] tabular-nums text-humo-900">
                  {p.rendimiento!.g200}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 max-w-prosa text-[14px] leading-relaxed text-humo-400">
        Cálculo sobre el peso neto de la caja, sin merma. El rendimiento real depende de tu
        gramaje y de cómo sirvas la orden.
      </p>
    </Seccion>
  )
}
