import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/landing/Hero'
import { BarraConfianza, Breadcrumb, CTAFinal, Seccion } from '@/components/landing/Secciones'
import { MARCAS } from '@/lib/giros'
import { FAMILIAS } from '@/lib/familias'
import { breadcrumbSchema, ld } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Marcas que distribuimos',
  description:
    'Distribuidor oficial de Lamb Weston en Monterrey y distribuidor directo de Agrosuper y Martin’s. También Heinz, Bachoco, Pilgrim’s, UGASA, Sargento, Mr. Wings y King Fry.',
  alternates: { canonical: '/marcas/' },
}

const RELACIONES = [
  {
    marca: 'Lamb Weston',
    relacion: 'Distribuidor oficial en Monterrey',
    detalle:
      'Desde hace alrededor de tres años y medio. La papa es nuestra línea principal y el catálogo cubre más de veinte cortes.',
    familia: 'papa-a-la-francesa',
  },
  {
    marca: 'Agrosuper',
    relacion: 'Distribuidor directo, sin intermediarios',
    detalle: 'Pollo importado de Chile. La media pechuga sin piel es el producto de mayor movimiento.',
    familia: 'pollo',
  },
  {
    marca: "Martin's Famous Potato Rolls",
    relacion: 'Distribuidor directo',
    detalle:
      'Panadería importada de Estados Unidos. El pan que usan las hamburgueserías que compiten por producto.',
    familia: 'panaderia',
  },
]

export default function Page() {
  const migas = [{ nombre: 'Inicio', url: '/' }, { nombre: 'Marcas' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <Breadcrumb items={migas} />

      <Hero
        eyebrow="Portafolio"
        h1="Las marcas que distribuimos"
        answerFirst="MACSA es distribuidor oficial de Lamb Weston en Monterrey y distribuidor directo de Agrosuper y de Martin’s, sin intermediarios de por medio. El resto del portafolio son marcas de línea con existencia continua: Heinz, Bachoco, Pilgrim’s, UGASA, Sargento, Mr. Wings, VenturaFoods y King Fry, entre otras."
        anclas={['distribuidor oficial de Lamb Weston', 'sin intermediarios', 'existencia continua']}
        chips={[
          { etiqueta: 'Oficial', valor: 'Lamb Weston' },
          { etiqueta: 'Directo', valor: 'Agrosuper y Martin’s' },
          { etiqueta: 'Categorías', valor: `${MARCAS.length} en portafolio` },
          { etiqueta: 'Origen', valor: 'Nacional e importado' },
        ]}
        ctaWhatsApp="Hola, ¿qué manejan de una marca en particular?"
        ctaSecundario={{ href: '/catalogo/', label: 'Ver el catálogo' }}
      />

      <BarraConfianza />

      <Seccion
        eyebrow="Relación directa"
        titulo="Tres marcas donde no hay intermediario"
        intro="La diferencia se nota en el precio y en la existencia: cuando la relación es directa, el producto no depende de la disponibilidad de un tercero."
      >
        <div className="grid gap-px bg-hielo-300 lg:grid-cols-3">
          {RELACIONES.map((r) => (
            <div key={r.marca} className="bg-white p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fry-700">
                {r.relacion}
              </p>
              <h3 className="mt-2 font-display text-[20px] font-bold text-navy">{r.marca}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-humo">{r.detalle}</p>
              <Link
                href={`/${r.familia}/`}
                className="mt-5 inline-block font-display text-[14px] font-semibold text-fry-700 hover:text-navy"
              >
                Ver la línea →
              </Link>
            </div>
          ))}
        </div>
      </Seccion>

      <Seccion
        eyebrow="Portafolio completo"
        titulo="Todas las marcas, por categoría"
        fondo="hielo"
      >
        <div className="overflow-x-auto border border-hielo-300 bg-white">
          <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="bg-hielo-100">
                <th className="border-b border-hielo-300 px-4 py-3 font-display text-[12px] font-semibold uppercase tracking-wider text-humo">
                  Categoría
                </th>
                <th className="border-b border-hielo-300 px-4 py-3 font-display text-[12px] font-semibold uppercase tracking-wider text-humo">
                  Marcas
                </th>
              </tr>
            </thead>
            <tbody>
              {MARCAS.map((m) => (
                <tr key={m.categoria} className="odd:bg-white even:bg-hielo-50">
                  <td className="border-b border-hielo-200 px-4 py-3 font-semibold text-navy">
                    {m.categoria}
                  </td>
                  <td className="border-b border-hielo-200 px-4 py-3 text-humo-900">
                    {m.marcas.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 max-w-prosa text-[14px] leading-relaxed text-humo-400">
          No somos fabricantes: somos distribuidores. Trabajamos con marcas de línea y existencia
          continua, no con saldos ni productos de oportunidad.
        </p>
      </Seccion>

      <Seccion eyebrow="Por línea" titulo="Encuentra la marca dentro de su familia">
        <div className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-3">
          {FAMILIAS.map((f) => (
            <Link
              key={f.slug}
              href={`/${f.slug}/`}
              className="group bg-white p-5 transition-colors hover:bg-hielo-50"
            >
              <h3 className="font-display text-[16px] font-bold text-navy group-hover:text-fry-700">
                {f.nombre}
              </h3>
              <p className="mt-1.5 text-[13px] leading-snug text-humo">{f.marcas.join(' · ')}</p>
            </Link>
          ))}
        </div>
      </Seccion>

      <CTAFinal />
    </>
  )
}
