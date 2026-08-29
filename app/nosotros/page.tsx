import type { Metadata } from 'next'
import Hero from '@/components/landing/Hero'
import { BarraConfianza, Breadcrumb, CTAFinal, Seccion } from '@/components/landing/Secciones'
import { EMPRESA } from '@/lib/site'
import { breadcrumbSchema, ld } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Quiénes somos',
  description:
    'MACSA de la Sultana es distribuidor de alimentos congelados y abarrotes para food service en Monterrey. Distribuidor oficial de Lamb Weston y directo de Agrosuper y Martin’s.',
  alternates: { canonical: '/nosotros/' },
}

const CLIENTES = [
  'Restaurantes de todo tamaño, desde un local hasta cadenas de quince o más sucursales',
  'Comidas corridas y cocinas de alto volumen',
  'Fast food y comida rápida',
  'Negocios de delivery y para llevar',
  'Negocios de alitas y boneless',
]

const VENTAJAS = [
  {
    t: 'Distribuidor oficial de Lamb Weston',
    d: 'En Monterrey, desde hace alrededor de tres años y medio. La papa es nuestra línea principal.',
  },
  {
    t: 'Relación directa con Agrosuper y Martin’s',
    d: 'Pollo de Chile y panadería importada de Estados Unidos, sin intermediarios de por medio.',
  },
  {
    t: 'Cadena de frío completa',
    d: 'Sin cortes en toda la ruta: congelador, andén refrigerado y camioneta refrigerada.',
  },
  {
    t: 'Producto de línea, no saldos',
    d: 'El mismo código está disponible cada vez que el cliente lo vuelve a pedir.',
  },
  {
    t: 'Todo congelado es IQF',
    d: 'Congelado pieza por pieza: va directo del congelador a la freidora, sin descongelar.',
  },
]

export default function Page() {
  const migas = [{ nombre: 'Inicio', url: '/' }, { nombre: 'Nosotros' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <Breadcrumb items={migas} />

      <Hero
        eyebrow="Monterrey y área metropolitana"
        h1="Somos distribuidores, no fabricantes"
        answerFirst="MACSA de la Sultana es distribuidor de alimentos congelados y abarrotes para food service en Monterrey y su área metropolitana. Trabajamos con marcas de línea y existencia continua, no con saldos ni productos de oportunidad, y toda la operación se sostiene sobre una cadena de frío que no se rompe en ningún punto."
        anclas={['marcas de línea y existencia continua', 'no se rompe en ningún punto']}
        chips={[
          { etiqueta: 'Razón social', valor: EMPRESA.razonSocial },
          { etiqueta: 'CEDIS', valor: 'Guadalupe, Nuevo León' },
          { etiqueta: 'Venta', valor: 'Exclusiva a negocios' },
          { etiqueta: 'Corte', valor: `${EMPRESA.corteHora} h` },
        ]}
        ctaWhatsApp="Hola, quiero conocer más de MACSA."
        ctaSecundario={{ href: '/catalogo/', label: 'Ver el catálogo' }}
      />

      <BarraConfianza />

      <Seccion
        eyebrow="A quién le vendemos"
        titulo="Sólo a negocios"
        intro="No hay venta al público en general. Estos son los negocios que surtimos todos los días."
      >
        <ul className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-3">
          {CLIENTES.map((c) => (
            <li key={c} className="bg-white p-6 text-[15px] leading-relaxed text-humo-900">
              {c}
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion
        eyebrow="Nuestra ventaja"
        titulo="Lo que nos distingue como distribuidor"
        fondo="hielo"
      >
        <div className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-3">
          {VENTAJAS.map((v) => (
            <div key={v.t} className="bg-white p-6">
              <h3 className="font-display text-[17px] font-bold text-navy">{v.t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-humo">{v.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-prosa border-l-4 border-fry pl-5 font-display text-[19px] font-semibold leading-snug text-navy">
          “{EMPRESA.claim}”
        </p>
      </Seccion>

      <CTAFinal />
    </>
  )
}
