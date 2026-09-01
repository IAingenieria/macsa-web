import type { Familia } from './familias'
import { faqBase } from './faq'

/**
 * Contenido de PILAR para las familias que no tienen página escrita a mano.
 *
 * Cada una lleva su guía de elección —la sección que gana la búsqueda
 * informacional, «qué corte uso para…»— y preguntas propias del producto.
 * Todo sale de la base de conocimiento; nada se inventa.
 *
 * ⚠️ Estas familias NO generan páginas por ciudad. El eje geográfico son los
 * PRODUCTOS ANCLA (`lib/anclas.ts`), elegidos por facturación real. Cruzar
 * también las 14 familias duplicaría intención y las páginas competirían
 * entre sí por la misma búsqueda.
 */

export interface Guia {
  titulo: string
  texto: string
  filas: { cuando: string; usa: string }[]
}

interface Contenido {
  guia: Guia
  preguntas: { p: string; r: string }[]
}

const CONTENIDO: Record<string, Contenido> = {
  'aros-de-cebolla': {
    guia: {
      titulo: 'Qué aro pedir según tu barra',
      texto: 'Los tres estilos se ven distinto en el plato y se comportan distinto en la freidora.',
      filas: [
        { cuando: 'Quiere porción pareja y costo predecible', usa: 'Preformado 34000' },
        { cuando: 'Vende el aro como producto premium', usa: 'Gourmet empanizado 30410' },
        { cuando: 'Busca capeado grueso estilo cantina', usa: 'Capeado de cerveza 30423' },
      ],
    },
    preguntas: [
      {
        p: '¿Cuál es la diferencia entre el aro preformado y el de cebolla entera?',
        r: 'El preformado se hace con cebolla molida, así que cada aro sale del mismo tamaño y tu porción no varía. El de cebolla entera es aro real cortado: se ve mejor y sabe más a cebolla, pero los tamaños son irregulares por naturaleza.',
      },
      {
        p: '¿Se pueden freír junto con la papa?',
        r: 'Se puede, pero el empanizado suelta y ensucia el aceite más rápido. Si vendes volumen de los dos, conviene canasta aparte para que el aceite dure más.',
      },
    ],
  },

  aderezos: {
    guia: {
      titulo: 'Qué aderezo lleva cada cosa',
      texto: 'La regla de barra: un aderezo cremoso, uno dulce y uno ácido cubren casi todo.',
      filas: [
        { cuando: 'Vende alitas y boneless', usa: 'Ranch RCHC y Blue Cheese' },
        { cuando: 'Vende ensaladas y wraps', usa: 'César y Ranch' },
        { cuando: 'Quiere un dulce para empanizados', usa: 'Miel mostaza VNT-HM' },
        { cuando: 'Necesita base para salsas de la casa', usa: 'Mayonesa Wilsey MAY378' },
      ],
    },
    preguntas: [
      {
        p: '¿En qué presentación vienen?',
        r: 'En volumen para cocina: galón de 3.78 litros y medio galón, según el aderezo. Para servicio de mesa está el portion cup de Ricos en caja de 48 piezas.',
      },
      {
        p: '¿Necesitan refrigeración?',
        r: 'Los aderezos y la mayonesa se manejan refrigerados. La entrega llega en unidad refrigerada, igual que el congelado.',
      },
    ],
  },

  sazonadores: {
    guia: {
      titulo: 'Cuál sazonador para qué',
      texto: 'Los sazonadores se ponen sobre producto ya frito. Es la forma más barata de tener más sabores en la carta sin comprar más salsa.',
      filas: [
        { cuando: 'Vende alitas secas', usa: 'Lemon Pepper y Lemon Pepper Hot P082' },
        { cuando: 'Quiere un sabor con carácter', usa: 'Cajun SCAJUN' },
        { cuando: 'Busca lo más picante', usa: 'Fuego P084' },
        { cuando: 'Sazona papa o botana', usa: 'Cualquiera de los tres, espolvoreado en caliente' },
      ],
    },
    preguntas: [
      {
        p: '¿Cuánto rinde un bote?',
        r: 'Los botes son de 650 a 800 gramos según el sazonador. El rendimiento depende de qué tan cargado lo sirvas, pero es la forma más barata de agregar un sabor a la carta.',
      },
      {
        p: '¿Se puede usar antes de freír?',
        r: 'No conviene: el sazonador se quema en el aceite y lo ensucia. Va sobre el producto ya frito y todavía caliente, para que se adhiera.',
      },
    ],
  },

  'condimentos-heinz': {
    guia: {
      titulo: 'Qué presentación de Heinz te conviene',
      texto: 'La presentación no es preferencia: depende de dónde se consume el condimento.',
      filas: [
        { cuando: 'Vende para llevar y a domicilio', usa: 'Sobre de 9 g — C1008' },
        { cuando: 'Tiene dispensador en mostrador', usa: 'Pouch de 3 kg — CP6' },
        { cuando: 'Pone el condimento en la mesa', usa: 'Botella' },
        { cuando: 'Lo usa como insumo de cocina', usa: 'Cubeta' },
      ],
    },
    preguntas: [
      {
        p: '¿Manejan la línea completa de Heinz?',
        r: 'Sí: catsup en sobre, botella y pouch; mayonesa en cubeta, botella y sachet, incluida la de limón; mostaza en botella, pouch y sobre; más jalapeño, BBQ y Tabasco.',
      },
      {
        p: '¿Cuántos sobres trae una caja?',
        r: 'La caja de jalapeño trae 500 sobres de 8 gramos, y la de catsup en sobre viene en presentación de 9 gramos. Te confirmamos la cuenta exacta del código que necesites al cotizar.',
      },
    ],
  },

  'aceite-para-freir': {
    guia: {
      titulo: 'Cuál aceite y cada cuándo cambiarlo',
      texto: 'El aceite se compra por rendimiento, no por litro: el más barato por bidón suele salir más caro al mes.',
      filas: [
        { cuando: 'Fríe todo el día, alto volumen', usa: 'King Fry — más ciclos por bidón' },
        { cuando: 'Fríe por turnos o volumen medio', usa: 'Golden Chef' },
        { cuando: 'Fríe empanizado y papa en la misma tina', usa: 'King Fry, aguanta mejor el residuo' },
      ],
    },
    preguntas: [
      {
        p: '¿Por qué recomiendan King Fry?',
        r: 'Porque es parcialmente hidrogenado: se convierte en manteca en frío y aguanta más ciclos de fritura antes de degradarse. Eso se traduce en menos cambios de aceite por semana, que es donde está el ahorro real.',
      },
      {
        p: '¿En qué presentación viene?',
        r: 'King Fry en bidón de 20 litros. Golden Chef también en bidón. Son las presentaciones de cocina; no manejamos formato de menudeo.',
      },
    ],
  },

  'carne-y-hamburguesa': {
    guia: {
      titulo: 'Qué carne para qué producto',
      texto: 'Lo que decide no es el corte: es el gramaje y qué tan parejo tiene que salir cada plato.',
      filas: [
        { cuando: 'Vende hamburguesa de menú fijo', usa: 'Carne preformada — porción pareja' },
        { cuando: 'Arma su propia mezcla', usa: 'Carne molida a granel' },
        { cuando: 'Necesita producto de cadena de frío larga', usa: 'Congelado, interfoliado con papel' },
      ],
    },
    preguntas: [
      {
        p: '¿Qué marcas manejan?',
        r: 'UGASA y Smithfield, en las presentaciones de volumen que usa una cocina de alta rotación.',
      },
      {
        p: '¿Llega congelada?',
        r: 'Sí, con cadena de frío sin cortes desde el andén refrigerado hasta la entrega. Todas las unidades de reparto tienen refrigeración y congelación.',
      },
    ],
  },

  'appetizers-y-quesos': {
    guia: {
      titulo: 'Qué entrada poner en la carta',
      texto: 'Las entradas son el renglón de mayor margen de una barra, y ninguna de estas necesita preparación previa.',
      filas: [
        { cuando: 'Quiere la entrada más pedida', usa: 'Dedos de queso DQS o mozzarella sticks 3412' },
        { cuando: 'Busca algo picante para botanear', usa: 'Muncher de jalapeño con cheddar P38' },
        { cuando: 'Vende nachos o papas con queso', usa: 'Queso cheddar en bolsa RB4011' },
        { cuando: 'Quiere porción individual para llevar', usa: 'Ricos portion cup RN48' },
      ],
    },
    preguntas: [
      {
        p: '¿Los appetizers necesitan preparación?',
        r: 'No. Van de la caja a la freidora, congelados. Es su ventaja: no ocupan mano de obra de cocina y salen en minutos.',
      },
      {
        p: '¿Cuál es el de mayor rotación?',
        r: 'El muncher de jalapeño con queso cheddar y los dedos de queso. Los dos están entre los productos que más factura la casa.',
      },
    ],
  },

  'verduras-y-elote': {
    guia: {
      titulo: 'Qué presentación de elote conviene',
      texto: 'Al ser IQF puedes sacar la porción exacta sin descongelar la caja completa, así que la presentación se elige por cómo lo sirves.',
      filas: [
        { cuando: 'Vende elote entero como guarnición', usa: 'Entero 48 piezas — EE48' },
        { cuando: 'Sirve media pieza en plato fuerte', usa: 'Mitades 96 piezas — EM96' },
        { cuando: 'Lo usa dentro de un guisado o ensalada', usa: 'Desgranado — EED' },
        { cuando: 'Necesita mezcla de verdura', usa: 'Chícharo con zanahoria — CHZ' },
      ],
    },
    preguntas: [
      {
        p: '¿Hay que descongelar la verdura?',
        r: 'No. Es IQF, congelada pieza por pieza, así que puedes tomar la cantidad exacta que necesitas y el resto se queda congelado sin apelmazarse.',
      },
      {
        p: '¿El elote viene cocido?',
        r: 'Llega congelado y listo para calentar. Te confirmamos el detalle del código exacto que pidas al cotizar.',
      },
    ],
  },

  panaderia: {
    guia: {
      titulo: "Qué pan Martin's para qué hamburguesa",
      texto: 'El pan es lo que más se nota y lo que menos se cambia una vez que el cliente lo probó.',
      filas: [
        { cuando: 'Hamburguesa de tamaño estándar', usa: 'Potato roll PHM o PHM5' },
        { cuando: 'Vende sliders o mini burgers', usa: 'Slider PM12' },
        { cuando: 'Tiene hot dogs en la carta', usa: 'Long roll PGD' },
        { cuando: 'Quiere pan dulce para postre o brunch', usa: 'Sweet party rolls MPP' },
      ],
    },
    preguntas: [
      {
        p: '¿Por qué Martin’s y no un pan local?',
        r: 'Porque el tamaño y la miga son consistentes caja tras caja, y la corteza aguanta la salsa sin deshacerse. Es el pan de las hamburgueserías que compiten por producto y no por precio. Somos distribuidor directo, sin intermediarios.',
      },
      {
        p: '¿Llega congelado o fresco?',
        r: 'Es producto importado y viaja en cadena de frío. Te confirmamos el manejo del código específico al cotizar.',
      },
    ],
  },

  'toppings-para-pizza': {
    guia: {
      titulo: 'Cómo elegir el topping',
      texto: 'En pizza lo que importa es que el mismo código esté disponible siempre: cambiar de topping a media temporada te cambia la receta.',
      filas: [
        { cuando: 'Monta pizza clásica', usa: 'Pepperoni Paradiso' },
        { cuando: 'Busca sabor más fuerte', usa: 'Salchicha italiana Paradiso' },
        { cuando: 'Necesita la base', usa: 'Salsa para pizza' },
        { cuando: 'Sirve pizza con picante en mesa', usa: 'Chile quebrado Heinz' },
        { cuando: 'Quiere agregar entradas a la carta', usa: 'Dedos de queso y munchers horneables' },
        { cuando: 'Vende papa como guarnición', usa: 'Papa 3/8 o crisscut' },
      ],
    },
    preguntas: [
      {
        p: '¿Qué toppings para pizza manejan?',
        r: 'Pepperoni y salchicha italiana de Paradiso, además de la salsa para pizza y el chile quebrado Heinz para la mesa. Producto de línea con existencia permanente: el mismo código está disponible cada vez que lo vuelves a pedir.',
      },
      {
        p: '¿Puedo pedir también las entradas en el mismo pedido?',
        r: 'Sí. Los dedos de queso de Sargento y los munchers rellenos son horneables, así que salen del mismo horno de la pizza sin ocupar la freidora, y viajan en la misma entrega.',
      },
    ],
  },

  'postres-y-churros': {
    guia: {
      titulo: 'Qué postre agregar sin contratar repostería',
      texto: 'Todos van de la caja a la freidora o al horno. Es el renglón que sube la cuenta promedio sin agregar un minuto de preparación.',
      filas: [
        { cuando: 'Quiere el postre de mayor rotación', usa: 'Churros' },
        { cuando: 'Busca postre de plato con presentación', usa: 'Molten cake' },
        { cuando: 'Vende para llevar', usa: 'Churros — aguanta el traslado' },
      ],
    },
    preguntas: [
      {
        p: '¿Necesito equipo especial?',
        r: 'No. Los churros van a la misma freidora que ya tienes y el molten al horno. Por eso es la línea más fácil de agregar a una carta que no tiene postre.',
      },
      {
        p: '¿Vienen porcionados?',
        r: 'Sí, congelados pieza por pieza, así que sacas la cantidad exacta que vas a vender ese día.',
      },
    ],
  },
}

export const guiaDe = (slug: string): Guia | undefined => CONTENIDO[slug]?.guia

export function preguntasDe(f: Familia) {
  const propias = CONTENIDO[f.slug]?.preguntas ?? []
  return [...propias, ...faqBase(f)]
}
