import Link from 'next/link'
import Hero from '@/components/landing/Hero'
import {
  BarraConfianza,
  Breadcrumb,
  CadenaFrio,
  Cobertura,
  ComoPedir,
  CTAFinal,
  FAQ,
  Seccion,
  TablaProductos,
} from '@/components/landing/Secciones'
import { FAMILIAS, familia } from '@/lib/familias'
import { GIROS } from '@/lib/giros'
import { CIUDADES, MODOS, ciudad as buscarCiudad } from '@/lib/ciudades'
import { breadcrumbSchema, faqSchema, ld, productoSchema } from '@/lib/schema'
import { GaleriaProductos, Rendimiento } from '@/components/landing/Productos'

/**
 * PÁGINA PRODUCTO × CIUDAD — la que se genera en lote.
 *
 * Todo lo que cambia respecto al pilar está aquí y sale de datos reales:
 * el H1, el Answer-First, el canonical, el Schema, el breadcrumb, el texto
 * de WhatsApp y —lo importante— el bloque de COBERTURA con el modo de
 * entrega verdadero de esa ciudad. Sin ese bloque esto sería relleno.
 */
export default function PaginaGeo({
  familiaSlug,
  ciudadSlug,
}: {
  familiaSlug: string
  ciudadSlug: string
}) {
  const f = familia(familiaSlug)!
  const c = buscarCiudad(ciudadSlug)!
  const modo = MODOS[c.modo]

  const h1 = `${f.nombre} en ${c.nombre}`
  const migas = [
    { nombre: 'Inicio', url: '/' },
    { nombre: f.nombre, url: `/${f.slug}/` },
    { nombre: c.nombre },
  ]

  // El Answer-First del pilar, reencuadrado para la ciudad.
  const answerFirst = `MACSA entrega ${f.nombre.toLowerCase()} en ${c.nombre}, ${c.estado}. ${
    f.answerFirst.split('. ').slice(1).join('. ')
  } ${modo.promesa} — ${modo.titulo.toLowerCase()}.`

  const cercanas = CIUDADES.filter((x) => x.estado === c.estado && x.slug !== c.slug).slice(0, 6)
  const girosDeLaFamilia = GIROS.filter((g) => f.giros.includes(g.slug))

  const preguntas = [
    {
      p: `¿Entregan ${f.nombre.toLowerCase()} en ${c.nombre}?`,
      r: `${modo.detalle}`,
    },
    {
      p: `¿Cuánto tarda en llegar a ${c.nombre}?`,
      r:
        c.modo === 'diaria'
          ? 'Si tu pedido entra antes del corte de las 20:00, se entrega al día siguiente. Después del corte, a los dos días. No se programa domingo.'
          : `${modo.promesa}. Te confirmamos la fecha exacta al levantar el pedido, antes de comprometerla.`,
    },
    {
      p: `¿Le venden a particulares en ${c.nombre}?`,
      r: 'No. La venta es exclusiva a negocios: restaurantes, cocinas, fast food, barras y comedores.',
    },
    {
      p: '¿Puedo probar el producto antes de comprarlo?',
      r: 'Sí. Lo habitual antes del primer pedido es una muestra sin compromiso para que la pruebes en tu cocina.',
    },
    {
      p: '¿Siempre tienen el mismo producto disponible?',
      r: 'Sí. Trabajamos con marcas de línea y existencia continua: el mismo código está disponible cada vez que lo vuelves a pedir.',
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(faqSchema(preguntas))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ld(
          productoSchema({
            nombre: h1,
            descripcion: answerFirst,
            marca: f.marcas[0] ?? 'MACSA',
            url: `/${f.slug}-en-${c.slug}/`,
            ciudad: c.nombre,
          }),
        )}
      />

      <Breadcrumb items={migas} />

      <Hero
        eyebrow={`${c.nombre}, ${c.estado} · ${modo.titulo}`}
        h1={h1}
        answerFirst={answerFirst}
        anclas={f.anclas}
        chips={[
          { etiqueta: 'Ciudad', valor: `${c.nombre}, ${c.estado}` },
          { etiqueta: 'Entrega', valor: modo.promesa },
          { etiqueta: 'Marcas', valor: f.marcas.slice(0, 2).join(', ') },
          { etiqueta: 'Congelado', valor: 'IQF, sin descongelar' },
        ]}
        ctaWhatsApp={`Hola, escribo desde ${c.nombre}. Quiero precio de ${f.nombre.toLowerCase()}.`}
        ctaSecundario={{ href: `/${f.slug}/`, label: `Ver toda la línea` }}
      />

      <BarraConfianza />

      {/* ★ La sección que ninguna competencia puede copiar */}
      <Cobertura ciudad={c} producto={f.nombre.toLowerCase()} />

      <GaleriaProductos
        familia={f.slug}
        titulo={`${f.nombre} con entrega en ${c.nombre}`}
        ciudad={c.nombre}
      />

      <Rendimiento familia={f.slug} />

      <Seccion
        eyebrow="Catálogo completo"
        titulo={`Todos los códigos disponibles para ${c.nombre}`}
        intro="Producto de línea con existencia continua. El mismo código está disponible cada vez que lo vuelves a pedir."
      >
        <TablaProductos productos={f.productos} />
      </Seccion>

      <Seccion
        eyebrow="Para qué negocio"
        titulo={`Quién nos pide ${f.nombre.toLowerCase()} en ${c.nombre}`}
        fondo="hielo"
      >
        <div className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-3">
          {girosDeLaFamilia.map((g) => (
            <div key={g.slug} className="bg-white p-6">
              <h3 className="font-display text-[17px] font-bold text-navy">{g.titulo}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-humo">
                También suelen pedir{' '}
                {g.necesita
                  .filter((s) => s !== f.slug)
                  .slice(0, 3)
                  .map((s) => FAMILIAS.find((x) => x.slug === s)?.nombre?.toLowerCase())
                  .filter(Boolean)
                  .join(', ')}
                .
              </p>
            </div>
          ))}
        </div>
      </Seccion>

      <CadenaFrio />

      <ComoPedir contexto={`${f.nombre.toLowerCase()} en ${c.nombre}`} />

      <FAQ preguntas={preguntas} />

      {/* Enlazado por silo: mismo producto en ciudades cercanas + otras líneas */}
      <Seccion eyebrow="Cerca de ti" titulo={`También entregamos en ${c.estado}`}>
        <ul className="flex flex-wrap gap-2">
          {cercanas.map((x) => (
            <li key={x.slug}>
              <Link
                href={`/${f.slug}-en-${x.slug}/`}
                className="inline-block border border-hielo-300 bg-hielo-50 px-4 py-2 text-[14px] text-humo-900 transition-colors hover:border-fry hover:text-fry-700"
              >
                {f.nombre} en {x.nombre}
              </Link>
            </li>
          ))}
        </ul>

        <h3 className="mt-10 font-display text-[17px] font-bold text-navy">
          Otras líneas para {c.nombre}
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {FAMILIAS.filter((x) => x.slug !== f.slug)
            .slice(0, 8)
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
      </Seccion>

      <CTAFinal
        titulo={`¿Probamos ${f.nombre.toLowerCase()} en tu cocina de ${c.nombre}?`}
        mensaje={`Hola, escribo desde ${c.nombre}. Me interesa una muestra de ${f.nombre.toLowerCase()}.`}
      />
    </>
  )
}
