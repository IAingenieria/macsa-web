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
    titulo: 'Cafeterías',
    necesita: ['postres-y-churros', 'panaderia', 'aderezos', 'condimentos-heinz'],
  },
  {
    slug: 'food-truck',
    nombre: 'Food truck',
    titulo: 'Food trucks',
    necesita: ['papa-a-la-francesa', 'panaderia', 'carne-y-hamburguesa', 'verduras-y-elote'],
  },
  {
    slug: 'cocina-institucional',
    nombre: 'Cocina institucional',
    titulo: 'Comedores industriales, hospitales y escuelas',
    necesita: ['pollo', 'verduras-y-elote', 'papa-a-la-francesa', 'aceite-para-freir'],
  },
]

export const giro = (slug: string) => GIROS.find((g) => g.slug === slug)

/** Las 20 marcas del portafolio, agrupadas como las presenta el catálogo. */
export const MARCAS: { categoria: string; marcas: string[] }[] = [
  { categoria: 'Papas', marcas: ['Lamb Weston'] },
  { categoria: 'Pollo', marcas: ['Agrosuper', 'Freskecito', 'Bachoco', "Pilgrim's"] },
  { categoria: 'Carnes y hamburguesa', marcas: ['UGASA', 'Smithfield'] },
  { categoria: 'Appetizers y quesos', marcas: ['Comarco', 'Sargento'] },
  { categoria: 'Verduras congeladas', marcas: ['Twin City Foods'] },
  { categoria: 'Panadería', marcas: ["Martin's Famous Potato Rolls"] },
  { categoria: 'Salsas para alitas', marcas: ['Mr. Wings', 'Hello Buffalo', 'Cajun Chef', 'La Pócima'] },
  { categoria: 'Aderezos y salsas', marcas: ['VenturaFoods', 'Ricos', 'abal'] },
  { categoria: 'Condimentos', marcas: ['Heinz'] },
  { categoria: 'Aceites para freír', marcas: ['King Fry', 'Golden Chef'] },
  { categoria: 'Toppings para pizza', marcas: ['Paradiso'] },
]
