/**
 * Los 12 giros de negocio — el equivalente a las páginas "situacionales"
 * de YAAN. En B2B convierten mejor que las de producto porque el comprador
 * se reconoce en el giro antes que en el código de SKU.
 */

export interface Giro {
  slug: string
  nombre: string
  /** Cómo se nombra a sí mismo el dueño del negocio */
  titulo: string
  necesita: string[]
}

export const GIROS: Giro[] = [
  {
    slug: 'alitas-y-boneless',
    nombre: 'Alitas y boneless',
    titulo: 'Negocios de alitas y boneless',
    necesita: ['pollo', 'salsas-para-alitas', 'sazonadores', 'aderezos', 'papa-a-la-francesa', 'aceite-para-freir'],
  },
  {
    slug: 'hamburgueseria',
    nombre: 'Hamburguesería',
    titulo: 'Hamburgueserías',
    necesita: ['carne-y-hamburguesa', 'panaderia', 'papa-a-la-francesa', 'aros-de-cebolla', 'condimentos-heinz'],
  },
  {
    slug: 'pizzeria',
    nombre: 'Pizzería',
    titulo: 'Pizzerías',
    necesita: ['toppings-para-pizza', 'papa-a-la-francesa', 'appetizers-y-quesos'],
  },
  {
    slug: 'taqueria',
    nombre: 'Taquería',
    titulo: 'Taquerías',
    necesita: ['carne-y-hamburguesa', 'papa-a-la-francesa', 'aceite-para-freir', 'condimentos-heinz'],
  },
  {
    slug: 'comida-corrida',
    nombre: 'Comida corrida',
    titulo: 'Cocinas de comida corrida',
    necesita: ['pollo', 'verduras-y-elote', 'aceite-para-freir', 'condimentos-heinz', 'postres-y-churros'],
  },
  {
    slug: 'fast-food',
    nombre: 'Fast food',
    titulo: 'Fast food y comida rápida',
    necesita: ['papa-a-la-francesa', 'pollo', 'aros-de-cebolla', 'condimentos-heinz', 'aceite-para-freir'],
  },
  {
    slug: 'dark-kitchen',
    nombre: 'Dark kitchen y delivery',
    titulo: 'Dark kitchens y negocios de delivery',
    necesita: ['pollo', 'salsas-para-alitas', 'papa-a-la-francesa', 'panaderia', 'aderezos'],
  },
  {
    slug: 'hotel',
    nombre: 'Hotel',
    titulo: 'Hoteles',
    necesita: ['verduras-y-elote', 'condimentos-heinz', 'postres-y-churros', 'papa-a-la-francesa'],
  },
  {
    slug: 'bar-y-cantina',
    nombre: 'Bar y cantina',
    titulo: 'Bares y cantinas',
    necesita: ['appetizers-y-quesos', 'salsas-para-alitas', 'sazonadores', 'aros-de-cebolla', 'papa-a-la-francesa'],
  },
  {
    slug: 'cafeteria',
    nombre: 'Cafetería',
    titulo: 'Cafeterías y cafeterías industriales',
    necesita: ['postres-y-churros', 'panaderia', 'aderezos', 'condimentos-heinz'],
  },
  {
    slug: 'food-truck',
    nombre: 'Food truck',
    titulo: 'Food trucks',
    necesita: ['papa-a-la-francesa', 'panaderia', 'carne-y-hamburguesa', 'verduras-y-elote'],
  },
  // Edgar pidio separarlos el 31-ago-2026: una escuela y un comedor de planta
  // compran distinto, y juntos en "cocina institucional" no se reconocia
  // ninguno de los dos.
  {
    slug: 'escuela-y-universidad',
    nombre: 'Escuelas y universidades',
    titulo: 'Escuelas y universidades',
    necesita: ['papa-a-la-francesa', 'pollo', 'panaderia', 'postres-y-churros', 'verduras-y-elote'],
  },
  {
    slug: 'comedor-industrial',
    nombre: 'Comedor industrial',
    titulo: 'Comedores industriales y hospitales',
    necesita: ['pollo', 'verduras-y-elote', 'papa-a-la-francesa', 'aceite-para-freir'],
  },
]

export const giro = (slug: string) => GIROS.find((g) => g.slug === slug)

/**
 * El portafolio de marcas, y con cuáles la relación es DIRECTA.
 *
 * Edgar repasó la lista el 31-ago-2026 y la corrigió marca por marca: casi
 * todo el portafolio es directo — Lamb Weston, el pollo, las hamburguesas,
 * Comarco, Sargento, Martin's, Heinz, Mr. Wings y Ricos — y la excepción es
 * Ventura Foods, que llega por intermediario. Decirlo es una ventaja real
 * frente al competidor, y decirlo mal es prometer lo que no se sostiene: por
 * eso `directo` se marca marca por marca y no por categoría.
 */
export interface MarcaPortafolio {
  nombre: string
  directo: boolean
}

export const MARCAS: { categoria: string; marcas: MarcaPortafolio[] }[] = [
  { categoria: 'Papas', marcas: [{ nombre: 'Lamb Weston', directo: true }] },
  {
    categoria: 'Pollo',
    marcas: [
      { nombre: 'Agrosuper', directo: true },
      { nombre: 'Freskecito', directo: true },
      { nombre: 'Bachoco', directo: true },
      { nombre: "Pilgrim's", directo: true },
    ],
  },
  {
    categoria: 'Carnes y hamburguesa',
    marcas: [
      { nombre: 'UGASA', directo: true },
      { nombre: 'Smithfield', directo: true },
    ],
  },
  {
    categoria: 'Appetizers y quesos',
    marcas: [
      { nombre: 'Comarco', directo: true },
      { nombre: 'Sargento', directo: true },
    ],
  },
  { categoria: 'Verduras congeladas', marcas: [{ nombre: 'Twin City Foods', directo: true }] },
  {
    categoria: 'Panadería',
    marcas: [{ nombre: "Martin's Famous Potato Rolls", directo: true }],
  },
  {
    categoria: 'Salsas para alitas',
    marcas: [
      { nombre: 'Mr. Wings', directo: true },
      { nombre: 'Hello Buffalo', directo: false },
      { nombre: 'Cajun Chef', directo: false },
      { nombre: 'La Pócima', directo: false },
    ],
  },
  {
    categoria: 'Aderezos y salsas',
    marcas: [
      { nombre: 'Ricos', directo: true },
      // La unica del portafolio que NO es directa. Lo marco Edgar.
      { nombre: 'VenturaFoods', directo: false },
      { nombre: 'abal', directo: false },
    ],
  },
  { categoria: 'Condimentos', marcas: [{ nombre: 'Heinz', directo: true }] },
  {
    categoria: 'Aceites para freír',
    marcas: [
      { nombre: 'King Fry', directo: false },
      { nombre: 'Golden Chef', directo: false },
    ],
  },
  { categoria: 'Toppings para pizza', marcas: [{ nombre: 'Paradiso', directo: false }] },
]

/** Cuántas marcas del portafolio son relación directa. */
export const MARCAS_DIRECTAS = MARCAS.flatMap((c) => c.marcas).filter((m) => m.directo)
