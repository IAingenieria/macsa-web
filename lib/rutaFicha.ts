/**
 * Segmento de URL de la ficha: el código en minúsculas y SIN acentos.
 *
 * El 2-oct-2026 la ficha de `PIÑA` (salsa Mr Wings) salía como «no encontrada»
 * con noindex: Next entrega el parámetro codificado (`pi%C3%B1a`) y la búsqueda
 * por código no lo encontraba. Con un segmento ASCII no hay nada que codificar.
 *
 * Toda liga, canonical y sitemap de ficha sale de aquí. Va en su propio módulo
 * (sin importar el catálogo) para que el buscador, que corre en el navegador,
 * lo use sin cargar el JSON completo.
 */
export const slugSku = (sku: string) =>
  sku.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export const rutaFicha = (sku: string) => `/tienda/${slugSku(sku)}/`
