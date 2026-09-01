import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/landing/Hero'
import {
  BarraConfianza,
  CadenaFrio,
  ComoPedir,
  CTAFinal,
  FAQ,
  Seccion,
} from '@/components/landing/Secciones'
import { FAMILIAS } from '@/lib/familias'
import { GIROS } from '@/lib/giros'
import { CIUDADES, MODOS, porModo, type Modo } from '@/lib/ciudades'
import FormularioProspecto from '@/components/landing/FormularioProspecto'
import { HEROES } from '@/lib/heroes'
import { faqSchema, ld } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'MACSA Foodservice — Distribuidor de alimentos congelados en Monterrey',
  description:
    'Distribuidor oficial de Lamb Weston en Monterrey. Papa a la francesa, pollo, salsas para alitas y 14 líneas más para restaurantes, con cadena de frío sin cortes y entrega al día siguiente.',
  alternates: { canonical: '/' },
}

const PREGUNTAS = [
  {
    p: '¿Le venden a cualquier persona?',
    r: 'Contamos con un punto de venta donde puedes llevarte desde una pieza o una caja, según el producto, y manejamos servicio a domicilio a partir de un pedido mínimo. Estamos enfocados en la industria del servicio de alimentos: restaurantes, cocinas, hoteles, cafeterías, escuelas y comedores.',
  },
  {
    p: '¿Cuál es el pedido mínimo?',
    r: 'En el área metropolitana de Monterrey trabajamos sin un mínimo rígido: escríbenos lo que necesitas y te confirmamos. Para ciudades fuera del área metropolitana el volumen sí define cómo y cuándo llega, y te lo decimos antes de comprometerlo.',
  },
  {
    p: '¿Necesito estar dado de alta para pedir?',
    r: 'Para facturar sí necesitamos los datos fiscales del negocio. También se puede trabajar con remisión, sin factura. El alta se hace el mismo día.',
  },
  {
    p: '¿Hasta qué hora puedo pedir para que me llegue mañana?',
    r: 'El corte es a las 20:00, hora de Monterrey. El pedido que entra antes del corte se entrega al día siguiente; después del corte, a los dos días. No se programa domingo.',
  },
  {
    p: '¿El producto llega congelado de verdad?',
    r: 'Sí. Todas las unidades de reparto tienen sistema de refrigeración y congelación, y el almacén tiene andén refrigerado. El recorrido es congelador → andén refrigerado → camioneta refrigerada, sin romper la cadena de frío en ningún punto.',
  },
  {
    p: '¿Puedo probar antes de comprar?',
    r: 'Sí, es lo habitual antes del primer pedido: te llevamos una muestra sin compromiso para que la pruebes en tu cocina.',
  },
]

const ORDEN_MODOS: Modo[] = ['diaria', 'desarrollo', 'corredor', 'consulta']

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(faqSchema(PREGUNTAS))} />

      <Hero
        eyebrow="Distribuidor oficial Lamb Weston · Monterrey"
        h1="Alimentos congelados para tu cocina, con la cadena de frío intacta"
        answerFirst="MACSA es distribuidor de alimentos congelados y abarrotes para food service en Monterrey y su área metropolitana. Somos distribuidor oficial de Lamb Weston y distribuidor directo de Agrosuper y de Martin’s, con producto de línea y existencia permanente: el mismo código está disponible cada vez que lo vuelves a pedir."
        anclas={[
          'distribuidor oficial de Lamb Weston',
          'existencia permanente',
          'cadena de frío',
        ]}
        chips={[
          { etiqueta: 'Líneas', valor: '14 familias de producto' },
          { etiqueta: 'Corte', valor: '20:00 h para entrega al día siguiente' },
          { etiqueta: 'Cadena de frío', valor: 'Garantizada, sin cortes' },
          { etiqueta: 'Cobertura', valor: 'Nuevo León y Coahuila' },
        ]}
        ctaWhatsApp="Hola, quiero información de sus productos y precios."
        ctaSecundario={{ href: '/catalogo/', label: 'Ver el catálogo' }}
        imagen={HEROES['home'].imagen}
        lambWeston={HEROES['home'].lambWeston}
      />

      <BarraConfianza />

      <Seccion
        eyebrow="Catálogo"
        titulo="Catorce líneas, todas de producto de línea"
        intro="Somos distribuidores especializados en el servicio de alimentos. Trabajamos con marcas de línea y existencia continua, no con saldos ni productos de oportunidad."
      >
        <div className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-3">
          {FAMILIAS.map((f) => (
            <Link
              key={f.slug}
              href={`/${f.slug}/`}
              className="group bg-white p-6 transition-colors hover:bg-hielo-50"
            >
              <h3 className="font-display text-[18px] font-bold text-navy group-hover:text-fry-700">
                {f.nombre}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-humo">{f.tagline}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-humo-400">
                {f.marcas.slice(0, 3).join(' · ')}
              </p>
            </Link>
          ))}
        </div>
      </Seccion>

      <Seccion
        eyebrow="Cobertura"
        titulo="Dónde entregamos, dicho sin adornos"
        intro="Cada ciudad tiene un modo de entrega distinto y lo decimos antes de que nos lo preguntes. Preferimos ser claros a prometer de más."
        fondo="hielo"
      >
        <div className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-3">
          {ORDEN_MODOS.map((m) => {
            const ciudades = porModo(m)
            const modo = MODOS[m]
            return (
              <div key={m} className="bg-white p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-humo-400">
                  {ciudades.length} {ciudades.length === 1 ? 'ciudad' : 'ciudades'}
                </p>
                <h3 className="mt-1.5 font-display text-[17px] font-bold text-navy">
                  {modo.titulo}
                </h3>
                <p className="mt-1 font-display text-[14px] font-semibold text-fry-700">
                  {modo.promesa}
                </p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-humo">
                  {ciudades.map((c) => c.nombre).join(', ')}.
                </p>
              </div>
            )
          })}
          <div className="flex flex-col justify-center bg-navy p-6 text-white">
            <p className="font-display text-3xl font-bold text-fry">{CIUDADES.length}</p>
            <p className="mt-1 text-[14px] leading-relaxed text-hielo-200">
              ciudades en Nuevo León, Coahuila y Tamaulipas.
            </p>
            <Link href="/cobertura/" className="mt-4 font-display text-[14px] font-semibold text-fry hover:text-white">
              Ver el detalle de cada una →
            </Link>
          </div>
        </div>
      </Seccion>

      <CadenaFrio />

      <Seccion
        eyebrow="Tu negocio"
        titulo="Sabemos qué necesita cada cocina"
        intro="Desde un local hasta cadenas de quince sucursales o más. Estas son las líneas que suele pedir cada giro."
      >
        <div className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-3">
          {GIROS.map((g) => (
            <div key={g.slug} className="bg-white p-6">
              <h3 className="font-display text-[17px] font-bold text-navy">{g.nombre}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-humo">
                {g.necesita
                  .map((s) => FAMILIAS.find((f) => f.slug === s)?.nombre)
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </Seccion>

      <ComoPedir />

      <Seccion
        eyebrow="Contacto"
        titulo="Te cotizamos hoy mismo"
        intro="Déjanos tus datos y un asesor te contacta con precio y disponibilidad. O escríbenos por WhatsApp si prefieres resolverlo al momento."
      >
        <div className="max-w-2xl">
          <FormularioProspecto />
        </div>
      </Seccion>

      <FAQ preguntas={PREGUNTAS} />

      <CTAFinal />
    </>
  )
}
