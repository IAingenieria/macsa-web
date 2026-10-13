"""Lista de páginas de macsamty.mx para pedir indexación A MANO en Search Console, por importancia.

Fuente de la importancia (no intuición):
  - lib/anclas.ts  -> facturación 2026 de cada producto ancla (suma de sus SKUs en ventas_det_microsip_macsa)
  - lib/ciudades.ts -> modo de entrega de cada ciudad (diaria > corredor > desarrollo > consulta), en el orden del archivo
  - sitemap.xml en vivo -> sólo entran URLs publicadas
Cada URL se comprueba en vivo (HTTP 200 + canonical a sí misma) antes de entrar a la lista.
Uso: python scripts/lista_indexacion_s182.py  -> entregables/MACSA_Indexacion_Search_Console_s182.xlsx
"""
import re, sys, time, urllib.request
from pathlib import Path
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

sys.stdout.reconfigure(encoding="utf-8")
WEB = Path(__file__).resolve().parent.parent
SALIDA = WEB.parent / "entregables" / "MACSA_Indexacion_Search_Console_s182.xlsx"
HOST = "https://macsamty.mx"
POR_DIA = 10          # Google no publica el tope diario; ~10 es lo usual antes del aviso de cuota
TOPE_MALLA = 120      # producto×ciudad que vale la pena pedir a mano; el resto lo descubre Google por el mapa del sitio

def leer(p): return (WEB / p).read_text(encoding="utf-8")

# --- anclas: slug, nombre, factura (en orden de facturación)
anc_txt = leer("lib/anclas.ts")
anclas, fam_de = [], {}
for m in re.finditer(r"slug: '([^']+)',\s*nombre: '([^']+)',.*?familia: '([^']+)'.*?factura: (\d+)", anc_txt, re.S):
    slug, nombre, familia, fact = m.group(1), m.group(2), m.group(3), int(m.group(4))
    anclas.append((slug, nombre, fact)); fam_de[slug] = familia
print("anclas:", len(anclas))
assert len(anclas) >= 20, len(anclas)

# --- ciudades en el orden del archivo, por modo
ciu_txt = leer("lib/ciudades.ts")
ciudades = []
for m in re.finditer(r"slug: '([^']+)',\s*nombre: '([^']+)'.*?modo: '(\w+)'", ciu_txt, re.S):
    ciudades.append(m.groups())
ORDEN_MODO = {"diaria": 0, "corredor": 1, "desarrollo": 2, "consulta": 3}
ciudades.sort(key=lambda c: ORDEN_MODO[c[2]])  # estable: respeta el orden del archivo dentro de cada modo
assert len(ciudades) == 23, len(ciudades)
NOM_MODO = {"diaria": "Ruta diaria", "corredor": "Corredor", "desarrollo": "En desarrollo", "consulta": "Bajo consulta"}

# --- familias (pilares)
fam_txt = leer("lib/familias.ts")
familias = re.findall(r"\n    slug: '([^']+)',\n    nombre: '([^']+)'", fam_txt)
# Familias que también tienen página por ciudad (están en el sitemap como "<familia>-en-<ciudad>"):
# su peso = suma de la facturación de sus productos ancla.
nom_fam = dict(familias)
sm_slugs = None  # se llena tras leer el sitemap
fact_fam = {}
for slug, nom, fact in anclas:
    fact_fam[fam_de[slug]] = fact_fam.get(fam_de[slug], 0) + fact

# --- sitemap en vivo
def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (revision MACSA)"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.status, r.read().decode("utf-8", "replace")
_, sm = get(HOST + "/sitemap.xml")
publicadas = set(re.findall(r"<loc>([^<]+)</loc>", sm))
print("sitemap:", len(publicadas))
con_ciudad = {re.sub(r"-en-.*", "", u.replace(HOST, "").strip("/")) for u in publicadas if "-en-" in u}
fam_con_ciudad = [(f, nom_fam.get(f, f), fact_fam.get(f, 0)) for f in sorted(con_ciudad) if f not in {a[0] for a in anclas}]
print("familias con página por ciudad:", fam_con_ciudad)
anclas_malla = sorted(anclas + fam_con_ciudad, key=lambda a: -a[2])
anclas.sort(key=lambda a: -a[2])
assert len(anclas_malla) == len(con_ciudad), (len(anclas_malla), len(con_ciudad))

filas = []  # (url, tipo, que, motivo)
def agrega(path, tipo, que, motivo):
    url = f"{HOST}{path}"
    if url not in publicadas:
        print("  ⚠ no está en el sitemap, se omite:", url); return
    if any(f[0] == url for f in filas): return
    filas.append((url, tipo, que, motivo))

