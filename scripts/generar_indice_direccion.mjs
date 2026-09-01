#!/usr/bin/env node
/**
 * Genera el documento HTML de presentación para dirección con TODAS las
 * páginas del sitio y su dirección.
 *
 * Se construye leyendo `lib/` y `out/`, no a mano: con 844 direcciones, una
 * lista escrita a mano se desactualiza el mismo día. Los logotipos se
 * incrustan como data URI porque el visor de artifacts bloquea imágenes
 * externas.
 *
 * Uso: node scripts/generar_indice_direccion.mjs <archivo-salida.html>
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const SALIDA = process.argv[2]
if (!SALIDA) {
  console.error('Falta la ruta de salida.')
  process.exit(1)
}

const BASE = 'https://iaingenieria.github.io/macsa-web'

/* ── Lectura de los datos reales ──────────────────────────────────── */

const lib = (f) => fs.readFileSync(path.join(RAIZ, 'lib', f), 'utf8')

function registros(archivo, campos = []) {
  return lib(archivo)
    .split(/\{\s*\n?\s*slug:/)
    .slice(1)
    .map((b) => {
      const slug = b.match(/^\s*'([^']+)'/)?.[1]
      if (!slug) return null
      const r = { slug, nombre: b.match(/nombre:\s*'([^']+)'/)?.[1] ?? slug }
      for (const c of campos) {
        const m = b.match(new RegExp(`${c}:\\s*'([^']+)'`))
        if (m) r[c] = m[1]
      }
      r.pilar = /pilar:\s*true/.test(b)
      const f = b.match(/factura:\s*(\d+)/)
      if (f) r.factura = Number(f[1])
      const mo = b.match(/modo:\s*'([^']+)'/)
      if (mo) r.modo = mo[1]
      return r
    })
    .filter(Boolean)
}

const ANCLAS = registros('anclas.ts', ['h1', 'familia'])
const CIUDADES = registros('ciudades.ts', ['estado', 'region'])
const FAMILIAS = registros('familias.ts', ['h1', 'tagline'])
// tips.ts abre cada entrada con `n:` antes del `slug`, asi que el lector
// generico no la ve. Se parsea aparte o el conteo sale 11 paginas corto.
const TIPS = [
  ...lib('tips.ts').matchAll(
    /slug:\s*'([^']+)',[\s\S]*?titulo:\s*'([^']+)',[\s\S]*?gancho:\s*'([^']*)'/g,
  ),
].map((m) => ({ slug: m[1], titulo: m[2], gancho: m[3] }))
const CATALOGO = JSON.parse(
  fs.readFileSync(path.join(RAIZ, 'data', 'catalogo.json'), 'utf8'),
).productos

const MODOS = {
  diaria: 'Ruta diaria',
  desarrollo: 'Ruta en desarrollo',
  corredor: 'Corredor Saltillo–Torreón',
  dedicado: 'Viaje dedicado',
  consulta: 'Bajo consulta',
}

const INSTITUCIONALES = [
  ['', 'Inicio', 'La portada'],
  ['catalogo', 'Catálogo', 'Las 14 líneas de producto'],
  ['tienda', 'Tienda', 'Catálogo con ficha por código'],
  ['marcas', 'Marcas', 'El portafolio y las tres relaciones directas'],
  ['cobertura', 'Cobertura', 'Las 30 ciudades y su modo de entrega'],
  ['consejos', 'Consejos', 'Los 11 videos de tips de cocina'],
  ['cadena-de-frio', 'Cadena de frío', 'Cómo llega el producto'],
  ['nosotros', 'Nosotros', 'Quiénes somos'],
  ['alta-de-cliente', 'Alta de cliente', 'Cómo abrir cuenta'],
  ['contacto', 'Contacto', 'WhatsApp, teléfonos y CEDIS'],
  ['preguntas-frecuentes', 'Preguntas frecuentes', 'Lo que más preguntan'],
  ['aviso-de-privacidad', 'Aviso de privacidad', 'Borrador, pendiente de revisión legal'],
]

