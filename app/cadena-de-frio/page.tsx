import type { Metadata } from 'next'
import Hero from '@/components/landing/Hero'
import {
  BarraConfianza,
  Breadcrumb,
  CadenaFrio,
  CTAFinal,
  FAQ,
  Seccion,
} from '@/components/landing/Secciones'
import { HEROES } from '@/lib/heroes'
import { breadcrumbSchema, faqSchema, ld } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Cadena de frío y cómo llega el producto',
  description:
    'Congelador, andén refrigerado y camioneta refrigerada: el recorrido no se rompe en ningún punto. Buscamos las mejores marcas del mercado y las entregamos como salieron de fábrica.',
  alternates: { canonical: '/cadena-de-frio/' },
}

const PREGUNTAS = [
  {
    p: '¿Qué significa que el producto sea IQF?',
    r: 'IQF es congelación rápida individual: cada pieza se congela por separado, así que no se pegan entre sí y puedes tomar la porción exacta que necesitas sin descongelar la caja completa. Si la caja llega hecha un bloque, el producto se descongeló en algún punto del camino. Aplica a la papa Lamb Weston, a las verduras y el elote, y a los quesos empanizados de Sargento y Martin’s. La pechuga, la carne para hamburguesa y otros productos vienen en bloque por su propia naturaleza, y no los anunciamos como IQF.',
  },
  {
    p: '¿Las camionetas de reparto son refrigeradas?',
    r: 'Sí. Todas las unidades de reparto tienen sistema de refrigeración y congelación, y el almacén tiene andén refrigerado. El recorrido completo es congelador, andén refrigerado y camioneta refrigerada.',
  },
  {
    p: '¿Cómo manejan una devolución?',
    r: 'Con un formato físico firmado por el almacenista. Si algo llegó mal, se documenta en el momento de la entrega.',
  },
  {
    p: '¿Tengo que descongelar antes de freír?',
    r: 'No, y no conviene. Descongelar el producto antes de freírlo es justo lo que lo deja aguado. Va directo del congelador a la freidora.',
  },
]

const PASOS = ['Pedido', 'Factura', 'Almacén', 'Camión', 'Entrega', 'Liquidación']

export default function Page() {
  const migas = [{ nombre: 'Inicio', url: '/' }, { nombre: 'Cadena de frío' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(faqSchema(PREGUNTAS))} />
      <Breadcrumb items={migas} />

      <Hero
        eyebrow="Lo que más cuidamos"
        h1="La cadena de frío no se rompe en ningún punto"
        answerFirst="La cadena de frío es lo que más cuida MACSA y la razón por la que el producto llega como debe llegar. Buscamos las mejores marcas del mercado y cuidamos la cadena de conservación de punta a punta: el recorrido es congelador, andén refrigerado y camioneta refrigerada, sin ningún tramo a la intemperie."
        anclas={['sin ningún tramo a la intemperie', 'cadena de conservación de punta a punta']}
        chips={[
          { etiqueta: 'Almacén', valor: 'Andén refrigerado' },
          { etiqueta: 'Reparto', valor: 'Unidades con refrigeración y congelación' },
          { etiqueta: 'Calidad', valor: 'Las mejores marcas del mercado' },
          { etiqueta: 'Devoluciones', valor: 'Formato firmado por el almacenista' },
        ]}
        ctaWhatsApp="Hola, quiero saber cómo entregan el producto congelado."
        ctaSecundario={{ href: '/cobertura/', label: 'Ver cobertura' }}
        imagen={HEROES['cadena-de-frio'].imagen}
        lambWeston={HEROES['cadena-de-frio'].lambWeston}
      />

      <BarraConfianza />
      <CadenaFrio />

      <Seccion eyebrow="El recorrido interno" titulo="Cómo funciona un pedido, paso por paso">
        <ol className="grid gap-px bg-hielo-300 sm:grid-cols-3 lg:grid-cols-6">
          {PASOS.map((paso, i) => (
            <li key={paso} className="bg-white p-5">
              <span className="font-mono text-[11px] font-semibold text-fry-700">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-1.5 font-display text-[15px] font-bold text-navy">{paso}</p>
            </li>
          ))}
        </ol>
      </Seccion>

      <FAQ preguntas={PREGUNTAS} />
      <CTAFinal />
    </>
  )
}
