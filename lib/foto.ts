/**
 * Tamaños de la foto de producto (S170 · 29-sep-2026).
 *
 * Las fotos optimizadas viven en el bucket `catalogo/web/` en dos tamaños:
 * `<nombre>-800.webp` (la que guarda `imagen_url`: ficha, celulares, retina)
 * y `<nombre>-400.webp` (tarjetas en escritorio). Con `srcset` el navegador
 * baja sólo la que le cabe: una página de familia con 20 tarjetas pasa de
 * ~1 MB de fotos a ~250 KB.
 *
 * Una URL que no sigue ese patrón (un hotlink, una foto vieja) se usa tal cual
 * y sin `srcset`: nunca se inventa un archivo que no existe.
 *
 * Archivo aparte de `catalogo.ts` a propósito: el buscador corre en el
 * navegador y no debe cargar el catálogo entero para esto.
 */

const OPTIMIZADA = /\/catalogo\/web\/[^/]+-800\.webp$/

export function fotoChica(url: string): string {
  return OPTIMIZADA.test(url) ? url.replace(/-800\.webp$/, '-400.webp') : url
}

export function srcSetFoto(url: string): string | undefined {
  return OPTIMIZADA.test(url) ? `${fotoChica(url)} 400w, ${url} 800w` : undefined
}

/** Tarjeta: 1 columna en celular, 2 en tableta, 4 en escritorio (contenedor ~1200 px). */
export const SIZES_TARJETA = '(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw'
/** Ficha: media pantalla en escritorio, ancho completo en celular. */
export const SIZES_FICHA = '(min-width: 1024px) 560px, 100vw'