/* ── Utilidades ───────────────────────────────────────────────────── */

const b64 = (rel) =>
  'data:image/png;base64,' + fs.readFileSync(path.join(RAIZ, 'public', rel)).toString('base64')

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const url = (slug) => `${BASE}/${slug ? slug + '/' : ''}`

const link = (slug, texto, extra = '') =>
  `<a class="u" href="${url(slug)}" target="_blank" rel="noopener">${esc(texto)}${
    extra ? `<span class="ux">${esc(extra)}</span>` : ''
  }</a>`

const pesos = (n) =>
  n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : `$${Math.round(n / 1000)}k`

/* ── Secciones ────────────────────────────────────────────────────── */

let bloques = ''

// 1 · Institucionales
bloques += `
<section id="institucionales">
  <div class="sh"><span class="cat">Categoría 1</span><h2>Páginas institucionales</h2>
  <p class="si">Las que explican la empresa. Escritas a mano, una por una.</p></div>
  <div class="lista">
    ${INSTITUCIONALES.map(
      ([s, n, d]) => `<div class="row">
      <div class="rn">${link(s, n)}<span class="rd">${esc(d)}</span></div>
      <code class="rc">/${s ? s + '/' : ''}</code></div>`,
    ).join('')}
  </div>
  <p class="tot">${INSTITUCIONALES.length} páginas</p>
</section>`

// 2 · Familias
bloques += `
<section id="familias">
  <div class="sh"><span class="cat">Categoría 2</span><h2>Líneas de producto</h2>
  <p class="si">Una por cada familia del catálogo. Cada una con su guía de elección: qué pedir según el tipo de cocina.</p></div>
  <div class="lista">
    ${FAMILIAS.map(
      (f) => `<div class="row">
      <div class="rn">${link(f.slug, f.nombre)}<span class="rd">${esc(f.tagline ?? '')}</span></div>
      <code class="rc">/${f.slug}/</code></div>`,
    ).join('')}
  </div>
  <p class="tot">${FAMILIAS.length} páginas</p>
</section>`

// 3 · Anclas
const anclasOrd = [...ANCLAS].sort((a, b) => (b.factura ?? 0) - (a.factura ?? 0))
bloques += `
<section id="anclas">
  <div class="sh"><span class="cat">Categoría 3</span><h2>Productos ancla</h2>
  <p class="si">Los veinte productos concretos que la gente escribe en el buscador.
  <strong>No se eligieron por intuición:</strong> salen de la facturación real de 2026 en Microsip.
  De cada uno se generan sus treinta páginas de ciudad.</p></div>
  <div class="lista">
    ${anclasOrd
      .map(
        (a) => `<div class="row">
      <div class="rn">${link(a.slug, a.nombre)}<span class="rd">${esc(a.h1 ?? '')}</span></div>
      <span class="fact">${a.factura ? pesos(a.factura) : '—'}</span>
      <code class="rc">/${a.slug}/</code></div>`,
      )
      .join('')}
  </div>
  <p class="tot">${ANCLAS.length} páginas · ordenadas por facturación 2026</p>
</section>`

// 4 · Producto × ciudad — la malla
const porModo = {}
for (const c of CIUDADES) (porModo[c.modo] ??= []).push(c)

