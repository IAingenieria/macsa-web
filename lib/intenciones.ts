/**
 * PÁGINAS DE BÚSQUEDA — S182 (13-oct-2026).
 *
 * Las 776 páginas se nombraron con el vocabulario del catálogo ("papa 5/16",
 * "media pechuga sin piel") y el comprador no busca así. Estas páginas usan
 * las frases que sugiere el autocompletado de Google México (consultado el
 * 13-oct-2026, hl=es&gl=mx):
 *   «distribuidor de papas congeladas», «distribuidor de papas fritas»,
 *   «papas a la francesa congeladas mayoreo», «alitas por mayoreo»,
 *   «alitas bachoco por mayoreo», «boneless por mayoreo», «boneless por kilo
 *   mayoreo», «distribuidora de alimentos congelados en monterrey»,
 *   «comercializadora de pollo».
 *
 * Regla: el título lleva la frase del comprador; el nombre técnico va adentro.
 * Nada se inventa: códigos y presentaciones salen de data/catalogo.json, las
 * marcas de lib/site.ts y lib/catalogo.ts, la entrega de lib/ciudades.ts y el
 * mínimo de $1,500 de lo que ya publica el sitio. Sin precios (los autoriza
 * Dirección) y sin atributos físicos que el producto no garantice.
 */

export interface Intencion {
  slug: string
  /** <title> (la plantilla del layout agrega «| MACSA Foodservice») */
  titulo: string
  h1: string
  descripcion: string
  eyebrow: string
  /** Answer-First: 40–60 palabras, la frase buscada en la primera oración */
  answerFirst: string
  /** Qué surtimos, sin hablar de entrega (para las variantes por ciudad) */
  resumen: string
  /** Logo de la marca cuando la relación es directa y Dirección autorizó usarlo (Heinz, 13-oct) */
  logo?: string
  /** Códigos reales del catálogo del sitio */
  skus: string[]
  tituloProductos: string
  /** Páginas de producto o familia relacionadas (enlazado interno) */
  enlaces: { url: string; texto: string }[]
  puntos: { titulo: string; texto: string }[]
  preguntas: { p: string; r: string }[]
  whatsapp: string
}

const ENTREGA =
  'En el área metropolitana de Monterrey hay ruta diaria: el pedido que entra antes de las 20:00 se entrega al día siguiente, y nunca se programa domingo.'
const MINIMO =
  'La entrega a domicilio es a partir de $1,500 por pedido. En el punto de venta de Guadalupe no hay mínimo.'
const PARTICULARES =
  'Sí. Le vendemos a negocios y a particulares: sólo hay que darse de alta como cliente con un formato sencillo, y el alta queda el mismo día.'

