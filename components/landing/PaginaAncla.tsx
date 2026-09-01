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
} from '@/components/landing/Secciones'
import { GaleriaProductos, Rendimiento } from '@/components/landing/Productos'
import FormularioProspecto from '@/components/landing/FormularioProspecto'
import { ConsejosRelacionados } from '@/components/landing/Consejos'
import { heroAncla } from '@/lib/heroes'
import { ANCLAS, ancla as buscarAncla } from '@/lib/anclas'
import { familia as buscarFamilia } from '@/lib/familias'
import { GIROS } from '@/lib/giros'
import { CIUDADES, MODOS, ciudad as buscarCiudad } from '@/lib/ciudades'
import { breadcrumbSchema, faqSchema, ld, productoSchema } from '@/lib/schema'
import { porSkus } from '@/lib/catalogo'

/**
 * PRODUCTO ANCLA × CIUDAD — la malla fina de la matriz.
 *
 * Un ancla no es una familia: es lo que la gente escribe en el buscador
 * ("papa gajo", "media pechuga de pollo"). Si `ciudadSlug` viene vacío, esta
 * misma plantilla renderiza la página pilar del ancla, sin geografía.
 *
 * Lo que hace que estas páginas NO sean relleno son tres secciones que
 * cambian de verdad: la cobertura real de la ciudad, los códigos concretos
 * del ancla y el rendimiento calculado sobre el peso de esas cajas.
 */
