import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumb, CTAFinal, Seccion } from '@/components/landing/Secciones'
import FormularioProspecto from '@/components/landing/FormularioProspecto'
import { CATALOGO, porFamilia } from '@/lib/catalogo'
import { familia as buscarFamilia } from '@/lib/familias'
import { ANCLAS } from '@/lib/anclas'
import { EMPRESA, SITE_URL, waLink } from '@/lib/site'
import { porModo } from '@/lib/ciudades'
import { breadcrumbSchema, ld } from '@/lib/schema'

/**
 * Ficha de producto. Es la página más específica del sitio y la que puede
 * entrar a Google Shopping el día que se publiquen precios.
 *
 * El Schema es `Product` + `Offer`. NO lleva precio: publicarlo es decisión
 * de Jorge, y `p1` es el precio de distribuidor. Mientras tanto la oferta
 * declara disponibilidad y vendedor, que es verdad y sí sirve.
 */

const producto = (sku: string) => CATALOGO.find((p) => p.sku.toLowerCase() === sku.toLowerCase())

export function generateStaticParams() {
  return CATALOGO.map((p) => ({ sku: p.sku.toLowerCase() }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sku: string }>
}): Promise<Metadata> {
  const { sku } = await params
  const p = producto(sku)
  if (!p) return {}
  const fam = buscarFamilia(p.familia)

  return {
    title: `${p.nombre} — código ${p.sku}`,
    description:
      `${p.nombre}, código ${p.sku}${p.presentacion ? `, ${p.presentacion}` : ''}. ` +
      `Congelado, con entrega en Monterrey y su área metropolitana. ` +
      `${fam ? `Línea de ${fam.nombre.toLowerCase()}.` : ''}`.slice(0, 158),
    alternates: { canonical: `/tienda/${p.sku.toLowerCase()}/` },
    openGraph: { images: [{ url: p.imagen, alt: p.nombre }] },
  }
}

