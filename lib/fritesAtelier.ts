/**
 * Frites Atelier para México (S206 · 6-nov-2026).
 *
 * Reglas de Luis que este texto NO puede romper:
 *  - La cadena de tiendas NO llega a México. Se escribe «disponible para México, a través de MACSA».
 *    Nunca «llegó a México», «ahora en México» ni «Frites Atelier en México».
 *  - Sin atributos físicos prometidos (crujiente, dorada…) ni tiempos de fritura o de vida útil: faltan la ficha
 *    técnica y las instrucciones oficiales que se le pidieron a Sigrid Jobse.
 *  - Sin precios. Sin Cavimex. La degustación es sólo con reservación.
 *  - Alex Jansen es Director Comercial (Commercial Director). Edgar Mayen es de Lamb Weston, nunca de MACSA.
 *  - Sólo videos sin invitados de frente y sin datos por confirmar: A2, A4 y L6 (revisados cuadro por cuadro, 6-nov).
 *    A5/L5 (tiempos) y A1, A3, A8, A9, A10, L1, L3, L7, L8 (invitados sin permiso) no salen aquí hasta resolverse.
 *
 * Fuentes: presentación de Frites Atelier (Sigrid Jobse), subtítulos de los videos de la visita
 * (`Videos/FRITES_ATELIER/dia2/guiones2.py`) y, para Oud Sluis, Wikipedia y Falstaff (consultados 6-nov-2026).
 */

/**
 * Los videos viven en el bucket `medios-web` de Supabase y no en el worker: Safari exige `Range` y los assets de
 * Workers no lo dan (medido en macsamty.mx, 6-nov). El bucket `catalogo` sólo acepta imágenes de hasta 5 MB.
 */
export const MEDIOS_FA = 'https://jlhvtjsdbdgwvfhjahdi.supabase.co/storage/v1/object/public/medios-web/frites-atelier/'

export const SKUS_FA = ['FAA4', 'F03', 'F07', 'LWS902']

export interface VideoFA {
  archivo: string
  titulo: string
  texto: string
  vertical: boolean
}

export interface TextosFA {
  idioma: 'es' | 'en'
  ruta: string
  eyebrow: string
  sub: string
  ctaDegustar: string
  mensajeDegustar: string
  ctaVer: string
  chips: { etiqueta: string; valor: string }[]
  marcaEyebrow: string
  marcaTitulo: string
  marcaParrafos: string[]
  cita: string
  citaAutor: string
  pilaresEyebrow: string
  pilaresTitulo: string
  pilares: { n: string; titulo: string; texto: string; foto: string; alt: string }[]
  visitaEyebrow: string
  visitaTitulo: string
  visitaTexto: string
  visitaFotos: { foto: string; alt: string }[]
  videosEyebrow: string
  videosTitulo: string
  videos: VideoFA[]
  productosEyebrow: string
  productosTitulo: string
  productosIntro: string
  productos: Record<string, string>
  preguntarPrecio: string
  verFicha: string
  venderEyebrow: string
  venderTitulo: string
  venderTexto: string
  venderCta: string
  faqEyebrow: string
  faqTitulo: string
  faq: { p: string; r: string }[]
}

