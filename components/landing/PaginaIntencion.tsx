import Link from 'next/link'
import Hero from '@/components/landing/Hero'
import { BarraConfianza, Breadcrumb, CadenaFrio, Cobertura, ComoPedir, FAQ, Seccion } from '@/components/landing/Secciones'
import { GaleriaProductos } from '@/components/landing/Productos'
import FormularioProspecto from '@/components/landing/FormularioProspecto'
import { CIUDADES_INTENCION, INTENCIONES, intencion, intencionEnCiudad, slugIntencionCiudad } from '@/lib/intenciones'
import { ciudad as buscarCiudad } from '@/lib/ciudades'
import { breadcrumbSchema, faqSchema, ld } from '@/lib/schema'

/**
 * PÁGINA DE BÚSQUEDA (S182). Contesta la frase con que busca el comprador
 * («distribuidor de papas congeladas», «alitas por mayoreo») y reparte hacia
 * las páginas de producto, que llevan el nombre técnico. Ver lib/intenciones.ts.
 */
export default function PaginaIntencion({ slug, ciudad }: { slug: string; ciudad?: string }) {
  const it = ciudad ? intencionEnCiudad(slug, ciudad) : intencion(slug)!
  const c = ciudad ? buscarCiudad(ciudad) : undefined
  const base = intencion(slug)!
  const migas = c
    ? [{ nombre: 'Inicio', url: '/' }, { nombre: base.h1, url: `/${base.slug}/` }, { nombre: c.nombre }]
    : [{ nombre: 'Inicio', url: '/' }, { nombre: it.h1 }]
  const otras = INTENCIONES.filter((x) => x.slug !== it.slug)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(faqSchema(it.preguntas))} />

      <Breadcrumb items={migas} />

      <Hero
        eyebrow={it.eyebrow}
        h1={it.h1}
        answerFirst={it.answerFirst}
        anclas={[]}
        chips={[
          c
            ? { etiqueta: 'Entrega', valor: 'Miércoles, con la ruta' }
            : { etiqueta: 'Entrega', valor: 'Al día siguiente en el área metropolitana' },
          c
            ? { etiqueta: 'Pedido mínimo', valor: ciudad === 'torreon' ? 'Sin mínimo (bodega en Torreón)' : '$5,000' }
            : { etiqueta: 'A domicilio', valor: 'Desde $1,500' },
          { etiqueta: 'Cadena de frío', valor: 'Garantizada, sin cortes' },
          { etiqueta: 'Clientes', valor: 'Negocios y particulares' },
        ]}
        ctaWhatsApp={it.whatsapp}
        ctaSecundario={{ href: '/alta-de-cliente/', label: 'Darme de alta como cliente' }}
      />

      <BarraConfianza />

      {c && <Cobertura ciudad={c} producto={base.h1.toLowerCase()} />}

      <Seccion eyebrow="Por qué con nosotros" titulo="Lo que te resolvemos" fondo="hielo">
        <div className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-4">
          {it.puntos.map((p) => (
            <div key={p.titulo} className="bg-white p-6">
              <h3 className="font-display text-[16px] font-bold text-navy">{p.titulo}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-humo">{p.texto}</p>
            </div>
          ))}
        </div>
      </Seccion>

      <GaleriaProductos skus={it.skus} titulo={it.tituloProductos} />

      <Seccion eyebrow="Ver por producto" titulo="Encuentra el corte o la presentación exacta">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {it.enlaces.map((e) => (
            <li key={e.url}>
              <Link
                href={e.url}
                className="block rounded border border-hielo-300 bg-white px-4 py-3 font-semibold text-navy hover:border-fry"
              >
                {e.texto} →
              </Link>
            </li>
          ))}
        </ul>
      </Seccion>

      <CadenaFrio />

      <ComoPedir contexto={it.h1.toLowerCase()} modo={c?.modo} />

      <Seccion
        eyebrow="Contacto"
        titulo="Te cotizamos hoy mismo"
        intro="Déjanos tus datos y un asesor te contacta con precio y disponibilidad. O escríbenos por WhatsApp si prefieres resolverlo al momento."
      >
        <div className="max-w-2xl">
          <FormularioProspecto producto={it.h1.toLowerCase()} />
        </div>
      </Seccion>

      <FAQ preguntas={it.preguntas} />

      {!c && (
        <Seccion eyebrow="Corredor Saltillo — Torreón" titulo="¿Estás en Coahuila?" fondo="hielo">
          <ul className="grid gap-3 sm:grid-cols-2">
            {CIUDADES_INTENCION.map((cs) => (
              <li key={cs}>
                <Link
                  href={`/${slugIntencionCiudad(base.slug, cs)}/`}
                  className="block rounded border border-hielo-300 bg-white px-4 py-3 font-semibold text-navy hover:border-fry"
                >
                  {intencionEnCiudad(base.slug, cs).h1} →
                </Link>
              </li>
            ))}
          </ul>
        </Seccion>
      )}

      <Seccion eyebrow="También te puede interesar" titulo="Otras búsquedas frecuentes" fondo="hielo">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {otras.map((x) => (
            <li key={x.slug}>
              <Link href={`/${x.slug}/`} className="font-semibold text-navy underline-offset-4 hover:underline">
                {x.h1}
              </Link>
            </li>
          ))}
        </ul>
      </Seccion>
    </>
  )
}