export default async function Page({ params }: { params: Promise<{ sku: string }> }) {
  const { sku } = await params
  const p = producto(sku)
  if (!p) notFound()

  const fam = buscarFamilia(p.familia)
  const hermanos = porFamilia(p.familia)
    .filter((x) => x.sku !== p.sku)
    .slice(0, 8)
  const anclasDelProducto = ANCLAS.filter((a) => a.skus.includes(p.sku))
  const amm = porModo('diaria')

  const migas = [
    { nombre: 'Inicio', url: '/' },
    { nombre: 'Tienda', url: '/tienda/' },
    ...(fam ? [{ nombre: fam.nombre, url: `/${fam.slug}/` }] : []),
    { nombre: p.sku },
  ]

  const productoSchemaFicha = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.nombre,
    sku: p.sku,
    image: p.imagen,
    description: `${p.nombre}${p.presentacion ? `, ${p.presentacion}` : ''}. Producto congelado con cadena de frío garantizada.`,
    ...(p.marca ?? fam?.marcas[0]
      ? { brand: { '@type': 'Brand', name: p.marca ?? fam!.marcas[0] } }
      : {}),
    ...(p.kg ? { weight: { '@type': 'QuantitativeValue', value: p.kg, unitCode: 'KGM' } } : {}),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'MXN',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SITE_URL}/#organizacion` },
      url: `${SITE_URL}/tienda/${p.sku.toLowerCase()}/`,
    },
  }

  const mensaje = `Hola, quiero precio y disponibilidad del código ${p.sku} — ${p.nombre}.`

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(productoSchemaFicha)} />

      <Breadcrumb items={migas} />

      <article className="contenedor grid gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div className="flex items-center justify-center border border-hielo-300 bg-hielo-50 p-8">
          <img
            src={p.imagen}
            alt={`${p.nombre} — código ${p.sku}, ${p.presentacion ?? 'presentación a confirmar'}`}
            width={640}
            height={640}
            className="max-h-[420px] w-full object-contain mix-blend-multiply"
          />
        </div>

        <div>
          <p className="eyebrow !text-fry">
            {fam?.nombre}
            {(p.marca ?? fam?.marcas[0]) && ` · ${p.marca ?? fam?.marcas[0]}`}
          </p>
          <h1 className="mt-3 font-display text-[2rem] font-bold leading-tight tracking-tight text-navy sm:text-[2.5rem]">
            {p.nombre}
          </h1>
          <p className="mt-3 font-mono text-[14px] font-semibold uppercase tracking-wider text-humo-400">
            Código {p.sku}
          </p>

          <dl className="mt-8 divide-y divide-hielo-300 border-y border-hielo-300">
            {p.presentacion && (
              <div className="flex justify-between gap-6 py-3">
                <dt className="text-[14.5px] text-humo">Presentación</dt>
                <dd className="text-right font-display text-[15px] font-semibold text-navy">
                  {p.presentacion}
                </dd>
              </div>
            )}
            {p.kg && (
              <div className="flex justify-between gap-6 py-3">
                <dt className="text-[14.5px] text-humo">Peso neto</dt>
                <dd className="text-right font-mono text-[15px] font-semibold tabular-nums text-navy">
                  {p.kg} kg
                </dd>
              </div>
            )}
            {/* El rendimiento sólo se dice por pieza (cáscara de papa, aros,
                munchers, dedos de queso). Las órdenes por gramaje se quitaron el
                2-sep-2026 por instrucción de Jorge y Edgar. Si no sabemos las
                piezas, no se dice nada. */}
            {p.rendimiento?.tipo === 'piezas' && (
              <div className="flex justify-between gap-6 py-3">
                <dt className="text-[14.5px] text-humo">Piezas por caja</dt>
                <dd className="text-right font-mono text-[15px] font-semibold tabular-nums text-navy">
                  {p.rendimiento.piezas}
                </dd>
              </div>
            )}
            {p.marca && (
              <div className="flex justify-between gap-6 py-3">
                <dt className="text-[14.5px] text-humo">Marca</dt>
                <dd className="text-right font-display text-[15px] font-semibold text-navy">
                  {p.marca}
                </dd>
              </div>
            )}
            <div className="flex justify-between gap-6 py-3">
              <dt className="text-[14.5px] text-humo">Entrega</dt>
              <dd className="text-right font-display text-[15px] font-semibold text-navy">
                Al día siguiente en el AMM
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={waLink(mensaje)} className="btn-primario">
              Pedir precio de {p.sku}
            </a>
            <a href={EMPRESA.portalUrl} className="btn-secundario">
              Ver mi precio en el portal
            </a>
          </div>

          <p className="mt-5 max-w-prosa text-[14px] leading-relaxed text-humo-400">
            El precio depende de tu lista. Si ya eres cliente lo ves en el portal con tu código y
            tu PIN; si todavía no,{' '}
            <Link href="/alta-de-cliente/" className="font-semibold text-fry-700">
              te damos de alta el mismo día
            </Link>
            . También puedes pasar por él a nuestro punto de venta, desde una pieza o una caja
            según el producto.
          </p>
        </div>
      </article>

      {anclasDelProducto.length > 0 && (
        <Seccion eyebrow="Dónde encaja" titulo="Este código forma parte de" fondo="hielo">
          <ul className="flex flex-wrap gap-2">
            {anclasDelProducto.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/${a.slug}/`}
                  className="inline-block border border-hielo-300 bg-white px-4 py-2 text-[14px] text-humo-900 transition-colors hover:border-fry hover:text-fry-700"
                >
                  {a.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </Seccion>
      )}

      <Seccion
        eyebrow="Entrega"
        titulo={`Dónde llega el ${p.sku}`}
        intro={`Ruta diaria en ${amm.length} municipios del área metropolitana, con corte a las ${EMPRESA.corteHora} h. Fuera del área metropolitana el modo de entrega cambia por ciudad.`}
      >
        <p className="max-w-prosa text-[15px] leading-relaxed text-humo">
          {amm.map((c) => c.nombre).join(', ')}.
        </p>
        <Link href="/cobertura/" className="btn-secundario mt-6">
          Ver las ciudades y su modo de entrega
        </Link>
      </Seccion>

      {hermanos.length > 0 && (
        <Seccion eyebrow="De la misma línea" titulo={`Más de ${fam?.nombre.toLowerCase()}`} fondo="hielo">
          <div className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-4">
            {hermanos.map((x) => (
              <Link
                key={x.sku}
                href={`/tienda/${x.sku.toLowerCase()}/`}
                className="group flex flex-col bg-white transition-colors hover:bg-hielo-50"
              >
                <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-hielo-50 p-3">
                  <img
                    src={x.imagen}
                    alt={`${x.nombre} — código ${x.sku}`}
                    width={320}
                    height={240}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="p-4">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fry-700">
                    {x.sku}
                  </p>
                  <h3 className="mt-1 font-display text-[14.5px] font-bold leading-snug text-navy group-hover:text-fry-700">
                    {x.nombre}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </Seccion>
      )}

      <Seccion eyebrow="Contacto" titulo="Te cotizamos hoy mismo">
        <div className="max-w-2xl">
          <FormularioProspecto producto={`${p.nombre} (${p.sku})`} />
        </div>
      </Seccion>

      <CTAFinal
        titulo={`¿Probamos el ${p.sku} en tu cocina?`}
        mensaje={`Hola, me interesa una muestra del código ${p.sku} — ${p.nombre}.`}
      />
    </>
  )
}
