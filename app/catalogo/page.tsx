import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/landing/Hero'
import { BarraConfianza, Breadcrumb, CTAFinal, Seccion } from '@/components/landing/Secciones'
import BuscadorCatalogo from '@/components/landing/BuscadorCatalogo'
import { CATALOGO } from '@/lib/catalogo'
import { FAMILIAS } from '@/lib/familias'
import { GIROS } from '@/lib/giros'
import { EMPRESA } from '@/lib/site'
import { HEROES } from '@/lib/heroes'
import { breadcrumbSchema, ld } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Catálogo de alimentos congelados para restaurante',
  description:
    'Catorce líneas de producto para food service: papa Lamb Weston, pollo Agrosuper, salsas para alitas, aderezos, Heinz, aceites, panadería Martin’s y más. Producto de línea con existencia continua y cadena de frío garantizada.',
  alternates: { canonical: '/catalogo/' },
}

export default function Page() {
  const migas = [{ nombre: 'Inicio', url: '/' }, { nombre: 'Catálogo' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <Breadcrumb items={migas} />

      <Hero
        eyebrow="14 líneas · Producto de línea"
        h1="Catálogo para food service"
        answerFirst="MACSA distribuye catorce líneas de alimentos congelados y abarrotes para restaurante: papa a la francesa Lamb Weston, pollo Agrosuper, salsas para alitas, aderezos, condimentos Heinz, aceites, panadería Martin’s y más. Todo es producto de línea con existencia continua, no saldos ni oportunidades."
        anclas={['catorce líneas', 'producto de línea con existencia continua']}
        chips={[
          { etiqueta: 'Líneas', valor: `${FAMILIAS.length} familias` },
          { etiqueta: 'Cadena de frío', valor: 'Garantizada, sin cortes' },
          { etiqueta: 'Precios', valor: 'En el portal, con tu lista' },
          { etiqueta: 'Corte', valor: `${EMPRESA.corteHora} h` },
        ]}
        ctaWhatsApp="Hola, ¿me pueden mandar el catálogo y la lista de precios?"
        ctaSecundario={{ href: '/cobertura/', label: '¿Llegan a mi ciudad?' }}
        imagen={HEROES['catalogo'].imagen}
        lambWeston={HEROES['catalogo'].lambWeston}
      />

      <BarraConfianza />

      <Seccion
        eyebrow="Encuentra rápido"
        titulo="Busca por producto, marca o código"
        intro="Escribe lo que buscas como lo dices en tu cocina: “dedos de queso”, “gajo”, “Lamb Weston” o el código, si ya lo tienes."
      >
        <BuscadorCatalogo productos={CATALOGO} />
      </Seccion>

      <Seccion
        eyebrow="Por línea de producto"
        titulo="Las catorce familias"
        intro="Cada línea tiene su página con los códigos, las presentaciones y la guía de qué pedir según tu cocina."
      >
        <div className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-3">
          {FAMILIAS.map((f) => (
            <Link
              key={f.slug}
              href={`/${f.slug}/`}
              className="group flex flex-col bg-white p-6 transition-colors hover:bg-hielo-50"
            >
              <h3 className="font-display text-[18px] font-bold text-navy group-hover:text-fry-700">
                {f.nombre}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-humo">{f.tagline}</p>
              <p className="mt-auto pt-4 font-mono text-[11px] uppercase tracking-wider text-humo-400">
                {f.productos.length > 0
                  ? `${f.productos.length} códigos · ${f.marcas[0]}`
                  : f.marcas.join(' · ')}
              </p>
            </Link>
          ))}
        </div>
      </Seccion>

      <Seccion
        eyebrow="Por tipo de negocio"
        titulo="Si prefieres, empieza por tu giro"
        intro="Cada cocina pide una combinación distinta. Estas son las líneas que suele llevar cada una."
        fondo="hielo"
      >
        <div className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-3">
          {GIROS.map((g) => (
            <div key={g.slug} className="bg-white p-6">
              <h3 className="font-display text-[17px] font-bold text-navy">{g.titulo}</h3>
              <ul className="mt-3 space-y-1.5">
                {g.necesita.map((s) => {
                  const fam = FAMILIAS.find((f) => f.slug === s)
                  if (!fam) return null
                  return (
                    <li key={s}>
                      <Link
                        href={`/${fam.slug}/`}
                        className="text-[13.5px] text-humo hover:text-fry-700"
                      >
                        {fam.nombre}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </Seccion>

      <CTAFinal />
    </>
  )
}
