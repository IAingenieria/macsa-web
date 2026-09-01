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

/**
 * Cómo se mide lo que rinde una caja.
 *
 * Antes se calculaba SIEMPRE por gramaje, y eso producía disparates: una caja
 * de cáscara de papa anunciaba "45 órdenes de 150 g" cuando lo que trae son
 * 200 cazolitas, y un puré seco rendía el triple de lo que decía porque se
 * hidrata. Edgar lo marcó el 31-ago-2026: hay producto que se mide por
 * porción y producto que se mide por pieza, y confundirlos es un dato falso
 * en la ficha. Cuando no sabemos las piezas, no se enseña nada.
 */
export type Rendimiento =
  | { tipo: 'porcion'; g150: number; g200: number }
  | { tipo: 'piezas'; piezas: number }

export interface ProductoCatalogo {
  sku: string
  nombre: string
  presentacion: string | null
  imagen: string
  familia: string
  pesoLb: number | null
  kg: number | null
  /** Qué rinde una caja, o null cuando no se puede afirmar. */
  rendimiento: Rendimiento | null
  /** Fabricante. Lo pidió Edgar: el cliente pregunta por la marca, no por el SKU. */
  marca: string | null
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

/**
 * Códigos que NO salen al sitio aunque estén activos en la base.
 *
 * Son duplicados: el mismo producto dado de alta dos veces con clave distinta.
 * Enseñar los dos hace que el cliente pida uno y el vendedor cotice el otro.
 * Marcados por Edgar el 31-ago-2026; se ocultan aquí y no en la base, que es
 * de Microsip y sigue necesitando la clave vieja para el historial de ventas.
 */
const OCULTOS = new Set([
  'C27', // gajo sazonado 8 cortes — se queda C2700
  'D17', // el mismo gajo de 8 cortes con otra clave
  'X9182', // crisscut sazonada — se queda D23
])

/**
 * Producto que se mide POR PIEZA, no por gramaje de porción.
 * El número sale del catálogo del fabricante; mientras no lo tengamos, la
 * ficha no dice cuánto rinde — que es mejor que decir un número inventado.
 */
const PIEZAS_POR_CAJA: Record<string, number> = {
  '2200D': 200, // cáscara de papa: 200 cazolitas por caja (confirmado por Edgar)
  '22G': 200,
}

/** Va por pieza, pero todavía no sabemos cuántas trae la caja. */
const POR_PIEZA = new Set([
  'A26', // tater rounds
  '12143', // hash brown ovals
  'H30', // hash brown cilindro
  'P38', 'P39', 'P40', 'F6037', // munchers rellenos
  'RN48', // dip de nacho, 48 piezas de 99 g
  'MPP', 'PHS', 'PGD', 'PHM', 'PHM5', 'PM12', // pan Martin's
])

/**
 * Producto al que NO se le calcula rendimiento por gramaje: el puré es polvo
 * que se hidrata, así que los gramos de la caja no son gramos de plato.
 */
const SIN_RENDIMIENTO = new Set(['M0011', 'M14', 'M16', 'M18', 'M22', 'N88'])

/**
 * El fabricante de cada producto.
 *
 * La base no tiene columna de marca — `categoria` mezcla marca con línea
 * ("Martins", "Heinz", pero también "Papa" y "Aderezo"). Edgar pidió el
 * 31-ago-2026 que la marca salga en la ficha: el cliente pregunta por los
 * dedos de queso de Sargento o por el muncher de Lamb Weston, nunca por P38.
 * Primero manda el SKU, luego la categoría; si ninguno resuelve, no se
 * inventa: la ficha se queda sin marca.
 */
const MARCA_POR_SKU: Record<string, string> = {
  // Salsas de mesa que no son de la marca de su categoría
  'HZ-TAB': 'Tabasco',
  STAB: 'Tabasco',
  'RD-CC': 'Cajun Chef',
  CAJUNL: 'Cajun Chef',
  RN48: 'Ricos',
  // Pollo: la marca va en la descripción, no en la categoría
  'POL-APC': 'Bachoco',
  'POL-TP': 'Bachoco',
  'POL-HP': "Pilgrim's",
  'POL-NP': "Pilgrim's",
  'POL-PP': "Pilgrim's",
  PSCH13: 'Agrosuper',
}

const MARCA_POR_CATEGORIA: Record<string, string> = {
  Papa: 'Lamb Weston',
  Aro: 'Lamb Weston',
  Aderezo: 'Ventura Foods',
  Heinz: 'Heinz',
  Martins: "Martin's",
  'RD Mex Foods': "Martin's",
  Sargento: 'Sargento',
  Queso: 'Sargento',
  'Queso/Snack': 'Sargento',
  Vegetal: 'Twin City Foods',
  'Vegetales TCF': 'Twin City Foods',
  Ugasa: 'UGASA',
  Smithfield: 'Smithfield',
  Paradiso: 'Paradiso',
  'Mr Wings': 'Mr. Wings',
  'Hello Buffalo': 'Hello Buffalo',
  'La Pocima': 'La Pócima',
}

function marcaDe(fila: Fila): string | null {
  return MARCA_POR_SKU[fila.s] ?? MARCA_POR_CATEGORIA[fila.c] ?? null
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

function rendimientoDe(sku: string, pesoLb: number | null): Rendimiento | null {
  const piezas = PIEZAS_POR_CAJA[sku]
  if (piezas) return { tipo: 'piezas', piezas }
  if (POR_PIEZA.has(sku) || SIN_RENDIMIENTO.has(sku)) return null
  if (!pesoLb) return null
  const gramos = pesoLb * LB_A_KG * 1000
  return {
    tipo: 'porcion',
    g150: Math.round(gramos / 150),
    g200: Math.round(gramos / 200),
  }
}

export const CATALOGO: ProductoCatalogo[] = (datos.productos as Fila[])
  .filter((f) => !OCULTOS.has(f.s))
  .map((f) => {
  const kg = f.w ? Math.round(f.w * LB_A_KG * 10) / 10 : null
  return {
    sku: f.s,
    nombre: tituloBonito(f.d, f.s),
    presentacion: f.p && f.p !== 'Por definir' ? f.p : null,
    imagen: f.i,
    familia: familiaDe(f),
    pesoLb: f.w,
    kg,
    rendimiento: rendimientoDe(f.s, f.w),
    marca: marcaDe(f),
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

/** Los que se miden por porción — los únicos que entran a la tabla de costeo. */
export const porPorcion = (ps: ProductoCatalogo[]) =>
  ps.filter(
    (p): p is ProductoCatalogo & { rendimiento: { tipo: 'porcion'; g150: number; g200: number } } =>
      p.rendimiento?.tipo === 'porcion',
  )

/** Los productos de una lista concreta de codigos (para los productos ancla). */
export const porSkus = (skus: string[]) => {
  const orden = new Map(skus.map((s, i) => [s, i]))
  return CATALOGO.filter((p) => orden.has(p.sku)).sort(
    (a, b) => (orden.get(a.sku) ?? 0) - (orden.get(b.sku) ?? 0),
  )
}
