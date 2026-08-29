#!/usr/bin/env node
/**
 * Generador de páginas PRODUCTO × CIUDAD.
 *
 * Es el equivalente de `regenerar_geo_completas.py` de yaan-web, adaptado:
 * ahí se clonaba el archivo entero de la página pilar y se le reescribían
 * diez puntos con expresiones regulares. Aquí la plantilla vive en un
 * componente (`components/landing/PaginaGeo.tsx`), así que el generador sólo
 * emite el `page.tsx` con su metadata y su canonical — que es lo único que
 * de verdad tiene que ser distinto archivo por archivo.
 *
 * Ventaja sobre el enfoque de YAAN: cambiar una sección se hace UNA vez en el
 * componente, no reescribiendo 600 archivos con regex.
 *
 * Uso:
 *   node scripts/generar_geo.mjs           → genera
 *   node scripts/generar_geo.mjs --limpiar → borra lo generado
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const APP = path.join(RAIZ, 'app')

/** Extrae los slugs de un archivo TS sin necesidad de compilarlo. */
function slugsDe(archivo, filtro = () => true) {
  const src = fs.readFileSync(path.join(RAIZ, 'lib', archivo), 'utf8')
  const bloques = src.split(/\{\s*\n?\s*slug:/).slice(1)
  return bloques
    .map((b) => {
      const slug = b.match(/^\s*'([^']+)'/)?.[1]
      const nombre = b.match(/nombre:\s*'([^']+)'/)?.[1]
      const pilar = /pilar:\s*true/.test(b.split('slug:')[0] ?? b)
      return slug ? { slug, nombre, pilar: /pilar:\s*true/.test(b) } : null
    })
    .filter(Boolean)
    .filter(filtro)
}

const MARCA_GENERADO = '/* GENERADO por scripts/generar_geo.mjs — no editar a mano. */'

const plantilla = (familiaSlug, ciudadSlug, familiaNombre, ciudadNombre) => `${MARCA_GENERADO}
import type { Metadata } from 'next'
import PaginaGeo from '@/components/landing/PaginaGeo'

export const metadata: Metadata = {
  title: '${familiaNombre} en ${ciudadNombre} — entrega para restaurantes',
  description:
    '${familiaNombre} congelada con entrega en ${ciudadNombre}. Distribuidor con cadena de frío sin cortes, producto IQF y existencia continua. Venta exclusiva a negocios.',
  alternates: { canonical: '/${familiaSlug}-en-${ciudadSlug}/' },
}

export default function Page() {
  return <PaginaGeo familiaSlug="${familiaSlug}" ciudadSlug="${ciudadSlug}" />
}
`

function limpiar() {
  let n = 0
  for (const d of fs.readdirSync(APP, { withFileTypes: true })) {
    if (!d.isDirectory()) continue
    const page = path.join(APP, d.name, 'page.tsx')
    if (!fs.existsSync(page)) continue
    if (fs.readFileSync(page, 'utf8').startsWith(MARCA_GENERADO)) {
      fs.rmSync(path.join(APP, d.name), { recursive: true, force: true })
      n++
    }
  }
  console.log(`Limpiadas ${n} páginas generadas.`)
}

function generar() {
  // En F1 sólo se generan las familias PILAR: son las únicas cuyo contenido
  // está escrito a mano y aguanta clonarse. Un pilar flojo produce 30
  // páginas flojas, así que ninguna familia entra aquí antes de tener pilar.
  const familias = slugsDe('familias.ts').filter((f) => f.pilar)
  const ciudades = slugsDe('ciudades.ts')

  if (!familias.length || !ciudades.length) {
    console.error('No se pudieron leer familias o ciudades. Revisa lib/.')
    process.exit(1)
  }

  let n = 0
  for (const f of familias) {
    for (const c of ciudades) {
      const dir = path.join(APP, `${f.slug}-en-${c.slug}`)
      fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(
        path.join(dir, 'page.tsx'),
        plantilla(f.slug, c.slug, f.nombre, c.nombre),
        'utf8',
      )
      n++
    }
    console.log(`  ${f.slug} × ${ciudades.length} ciudades`)
  }
  console.log(`\nTotal: ${n} páginas producto × ciudad generadas.`)
}

if (process.argv.includes('--limpiar')) limpiar()
else generar()
