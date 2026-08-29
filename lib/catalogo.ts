import datos from '@/data/catalogo.json'

/**
 * El catálogo REAL, leído del snapshot en tiempo de build.
 *
 * Tres cosas que hay que hacer con estos datos antes de enseñárselos a nadie:
 *
 * 1. LIMPIAR EL NOMBRE. Microsip guarda las descripciones en MAYÚSCULAS y con
 *    el SKU repetido al frente ("12021 PAPA ONDULADA 1/2 EXTRA LARGA"). Se
 *    limpia igual que en el portal (`tituloBonito`), respetando las siglas.
 *
 * 2. RECLASIFICAR. La columna `categoria` de la base no coincide con cómo
 *    busca la gente: los aros de cebolla y los munchers de jalapeño están
 *    dentro de "Papa", y el pan Martin's dentro de "RD Mex Foods". Se corrige
 *    con un mapa de excepciones por SKU — nunca tocando la base.
 *
 * 3. CALCULAR EL RENDIMIENTO. Con `peso_lb` se saca cuántas órdenes salen de
 *    una caja. Es el dato que ningún competidor publica y el que de verdad
 *    usa un restaurantero para decidir.
 */

interface Fila {
  s: string
  d: string
  c: string
  p: string | null
  w: number | null
  i: string
}

export interface ProductoCatalogo {
  sku: string
  nombre: string
  presentacion: string | null
  imagen: string
  familia: string
  pesoLb: number | null
  kg: number | null
  /** Órdenes por caja según el gramaje de la porción */
  rendimiento: { g150: number; g200: number } | null
}

const LB_A_KG = 0.45359237

/** Siglas que NO deben pasar a Title Case. */
const SIGLAS = new Set([
  'LW', 'IQF', 'BBQ', 'COD', 'RD', 'TCF', 'AMM', 'HZ', 'PXLF', 'XL', 'SS',
])

/** Palabras que se quedan en minúscula dentro del nombre. */
const MINUSCULAS = new Set(['de', 'con', 'sin', 'y', 'a', 'la', 'el', 'en', 'del', 'para', 'por'])

/**
 * Quita el SKU repetido al frente y convierte las MAYÚSCULAS de Microsip a
 * Title Case. No toca la base: es sólo presentación.
 */
export function tituloBonito(descripcion: string, sku: string): string {
  let t = descripcion.trim()

  // "12021 PAPA ONDULADA…" → "PAPA ONDULADA…"
  if (t.toUpperCase().startsWith(sku.toUpperCase())) {
    t = t.slice(sku.length).trim()
  }
  // Algunos vienen con el SKU dos veces ("32R 32R PAPA GAJO…")
  if (t.toUpperCase().startsWith(sku.toUpperCase())) {
    t = t.slice(sku.length).trim()
  }

  t = t.replace(/\s+/g, ' ')

  // Sólo se convierte si viene en mayúsculas; si ya está escrito bien, se respeta.
  const esMayusculas = t === t.toUpperCase() && /[A-ZÁÉÍÓÚÑ]{3}/.test(t)
  if (!esMayusculas) return t.charAt(0).toUpperCase() + t.slice(1)

  return t
    .toLowerCase()
    .split(' ')
    .map((palabra, i) => {
      const limpia = palabra.replace(/[^a-záéíóúñ0-9/]/gi, '')
      if (SIGLAS.has(limpia.toUpperCase())) return palabra.toUpperCase()
      if (i > 0 && MINUSCULAS.has(limpia)) return palabra
      // Fracciones y medidas se quedan como están (3/8, 5/16, 1/2)
      if (/^\d/.test(palabra)) return palabra
      return palabra.charAt(0).toUpperCase() + palabra.slice(1)
    })
    .join(' ')
}

/**
 * Excepciones por SKU: productos que la base tiene en una categoría que no
 * corresponde a cómo los busca el cliente. Verificado uno por uno.
 */