# 1) Puertas de entrada
for p, q, mot in [("/", "Inicio", "Página principal: de aquí salen los enlaces a todo el sitio"),
                  ("/catalogo/", "Catálogo", "Reparte autoridad a familias y productos"),
                  ("/tienda/", "Tienda", "Los 190 productos con foto y ficha"),
                  ("/alta-de-cliente/", "Alta de cliente", "Convierte la visita en cliente"),
                  ("/contacto/", "Contacto", "Teléfono y WhatsApp únicos (871)"),
                  ("/marcas/", "Marcas", "Búsquedas por marca: Lamb Weston, Heinz, Bachoco…")]:
    agrega(p, "Puerta de entrada", q, mot)
# 2) Productos ancla (pilar), por facturación
for slug, nom, fact in anclas:
    agrega(f"/{slug}/", "Producto (pilar)", nom, f"Facturación 2026: ${fact/1e6:.1f} M")
# 3) Familias
for slug, nom in familias:
    agrega(f"/{slug}/", "Familia", nom, "Agrupa los productos de la familia")
# 4) Malla producto × ciudad: ronda por ciudad dentro de cada producto top, ponderado por facturación y modo
# Rondas: una ciudad recibe sus productos principales antes de pasar a la siguiente, y las ciudades
# grandes con ruta diaria van primero. Dentro de cada ronda, ciudad por ciudad y producto por facturación.
NUCLEO = ["monterrey", "guadalupe", "san-nicolas-de-los-garza", "apodaca", "general-escobedo",
          "santa-catarina", "san-pedro-garza-garcia"]
GRANDES_CORREDOR = ["saltillo", "torreon"]
resto_diaria = [c[0] for c in ciudades if c[2] == "diaria" and c[0] not in NUCLEO]
cd = {c[0]: c for c in ciudades}
RONDAS = [  # (ciudades, rango de productos por facturación, etiqueta)
    (NUCLEO, (0, 6), "Ronda 1 · área metropolitana, 6 productos principales"),
    (GRANDES_CORREDOR, (0, 6), "Ronda 2 · Saltillo y Torreón, 6 productos principales"),
    (NUCLEO, (6, 12), "Ronda 3 · área metropolitana, productos 7 a 12"),
    (resto_diaria, (0, 4), "Ronda 4 · resto de la ruta diaria, 4 productos principales"),
]
for ciu_r, (a, b), etiqueta in RONDAS:
    for cs in ciu_r:
        _, cn, modo = cd[cs]
        for k, (slug, nom, fact) in enumerate(anclas_malla[a:b], a + 1):
            agrega(f"/{slug}-en-{cs}/", "Producto × ciudad", f"{nom} en {cn}",
                   f"{etiqueta} · {NOM_MODO[modo]} · producto n.º {k} (${fact/1e6:.1f} M en 2026)")
assert sum(1 for f in filas if f[1] == "Producto × ciudad") <= TOPE_MALLA + 10

# --- Con la exportación de Search Console («Discovered – currently not indexed»): se ordena TODO el sitio y se dejan
#     sólo las que Google todavía no indexa. Uso: python scripts/lista_indexacion_s182.py <Table.csv>
NO_INDEXADAS = None
if len(sys.argv) > 1:
    import csv
    with open(sys.argv[1], encoding="utf-8-sig") as fh:
        NO_INDEXADAS = {r["URL"].strip() for r in csv.DictReader(fh) if r.get("URL", "").startswith("http")}
    print("no indexadas (Search Console):", len(NO_INDEXADAS))
    # resto de la malla: ciudad por ciudad (diaria → corredor → desarrollo → consulta), producto por facturación
    for cs, cn, modo in ciudades:
        for k, (slug, nom, fact) in enumerate(anclas_malla, 1):
            agrega(f"/{slug}-en-{cs}/", "Producto × ciudad", f"{nom} en {cn}",
                   f"Resto · {NOM_MODO[modo]} · producto n.º {k} (${fact/1e6:.1f} M en 2026)")
    # páginas sueltas (consejos, avisos…), luego la tienda en el orden del mapa del sitio
    for u in sorted(publicadas):
        p = u.replace(HOST, "")
        if "/tienda/" in p and p != "/tienda/":
            agrega(p, "Ficha de tienda", p.strip("/").split("/")[-1].upper(), "Ficha de producto con foto")
        elif "-en-" not in p:
            agrega(p, "Página de apoyo", p.strip("/") or "inicio", "Consejo, aviso o página de servicio")
    antes = len(filas)
    filas = [f for f in filas if f[0] in NO_INDEXADAS]
    faltan = NO_INDEXADAS - {f[0] for f in filas}
    print(f"de {antes} ordenadas quedan {len(filas)} sin indexar · en la exportación pero no en el mapa del sitio: {len(faltan)}")
    for u in sorted(faltan): filas.append((u, "Otra", u.replace(HOST, ""), "Está en la exportación de Search Console"))
    SALIDA = WEB.parent / "entregables" / "MACSA_Indexacion_Search_Console_s182_no_indexadas.xlsx"
