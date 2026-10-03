// Prueba de los eventos de contacto de GA4 (2-oct-2026), sobre el HTML COMPILADO (out/index.html), en vm.
// Comprueba dos cosas: (1) sin GA4 (bloqueador o sin ID) ningún clic truena; (2) con gtag, cada clic manda
// el evento correcto. Sale con código 1 si algo falla.
import fs from 'node:fs'
import vm from 'node:vm'

const html = fs.readFileSync(new URL('../out/index.html', import.meta.url), 'utf8')
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1])
const codigo = scripts.find((s) => s.includes('window.macsaEvento'))
if (!codigo) { console.error('FALLA: no está el script de eventos en out/index.html'); process.exit(1) }

function entorno({ conGtag, chatListo }) {
  const enviados = []
  let alClic = null
  const elemento = (attrs, clases = []) => ({
    getAttribute: (k) => attrs[k] ?? null,
    hasAttribute: (k) => k in attrs,
    classList: { contains: (c) => clases.includes(c) },
    closest(sel) { return sel.startsWith('a[') && 'href' in attrs ? this : null },
  })
  const raiz = { querySelector: (s) => (chatListo && (s === '.panel' || s === 'textarea') ? {} : null) }
  const window = {}
  if (conGtag) window.gtag = (tipo, nombre, datos) => enviados.push([tipo, nombre, datos])
  const ctx = {
    window,
    location: { pathname: '/papa-a-la-francesa/' },
    document: {
      addEventListener: (t, f) => { if (t === 'click') alClic = f },
      querySelector: (s) => (s === '[data-forja-widget]' ? { shadowRoot: raiz } : null),
    },
  }
  vm.createContext(ctx)
  vm.runInContext(codigo, ctx)
  const clic = (el) => alClic({ target: el, composedPath: () => [el] })
  return { enviados, clic, elemento }
}

const fallas = []
// 1) Sin GA4: nada truena
{
  const e = entorno({ conGtag: false, chatListo: false })
  try {
    e.clic(e.elemento({ href: 'tel:+528122092277' }))
    e.clic(e.elemento({ href: 'https://wa.me/528715015117?text=hola' }))
    e.clic(e.elemento({}, ['burbuja']))
  } catch (err) { fallas.push('sin GA4 un clic truena: ' + err.message) }
  if (e.enviados.length) fallas.push('sin GA4 se enviaron eventos')
}
// 2) Con GA4
{
  const e = entorno({ conGtag: true, chatListo: true })
  e.clic(e.elemento({ href: 'tel:+528122092277' }))
  e.clic(e.elemento({ href: 'https://wa.me/528715015117?text=hola', 'data-chat': '' }))
  e.clic(e.elemento({}, ['burbuja']))
  const e2 = entorno({ conGtag: true, chatListo: false })
  e2.clic(e2.elemento({ href: 'https://wa.me/528715015117?text=hola', 'data-chat': '' }))
  e2.clic(e2.elemento({ href: '/catalogo/' }))
  const nombres = e.enviados.map((x) => x[1]).join(',')
  if (nombres !== 'contacto_llamada,abrir_asistente,abrir_asistente') fallas.push('con chat listo: ' + nombres)
  const n2 = e2.enviados.map((x) => x[1]).join(',')
  if (n2 !== 'contacto_whatsapp') fallas.push('sin chat (cae a WhatsApp): ' + n2)
  if (e.enviados.some((x) => x[2].transport_type !== 'beacon')) fallas.push('evento sin transport_type beacon')
}
// 3) El formulario manda generate_lead (está en el bundle del cliente)
const chunks = fs.readdirSync(new URL('../out/_next/static/chunks/app/', import.meta.url), { recursive: true })
  .filter((f) => String(f).endsWith('.js'))
  .map((f) => fs.readFileSync(new URL('../out/_next/static/chunks/app/' + String(f).replace(/\\/g, '/'), import.meta.url), 'utf8'))
const todo = chunks.join('\n') + fs.readdirSync(new URL('../out/_next/static/chunks/', import.meta.url))
  .filter((f) => f.endsWith('.js'))
  .map((f) => fs.readFileSync(new URL('../out/_next/static/chunks/' + f, import.meta.url), 'utf8')).join('\n')
if (!todo.includes('generate_lead')) fallas.push('el formulario compilado no manda generate_lead')

if (fallas.length) { console.error('FALLAS:\n  ' + fallas.join('\n  ')); process.exit(1) }
console.log('OK: eventos GA4 (sin GA4 no truena; llamada, chat, WhatsApp y formulario)')
