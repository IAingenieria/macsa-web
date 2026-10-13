# -*- coding: utf-8 -*-
"""[S182 · 13-oct-2026] Heinz: «distribuidor directo» con logo (Luis, junta 13-oct) y páginas de búsqueda que mueven
la línea. Sin preventa ni precios (territorios). Sólo en el territorio de MACSA: Monterrey, Saltillo y Torreón.
Datos: data/catalogo.json (códigos, presentaciones), venta 90 d de Microsip (qué se mueve: C1008, CP6, C192, MAY13,
C16, M4B = 86 %; qué se queda: JP500, HZROY, MZ16, room service), autocompletado de Google México del 13-oct
(«heinz mayoreo», «catsup heinz mayoreo», «mayonesa heinz mayoreo/galón», «aderezos por mayoreo», «kraft heinz monterrey»).
Logo: catalogo/marcas/heinz.png (ya en el bucket, del catálogo oficial). Cada reemplazo se cuenta (assert == 1)."""
import os, re
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO = 'https://jlhvtjsdbdgwvfhjahdi.supabase.co/storage/v1/object/public/catalogo/marcas/heinz.png'


def editar(rel, pares):
    p = os.path.join(R, rel)
    s = open(p, encoding='utf-8', newline='').read()
    nl = '\r\n' if '\r\n' in s else '\n'   # git deja CRLF en Windows al hacer checkout
    for a, b in pares:
        a, b = a.replace('\r\n', '\n').replace('\n', nl), b.replace('\r\n', '\n').replace('\n', nl)
        c = s.count(a)
        assert c == 1, (rel, c, a[:70])
        s = s.replace(a, b)
    open(p, 'w', encoding='utf-8', newline='').write(s)
    print('ok', rel, len(pares))


