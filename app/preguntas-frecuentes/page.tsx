import type { Metadata } from 'next'
import Hero from '@/components/landing/Hero'
import { Breadcrumb, CTAFinal, FAQ } from '@/components/landing/Secciones'
import { EMPRESA } from '@/lib/site'
import { HEROES } from '@/lib/heroes'
import { breadcrumbSchema, faqSchema, ld } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Preguntas frecuentes',
  description:
    'Pedido mínimo, corte del día, alta de cliente, cadena de frío, devoluciones y cobertura. Lo que más nos preguntan los restaurantes antes de su primer pedido.',
  alternates: { canonical: '/preguntas-frecuentes/' },
}

const PREGUNTAS = [
  {
    p: '¿Le venden a cualquier persona?',
    r: 'No. La venta es exclusiva a negocios: restaurantes, cocinas, fast food, barras, comedores y negocios de delivery. No hay venta al público en general.',
  },
  {
    p: '¿Hasta qué hora puedo pedir para que me llegue mañana?',
    r: `El corte es a las ${EMPRESA.corteHora} h, hora de Monterrey. Dentro del corte la entrega es al día siguiente; después del corte, a los dos días. No se programa domingo.`,
  },
  {
    p: '¿Cuál es el pedido mínimo?',
    r: 'En el área metropolitana de Monterrey trabajamos sin un mínimo rígido. Fuera del área metropolitana el volumen sí define cómo y cuándo llega, y te lo confirmamos antes de comprometer una fecha.',
  },
  {
    p: '¿Necesito factura para comprar?',
    r: 'Para facturar necesitamos los datos fiscales del negocio, pero también se puede trabajar con remisión, sin factura.',
  },
  {
    p: '¿Cómo pido?',
    r: 'El canal principal es WhatsApp: por ahí mandamos el catálogo, se levanta el pedido y se da seguimiento. Los clientes formales mandan su orden de compra por correo, y quien ya tiene acceso puede pedir directo desde el portal con su propio precio.',
  },
  {
    p: '¿El producto llega congelado de verdad?',
    r: 'Sí. Todas las unidades de reparto tienen sistema de refrigeración y congelación, y el almacén tiene andén refrigerado. El recorrido es congelador, andén refrigerado y camioneta refrigerada, sin romper la cadena en ningún punto.',
  },
  {
    p: '¿Qué significa IQF?',
    r: 'Congelado pieza por pieza. Las piezas no se pegan, así que puedes tomar la porción exacta que necesitas sin descongelar la caja completa, y el producto va directo del congelador a la freidora.',
  },
  {
    p: '¿Cómo se manejan las devoluciones?',
    r: 'Con un formato físico firmado por el almacenista, en el momento de la entrega.',
  },
  {
    p: '¿Puedo probar antes de comprar?',
    r: 'Sí, y es lo habitual antes del primer pedido: te llevamos una muestra sin compromiso.',
  },
  {
    p: '¿Siempre tienen el mismo producto?',
    r: 'Sí. Trabajamos con marcas de línea y existencia continua, no con saldos ni productos de oportunidad. El mismo código está disponible cada vez que lo vuelves a pedir.',
  },
  {
    p: '¿Entregan fuera de Monterrey?',
    r: 'Sí, con modos distintos según la ciudad: ruta diaria en el área metropolitana, reparto en desarrollo en el corredor sur de Nuevo León, corredor a Saltillo y Torreón, y viaje dedicado a la zona de Tampico y Ciudad Victoria cuando el pedido lo justifica.',
  },
  {
    p: '¿Son distribuidor autorizado?',
    r: 'Somos distribuidor oficial de Lamb Weston en Monterrey, y distribuidor directo de Agrosuper para pollo y de Martin’s para panadería, sin intermediarios.',
  },
]

export default function Page() {
  const migas = [{ nombre: 'Inicio', url: '/' }, { nombre: 'Preguntas frecuentes' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(faqSchema(PREGUNTAS))} />
      <Breadcrumb items={migas} />

      <Hero
        eyebrow="Antes de tu primer pedido"
        h1="Preguntas frecuentes"
        answerFirst="Estas son las preguntas que más nos hacen los restaurantes antes de su primer pedido con MACSA: el corte del día es a las 20:00, la venta es exclusiva a negocios, se puede facturar o trabajar con remisión, y lo normal es empezar con una muestra sin compromiso."
        anclas={['exclusiva a negocios', 'una muestra sin compromiso']}
        ctaWhatsApp="Hola, tengo una duda sobre sus productos."
        ctaSecundario={{ href: '/alta-de-cliente/', label: 'Darme de alta' }}
        imagen={HEROES['preguntas-frecuentes'].imagen}
        lambWeston={HEROES['preguntas-frecuentes'].lambWeston}
      />

      <FAQ preguntas={PREGUNTAS} />
      <CTAFinal />
    </>
  )
}
