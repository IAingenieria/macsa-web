/**
 * PRODUCTOS ANCLA — el eje 1 fino de la matriz.
 *
 * No son las 14 familias: son los productos concretos que la gente escribe en
 * el buscador ("papa gajo", "media pechuga de pollo", "aceite para freidora").
 *
 * ⭐ La selección NO es intuición: sale de `ventas_det_microsip_macsa`,
 * facturación real de 2026. Se posiciona lo que vende, no lo que suena bonito.
 * El importe anotado en cada ancla es la suma de sus SKUs en el año.
 *
 * Cada ancla × 30 ciudades = la malla de páginas geográficas.
 */

export interface Ancla {
  slug: string
  nombre: string
  /** H1 de la página pilar del ancla */
  h1: string
  /** La familia a la que pertenece (para migas, silo y galería de fotos) */
  familia: string
  /** Answer-First: 40–60 palabras, keyword en la primera frase */
  answerFirst: string
  anclas: string[]
  /** Códigos reales del catálogo que cubre este ancla */
  skus: string[]
  /** Facturación 2026 en pesos, redondeada. Sólo para priorizar internamente. */
  factura: number
  /** Para qué giro es */
  giros: string[]
}

export const ANCLAS: Ancla[] = [
  {
    slug: 'media-pechuga-de-pollo',
    nombre: 'Media pechuga de pollo',
    h1: 'Media pechuga de pollo sin piel congelada',
    familia: 'pollo',
    answerFirst:
      'La media pechuga de pollo sin piel es el producto de mayor movimiento de MACSA y llega congelada IQF en caja de 13 kg. Rinde para milanesa, empanizado, plancha y guisado con el mismo código, que es justo lo que necesita una cocina de alto volumen para no multiplicar claves de inventario.',
    anclas: ['el producto de mayor movimiento', 'con el mismo código'],
    skus: ['PSCH13', 'PSCH18', 'PSCH', 'POL-AGR'],
    factura: 21090000,
    giros: ['comida-corrida', 'cocina-institucional', 'fast-food', 'dark-kitchen'],
  },
  {
    slug: 'papa-crisscut',
    nombre: 'Papa crisscut',
    h1: 'Papa crisscut sazonada congelada',
    familia: 'papa-a-la-francesa',
    answerFirst:
      'La papa crisscut sazonada es el corte enrejado que más se comparte en barra: se ve más en el plato y aguanta la salsa sin ablandarse. MACSA la maneja como distribuidor oficial de Lamb Weston, congelada IQF en caja de 12.2 kg, lista para ir del congelador a la freidora.',
    anclas: ['se ve más en el plato', 'distribuidor oficial de Lamb Weston'],
    skus: ['D23', 'X9182', 'S15'],
    factura: 7910000,
    giros: ['bar-y-cantina', 'alitas-y-boneless', 'hamburgueseria'],
  },
  {
    slug: 'muncher-de-jalapeno',
    nombre: 'Muncher de jalapeño',
    h1: 'Muncher de jalapeño con queso cheddar',
    familia: 'appetizers-y-quesos',
    answerFirst:
      'El muncher de jalapeño con queso cheddar es la botana de entrada que más margen deja en barra, y va de la caja a la freidora sin ninguna preparación previa. MACSA lo maneja en caja de 8.2 kg, congelado pieza por pieza, junto con la versión de tocino y la de papa con forma de jalapeño.',
    anclas: ['más margen deja en barra', 'sin ninguna preparación previa'],
    skus: ['P38', 'P39', 'P40', 'F6037'],
    factura: 6383000,
    giros: ['bar-y-cantina', 'alitas-y-boneless', 'hamburgueseria'],
  },
  {
    slug: 'papa-colossal-crisp',
    nombre: 'Papa colossal crisp',
    h1: 'Papa colossal crisp con recubrimiento',
    familia: 'papa-a-la-francesa',
    answerFirst:
      'La papa colossal crisp trae un recubrimiento que la mantiene crujiente mucho más tiempo, así que es la que conviene cuando la orden sale a domicilio o para llevar. MACSA la maneja en corte de 1/4 y de 3/8, congelada IQF, como distribuidor oficial de Lamb Weston en Monterrey.',
    anclas: ['crujiente mucho más tiempo', 'a domicilio o para llevar'],
    skus: ['C0034', 'C0057'],
    factura: 6660000,
    giros: ['dark-kitchen', 'fast-food', 'hamburgueseria'],
  },
  {
    slug: 'papa-3-8',
    nombre: 'Papa 3/8',
    h1: 'Papa a la francesa corte 3/8',
    familia: 'papa-a-la-francesa',
    answerFirst:
      'El corte 3/8 es la papa a la francesa clásica de restaurante y el más pedido del catálogo. MACSA lo maneja con y sin cáscara, liso, sazonado y con recubrimiento crispy, todo en caja de 13.6 kg y congelado IQF: va del congelador a la freidora sin descongelar.',
    anclas: ['la papa a la francesa clásica', 'sin descongelar'],
    skus: ['B36', 'B3901', 'G2300', 'S19', 'S1901', 'LW200', 'LW201', '32L', 'S57', 'B91', 'C0057', 'H0057', 'X7211B'],
    factura: 15000000,
    giros: ['hamburgueseria', 'fast-food', 'taqueria', 'comida-corrida'],
  },
  {
    slug: 'papa-5-16',
    nombre: 'Papa 5/16',
    h1: 'Papa a la francesa corte 5/16 delgada',
    familia: 'papa-a-la-francesa',
    answerFirst:
      'El corte 5/16 es la papa delgada, la que queda más crujiente y rinde más porciones por caja porque cada orden pesa menos. MACSA la maneja recta, ondulada y estilo seashore, con y sin cáscara, en caja de 13.6 kg y congelada IQF.',
    anclas: ['más crujiente', 'rinde más porciones por caja'],
    skus: ['S12', 'F6064', 'S0022', 'I11', '12045', 'B43', 'LW204', 'RE001', 'C0063'],
    factura: 8900000,
    giros: ['fast-food', 'hamburgueseria', 'bar-y-cantina'],
  },
  {
    slug: 'queso-cheddar',
    nombre: 'Queso cheddar',
    h1: 'Queso cheddar en bolsa para food service',
    familia: 'appetizers-y-quesos',
    answerFirst:
      'El queso cheddar en bolsa de 3 kg es de los productos que más factura MACSA, y por una razón simple: es lo que convierte una orden de papas en una orden de papas con queso, sin agregar un solo minuto de cocina. Se maneja en caja de seis bolsas.',
    anclas: ['sin agregar un solo minuto de cocina'],
    skus: ['RB4011'],
    factura: 5617000,
    giros: ['bar-y-cantina', 'alitas-y-boneless', 'fast-food', 'hamburgueseria'],
  },
  {
    slug: 'pure-de-papa',
    nombre: 'Puré de papa',
    h1: 'Puré de papa congelado para restaurante',
    familia: 'papa-a-la-francesa',
    answerFirst:
      'El puré de papa congelado de Lamb Weston llega listo para calentar y servir, con textura consistente plato tras plato: no depende de quién esté en la estufa. MACSA lo maneja en cinco versiones —mezcla, original, estilo casero, con ajo y yukon— para guarnición de alto volumen.',
    anclas: ['listo para calentar y servir', 'no depende de quién esté en la estufa'],
    skus: ['M22', 'M14', 'M16', 'M18', 'M0011', 'N88'],
    factura: 3886000,
    giros: ['comida-corrida', 'cocina-institucional', 'hotel'],
  },
  {
    slug: 'papa-gajo',
    nombre: 'Papa gajo',
    h1: 'Papa gajo sazonada de 8 cortes',
    familia: 'papa-a-la-francesa',
    answerFirst:
      'La papa gajo sazonada de ocho cortes es la guarnición que más llena el plato por caja, y la que se pide para compartir en barra. MACSA la maneja sazonada y natural, en caja de 13.6 kg y congelada IQF, como distribuidor oficial de Lamb Weston en Monterrey.',
    anclas: ['más llena el plato por caja', 'distribuidor oficial de Lamb Weston'],
    skus: ['C27', 'C2700', '32R', 'D17'],
    factura: 2067000,
    giros: ['bar-y-cantina', 'alitas-y-boneless', 'taqueria'],
  },
  {
    slug: 'aceite-para-freidora',
    nombre: 'Aceite para freidora',
    h1: 'Aceite para freidora de restaurante en bidón',
    familia: 'aceite-para-freir',
    answerFirst:
      'El aceite para freidora se compra por rendimiento, no por litro: MACSA maneja King Fry en bidón de 20 litros y Golden Chef. El equipo recomienda King Fry porque es parcialmente hidrogenado, se convierte en manteca en frío y aguanta más ciclos, así que son menos cambios de aceite por semana.',
    anclas: ['por rendimiento, no por litro', 'menos cambios de aceite por semana'],
    skus: ['KF', 'KF101', 'GCH20'],
    factura: 2711000,
    giros: ['alitas-y-boneless', 'fast-food', 'hamburgueseria', 'taqueria'],
  },
  {
    slug: 'boneless-de-pollo',
    nombre: 'Boneless de pollo',
    h1: 'Boneless de pollo congelado natural y enchilado',
    familia: 'pollo',
    answerFirst:
      'El boneless de pollo es la base del negocio de alitas, y MACSA lo maneja natural y enchilado. El natural te deja salsear al momento con los sabores que tengas en barra; el enchilado ya trae el picante integrado. Todo congelado IQF, con cadena de frío sin cortes.',
    anclas: ['la base del negocio de alitas', 'salsear al momento'],
    skus: ['POL-FN', 'POL-FE', 'BN', 'BE'],
    factura: 1864000,
    giros: ['alitas-y-boneless', 'bar-y-cantina', 'dark-kitchen'],
  },
  {
    slug: 'elote-congelado',
    nombre: 'Elote congelado',
    h1: 'Elote congelado entero, en mitades y desgranado',
    familia: 'verduras-y-elote',
    answerFirst:
      'El elote congelado se maneja en tres presentaciones —entero de 48 piezas, en mitades de 96 y desgranado— y al ser IQF puedes tomar la porción exacta que necesitas sin descongelar la caja completa. Es la guarnición más barata por porción del catálogo de MACSA.',
    anclas: ['la porción exacta que necesitas', 'más barata por porción'],
    skus: ['EM96', 'EE48', 'EED'],
    factura: 2022000,
    giros: ['comida-corrida', 'cocina-institucional', 'food-truck', 'hotel'],
  },
  {
    slug: 'papa-1-4',
    nombre: 'Papa 1/4',
    h1: 'Papa a la francesa corte 1/4 gruesa',
    familia: 'papa-a-la-francesa',
    answerFirst:
      'El corte 1/4 es la papa gruesa: menos superficie por porción, más papa por mordida y menos absorción de aceite. MACSA la maneja con recubrimiento stealth, con cáscara y con capeado de cerveza, en caja de 12.2 kg y congelada IQF.',
    anclas: ['más papa por mordida', 'menos absorción de aceite'],
    skus: ['S34', 'HVT', 'H21', 'LW203', '25030', '32C', '45Q', 'S53', 'S0032'],
    factura: 2900000,
    giros: ['hamburgueseria', 'bar-y-cantina', 'taqueria'],
  },
  {
    slug: 'pan-para-hamburguesa',
    nombre: 'Pan para hamburguesa',
    h1: "Pan para hamburguesa Martin's Potato Rolls",
    familia: 'panaderia',
    answerFirst:
      'MACSA es distribuidor directo de Martin’s, la panadería importada de Estados Unidos, sin intermediarios. Los Potato Rolls son el pan que usan las hamburgueserías que compiten por producto y no por precio: miga suave, corteza que aguanta la salsa y tamaño consistente caja tras caja.',
    anclas: ['distribuidor directo de Martin’s', 'tamaño consistente caja tras caja'],
    skus: ['PHM', 'PHM5', 'MPP', 'PHS', 'PGD', 'PM12'],
    factura: 982000,
    giros: ['hamburgueseria', 'dark-kitchen', 'food-truck'],
  },
  {
    slug: 'mayonesa',
    nombre: 'Mayonesa',
    h1: 'Mayonesa para restaurante en galón y cubeta',
    familia: 'aderezos',
    answerFirst:
      'La mayonesa de food service se compra en volumen: MACSA la maneja en galón de 3.78 litros de VenturaFoods y en las presentaciones Heinz de cubeta, botella y sachet, incluida la de limón. La presentación se elige según si el consumo es de cocina, de barra o de mesa.',
    anclas: ['se compra en volumen', 'de cocina, de barra o de mesa'],
    skus: ['MAY378', 'VNT-MAY', 'HZ-MAY'],
    factura: 877000,
    giros: ['hamburgueseria', 'fast-food', 'comida-corrida', 'cafeteria'],
  },
  {
    slug: 'aro-de-cebolla',
    nombre: 'Aro de cebolla',
    h1: 'Aros de cebolla congelados para freidora',
    familia: 'aros-de-cebolla',
    answerFirst:
      'Los aros de cebolla congelados se manejan en tres estilos: preformado de cebolla molida con tamaño uniforme, gourmet de cebolla entera con empanizado tipo panko, y capeado de cerveza. El preformado es el que más se vende porque cada aro sale igual y la porción no varía.',
    anclas: ['tres estilos', 'cada aro sale igual'],
    skus: ['34000', '30410', '30423'],
    factura: 873000,
    giros: ['hamburgueseria', 'bar-y-cantina', 'fast-food'],
  },
  {
    slug: 'dedos-de-queso',
    nombre: 'Dedos de queso',
    h1: 'Dedos de queso y mozzarella sticks congelados',
    familia: 'appetizers-y-quesos',
    answerFirst:
      'Los dedos de queso y los mozzarella sticks son la entrada de mayor rotación en barra y van directo de la caja a la freidora. MACSA maneja el dedo de queso Sargento en caja de 5.44 kg y los mozzarella sticks, ambos congelados y sin preparación previa.',
    anclas: ['mayor rotación en barra', 'sin preparación previa'],
    skus: ['DQS', '3412'],
    factura: 1147000,
    giros: ['bar-y-cantina', 'alitas-y-boneless', 'pizzeria'],
  },
  {
    slug: 'catsup-heinz',
    nombre: 'Catsup Heinz',
    h1: 'Catsup Heinz en sobre, pouch y botella',
    familia: 'condimentos-heinz',
    answerFirst:
      'La catsup Heinz se maneja en las tres presentaciones de food service: sobre de 9 gramos para llevar, pouch de 3 kg para dispensador y botella para mesa. MACSA distribuye la línea completa de Heinz, y la presentación correcta depende de si tu consumo es de mostrador o de mesa.',
    anclas: ['las tres presentaciones de food service', 'de mostrador o de mesa'],
    skus: ['CP6', 'C1008', 'HZ-CAT'],
    factura: 850000,
    giros: ['fast-food', 'hamburgueseria', 'comida-corrida', 'taqueria'],
  },
  {
    slug: 'salsa-para-alitas',
    nombre: 'Salsa para alitas',
    h1: 'Salsa para alitas por galón',
    familia: 'salsas-para-alitas',
    answerFirst:
      'La salsa para alitas por galón es la presentación de cocina de alto volumen, y MACSA maneja quince sabores de Mr. Wings, Hello Buffalo, La Pócima y Cajun Chef. Del BBQ y el Lemon Pepper al Mango Habanero y el X-Hot, todos con existencia continua del mismo código.',
    anclas: ['quince sabores', 'existencia continua'],
    skus: ['P071', 'P083', 'P-0198', 'P081', 'SHBO', 'SHBLP', 'SAPHOT', 'CAJUNL'],
    factura: 700000,
    giros: ['alitas-y-boneless', 'bar-y-cantina', 'dark-kitchen'],
  },
  {
    slug: 'hash-brown',
    nombre: 'Hash brown',
    h1: 'Hash brown y papa para desayuno congelada',
    familia: 'papa-a-la-francesa',
    answerFirst:
      'El hash brown congelado resuelve la estación de desayunos sin pelar ni rallar una sola papa. MACSA lo maneja en óvalo, cilindro, rallado y en cubo, además de los tater rounds, todo IQF y listo para plancha o freidora directo del congelador.',
    anclas: ['sin pelar ni rallar una sola papa', 'directo del congelador'],
    skus: ['12143', 'H30', 'S69', 'FC002', '30H', 'A26', '32N', 'C67', 'A24', 'A28', 'J73', 'J75'],
    factura: 900000,
    giros: ['cafeteria', 'hotel', 'comida-corrida', 'fast-food'],
  },
]

export const ancla = (slug: string) => ANCLAS.find((a) => a.slug === slug)