export const FA_ES: TextosFA = {
  idioma: 'es',
  ruta: '/frites-atelier/',
  eyebrow: 'Disponible para México, a través de MACSA',
  sub: 'La papa de la marca creada por el chef Sergio Herman, tres estrellas Michelin. Producida en Holanda por Lamb Weston, para que la sirvas en tu restaurante.',
  ctaDegustar: 'Reservar una degustación',
  mensajeDegustar: 'Hola, quiero reservar una degustación de Frites Atelier.',
  ctaVer: 'Ver los productos',
  chips: [
    { etiqueta: 'Creada por', valor: 'Chef Sergio Herman' },
    { etiqueta: 'Producida por', valor: 'Lamb Weston, en Holanda' },
    { etiqueta: 'Presentación', valor: 'Caja de 10 kg' },
    { etiqueta: 'Degustación', valor: 'Con reservación' },
  ],
  marcaEyebrow: 'La marca',
  marcaTitulo: 'Un chef de tres estrellas Michelin se dedicó a la papa',
  marcaParrafos: [
    'Sergio Herman llevó su restaurante Oud Sluis a las tres estrellas Michelin y lo cerró en 2013. Después se dedicó a un platillo que parecía sencillo: la papa. Año y medio de pruebas dieron lugar a Frites Atelier.',
    'Hoy es una marca premium de papas fritas que trata a la papa como protagonista y no como guarnición. Su lema lo dice todo: no vende papas, vende una experiencia.',
  ],
  cita: '«La perfección me ha dado tres estrellas Michelin, y hasta el platillo más sencillo, como unas papas fritas de verdad deliciosas, merece la misma dedicación.»',
  citaAutor: 'Sergio Herman',
  pilaresEyebrow: 'Cómo está hecha',
  pilaresTitulo: 'Tres pilares',
  pilares: [
    {
      n: '1',
      titulo: 'El Atelier',
      texto: 'Los ateliers cuidan el detalle como un restaurante: el espejo con el menú, el piso de mosaico, los potes de cerámica con sus propias salsas.',
      foto: 'atelier-interior',
      alt: 'Interior de un atelier de Frites Atelier en Europa',
    },
    {
      n: '2',
      titulo: 'El producto',
      texto: 'Una papa propia, del campo al atelier. La produce Lamb Weston, su socio de manufactura.',
      foto: 'papa-campo',
      alt: 'Una mano sostiene una papa recién sacada del campo',
    },
    {
      n: '3',
      titulo: 'La marca',
      texto: 'Producto propio, posicionamiento premium y una historia poderosa. Es el principio Hermès: el mismo cuidado en cada porción.',
      foto: 'servicio',
      alt: 'Charola con una porción de Frites Atelier',
    },
  ],
  visitaEyebrow: 'Noviembre de 2026',
  visitaTitulo: 'Alex Jansen estuvo en Monterrey',
  visitaTexto:
    'Alex Jansen, Director Comercial de Frites Atelier, visitó Monterrey para compartir con chefs y restauranteros cómo se construyó la marca, en la sala y en la cocina.',
  visitaFotos: [
    { foto: 'alex-bolsa', alt: 'Alex Jansen abre una bolsa de Frites Atelier en la cocina' },
    { foto: 'alex-cocina', alt: 'Alex Jansen prepara la papa durante la presentación' },
    { foto: 'alex-presentacion', alt: 'Alex Jansen durante la presentación en Monterrey' },
  ],
  videosEyebrow: 'En sus palabras',
  videosTitulo: 'Lo que contó Alex',
  videos: [
    { archivo: 'fa-a4-la-bolsa-hermes', titulo: 'La bolsa Hermès', texto: 'Nadie discute el precio: discute el color.', vertical: true },
    { archivo: 'fa-a2-de-la-caja-a-la-mesa', titulo: 'De la caja a la mesa', texto: 'De la bolsa a la freidora y a la charola.', vertical: true },
    { archivo: 'fa-l6-la-marca', titulo: 'La marca', texto: 'Por qué la marca es un pilar del negocio.', vertical: false },
  ],
  productosEyebrow: 'Para tu cocina',
  productosTitulo: 'Lo que tenemos en nuestro almacén',
  productosIntro:
    'La papa de Frites Atelier y tres productos más de Lamb Weston Europa. Todos en caja de 10 kg, congelados.',
  productos: {
    FAA4: 'La papa de la marca, en su bolsa oficial.',
    F03: 'Línea Private Reserve de Lamb Weston Europa, con cáscara.',
    F07: 'Línea Private Reserve de Lamb Weston Europa, con cáscara.',
    LWS902: 'Papa en espiral, sazonada, de Lamb Weston Europa.',
  },
  preguntarPrecio: 'Pedir precio',
  verFicha: 'Ver ficha',
  venderEyebrow: 'Para tu negocio',
  venderTitulo: 'Lo que aprendimos para vender más papa',
  venderTexto:
    'Lo que hizo crecer a Frites Atelier no depende de una sola papa. Juntamos los consejos de Alex para que los apliques en tu menú, con la papa que ya vendes o con una de estas.',
  venderCta: 'Ver los consejos',
  faqEyebrow: 'Preguntas frecuentes',
  faqTitulo: 'Lo que más nos preguntan',
  faq: [
    {
      p: '¿Va a abrir una tienda de Frites Atelier en Monterrey?',
      r: 'No. Lo que está disponible, a través de MACSA, es la papa, para que la sirvas en tu restaurante, hotel o cocina.',
    },
    {
      p: '¿Quién produce la papa?',
      r: 'Lamb Weston, en Holanda. Es el socio de manufactura de Frites Atelier, y MACSA es distribuidor oficial de Lamb Weston en Monterrey.',
    },
    { p: '¿En qué presentación viene?', r: 'En caja de 10 kg, congelada.' },
    {
      p: '¿La puedo probar antes de comprar?',
      r: 'Sí, con reservación. Escríbenos y te decimos fecha y lugar de la degustación.',
    },
    {
      p: '¿Cómo se prepara?',
      r: 'Con tu pedido te compartimos las instrucciones oficiales de preparación.',
    },
    {
      p: '¿Cuánto cuesta?',
      r: 'El precio depende de la lista de cada cliente y no se publica en el sitio. Pídelo por WhatsApp o por el chat y te lo damos hoy mismo.',
    },
    {
      p: '¿Hasta dónde entregan?',
      r: 'Igual que el resto de nuestro catálogo: la cobertura de cada ciudad está en la página de cobertura. Si estás en otra ciudad, escríbenos y lo revisamos.',
    },
  ],
}