export const INTENCIONES: Intencion[] = [
  {
    slug: 'distribuidor-de-papas-congeladas-monterrey',
    resumen: 'papa a la francesa, gajo, crisscut y con cobertura, por caja; somos distribuidor oficial de Lamb Weston',
    titulo: 'Distribuidor de papas congeladas en Monterrey',
    h1: 'Distribuidor de papas congeladas en Monterrey',
    descripcion:
      'Distribuidor de papas congeladas y papas fritas para restaurantes en Monterrey. Distribuidor oficial de Lamb Weston: cortes 1/4, 5/16, 3/8, gajo y crisscut por caja, con entrega al día siguiente.',
    eyebrow: 'Distribuidor oficial de Lamb Weston',
    answerFirst:
      'MACSA es distribuidor de papas congeladas en Monterrey y su área metropolitana, y distribuidor oficial de Lamb Weston. Surtimos papa a la francesa, papa gajo, crisscut, con cobertura y para desayuno, por caja y con cadena de frío, a restaurantes, alitas, hamburgueserías y cocinas industriales, con entrega al día siguiente.',
    skus: ['B36', 'S12', 'D23', 'C2700', 'C0034', 'C0057', '12045', 'S34'],
    tituloProductos: 'Papas congeladas que surtimos por caja',
    enlaces: [
      { url: '/papa-a-la-francesa/', texto: 'Papa a la francesa congelada' },
      { url: '/papa-3-8/', texto: 'Papa a la francesa 3/8' },
      { url: '/papa-5-16/', texto: 'Papa a la francesa delgada 5/16' },
      { url: '/papa-crisscut/', texto: 'Papa crisscut sazonada' },
      { url: '/papa-gajo/', texto: 'Papa gajo sazonada' },
      { url: '/papa-con-cobertura/', texto: 'Papa con cobertura' },
      { url: '/papas-a-la-francesa-por-mayoreo/', texto: 'Papas a la francesa por mayoreo' },
    ],
    puntos: [
      { titulo: 'Distribuidor oficial de Lamb Weston', texto: 'La papa llega del fabricante a nuestra bodega y de ahí a tu cocina, sin intermediarios.' },
      { titulo: 'Todos los cortes', texto: 'Delgada, mediana, gruesa, gajo, crisscut, con cobertura y para desayuno: el mismo código cada vez que lo vuelves a pedir.' },
      { titulo: 'Cadena de frío sin cortes', texto: 'Del congelador de la bodega al tuyo. La papa es IQF y va directo a la freidora, sin descongelar.' },
      { titulo: 'Entrega al día siguiente', texto: ENTREGA },
    ],
    preguntas: [
      { p: '¿Son distribuidores de papas fritas para restaurante?', r: 'Sí. Surtimos papa congelada lista para freír a restaurantes, alitas, hamburgueserías, comedores industriales y dark kitchens. Somos distribuidor oficial de Lamb Weston.' },
      { p: '¿Entregan en mi colonia?', r: ENTREGA + ' Para otras ciudades de Nuevo León y Coahuila te confirmamos el día al levantar el pedido.' },
      { p: '¿Hay pedido mínimo?', r: MINIMO },
      { p: '¿Le venden a particulares?', r: PARTICULARES },
    ],
    whatsapp: 'Hola, busco distribuidor de papas congeladas. ¿Me pasan precio por caja?',
  },
  {
    slug: 'papas-a-la-francesa-por-mayoreo',
    resumen: 'Lamb Weston en corte delgado, mediano y grueso, con cobertura y sazonadas, por caja cerrada',
    titulo: 'Papas a la francesa congeladas por mayoreo',
    h1: 'Papas a la francesa congeladas por mayoreo',
    descripcion:
      'Venta de papas a la francesa congeladas por mayoreo, por caja, para restaurantes en Monterrey. Lamb Weston en cortes delgado, mediano y grueso, con entrega a domicilio desde $1,500.',
    eyebrow: 'Venta por caja · Lamb Weston',
    answerFirst:
      'En MACSA vendes papas a la francesa congeladas por mayoreo: por caja, para restaurantes y negocios de comida en Monterrey. Manejamos Lamb Weston en corte delgado, mediano y grueso, con cobertura y sazonadas, siempre el mismo código y con entrega al día siguiente en el área metropolitana.',
    skus: ['12045', 'S12', 'B36', 'C0057', 'C0034', 'S34', 'B91'],
    tituloProductos: 'Papas a la francesa por caja',
    enlaces: [
      { url: '/papa-1-4/', texto: 'Papa a la francesa 1/4' },
      { url: '/papa-5-16/', texto: 'Papa a la francesa delgada 5/16' },
      { url: '/papa-3-8/', texto: 'Papa a la francesa 3/8' },
      { url: '/papa-con-cobertura/', texto: 'Papa con cobertura' },
      { url: '/distribuidor-de-papas-congeladas-monterrey/', texto: 'Distribuidor de papas congeladas' },
    ],
    puntos: [
      { titulo: 'Por caja, no por kilo suelto', texto: 'La papa se vende en su caja cerrada del fabricante, la presentación que trae cada ficha del catálogo.' },
      { titulo: 'Cuántas órdenes salen', texto: 'En las fichas con peso de caja conocido calculamos las órdenes que rinde, para que saques tu costo por orden.' },
      { titulo: 'Muestra antes del primer pedido', texto: 'Lo habitual es una muestra sin compromiso para que la pruebes en tu freidora.' },
      { titulo: 'Entrega a domicilio', texto: MINIMO },
    ],
    preguntas: [
      { p: '¿Venden papas a la francesa por mayoreo a negocios chicos?', r: 'Sí. No hace falta ser cadena: con el mínimo de entrega a domicilio o pasando al punto de venta, te llevas tus cajas.' },
      { p: '¿Qué corte me conviene?', r: 'Si la papa sale de inmediato a la mesa, el corte delgado o el 3/8 funcionan bien. Si se va a domicilio, conviene uno con cobertura, que aguanta más tiempo. Tu asesor te ayuda a elegir con tu menú.' },
      { p: '¿Cuánto tarda en llegar?', r: ENTREGA },
      { p: '¿Le venden a particulares?', r: PARTICULARES },
    ],
    whatsapp: 'Hola, quiero papas a la francesa por mayoreo. ¿Me pasan precio por caja?',
  },
  {
    slug: 'alitas-por-mayoreo',
    resumen: 'ala chilena Agrosuper en caja de 13 kg y alita picosita Bachoco por kilo, más salsas para alitas por galón',
    titulo: 'Alitas de pollo por mayoreo en Monterrey',
    h1: 'Alitas de pollo por mayoreo en Monterrey',
    descripcion:
      'Venta de alitas de pollo por mayoreo en Monterrey: ala chilena Agrosuper en caja de 13 kg y alita picosita Bachoco por kilo, más salsas para alitas por galón. Entrega al día siguiente.',
    eyebrow: 'Agrosuper · Bachoco · salsas por galón',
    answerFirst:
      'En MACSA compras alitas de pollo por mayoreo en Monterrey: ala chilena Agrosuper en caja de 13 kg y alita picosita Bachoco por kilo, con cadena de frío y entrega al día siguiente en el área metropolitana. Para el negocio de alitas completo, también surtimos salsas por galón, papas y aderezos.',
    skus: ['ACH13', '4707', 'SAPHOT'],
    tituloProductos: 'Alitas y salsa por mayoreo',
    enlaces: [
      { url: '/pollo/', texto: 'Pollo congelado para restaurante' },
      { url: '/salsa-para-alitas/', texto: 'Salsa para alitas por galón' },
      { url: '/salsas-para-alitas/', texto: 'Salsas para alitas' },
      { url: '/boneless-por-mayoreo/', texto: 'Boneless por mayoreo' },
      { url: '/papa-crisscut/', texto: 'Papa crisscut para acompañar' },
    ],
    puntos: [
      { titulo: 'Marcas de línea', texto: 'Agrosuper y Bachoco: el mismo producto cada vez que lo vuelves a pedir.' },
      { titulo: 'Por caja o por kilo', texto: 'El ala chilena va en caja de 13 kg; la alita picosita Bachoco se vende por kilo en caja de 12 kg.' },
      { titulo: 'Todo para tu barra', texto: 'Salsas para alitas por galón, papas, aderezos y sazonadores en el mismo pedido.' },
      { titulo: 'Entrega al día siguiente', texto: ENTREGA },
    ],
    preguntas: [
      { p: '¿Venden alitas Bachoco por mayoreo?', r: 'Sí. Manejamos la alita picosita Bachoco por kilo, en caja de 12 kg, y el ala chilena Agrosuper en caja de 13 kg. Te confirmamos la existencia del día al levantar el pedido.' },
      { p: '¿Hay pedido mínimo?', r: MINIMO },
      { p: '¿Entregan en mi zona?', r: ENTREGA },
      { p: '¿Le venden a particulares?', r: PARTICULARES },
    ],
    whatsapp: 'Hola, quiero alitas por mayoreo. ¿Me pasan precio y existencia?',
  },
  {
    slug: 'boneless-por-mayoreo',
    resumen: 'boneless natural Bachoco, Freskecito natural y enchilado y boneless crujiente, por kilo en caja cerrada',
    titulo: 'Boneless de pollo por mayoreo en Monterrey',
    h1: 'Boneless de pollo por mayoreo en Monterrey',
    descripcion:
      'Boneless de pollo por mayoreo y por kilo en Monterrey: Bachoco y Freskecito natural y enchilado, en caja. Distribuidor para restaurantes y negocios de alitas, con entrega al día siguiente.',
    eyebrow: 'Bachoco · Freskecito · por kilo',
    answerFirst:
      'En MACSA compras boneless de pollo por mayoreo en Monterrey: boneless natural Bachoco, boneless Freskecito natural y enchilado, y boneless natural crujiente, por kilo en caja cerrada. Surtimos a negocios de alitas, hamburgueserías y restaurantes con cadena de frío y entrega al día siguiente.',
    skus: ['5330', 'BN', 'BE', 'B4927'],
    tituloProductos: 'Boneless por kilo, en caja',
    enlaces: [
      { url: '/boneless-de-pollo/', texto: 'Boneless de pollo natural y enchilado' },
      { url: '/alitas-por-mayoreo/', texto: 'Alitas por mayoreo' },
      { url: '/salsa-para-alitas/', texto: 'Salsa para alitas por galón' },
      { url: '/pollo/', texto: 'Pollo congelado para restaurante' },
    ],
    puntos: [
      { titulo: 'Se vende por kilo', texto: 'El boneless se cobra por kilo y se entrega en su caja: Bachoco de 3.63 kg, Freskecito de 10.19 kg y el crujiente de 12.22 kg.' },
      { titulo: 'Natural o enchilado', texto: 'Freskecito en natural y enchilado, para que elijas según tu menú.' },
      { titulo: 'Directo a la freidora', texto: 'Sin descongelar: descongelarlo es justo lo que lo deja aguado.' },
      { titulo: 'Entrega al día siguiente', texto: ENTREGA },
    ],
    preguntas: [
      { p: '¿Dónde comprar boneless por mayoreo en Monterrey?', r: 'En MACSA: en el punto de venta de Guadalupe o con entrega a domicilio desde $1,500. Manejamos Bachoco y Freskecito.' },
      { p: '¿El boneless se vende por kilo o por caja?', r: 'Por kilo, y se entrega en la caja del fabricante. El peso de cada caja está en la ficha de cada código.' },
      { p: '¿Hay pedido mínimo?', r: MINIMO },
      { p: '¿Le venden a particulares?', r: PARTICULARES },
    ],
    whatsapp: 'Hola, quiero boneless por mayoreo. ¿Me pasan precio por kilo?',
  },
  {
    slug: 'pechuga-de-pollo-congelada-por-mayoreo',
    resumen: 'media pechuga sin piel Agrosuper en caja de 13 kg y pechuga empanizada con picante Pilgrim’s en caja de 12 kg',
    titulo: 'Pechuga de pollo congelada por mayoreo',
    h1: 'Pechuga de pollo congelada por mayoreo',
    descripcion:
      'Pechuga de pollo congelada por mayoreo en Monterrey: media pechuga sin piel Agrosuper en caja de 13 kg y pechuga empanizada Pilgrim’s. Comercializadora para restaurantes y comedores.',
    eyebrow: 'Agrosuper · Pilgrim’s · caja de 13 kg',
    answerFirst:
      'En MACSA compras pechuga de pollo congelada por mayoreo en Monterrey: media pechuga sin piel Agrosuper en caja de 13 kg, el producto que más movemos, y pechuga empanizada con picante Pilgrim’s en caja de 12 kg. Surtimos a restaurantes, comedores industriales y cocinas con cadena de frío y entrega al día siguiente.',
    skus: ['PSCH13', '4011'],
    tituloProductos: 'Pechuga por caja',
    enlaces: [
      { url: '/media-pechuga-de-pollo/', texto: 'Media pechuga de pollo congelada' },
      { url: '/distribuidor-de-pollo-congelado-monterrey/', texto: 'Distribuidor de pollo congelado' },
      { url: '/pollo/', texto: 'Pollo congelado para restaurante' },
    ],
    puntos: [
      { titulo: 'Caja de 13 kg', texto: 'La media pechuga sin piel Agrosuper va en caja de 13 kg; rinde para milanesa, empanizado, plancha y guisado con el mismo código.' },
      { titulo: 'Distribuidor directo de Agrosuper', texto: 'El producto llega del fabricante a nuestra bodega, con existencia continua.' },
      { titulo: 'Para comedores y volumen', texto: 'Surtimos comedores industriales y cocinas de volumen con el mismo producto cada semana.' },
      { titulo: 'Entrega al día siguiente', texto: ENTREGA },
    ],
    preguntas: [
      { p: '¿Venden pechuga de pollo congelada por caja?', r: 'Sí. La media pechuga sin piel Agrosuper se vende en caja de 13 kg y la pechuga empanizada Pilgrim’s en caja de 12 kg.' },
      { p: '¿Hay pedido mínimo?', r: MINIMO },
      { p: '¿Entregan en comedores industriales?', r: 'Sí. ' + ENTREGA + ' Para entregas en planta te confirmamos horario de recepción al levantar el pedido.' },
      { p: '¿Le venden a particulares?', r: PARTICULARES },
    ],
    whatsapp: 'Hola, quiero pechuga de pollo congelada por mayoreo. ¿Me pasan precio por caja?',
  },
  {
    slug: 'distribuidor-de-pollo-congelado-monterrey',
    resumen: 'pechuga, alitas, boneless, tenders, nuggets y hamburguesa de pechuga de Agrosuper, Bachoco, Pilgrim’s y Freskecito, por caja',
    titulo: 'Distribuidor de pollo congelado en Monterrey',
    h1: 'Distribuidor de pollo congelado en Monterrey',
    descripcion:
      'Distribuidor y comercializadora de pollo congelado en Monterrey: pechuga, alitas, boneless, tenders y nuggets de Agrosuper, Bachoco, Pilgrim’s y Freskecito, por caja, para restaurantes.',
    eyebrow: 'Agrosuper · Bachoco · Pilgrim’s · Freskecito',
    answerFirst:
      'MACSA es distribuidor de pollo congelado en Monterrey: media pechuga, alitas, boneless, tenders, nuggets y hamburguesa de pechuga de Agrosuper, Bachoco, Pilgrim’s y Freskecito, por caja y con cadena de frío. Surtimos restaurantes, negocios de alitas, hamburgueserías y comedores con entrega al día siguiente en el área metropolitana.',
    skus: ['PSCH13', 'ACH13', '4707', '5330', 'BN', '6671', '6673', 'POL-HP'],
    tituloProductos: 'Pollo congelado que surtimos',
    enlaces: [
      { url: '/pollo/', texto: 'Pollo congelado para restaurante' },
      { url: '/pechuga-de-pollo-congelada-por-mayoreo/', texto: 'Pechuga por mayoreo' },
      { url: '/alitas-por-mayoreo/', texto: 'Alitas por mayoreo' },
      { url: '/boneless-por-mayoreo/', texto: 'Boneless por mayoreo' },
      { url: '/media-pechuga-de-pollo/', texto: 'Media pechuga de pollo' },
    ],
    puntos: [
      { titulo: 'Cuatro marcas de línea', texto: 'Agrosuper, Bachoco, Pilgrim’s y Freskecito: el mismo código cada vez que lo vuelves a pedir.' },
      { titulo: 'Del natural al empanizado', texto: 'Media pechuga, alas y boneless, y también tenders, nuggets y hamburguesa de pechuga empanizados.' },
      { titulo: 'Cadena de frío', texto: 'Del congelador de la bodega al tuyo, sin cortes.' },
      { titulo: 'Entrega al día siguiente', texto: ENTREGA },
    ],
    preguntas: [
      { p: '¿Son comercializadora de pollo?', r: 'Sí. Comercializamos y distribuimos pollo congelado de Agrosuper, Bachoco, Pilgrim’s y Freskecito para negocios de comida, junto con papa, salsas y abarrotes en el mismo pedido.' },
      { p: '¿Hay pedido mínimo?', r: MINIMO },
      { p: '¿Entregan fuera de Monterrey?', r: 'Sí, en Nuevo León y Coahuila. En el área metropolitana hay ruta diaria; para otras ciudades te confirmamos el día al levantar el pedido.' },
      { p: '¿Le venden a particulares?', r: PARTICULARES },
    ],
    whatsapp: 'Hola, busco distribuidor de pollo congelado. ¿Me pasan su lista?',
  },
  {
    slug: 'distribuidora-de-alimentos-congelados-monterrey',
    resumen: 'papa Lamb Weston, pollo, alitas, boneless, appetizers, verduras y postres, además de abarrotes Heinz y salsas',
    titulo: 'Distribuidora de alimentos congelados en Monterrey',
    h1: 'Distribuidora de alimentos congelados en Monterrey',
    descripcion:
      'Distribuidora de alimentos congelados en Monterrey para restaurantes: papa Lamb Weston, pollo, alitas, boneless, appetizers, verduras y abarrotes Heinz, con cadena de frío y entrega al día siguiente.',
    eyebrow: 'Food service · Nuevo León y Coahuila',
    answerFirst:
      'MACSA es una distribuidora de alimentos congelados en Monterrey para food service: papa Lamb Weston, pollo, alitas, boneless, appetizers, verduras y postres, además de abarrotes Heinz y salsas. Surtimos restaurantes, cocinas industriales y negocios de comida con cadena de frío garantizada y entrega al día siguiente en el área metropolitana.',
    skus: ['B36', 'D23', 'PSCH13', 'ACH13', '5330', '34000', 'EM96', 'RB4011'],
    tituloProductos: 'Lo que más nos piden',
    enlaces: [
      { url: '/catalogo/', texto: 'Catálogo completo' },
      { url: '/distribuidor-de-papas-congeladas-monterrey/', texto: 'Distribuidor de papas congeladas' },
      { url: '/distribuidor-de-pollo-congelado-monterrey/', texto: 'Distribuidor de pollo congelado' },
      { url: '/marcas/', texto: 'Marcas que distribuimos' },
      { url: '/cobertura/', texto: 'Cobertura de entrega' },
    ],
    puntos: [
      { titulo: 'Un solo proveedor', texto: 'Papa, pollo, appetizers, verduras, postres, salsas y abarrotes Heinz en el mismo pedido.' },
      { titulo: 'Marcas que conoces', texto: 'Distribuidor oficial de Lamb Weston y distribuidor directo de Heinz, de Agrosuper y de Martin’s.' },
      { titulo: 'Cadena de frío garantizada', texto: 'Sin cortes del almacén a tu cocina.' },
      { titulo: 'Entrega al día siguiente', texto: ENTREGA },
    ],
    preguntas: [
      { p: '¿Qué zonas cubren?', r: 'Monterrey y su área metropolitana con ruta diaria, y otras ciudades de Nuevo León y Coahuila, como Saltillo y Torreón, con fecha que te confirmamos al levantar el pedido.' },
      { p: '¿Hay pedido mínimo?', r: MINIMO },
      { p: '¿Cómo me doy de alta como cliente?', r: 'Con un formato sencillo en la página de alta de cliente; el alta queda el mismo día.' },
      { p: '¿Le venden a particulares?', r: PARTICULARES },
    ],
    whatsapp: 'Hola, busco distribuidora de alimentos congelados para mi negocio.',
  },
  // ── Heinz (S182, 13-oct): distribuidor directo, sin preventa ni precios ──────────────────────────────
  {
    slug: 'distribuidor-de-heinz-monterrey',
    resumen: 'catsup, mayonesa y mostaza Heinz en sobre, pouch, botella y cubeta, y salsas BBQ y para pizza; compramos directo a Kraft Heinz por carga completa',
    logo: 'https://jlhvtjsdbdgwvfhjahdi.supabase.co/storage/v1/object/public/catalogo/marcas/heinz.png',
    titulo: 'Distribuidor directo de Heinz en Monterrey',
    h1: 'Distribuidor directo de Heinz en Monterrey',
    descripcion:
      'Distribuidor directo de Heinz en Monterrey para restaurantes, hoteles y comedores: catsup, mayonesa y mostaza en sobre, pouch, botella y cubeta. Compramos a Kraft Heinz por carga completa.',
    eyebrow: 'Distribuidor directo · Kraft Heinz',
    answerFirst:
      'MACSA es distribuidor directo de Heinz en Monterrey: compramos a Kraft Heinz por carga completa, sin intermediarios. Surtimos catsup, mayonesa y mostaza en sobre, pouch, botella y cubeta, además de salsas BBQ y para pizza, a restaurantes, hoteles, comedores y cafeterías, con entrega al día siguiente en el área metropolitana.',
    skus: ['C1008', 'C192', 'CP6', 'C16', 'MAY13', 'M4B', 'M200', 'MZ200'],
    tituloProductos: 'Heinz que surtimos por caja',
    enlaces: [
      { url: '/catsup-heinz/', texto: 'Catsup Heinz por mayoreo' },
      { url: '/mayonesa-heinz-por-mayoreo/', texto: 'Mayonesa Heinz por mayoreo' },
      { url: '/aderezos-en-sobre-por-mayoreo/', texto: 'Sobres de catsup, mayonesa y mostaza' },
      { url: '/salsa-para-pizza-por-mayoreo/', texto: 'Salsa para pizza por mayoreo' },
      { url: '/insumos-room-service-hotel/', texto: 'Insumos para room service de hotel' },
      { url: '/condimentos-heinz/', texto: 'Condimentos Heinz para restaurante' },
    ],
    puntos: [
      { titulo: 'Directo de Kraft Heinz', texto: 'Compramos por carga completa al fabricante, sin intermediarios: el producto no depende de la disponibilidad de un tercero.' },
      { titulo: 'Todas las presentaciones', texto: 'Sobre de 8 y 9 g, pouch de 3 kg, botella PET y cubeta de 13 kg: la que conviene a tu barra, tu mesa o tus pedidos para llevar.' },
      { titulo: 'Lo que más se pide', texto: 'La catsup en sobre de 9 g, en caja de 1,008, es la presentación Heinz que más movemos.' },
      { titulo: 'Entrega al día siguiente', texto: ENTREGA },
    ],
    preguntas: [
      { p: '¿Son distribuidores directos de Heinz?', r: 'Sí. MACSA compra directo a Kraft Heinz por carga completa y surte a negocios de comida en Monterrey, Saltillo y Torreón.' },
      { p: '¿Qué presentaciones de catsup Heinz manejan?', r: 'Sobre de 9 g en caja de 1,008, sobre de 8 g en caja de 192, pouch de 3 kg en caja de 6 y botella PET en caja de 16. Te confirmamos la existencia del día al levantar el pedido.' },
      { p: '¿Hay pedido mínimo?', r: MINIMO },
      { p: '¿Le venden a particulares?', r: PARTICULARES },
    ],
    whatsapp: 'Hola, busco distribuidor de Heinz para mi negocio. ¿Me pasan su lista?',
  },
  {
    slug: 'mayonesa-heinz-por-mayoreo',
    resumen: 'mayonesa Heinz en cubeta de 13 kg, pouch de 3 kg, botella PET y sobre de 8 g, por caja',
    logo: 'https://jlhvtjsdbdgwvfhjahdi.supabase.co/storage/v1/object/public/catalogo/marcas/heinz.png',
    titulo: 'Mayonesa Heinz por mayoreo: cubeta, pouch y sobre',
    h1: 'Mayonesa Heinz por mayoreo: cubeta, pouch y sobre',
    descripcion:
      'Mayonesa Heinz por mayoreo en Monterrey: cubeta de 13 kg, pouch de 3 kg en caja de 4, botella PET y sobres de 8 g. Distribuidor directo de Heinz para restaurantes.',
    eyebrow: 'Distribuidor directo de Heinz',
    answerFirst:
      'En MACSA compras mayonesa Heinz por mayoreo en Monterrey: mayonesa con limón en cubeta de 13 kg, pouch de 3 kg en caja de 4, botella PET de 390 g y sobres de 8 g, para cocina, barra y pedidos para llevar. Somos distribuidor directo de Heinz y entregamos al día siguiente en el área metropolitana.',
    skus: ['MAY13', 'M4B', 'M24', 'M200', 'HZROY'],
    tituloProductos: 'Mayonesa Heinz por presentación',
    enlaces: [
      { url: '/distribuidor-de-heinz-monterrey/', texto: 'Distribuidor directo de Heinz' },
      { url: '/mayonesa/', texto: 'Mayonesa por galón y cubeta' },
      { url: '/aderezos-en-sobre-por-mayoreo/', texto: 'Sobres de catsup, mayonesa y mostaza' },
    ],
    puntos: [
      { titulo: 'Cubeta de 13 kg', texto: 'Para cocina de volumen: la mayonesa con limón Heinz en cubeta.' },
      { titulo: 'Pouch de 3 kg', texto: 'En caja de 4 bolsas, para dispensador en barra.' },
      { titulo: 'Sobre de 8 g', texto: 'Porción exacta para pedidos para llevar y a domicilio, en caja de 200.' },
      { titulo: 'Entrega a domicilio', texto: MINIMO },
    ],
    preguntas: [
      { p: '¿Venden mayonesa Heinz por cubeta?', r: 'Sí. La mayonesa con limón Heinz va en cubeta de 13 kg; también hay pouch de 3 kg, botella PET de 390 g y sobres de 8 g.' },
      { p: '¿Entregan en mi zona?', r: ENTREGA },
      { p: '¿Hay pedido mínimo?', r: MINIMO },
      { p: '¿Le venden a particulares?', r: PARTICULARES },
    ],
    whatsapp: 'Hola, quiero mayonesa Heinz por mayoreo. ¿Me pasan precio y existencia?',
  },
  {
    slug: 'aderezos-en-sobre-por-mayoreo',
    resumen: 'catsup, mayonesa, mostaza, salsa jalapeño y Tabasco en sobre, por caja',
    logo: 'https://jlhvtjsdbdgwvfhjahdi.supabase.co/storage/v1/object/public/catalogo/marcas/heinz.png',
    titulo: 'Sobres de catsup, mayonesa y mostaza por mayoreo',
    h1: 'Sobres de catsup, mayonesa y mostaza por mayoreo',
    descripcion:
      'Aderezos en sobre por mayoreo: catsup Heinz de 8 y 9 g, mayonesa, mostaza y salsa jalapeño Heinz, y Tabasco en sobre, por caja. Para pedidos para llevar, cafeterías, comedores y food trucks.',
    eyebrow: 'Heinz · Tabasco · por caja',
    answerFirst:
      'En MACSA compras aderezos en sobre por mayoreo: catsup Heinz de 8 y 9 g, mayonesa y mostaza Heinz, salsa jalapeño Heinz y Tabasco en sobre, en caja cerrada. Son la porción exacta para pedidos para llevar, cafeterías, comedores, hoteles y food trucks, con entrega al día siguiente en el área metropolitana de Monterrey.',
    skus: ['C1008', 'C192', 'M200', 'MZ200', 'JP500', 'HZROY', 'TP200', 'SALS3000'],
    tituloProductos: 'Aderezos en sobre por caja',
    enlaces: [
      { url: '/distribuidor-de-heinz-monterrey/', texto: 'Distribuidor directo de Heinz' },
      { url: '/catsup-heinz/', texto: 'Catsup Heinz por mayoreo' },
      { url: '/mayonesa-heinz-por-mayoreo/', texto: 'Mayonesa Heinz por mayoreo' },
      { url: '/insumos-room-service-hotel/', texto: 'Insumos para room service de hotel' },
    ],
    puntos: [
      { titulo: 'Sobre, pouch o botella', texto: 'El sobre sirve una porción exacta y viaja bien en pedidos para llevar; el pouch de 3 kg rinde en barra con dispensador; la botella va a la mesa.' },
      { titulo: 'Varios sabores en un pedido', texto: 'Catsup, mayonesa, mostaza, jalapeño, Tabasco y sal en sobre, para armar tu surtido en una sola entrega.' },
      { titulo: 'Distribuidor directo de Heinz', texto: 'Compramos a Kraft Heinz por carga completa, sin intermediarios.' },
      { titulo: 'Entrega al día siguiente', texto: ENTREGA },
    ],
    preguntas: [
      { p: '¿Venden catsup en sobre por caja?', r: 'Sí: sobre de 9 g en caja de 1,008 y sobre de 8 g en caja de 192.' },
      { p: '¿Qué otros aderezos hay en sobre?', r: 'Mayonesa Heinz de 8 g en caja de 200, mostaza Heinz de 5 g en caja de 200, salsa jalapeño Heinz de 8 g en caja de 500, Tabasco de 3 g en caja de 200 y sal en sobre.' },
      { p: '¿Hay pedido mínimo?', r: MINIMO },
      { p: '¿Le venden a particulares?', r: PARTICULARES },
    ],
    whatsapp: 'Hola, quiero sobres de catsup y aderezos por mayoreo. ¿Me pasan precio por caja?',
  },
  {
    slug: 'insumos-room-service-hotel',
    resumen: 'catsup, mayonesa y mostaza Dijon de room service, Tabasco mini, salsa A1 y relish',
    logo: 'https://jlhvtjsdbdgwvfhjahdi.supabase.co/storage/v1/object/public/catalogo/marcas/heinz.png',
    titulo: 'Insumos para room service de hotel por mayoreo',
    h1: 'Insumos para room service de hotel por mayoreo',
    descripcion:
      'Insumos para room service y desayunos de hotel por mayoreo en Monterrey: catsup, mayonesa y mostaza Dijon en presentación de room service, Tabasco mini, salsa A1 y relish, por caja.',
    eyebrow: 'Hoteles · room service · desayunos',
    answerFirst:
      'En MACSA surtimos insumos para room service de hotel por mayoreo en Monterrey: catsup, mayonesa y mostaza Dijon en presentación individual de room service, Tabasco mini, salsa A1 y relish, por caja cerrada. Somos distribuidor directo de Heinz y entregamos al día siguiente en el área metropolitana.',
    skus: ['KR60', 'M60', 'MZ60', 'STM144', 'A1', 'P12'],
    tituloProductos: 'Room service por caja',
    enlaces: [
      { url: '/aderezos-en-sobre-por-mayoreo/', texto: 'Aderezos en sobre por mayoreo' },
      { url: '/distribuidor-de-heinz-monterrey/', texto: 'Distribuidor directo de Heinz' },
      { url: '/hash-brown/', texto: 'Hash brown para desayuno' },
    ],
    puntos: [
      { titulo: 'Presentación de room service', texto: 'Catsup de 63 g, mayonesa de 54 ml y mostaza Dijon de 57 g, en caja de 60 piezas.' },
      { titulo: 'Para la mesa del desayuno', texto: 'Tabasco mini en caja de 144, salsa A1 y relish.' },
      { titulo: 'Un solo proveedor', texto: 'Junto con papa, hash brown, pollo y abarrotes en el mismo pedido.' },
      { titulo: 'Entrega al día siguiente', texto: ENTREGA },
    ],
    preguntas: [
      { p: '¿Surten hoteles?', r: 'Sí. Surtimos insumos de room service y de cocina a hoteles en Monterrey y su área metropolitana; para otras ciudades te confirmamos el día al levantar el pedido.' },
      { p: '¿Hay pedido mínimo?', r: MINIMO },
      { p: '¿Facturan?', r: 'Sí. Se puede facturar o trabajar con remisión.' },
      { p: '¿Cómo me doy de alta como cliente?', r: 'Con un formato sencillo en la página de alta de cliente; el alta queda el mismo día.' },
    ],
    whatsapp: 'Hola, busco insumos de room service para hotel. ¿Me pasan su lista?',
  },
  {
    slug: 'salsa-para-pizza-por-mayoreo',
    resumen: 'salsa para pizza en pouch de 3 kg, por caja de 6',
    titulo: 'Salsa para pizza por mayoreo',
    h1: 'Salsa para pizza por mayoreo',
    descripcion:
      'Salsa para pizza por mayoreo en Monterrey: pouch de 3 kg en caja de 6. Para pizzerías y restaurantes, con Tabasco en sobre para tus pedidos. Entrega al día siguiente.',
    eyebrow: 'Pizzerías · pouch de 3 kg',
    answerFirst:
      'En MACSA compras salsa para pizza por mayoreo en Monterrey: pouch de 3 kg en caja de 6, lista para usar en pizzerías y restaurantes, y Tabasco en sobre para acompañar tus pedidos. Surtimos también toppings para pizza y entregamos al día siguiente en el área metropolitana.',
    skus: ['SPP', 'SPPA', 'TP200'],
    tituloProductos: 'Salsa para pizza por caja',
    enlaces: [
      { url: '/toppings-para-pizza/', texto: 'Toppings para pizza por mayoreo' },
      { url: '/aderezos-en-sobre-por-mayoreo/', texto: 'Aderezos en sobre por mayoreo' },
      { url: '/distribuidor-de-heinz-monterrey/', texto: 'Distribuidor directo de Heinz' },
    ],
    puntos: [
      { titulo: 'Pouch de 3 kg', texto: 'En caja de 6 bolsas: 18 kg de salsa por caja.' },
      { titulo: 'Para tus pedidos', texto: 'Tabasco en sobre de 3 g, en caja de 200.' },
      { titulo: 'Toppings en el mismo pedido', texto: 'Junto con los toppings y el queso para tu pizza.' },
      { titulo: 'Entrega al día siguiente', texto: ENTREGA },
    ],
    preguntas: [
      { p: '¿Venden salsa para pizza por caja?', r: 'Sí: pouch de 3 kg en caja de 6.' },
      { p: '¿Hay pedido mínimo?', r: MINIMO },
      { p: '¿Entregan en mi zona?', r: ENTREGA },
      { p: '¿Le venden a particulares?', r: PARTICULARES },
    ],
    whatsapp: 'Hola, quiero salsa para pizza por mayoreo. ¿Me pasan precio por caja?',
  },
]

