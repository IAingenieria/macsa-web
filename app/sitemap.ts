import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { SITE_URL } from '@/lib/site'
import { CATALOGO } from '@/lib/catalogo'

/**
 * El sitemap se construye barriendo `app/` en tiempo de build — igual que en
 * yaan-web. Nadie mantiene una lista a mano: la página que existe entra sola.
 */

// aviso-de-privacidad va noindex: una pagina noindex NO debe ir en el sitemap.
const EXCLUIR = ['api', 'sitemap.xml', 'robots.txt', 'aviso-de-privacidad']

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

  // Los route groups —directorios entre parentesis— no forman parte de la URL,
  // asi que hay que mirar DENTRO de ellos o el sitemap se pierde todo lo
  // generado. Es el error silencioso mas facil de cometer aqui.
  function rutasDe(dir: string): string[] {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .flatMap((d) => {
        if (d.name.startsWith('(') && d.name.endsWith(')')) {
          return rutasDe(path.join(dir, d.name))
        }
        if (excluida(d.name)) return []
        return fs.existsSync(path.join(dir, d.name, 'page.tsx')) ? [d.name] : []
      })
  }

  const rutas = [...new Set(rutasDe(appDir))].sort()

  return [
    { url: `${SITE_URL}/`, lastModified: ahora, changeFrequency: 'weekly', priority: 1.0 },
    ...rutas.map((ruta) => ({
      url: `${SITE_URL}/${ruta}/`,
      lastModified: ahora,
      changeFrequency: 'monthly' as const,
      priority: prioridad(ruta),
    })),
    // Las fichas de la tienda viven en una ruta dinamica (`tienda/[sku]`), asi
    // que el barrido de directorios NO las ve: hay que agregarlas a mano desde
    // el catalogo. Es el hueco mas facil de dejar abierto sin darse cuenta.
    ...CATALOGO.map((p) => ({
      url: `${SITE_URL}/tienda/${p.sku.toLowerCase()}/`,
      lastModified: ahora,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
