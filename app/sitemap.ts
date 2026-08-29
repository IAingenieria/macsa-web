import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { SITE_URL } from '@/lib/site'

/**
 * El sitemap se construye barriendo `app/` en tiempo de build — igual que en
 * yaan-web. Nadie mantiene una lista a mano: la página que existe entra sola.
 */

const EXCLUIR = ['api', 'sitemap.xml', 'robots.txt']

function excluida(nombre: string) {
  return (
    nombre.startsWith('[') ||
    nombre.startsWith('(') ||
    nombre.startsWith('_') ||
    EXCLUIR.includes(nombre)
  )
}

/** Prioridad por tipo de página (misma escala que YAAN). */
function prioridad(ruta: string): number {
  if (/-en-[a-z-]+$/.test(ruta)) return 0.7 // producto × ciudad
  if (['catalogo', 'cobertura', 'marcas'].includes(ruta)) return 0.9 // hubs
  return 0.8
}

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date()
  const appDir = path.join(process.cwd(), 'app')

  const rutas = fs
    .readdirSync(appDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !excluida(d.name))
    .filter((d) => fs.existsSync(path.join(appDir, d.name, 'page.tsx')))
    .map((d) => d.name)
    .sort()

  return [
    { url: `${SITE_URL}/`, lastModified: ahora, changeFrequency: 'weekly', priority: 1.0 },
    ...rutas.map((ruta) => ({
      url: `${SITE_URL}/${ruta}/`,
      lastModified: ahora,
      changeFrequency: 'monthly' as const,
      priority: prioridad(ruta),
    })),
  ]
}