export const intencion = (slug: string) => INTENCIONES.find((x) => x.slug === slug)

/* ── Las mismas búsquedas en las ciudades grandes del corredor (S182, pedido de Luis) ───────────────────────
 * «¿Dónde quedan Saltillo o Torreón?». Cada variante cambia lo que de verdad cambia en esa ciudad: el día de
 * entrega, el mínimo y la bodega (lib/ciudades.ts, modo `corredor`, junta con Jorge del 2-sep-2026). */
export const CIUDADES_INTENCION = ['saltillo', 'torreon'] as const

const sinMonterrey = (s: string) => s.replace(/ en Monterrey$/, '')
export const slugBase = (slug: string) => slug.replace(/-monterrey$/, '')
export const slugIntencionCiudad = (slug: string, ciudad: string) => `${slugBase(slug)}-en-${ciudad}`

interface CiudadCorredor {
  slug: string
  nombre: string
  estado: string
  minimo: string
  entrega: string
  extra?: string
}

const CORREDOR: Record<(typeof CIUDADES_INTENCION)[number], CiudadCorredor> = {
  saltillo: {
    slug: 'saltillo',
    nombre: 'Saltillo',
    estado: 'Coahuila',
    minimo: 'El pedido mínimo en Saltillo es de $5,000.',
    entrega:
      'Saltillo queda en el camino de nuestra ruta a Torreón, que sale los miércoles: la entrega no carga un flete dedicado.',
  },
  torreon: {
    slug: 'torreon',
    nombre: 'Torreón',
    estado: 'Coahuila',
    minimo: 'En Torreón no hay pedido mínimo.',
    entrega: 'La ruta a Torreón sale los miércoles.',
    extra: 'En Torreón contamos con una segunda bodega, con productos adicionales a los que viajan en la ruta.',
  },
}