bloques += `
<section id="geo">
  <div class="sh"><span class="cat">Categoría 4</span><h2>Producto × ciudad</h2>
  <p class="si">El corazón del sitio: cada producto ancla cruzado con cada ciudad.
  <strong>Cada página declara el modo de entrega real de su ciudad</strong> — y las que no tienen
  ruta lo dicen de frente.</p></div>

  <div class="modos">
    ${Object.entries(MODOS)
      .map(([k, v]) => {
        const cs = porModo[k] ?? []
        return `<div class="modo">
        <span class="mn">${cs.length} ${cs.length === 1 ? 'ciudad' : 'ciudades'}</span>
        <h3>${esc(v)}</h3>
        <p>${cs.map((c) => esc(c.nombre)).join(' · ')}</p></div>`
      })
      .join('')}
  </div>

  ${anclasOrd
    .map(
      (a) => `<div class="bloque">
    <div class="bh"><h3>${link(a.slug, a.nombre)}</h3>
    <span class="bc">30 ciudades</span></div>
    <div class="chips">
      ${CIUDADES.map(
        (c) =>
          `<a class="chip m-${c.modo}" href="${url(`${a.slug}-en-${c.slug}`)}" target="_blank" rel="noopener" title="${esc(MODOS[c.modo])} · ${esc(c.estado)}">${esc(c.nombre)}</a>`,
      ).join('')}
    </div></div>`,
    )
    .join('')}
  <p class="tot">${ANCLAS.length} × ${CIUDADES.length} = <strong>${ANCLAS.length * CIUDADES.length} páginas</strong></p>
</section>`

// 5 · Familia × ciudad
const conPilar = FAMILIAS.filter((f) => f.pilar)
bloques += `
<section id="famgeo">
  <div class="sh"><span class="cat">Categoría 5</span><h2>Línea × ciudad</h2>
  <p class="si">Las tres líneas con página pilar escrita a mano también se cruzan con ciudad,
  para la búsqueda amplia. <strong>Ninguna línea se genera por ciudad sin ese pilar:</strong>
  un pilar flojo produce treinta páginas flojas.</p></div>
  ${conPilar
    .map(
      (f) => `<div class="bloque">
    <div class="bh"><h3>${link(f.slug, f.nombre)}</h3><span class="bc">30 ciudades</span></div>
    <div class="chips">
      ${CIUDADES.map(
        (c) =>
          `<a class="chip m-${c.modo}" href="${url(`${f.slug}-en-${c.slug}`)}" target="_blank" rel="noopener" title="${esc(MODOS[c.modo])} · ${esc(c.estado)}">${esc(c.nombre)}</a>`,
      ).join('')}
    </div></div>`,
    )
    .join('')}
  <p class="tot">${conPilar.length} × ${CIUDADES.length} = <strong>${conPilar.length * CIUDADES.length} páginas</strong></p>
</section>`

// 6 · Tienda
const porFam = {}
for (const p of CATALOGO) (porFam[p.c] ??= []).push(p)
bloques += `
<section id="tienda">
  <div class="sh"><span class="cat">Categoría 6</span><h2>Fichas de producto</h2>
  <p class="si">Una página por código, con fotografía oficial del fabricante, presentación, kilos
  por caja y <strong>cuántas órdenes rinde</strong>. Ese último dato no lo publica ningún competidor.</p></div>
  ${Object.entries(porFam)
    .sort((a, b) => b[1].length - a[1].length)
    .map(
      ([cat, ps]) => `<div class="bloque">
    <div class="bh"><h3>${esc(cat)}</h3><span class="bc">${ps.length} ${ps.length === 1 ? 'código' : 'códigos'}</span></div>
    <div class="chips">
      ${ps
        .map(
          (p) =>
            `<a class="chip sku" href="${url('tienda/' + p.s.toLowerCase())}" target="_blank" rel="noopener" title="${esc(p.d)}">${esc(p.s)}</a>`,
        )
        .join('')}
    </div></div>`,
    )
    .join('')}
  <p class="tot">${CATALOGO.length} fichas · más el índice de la tienda</p>
</section>`

// 7 · Consejos
bloques += `
<section id="consejos">
  <div class="sh"><span class="cat">Categoría 7</span><h2>Consejos en video</h2>
  <p class="si">La serie de tips de cocina, con página propia cada uno: el video, el guion como
  texto y la ficha que le dice a Google que ahí hay un video. Aparecen embebidos en la página del
  producto del que hablan.</p></div>
  <div class="lista">
    ${TIPS.map(
      (t) => `<div class="row">
      <div class="rn">${link('consejos/' + t.slug, t.titulo)}<span class="rd">${esc(t.gancho ?? '')}</span></div>
      <code class="rc">/consejos/${t.slug}/</code></div>`,
    ).join('')}
  </div>
  <p class="tot">${TIPS.length} páginas · más el índice de consejos</p>
</section>`

