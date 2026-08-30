import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/landing/Hero'
import { BarraConfianza, Breadcrumb, CTAFinal, Seccion } from '@/components/landing/Secciones'
import { CATALOGO, porFamilia } from '@/lib/catalogo'
import { FAMILIAS } from '@/lib/familias'
import { EMPRESA } from '@/lib/site'
import { HEROES } from '@/lib/heroes'
import { breadcrumbSchema, ld } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Tienda — catálogo de producto con ficha',
  description:
    'Catálogo de MACSA con ficha por código: presentación, kilos por caja y rendimiento en órdenes. Pide por WhatsApp o entra al portal con tu precio.',
  alternates: { canonical: '/tienda/' },
}

export default function Page() {
  const migas = [{ nombre: 'Inicio', url: '/' }, { nombre: 'Tienda' }]
  const conProductos = FAMILIAS.filter((f) => porFamilia(f.slug).length > 0)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <Breadcrumb items={migas} />

      <Hero
        eyebrow="Catálogo con ficha"
        h1="Tienda"
        answerFirst="El catálogo de MACSA con ficha por código: cada producto trae su presentación, los kilos por caja y cuántas órdenes rinde. Pide por WhatsApp desde la ficha, o entra al portal con tu código y tu PIN para ver tu precio y levantar el pedido tú mismo."
        anclas={['ficha por código', 'levantar el pedido tú mismo']}
        chips={[
          { etiqueta: 'Productos', valor: `${CATALOGO.length} con ficha` },
          { etiqueta: 'Líneas', valor: `${conProductos.length} familias` },
          { etiqueta: 'Corte', valor: `${EMPRESA.corteHora} h` },
          { etiqueta: 'Precio', valor: 'En el portal, con tu lista' },
        ]}
        ctaWhatsApp="Hola, quiero el catálogo completo con precios."
        ctaSecundario={{ href: '/catalogo/', label: 'Ver las líneas' }}
        imagen={HEROES['tienda'].imagen}
        lambWeston={HEROES['tienda'].lambWeston}
      />

      <BarraConfianza />

      {conProductos.map((f) => {
        const productos = porFamilia(f.slug)
        return (
          <Seccion
            key={f.slug}
            id={f.slug}
            eyebrow={`${productos.length} ${productos.length === 1 ? 'código' : 'códigos'}`}
            titulo={f.nombre}
            intro={f.tagline}
            fondo={conProductos.indexOf(f) % 2 === 1 ? 'hielo' : 'blanco'}
          >
            <div className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-4">
              {productos.map((p) => (
                <Link
                  key={p.sku}
                  href={`/tienda/${p.sku.toLowerCase()}/`}
                  className="group flex flex-col bg-white transition-colors hover:bg-hielo-50"
                >
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-hielo-50 p-3">
                    <img
                      src={p.imagen}
                      alt={`${p.nombre} — código ${p.sku}`}
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
                    <h3 className="mt-1.5 font-display text-[15px] font-bold leading-snug text-navy group-hover:text-fry-700">
                      {p.nombre}
                    </h3>
                    {p.presentacion && (
                      <p className="mt-2 text-[13px] text-humo">{p.presentacion}</p>
                    )}
                    {p.rendimiento && (
                      <p className="mt-1 text-[13px] text-humo-400">
                        ~{p.rendimiento.g150} órdenes de 150 g
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href={`/${f.slug}/`}
              className="mt-6 inline-block font-display text-[14px] font-semibold text-navy-600 hover:text-fry-700"
            >
              Ver la línea de {f.nombre.toLowerCase()} →
            </Link>
          </Seccion>
        )
      })}

      <Seccion eyebrow="Nota" titulo="Lo que no está aquí">
        <p className="max-w-prosa leading-relaxed text-humo">
          Esta tienda muestra los códigos que ya tienen ficha fotográfica. El catálogo completo es
          más amplio: si buscas algo que no aparece, escríbenos y te confirmamos si lo manejamos,
          con su presentación y disponibilidad del día.
        </p>
      </Seccion>

      <CTAFinal />
    </>
  )
}
