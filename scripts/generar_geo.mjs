#!/usr/bin/env node
/**
 * Generador de la malla de páginas.
 *
 * Es el equivalente de `regenerar_geo_completas.py` de yaan-web, adaptado:
 * ahí se clonaba el archivo entero de la página pilar y se le reescribían diez
 * puntos con expresiones regulares. Aquí la plantilla vive en un componente,
 * así que el generador sólo emite el `page.tsx` con su metadata y su canonical
 * — que es lo único que de verdad tiene que ser distinto archivo por archivo.
 *
 * Ventaja sobre el enfoque de YAAN: cambiar una sección se hace UNA vez en el
 * componente, no reescribiendo cientos de archivos con regex.
 *
 * Genera tres cosas:
 *   1. Pilar de cada producto ancla         → /papa-gajo/
 *   2. Producto ancla × ciudad              → /papa-gajo-en-saltillo/
 *   3. Familia × ciudad (las 3 con pilar)   → /papa-a-la-francesa-en-saltillo/
 *
 * Uso:
 *   node scripts/generar_geo.mjs
 *   node scripts/generar_geo.mjs --limpiar
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const APP = path.join(RAIZ, 'app')
// Route group: los parentesis no aparecen en la URL. Todo lo generado vive
// aqui, asi el .gitignore lo excluye con una sola linea y `limpiar` es un rm.
const GEN = path.join(APP, '(generado)')
const MARCA = '/* GENERADO por scripts/generar_geo.mjs — no editar a mano. */'

/** Extrae los registros de un archivo TS sin necesidad de compilarlo. */
function registros(archivo) {
  const src = fs.readFileSync(path.join(RAIZ, 'lib', archivo), 'utf8')
  return src
    .split(/\{\s*\n?\s*slug:/)
    .slice(1)
    .map((b) => {
      const slug = b.match(/^\s*'([^']+)'/)?.[1]
      const nombre = b.match(/nombre:\s*'([^']+)'/)?.[1]
      if (!slug) return null
      return { slug, nombre: nombre ?? slug, pilar: /pilar:\s*true/.test(b) }
    })
    .filter(Boolean)
}

function escribir(slug, contenido) {
  const dir = path.join(GEN, slug)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'page.tsx'), contenido, 'utf8')
}

/* ── Plantillas ─────────────────────────────────────────────────────── */

const pilarAncla = (slug, nombre) => `${MARCA}
import type { Metadata } from 'next'
import PaginaAncla from '@/components/landing/PaginaAncla'
import { ancla } from '@/lib/anclas'

const a = ancla('${slug}')!

export const metadata: Metadata = {
  title: a.h1,
  description: a.answerFirst.slice(0, 158),
  alternates: { canonical: '/${slug}/' },
}

export default function Page() {
  return <PaginaAncla anclaSlug="${slug}" />
}
`

const anclaCiudad = (slug, ciudad, nombre, ciudadNombre) => `${MARCA}
import type { Metadata } from 'next'
import PaginaAncla from '@/components/landing/PaginaAncla'

export const metadata: Metadata = {
  title: '${nombre} en ${ciudadNombre} — entrega para restaurantes',
  description:
    '${nombre} congelada con entrega en ${ciudadNombre}. Distribuidor con cadena de frío sin cortes, producto IQF y existencia continua. Venta exclusiva a negocios.',
  alternates: { canonical: '/${slug}-en-${ciudad}/' },
}

export default function Page() {
  return <PaginaAncla anclaSlug="${slug}" ciudadSlug="${ciudad}" />
}
`

const familiaCiudad = (slug, ciudad, nombre, ciudadNombre) => `${MARCA}
import type { Metadata } from 'next'
import PaginaGeo from '@/components/landing/PaginaGeo'

export const metadata: Metadata = {
  title: '${nombre} en ${ciudadNombre} — entrega para restaurantes',
  description:
    '${nombre} congelada con entrega en ${ciudadNombre}. Distribuidor con cadena de frío sin cortes, producto IQF y existencia continua. Venta exclusiva a negocios.',
  alternates: { canonical: '/${slug}-en-${ciudad}/' },
}

export default function Page() {
  return <PaginaGeo familiaSlug="${slug}" ciudadSlug="${ciudad}" />
}
`

/* ── Operaciones ────────────────────────────────────────────────────── */

function limpiar() {
  if (!fs.existsSync(GEN)) return console.log('Nada que limpiar.')
  const n = fs.readdirSync(GEN).length
  fs.rmSync(GEN, { recursive: true, force: true })
  console.log(`Limpiadas ${n} páginas generadas.`)
}

function generar() {
  const anclas = registros('anclas.ts')
  const ciudades = registros('ciudades.ts')
  // Sólo las familias con PILAR escrito a mano. Un pilar flojo produce
  // treinta páginas flojas, así que ninguna familia entra aquí sin él.
  const familias = registros('familias.ts').filter((f) => f.pilar)

  if (!anclas.length || !ciudades.length) {
    console.error('No se pudieron leer anclas o ciudades. Revisa lib/.')
    process.exit(1)
  }

  let pilares = 0
  let geoAnclas = 0
  let geoFamilias = 0

  for (const a of anclas) {
    escribir(a.slug, pilarAncla(a.slug, a.nombre))
    pilares++
    for (const c of ciudades) {
      escribir(`${a.slug}-en-${c.slug}`, anclaCiudad(a.slug, c.slug, a.nombre, c.nombre))
      geoAnclas++
    }
  }

  for (const f of familias) {
    for (const c of ciudades) {
      escribir(`${f.slug}-en-${c.slug}`, familiaCiudad(f.slug, c.slug, f.nombre, c.nombre))
      geoFamilias++
    }
  }

  console.log(`  ${pilares} pilares de producto ancla`)
  console.log(`  ${geoAnclas} páginas ancla × ciudad (${anclas.length} × ${ciudades.length})`)
  console.log(`  ${geoFamilias} páginas familia × ciudad (${familias.length} × ${ciudades.length})`)
  console.log(`\nTotal generado: ${pilares + geoAnclas + geoFamilias} páginas.`)
}

if (process.argv.includes('--limpiar')) limpiar()
else generar()