HEINZ = r"""  // ── Heinz (S182, 13-oct): distribuidor directo, sin preventa ni precios ──────────────────────────────
  {
    slug: 'distribuidor-de-heinz-monterrey',
    resumen: 'catsup, mayonesa y mostaza Heinz en sobre, pouch, botella y cubeta, y salsas BBQ y para pizza; compramos directo a Kraft Heinz por carga completa',
    logo: '__LOGO__',
    titulo: 'Distribuidor directo de Heinz en Monterrey',
    h1: 'Distribuidor directo de Heinz en Monterrey',
    descripcion:
      'Distribuidor directo de Heinz en Monterrey para restaurantes, hoteles y comedores: catsup, mayonesa y mostaza en sobre, pouch, botella y cubeta. Compramos a Kraft Heinz por carga completa.',
    eyebrow: 'Distribuidor directo · Kraft Heinz',
    answerFirst:
      'MACSA es distribuidor directo de Heinz en Monterrey: compramos a Kraft Heinz por carga completa, sin intermediarios. Surtimos catsup, mayonesa y mostaza en sobre, pouch, botella y cubeta, además de salsas BBQ y para pizza, a restaurantes, hoteles, comedores y cafeterías, con entrega al día siguiente en el área metropolitana.',
    skus: ['C1008', 'C192', 'CP6', 'C16', 'MAY13', 'M4B', 'M200', 'MZ200'],
    tituloProductos: 'Heinz que surtimos por caja',
    enlaces: [
      { url: '/catsup-heinz/', texto: 'Catsup Heinz por mayoreo' },
      { url: '/mayonesa-heinz-por-mayoreo/', texto: 'Mayonesa Heinz por mayoreo' },
      { url: '/aderezos-en-sobre-por-mayoreo/', texto: 'Sobres de catsup, mayonesa y mostaza' },
      { url: '/salsa-para-pizza-por-mayoreo/', texto: 'Salsa para pizza por mayoreo' },
      { url: '/insumos-room-service-hotel/', texto: 'Insumos para room service de hotel' },
      { url: '/condimentos-heinz/', texto: 'Condimentos Heinz para restaurante' },
    ],
    puntos: [
      { titulo: 'Directo de Kraft Heinz', texto: 'Compramos por carga completa al fabricante, sin intermediarios: el producto no depende de la disponibilidad de un tercero.' },
      { titulo: 'Todas las presentaciones', texto: 'Sobre de 8 y 9 g, pouch de 3 kg, botella PET y cubeta de 13 kg: la que conviene a tu barra, tu mesa o tus pedidos para llevar.' },
      { titulo: 'Lo que más se pide', texto: 'La catsup en sobre de 9 g, en caja de 1,008, es la presentación Heinz que más movemos.' },
      { titulo: 'Entrega al día siguiente', texto: ENTREGA },
    ],
    preguntas: [
      { p: '¿Son distribuidores directos de Heinz?', r: 'Sí. MACSA compra directo a Kraft Heinz por carga completa y surte a negocios de comida en Monterrey, Saltillo y Torreón.' },
      { p: '¿Qué presentaciones de catsup Heinz manejan?', r: 'Sobre de 9 g en caja de 1,008, sobre de 8 g en caja de 192, pouch de 3 kg en caja de 6 y botella PET en caja de 16. Te confirmamos la existencia del día al levantar el pedido.' },
      { p: '¿Hay pedido mínimo?', r: MINIMO },
      { p: '¿Le venden a particulares?', r: PARTICULARES },
    ],
    whatsapp: 'Hola, busco distribuidor de Heinz para mi negocio. ¿Me pasan su lista?',
  },
  {
    slug: 'mayonesa-heinz-por-mayoreo',
    resumen: 'mayonesa Heinz en cubeta de 13 kg, pouch de 3 kg, botella PET y sobre de 8 g, por caja',
    logo: '__LOGO__',
    titulo: 'Mayonesa Heinz por mayoreo: cubeta, pouch y sobre',
    h1: 'Mayonesa Heinz por mayoreo: cubeta, pouch y sobre',
    descripcion:
      'Mayonesa Heinz por mayoreo en Monterrey: cubeta de 13 kg, pouch de 3 kg en caja de 4, botella PET y sobres de 8 g. Distribuidor directo de Heinz para restaurantes.',
    eyebrow: 'Distribuidor directo de Heinz',
    answerFirst:
      'En MACSA compras mayonesa Heinz por mayoreo en Monterrey: mayonesa con limón en cubeta de 13 kg, pouch de 3 kg en caja de 4, botella PET de 390 g y sobres de 8 g, para cocina, barra y pedidos para llevar. Somos distribuidor directo de Heinz y entregamos al día siguiente en el área metropolitana.',
    skus: ['MAY13', 'M4B', 'M24', 'M200', 'HZROY'],
    tituloProductos: 'Mayonesa Heinz por presentación',
    enlaces: [
      { url: '/distribuidor-de-heinz-monterrey/', texto: 'Distribuidor directo de Heinz' },
      { url: '/mayonesa/', texto: 'Mayonesa por galón y cubeta' },
      { url: '/aderezos-en-sobre-por-mayoreo/', texto: 'Sobres de catsup, mayonesa y mostaza' },
    ],
    puntos: [
      { titulo: 'Cubeta de 13 kg', texto: 'Para cocina de volumen: la mayonesa con limón Heinz en cubeta.' },
      { titulo: 'Pouch de 3 kg', texto: 'En caja de 4 bolsas, para dispensador en barra.' },
      { titulo: 'Sobre de 8 g', texto: 'Porción exacta para pedidos para llevar y a domicilio, en caja de 200.' },
      { titulo: 'Entrega a domicilio', texto: MINIMO },
    ],
    preguntas: [
      { p: '¿Venden mayonesa Heinz por cubeta?', r: 'Sí. La mayonesa con limón Heinz va en cubeta de 13 kg; también hay pouch de 3 kg, botella PET de 390 g y sobres de 8 g.' },
      { p: '¿Entregan en mi zona?', r: ENTREGA },
      { p: '¿Hay pedido mínimo?', r: MINIMO },
      { p: '¿Le venden a particulares?', r: PARTICULARES },
    ],
    whatsapp: 'Hola, quiero mayonesa Heinz por mayoreo. ¿Me pasan precio y existencia?',
  },
  {
    slug: 'aderezos-en-sobre-por-mayoreo',
    resumen: 'catsup, mayonesa, mostaza, salsa jalapeño y Tabasco en sobre, por caja',
    logo: '__LOGO__',
    titulo: 'Sobres de catsup, mayonesa y mostaza por mayoreo',
    h1: 'Sobres de catsup, mayonesa y mostaza por mayoreo',
    descripcion:
      'Aderezos en sobre por mayoreo: catsup Heinz de 8 y 9 g, mayonesa, mostaza y salsa jalapeño Heinz, y Tabasco en sobre, por caja. Para pedidos para llevar, cafeterías, comedores y food trucks.',
    eyebrow: 'Heinz · Tabasco · por caja',
    answerFirst:
      'En MACSA compras aderezos en sobre por mayoreo: catsup Heinz de 8 y 9 g, mayonesa y mostaza Heinz, salsa jalapeño Heinz y Tabasco en sobre, en caja cerrada. Son la porción exacta para pedidos para llevar, cafeterías, comedores, hoteles y food trucks, con entrega al día siguiente en el área metropolitana de Monterrey.',
    skus: ['C1008', 'C192', 'M200', 'MZ200', 'JP500', 'HZROY', 'TP200', 'SALS3000'],
    tituloProductos: 'Aderezos en sobre por caja',
    enlaces: [
      { url: '/distribuidor-de-heinz-monterrey/', texto: 'Distribuidor directo de Heinz' },
      { url: '/catsup-heinz/', texto: 'Catsup Heinz por mayoreo' },
      { url: '/mayonesa-heinz-por-mayoreo/', texto: 'Mayonesa Heinz por mayoreo' },
      { url: '/insumos-room-service-hotel/', texto: 'Insumos para room service de hotel' },
    ],
    puntos: [
      { titulo: 'Sobre, pouch o botella', texto: 'El sobre sirve una porción exacta y viaja bien en pedidos para llevar; el pouch de 3 kg rinde en barra con dispensador; la botella va a la mesa.' },
      { titulo: 'Varios sabores en un pedido', texto: 'Catsup, mayonesa, mostaza, jalapeño, Tabasco y sal en sobre, para armar tu surtido en una sola entrega.' },
      { titulo: 'Distribuidor directo de Heinz', texto: 'Compramos a Kraft Heinz por carga completa, sin intermediarios.' },
      { titulo: 'Entrega al día siguiente', texto: ENTREGA },
    ],
    preguntas: [
      { p: '¿Venden catsup en sobre por caja?', r: 'Sí: sobre de 9 g en caja de 1,008 y sobre de 8 g en caja de 192.' },
      { p: '¿Qué otros aderezos hay en sobre?', r: 'Mayonesa Heinz de 8 g en caja de 200, mostaza Heinz de 5 g en caja de 200, salsa jalapeño Heinz de 8 g en caja de 500, Tabasco de 3 g en caja de 200 y sal en sobre.' },
      { p: '¿Hay pedido mínimo?', r: MINIMO },
      { p: '¿Le venden a particulares?', r: PARTICULARES },
    ],
    whatsapp: 'Hola, quiero sobres de catsup y aderezos por mayoreo. ¿Me pasan precio por caja?',
  },
  {
    slug: 'insumos-room-service-hotel',
    resumen: 'catsup, mayonesa y mostaza Dijon de room service, Tabasco mini, salsa A1 y relish',
    logo: '__LOGO__',
    titulo: 'Insumos para room service de hotel por mayoreo',
    h1: 'Insumos para room service de hotel por mayoreo',
    descripcion:
      'Insumos para room service y desayunos de hotel por mayoreo en Monterrey: catsup, mayonesa y mostaza Dijon en presentación de room service, Tabasco mini, salsa A1 y relish, por caja.',
    eyebrow: 'Hoteles · room service · desayunos',
    answerFirst:
      'En MACSA surtimos insumos para room service de hotel por mayoreo en Monterrey: catsup, mayonesa y mostaza Dijon en presentación individual de room service, Tabasco mini, salsa A1 y relish, por caja cerrada. Somos distribuidor directo de Heinz y entregamos al día siguiente en el área metropolitana.',
    skus: ['KR60', 'M60', 'MZ60', 'STM144', 'A1', 'P12'],
    tituloProductos: 'Room service por caja',
    enlaces: [
      { url: '/aderezos-en-sobre-por-mayoreo/', texto: 'Aderezos en sobre por mayoreo' },
      { url: '/distribuidor-de-heinz-monterrey/', texto: 'Distribuidor directo de Heinz' },
      { url: '/hash-brown/', texto: 'Hash brown para desayuno' },
    ],
    puntos: [
      { titulo: 'Presentación de room service', texto: 'Catsup de 63 g, mayonesa de 54 ml y mostaza Dijon de 57 g, en caja de 60 piezas.' },
      { titulo: 'Para la mesa del desayuno', texto: 'Tabasco mini en caja de 144, salsa A1 y relish.' },
      { titulo: 'Un solo proveedor', texto: 'Junto con papa, hash brown, pollo y abarrotes en el mismo pedido.' },
      { titulo: 'Entrega al día siguiente', texto: ENTREGA },
    ],
    preguntas: [
      { p: '¿Surten hoteles?', r: 'Sí. Surtimos insumos de room service y de cocina a hoteles en Monterrey y su área metropolitana; para otras ciudades te confirmamos el día al levantar el pedido.' },
      { p: '¿Hay pedido mínimo?', r: MINIMO },
      { p: '¿Facturan?', r: 'Sí. Se puede facturar o trabajar con remisión.' },
      { p: '¿Cómo me doy de alta como cliente?', r: 'Con un formato sencillo en la página de alta de cliente; el alta queda el mismo día.' },
    ],
    whatsapp: 'Hola, busco insumos de room service para hotel. ¿Me pasan su lista?',
  },
  {
    slug: 'salsa-para-pizza-por-mayoreo',
    resumen: 'salsa para pizza en pouch de 3 kg, por caja de 6',
    titulo: 'Salsa para pizza por mayoreo',
    h1: 'Salsa para pizza por mayoreo',
    descripcion:
      'Salsa para pizza por mayoreo en Monterrey: pouch de 3 kg en caja de 6. Para pizzerías y restaurantes, con Tabasco en sobre para tus pedidos. Entrega al día siguiente.',
    eyebrow: 'Pizzerías · pouch de 3 kg',
    answerFirst:
      'En MACSA compras salsa para pizza por mayoreo en Monterrey: pouch de 3 kg en caja de 6, lista para usar en pizzerías y restaurantes, y Tabasco en sobre para acompañar tus pedidos. Surtimos también toppings para pizza y entregamos al día siguiente en el área metropolitana.',
    skus: ['SPP', 'SPPA', 'TP200'],
    tituloProductos: 'Salsa para pizza por caja',
    enlaces: [
      { url: '/toppings-para-pizza/', texto: 'Toppings para pizza por mayoreo' },
      { url: '/aderezos-en-sobre-por-mayoreo/', texto: 'Aderezos en sobre por mayoreo' },
      { url: '/distribuidor-de-heinz-monterrey/', texto: 'Distribuidor directo de Heinz' },
    ],
    puntos: [
      { titulo: 'Pouch de 3 kg', texto: 'En caja de 6 bolsas: 18 kg de salsa por caja.' },
      { titulo: 'Para tus pedidos', texto: 'Tabasco en sobre de 3 g, en caja de 200.' },
      { titulo: 'Toppings en el mismo pedido', texto: 'Junto con los toppings y el queso para tu pizza.' },
      { titulo: 'Entrega al día siguiente', texto: ENTREGA },
    ],
    preguntas: [
      { p: '¿Venden salsa para pizza por caja?', r: 'Sí: pouch de 3 kg en caja de 6.' },
      { p: '¿Hay pedido mínimo?', r: MINIMO },
      { p: '¿Entregan en mi zona?', r: ENTREGA },
      { p: '¿Le venden a particulares?', r: PARTICULARES },
    ],
    whatsapp: 'Hola, quiero salsa para pizza por mayoreo. ¿Me pasan precio por caja?',
  },
""".replace('__LOGO__', LOGO)

