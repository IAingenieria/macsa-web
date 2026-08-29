/**
 * Las 14 familias de producto — el eje 1 de la matriz.
 * Códigos, nombres y presentaciones salen del catálogo real
 * (base de conocimiento de MacsaIA: 02-papas-lamb-weston.md,
 * 03-otras-categorias.md, 09-marcas.md, 10-guia-por-sabor-y-antojo.md).
 *
 * ⚠️ NO se publica precio. El precio público (tier p2) es decisión de Jorge;
 * mientras tanto cada producto manda al portal, donde ya se muestra.
 */

export interface Producto {
  codigo: string
  nombre: string
  presentacion: string
}

export interface Familia {
  slug: string
  nombre: string
  /** Cómo lo busca la gente — es el H1 de la página pilar */
  h1: string
  tagline: string
  /** Párrafo Answer-First: 40–60 palabras, keyword en la primera frase */
  answerFirst: string
  anclas: string[]
  marcas: string[]
  productos: Producto[]
  /** Para qué negocio sirve — enlaza con las páginas de giro */
  giros: string[]
  /** Página pilar completa construida (F2) o sólo ficha en el hub */
  pilar: boolean
}

export const FAMILIAS: Familia[] = [
  {
    slug: 'papa-a-la-francesa',
    nombre: 'Papa a la francesa',
    h1: 'Papa a la francesa congelada Lamb Weston',
    tagline: 'La línea principal. Distribuidor oficial en Monterrey.',
    answerFirst:
      'MACSA es distribuidor oficial de Lamb Weston en Monterrey y maneja más de veinte cortes de papa a la francesa congelada, todos IQF: van del congelador a la freidora sin descongelar. Caja estándar de 13.6 kg con existencia permanente, así que el mismo código está disponible cada vez que lo vuelves a pedir.',
    anclas: ['distribuidor oficial de Lamb Weston', 'sin descongelar', 'existencia permanente'],
    marcas: ['Lamb Weston'],
    productos: [
      { codigo: 'B36', nombre: 'Papa recta 3/8 premium extra larga', presentacion: 'Caja 13.6 kg (30 lb)' },
      { codigo: 'B3901', nombre: 'Papa recta lisa 3/8', presentacion: 'Caja 13.6 kg (30 lb)' },
      { codigo: 'C0057', nombre: 'Papa 3/8 recta Crunchy', presentacion: 'Caja 13.6 kg (30 lb)' },
      { codigo: 'B91', nombre: 'Papa 3/8 sazonada PXLF', presentacion: 'Caja 13.6 kg (30 lb)' },
      { codigo: '32L', nombre: 'Papa recta 3/8 con cáscara', presentacion: 'Caja 13.6 kg (30 lb)' },
      { codigo: 'C27', nombre: 'Papa gajo sazonada 8 cortes', presentacion: 'Caja 13.6 kg (30 lb)' },
      { codigo: 'C2700', nombre: 'Papa gajo sazonada', presentacion: 'Caja 13.6 kg (30 lb)' },
      { codigo: '12021', nombre: 'Papa ondulada 1/2 extra larga', presentacion: 'Caja 13.6 kg (30 lb)' },
      { codigo: '12045', nombre: 'Thin cut crinkle cut 5/16', presentacion: 'Caja' },
      { codigo: 'D23', nombre: 'Papa crisscut sazonada', presentacion: 'Caja 12.2 kg (27 lb)' },
      { codigo: 'C0034', nombre: 'Papa 1/4 colossal crisp', presentacion: 'Caja 12.2 kg (27 lb)' },
      { codigo: '32Q', nombre: 'Papa steak cut', presentacion: 'Caja 13.6 kg (30 lb)' },
      { codigo: '30H', nombre: 'Papa chips', presentacion: 'Caja 13.6 kg (30 lb)' },
      { codigo: '32N', nombre: 'Papa en cubo', presentacion: 'Caja 16.34 kg' },
      { codigo: '22G', nombre: 'Cáscara de papa', presentacion: 'Caja 6.8 kg (15 lb)' },
      { codigo: 'A26', nombre: 'Tater rounds', presentacion: 'Caja 13.6 kg (30 lb)' },
    ],
    giros: ['alitas-y-boneless', 'hamburgueseria', 'fast-food', 'taqueria', 'bar-y-cantina'],
    pilar: true,
  },
  {
    slug: 'pollo',
    nombre: 'Pollo',
    h1: 'Pollo congelado para restaurante',
    tagline: 'Distribuidor directo de Agrosuper, sin intermediarios.',
    answerFirst:
      'MACSA es distribuidor directo de Agrosuper para pollo congelado, sin intermediarios de por medio. La media pechuga sin piel es el producto de mayor movimiento, y el catálogo cubre boneless natural y enchilado, alitas, tenders, nuggets y pechuga empanizada. Todo IQF, con cadena de frío sin cortes desde el andén hasta tu cocina.',
    anclas: ['distribuidor directo de Agrosuper', 'mayor movimiento', 'cadena de frío sin cortes'],
    marcas: ['Agrosuper', 'Freskecito', 'Bachoco', "Pilgrim's"],
    productos: [
      { codigo: 'PSCH13', nombre: 'Media pechuga de pollo sin piel', presentacion: 'Caja 13 kg' },
      { codigo: 'POL-AGR', nombre: 'Pechuga IQF Agrosuper', presentacion: 'Caja 13 kg' },
      { codigo: 'POL-FN', nombre: 'Freskecito natural Bafar', presentacion: 'Caja 10 kg' },
      { codigo: 'POL-FE', nombre: 'Freskecito enchilado Bafar', presentacion: 'Caja 10 kg' },
      { codigo: 'POL-APC', nombre: 'Ala picosita fully cooked Bachoco', presentacion: 'Caja 12 kg' },
      { codigo: 'ACH13', nombre: 'Ala chilena Agrosuper', presentacion: 'Caja 13 kg' },
      { codigo: 'POL-CP', nombre: 'Cubos de pechuga Bachoco', presentacion: 'Caja 12 kg' },
      { codigo: 'POL-TP', nombre: 'Tender empanizado Bachoco', presentacion: 'Caja 12 kg' },
      { codigo: 'POL-TE', nombre: "Tender empanizado Pilgrim's", presentacion: 'Caja 12 kg' },
      { codigo: 'POL-NP', nombre: "Nugget de pechuga Pilgrim's", presentacion: 'Caja 12 kg' },
      { codigo: 'POL-HP', nombre: "Hamburguesa de pechuga Pilgrim's", presentacion: 'Caja 12 kg' },
      { codigo: 'POL-PP', nombre: "Pechuga picosita Pilgrim's", presentacion: 'Caja 12 kg' },
    ],
    giros: ['alitas-y-boneless', 'fast-food', 'comida-corrida', 'cocina-institucional'],
    pilar: true,
  },
  {
    slug: 'salsas-para-alitas',
    nombre: 'Salsas para alitas',
    h1: 'Salsas para alitas por galón',
    tagline: 'Quince sabores en galón, listos para servir.',
    answerFirst:
      'MACSA distribuye salsas para alitas por galón en quince sabores, de Mr. Wings, Hello Buffalo, La Pócima y Cajun Chef. Del BBQ y el Lemon Pepper al Mango Habanero y el X-Hot, todas en presentación de galón para cocina de alto volumen, con existencia continua del mismo código.',
    anclas: ['por galón en quince sabores', 'cocina de alto volumen', 'existencia continua'],
    marcas: ['Mr. Wings', 'Hello Buffalo', 'La Pócima', 'Cajun Chef'],
    productos: [
      { codigo: 'P071', nombre: 'Salsa Original Hot', presentacion: 'Galón 3.8 L' },
      { codigo: 'P083', nombre: 'Salsa X-Hot', presentacion: 'Galón 3.8 L' },
      { codigo: 'P-0198', nombre: 'Salsa Mango Habanero', presentacion: 'Galón 3.8 L' },
      { codigo: 'P-0199', nombre: 'Salsa Mango Hot', presentacion: 'Galón 3.8 L' },
      { codigo: 'P074', nombre: 'Salsa Habanero Cream', presentacion: 'Galón 3.8 L' },
      { codigo: 'P081', nombre: 'Salsa BBQ Habanero', presentacion: 'Galón 3.8 L' },
      { codigo: 'P075', nombre: 'Salsa Piña Hot', presentacion: 'Galón 3.8 L' },
      { codigo: 'P085', nombre: 'Salsa Cajun', presentacion: 'Galón 3.8 L' },
      { codigo: 'P-0203', nombre: 'Salsa Sriracha', presentacion: 'Galón 3.8 L' },
      { codigo: 'SHBO', nombre: 'Hello Buffalo Original', presentacion: 'Galón 3.54 L' },
      { codigo: 'SHBLP', nombre: 'Hello Buffalo Lemon Pepper', presentacion: 'Galón 3.54 L' },
      { codigo: 'BBQHABANERO', nombre: 'BBQ Habanero Mr. Wings', presentacion: 'Galón 3.8 L' },
      { codigo: 'SAPHOT', nombre: 'Salsa para alitas Hot La Pócima', presentacion: 'Galón' },
      { codigo: 'CAJUNL', nombre: 'Cajun Chef Louisiana Hot Sauce', presentacion: 'Galón' },
    ],
    giros: ['alitas-y-boneless', 'bar-y-cantina', 'fast-food', 'dark-kitchen'],
    pilar: true,
  },
  {
    slug: 'aros-de-cebolla',
    nombre: 'Aros de cebolla',
    h1: 'Aros de cebolla congelados',
    tagline: 'Gourmet, capeado de cerveza y preformado.',
    answerFirst:
      'MACSA maneja aros de cebolla congelados en tres estilos: gourmet de cebolla entera con empanizado tipo panko, capeado de cerveza también de cebolla entera, y preformado de cebolla molida con tamaño uniforme. Todos IQF y en caja, para freidora directa sin descongelar.',
    anclas: ['tres estilos', 'sin descongelar'],
    marcas: ['Lamb Weston'],
    productos: [
      { codigo: '30410', nombre: 'Aro empanizado', presentacion: 'Caja 7.3 kg (16 lb)' },
      { codigo: '30423', nombre: 'Aro de cebolla 5/8', presentacion: 'Caja 4.5 kg (10 lb)' },
      { codigo: '34000', nombre: 'Aro preformado', presentacion: 'Caja 7.3 kg (16 lb)' },
    ],
    giros: ['hamburgueseria', 'bar-y-cantina', 'fast-food'],
    pilar: false,
  },
  {
    slug: 'aderezos',
    nombre: 'Aderezos',
    h1: 'Aderezos para restaurante',
    tagline: 'Ranch, Blue Cheese, César y cuatro más.',
    answerFirst:
      'MACSA distribuye aderezos para food service de VenturaFoods y Ricos: Ranch, Blue Cheese, Miel Mostaza, Ajo Parmesano, Lemon Pepper y César, en las presentaciones de volumen que usa una cocina profesional. Producto de línea con existencia permanente, no saldos ni oportunidades.',
    anclas: ['producto de línea', 'existencia permanente'],
    marcas: ['VenturaFoods', 'Ricos', 'abal'],
    productos: [
      { codigo: 'VNT-RAN', nombre: 'Aderezo Ranch', presentacion: 'Volumen' },
      { codigo: 'RCHC', nombre: 'Aderezo Ranch Culinaire', presentacion: 'Volumen' },
      { codigo: 'VNT-HM', nombre: 'Aderezo miel mostaza', presentacion: 'Volumen' },
      { codigo: 'VNT-MAY', nombre: 'Mayonesa VenturaFoods', presentacion: 'Volumen' },
      { codigo: 'VNT-BBQ', nombre: 'Salsa BBQ VenturaFoods', presentacion: 'Volumen' },
      { codigo: 'RN48', nombre: 'Ricos portion cup 3.5 oz', presentacion: 'Caja' },
    ],
    giros: ['alitas-y-boneless', 'hamburgueseria', 'cafeteria', 'dark-kitchen'],
    pilar: false,
  },
  {
    slug: 'sazonadores',
    nombre: 'Sazonadores',
    h1: 'Sazonadores para alitas y botana',
    tagline: 'Lemon Pepper, Cajun y Fuego, en bote.',
    answerFirst:
      'MACSA maneja sazonadores en bote para alitas y botana: Lemon Pepper, Lemon Pepper Hot, Cajun y Fuego. Se usan sobre producto ya frito para dar sabor sin salsa, y son la base de las alitas secas que hoy piden más los clientes de barra.',
    anclas: ['sin salsa', 'alitas secas'],
    marcas: ['Mr. Wings', 'La Pócima'],
    productos: [
      { codigo: 'P082', nombre: 'Sazonador Lemon Pepper Hot', presentacion: 'Bote 800 g' },
      { codigo: 'P084', nombre: 'Sazonador Fuego', presentacion: 'Bote 800 g' },
      { codigo: 'SCAJUN', nombre: 'Sazonador Cajun', presentacion: 'Bote 650 g' },
    ],
    giros: ['alitas-y-boneless', 'bar-y-cantina'],
    pilar: false,
  },
  {
    slug: 'condimentos-heinz',
    nombre: 'Condimentos Heinz',
    h1: 'Condimentos Heinz para food service',
    tagline: 'Línea completa: sobre, botella, pouch y cubeta.',
    answerFirst:
      'MACSA distribuye la línea completa de condimentos Heinz para food service: catsup en sobre, botella y pouch; mayonesa en cubeta, botella y sachet, incluida la de limón; mostaza en botella, pouch y sobre; más jalapeño, BBQ y Tabasco. La presentación se elige según si el consumo es de mesa, de barra o de cocina.',
    anclas: ['línea completa', 'de mesa, de barra o de cocina'],
    marcas: ['Heinz'],
    productos: [
      { codigo: 'HZ-CAT', nombre: 'Catsup Heinz', presentacion: 'Sobre, botella y pouch' },
      { codigo: 'HZ-MAY', nombre: 'Mayonesa Heinz', presentacion: 'Cubeta, botella y sachet' },
      { codigo: 'HZ-MOS', nombre: 'Mostaza Heinz', presentacion: 'Botella, pouch y sobre' },
      { codigo: 'HZ-JAL', nombre: 'Jalapeño Heinz', presentacion: 'Caja 500 sobres 8 g' },
      { codigo: 'HZ-BBQ', nombre: 'Salsa BBQ Heinz', presentacion: 'Volumen' },
      { codigo: 'HZ-TAB', nombre: 'Salsa Tabasco roja', presentacion: 'Caja 24 botellas 60 ml' },
    ],
    giros: ['fast-food', 'hamburgueseria', 'comida-corrida', 'cafeteria', 'hotel'],
    pilar: false,
  },
  {
    slug: 'aceite-para-freir',
    nombre: 'Aceite para freír',
    h1: 'Aceite para freidora de restaurante',
    tagline: 'King Fry y Golden Chef, en bidón.',
    answerFirst:
      'MACSA distribuye aceite para freidora en bidón: King Fry y Golden Chef. El equipo recomienda King Fry porque es parcialmente hidrogenado, se convierte en manteca en frío y da mayor rendimiento y durabilidad en la freidora — menos cambios de aceite por semana.',
    anclas: ['mayor rendimiento y durabilidad', 'menos cambios de aceite'],
    marcas: ['King Fry', 'Golden Chef'],
    productos: [
      { codigo: 'KF101', nombre: 'Aceite King Fry', presentacion: 'Bidón 20 litros' },
      { codigo: 'GCH', nombre: 'Aceite Golden Chef', presentacion: 'Bidón' },
    ],
    giros: ['alitas-y-boneless', 'fast-food', 'hamburgueseria', 'taqueria'],
    pilar: false,
  },
  {
    slug: 'carne-y-hamburguesa',
    nombre: 'Carne y hamburguesa',
    h1: 'Carne y carne para hamburguesa congelada',
    tagline: 'UGASA y Smithfield.',
    answerFirst:
      'MACSA maneja carne y carne para hamburguesa congelada de UGASA y Smithfield, en las presentaciones de volumen que usa una cocina de alta rotación. Producto de línea con existencia continua y cadena de frío sin cortes desde el andén refrigerado hasta la entrega.',
    anclas: ['alta rotación', 'existencia continua'],
    marcas: ['UGASA', 'Smithfield'],
    productos: [],
    giros: ['hamburgueseria', 'fast-food', 'taqueria', 'comida-corrida'],
    pilar: false,
  },
  {
    slug: 'appetizers-y-quesos',
    nombre: 'Appetizers y quesos',
    h1: 'Appetizers y quesos congelados',
    tagline: 'Poppers, dedos de queso y muncher.',
    answerFirst:
      'MACSA distribuye appetizers y quesos congelados de Comarco y Sargento: jalapeño poppers con crema, muncher de jalapeño con queso cheddar y dedos de queso. Son los productos de entrada que más margen dejan en barra, y todos van de la caja a la freidora sin preparación previa.',
    anclas: ['más margen dejan en barra', 'sin preparación previa'],
    marcas: ['Comarco', 'Sargento'],
    productos: [
      { codigo: '7617', nombre: 'Jalapeño poppers cream', presentacion: 'Caja' },
      { codigo: 'P38', nombre: 'Muncher jalapeño queso cheddar', presentacion: 'Caja 8.2 kg (18 lb)' },
    ],
    giros: ['bar-y-cantina', 'alitas-y-boneless', 'hamburgueseria'],
    pilar: false,
  },
  {
    slug: 'verduras-y-elote',
    nombre: 'Verduras y elote',
    h1: 'Verduras congeladas y elote',
    tagline: 'Elote entero, en mitades y desgranado.',
    answerFirst:
      'MACSA maneja verduras congeladas de Twin City Foods y elote en tres presentaciones: entero de 48 piezas, en mitades de 96 piezas y desgranado. Todo IQF, así que se toma la porción exacta que se necesita sin descongelar la caja completa.',
    anclas: ['porción exacta', 'sin descongelar la caja completa'],
    marcas: ['Twin City Foods'],
    productos: [
      { codigo: 'EE48', nombre: 'Elote entero 48 piezas', presentacion: 'Caja' },
      { codigo: 'EM96', nombre: 'Elote mitades 96 piezas', presentacion: 'Caja' },
      { codigo: 'EED', nombre: 'Elote desgranado', presentacion: 'Caja' },
      { codigo: 'CHZ', nombre: 'Chícharo con zanahoria', presentacion: '12/40 oz' },
    ],
    giros: ['comida-corrida', 'cocina-institucional', 'hotel', 'food-truck'],
    pilar: false,
  },
  {
    slug: 'panaderia',
    nombre: 'Panadería',
    h1: "Pan para hamburguesa Martin's",
    tagline: "Martin's Famous Potato Rolls, importado.",
    answerFirst:
      'MACSA es distribuidor directo de Martin’s, la panadería importada de Estados Unidos, sin intermediarios. Los Potato Rolls son el pan que usan las hamburgueserías que compiten por producto y no por precio: miga suave, corteza que aguanta la salsa y tamaño consistente caja tras caja.',
    anclas: ['distribuidor directo de Martin’s', 'tamaño consistente'],
    marcas: ["Martin's Famous Potato Rolls"],
    productos: [
      { codigo: 'MPP', nombre: 'Potato roll', presentacion: 'Caja' },
      { codigo: 'PHS', nombre: 'Potato roll sliders', presentacion: 'Caja' },
      { codigo: 'PHM', nombre: 'Potato roll mediano', presentacion: 'Caja' },
      { codigo: 'PGD', nombre: 'Pan gourmet', presentacion: 'Caja' },
    ],
    giros: ['hamburgueseria', 'dark-kitchen', 'food-truck'],
    pilar: false,
  },
  {
    slug: 'toppings-para-pizza',
    nombre: 'Toppings para pizza',
    h1: 'Toppings para pizza congelados',
    tagline: 'Paradiso.',
    answerFirst:
      'MACSA distribuye toppings para pizza de Paradiso, congelados y listos para montar. Producto de línea con existencia permanente: el mismo código está disponible cada vez que se vuelve a pedir, que es lo que necesita una pizzería para no cambiar de receta a mitad de temporada.',
    anclas: ['listos para montar', 'no cambiar de receta'],
    marcas: ['Paradiso'],
    productos: [],
    giros: ['pizzeria', 'dark-kitchen'],
    pilar: false,
  },
  {
    slug: 'postres-y-churros',
    nombre: 'Postres y churros',
    h1: 'Postres y churros congelados',
    tagline: 'Churros y molten cake.',
    answerFirst:
      'MACSA maneja postres y churros congelados listos para freír u hornear. Es la línea que convierte una cuenta promedio en una cuenta con postre sin agregar un solo minuto de preparación en cocina ni contratar repostería.',
    anclas: ['listos para freír u hornear', 'sin agregar un solo minuto'],
    marcas: ['SolChurros', 'RD'],
    productos: [],
    giros: ['comida-corrida', 'cafeteria', 'hotel', 'fast-food'],
    pilar: false,
  },
]

export const familia = (slug: string) => FAMILIAS.find((f) => f.slug === slug)
export const PILARES = FAMILIAS.filter((f) => f.pilar)

/** Description de 120–160 caracteres, cortada en frontera de palabra. */
export function metaDesc(f: Familia): string {
  const texto = f.answerFirst.replace(/\s+/g, ' ').trim()
  if (texto.length <= 158) return texto
  const corte = texto.slice(0, 158)
  return corte.slice(0, corte.lastIndexOf(' ')) + '…'
}
