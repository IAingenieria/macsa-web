import type { Metadata } from 'next'
import PaginaFamilia from '@/components/landing/PaginaFamilia'
import { familia, metaDesc } from '@/lib/familias'
import { faqBase } from '@/lib/faq'

const f = familia('papa-a-la-francesa')!

export const metadata: Metadata = {
  title: 'Papa a la francesa congelada Lamb Weston en Monterrey',
  description: metaDesc(f),
  alternates: { canonical: '/papa-a-la-francesa/' },
}

/**
 * PILAR. Es la página de la que se clonan las de producto × ciudad.
 * Todo lo que se agregue aquí aparece en las 30 páginas geográficas.
 */
const PREGUNTAS = [
  {
    p: '¿Qué corte de papa me conviene para mi negocio?',
    r: 'Depende de cuánto tiempo pasa la papa entre la freidora y la mesa. Si la entregas de inmediato, la recta 3/8 funciona bien. Si el cliente se la lleva o pides a domicilio, conviene un corte con recubrimiento como la Crunchy o la sazonada, que aguanta más tiempo crujiente. Para barra y botana, el gajo y la crisscut se ven más y se comparten mejor.',
  },
  {
    p: '¿Hay que descongelar la papa antes de freírla?',
    r: 'No. Todo el producto congelado es IQF, congelado pieza por pieza, así que va directo del congelador a la freidora. Descongelarla es justo lo que la deja aguada.',
  },
  {
    p: '¿Cuántas órdenes salen de una caja?',
    r: 'Depende del gramaje de tu porción. Con la caja estándar de 13.6 kg y una orden de 150 gramos salen alrededor de 90 órdenes; con porción de 200 gramos, cerca de 68. Te ayudamos a sacar el costo por orden con el precio de tu lista.',
  },
  {
    p: '¿Son distribuidor autorizado de Lamb Weston?',
    r: 'Sí. Somos distribuidor oficial de Lamb Weston en Monterrey desde hace alrededor de tres años y medio, y la papa es nuestra línea principal.',
  },
  ...faqBase(f).slice(1),
]

const GUIA = {
  titulo: 'Qué corte pedir según tu cocina',
  texto:
    'La pregunta que más nos hacen no es el precio: es cuál corte aguanta el trayecto. Esta es la respuesta corta.',
  filas: [
    { cuando: 'Sirve en mesa y se come de inmediato', usa: 'Recta 3/8 — B36 o B3901' },
    { cuando: 'Manda a domicilio o para llevar', usa: 'Recta con recubrimiento — C0057 Crunchy' },
    { cuando: 'Quiere que se vea más en el plato', usa: 'Gajo sazonado — C27 o C2700' },
    { cuando: 'Vende botana para compartir en barra', usa: 'Crisscut sazonada — D23' },
    { cuando: 'Busca la papa más delgada y crujiente', usa: 'Thin cut crinkle 5/16 — 12045' },
    { cuando: 'Quiere presentación rústica, con cáscara', usa: 'Recta 3/8 con cáscara — 32L' },
    { cuando: 'Necesita papa para desayunos', usa: 'Papa en cubo — 32N o tater rounds A26' },
  ],
}

export default function Page() {
  return <PaginaFamilia f={f} preguntas={PREGUNTAS} guia={GUIA} />
}
