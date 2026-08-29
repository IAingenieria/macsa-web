#!/usr/bin/env node
/**
 * Regenera `data/catalogo.json` desde Supabase.
 *
 * Por qué un snapshot versionado y no una consulta en cada build:
 * el sitio se compila en GitHub Actions, y ahí NO queremos credenciales de
 * la base de producción. El snapshot se genera aquí, se revisa en el diff y
 * se sube al repo. El build sólo lee un archivo.
 *
 * ⚠️ Reglas que este script respeta y que NO se deben quitar:
 *  - Sólo productos `activo is not false` y `descontinuado is not true`.
 *    (El portal no miraba `activo` y enseñó SKUs apagados con precio.
 *    Es `!== false` y no `=== true` a propósito: si faltara la columna,
 *    conviene mostrar de más que dejar el catálogo vacío sin avisar.)
 *  - NO se traen precios. Publicarlos es decisión de Jorge, y `p1` es el
 *    precio de distribuidor: no puede salir jamás al navegador.
 *  - Sólo productos CON foto oficial: una ficha sin imagen no vende, y una
 *    con la imagen equivocada es peor que ninguna.
 *
 * Uso:
 *   SB_URL=https://<ref>.supabase.co SB_KEY=<service_key> \
 *     node scripts/sincronizar_catalogo.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const DESTINO = path.join(RAIZ, 'data', 'catalogo.json')

const SB_URL = process.env.SB_URL
const SB_KEY = process.env.SB_KEY

if (!SB_URL || !SB_KEY) {
  console.error('Faltan SB_URL y SB_KEY en el entorno.')
  console.error('El snapshot actual en data/catalogo.json se deja intacto.')
  process.exit(1)
}

const COLUMNAS = 'sku,descripcion,categoria,presentacion,peso_lb,imagen_url'
const PAGINA = 500

/**
 * PostgREST corta en 1,000 filas EN SILENCIO. Por eso se pagina con Range
 * en vez de pedir un `limit` alto y confiar: el día que el catálogo pase de
 * mil, un `limit=1000` devolvería de menos sin ningún error.
 */
async function traerTodo() {
  const filas = []
  for (let desde = 0; ; desde += PAGINA) {
    const url =
      `${SB_URL}/rest/v1/precios_listas_macsa` +
      `?select=${COLUMNAS}` +
      `&activo=not.is.false` +
      `&descontinuado=not.is.true` +
      `&descripcion=not.is.null` +
      `&imagen_url=not.is.null` +
      `&order=categoria.asc,sku.asc`

    const res = await fetch(url, {
      headers: {
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
        Range: `${desde}-${desde + PAGINA - 1}`,
        Prefer: 'count=exact',
      },
    })
    if (!res.ok) throw new Error(`Supabase respondió ${res.status}: ${await res.text()}`)

    const lote = await res.json()
    filas.push(...lote)
    if (lote.length < PAGINA) break
  }
  return filas
}

const filas = await traerTodo()

const salida = {
  _nota:
    'Snapshot del catálogo real. Se regenera con scripts/sincronizar_catalogo.mjs. ' +
    'Sólo productos activos, no descontinuados y CON foto oficial del fabricante. ' +
    'NO contiene precios: publicarlos es decisión de Jorge.',
  _fuente: 'precios_listas_macsa · proyecto Supabase CEDIS',
  _generado: new Date().toISOString().slice(0, 10),
  _filtro: 'activo is not false and descontinuado is not true and imagen_url is not null',
  productos: filas.map((f) => ({
    s: f.sku,
    d: f.descripcion,
    c: f.categoria,
    p: f.presentacion,
    w: f.peso_lb,
    i: f.imagen_url,
  })),
}

fs.writeFileSync(DESTINO, JSON.stringify(salida, null, 2) + '\n', 'utf8')
console.log(`${filas.length} productos con foto escritos en data/catalogo.json`)
console.log('Revisa el diff antes de subirlo: el catálogo es lo que ve el cliente.')
