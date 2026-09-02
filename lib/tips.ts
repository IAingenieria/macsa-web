/**
 * La serie de videos de tips para cocina.
 *
 * Son piezas verticales de ~30 s producidas en el proyecto TVMultimedia
 * (`VIDEOS TVMultiedia/MACSA/Video Ads Ventas`). Los guiones salen de dos
 * bases de conocimiento: el manual «Papas USA» de Potatoes USA y las
 * cátedras de Ray Rico y Edgar Mayén.
 *
 * ⚠️ REGLA DE ORO HEREDADA DEL PROYECTO DE VIDEO: si un dato no está en una
 * de esas dos bases, no se locuta. Aquí aplica igual — el texto de cada
 * página es el guion, no una versión inventada.
 *
 * ✅ Edgar Mayén aprobó el uso del logo y la placa de cierre de Lamb Weston
 * (2026-08-29). Era lo único que bloqueaba la publicación de las dos tandas.
 *
 * La serie está completa: los 11 videos producidos, los 11 publicados.
 * Quedan 23 ideas del catálogo sin producir.
 */

const CDN = 'https://res.cloudinary.com/cd1ept1i/video/upload'

export interface Tip {
  n: number
  slug: string
  titulo: string
  /** El gancho: la primera línea de la locución. Es el Answer-First. */
  gancho: string
  /** Qué problema de operación resuelve */
  dolor: string
  /** A quién va dirigido */
  publico: string
  /** De dónde sale el dato */
  fuente: string
  /** Los puntos del guion, en orden */
  puntos: string[]
  segundos: number
  /** Ruta del archivo en Cloudinary (versión + nombre, sin extensión) */
  archivo: string
  /** Familias y anclas donde este consejo se muestra */
  relacionado: string[]
}

