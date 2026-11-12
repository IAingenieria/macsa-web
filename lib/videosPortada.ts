/**
 * Los videos de la portada (11-nov-2026).
 *
 * Todos son piezas que Luis ya aprobó y que ya salieron en Facebook: no se grabó nada nuevo.
 *  - «¿Por qué MACSA?» y el corto «En frío»: escenas reales del almacén, la cámara fría y las unidades
 *    (permiso de las personas que salen: Luis, 19-oct-2026).
 *  - Serie «No sólo hay una papa», versión sin teléfono: foto real de cada producto y freidora real.
 *
 * Reglas que esta lista no puede romper:
 *  - Comida sólo con tomas o fotos reales, nunca generada con IA.
 *  - Ningún video con invitados sin permiso (los videos de la visita de Frites Atelier viven en /frites-atelier/;
 *    aquí sólo va la promoción del hero, que no trae invitados).
 *  - Un producto sólo se anuncia aquí si hay existencia: la espiral y la ondulada quedaron fuera el 11-nov
 *    (16 y 30 cajas). Para regresarlas basta agregar su renglón a `PAPAS`.
 *
 * Los .mp4 viven en el bucket `medios-web` de Supabase (igual que los de Frites Atelier): Safari exige `Range`
 * y los assets del worker no lo dan. Las portadas (.webp, ~25 KB) sí van en `public/videos/`: mismo origen,
 * sin abrir otra conexión al cargar la página.
 */

import { asset } from './site'

export const MEDIOS_PORTADA =
  process.env.NEXT_PUBLIC_MEDIOS_PORTADA ??
  'https://jlhvtjsdbdgwvfhjahdi.supabase.co/storage/v1/object/public/medios-web/portada/'

export interface VideoPortada {
  /** Nombre del archivo, sin extensión. También es la etiqueta del evento de medición. */
  clave: string
  titulo: string
  segundos: number
  /** Dirección completa del .mp4 cuando no vive en `portada/` (p. ej. uno que ya esté en `frites-atelier/`). */
  src?: string
}

export const videoSrc = (v: VideoPortada) => v.src ?? `${MEDIOS_PORTADA}${v.clave}.mp4`
export const videoPoster = (v: VideoPortada) => asset(`/videos/${v.clave}.webp`)

/**
 * El hero (pedido de Luis, 11-nov-2026): la promoción «Frites Atelier para restaurantes y hoteles» (63 s), con
 * fotos oficiales de la marca y Alex Jansen, su Director Comercial, cerrando. Fuente:
 * `Videos/FRITES_ATELIER/promo/FA_Promo_Restaurantes_Hoteles_v1.mp4` (revisada un cuadro cada 3 s: sólo modelos
 * oficiales y Alex a cuadro, sin invitados). Primero se probó «La bolsa Hermès»; Luis pidió ésta el mismo día.
 * Reglas de `lib/fritesAtelier.ts`: «disponible para México, a través de MACSA»; nunca «llegó a México».
 */
export const VIDEO_HERO: VideoPortada = {
  clave: 'frites-atelier-promo',
  titulo: 'Frites Atelier, para México',
  segundos: 63,
}
/** La tarjeta chica del celular y el pie de la portada en escritorio. */
export const HERO_TARJETA = {
  nombre: 'Frites Atelier, para México',
  cargo: 'Con Alex Jansen, su Director Comercial',
  miniatura: asset('/videos/frites-atelier-promo-chico.webp'),
}

export const VIDEO_POR_QUE: VideoPortada = { clave: 'por-que-macsa', titulo: '¿Por qué MACSA?', segundos: 34 }

export const VIDEO_FRIO: VideoPortada = { clave: 'en-frio', titulo: 'En frío, de nuestra cámara a tu cocina', segundos: 14 }

/** Lo que dice el video «¿Por qué MACSA?», en el mismo orden. Datos verificados en Microsip el 18-oct-2026. */
export const RAZONES = [
  { titulo: 'Un solo proveedor', texto: 'Más de quince marcas que tus clientes ya conocen, en un solo pedido.' },
  { titulo: 'Recibido y revisado', texto: 'Lo recibimos y lo revisamos antes de guardarlo.' },
  { titulo: 'En frío, con nuestras unidades', texto: 'Lo guardamos en frío y te lo llevamos en nuestras propias unidades refrigeradas.' },
  { titulo: 'Más de 500 negocios', texto: 'Ya trabajan con nosotros.' },
]

export interface PapaVideo extends VideoPortada {
  sku: string
  /** Frase tomada del guion aprobado del video. */
  texto: string
}

export const PAPAS: PapaVideo[] = [
  {
    clave: 'papa-rejilla',
    titulo: 'Papa en rejilla',
    segundos: 21,
    sku: 'D23',
    texto: 'Sazonada, con cáscara y con un corte que llena el plato.',
  },
  {
    clave: 'papa-gajo',
    titulo: 'Papa gajo',
    segundos: 20,
    sku: 'C2700',
    texto: 'Por su grosor se mantiene caliente más tiempo y no se rompe en el camino.',
  },
  {
    clave: 'camote',
    titulo: 'Camote en tiras',
    segundos: 23,
    sku: 'L0092',
    texto: 'Con el toque dulce del camote, para el cliente que siempre busca algo distinto.',
  },
]
