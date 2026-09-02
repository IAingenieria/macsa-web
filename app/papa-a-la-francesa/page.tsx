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
    r: 'No. La papa es IQF, congelada pieza por pieza, así que va directo del congelador a la freidora. Descongelarla es justo lo que la deja aguada.',
  },
  {
    p: '¿Cuántas órdenes salen de una caja?',
    r: 'Depende del gramaje que sirvas y del corte. La caja estándar es de 13.6 kg; tu asesor te ayuda a sacar el costo por orden con tu gramaje y el precio de tu lista.',
  },
  {
    p: '¿Son distribuidor autorizado de Lamb Weston?',
    r: 'Sí. Somos distribuidor oficial de Lamb Weston en Monterrey desde hace alrededor de tres años y medio, y la papa es nuestra línea principal.',
  },
  ...faqBase(f).slice(1),
]

/**
 * La guía habla de CORTES, no de códigos.
 *
 * Edgar la corrigió el 31-ago-2026 por dos razones. La primera: el cliente
 * pide "la Stealth" o "la recta gruesa con cáscara", nunca "la S19" — y el
 * vendedor ya sabe traducirlo. La segunda es un error de fondo que traía la
 * tabla: decía que el gajo es el corte que "se ve más en el plato", y no lo
 * es. El gajo llena por VOLUMEN; los que dan presencia son el twister, la
 * crisscut y los cortes delgados.
 */
const GUIA = {
  titulo: 'Qué corte pedir según tu cocina',
  texto:
    'La pregunta que más nos hacen no es el precio: es cuál corte aguanta el trayecto. Esta es la respuesta corta, por tipo de corte — el código exacto te lo damos al cotizar.',
  filas: [
    { cuando: 'Sirve en mesa y se come de inmediato', usa: 'Corte recto 3/8, el clásico de restaurante' },
    { cuando: 'Manda a domicilio o por aplicación', usa: 'Corte con cobertura crujiente' },
    { cuando: 'Quiere que el plato luzca más', usa: 'Twister, crisscut o corte delgado' },
    { cuando: 'Quiere llenar más el plato por volumen', usa: 'Gajo sazonado de 8 cortes' },
    { cuando: 'Busca la papa más crujiente', usa: 'Corte delgado 5/16, recto u ondulado' },
    { cuando: 'Quiere presentación rústica', usa: 'Corte con cáscara, recto 3/8 o 1/4' },
    { cuando: 'Vende hamburguesa y quiere papa gruesa', usa: 'Corte 1/4, menos aceite y más papa por mordida' },
    { cuando: 'Necesita papa para desayunos', usa: 'Cubos, hash brown y tater rounds' },
  ],
}

export default function Page() {
  return <PaginaFamilia f={f} preguntas={PREGUNTAS} guia={GUIA} />
}
