import Link from 'next/link'
import Hero from '@/components/landing/Hero'
import {
  BarraConfianza,
  Breadcrumb,
  CadenaFrio,
  ComoPedir,
  CTAFinal,
  FAQ,
  Seccion,
  TablaProductos,
} from '@/components/landing/Secciones'
import { FAMILIAS, type Familia } from '@/lib/familias'
import { GIROS } from '@/lib/giros'
import { breadcrumbSchema, faqSchema, ld, productoSchema } from '@/lib/schema'
import { MODOS, porModo } from '@/lib/ciudades'
import { GaleriaProductos, Rendimiento } from '@/components/landing/Productos'

/**
 * La página PILAR de una familia: la fuente de verdad del contenido.
 * De aquí sale clonada, por ciudad, cada página de producto × ciudad.
 * Si el pilar es flojo, las 30 que salen de él son flojas.
 */
export default function PaginaFamilia({
  f,
  preguntas,
  guia,
}: {
  f: Familia
  preguntas: { p: string; r: string }[]
  guia?: { titulo: string; texto: string; filas: { cuando: string; usa: string }[] }
}) {
  const migas = [
    { nombre: 'Inicio', url: '/' },
    { nombre: 'Catálogo', url: '/catalogo/' },
    { nombre: f.nombre },
  ]
  const girosDeLaFamilia = GIROS.filter((g) => f.giros.includes(g.slug))
  const conRuta = porModo('diaria')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(faqSchema(preguntas))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ld(
          productoSchema({
            nombre: f.h1,
            descripcion: f.answerFirst,
            marca: f.marcas[0] ?? 'MACSA',
            url: `/${f.slug}/`,
          }),
        )}
      />

      <Breadcrumb items={migas} />

      <Hero
        eyebrow={`${f.marcas.slice(0, 2).join(' · ')} · Food service`}
        h1={f.h1}
        answerFirst={f.answerFirst}
        anclas={f.anclas}
        chips={[
          { etiqueta: 'Marcas', valor: f.marcas.join(', ') },
          {
            etiqueta: 'Códigos',
            valor: f.productos.length ? `${f.productos.length} en catálogo` : 'Lista completa a solicitud',
          },
          { etiqueta: 'Congelado', valor: 'IQF, sin descongelar' },
          { etiqueta: 'Entrega', valor: 'Al día siguiente en el área metropolitana' },
        ]}
        ctaWhatsApp={`Hola, quiero información y precio de ${f.nombre.toLowerCase()}.`}
        ctaSecundario={{ href: '/cobertura/', label: '¿Llegan a mi ciudad?' }}
      />

      <BarraConfianza />

      <GaleriaProductos
        familia={f.slug}
        titulo={`${f.nombre} que manejamos`}
      />

      <Rendimiento familia={f.slug} />

      <Seccion
        eyebrow="Catálogo completo"
        titulo={`Todos los códigos de ${f.nombre.toLowerCase()}`}
        intro="Producto de línea con existencia continua: el mismo código está disponible cada vez que lo vuelves a pedir. Nada de saldos ni oportunidades."
      >
        <TablaProductos productos={f.productos} />
      </Seccion>

      {guia && (
        <Seccion eyebrow="Guía de elección" titulo={guia.titulo} intro={guia.texto} fondo="hielo">
          <div className="overflow-x-auto border border-hielo-300 bg-white">
            <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="bg-hielo-100">
                  <th className="border-b border-hielo-300 px-4 py-3 font-display text-[12px] font-semibold uppercase tracking-wider text-humo">
                    Si tu negocio…
                  </th>
                  <th className="border-b border-hielo-300 px-4 py-3 font-display text-[12px] font-semibold uppercase tracking-wider text-humo">
                    Pide
                  </th>
                </tr>
              </thead>
              <tbody>
                {guia.filas.map((r) => (
                  <tr key={r.cuando} className="odd:bg-white even:bg-hielo-50">
                    <td className="border-b border-hielo-200 px-4 py-3 text-humo-900">{r.cuando}</td>
                    <td className="border-b border-hielo-200 px-4 py-3 font-semibold text-navy">
                      {r.usa}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Seccion>
      )}

      <Seccion
        eyebrow="Para qué negocio"
        titulo={`Quién nos pide ${f.nombre.toLowerCase()}`}
        intro="Le vendemos sólo a negocios, desde un local hasta cadenas de quince sucursales o más."
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

      {/* Enlazado por silo: hacia las ciudades (eje geográfico de la matriz) */}
      <Seccion
        eyebrow="Cobertura"
        titulo={`Dónde entregamos ${f.nombre.toLowerCase()}`}
        intro={`${MODOS.diaria.detalle} Fuera del área metropolitana el modo cambia, y cada ciudad tiene el suyo.`}
      >
        <p className="max-w-prosa text-[15px] leading-relaxed text-humo">
          <span className="font-semibold text-navy">Ruta diaria:</span>{' '}
          {conRuta.map((c) => c.nombre).join(', ')}.
        </p>
        <Link href="/cobertura/" className="btn-secundario mt-6">
          Ver las 30 ciudades y su modo de entrega
        </Link>
      </Seccion>

      <ComoPedir contexto={f.nombre.toLowerCase()} />

      <FAQ preguntas={preguntas} />

      {/* Relacionados: el silo de venta cruzada */}
      <Seccion eyebrow="Relacionados" titulo="Lo que se pide junto con esto" fondo="hielo">
        <div className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-4">
          {FAMILIAS.filter((x) => x.slug !== f.slug)
            .slice(0, 8)
            .map((x) => (
              <Link
                key={x.slug}
                href={`/${x.slug}/`}
                className="group bg-white p-5 transition-colors hover:bg-hielo-50"
              >
                <h3 className="font-display text-[15px] font-bold text-navy group-hover:text-fry-700">
                  {x.nombre}
                </h3>
                <p className="mt-1.5 text-[13px] leading-snug text-humo">{x.tagline}</p>
              </Link>
            ))}
        </div>
      </Seccion>

      <CTAFinal
        titulo={`¿Probamos ${f.nombre.toLowerCase()} en tu cocina?`}
        mensaje={`Hola, me interesa una muestra de ${f.nombre.toLowerCase()}.`}
      />
    </>
  )
}