export const FA_EN: TextosFA = {
  ...FA_ES,
  idioma: 'en',
  ruta: '/frites-atelier/en/',
  eyebrow: 'Available for Mexico, through MACSA',
  sub: 'The fries of the brand created by three-Michelin-star chef Sergio Herman. Produced in the Netherlands by Lamb Weston, ready for Mexican kitchens.',
  ctaDegustar: 'Book a tasting',
  mensajeDegustar: 'Hello, I would like to book a Frites Atelier tasting.',
  ctaVer: 'See the products',
  chips: [
    { etiqueta: 'Created by', valor: 'Chef Sergio Herman' },
    { etiqueta: 'Produced by', valor: 'Lamb Weston, the Netherlands' },
    { etiqueta: 'Pack', valor: '10 kg case' },
    { etiqueta: 'Tasting', valor: 'By reservation' },
  ],
  marcaEyebrow: 'The brand',
  marcaTitulo: 'A three-Michelin-star chef devoted himself to the potato',
  marcaParrafos: [
    'Sergio Herman took his restaurant Oud Sluis to three Michelin stars and closed it in 2013. He then turned to a dish that looked simple: fries. A year and a half of testing led to Frites Atelier.',
    'Today it is a premium fries brand that treats the fry as the star of the plate, not as a side. In its own words: it does not sell fries, it sells an experience.',
  ],
  cita: '“Perfection earned me three Michelin stars, and even the simplest dish, like truly delicious fries, deserves the same dedication.”',
  pilaresEyebrow: 'How it is built',
  pilaresTitulo: 'Three pillars',
  pilares: [
    { ...FA_ES.pilares[0], titulo: 'The Atelier', texto: 'Each atelier looks after every detail like a restaurant: the mirror with the menu, the mosaic floor, the ceramic pots with its own sauces.', alt: 'Inside a Frites Atelier in Europe' },
    { ...FA_ES.pilares[1], titulo: 'The product', texto: 'Its own fry, from the field to the atelier, produced by Lamb Weston, its manufacturing partner.', alt: 'A hand holding a potato freshly taken from the field' },
    { ...FA_ES.pilares[2], titulo: 'The brand', texto: 'Own product, premium positioning and a powerful story. The Hermès principle: the same care in every portion.', alt: 'A tray with a portion of Frites Atelier' },
  ],
  visitaEyebrow: 'November 2026',
  visitaTitulo: 'Alex Jansen in Monterrey',
  visitaTexto:
    'Alex Jansen, Commercial Director of Frites Atelier, visited Monterrey to share with chefs and restaurant owners how the brand was built, both in the room and in the kitchen.',
  visitaFotos: [
    { foto: 'alex-bolsa', alt: 'Alex Jansen opening a bag of Frites Atelier in the kitchen' },
    { foto: 'alex-cocina', alt: 'Alex Jansen preparing the fries during the presentation' },
    { foto: 'alex-presentacion', alt: 'Alex Jansen during the presentation in Monterrey' },
  ],
  videosEyebrow: 'In his words',
  videosTitulo: 'What Alex shared',
  videos: [
    { archivo: 'fa-en-a4-the-hermes-principle', titulo: 'The Hermès principle', texto: 'Nobody argues about the price, only the colour.', vertical: true },
    { archivo: 'fa-en-a2-from-the-box-to-the-table', titulo: 'From the box to the table', texto: 'From the bag to the fryer and the tray.', vertical: true },
  ],
  productosEyebrow: 'For your kitchen',
  productosTitulo: 'In our warehouse',
  productosIntro: 'Frites Atelier fries and three more Lamb Weston Europe products. All in 10 kg frozen cases.',
  productos: {
    FAA4: 'The brand’s own fry, in its official bag.',
    F03: 'Private Reserve line from Lamb Weston Europe, skin on, 9 × 9.',
    F07: 'Private Reserve line from Lamb Weston Europe, skin on, 11 × 11.',
    LWS902: 'Seasoned Twisters from Lamb Weston Europe.',
  },
  preguntarPrecio: 'Ask for a price',
  verFicha: 'Product page (Spanish)',
  venderEyebrow: 'For your business',
  venderTitulo: 'What we learned about selling more fries',
  venderTexto:
    'What made Frites Atelier grow does not depend on a single fry. We gathered Alex’s advice for restaurants in Monterrey (in Spanish).',
  venderCta: 'Read the advice',
  faqEyebrow: 'Questions',
  faqTitulo: 'Good to know',
  faq: [
    { p: 'Is a Frites Atelier store opening in Mexico?', r: 'No. What is available, through MACSA, is the fry itself, for restaurants, hotels and kitchens.' },
    { p: 'Who produces it?', r: 'Lamb Weston, in the Netherlands, the manufacturing partner of Frites Atelier. MACSA is an official Lamb Weston distributor in Monterrey.' },
    { p: 'Who is MACSA?', r: 'A foodservice distributor of frozen food based in the Monterrey area, serving restaurants, hotels and kitchens in Nuevo León and Coahuila.' },
    { p: 'How can I try it?', r: 'Tastings are by reservation. Write to us and we will share the date and place.' },
  ],
}

