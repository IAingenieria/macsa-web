// S206: revisa sobre out/ (lo que se publica) las reglas de Luis para Frites Atelier. Sale con 1 si algo falla.
// Lo que promete la página: sin frases prohibidas, sin precios, con videos permitidos, ligas internas vivas y 4 fichas.
import fs from 'node:fs'
import path from 'node:path'

const OUT = process.argv[2] || 'out'
const PAGINAS = ['frites-atelier', 'frites-atelier/en', 'como-vender-mas-papa', 'tienda/faa4', 'tienda/f03', 'tienda/f07', 'tienda/lws902']
const PROHIBIDO = [
  /lleg[óo] a M[ée]xico/i, /ahora en M[ée]xico/i, /Frites Atelier en M[ée]xico/i, /cavimex/i, /chef ejecutivo/i,
  /crujient/i, /dorad[ao]/i, /jugos[ao]/i, /\$\s?\d/, /\d\s?(min|minutos)\b/i, /18 meses/i, /cinco d[ií]as|5 d[ií]as/i, /13\s?[x×]\s?13/i,
  /\bcrispy\b/i, /\bcrunch/i,
]
const VIDEOS_OK = /fa-(a2|a4|l6|en-a2|en-a4)-/
const fallas = []
const texto = (h) =>
  (h.match(/<main[\s\S]*?<\/main>/)?.[0] ?? h)
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')

for (const p of PAGINAS) {
  const f = path.join(OUT, p, 'index.html')
  if (!fs.existsSync(f)) { fallas.push(`falta ${p}`); continue }
  const h = fs.readFileSync(f, 'utf8')
  const t = texto(h)
  for (const re of PROHIBIDO) {
    const m = t.match(re)
    if (m) fallas.push(`${p}: «${t.slice(Math.max(0, m.index - 40), m.index + 50)}»`)
  }
  for (const m of h.matchAll(/medios-web\/frites-atelier\/([^"'\s]+)/g)) {
    if (!VIDEOS_OK.test(m[1])) fallas.push(`${p}: video no permitido ${m[1]}`)
  }
  for (const m of h.matchAll(/href="(\/[^"#?]*)"/g)) {
    const u = m[1]
    if (u.startsWith('/_next') || /\.[a-z0-9]+$/i.test(u)) continue
    if (!fs.existsSync(path.join(OUT, u, 'index.html'))) fallas.push(`${p}: liga rota ${u}`)
  }
  console.log(p, 'ok', t.length, 'caracteres')
}
const portada = fs.readFileSync(path.join(OUT, 'index.html'), 'utf8')
if (!portada.includes('/frites-atelier/')) fallas.push('la portada no liga a Frites Atelier')
const marcas = fs.readFileSync(path.join(OUT, 'marcas/index.html'), 'utf8')
if (!marcas.includes('Frites Atelier')) fallas.push('marcas no menciona Frites Atelier')
const sitemap = fs.existsSync(path.join(OUT, 'sitemap.xml')) ? fs.readFileSync(path.join(OUT, 'sitemap.xml'), 'utf8') : ''
for (const u of ['/frites-atelier/', '/frites-atelier/en/', '/como-vender-mas-papa/', '/tienda/faa4/']) {
  if (!sitemap.includes(u)) fallas.push(`sitemap sin ${u}`)
}
console.log(fallas.length ? fallas.join('\n') : '0 fallas')
process.exit(fallas.length ? 1 : 0)
