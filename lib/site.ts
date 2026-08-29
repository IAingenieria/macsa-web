/**
 * Datos maestros del sitio.
 * Fuente: base de conocimiento de MacsaIA (member/kb/01-quienes-somos.md,
 * 03-otras-categorias.md, 04-entregas-y-cadena-de-frio.md).
 * Nada aquí se inventa: si un dato no está confirmado, no aparece en el sitio.
 */

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
  whatsapp: [
    { numero: '+52 81 2038 9285', e164: '528120389285' },
    { numero: '+52 81 2037 9014', e164: '528120379014' },
    { numero: '+52 81 8680 6859', e164: '528186806859' },
  ],
  correo: 'ventasmty@elmariscal.mx',
  portalUrl: 'https://macsa-portal.shy-block-053a.workers.dev',
  corteHora: '20:00',
} as const

/** WhatsApp principal para todos los CTA del sitio. */
export const WA_PRINCIPAL = EMPRESA.whatsapp[0].e164

export function waLink(mensaje: string, numero: string = WA_PRINCIPAL) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
}

/** Señales de confianza — sólo hechos verificables de la base de conocimiento. */
export const CONFIANZA = [
  { valor: 'Oficial', etiqueta: 'Distribuidor Lamb Weston en Monterrey' },
  { valor: 'Directo', etiqueta: 'Agrosuper y Martin’s, sin intermediarios' },
  { valor: 'IQF', etiqueta: 'Congelado pieza por pieza' },
  { valor: 'Sin cortes', etiqueta: 'Cadena de frío de punta a punta' },
] as const