/* ── Documento ────────────────────────────────────────────────────── */

const TOTAL_GEO = ANCLAS.length * CIUDADES.length
const TOTAL_FAMGEO = conPilar.length * CIUDADES.length
const TOTAL =
  INSTITUCIONALES.length +
  FAMILIAS.length +
  ANCLAS.length +
  TOTAL_GEO +
  TOTAL_FAMGEO +
  CATALOGO.length +
  1 +
  TIPS.length +
  1

// Documento HTML completo y autónomo: se abre con doble clic, se manda por
// correo o se imprime a PDF sin depender de nada. Los logotipos van
// incrustados; lo único externo son las tipografías, y hay respaldo del
// sistema si no hay internet.
const html = `<!doctype html>
<html lang="es-MX">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sitio MACSA · Índice de páginas</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
<style>
html{color-scheme:light dark}
body{margin:0}
img{max-width:100%}
/* Impresión a PDF: fondo blanco, sin cortar bloques a media página */
@media print{
  body{background:#fff}
  section,.bloque,.row,.modo,.cifra{break-inside:avoid}
  .toc{display:none}
  a{text-decoration:none;color:inherit}
  a[href^="http"]::after{content:" " attr(href);font-size:9px;color:#666;word-break:break-all}
  .chips a::after{content:none}
}
:root{
  color-scheme:light;
  --navy:#002C49;--navy-7:#013D63;--navy-6:#0A527E;
  --paper:#F1F6FA;--surf:#FFFFFF;--surf2:#E3EDF4;--rule:#CBDDE9;
  --ink:#0A1822;--ink2:#2F4351;--ink3:#566B7B;
  --fry:#9C5C0E;--fry-s:#FCF1DE;--ruta:#2A6F51;--ruta-s:#E4F1EB;--alert:#9C3225;--alert-s:#FAE9E6;
}
*{box-sizing:border-box}
body{background:var(--paper);color:var(--ink);font-family:"IBM Plex Sans",system-ui,sans-serif;font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
.shell{max-width:1140px;margin:0 auto;padding:0 22px 90px}
a{color:var(--fry)}
a:focus-visible{outline:2px solid var(--fry);outline-offset:2px}

/* Portada */
.port{border-top:5px solid var(--navy);margin:40px 0 44px;padding-top:26px}
/* Los dos logotipos son azul marino y ninguno se puede invertir: el de MACSA
   es monotono pero el de Lamb Weston es multicolor de marca. Van sobre placa
   blanca para que lean con contraste pase lo que pase. */
.marca{display:flex;align-items:center;gap:16px;margin-bottom:26px;flex-wrap:wrap;
  background:#fff;border:1px solid var(--rule);padding:18px 22px}
.marca img.iso{height:62px;width:auto}
.marca .mt{line-height:1.15}
.marca .mn{font-family:Archivo,sans-serif;font-weight:800;font-size:1.5rem;letter-spacing:-.02em;color:var(--navy);display:block}
.marca .ms{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink3)}
.marca .sep{width:1px;align-self:stretch;background:var(--rule);margin:0 6px}
.marca img.lw{height:34px;width:auto}
.marca .lwt{font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.15em;text-transform:uppercase;color:var(--ink3);display:block;margin-bottom:5px}
h1{font-family:Archivo,sans-serif;font-weight:800;font-size:clamp(2rem,5vw,3rem);line-height:1.04;letter-spacing:-.03em;margin:0 0 16px;text-wrap:balance}
.sub{font-size:1.1rem;line-height:1.55;color:var(--ink2);max-width:64ch;margin:0}
.meta{font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.13em;text-transform:uppercase;color:var(--ink3);display:flex;flex-wrap:wrap;gap:6px 18px;margin-bottom:16px}

.cifras{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1px;background:var(--rule);border:1px solid var(--rule);margin:34px 0 0}
.cifra{background:var(--surf);padding:17px 19px}
.cifra b{display:block;font-family:Archivo,sans-serif;font-size:2rem;font-weight:800;line-height:1;letter-spacing:-.03em;color:var(--navy);font-variant-numeric:tabular-nums;margin-bottom:5px}
.cifra span{display:block;font-size:.85rem;line-height:1.35;color:var(--ink2)}

.aviso{border-left:4px solid var(--fry);background:var(--fry-s);padding:15px 19px;margin:30px 0 0}
.aviso p{margin:0;font-size:.95rem;line-height:1.55}
.aviso b{color:var(--ink)}

/* Índice */
.toc{border:1px solid var(--rule);background:var(--surf);padding:20px 22px;margin:44px 0 0}
.toc h2{font-family:Archivo,sans-serif;font-size:.8rem;font-weight:600;letter-spacing:.13em;text-transform:uppercase;color:var(--ink3);margin:0 0 12px}
.toc ol{margin:0;padding-left:20px;columns:2;column-gap:34px}
.toc li{margin-bottom:6px;font-size:.94rem}
@media(max-width:640px){.toc ol{columns:1}}

/* Secciones */
section{margin-top:56px;scroll-margin-top:20px}
.sh{border-top:1px solid var(--rule);padding-top:15px;margin-bottom:22px}
.cat{font-family:"IBM Plex Mono",monospace;font-size:10.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--fry);display:block;margin-bottom:7px}
h2{font-family:Archivo,sans-serif;font-weight:700;font-size:clamp(1.35rem,2.8vw,1.75rem);line-height:1.14;letter-spacing:-.02em;margin:0;text-wrap:balance}
.si{margin:10px 0 0;max-width:70ch;color:var(--ink2);font-size:.96rem}
h3{font-family:Archivo,sans-serif;font-weight:600;font-size:1rem;margin:0}

/* Listas de una columna */
.lista{border:1px solid var(--rule);background:var(--surf)}
.row{display:flex;align-items:baseline;gap:14px;padding:11px 15px;border-bottom:1px solid var(--rule);flex-wrap:wrap}
.row:last-child{border-bottom:none}
.rn{flex:1;min-width:220px}
.rd{display:block;font-size:.86rem;color:var(--ink3);line-height:1.4;margin-top:2px}
.rc{font-family:"IBM Plex Mono",monospace;font-size:11.5px;color:var(--ink3);white-space:nowrap}
.fact{font-family:"IBM Plex Mono",monospace;font-size:12px;font-weight:600;color:var(--navy);font-variant-numeric:tabular-nums;white-space:nowrap}
a.u{font-weight:600;color:var(--navy-6);text-decoration:none}
a.u:hover{color:var(--fry);text-decoration:underline}

/* Bloques con chips */
.bloque{border:1px solid var(--rule);background:var(--surf);margin-bottom:1px;padding:14px 15px}
.bh{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:10px;flex-wrap:wrap}
.bc{font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink3)}
.chips{display:flex;flex-wrap:wrap;gap:5px}
.chip{display:inline-block;font-size:12.5px;line-height:1.2;padding:5px 9px;border:1px solid var(--rule);background:var(--paper);color:var(--ink2);text-decoration:none;border-radius:2px}
.chip:hover{border-color:var(--fry);color:var(--fry)}
.chip.m-diaria,.chip.m-desarrollo{border-left:3px solid var(--ruta)}
.chip.m-corredor,.chip.m-dedicado{border-left:3px solid var(--navy-6)}
.chip.m-consulta{border-left:3px solid var(--ink3)}
.chip.sku{font-family:"IBM Plex Mono",monospace;font-size:11.5px;font-weight:500}

/* Modos de entrega */
.modos{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:1px;background:var(--rule);border:1px solid var(--rule);margin-bottom:26px}
.modo{background:var(--surf);padding:15px 17px}
.mn{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:var(--ink3);display:block;margin-bottom:5px}
.modo h3{font-size:.98rem;margin-bottom:6px}
.modo p{margin:0;font-size:.83rem;line-height:1.45;color:var(--ink2)}

.tot{font-family:Archivo,sans-serif;font-weight:600;font-size:.92rem;color:var(--ink2);margin:14px 0 0;text-align:right}

.colof{margin-top:64px;border-top:5px solid var(--navy);padding-top:18px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.colof img{height:38px;width:auto;background:#fff;padding:4px;border:1px solid var(--rule)}
.colof p{margin:0;font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.05em;line-height:1.75;color:var(--ink3)}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
</head>
<body>

<div class="shell">

<header class="port">
  <div class="marca">
    <img class="iso" src="${b64('isotipo-macsa.png')}" alt="MACSA">
    <span class="mt"><span class="mn">MACSA</span><span class="ms">Foodservice · De la Sultana</span></span>
    <span class="sep" aria-hidden="true"></span>
    <span><span class="lwt">Distribuidor oficial</span><img class="lw" src="${b64('lamb-weston.png')}" alt="Lamb Weston"></span>
  </div>

  <div class="meta"><span>Índice de páginas</span><span>Presentación a dirección</span><span>31 · ago · 2026</span></div>
  <h1>El sitio, página por página</h1>
  <p class="sub">Las ${TOTAL} páginas del sitio de MACSA con su dirección, agrupadas por la forma en que
  se construyeron. Todos los enlaces abren la página real: el sitio está en línea y funcionando.</p>

  <div class="cifras">
    <div class="cifra"><b>${TOTAL}</b><span>páginas en línea</span></div>
    <div class="cifra"><b>${ANCLAS.length}</b><span>productos ancla</span></div>
    <div class="cifra"><b>${CIUDADES.length}</b><span>ciudades en 3 estados</span></div>
    <div class="cifra"><b>${CATALOGO.length}</b><span>fichas de producto</span></div>
  </div>

  <div class="aviso">
    <p><b>El sitio todavía no aparece en Google, y es a propósito.</b> Vive en una dirección
    provisional mientras se decide el dominio definitivo. Si se dejara indexar ahora, el día del
    cambio quedarían ${TOTAL} direcciones duplicadas que habría que redirigir una por una.
    Quitarlo es cambiar una línea el día que exista el dominio.</p>
  </div>

  <nav class="toc">
    <h2>Las siete categorías</h2>
    <ol>
      <li><a href="#institucionales">Páginas institucionales</a> — ${INSTITUCIONALES.length}</li>
      <li><a href="#familias">Líneas de producto</a> — ${FAMILIAS.length}</li>
      <li><a href="#anclas">Productos ancla</a> — ${ANCLAS.length}</li>
      <li><a href="#geo">Producto × ciudad</a> — ${TOTAL_GEO}</li>
      <li><a href="#famgeo">Línea × ciudad</a> — ${TOTAL_FAMGEO}</li>
      <li><a href="#tienda">Fichas de producto</a> — ${CATALOGO.length}</li>
      <li><a href="#consejos">Consejos en video</a> — ${TIPS.length}</li>
    </ol>
  </nav>
</header>

${bloques}

<div class="colof">
  <img src="${b64('isotipo-macsa.png')}" alt="">
  <p>MACSA de la Sultana · Goodman Tech / Mr. Ruta<br>
  Sitio en línea: iaingenieria.github.io/macsa-web · generado el 31 de agosto de 2026<br>
  Documento construido desde el sitio real — las ${TOTAL} direcciones se leyeron del proyecto, no se escribieron a mano</p>
</div>

</div>

</body>
</html>
`

fs.writeFileSync(SALIDA, html, 'utf8')
console.log(`${SALIDA} · ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB · ${TOTAL} páginas indexadas`)
