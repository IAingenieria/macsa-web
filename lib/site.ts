/**
 * Datos maestros del sitio.
 * Fuente: base de conocimiento de MacsaIA (member/kb/01-quienes-somos.md,
 * 03-otras-categorias.md, 04-entregas-y-cadena-de-frio.md).
 * Nada aquí se inventa: si un dato no está confirmado, no aparece en el sitio.
 */

/**
 * Prefijo de ruta. En GitHub Pages el sitio vive en /macsa-web, en Cloudflare
 * en la raiz. `next/link` lo agrega solo, pero un <img src> NO: hay que
 * anteponerlo a mano o la imagen da 404 en Pages y en ningun otro lado.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** Ruta a un archivo de public/, con el prefijo correcto. */
export const asset = (ruta: string) => `${BASE_PATH}${ruta}`

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://macsa-web.shy-block-053a.workers.dev'

/** Mientras el sitio viva en un dominio provisional va noindex + Disallow. */
export const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX !== '0'

export const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? ''

/**
 * Google Analytics 4 (2-oct-2026), directo y sin Tag Manager.
 * El ID sólo se pone en el build de producción (`construir-dominio.yml`); la
 * copia de GitHub Pages y cualquier build con noindex no miden. El aviso de
 * privacidad menciona Google Analytics sólo cuando esto es verdadero.
 */
const GA4_CRUDO = process.env.NEXT_PUBLIC_GA4_ID ?? ''
export const GA4_ID = !NOINDEX && /^G-[A-Z0-9]{4,20}$/.test(GA4_CRUDO) ? GA4_CRUDO : ''

/**
 * URL del widget de MacsaIA (Forja sirve `/widget.js`).
 * Vacia hasta que se active el canal web en el bot de produccion.
 */
export const BOT_WIDGET = process.env.NEXT_PUBLIC_BOT_WIDGET ?? ''

export const EMPRESA = {
  nombre: 'MACSA Foodservice',
  razonSocial: 'Macsa de la Sultana, S.A. de C.V.',
  claim: 'La mejor calidad del mercado la encuentras aquí.',
  descripcion:
    'Distribuidor de alimentos congelados y abarrotes para food service en Monterrey y su área metropolitana. Distribuidor oficial de Lamb Weston, y distribuidor directo de Agrosuper y de Martin’s.',
  direccion: {
    calle: 'América del Norte 202-B',
    colonia: 'Las Américas',
    ciudad: 'Guadalupe',
    estado: 'Nuevo León',
    estadoCorto: 'NL',
    pais: 'MX',
    /** C.P. de la ficha verificada de Google (2-oct-2026). */
    cp: '67128',
  },
  /**
   * Horario y fecha de apertura tal como están en el Perfil de Negocio de
   * Google (verificado, 2-oct-2026). Google cruza la ficha con el sitio: si
   * cambian allá, se cambian aquí.
   */
  horario: [
    { dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], etiqueta: 'Lunes a jueves', abre: '08:30', cierra: '17:00' },
    { dias: ['Friday'], etiqueta: 'Viernes', abre: '09:00', cierra: '17:00' },
    { dias: ['Saturday'], etiqueta: 'Sábado', abre: '09:00', cierra: '13:00' },
  ],
  fundacion: '2018-03-04',
  /** Ficha de Google Maps (Macsa de la Sultana, verificada). Va en `sameAs`. */
  perfilGoogle: 'https://maps.google.com/?cid=16059455057004438297',
  /**
   * Luis, 2-oct-2026: "hay un solo número para llamadas de clientes +52 871 501
   * 5117" (el mismo del WhatsApp; distinto al WhatsApp del bot de Forja). Los
   * fijos 81 2209 2277 y 81 2254 2834 salieron del sitio.
   */
  telefonos: ['+52 871 501 5117'],
  /**
   * Un solo celular/WhatsApp para todo el sitio. Luis, 29-sep-2026: "el
   * teléfono celular que va a mostrar la página en todo el site es
   * +52 871 501 5117", y sí tiene WhatsApp. Sustituye al +52 81 8179 1096 del
   * bot (31-ago): los pedidos escritos ahora entran por el chat del bot en la
   * propia página (ver BotWidget), que captura al CRM.
   */
  whatsapp: [{ numero: '+52 871 501 5117', e164: '528715015117' }],
  correo: 'ventasmty@elmariscal.mx',
  portalUrl: 'https://macsa-portal.shy-block-053a.workers.dev',
  corteHora: '20:00',
} as const

/**
 * WhatsApp del sitio: el celular de contacto (29-sep-2026).
 *
 * Los botones de pedido y precio llevan `data-chat`: con el chat del bot
 * cargado, BotWidget los intercepta y abre el chat con el mensaje ya escrito
 * (Luis, 29-sep: "¿por qué no se abre el chat del bot de Forja?"). Este
 * enlace de WhatsApp queda como respaldo si el chat no cargó, y es el destino
 * directo del botón verde flotante y del renglón WhatsApp de contacto y pie.
 */
export const WA_CONTACTO = '528715015117'

/**
 * Liga para llamar (2-oct-2026): los teléfonos fijos salían como texto y en el
 * celular no se podían tocar; con `tel:` además GA4 cuenta `contacto_llamada`.
 */
export const telLink = (telefono: string) => `tel:${telefono.split(' ').join('')}`

export function waLink(mensaje: string, numero: string = WA_CONTACTO) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
}

/**
 * Señales de confianza — sólo hechos verificables de la base de conocimiento.
 *
 * ⚠️ El IQF salió de aquí el 31-ago-2026 por instrucción de Edgar: no todo el
 * catálogo es IQF. La papa Lamb Weston, las verduras, el elote y los quesos
 * empanizados sí; la pechuga y la carne para hamburguesa llegan en bloque.
 * Anunciarlo como si fuera de todo el catálogo era prometer de más, y un chef
 * de escuela sabe distinguirlo. Se dice familia por familia, no en el claim.
 */
export const CONFIANZA = [
  { valor: 'Oficial', etiqueta: 'Distribuidor Lamb Weston en Monterrey' },
  { valor: 'Directo', etiqueta: 'Agrosuper y Martin’s, sin intermediarios' },
  { valor: 'Calidad', etiqueta: 'Las mejores marcas del mercado' },
  { valor: 'Logística', etiqueta: 'Cadena de frío garantizada, sin cortes' },
] as const

/**
 * El párrafo de calidad, como lo pidió Edgar: la promesa no es un tecnicismo
 * de congelación, es que buscamos las mejores marcas y las entregamos como
 * deben llegar. Se usa en Nosotros, en Cadena de frío y en el pie.
 */
export const PROMESA_CALIDAD =
  'Buscamos las mejores marcas del mercado para tu negocio y cuidamos la cadena de conservación de punta a punta, para que el producto te llegue con la calidad con la que salió de fábrica.'
