# -*- coding: utf-8 -*-
"""[S182 · 13-oct-2026] Las páginas de producto SECO no hablan de congelado ni de cadena de frío (Luis: «todo esto es
seco, no va al caso el comentario de que se traslada en frío»).

1) data/secos.json — qué códigos son secos y cuáles congelados. Fuente: `sku_clasificacion_macsa.tipo_almacen` (la
   misma que usa el botón «Solicitud SECOS» del CEDIS: 66 SECO / 86 CONGELADO al 13-oct). Si un código no está
   clasificado y su línea de Microsip es HEINZ, SALSAS o ACEITE, se toma como seco (`origen: linea`).
2) Componentes: una página es seca si TODOS sus códigos clasificados son secos (lib/secos.ts → esSeco). En ella:
   sin sección «Cadena de frío», sin el dato «Cadena de frío», sin la pregunta de descongelar, barra de confianza
   con la entrega (y el logo de Heinz en sus páginas) en vez de «Cadena de frío garantizada» y Lamb Weston.
3) scripts/generar_geo.mjs: la descripción de las páginas por ciudad de un producto seco no dice «cadena de frío».
Uso: python scripts/s182_secos.py  (la parte de código ya se aplicó el 13-oct; para refrescar la lista basta regenerar data/secos.json)   (lee Supabase con la llave del .env; sólo GET)"""
import json, os, urllib.request, datetime
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env = dict(l.strip().split('=', 1) for l in open(os.path.join(R, '..', 'sync_microsip', '.env'), encoding='utf-8') if '=' in l and not l.startswith('#'))
SB = 'https://jlhvtjsdbdgwvfhjahdi.supabase.co'; K = env['SB_SERVICE_KEY']; H = {'apikey': K, 'Authorization': 'Bearer ' + K}
get = lambda q: json.loads(urllib.request.urlopen(urllib.request.Request(f'{SB}/rest/v1/{q}', headers=H), timeout=60).read())

