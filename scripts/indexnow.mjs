// IndexNow (2-oct-2026): avisa a Bing —y a los buscadores que comparten IndexNow— qué páginas de macsamty.mx
// son nuevas o cambiaron. Google NO usa IndexNow: para Google está el sitemap en Search Console.
// Receta tomada de DIHMOSA (plan/indexnow.mjs, 2-oct-2026).
//
// Cómo decide qué avisar: baja el sitemap EN VIVO, pide cada página y saca una huella de lo que importa
// (título, descripción y <main>). Compara contra data/indexnow_estado.json (la corrida anterior) y avisa sólo
// las nuevas o las que cambiaron. Así un cambio del pie o de estilos no reenvía las 775 páginas.
//
// Uso (DESPUÉS de cada `npx wrangler deploy`, con el sitio nuevo ya en vivo):
//   npm run indexnow                    → revisa y avisa lo que cambió
//   node scripts/indexnow.mjs --prueba  → dice qué avisaría, sin avisar ni guardar
//   node scripts/indexnow.mjs --todas   → avisa todas las URLs del sitemap (primera vez)
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

// La llave no es secreta: se publica en /<llave>.txt (public/). Si se cambia, cambiar también ese archivo.
export const INDEXNOW_KEY = 'd2213395673ba683a03eb346b6c30875'

const HOST = 'macsamty.mx'
const BASE = `https://${HOST}`
const ESTADO = new URL('../data/indexnow_estado.json', import.meta.url)
const prueba = process.argv.includes('--prueba')
const todas = process.argv.includes('--todas')

const texto = async (u) => {
  const r = await fetch(u, { headers: { 'user-agent': 'macsa-indexnow/1.0' } })
  return [r.status, await r.text()]
}
const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim().replace(/&amp;/g, '&'))

// 1) La llave tiene que estar publicada, si no IndexNow rechaza el aviso (403)
const [sk, cuerpoLlave] = await texto(`${BASE}/${INDEXNOW_KEY}.txt`)
if (sk !== 200 || cuerpoLlave.trim() !== INDEXNOW_KEY) {
  console.error(`La llave no está publicada en ${BASE}/${INDEXNOW_KEY}.txt (HTTP ${sk}). ¿Ya se desplegó?`)
  process.exit(1)
}

// 2) URLs del sitemap en vivo
const [ss, xml] = await texto(`${BASE}/sitemap.xml`)
if (ss !== 200) { console.error(`sitemap.xml: HTTP ${ss}`); process.exit(1) }
const unicas = [...new Set(locs(xml))].filter((u) => u.startsWith(BASE + '/'))
console.log(`${unicas.length} URLs en el sitemap`)

// 3) Huella de cada página (12 a la vez). El <main> del sitio lleva id="contenido".
const huella = (h) => createHash('sha256').update([
  (h.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1],
  (h.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1],
  (h.match(/<main[^>]*>([\s\S]*)<\/main>/) || [, h])[1],
].join('\n')).digest('hex').slice(0, 20)

const nuevo = {}
const fallidas = []
for (let i = 0; i < unicas.length; i += 12) {
  await Promise.all(unicas.slice(i, i + 12).map(async (u) => {
    try {
      const [s, h] = await texto(u)
      if (s === 200) nuevo[u] = huella(h)
      else fallidas.push(`${s} ${u}`)
    } catch {
      fallidas.push(`ERR ${u}`)
    }
  }))
}
if (fallidas.length) {
  console.log(`${fallidas.length} páginas no respondieron 200 (no se avisan):\n  ` + fallidas.slice(0, 20).join('\n  ') +
    (fallidas.length > 20 ? `\n  … y ${fallidas.length - 20} más` : ''))
}

const anterior = existsSync(ESTADO) ? JSON.parse(readFileSync(ESTADO, 'utf8')).paginas || {} : {}
const cambiadas = todas ? Object.keys(nuevo) : Object.keys(nuevo).filter((u) => anterior[u] !== nuevo[u])
const nuevas = Object.keys(nuevo).filter((u) => !anterior[u]).length
console.log(`${cambiadas.length} por avisar (${todas ? 'todas' : `${nuevas} nuevas, ${cambiadas.length - nuevas} con cambios`})`)
if (prueba) {
  console.log('--prueba: no se avisó ni se guardó nada\n  ' + cambiadas.slice(0, 15).join('\n  ') +
    (cambiadas.length > 15 ? `\n  … y ${cambiadas.length - 15} más` : ''))
  process.exit(0)
}
if (!cambiadas.length) { console.log('Nada que avisar.'); process.exit(0) }

// 4) Aviso: hasta 10,000 URLs por envío. Endpoint de Bing: comparte el aviso con los demás buscadores de
// IndexNow. (En DIHMOSA, el día del alta api.indexnow.org devolvía 403 «SiteVerificationNotCompleted»
// mientras Bing ya contestaba 200.)
let ok = true
for (let i = 0; i < cambiadas.length; i += 10000) {
  const lote = cambiadas.slice(i, i + 10000)
  const r = await fetch('https://www.bing.com/indexnow', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: `${BASE}/${INDEXNOW_KEY}.txt`, urlList: lote }),
  })
  // 200 recibido · 202 recibido, la llave se valida después · 403 llave inválida · 422 URLs de otro host · 429 demasiados
  console.log(`IndexNow: HTTP ${r.status} con ${lote.length} URLs ${await r.text().catch(() => '')}`.trim())
  if (r.status !== 200 && r.status !== 202) ok = false
}

// 5) Sólo si el aviso entró se guarda la huella (si falló, la siguiente corrida lo reintenta)
if (ok) {
  writeFileSync(ESTADO, JSON.stringify({ actualizado: new Date().toISOString(), host: HOST, paginas: { ...anterior, ...nuevo } }))
  console.log(`Estado guardado: ${Object.keys(nuevo).length} páginas`)
} else {
  console.error('El aviso no entró: no se guardó el estado')
  process.exit(1)
}
