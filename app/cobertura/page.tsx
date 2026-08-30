import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/landing/Hero'
import { Breadcrumb, CTAFinal, FAQ, Seccion } from '@/components/landing/Secciones'
import { CIUDADES, MODOS, porModo, type Modo } from '@/lib/ciudades'
import { EMPRESA, waLink } from '@/lib/site'
import { HEROES } from '@/lib/heroes'
import { breadcrumbSchema, faqSchema, ld } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Cobertura de entrega — Nuevo León, Coahuila y Tamaulipas',
  description:
    'Dónde entrega MACSA: ruta diaria en el área metropolitana de Monterrey, corredor Saltillo–Torreón y viaje dedicado a Tampico y Ciudad Victoria. 30 ciudades con su modo de entrega.',
  alternates: { canonical: '/cobertura/' },
}

const ORDEN: Modo[] = ['diaria', 'desarrollo', 'corredor', 'dedicado', 'consulta']

const PREGUNTAS = [
  {
    p: '¿Entregan fuera del área metropolitana de Monterrey?',
    r: 'Sí, pero no de la misma forma en todas partes. En el área metropolitana tenemos ruta diaria. Sobre el corredor a Torreón entregamos aprovechando el viaje que ya hacemos, y a la zona de Tampico y Ciudad Victoria sale una unidad cuando el pedido justifica el viaje.',
  },
  {
    p: '¿Cuánto tarda en llegar mi pedido?',
    r: 'En el área metropolitana, al día siguiente si el pedido entra antes del corte de las 20:00. Fuera del área metropolitana depende del modo de entrega de tu ciudad; te lo confirmamos al levantar el pedido, antes de comprometer una fecha.',
  },
  {
    p: 'Mi ciudad no aparece en la lista, ¿me pueden surtir?',
    r: 'Escríbenos con el volumen que manejas. Si da para armar un viaje, te decimos cómo y cuándo; y si no da, te lo decimos también. Preferimos ser claros a prometer de más.',
  },
  {
    p: '¿Cuál es el pedido mínimo para que salgan a mi ciudad?',
    r: 'Depende de la distancia y de la línea de producto. Escríbenos qué necesitas y te confirmamos el volumen que hace viable la entrega.',
  },
]

export default function Page() {
  const migas = [{ nombre: 'Inicio', url: '/' }, { nombre: 'Cobertura' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(faqSchema(PREGUNTAS))} />

      <Breadcrumb items={migas} />

      <Hero
        eyebrow="Nuevo León · Coahuila · Tamaulipas"
        h1="Dónde entregamos, y cómo llega a cada ciudad"
        answerFirst="MACSA entrega con ruta diaria en Monterrey y su área metropolitana, con reparto en desarrollo en el corredor sur de Nuevo León, sobre el corredor Saltillo–Torreón aprovechando el viaje que ya hacemos, y con viaje dedicado a la zona de Tampico y Ciudad Victoria cuando el pedido lo justifica."
        anclas={['ruta diaria', 'el viaje que ya hacemos', 'viaje dedicado']}
        chips={[
          { etiqueta: 'Ciudades', valor: `${CIUDADES.length} en tres estados` },
          { etiqueta: 'Ruta diaria', valor: `${porModo('diaria').length} municipios del AMM` },
          { etiqueta: 'Corte', valor: `${EMPRESA.corteHora} h` },
          { etiqueta: 'CEDIS', valor: 'Guadalupe, Nuevo León' },
        ]}
        ctaWhatsApp="Hola, quiero saber si entregan en mi ciudad."
        ctaSecundario={{ href: '/catalogo/', label: 'Ver el catálogo' }}
        imagen={HEROES['cobertura'].imagen}
        lambWeston={HEROES['cobertura'].lambWeston}
      />

      <Seccion
        eyebrow="Modos de entrega"
        titulo="No prometemos lo mismo en todas partes"
        intro="Cada ciudad tiene un modo, y lo decimos antes de que nos lo preguntes. Es la diferencia entre una entrega que llega y una promesa que incomoda."
      >
        <div className="space-y-10">
          {ORDEN.map((m) => {
            const modo = MODOS[m]
            const ciudades = porModo(m)
            return (
              <div key={m} className="border-l-4 border-fry pl-5 sm:pl-7">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display text-[20px] font-bold text-navy">{modo.titulo}</h3>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-humo-400">
                    {ciudades.length} {ciudades.length === 1 ? 'ciudad' : 'ciudades'}
                  </span>
                </div>
                <p className="mt-1 font-display text-[15px] font-semibold text-fry-700">
                  {modo.promesa}
                </p>
                <p className="mt-3 max-w-prosa text-[15px] leading-relaxed text-humo">
                  {modo.detalle}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {ciudades.map((c) => (
                    <li
                      key={c.slug}
                      className="border border-hielo-300 bg-hielo-50 px-3 py-1.5 text-[13.5px] text-humo-900"
                    >
                      {c.nombre}
                      <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-humo-400">
                        {c.estado}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </Seccion>

      <Seccion
        eyebrow="Cómo funciona un pedido"
        titulo="Del corte a tu puerta"
        intro={`El corte es a las ${EMPRESA.corteHora} h, hora de Monterrey. Quien acomoda la carga trabaja hasta tarde, así que hay margen real: lo que entra antes del corte sale al día siguiente.`}
        fondo="hielo"
      >
        <ol className="grid gap-px bg-hielo-300 sm:grid-cols-3 lg:grid-cols-6">
          {['Pedido', 'Factura', 'Almacén', 'Camión', 'Entrega', 'Liquidación'].map((paso, i) => (
            <li key={paso} className="bg-white p-5">
              <span className="font-mono text-[11px] font-semibold text-fry-700">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-1.5 font-display text-[15px] font-bold text-navy">{paso}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-prosa text-[15px] leading-relaxed text-humo">
          Nunca se programa domingo. Si tu pedido entra después del corte, la entrega se recorre a
          los dos días — y te lo decimos al confirmar, no después.
        </p>
      </Seccion>

      <FAQ preguntas={PREGUNTAS} />

      <section className="bg-white py-14">
        <div className="contenedor">
          <h2 className="font-display text-[1.5rem] font-bold text-navy">
            ¿Tu ciudad no está en la lista?
          </h2>
          <p className="mt-3 max-w-prosa leading-relaxed text-humo">
            Escríbenos con el volumen que manejas y qué línea te interesa. Si da para armar el
            viaje, te decimos cómo y cuándo.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={waLink('Hola, quiero saber si pueden entregar en mi ciudad. Manejo un volumen de…')}
              className="btn-primario"
            >
              Consultar mi ciudad
            </a>
            <Link href="/contacto/" className="btn-secundario">
              Ver todos los contactos
            </Link>
          </div>
        </div>
      </section>

      <CTAFinal />
    </>
  )
}