# 5) Consejos (al final)
for u in sorted(u for u in publicadas if "/consejos/" in u and u != HOST + "/consejos/"):
    pass  # se dejan al mapa del sitio; no gastan cuota

# --- comprobación en vivo: 200 + canonical propia (de uno en uno, con pausa)
malas = []
for k, (url, *_r) in enumerate(filas):
    try:
        st, html = get(url)
        can = re.search(r'<link rel="canonical" href="([^"]+)"', html)
        ok = st == 200 and can and can.group(1).rstrip("/") == url.rstrip("/")
        if not ok: malas.append((url, st, can.group(1) if can else None))
    except Exception as e:
        malas.append((url, "error", str(e)[:60]))
    time.sleep(0.15)
print("comprobadas:", len(filas), "· con problema:", len(malas))
for m in malas: print("  ✗", m)
filas = [f for f in filas if f[0] not in {m[0] for m in malas}]

# --- Excel
wb = Workbook(); ws = wb.active; ws.title = "Por importancia"
enc = ["#", "Día", "Dirección para pegar en Search Console", "Tipo", "Página", "Por qué va en este lugar", "¿Ya está en Google?", "Pedida (fecha)"]
ws.append(enc)
for i, (url, tipo, que, mot) in enumerate(filas, 1):
    ws.append([i, (i - 1) // POR_DIA + 1, url, tipo, que, mot, "", ""])
azul = PatternFill("solid", fgColor="002C49")
for c in ws[1]:
    c.font = Font(bold=True, color="FFFFFF"); c.fill = azul; c.alignment = Alignment(wrap_text=True, vertical="center")
colores = {"Puerta de entrada": "DCEBF7", "Producto (pilar)": "E8F4E8", "Familia": "FFF4D6", "Producto × ciudad": "FFFFFF", "Ficha de tienda": "F3F3F3", "Página de apoyo": "F3F3F3", "Otra": "F3F3F3"}
for r in ws.iter_rows(min_row=2):
    for c in r: c.fill = PatternFill("solid", fgColor=colores[r[3].value])
for i, w in enumerate([5, 5, 62, 18, 40, 44, 16, 14], 1):
    ws.column_dimensions[get_column_letter(i)].width = w
ws.freeze_panes = "A2"; ws.auto_filter.ref = ws.dimensions

ins = wb.create_sheet("Cómo se hace")
for linea in [
    "Cómo pedir la indexación (unos 2 minutos por página)",
    *(["Esta lista trae SÓLO las páginas que Google todavía no indexa (exportación de Search Console «Discovered – currently not indexed», 13-oct-2026): ninguna ha sido visitada por Google, así que pedirla a mano sí ayuda."] if NO_INDEXADAS else []),
    "1. Entra a search.google.com/search-console y elige la propiedad macsamty.mx.",
    "2. Pega la dirección de la columna C en la barra de arriba («Inspeccionar cualquier URL») y da Enter.",
    "3. Si dice «La URL está en Google»: anota «Sí» en la columna G y pasa a la siguiente (no gasta cuota).",
    "4. Si dice «La URL no está en Google»: botón «Solicitar indexación», espera ~1 minuto, anota la fecha en la columna H.",
    f"5. Google no publica el tope diario; suele avisar «cuota excedida» cerca de {POR_DIA} solicitudes. Al ver el aviso, se sigue al día siguiente.",
    "",
    "Por qué este orden",
    "· Primero las puertas de entrada y las páginas de producto: de ellas salen los enlaces a las de cada ciudad, así Google encuentra las demás solo.",
    "· Los productos van por lo que factura MACSA en 2026 (Microsip), no por lo que suena bonito.",
    "· Las ciudades: primero las de ruta diaria (área metropolitana de Monterrey), luego el corredor Saltillo–Torreón, luego las que están en desarrollo o bajo consulta.",
    "· Papa a la francesa, Pollo y Salsas para alitas cuentan como un producto con la suma de lo que facturan sus productos.",
    f"· Sólo se piden a mano unas {TOPE_MALLA} de las 529 páginas producto×ciudad, en 4 rondas (ver columna F). Las demás ya están en el mapa del sitio que Google tiene; se revisan en el informe «Páginas» cada semana.",
    "· La tienda (191 fichas) y los consejos no gastan cuota: Google los descubre por el catálogo y el mapa del sitio.",
    "",
    f"Generado {time.strftime('%Y-%m-%d %H:%M')} desde el sitio en vivo: cada dirección respondió 200 y su canónica apunta a sí misma.",
]:
    ins.append([linea])
ins.column_dimensions["A"].width = 130
ins["A1"].font = Font(bold=True, size=13); ins["A8"].font = Font(bold=True, size=12)

SALIDA.parent.mkdir(exist_ok=True)
wb.save(SALIDA)
print("filas:", len(filas), "· días:", (len(filas) - 1) // POR_DIA + 1, "→", SALIDA)
