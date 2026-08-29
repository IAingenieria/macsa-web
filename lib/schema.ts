import { EMPRESA, SITE_URL } from './site'
import { CIUDADES } from './ciudades'

/**
 * Grafo de entidad. Va una sola vez, en el layout raíz.
 * areaServed lista las 30 ciudades: es lo que le dice a Google y a los
 * modelos de IA dónde opera MACSA de verdad.
 */
export const organizacionSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#organizacion`,
  name: EMPRESA.nombre,
  legalName: EMPRESA.razonSocial,
  url: SITE_URL,
  description: EMPRESA.descripcion,
  slogan: EMPRESA.claim,
  address: {
    '@type': 'PostalAddress',
    streetAddress: EMPRESA.direccion.calle,
    addressLocality: `${EMPRESA.direccion.colonia}, ${EMPRESA.direccion.ciudad}`,
    addressRegion: EMPRESA.direccion.estadoCorto,
    addressCountry: EMPRESA.direccion.pais,
  },
  telephone: EMPRESA.telefonos[0],
  email: EMPRESA.correo,
  areaServed: CIUDADES.map((c) => ({
    '@type': 'City',
    name: c.nombre,
    containedInPlace: { '@type': 'State', name: c.estado },
  })),
  knowsAbout: [
    'Distribución de alimentos congelados',
    'Food service',
    'Cadena de frío',
    'Papa a la francesa',
  ],
}

export function breadcrumbSchema(items: { nombre: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.nombre,
      ...(it.url ? { item: `${SITE_URL}${it.url}` } : {}),
    })),
  }
}

export function faqSchema(preguntas: { p: string; r: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: preguntas.map((f) => ({
      '@type': 'Question',
      name: f.p,
      acceptedAnswer: { '@type': 'Answer', text: f.r },
    })),
  }
}

export function productoSchema(opts: {
  nombre: string
  descripcion: string
  marca: string
  url: string
  ciudad?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: opts.nombre,
    description: opts.descripcion,
    brand: { '@type': 'Brand', name: opts.marca },
    url: `${SITE_URL}${opts.url}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'MXN',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SITE_URL}/#organizacion` },
      ...(opts.ciudad
        ? { areaServed: { '@type': 'City', name: opts.ciudad } }
        : {}),
    },
  }
}

/** Serializa el JSON-LD de forma segura para inyectarlo en la página. */
export function ld(objeto: unknown) {
  return { __html: JSON.stringify(objeto).replace(/</g, '\\u003c') }
}