export const TIPS: Tip[] = [
  {
    n: 1,
    slug: 'la-papa-fria-no-miente',
    titulo: 'La papa fría no miente',
    gancho: '¿Quieres saber si tu papa es buena? Déjala enfriar.',
    dolor: 'Comprar por precio sin tener forma de juzgar la calidad.',
    publico: 'Dueño y chef ejecutivo',
    fuente: 'Edgar Mayén, Lamb Weston',
    puntos: [
      'Una papa mala, cuando se enfría, te sabe a aceite. Nada más.',
      'Una papa de calidad se enfría y sigue sabiendo a papa.',
      'Hazlo hoy con la que ya compras: déjala cinco minutos y pruébala.',
    ],
    segundos: 28,
    archivo: 'v1788049134/tip01-la-papa-fria-no-miente-envio',
    relacionado: ['papa-a-la-francesa', 'papa-3-8', 'papa-crisscut'],
  },
  {
    n: 2,
    slug: 'no-llenes-la-canastilla',
    titulo: 'Por qué no debes llenar la canastilla',
    gancho: 'Vas contra el tiempo y llenas la canastilla hasta arriba.',
    dolor: 'Inconsistencia del plato y rotación de personal. Es el error más común de todos.',
    publico: 'Cocinero de línea y ayudante',
    fuente: 'Manual Papas USA p. 19 y Ray Rico',
    puntos: [
      'Ese golpe de frío tumba la temperatura del aceite: las papas se pegan, se fríen disparejo y salen grasosas.',
      'Llénala sólo hasta la mitad.',
      'Y antes de meterla, sacúdela lejos del aceite para tirar la escarcha.',
      'Misma papa, otro resultado.',
    ],
    segundos: 30,
    archivo: 'v1788049133/tip02-por-que-no-debes-llenar-la-canastilla-envio',
    relacionado: ['papa-a-la-francesa', 'aceite-para-freir', 'aceite-para-freidora'],
  },
  {
    n: 3,
    slug: 'la-prueba-del-pan',
    titulo: 'La prueba del pan',
    gancho: '¿Tu aceite ya se fue? Un pedazo de pan te lo dice.',
    dolor: 'Aceite que ya cambió el sabor de todo lo que sale de la cocina, y nadie lo nota hasta la queja.',
    publico: 'Chef ejecutivo y encargado de turno',
    fuente: 'Manual Papas USA p. 25',
    puntos: [
      'Mete un trozo de pan al aceite. Sácalo y míralo.',
      'Si no sale claro y no huele a pan recién hecho, ese aceite ya le está cambiando el sabor a todo lo que fríes.',
      'Tres segundos. Y no te cuesta nada.',
    ],
    segundos: 27,
    archivo: 'v1788049133/tip03-la-prueba-del-pan-envio',
    relacionado: ['aceite-para-freir', 'aceite-para-freidora', 'papa-a-la-francesa'],
  },
  {
    n: 4,
    slug: 'un-metro-de-caida',
    titulo: 'Un metro de caída',
    gancho: 'Trátalas como huevos de cascarón.',
    dolor: 'Merma invisible y quejas de calidad que en realidad son de manejo.',
    publico: 'Almacén, chofer y quien recibe la mercancía',
    fuente: 'Manual Papas USA p. 16 y Ray Rico',
    puntos: [
      'Una caída de un metro basta para romper la papa dentro de la caja.',
      'La papa quebrada se fríe disparejo y se vuelve merma que nadie contabiliza.',
      'La queja llega como «calidad» cuando en realidad fue manejo.',
    ],
    segundos: 28,
    archivo: 'v1788049133/tip04-un-metro-de-caida-envio',
    relacionado: ['papa-a-la-francesa', 'papa-3-8'],
  },
  {
    n: 5,
    slug: 'nunca-sales-sobre-la-freidora',
    titulo: 'Nunca sales sobre la freidora',
    gancho: 'Un gesto de dos segundos te arruina el aceite de toda la jornada.',
    dolor: 'El aceite de todo el día echado a perder por una costumbre.',
    publico: 'Cocinero de línea y ayudante',
    fuente: 'Manual Papas USA p. 20 y Ray Rico',
    puntos: [
      'La sal cae al aceite y acelera su degradación.',
      'Sala siempre fuera, sobre la mesa de retención, nunca encima de la tina.',
      'Es gratis y te alarga la vida del aceite.',
    ],
    segundos: 27,
    archivo: 'v1788049133/tip05-nunca-sales-sobre-la-freidora-envio',
    relacionado: ['aceite-para-freir', 'aceite-para-freidora', 'papa-a-la-francesa'],
  },
  {
    n: 6,
    slug: 'la-papa-barata-sale-cara',
    titulo: 'La papa barata sale cara',
    gancho: 'Decides la compra por el precio de la caja y no por el costo por porción.',
    dolor: 'Comparar cajas en vez de comparar el costo de cada orden que sirves.',
    publico: 'El dueño',
    fuente: 'Edgar Mayén, Ray Rico y manual Papas USA p. 8',
    puntos: [
      'Una caja 10 % más cara puede rendirte 10 % más porciones.',
      'Lo que importa no es lo que pagas por la caja: es lo que te cuesta la orden que vendes.',
      'Saca la cuenta con las dos y compara el costo por porción, no el precio de lista.',
    ],
    segundos: 30,
    archivo: 'v1788049133/tip06-la-papa-barata-sale-cara-envio',
    relacionado: ['papa-a-la-francesa', 'papa-3-8', 'papa-crisscut', 'papa-con-cobertura'],
  },
  {
    n: 7,
    slug: 'nunca-la-frias-descongelada',
    titulo: 'Nunca la frías descongelada',
    gancho: 'Sacaste la bolsa y la dejaste afuera para que se ablande.',
    dolor: 'Creer que descongelar acelera el freído, cuando duplica el consumo de aceite.',
    publico: 'Dueño y chef',
    fuente: 'Estudio de la UNAM citado en la base de conocimiento',
    puntos: [
      'La papa descongelada se chupa el aceite y le quita la mitad de vida a tu tina.',
      'Esto no es opinión: lo midió la UNAM.',
      'Frita congelada, tu aceite rinde el doble y la papa absorbe hasta 80 % menos grasa.',
      'Del congelador, directo al aceite. Nunca antes.',
    ],
    segundos: 30,
    archivo: 'v1788049101/tip07-nunca-la-frias-descongelada-envio',
    relacionado: ['papa-a-la-francesa', 'aceite-para-freir', 'aceite-para-freidora'],
  },
  {
    n: 8,
    slug: '177-grados',
    titulo: '177 grados, no «cuando ya está caliente»',
    gancho: 'La freidora no está lista cuando se ve caliente: está lista a 177 grados.',
    dolor: 'Freír a ojo, con la temperatura que resulte.',
    publico: 'Cocinero de línea',
    fuente: 'Manual Papas USA',
    puntos: [
      'Por debajo de esa temperatura la papa se cuece en vez de sellarse, y se llena de aceite.',
      'Por encima se dora por fuera y queda cruda por dentro.',
      '177 grados centígrados. Medidos, no calculados.',
    ],
    segundos: 30,
    archivo: 'v1788049101/tip08-177-grados-no-cuando-ya-esta-caliente-envio',
    relacionado: ['papa-a-la-francesa', 'aceite-para-freir', 'aceite-para-freidora'],
  },
  {
    n: 9,
    slug: 'el-termometro-va-entre-dos-bolsas',
    titulo: 'El termómetro va entre dos bolsas',
    gancho: 'Medir la temperatura clavando el termómetro en la bolsa no sirve.',
    dolor: 'Recibir producto sin saber si de verdad llegó en frío.',
    publico: 'Almacén y quien recibe',
    fuente: 'Manual Papas USA y Ray Rico',
    puntos: [
      'Perforar la bolsa arruina el producto y te da una lectura del aire, no de la papa.',
      'El termómetro va entre dos bolsas, en el centro de la estiba.',
      'Ahí es donde se sabe si la cadena de frío aguantó.',
    ],
    segundos: 30,
    archivo: 'v1788049101/tip09-el-termometro-va-entre-dos-bolsas-envio',
    relacionado: ['papa-a-la-francesa'],
  },
  {
    n: 10,
    slug: 'cortes-que-llenan-mas-el-plato',
    titulo: 'Cortes que llenan más el plato',
    gancho: 'Mismo peso. Y el plato se ve a la mitad.',
    dolor: 'Servir la misma porción en gramos y que el plato se vea pobre.',
    publico: 'El dueño',
    fuente: 'Catálogo de cortes Lamb Weston',
    puntos: [
      'El corte recto es el de siempre: cubre lo que cubre.',
      'La rejita cubre más superficie con los mismos gramos.',
      'La espiral llena el plato y se ve al doble.',
      'El gajo se ve abundante y aguanta más tiempo caliente.',
      'El rizado atrapa más sazón y más salsa.',
      'Más porciones por bolsa. Más plato por orden.',
    ],
    segundos: 30,
    archivo: 'v1788049101/tip10-cortes-que-llenan-mas-el-plato-envio',
    relacionado: [
      'papa-a-la-francesa',
      'papa-gajo',
      'papa-crisscut',
      'papa-3-8',
      'papa-5-16',
      'papa-1-4',
    ],
  },
  {
    n: 11,
    slug: 'la-papa-no-es-papa-es-la-region',
    titulo: 'La papa no es papa: es la región',
    gancho: '«La papa es papa». No.',
    dolor: 'Creer que todas las papas congeladas son intercambiables.',
    publico: 'El dueño',
    fuente: 'Edgar Mayén, Lamb Weston',
    puntos: [
      'Como el café, la papa tiene su latitud.',
      'La nuestra es de Washington y Oregon: suelo volcánico y agua de deshielo del río Columbia.',
      'Sol hasta las once de la noche y noches frías. Por eso suelta agua.',
      'Eso es lo que hace que quede densa y no aguada.',
    ],
    segundos: 30,
    archivo: 'v1788049101/tip11-la-papa-no-es-papa-es-la-region-envio',
    relacionado: ['papa-a-la-francesa', 'papa-3-8', 'papa-con-cobertura'],
  },
]

export const tip = (slug: string) => TIPS.find((t) => t.slug === slug)

export const videoUrl = (t: Tip) => `${CDN}/${t.archivo}.mp4`

/** Cloudinary saca la miniatura del video cambiando la extensión. */
export const posterUrl = (t: Tip, ancho = 800) =>
  `${CDN}/so_2,w_${ancho},c_fill,q_auto,f_auto/${t.archivo}.jpg`

/** Los consejos que aplican a una familia o a un producto ancla. */
export const tipsDe = (slug: string) => TIPS.filter((t) => t.relacionado.includes(slug))