/* ── Cómo vender más papa ───────────────────────────────────────────── */

export interface ConsejoVenta {
  titulo: string
  cita?: string
  video?: string
  /** Foto de public/frites-atelier cuando no hay video sin invitados. */
  foto?: { nombre: string; alt: string }
  texto: string
  aplica: string
  ligas?: { href: string; texto: string }[]
  reglas?: string[]
}

export const CONSEJOS_VENTA: ConsejoVenta[] = [
  {
    titulo: 'Deja de vender una guarnición',
    cita: '«Vendemos una marca. No vendemos papas.»',
    foto: { nombre: 'sal', alt: 'Papa de Frites Atelier saltando en el recipiente de servicio' },
    texto:
      'La mayoría de la papa se hace para ir rápido. Frites Atelier se alejó de eso: la trata como el platillo y le da una experiencia al que la pide.',
    aplica: 'Mira tu menú: ¿la papa tiene lugar propio o sólo aparece como «orden de papas»? Dale nombre, foto y un lugar en la carta.',
  },
  {
    titulo: 'Cuida cada detalle, como una bolsa Hermès',
    cita: '«No te atreves a discutir el precio. Discutes el color.»',
    video: 'fa-a4-la-bolsa-hermes',
    texto:
      'Una bolsa Hermès se hace a mano, cuidando cada detalle. Cuando el cliente ve ese cuidado, deja de comparar precios. Frites Atelier aplicó esa idea a la papa.',
    aplica: 'Revisa cómo llega la papa a la mesa: el recipiente, la porción y la limpieza del plato. Lo que se ve cuidado se defiende mejor en el precio.',
  },
  {
    titulo: 'Destácala con un topping',
    cita: '«Destácalo en una canasta de porcelana con el topping. Es como un platillo completo.»',
    foto: { nombre: 'servicio', alt: 'Porción de Frites Atelier servida en charola' },
    texto:
      'Con toppings de verdad, como estofado de res, parmesano o albahaca, la papa deja de ser un acompañamiento y se pide por sí sola.',
    aplica: 'Arma una o dos papas con topping usando lo que ya tienes en tu cocina, y véndelas como platillo.',
    ligas: [
      { href: '/appetizers-y-quesos/', texto: 'Quesos y botanas' },
      { href: '/salsas-para-alitas/', texto: 'Salsas' },
      { href: '/aderezos/', texto: 'Aderezos' },
    ],
  },
  {
    titulo: 'Respeta las reglas de la freidora',
    cita: '«Hay que respetar las reglas, porque al final, el consumidor es tu juez.»',
    texto: 'Ninguna marca aguanta una mala operación. Estas son las reglas que Alex repitió en la cocina:',
    reglas: [
      'Filtra el aceite.',
      'Trabaja limpio.',
      'Revisa la calidad del aceite: hay parámetros para hacerlo.',
      'Fríe la papa por separado, nunca junto con el pescado.',
    ],
    aplica: 'Enséñaselas a quien esté en la freidora. En consejos tienes más videos cortos para tu cocina.',
    ligas: [
      { href: '/consejos/', texto: 'Consejos para la cocina' },
      { href: '/aceite-para-freir/', texto: 'Aceite para freír' },
    ],
  },
]
