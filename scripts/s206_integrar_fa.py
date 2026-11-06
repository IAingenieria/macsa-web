"""S206: ata Frites Atelier al resto del sitio (nombres, marca, catálogo, portada, marcas, menú, sitemap, llms.txt).
Cada reemplazo exige exactamente una ocurrencia. Conserva CRLF o LF de cada archivo (trabaja en binario).
Uso: python scripts/s206_integrar_fa.py
"""
import glob, json, os, re

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def cambiar(rel, pares):
    p = os.path.join(RAIZ, rel)
    b = open(p, "rb").read()
    crlf = b.count(b"\r\n") > b.count(b"\n") / 2
    t = b.decode("utf-8").replace("\r\n", "\n")
    for viejo, nuevo in pares:
        n = t.count(viejo)
        assert n == 1, (rel, viejo[:50], n)
        t = t.replace(viejo, nuevo)
    if crlf:
        t = t.replace("\n", "\r\n")
    open(p, "wb").write(t.encode("utf-8"))
    print("ok", rel, "CRLF" if crlf else "LF")


cambiar("lib/catalogo.ts", [
    ("  H30: 'Tater Puffs, dados de papa (hash brown en cubo)',\n",
     "  H30: 'Tater Puffs, dados de papa (hash brown en cubo)',\n"
     "  // S206: las 4 de Lamb Weston Europa que sí se ofrecen (Edgar, 14-oct).\n"
     "  FAA4: 'Papa Frites Atelier',\n"
     "  F03: 'Papa Private Reserve 9x9 con cáscara',\n"
     "  F07: 'Papa Private Reserve 11x11 con cáscara',\n"
     "  LWS902: 'Papa Twister sazonada',\n"),
    ("  // Salsas de mesa que no son de la marca de su categoría\n",
     "  // S206: la marca de la bolsa. Las otras tres de Europa son Lamb Weston por categoría.\n"
     "  FAA4: 'Frites Atelier',\n"
     "  // Salsas de mesa que no son de la marca de su categoría\n"),
])

cambiar("lib/giros.ts", [
    ("{ categoria: 'Papas', marcas: [{ nombre: 'Lamb Weston', directo: true, logo: 'lamb-weston' }] },",
     "{\n    categoria: 'Papas',\n    marcas: [\n      { nombre: 'Lamb Weston', directo: true, logo: 'lamb-weston' },\n"
     "      { nombre: 'Frites Atelier', directo: false, logo: 'frites-atelier' },\n    ],\n  },"),
])

cambiar("app/marcas/page.tsx", [
    ("  {\n    marca: 'Agrosuper',\n",
     "  {\n    marca: 'Frites Atelier',\n    logo: '/frites-atelier/logo-frites-atelier-chico.png',\n"
     "    relacion: 'Disponible para México, a través de MACSA',\n    detalle:\n"
     "      'La marca del chef Sergio Herman, tres estrellas Michelin, producida en Holanda por Lamb Weston.',\n"
     "    familia: 'frites-atelier',\n  },\n  {\n    marca: 'Agrosuper',\n"),
])

cambiar("components/layout/Header.tsx", [
    ("  { href: '/marcas/', label: 'Marcas' },\n",
     "  { href: '/marcas/', label: 'Marcas' },\n  { href: '/frites-atelier/', label: 'Frites Atelier' },\n"),
])

cambiar("app/page.tsx", [
    ("import { HEROES } from '@/lib/heroes'\n", "import { HEROES } from '@/lib/heroes'\nimport BandaFritesAtelier from '@/components/landing/BandaFritesAtelier'\n"),
    ("      <BarraConfianza />\n\n      <Seccion\n        eyebrow=\"Catálogo\"\n",
     "      <BarraConfianza />\n\n      <BandaFritesAtelier />\n\n      <Seccion\n        eyebrow=\"Catálogo\"\n"),
])

cambiar("components/landing/PaginaFamilia.tsx", [
    ("      <BarraConfianza seco={seco} />\n\n      <GaleriaProductos\n",
     "      <BarraConfianza seco={seco} />\n\n      {f.slug === 'papa-a-la-francesa' && <BandaFritesAtelier />}\n\n      <GaleriaProductos\n"),
])
p = os.path.join(RAIZ, "components/landing/PaginaFamilia.tsx")
t = open(p, "rb").read().decode("utf-8")
nl = "\r\n" if "\r\n" in t else "\n"
t = t.replace("import Link from 'next/link'" + nl, "import Link from 'next/link'" + nl + "import BandaFritesAtelier from '@/components/landing/BandaFritesAtelier'" + nl, 1)
assert "BandaFritesAtelier from" in t
open(p, "wb").write(t.encode("utf-8"))

