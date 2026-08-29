import type { Metadata } from 'next'
import PaginaFamilia from '@/components/landing/PaginaFamilia'
import { familia, metaDesc } from '@/lib/familias'
import { faqBase } from '@/lib/faq'

const f = familia('salsas-para-alitas')!

export const metadata: Metadata = {
  title: 'Salsas para alitas por galón en Monterrey',
  description: metaDesc(f),
  alternates: { canonical: '/salsas-para-alitas/' },
}

/** PILAR. */
const PREGUNTAS = [
  {
    p: '¿Qué sabores manejan?',
    r: 'BBQ, Habanero, Lemon Pepper, Mango Habanero, Teriyaki, Cajun, X-Hot, Sriracha, Naranja Chipotle, Honey Mustard, Mezcal, Piña Hot, Spicy Lemon, Tamarindo y Original Hot. Las marcas son Mr. Wings, Hello Buffalo, La Pócima y Cajun Chef.',
  },
  {
    p: '¿Vienen en galón o en botella?',
    r: 'Las salsas para alitas se manejan principalmente en galón, que es la presentación de cocina de alto volumen. Algunas también están disponibles en botella para servicio de mesa.',
  },
  {
    p: '¿Cuál me recomiendan para empezar?',
    r: 'La mayoría de las barras arranca con tres: una BBQ, una Búfalo original y una picante fuerte tipo Mango Habanero o X-Hot. Con esas tres cubres el 80% de lo que pide la mesa, y de ahí vas ampliando.',
  },
  {
    p: '¿Tienen sazonadores además de salsas?',
    r: 'Sí. Manejamos sazonador Lemon Pepper, Lemon Pepper Hot, Cajun y Fuego en bote, que es lo que se usa para las alitas secas, sin salsa.',
  },
  ...faqBase(f).slice(1),
]

const GUIA = {
  titulo: 'Qué salsa pedir según lo que te piden en la barra',
  texto: 'Los clientes no piden por código: piden por sabor y por antojo. Esta es la traducción.',
  filas: [
    { cuando: 'Te piden “la clásica de alitas”', usa: 'Original Hot P071 o Hello Buffalo Original SHBO' },
    { cuando: 'Te piden “algo dulce con picante”', usa: 'Mango Habanero P-0198 o BBQ Habanero P081' },
    { cuando: 'Te piden “lo más picoso que tengas”', usa: 'X-Hot P083' },
    { cuando: 'Te piden “sin salsa, seca”', usa: 'Sazonador Lemon Pepper Hot P082 o Cajun SCAJUN' },
    { cuando: 'Te piden “algo cremoso”', usa: 'Habanero Cream P074' },
    { cuando: 'Quieres un sabor que casi nadie tiene', usa: 'Piña Hot P075 o Sriracha P-0203' },
  ],
}

export default function Page() {
  return <PaginaFamilia f={f} preguntas={PREGUNTAS} guia={GUIA} />
}