editar('lib/intenciones.ts', [
    ("  /** Qué surtimos, sin hablar de entrega (para las variantes por ciudad) */\n  resumen: string\n",
     "  /** Qué surtimos, sin hablar de entrega (para las variantes por ciudad) */\n  resumen: string\n"
     "  /** Logo de la marca cuando la relación es directa y Dirección autorizó usarlo (Heinz, 13-oct) */\n  logo?: string\n"),
    ("]\n\nexport const intencion = (slug: string) =>", HEINZ + "]\n\nexport const intencion = (slug: string) =>"),
    ("      { titulo: 'Marcas que conoces', texto: 'Distribuidor oficial de Lamb Weston y distribuidor directo de Agrosuper y de Martin’s.' },",
     "      { titulo: 'Marcas que conoces', texto: 'Distribuidor oficial de Lamb Weston y distribuidor directo de Heinz, de Agrosuper y de Martin’s.' },"),
])

# Placa con el logo en la página de búsqueda
editar('components/landing/PaginaIntencion.tsx', [
    ("      {c && <Cobertura ciudad={c} producto={base.h1.toLowerCase()} />}\n",
     "      {it.logo && (\n"
     "        <section className=\"bg-white py-8\">\n"
     "          <div className=\"contenedor flex flex-wrap items-center gap-6\">\n"
     "            <img src={it.logo} alt=\"Heinz\" width={140} height={70} className=\"h-14 w-auto\" loading=\"lazy\" />\n"
     "            <p className=\"max-w-prosa text-[15px] leading-relaxed text-humo\">\n"
     "              <b className=\"text-navy\">Distribuidor directo de Heinz.</b> Compramos a Kraft Heinz por carga completa, sin intermediarios.\n"
     "            </p>\n"
     "          </div>\n"
     "        </section>\n"
     "      )}\n\n"
     "      {c && <Cobertura ciudad={c} producto={base.h1.toLowerCase()} />}\n"),
])