cambiar("components/landing/PaginaIntencion.tsx", [
    ("import Hero from '@/components/landing/Hero'\n", "import Hero from '@/components/landing/Hero'\nimport BandaFritesAtelier from '@/components/landing/BandaFritesAtelier'\n"),
    ("      {c && <Cobertura ciudad={c} producto={base.h1.toLowerCase()} />}\n",
     "      {/^(distribuidor-de-papas|papas-a-la-francesa)/.test(base.slug) && <BandaFritesAtelier />}\n\n"
     "      {c && <Cobertura ciudad={c} producto={base.h1.toLowerCase()} />}\n"),
])

cambiar("app/tienda/[sku]/page.tsx", [
    ("import { breadcrumbSchema, ld } from '@/lib/schema'\n",
     "import { breadcrumbSchema, ld } from '@/lib/schema'\nimport BandaFritesAtelier from '@/components/landing/BandaFritesAtelier'\nimport { SKUS_FA } from '@/lib/fritesAtelier'\n"),
    ("      <Breadcrumb items={migas} />\n\n      <article ",
     "      <Breadcrumb items={migas} />\n\n      {SKUS_FA.includes(p.sku) && <BandaFritesAtelier />}\n\n      <article "),
])

cambiar("app/sitemap.ts", [
    ("    // Mismo caso: /consejos/[tip] tampoco lo ve el barrido de directorios.\n",
     "    // La versión en inglés es subcarpeta: el barrido sólo mira el primer nivel.\n"
     "    { url: `${SITE_URL}/frites-atelier/en/`, lastModified: ahora, changeFrequency: 'monthly' as const, priority: 0.6 },\n"
     "    // Mismo caso: /consejos/[tip] tampoco lo ve el barrido de directorios.\n"),
])

cambiar("app/llms.txt/route.ts", [
    ("    `- [Marcas](${SITE_URL}/marcas/)`,\n",
     "    `- [Marcas](${SITE_URL}/marcas/)`,\n"
     "    `- [Frites Atelier, disponible para México a través de MACSA](${SITE_URL}/frites-atelier/): la papa de la marca del chef Sergio Herman, producida en Holanda por Lamb Weston. Lo disponible es la papa, no hay tiendas de la marca en México.`,\n"
     "    `- [Cómo vender más papa](${SITE_URL}/como-vender-mas-papa/)`,\n"),
])

# Las 4 fichas, sin regenerar el resto del catálogo (el snapshot es del 30-sep; refrescarlo es otro diff).
BASE = "https://jlhvtjsdbdgwvfhjahdi.supabase.co/storage/v1/object/public/catalogo/web/"
fotos = {os.path.basename(f) for f in glob.glob(os.path.join(RAIZ, "_fa_web", "web", "*-800.webp"))}
de = lambda s: BASE + next(f for f in fotos if f.startswith(s))
NUEVOS = [
    ("F03", "PRIVATE RESERVE 9X9 SK (LW EUROPA)", de("papa-private-reserve-9x9")),
    ("F07", "PRIVATE RESERVE 11X11 SK (LW EUROPA)", de("papa-private-reserve-11x11")),
    ("FAA4", "FRITES ATELIER (LW EUROPA)", de("papa-frites-atelier")),
    ("LWS902", "SEASONED TWISTER LW (LW EUROPA)", de("papa-twister-sazonada")),
]
p = os.path.join(RAIZ, "data", "catalogo.json")
d = json.load(open(p, encoding="utf-8"))
ya = {x["s"] for x in d["productos"]}
primero = next(i for i, x in enumerate(d["productos"]) if x["c"] == "Papa")
for s, desc, img in reversed(NUEVOS):
    assert s not in ya, s
    d["productos"].insert(primero, {"s": s, "d": desc, "c": "Papa", "p": "Caja 10 kg", "w": 22.05, "i": img})
open(p, "w", encoding="utf-8", newline="\n").write(json.dumps(d, ensure_ascii=False, indent=2) + "\n")
print("catalogo", len(d["productos"]))