cls = {x['sku']: x['tipo_almacen'] for x in get('sku_clasificacion_macsa?select=sku,tipo_almacen&limit=5000') if x['tipo_almacen']}
lin = {x['clave']: x['linea'] for x in get('linea_microsip_macsa?select=clave,linea&limit=5000')}
seco = sorted(s for s, t in cls.items() if t == 'SECO')
cong = sorted(s for s, t in cls.items() if t == 'CONGELADO')
por_linea = sorted(s for s, l in lin.items() if s not in cls and l in ('HEINZ', 'SALSAS', 'ACEITE'))
json.dump({
    '_fuente': 'sku_clasificacion_macsa.tipo_almacen (+ línea de Microsip HEINZ/SALSAS/ACEITE para lo no clasificado)',
    '_generado': datetime.datetime.now().strftime('%Y-%m-%d %H:%M'),
    'seco': seco, 'seco_por_linea': por_linea, 'congelado': cong,
    # sin clasificar: aceite (gemelos de KF/GCH20, SECO) y sazonadores en polvo
    'seco_manual': ['KF101', 'GCH', 'P082', 'P084', 'SCAJUN'],
}, open(os.path.join(R, 'data', 'secos.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('secos', len(seco), '· secos por línea', len(por_linea), '· congelados', len(cong))


def editar(rel, pares):
    p = os.path.join(R, rel)
    s = open(p, encoding='utf-8', newline='').read()
    nl = '\r\n' if '\r\n' in s else '\n'
    for a, b in pares:
        a, b = a.replace('\r\n', '\n').replace('\n', nl), b.replace('\r\n', '\n').replace('\n', nl)
        c = s.count(a)
        assert c == 1, (rel, c, a[:70])
        s = s.replace(a, b)
    open(p, 'w', encoding='utf-8', newline='').write(s)
    print('ok', rel, len(pares))


open(os.path.join(R, 'lib', 'secos.ts'), 'w', encoding='utf-8').write("""import datos from '@/data/secos.json'

/**
 * SECO o CONGELADO (S182, 13-oct-2026). Fuente: `sku_clasificacion_macsa` (la del botón «Solicitud SECOS» del
 * CEDIS), regenerada con `python scripts/s182_secos.py`. Una página es SECA si todos sus códigos clasificados son
 * secos: entonces no habla de congelado ni de cadena de frío (Luis: «esta particularidad en secos no es relevante»).
 */
const SECO = new Set<string>([...datos.seco, ...datos.seco_por_linea])
const CONGELADO = new Set<string>(datos.congelado)

export function esSeco(skus: string[]): boolean {
  const clasificados = skus.filter((s) => SECO.has(s) || CONGELADO.has(s))
  return clasificados.length > 0 && clasificados.every((s) => SECO.has(s))
}
""")
print('ok lib/secos.ts')

# Barra de confianza: Heinz ya es directo; versión para secos sin «cadena de frío»
editar('lib/site.ts', [
    ("  { valor: 'Directo', etiqueta: 'Agrosuper y Martin’s, sin intermediarios' },",
     "  { valor: 'Directo', etiqueta: 'Heinz, Agrosuper y Martin’s, sin intermediarios' },"),
    ("  { valor: 'Logística', etiqueta: 'Cadena de frío garantizada, sin cortes' },\n] as const\n",
     "  { valor: 'Logística', etiqueta: 'Cadena de frío garantizada, sin cortes' },\n] as const\n\n"
     "/** [S182] Para páginas de producto seco: sin «cadena de frío». */\n"
     "export const CONFIANZA_SECO = [\n"
     "  { valor: 'Directo', etiqueta: 'Heinz, Agrosuper y Martin’s, sin intermediarios' },\n"
     "  { valor: 'Oficial', etiqueta: 'Distribuidor Lamb Weston en Monterrey' },\n"
     "  { valor: 'Calidad', etiqueta: 'Las mejores marcas del mercado' },\n"
     "  { valor: 'Entrega', etiqueta: 'Al día siguiente en el área metropolitana' },\n"
     "] as const\n"),
])
editar('components/landing/Secciones.tsx', [
    ("import { asset, CONFIANZA, EMPRESA, waLink } from '@/lib/site'",
     "import { asset, CONFIANZA, CONFIANZA_SECO, EMPRESA, waLink } from '@/lib/site'"),
    ("export function BarraConfianza() {", "export function BarraConfianza({ seco = false, logo }: { seco?: boolean; logo?: { src: string; alt: string } } = {}) {"),
    ("          {CONFIANZA.map((c) => (", "          {(seco ? CONFIANZA_SECO : CONFIANZA).map((c) => ("),
    ("""          <img
            src={asset('/lamb-weston.png')}
            alt="Lamb Weston — Possibilities in Potatoes"
            width={444}
            height={113}
            className="h-9 w-auto"
          />""",
     """          <img
            src={logo ? logo.src : asset('/lamb-weston.png')}
            alt={logo ? logo.alt : 'Lamb Weston — Possibilities in Potatoes'}
            width={444}
            height={113}
            className="h-9 w-auto"
          />"""),
])

editar('components/landing/PaginaAncla.tsx', [
    ("import { porSkus } from '@/lib/catalogo'", "import { porSkus } from '@/lib/catalogo'\nimport { esSeco } from '@/lib/secos'"),
    ("  const productos = porSkus(a.skus)\n", "  const productos = porSkus(a.skus)\n  const seco = esSeco(a.skus)\n"),
    ("""    {
      p: '¿Hay que descongelar antes de usarlo?',""", """    ...(seco ? [] : [{
      p: '¿Hay que descongelar antes de usarlo?',"""),
    ("descongelarlo es justo lo que lo deja aguado.',\n    },", "descongelarlo es justo lo que lo deja aguado.',\n    }]),"),
    ("          { etiqueta: 'Cadena de frío', valor: 'Garantizada, sin cortes' },",
     "          seco\n            ? { etiqueta: 'Existencia', valor: 'Continua, mismo código' }\n            : { etiqueta: 'Cadena de frío', valor: 'Garantizada, sin cortes' },"),
    ("      <BarraConfianza />", "      <BarraConfianza seco={seco} />"),
    ("      <CadenaFrio />", "      {!seco && <CadenaFrio />}"),
])

for rel, expr in (('components/landing/PaginaFamilia.tsx', None), ('components/landing/PaginaGeo.tsx', None)):
    s = open(os.path.join(R, rel), encoding='utf-8').read()
    imp = "import { esSeco } from '@/lib/secos'\n"
    first_import_end = s.index('\n', s.index('import ')) + 1
    pares = [
        ("          { etiqueta: 'Cadena de frío', valor: 'Garantizada, sin cortes' },",
         "          seco\n            ? { etiqueta: 'Existencia', valor: 'Continua, mismo código' }\n            : { etiqueta: 'Cadena de frío', valor: 'Garantizada, sin cortes' },"),
        ("      <BarraConfianza />", "      <BarraConfianza seco={seco} />"),
        ("      <CadenaFrio />", "      {!seco && <CadenaFrio />}"),
    ]
    editar(rel, pares)
    s = open(os.path.join(R, rel), encoding='utf-8', newline='').read()
    nl = '\r\n' if '\r\n' in s else '\n'
    s = s[:first_import_end] + imp.replace('\n', nl) + s[first_import_end:]
    # const seco justo después de obtener la familia
    linea_seco = '  const seco = esSeco(f.productos.map((p) => p.codigo))'
    if 'familia(familiaSlug)!' in s:          # PaginaGeo: después de obtener la familia
        marca = '  const f = familia(familiaSlug)!'
        assert s.count(marca) == 1, rel
        s = s.replace(marca, marca + nl + linea_seco, 1)
    else:                                     # PaginaFamilia: `f` llega como propiedad
        marca = '  const girosDeLaFamilia'
        assert s.count(marca) == 1, rel
        s = s.replace(marca, linea_seco + nl + marca, 1)
    open(os.path.join(R, rel), 'w', encoding='utf-8', newline='').write(s)
    print('ok', rel, 'const seco')

editar('components/landing/PaginaIntencion.tsx', [
    ("import { breadcrumbSchema, faqSchema, ld } from '@/lib/schema'",
     "import { breadcrumbSchema, faqSchema, ld } from '@/lib/schema'\nimport { esSeco } from '@/lib/secos'"),
    ("  const base = intencion(slug)!\n", "  const base = intencion(slug)!\n  const seco = esSeco(it.skus)\n"),
    ("          { etiqueta: 'Cadena de frío', valor: 'Garantizada, sin cortes' },",
     "          seco\n            ? { etiqueta: 'Existencia', valor: 'Continua, mismo código' }\n            : { etiqueta: 'Cadena de frío', valor: 'Garantizada, sin cortes' },"),
    ("      <BarraConfianza />", "      <BarraConfianza seco={seco} logo={it.logo ? { src: it.logo, alt: 'Heinz' } : undefined} />"),
    ("      <CadenaFrio />", "      {!seco && <CadenaFrio />}"),
])

# Descripción de las páginas por ciudad
editar('scripts/generar_geo.mjs', [
    ("      return { slug, nombre: nombre ?? slug, region, estado, pilar: /pilar:\\s*true/.test(b) }",
     "      const skus = [...(b.match(/skus:\\s*\\[([^\\]]*)\\]/)?.[1] ?? '').matchAll(/'([^']+)'/g), ...b.matchAll(/codigo:\\s*'([^']+)'/g)].map((m) => m[1])\n"
     "      return { slug, nombre: nombre ?? slug, region, estado, pilar: /pilar:\\s*true/.test(b), skus }"),
])
p = os.path.join(R, 'scripts', 'generar_geo.mjs')
s = open(p, encoding='utf-8', newline='').read()
nl = '\r\n' if '\r\n' in s else '\n'
viejo = "Distribuidor para restaurantes con cadena de frío garantizada y existencia continua. Punto de venta y servicio a domicilio.',"
nuevo = "Distribuidor para restaurantes con ${seco ? '' : 'cadena de frío garantizada y '}existencia continua. Punto de venta y servicio a domicilio.',"
assert s.count(viejo) == 2, s.count(viejo)
s = s.replace(viejo, nuevo)
# las dos plantillas reciben `seco` como parámetro
assert s.count('const anclaCiudad = (slug, c, nombre) =>') == 1 and s.count('const familiaCiudad = (slug, c, nombre) =>') == 1
s = s.replace('const anclaCiudad = (slug, c, nombre) =>', 'const anclaCiudad = (slug, c, nombre, seco) =>')
s = s.replace('const familiaCiudad = (slug, c, nombre) =>', 'const familiaCiudad = (slug, c, nombre, seco) =>')
for a_, b_ in (("anclaCiudad(a.slug, c, a.nombre))", "anclaCiudad(a.slug, c, a.nombre, esSeco(a.skus)))"),
               ("familiaCiudad(f.slug, c, f.nombre))", "familiaCiudad(f.slug, c, f.nombre, esSeco(f.skus)))")):
    assert s.count(a_) == 1, a_
    s = s.replace(a_, b_)
# helper esSeco en el generador
helper = ("// [S182] seco o congelado (data/secos.json, de sku_clasificacion_macsa)" + nl +
          "const SECOS = JSON.parse(fs.readFileSync(path.join(RAIZ, 'data', 'secos.json'), 'utf8'))" + nl +
          "const _SECO = new Set([...SECOS.seco, ...SECOS.seco_por_linea]), _CONG = new Set(SECOS.congelado)" + nl +
          "const esSeco = (skus) => { const c = skus.filter((s) => _SECO.has(s) || _CONG.has(s)); return c.length > 0 && c.every((s) => _SECO.has(s)) }" + nl + nl)
k = '/** Extrae los registros de un archivo TS sin necesidad de compilarlo. */'
assert s.count(k) == 1
s = s.replace(k, helper + k)
open(p, 'w', encoding='utf-8', newline='').write(s)
print('ok generar_geo.mjs (plantillas)')