export function intencionEnCiudad(slug: string, ciudad: string): Intencion & { ciudad: string } {
  const it = intencion(slug)!
  const c = CORREDOR[ciudad as keyof typeof CORREDOR]
  const frase = sinMonterrey(it.h1)
  return {
    ...it,
    slug: slugIntencionCiudad(slug, c.slug),
    titulo: `${frase} en ${c.nombre}`,
    h1: `${frase} en ${c.nombre}`,
    descripcion: `${frase} en ${c.nombre}, ${c.estado}, para restaurantes y negocios de comida. ${c.entrega} ${c.minimo}`,
    eyebrow: `${c.nombre}, ${c.estado} · Corredor Saltillo — Torreón`,
    answerFirst: `${/^Distribuidor/.test(frase) ? 'MACSA es' : 'MACSA surte'} ${frase.charAt(0).toLowerCase() + frase.slice(1)} en ${c.nombre}, ${c.estado}: ${it.resumen}. ${c.entrega} ${c.minimo}${c.extra ? ' ' + c.extra : ''}`,
    puntos: [
      ...it.puntos.filter((p) => p.texto !== ENTREGA && p.texto !== MINIMO),
      { titulo: `Entrega en ${c.nombre}`, texto: `${c.entrega} ${c.minimo}` },
    ],
    preguntas: [
      { p: `¿Qué día entregan en ${c.nombre}?`, r: `${c.entrega} Te confirmamos la fecha al levantar el pedido.` },
      { p: `¿Hay pedido mínimo en ${c.nombre}?`, r: c.minimo },
      ...(c.extra ? [{ p: `¿Tienen bodega en ${c.nombre}?`, r: c.extra }] : []),
      { p: '¿Le venden a particulares?', r: PARTICULARES },
    ],
    enlaces: [{ url: `/${it.slug}/`, texto: `${sinMonterrey(it.h1)} en Monterrey` }, ...it.enlaces],
    whatsapp: `Hola, escribo desde ${c.nombre}. ${it.whatsapp.replace(/^Hola, /, '')}`,
    ciudad: c.slug,
  }
}