const EXCEPCIONES: Record<string, string> = {
  // Están en "Papa" pero son aros de cebolla
  '30410': 'aros-de-cebolla',
  '30423': 'aros-de-cebolla',
  '34000': 'aros-de-cebolla',
  // Están en "Papa" pero son botana rellena de queso
  P38: 'appetizers-y-quesos',
  P39: 'appetizers-y-quesos',
  P40: 'appetizers-y-quesos',
  F6037: 'appetizers-y-quesos',
  // Está en "Aderezo"/"RD Mex Foods" pero es salsa para alitas
  'RD-CC': 'salsas-para-alitas',
  CAJUNL: 'salsas-para-alitas',
  // Están en "Aderezo"/"Heinz" pero son salsa de mesa Heinz
  'HZ-TAB': 'condimentos-heinz',
  STAB: 'condimentos-heinz',
  // Están en "RD Mex Foods" pero son pan Martin's
  PGD: 'panaderia',
  PHM: 'panaderia',
  PHM5: 'panaderia',
  PM12: 'panaderia',
  // Está en "Queso" pero es dip de nacho
  RN48: 'appetizers-y-quesos',
}

/** Mapa de la categoría de la base a la familia del sitio. */
const POR_CATEGORIA: Record<string, string> = {
  Papa: 'papa-a-la-francesa',
  Pollo: 'pollo',
  Aderezo: 'aderezos',
  Heinz: 'condimentos-heinz',
  'Mr Wings': 'salsas-para-alitas',
  'Hello Buffalo': 'salsas-para-alitas',
  'La Pocima': 'salsas-para-alitas',
  Salsa: 'salsas-para-alitas',
  Aceite: 'aceite-para-freir',
  Ugasa: 'carne-y-hamburguesa',
  Smithfield: 'carne-y-hamburguesa',
  Hamburguesa: 'carne-y-hamburguesa',
  Queso: 'appetizers-y-quesos',
  'Queso/Snack': 'appetizers-y-quesos',
  Sargento: 'appetizers-y-quesos',
  Vegetal: 'verduras-y-elote',
  'Vegetales TCF': 'verduras-y-elote',
  Martins: 'panaderia',
  'RD Mex Foods': 'postres-y-churros',
  Postres: 'postres-y-churros',
  Postre: 'postres-y-churros',
  Bundt: 'postres-y-churros',
  Paradiso: 'toppings-para-pizza',
  Aro: 'aros-de-cebolla',
}

function familiaDe(fila: Fila): string {
  return EXCEPCIONES[fila.s] ?? POR_CATEGORIA[fila.c] ?? 'otros'
}

function rendimientoDe(pesoLb: number | null) {
  if (!pesoLb) return null
  const gramos = pesoLb * LB_A_KG * 1000
  return {
    g150: Math.round(gramos / 150),
    g200: Math.round(gramos / 200),
  }
}

export const CATALOGO: ProductoCatalogo[] = (datos.productos as Fila[]).map((f) => {
  const kg = f.w ? Math.round(f.w * LB_A_KG * 10) / 10 : null
  return {
    sku: f.s,
    nombre: tituloBonito(f.d, f.s),
    presentacion: f.p && f.p !== 'Por definir' ? f.p : null,
    imagen: f.i,
    familia: familiaDe(f),
    pesoLb: f.w,
    kg,
    rendimiento: rendimientoDe(f.w),
  }
})

export const porFamilia = (slug: string) => CATALOGO.filter((p) => p.familia === slug)

/** Productos con foto Y con rendimiento calculable — los mejores para destacar. */
export const destacadosDe = (slug: string, n = 6) =>
  porFamilia(slug)
    .slice()
    .sort((a, b) => Number(Boolean(b.rendimiento)) - Number(Boolean(a.rendimiento)))
    .slice(0, n)

export const CONTEO = {
  total: CATALOGO.length,
  conRendimiento: CATALOGO.filter((p) => p.rendimiento).length,
}
