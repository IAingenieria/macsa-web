import Link from 'next/link'
import { asset, CONFIANZA, EMPRESA, waLink } from '@/lib/site'
import { MODOS, type Ciudad } from '@/lib/ciudades'
import type { Producto } from '@/lib/familias'

/* ── Envoltorio de sección ─────────────────────────────────────────── */

export function Seccion({
  id,
  eyebrow,
  titulo,
  intro,
  fondo = 'blanco',
  children,
}: {
  id?: string
  eyebrow?: string
  titulo: string
  intro?: string
  fondo?: 'blanco' | 'hielo'
  children?: React.ReactNode
}) {
  return (
    <section
      id={id}
      className={fondo === 'hielo' ? 'bg-hielo-50 py-16 sm:py-20' : 'bg-white py-16 sm:py-20'}
    >
      <div className="contenedor">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-2 max-w-3xl font-display text-[1.7rem] font-bold leading-tight tracking-tight text-navy sm:text-[2.1rem]">
          {titulo}
        </h2>
        {intro && <p className="mt-4 max-w-prosa text-[16px] leading-relaxed text-humo">{intro}</p>}
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  )
}

/* ── §2 · Breadcrumb ───────────────────────────────────────────────── */

export function Breadcrumb({ items }: { items: { nombre: string; url?: string }[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="border-b border-hielo-200 bg-hielo-50">
      <ol className="contenedor flex flex-wrap items-center gap-x-2 gap-y-1 py-3 text-[13px] text-humo-500">
        {items.map((it, i) => (
          <li key={it.nombre} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-humo-300">
                ›
              </span>
            )}
            {it.url ? (
              <Link href={it.url} className="hover:text-fry-700">
                {it.nombre}
              </Link>
            ) : (
              <span className="font-semibold text-navy">{it.nombre}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/* ── §4 · Barra de confianza ───────────────────────────────────────── */

export function BarraConfianza() {
  return (
    <section className="border-b border-hielo-300 bg-white">
      <div className="contenedor flex flex-col gap-px lg:flex-row lg:items-stretch">
        <dl className="grid flex-1 grid-cols-2 gap-px bg-hielo-200 lg:grid-cols-4">
          {CONFIANZA.map((c) => (
            <div key={c.etiqueta} className="bg-white px-4 py-5">
              <dt className="font-display text-lg font-bold text-fry-700">{c.valor}</dt>
              <dd className="mt-1 text-[13px] leading-snug text-humo">{c.etiqueta}</dd>
            </div>
          ))}
        </dl>
        {/* Uso del logotipo autorizado por Edgar Mayen (Lamb Weston), 2026-08-29. */}
        <div className="flex items-center justify-center border-t border-hielo-200 bg-white px-6 py-5 lg:border-l lg:border-t-0">
          <img
            src={asset('/lamb-weston.png')}
            alt="Lamb Weston — Possibilities in Potatoes"
            width={444}
            height={113}
            className="h-9 w-auto"
          />
        </div>
      </div>
    </section>
  )
}

/* ── §5 · Cobertura real ★ ─────────────────────────────────────────── */
/* La sección que ninguna competencia puede copiar: sale de la operación. */

export function Cobertura({ ciudad, producto }: { ciudad: Ciudad; producto?: string }) {
  const modo = MODOS[ciudad.modo]
  const promete = ciudad.modo !== 'consulta'

  return (
    <section className="bg-navy py-14 text-white sm:py-16">
      <div className="contenedor">
        <p className="eyebrow !text-fry">Cobertura</p>
        <h2 className="mt-2 font-display text-[1.6rem] font-bold tracking-tight sm:text-[2rem]">
          Cómo llega tu pedido a {ciudad.nombre}
        </h2>

        <div className="mt-8 grid gap-px border border-navy-600 bg-navy-600 sm:grid-cols-3">
          <div className="bg-navy-800 p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-humo-400">
              Modo de entrega
            </p>
            <p className="mt-2 font-display text-lg font-bold text-fry">{modo.titulo}</p>
          </div>
          <div className="bg-navy-800 p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-humo-400">
              Qué te podemos prometer
            </p>
            <p className="mt-2 font-display text-lg font-bold text-white">{modo.promesa}</p>
          </div>
          <div className="bg-navy-800 p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-humo-400">
              {promete ? 'Corte del día' : 'Estado'}
            </p>
            <p className="mt-2 font-display text-lg font-bold text-white">
              {promete ? `${EMPRESA.corteHora} h` : 'Sin ruta establecida'}
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-prosa leading-relaxed text-hielo-200">{modo.detalle}</p>

        {!promete && (
          <p className="mt-4 max-w-prosa rounded-sm border-l-4 border-fry bg-navy-800 px-5 py-4 text-[15px] leading-relaxed text-hielo-200">
            Preferimos decírtelo de frente: hoy no tenemos ruta en {ciudad.nombre}. Escríbenos con
            el volumen que manejas y te confirmamos si podemos llegar.
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={waLink(
              `Hola, escribo desde ${ciudad.nombre}. Quiero información${
                producto ? ` de ${producto}` : ''
              } y saber cómo me lo pueden entregar.`,
            )}
            className="btn-primario"
          >
            Consultar entrega en {ciudad.nombre}
          </a>
          <Link href="/cobertura/" className="btn-fantasma">
            Ver todas las ciudades
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── §6 · Tabla de productos ★ ─────────────────────────────────────── */

export function TablaProductos({
  productos,
  nota,
}: {
  productos: Producto[]
  nota?: string
}) {
  if (!productos.length) {
    return (
      <p className="max-w-prosa text-humo">
        Pídenos la lista completa por WhatsApp: te la mandamos con presentaciones y disponibilidad
        del día.
      </p>
    )
  }

  return (
    <div>
      <div className="overflow-x-auto border border-hielo-300">
        <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
          <thead>
            <tr className="bg-hielo-100">
              <th className="border-b border-hielo-300 px-4 py-3 font-display text-[12px] font-semibold uppercase tracking-wider text-humo">
                Código
              </th>
              <th className="border-b border-hielo-300 px-4 py-3 font-display text-[12px] font-semibold uppercase tracking-wider text-humo">
                Producto
              </th>
              <th className="border-b border-hielo-300 px-4 py-3 font-display text-[12px] font-semibold uppercase tracking-wider text-humo">
                Presentación
              </th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.codigo} className="odd:bg-white even:bg-hielo-50">
                <td className="border-b border-hielo-200 px-4 py-3 font-mono text-[13px] font-semibold text-navy-600">
                  {p.codigo}
                </td>
                <td className="border-b border-hielo-200 px-4 py-3 text-humo-900">{p.nombre}</td>
                <td className="border-b border-hielo-200 px-4 py-3 text-humo">{p.presentacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 max-w-prosa text-[14px] leading-relaxed text-humo-400">
        {nota ??
          'Precios y disponibilidad del día en el portal de clientes. Si no tienes acceso, te lo damos de alta el mismo día.'}
      </p>
    </div>
  )
}

/* ── §8 · Cadena de frío ───────────────────────────────────────────── */

const ESLABONES = [
  { paso: 'Congelador', detalle: 'El producto se almacena congelado a temperatura constante.' },
  { paso: 'Andén refrigerado', detalle: 'La carga sale por andén refrigerado, no a la intemperie.' },
  { paso: 'Camioneta refrigerada', detalle: 'Todas las unidades tienen refrigeración y congelación.' },
  { paso: 'Tu cocina', detalle: 'Llega congelado y va directo a la freidora, sin descongelar.' },
]

export function CadenaFrio() {
  return (
    <Seccion
      eyebrow="Cadena de frío"
      titulo="El recorrido no se rompe en ningún punto"
      intro="Es lo que más cuidamos y la razón por la que el producto llega como debe llegar. Va del congelador a tu cocina sin un solo tramo a la intemperie."
      fondo="hielo"
    >
      <ol className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-4">
        {ESLABONES.map((e, i) => (
          <li key={e.paso} className="bg-white p-6">
            <span className="font-mono text-[11px] font-semibold text-fry-700">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2 font-display text-[17px] font-bold text-navy">{e.paso}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-humo">{e.detalle}</p>
          </li>
        ))}
      </ol>
    </Seccion>
  )
}

/* ── §12 · Cómo pedir ──────────────────────────────────────────────── */

export function ComoPedir({ contexto }: { contexto?: string }) {
  const mensaje = contexto
    ? `Hola, quiero hacer un pedido de ${contexto}.`
    : 'Hola, quiero hacer un pedido.'

  return (
    <Seccion
      eyebrow="Cómo pedir"
      titulo="Tres formas de levantar tu pedido"
      intro={`El canal principal es WhatsApp: por ahí mandamos el catálogo, se levanta el pedido y se da seguimiento. El corte es a las ${EMPRESA.corteHora} h — dentro del corte entregamos al día siguiente.`}
    >
      <div className="grid gap-px bg-hielo-300 sm:grid-cols-3">
        <div className="bg-white p-6">
          <h3 className="font-display text-[17px] font-bold text-navy">Por WhatsApp</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-humo">
            Lo más rápido. Mándanos lo que necesitas y te confirmamos existencia y fecha de entrega.
          </p>
          <a href={waLink(mensaje)} className="btn-primario mt-5 !px-4 !py-2 text-[14px]">
            Escribir ahora
          </a>
        </div>
        <div className="bg-white p-6">
          <h3 className="font-display text-[17px] font-bold text-navy">En el portal</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-humo">
            Con tu código y tu PIN entras a tu precio, tus productos frecuentes y tu historial. El
            pedido entra directo.
          </p>
          <a
            href={EMPRESA.portalUrl}
            className="btn-secundario mt-5 !px-4 !py-2 text-[14px]"
          >
            Entrar al portal
          </a>
        </div>
        <div className="bg-white p-6">
          <h3 className="font-display text-[17px] font-bold text-navy">¿Primera compra?</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-humo">
            Lo normal antes del primer pedido es una muestra sin compromiso. Se puede facturar o
            trabajar con remisión.
          </p>
          <Link href="/alta-de-cliente/" className="btn-secundario mt-5 !px-4 !py-2 text-[14px]">
            Darme de alta
          </Link>
        </div>
      </div>
    </Seccion>
  )
}

/* ── §13 · FAQ → alimenta el Schema FAQPage ────────────────────────── */

export function FAQ({ preguntas }: { preguntas: { p: string; r: string }[] }) {
  return (
    <Seccion eyebrow="Preguntas frecuentes" titulo="Lo que más nos preguntan" fondo="hielo">
      <div className="max-w-3xl divide-y divide-hielo-300 border-y border-hielo-300">
        {preguntas.map((f) => (
          <details key={f.p} className="group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <h3 className="font-display text-[17px] font-semibold text-navy">{f.p}</h3>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 font-mono text-fry-700 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 max-w-prosa text-[15px] leading-relaxed text-humo">{f.r}</p>
          </details>
        ))}
      </div>
    </Seccion>
  )
}

/* ── §14 · CTA final ───────────────────────────────────────────────── */

export function CTAFinal({
  titulo = '¿Empezamos con una muestra?',
  texto = 'Lo habitual antes del primer pedido es una muestra sin compromiso: la llevamos, la pruebas en tu cocina y decides. En tu primera compra tienes descuento, y si ya eres cliente frecuente, tu asesor puede mejorar tus precios.',
  mensaje = 'Hola, me interesa una muestra sin compromiso.',
}: {
  titulo?: string
  texto?: string
  mensaje?: string
}) {
  return (
    <section className="border-t-4 border-fry bg-navy-800 py-14 text-white sm:py-16">
      <div className="contenedor">
        <h2 className="max-w-2xl font-display text-[1.7rem] font-bold leading-tight tracking-tight sm:text-[2.1rem]">
          {titulo}
        </h2>
        <p className="mt-4 max-w-prosa leading-relaxed text-hielo-200">{texto}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={waLink(mensaje)} className="btn-primario">
            Pedir una muestra
          </a>
          <Link href="/contacto/" className="btn-fantasma">
            Ver todos los contactos
          </Link>
        </div>
      </div>
    </section>
  )
}