export default function PaginaAncla({
  anclaSlug,
  ciudadSlug,
}: {
  anclaSlug: string
  ciudadSlug?: string
}) {
  const a = buscarAncla(anclaSlug)!
  const c = ciudadSlug ? buscarCiudad(ciudadSlug) : undefined
  const fam = buscarFamilia(a.familia)
  const modo = c ? MODOS[c.modo] : undefined

  const h1 = c ? `${a.nombre} en ${c.nombre}` : a.h1

  const migas = [
    { nombre: 'Inicio', url: '/' },
    ...(fam ? [{ nombre: fam.nombre, url: `/${fam.slug}/` }] : []),
    ...(c
      ? [{ nombre: a.nombre, url: `/${a.slug}/` }, { nombre: c.nombre }]
      : [{ nombre: a.nombre }]),
  ]

  // El Answer-First del ancla, reencuadrado para la ciudad cuando la hay.
  const answerFirst = c
    ? `MACSA entrega ${a.nombre.toLowerCase()} en ${c.nombre}, ${c.estado}. ` +
      `${a.answerFirst.split('. ').slice(1).join('. ')} ${modo!.promesa} — ${modo!.titulo.toLowerCase()}.`
    : a.answerFirst

  const productos = porSkus(a.skus)
  const girosDelAncla = GIROS.filter((g) => a.giros.includes(g.slug))
  const cercanas = c
    ? CIUDADES.filter((x) => x.estado === c.estado && x.slug !== c.slug).slice(0, 6)
    : []
  const hermanas = ANCLAS.filter((x) => x.slug !== a.slug && x.familia === a.familia).slice(0, 6)
  const otras = ANCLAS.filter((x) => x.familia !== a.familia).slice(0, 8)

  const preguntas = [
    ...(c
      ? [
          {
            p: `¿Entregan ${a.nombre.toLowerCase()} en ${c.nombre}?`,
            r: modo!.detalle,
          },
          {
            p: `¿Cuánto tarda en llegar a ${c.nombre}?`,
            r:
              c.modo === 'diaria'
                ? 'Si tu pedido entra antes del corte de las 20:00, se entrega al día siguiente. Después del corte, a los dos días. No se programa domingo.'
                : `${modo!.promesa}. Te confirmamos la fecha exacta al levantar el pedido, antes de comprometerla.`,
          },
        ]
      : [
          {
            p: `¿Qué códigos de ${a.nombre.toLowerCase()} manejan?`,
            r: productos.length
              ? `Manejamos ${productos.map((p) => p.sku).join(', ')}. Cada uno con su presentación; te confirmamos existencia del día al levantar el pedido.`
              : 'Manejamos varias presentaciones. Escríbenos qué necesitas y te mandamos la lista con existencia del día.',
          },
        ]),
    {
      p: `¿Le venden ${a.nombre.toLowerCase()} a particulares?`,
      r: 'No. La venta es exclusiva a negocios: restaurantes, cocinas, fast food, barras y comedores.',
    },
    {
      p: '¿Puedo probar antes de comprar?',
      r: 'Sí. Lo habitual antes del primer pedido es una muestra sin compromiso para que la pruebes en tu cocina.',
    },
    {
      p: '¿Hay que descongelar antes de usarlo?',
      r: 'No. El producto va directo del congelador a la freidora o a la plancha, sin descongelar: descongelarlo es justo lo que lo deja aguado.',
    },
    {
      p: '¿Siempre tienen el mismo producto?',
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
            marca: fam?.marcas[0] ?? 'MACSA',
            url: c ? `/${a.slug}-en-${c.slug}/` : `/${a.slug}/`,
            ciudad: c?.nombre,
          }),
        )}
      />

      <Breadcrumb items={migas} />

      <Hero
        eyebrow={
          c ? `${c.nombre}, ${c.estado} · ${modo!.titulo}` : `${fam?.marcas[0] ?? ''} · Food service`
        }
        h1={h1}
        answerFirst={answerFirst}
        anclas={a.anclas}
        chips={[
          c
            ? { etiqueta: 'Ciudad', valor: `${c.nombre}, ${c.estado}` }
            : { etiqueta: 'Línea', valor: fam?.nombre ?? '' },
          {
            etiqueta: 'Entrega',
            valor: c ? modo!.promesa : 'Al día siguiente en el área metropolitana',
          },
          { etiqueta: 'Códigos', valor: `${a.skus.length} presentaciones` },
          { etiqueta: 'Cadena de frío', valor: 'Garantizada, sin cortes' },
        ]}
        ctaWhatsApp={
          c
            ? `Hola, escribo desde ${c.nombre}. Quiero precio de ${a.nombre.toLowerCase()}.`
            : `Hola, quiero precio de ${a.nombre.toLowerCase()}.`
        }
        ctaSecundario={
          c
            ? { href: `/${a.slug}/`, label: 'Ver el producto' }
            : { href: '/cobertura/', label: '¿Llegan a mi ciudad?' }
        }
        imagen={heroAncla(a.slug).imagen}
        lambWeston={heroAncla(a.slug).lambWeston}
      />

      <BarraConfianza />

      {/* ★ Cobertura real: la sección que ninguna competencia puede copiar */}
      {c && <Cobertura ciudad={c} producto={a.nombre.toLowerCase()} />}

      <GaleriaProductos
        skus={a.skus}
        titulo={c ? `${a.nombre} con entrega en ${c.nombre}` : `Códigos de ${a.nombre.toLowerCase()}`}
        ciudad={c?.nombre}
      />

      <Rendimiento skus={a.skus} />

      <Seccion
        eyebrow="Para qué negocio"
        titulo={
          c
            ? `Quién nos pide ${a.nombre.toLowerCase()} en ${c.nombre}`
            : `Quién nos pide ${a.nombre.toLowerCase()}`
        }
        fondo="hielo"
      >
        <div className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-4">
          {girosDelAncla.map((g) => (
            <div key={g.slug} className="bg-white p-6">
              <h3 className="font-display text-[16px] font-bold text-navy">{g.titulo}</h3>
            </div>
          ))}
        </div>
      </Seccion>

      <ConsejosRelacionados
        slug={a.slug}
        titulo={`Cómo sacarle más a tu ${a.nombre.toLowerCase()}`}
      />

      <CadenaFrio />

      <ComoPedir contexto={c ? `${a.nombre.toLowerCase()} en ${c.nombre}` : a.nombre.toLowerCase()} />

      <Seccion
        eyebrow="Contacto"
        titulo="Te cotizamos hoy mismo"
        intro="Déjanos tus datos y un asesor te contacta con precio y disponibilidad. O escríbenos por WhatsApp si prefieres resolverlo al momento."
      >
        <div className="max-w-2xl">
          <FormularioProspecto ciudad={c?.nombre} producto={a.nombre.toLowerCase()} />
        </div>
      </Seccion>

      <FAQ preguntas={preguntas} />

      {/* Enlazado por silo: misma ancla en ciudades cercanas + anclas hermanas */}
      <Seccion eyebrow="Relacionados" titulo={c ? `También entregamos en ${c.estado}` : 'De la misma línea'}>
        {c && (
          <ul className="flex flex-wrap gap-2">
            {cercanas.map((x) => (
              <li key={x.slug}>
                <Link
                  href={`/${a.slug}-en-${x.slug}/`}
                  className="inline-block border border-hielo-300 bg-hielo-50 px-4 py-2 text-[14px] text-humo-900 transition-colors hover:border-fry hover:text-fry-700"
                >
                  {a.nombre} en {x.nombre}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {hermanas.length > 0 && (
          <>
            <h3 className="mt-10 font-display text-[17px] font-bold text-navy">
              Otros cortes y presentaciones
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {hermanas.map((x) => (
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

        <h3 className="mt-10 font-display text-[17px] font-bold text-navy">
          Lo que se pide junto con esto
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {otras.map((x) => (
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
        titulo={`¿Probamos ${a.nombre.toLowerCase()} en tu cocina?`}
        mensaje={
          c
            ? `Hola, escribo desde ${c.nombre}. Me interesa una muestra de ${a.nombre.toLowerCase()}.`
            : `Hola, me interesa una muestra de ${a.nombre.toLowerCase()}.`
        }
      />
    </>
  )
}
