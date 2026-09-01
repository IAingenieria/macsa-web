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
 * URL del widget de MacsaIA (Forja sirve `/widget.js`).
 * Vacia hasta que se active el canal web en el bot de produccion.
 */
export const BOT_WIDGET = process.env.NEXT_PUBLIC_BOT_WIDGET ?? ''

export const EMPRESA = {
  nombre: 'MACSA Foodservice',
  razonSocial: 'MACSA de la Sultana',
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
  },
  telefonos: ['+52 81 2209 2277', '+52 81 2254 2834'],
  /**
   * Un solo WhatsApp para todo el sitio, por instruccion de Edgar (31-ago-2026).
   * Los tres celulares de vendedores que estaban aqui se retiraron: repartian
   * al prospecto segun a quien le escribiera y ninguno quedaba registrado.
   * Todo entra ahora por MacsaIA, que captura al CRM y lo asigna despues.
   */
  whatsapp: [{ numero: '+52 81 8179 1096', e164: '528181791096' }],
  correo: 'ventasmty@elmariscal.mx',
  portalUrl: 'https://macsa-portal.shy-block-053a.workers.dev',
  corteHora: '20:00',
} as const

/**
 * WhatsApp de MacsaIA: el mismo numero que atiende el bot en vivo.
 *
 * Todos los CTA del sitio llegan aqui a proposito. El bot contesta 24/7,
 * tiene el catalogo cargado y captura el prospecto al CRM — y como el
 * visitante escribe desde su telefono, el prospecto llega con numero, que
 * es justo lo que le falta al chat de la web.
 *
 * Las lineas humanas de ventas NO desaparecen: siguen listadas completas
 * en /contacto/ y en el pie de todas las paginas.
 */
export const WA_BOT = '528181791096'

/** WhatsApp principal para todos los CTA del sitio. */
export const WA_PRINCIPAL = WA_BOT

export function waLink(mensaje: string, numero: string = WA_PRINCIPAL) {
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
