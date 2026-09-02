/**
 * Que fotografia lleva cada pagina en el hero.
 *
 * Las imagenes salen de las que se generaron con KIE.ai para la serie de
 * video (`tvmultimedia/public/tips`), recortadas a 3:4 y convertidas a WebP.
 * Ya son de MACSA: no hay banco de imagenes ni licencia que perseguir.
 *
 * `lambWeston: true` pone el sello de distribuidor oficial con el logotipo
 * en grande. Va solo donde la papa es el tema — no en las paginas de pollo
 * ni de salsas, donde seria enganoso.
 */

export interface Hero {
  imagen: string
  lambWeston?: boolean
}

/** Por familia de producto. */
const POR_FAMILIA: Record<string, Hero> = {
  'papa-a-la-francesa': { imagen: 'cortes', lambWeston: true },
  'aros-de-cebolla': { imagen: 'crinkle', lambWeston: true },
  pollo: { imagen: 'papas-parejas' },
  'salsas-para-alitas': { imagen: 'plato' },
  aderezos: { imagen: 'plato' },
  sazonadores: { imagen: 'plato' },
  'condimentos-heinz': { imagen: 'plato' },
  'aceite-para-freir': { imagen: 'termometro' },
  'carne-y-hamburguesa': { imagen: 'freidora' },
  'appetizers-y-quesos': { imagen: 'plato' },
  'verduras-y-elote': { imagen: 'congelador' },
  panaderia: { imagen: 'lw-producto' },
  'toppings-para-pizza': { imagen: 'plato' },
  'postres-y-churros': { imagen: 'freidora' },
}

/** Por producto ancla — mas especifico que la familia. */
const POR_ANCLA: Record<string, Hero> = {
  'papa-gajo': { imagen: 'gajo', lambWeston: true },
  'papa-crisscut': { imagen: 'waffle', lambWeston: true },
  'papa-3-8': { imagen: 'recto', lambWeston: true },
  'papa-5-16': { imagen: 'crinkle', lambWeston: true },
  'papa-1-4': { imagen: 'cortes', lambWeston: true },
  'papa-con-cobertura': { imagen: 'papas-parejas', lambWeston: true },
  'pure-de-papa': { imagen: 'lw-producto', lambWeston: true },
  'hash-brown': { imagen: 'congelador', lambWeston: true },
  'aro-de-cebolla': { imagen: 'crinkle', lambWeston: true },
  'aceite-para-freidora': { imagen: 'termometro' },
  'media-pechuga-de-pollo': { imagen: 'papas-parejas' },
  'boneless-de-pollo': { imagen: 'freidora' },
  'queso-cheddar': { imagen: 'plato' },
  'dedos-de-queso': { imagen: 'plato' },
  'muncher-de-jalapeno': { imagen: 'plato' },
  'elote-congelado': { imagen: 'congelador' },
  'pan-para-hamburguesa': { imagen: 'lw-producto' },
  mayonesa: { imagen: 'plato' },
  'catsup-heinz': { imagen: 'plato' },
  'salsa-para-alitas': { imagen: 'plato' },
}

/** Paginas sueltas. */
export const HEROES: Record<string, Hero> = {
  home: { imagen: 'cortes', lambWeston: true },
  catalogo: { imagen: 'plato', lambWeston: true },
  tienda: { imagen: 'cortes' },
  marcas: { imagen: 'lw-producto', lambWeston: true },
  cobertura: { imagen: 'estiba' },
  'cadena-de-frio': { imagen: 'congelador' },
  nosotros: { imagen: 'campo', lambWeston: true },
  contacto: { imagen: 'freidora' },
  'alta-de-cliente': { imagen: 'papa-fria' },
  'preguntas-frecuentes': { imagen: 'prueba-pan' },
  consejos: { imagen: 'termometro' },
}

export const heroFamilia = (slug: string): Hero =>
  POR_FAMILIA[slug] ?? { imagen: 'cortes' }

export const heroAncla = (slug: string): Hero =>
  POR_ANCLA[slug] ?? { imagen: 'cortes' }
