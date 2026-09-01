import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/landing/Hero'
import { BarraConfianza, Breadcrumb, CTAFinal, Seccion } from '@/components/landing/Secciones'
import { MARCAS, MARCAS_CON_LOGO, MARCAS_DIRECTAS, logoDe } from '@/lib/giros'
import { FAMILIAS } from '@/lib/familias'
import { asset } from '@/lib/site'
import { HEROES } from '@/lib/heroes'
import { breadcrumbSchema, ld } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Marcas que distribuimos',
  description:
    'Distribuidor oficial de Lamb Weston en Monterrey, con relación directa con Agrosuper, Bachoco, Pilgrim’s, UGASA, Smithfield, Comarco, Sargento, Martin’s, Heinz, Mr. Wings y Ricos.',
  alternates: { canonical: '/marcas/' },
}

const RELACIONES = [
  {
    marca: 'Lamb Weston',
    logo: '/lamb-weston.png',
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
        answerFirst="MACSA es distribuidor oficial de Lamb Weston en Monterrey, y con la mayor parte del portafolio la relación es directa con el fabricante, sin intermediarios de por medio: Agrosuper, Bachoco, Pilgrim’s, UGASA, Smithfield, Comarco, Sargento, Twin City Foods, Martin’s, Heinz, Mr. Wings y Ricos. Todas son marcas de línea con existencia continua."
        anclas={['distribuidor oficial de Lamb Weston', 'la relación es directa con el fabricante', 'existencia continua']}
        chips={[
          { etiqueta: 'Oficial', valor: 'Lamb Weston' },
          { etiqueta: 'Directo', valor: `${MARCAS_DIRECTAS.length} marcas sin intermediario` },
          { etiqueta: 'Marcas', valor: `${MARCAS.flatMap((c) => c.marcas).length} en portafolio` },
          { etiqueta: 'Origen', valor: 'Nacional e importado' },
        ]}
        ctaWhatsApp="Hola, ¿qué manejan de una marca en particular?"
        ctaSecundario={{ href: '/catalogo/', label: 'Ver el catálogo' }}
        imagen={HEROES['marcas'].imagen}
        lambWeston={HEROES['marcas'].lambWeston}
      />

      <BarraConfianza />

      <Seccion
        eyebrow="Relación directa"
        titulo="Dónde no hay intermediario"
        intro="La diferencia se nota en el precio y en la existencia: cuando la relación es directa, el producto no depende de la disponibilidad de un tercero. En la tabla de abajo está el portafolio completo, con la etiqueta Directo en cada marca donde compramos a la fuente."
      >
        <div className="grid gap-px bg-hielo-300 lg:grid-cols-3">
          {RELACIONES.map((r) => (
            <div key={r.marca} className="bg-white p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fry-700">
                {r.relacion}
              </p>
              {'logo' in r && r.logo ? (
                <img
                  src={asset(r.logo as string)}
                  alt={r.marca}
                  width={444}
                  height={113}
                  className="mt-3 h-10 w-auto"
                />
              ) : (
                <h3 className="mt-2 font-display text-[20px] font-bold text-navy">{r.marca}</h3>
              )}
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
        eyebrow="El portafolio"
        titulo="Las marcas que llegan en nuestro camión"
        intro="Son las que aparecen en el catálogo impreso. Con la mayoría compramos directo al fabricante."
      >
        {/* Placa BLANCA a propósito: siete de estos logotipos son de tinta
            oscura (Lamb Weston, Ventura, Sargento, Pilgrim's, Ricos, Sweet Baby
            Ray's, Mike's Hot Honey) y sobre un fondo oscuro desaparecen. */}
        <ul className="grid grid-cols-2 gap-px bg-hielo-300 sm:grid-cols-3 lg:grid-cols-5">
          {MARCAS_CON_LOGO.map((m) => (
            <li
              key={m.nombre}
              className="flex aspect-[3/2] flex-col items-center justify-center gap-2 bg-white p-5"
            >
              <img
                src={logoDe(m)!}
                alt={m.nombre}
                width={180}
                height={90}
                loading="lazy"
                decoding="async"
                className="max-h-[54px] w-auto max-w-[80%] object-contain"
              />
              {m.directo && (
                <span className="border border-fry bg-fry-100 px-1.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-fry-700">
                  Directo
                </span>
              )}
            </li>
          ))}
        </ul>
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
                    <ul className="flex flex-wrap gap-x-2 gap-y-1.5">
                      {m.marcas.map((marca) => (
                        <li key={marca.nombre} className="flex items-center gap-1.5">
                          {logoDe(marca) && (
                            <img
                              src={logoDe(marca)!}
                              alt=""
                              width={72}
                              height={36}
                              loading="lazy"
                              decoding="async"
                              className="h-5 w-auto max-w-[68px] object-contain"
                            />
                          )}
                          <span>{marca.nombre}</span>
                          {marca.directo && (
                            <span className="border border-fry bg-fry-100 px-1.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-wider text-fry-700">
                              Directo
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 max-w-prosa text-[14px] leading-relaxed text-humo-400">
          Somos distribuidores especializados en el servicio de alimentos. Trabajamos con marcas de línea y existencia
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
