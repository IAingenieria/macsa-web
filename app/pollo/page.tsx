import type { Metadata } from 'next'
import PaginaFamilia from '@/components/landing/PaginaFamilia'
import { familia, metaDesc } from '@/lib/familias'
import { faqBase } from '@/lib/faq'

const f = familia('pollo')!

export const metadata: Metadata = {
  title: 'Pollo congelado para restaurante en Monterrey',
  description: metaDesc(f),
  alternates: { canonical: '/pollo/' },
}

/**
 * PILAR.
 * ⚠️ Regla del catálogo: el precio de pollo NUNCA se calcula ni se convierte
 * de kilo a caja. Sale únicamente de la lista de precios, y si el producto no
 * aparece ahí, la conversación pasa con un asesor. Por eso esta página no
 * publica precio ni equivalencias de kilos por caja.
 */
const PREGUNTAS = [
  {
    p: '¿Cuál es el producto de pollo que más se mueve?',
    r: 'La media pechuga sin piel. Es el que más rota en cocinas de comida corrida y de alto volumen porque rinde para varias preparaciones con el mismo código.',
  },
  {
    p: '¿Trabajan directo con Agrosuper?',
    r: 'Sí, somos distribuidor directo de Agrosuper para pollo, sin intermediarios de por medio.',
  },
  {
    p: '¿Qué diferencia hay entre el boneless natural y el enchilado?',
    r: 'El natural (POL-FN) viene sin sazonar y te deja poner tu propia salsa; el enchilado (POL-FE) ya trae el picante integrado. Si vendes boneless con varias salsas, la mayoría de nuestros clientes se queda con el natural y salsea al momento.',
  },
  {
    p: '¿Me pueden dar el precio por kilo?',
    r: 'El precio del pollo lo damos siempre desde la lista de precios vigente, con la presentación exacta que estés pidiendo. Escríbenos qué código necesitas y te lo confirmamos con su presentación, para que no haya confusión entre caja y kilo.',
  },
  ...faqBase(f).slice(1),
]

const GUIA = {
  titulo: 'Qué pedir según lo que vendes',
  texto: 'Los códigos cambian de nombre entre marcas. Esto es lo que suele pedir cada tipo de cocina.',
  filas: [
    { cuando: 'Vende alitas', usa: 'Ala picosita POL-APC o ala chilena Agrosuper ACH13' },
    { cuando: 'Vende boneless', usa: 'Freskecito natural POL-FN o enchilado POL-FE' },
    { cuando: 'Cocina comida corrida', usa: 'Media pechuga sin piel PSCH13' },
    { cuando: 'Vende empanizados y nuggets', usa: "Tender POL-TP o POL-TE, nugget POL-NP" },
    { cuando: 'Arma hamburguesa de pollo', usa: 'Hamburguesa de pechuga POL-HP' },
  ],
}

export default function Page() {
  return <PaginaFamilia f={f} preguntas={PREGUNTAS} guia={GUIA} />
}
