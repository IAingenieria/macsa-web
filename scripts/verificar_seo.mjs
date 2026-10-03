// Verificación SEO del build (2-oct-2026). Corre sobre out/ — lo MISMO que se despliega — no sobre el código.
//   node scripts/verificar_seo.mjs            → build de producción (macsamty.mx, indexable)
//   GA4 esperado: si NEXT_PUBLIC_GA4_ID está puesto, el gtag debe estar en el HTML; si no, NO debe estar.
// Sale con código 1 si algo falla.
import fs from 'node:fs'
import path from 'node:path'

const OUT = new URL('../out/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const BASE = 'https://macsamty.mx'
const LLAVE = 'd2213395673ba683a03eb346b6c30875'
const GA4 = process.env.NEXT_PUBLIC_GA4_ID || ''
const fallas = []
const falla = (m) => fallas.push(m)
const leer = (rel) => fs.readFileSync(path.join(OUT, rel), 'utf8')
const existe = (rel) => fs.existsSync(path.join(OUT, rel))

// 1) Sitemap: cada URL tiene su archivo, canonical = la misma URL, sin noindex, sin Offer sin precio
const xml = leer('sitemap.xml')
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
if (locs.length < 700) falla(`sitemap con sólo ${locs.length} URLs`)
let revisadas = 0
for (const u of locs) {
  if (!u.startsWith(BASE + '/')) { falla(`URL fuera del dominio: ${u}`); continue }
  if (/[^\x21-\x7e]/.test(u)) falla(`URL con caracteres no ASCII: ${u}`)
  const rel = decodeURIComponent(u.slice(BASE.length + 1)) + 'index.html'
  if (!existe(rel)) { falla(`sin archivo: ${u}`); continue }
  const h = leer(rel)
  const canon = (h.match(/<link rel="canonical" href="([^"]+)"/) || [])[1]
  if (canon !== u) falla(`canonical ${canon} ≠ ${u}`)
  if (/<meta name="robots" content="[^"]*noindex/.test(h)) falla(`noindex en ${u}`)
  if (/"@type":"Offer"/.test(h) && !/"price":/.test(h)) falla(`Offer sin precio en ${u}`)
  if (/exclusiva a negocios/i.test(h)) falla(`dice «exclusiva a negocios»: ${u}`)
  if (GA4 && !h.includes(`gtag/js?id=${GA4}`)) falla(`sin GA4 en ${u}`)
  if (!GA4 && h.includes('googletagmanager.com')) falla(`GA4 cargado sin ID en ${u}`)
  revisadas++
}

// 2) PIÑA: ficha en ASCII y con contenido (no la página de «no encontrado»)
if (!locs.includes(`${BASE}/tienda/pina/`)) falla('la ficha de PIÑA no está en el sitemap como /tienda/pina/')
else if (!/<title>[^<]*PIÑA/.test(leer('tienda/pina/index.html'))) falla('la ficha /tienda/pina/ no trae el título del producto')

// 3) llms.txt, llave de IndexNow y robots
if (!existe('llms.txt')) falla('falta llms.txt')
else {
  const l = leer('llms.txt')
  if (!l.startsWith('# MACSA') || !l.includes('/papa-a-la-francesa/')) falla('llms.txt sin encabezado o sin familias')
}
if (!existe(`${LLAVE}.txt`) || leer(`${LLAVE}.txt`).trim() !== LLAVE) falla('llave de IndexNow ausente o distinta')
if (!/Sitemap: https:\/\/macsamty\.mx\/sitemap\.xml/.test(leer('robots.txt'))) falla('robots.txt sin sitemap del dominio')

// 3b) Teléfonos tocables (2-oct-2026): el pie de cada página y Contacto llevan tel:
for (const rel of ['index.html', 'contacto/index.html']) {
  const h = leer(rel)
  if (!h.includes('href="tel:+528715015117"')) falla(`${rel} sin liga tel:+528715015117`)
}
// El sitio dice lo mismo que el Perfil de Negocio de Google (2-oct-2026)
{
  const h = leer('index.html')
  for (const [qué, re] of [
    ['C.P. 67128 en el Schema', /"postalCode":"67128"/],
    ['horario en el Schema', /"openingHoursSpecification":\[\{"@type":"OpeningHoursSpecification","dayOfWeek":\["Monday"/],
    ['sameAs con la ficha de Maps', /"sameAs":\["https:\/\/maps\.google\.com\/\?cid=16059455057004438297"\]/],
    ['teléfono 871 en el Schema', /"telephone":"\+52 871 501 5117"/],
  ]) if (!re.test(h)) falla(`portada sin ${qué}`)
}

// Un solo número para clientes (Luis, 2-oct-2026): los fijos 81 ya no van en ninguna página
for (const u of locs) {
  const h = leer(decodeURIComponent(u.slice(BASE.length + 1)) + 'index.html')
  if (/2209 ?2277|2254 ?2834/.test(h)) { falla(`aún muestra un fijo 81: ${u}`); break }
}

// 4) Aviso de privacidad: indexable, en el sitemap y con las fracciones del art. 15 LFPDPPP 2025
if (!locs.includes(`${BASE}/aviso-de-privacidad/`)) falla('el aviso no está en el sitemap')
const aviso = leer('aviso-de-privacidad/index.html').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
const fracciones = {
  'I responsable y domicilio': /Macsa de la Sultana, S\.A\. de C\.V\..*América del Norte 202-B/,
  'II datos tratados': /Qué datos personales usamos/,
  'II sin sensibles': /No usamos datos personales sensibles/,
  'III necesarias': /Finalidades necesarias/,
  'III adicionales': /Finalidades adicionales/,
  'IV limitar uso': /limitar el uso o la divulgación/,
  'V ARCO y plazo 20+15': /20 días.*15 días/,
  'VI cambios': /Cambios a este aviso/,
  'art. 29 departamento': /Departamento de Datos Personales/,
  'autoridad 2025': /Secretaría Anticorrupción y Buen Gobierno/,
}
for (const [f, re] of Object.entries(fracciones)) if (!re.test(aviso)) falla(`aviso sin ${f}`)
if (/INAI|Borrador|Nota interna/.test(aviso)) falla('el aviso aún dice INAI / Borrador / Nota interna')
if (!GA4 && /Google Analytics/.test(aviso)) falla('el aviso menciona Google Analytics sin GA4 puesto')
if (GA4 && !/Google Analytics/.test(aviso)) falla('GA4 puesto y el aviso no lo menciona')

console.log(`${revisadas} de ${locs.length} páginas del sitemap revisadas · GA4 ${GA4 || 'sin ID'}`)
if (fallas.length) {
  console.error(`${fallas.length} FALLAS:\n  ` + fallas.slice(0, 40).join('\n  '))
  process.exit(1)
}
console.log('OK: sin fallas')