# La empresa (Organization schema, pie y metadatos) ya dice Heinz directo
editar('lib/site.ts', [
    ("Distribuidor oficial de Lamb Weston, y distribuidor directo de Agrosuper y de Martin’s.'",
     "Distribuidor oficial de Lamb Weston, y distribuidor directo de Heinz, de Agrosuper y de Martin’s.'"),
])

# La familia de condimentos no compite con el pilar de marca
editar('lib/familias.ts', [("h1: 'Distribuidor de condimentos Heinz para restaurantes'",
                            "h1: 'Condimentos Heinz por mayoreo para restaurantes'")])

# Marcas: Heinz con logo en «Dónde no hay intermediario»
editar('app/marcas/page.tsx', [
    ("""  {
    marca: "Martin's Famous Potato Rolls",""",
     """  {
    marca: 'Heinz',
    logo: '__LOGO__',
    relacion: 'Distribuidor directo',
    detalle:
      'Compramos a Kraft Heinz por carga completa: catsup, mayonesa y mostaza en sobre, pouch, botella y cubeta.',
    familia: 'condimentos-heinz',
  },
  {
    marca: "Martin's Famous Potato Rolls",""".replace('__LOGO__', LOGO)),
])

# Páginas: 5 nuevas en Monterrey + el pilar en Saltillo y Torreón
for slug in ['distribuidor-de-heinz-monterrey', 'mayonesa-heinz-por-mayoreo', 'aderezos-en-sobre-por-mayoreo',
             'insumos-room-service-hotel', 'salsa-para-pizza-por-mayoreo']:
    d = os.path.join(R, 'app', slug); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'page.tsx'), 'w', encoding='utf-8').write(f"""import type {{ Metadata }} from 'next'
import PaginaIntencion from '@/components/landing/PaginaIntencion'
import {{ intencion }} from '@/lib/intenciones'

/* [S182] Página de búsqueda (Heinz). Datos en lib/intenciones.ts. */
const it = intencion('{slug}')!

export const metadata: Metadata = {{
  title: it.titulo,
  description: it.descripcion,
  alternates: {{ canonical: '/{slug}/' }},
}}

export default function Page() {{
  return <PaginaIntencion slug="{slug}" />
}}
""")
    print('página', slug)
for c, nom in (('saltillo', 'Saltillo'), ('torreon', 'Torreón')):
    s2 = f'distribuidor-de-heinz-en-{c}'
    d = os.path.join(R, 'app', s2); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'page.tsx'), 'w', encoding='utf-8').write(f"""import type {{ Metadata }} from 'next'
import PaginaIntencion from '@/components/landing/PaginaIntencion'
import {{ intencionEnCiudad }} from '@/lib/intenciones'

/* [S182] Distribuidor directo de Heinz en {nom}: la entrega real del corredor. */
const it = intencionEnCiudad('distribuidor-de-heinz-monterrey', '{c}')

export const metadata: Metadata = {{
  title: it.titulo,
  description: it.descripcion,
  alternates: {{ canonical: '/{s2}/' }},
  other: {{ 'geo.region': 'MX-COA', 'geo.placename': '{nom}, Coahuila' }},
}}

export default function Page() {{
  return <PaginaIntencion slug="distribuidor-de-heinz-monterrey" ciudad="{c}" />
}}
""")
    print('página', s2)
