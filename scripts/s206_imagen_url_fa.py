"""S206: guarda la foto de las 4 fichas en `precios_listas_macsa.imagen_url`. Sólo si está vacía (filtro en la URL del PATCH).
Quién lee esa columna: sitio, portal, cotizador, OC de Edgar y bot. Sólo muestran la foto; ningún cálculo la usa.
Reversión: PATCH imagen_url=null a estos 4 SKUs (antes estaban en null, se imprime aquí).
Uso: python scripts/s206_imagen_url_fa.py
"""
import glob, json, os, pathlib, re, urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = "https://jlhvtjsdbdgwvfhjahdi.supabase.co"
env = {}
for l in pathlib.Path(r"C:\Users\Dell\MrRuta\clientes\macsa\sync_microsip\.env").read_text(encoding="utf-8-sig", errors="ignore").splitlines():
    if re.match(r"^[A-Za-z_][A-Za-z0-9_]*=", l):
        k, v = l.split("=", 1)
        env[k] = v.strip().strip('"').strip("'")
KEY = next(v for k, v in env.items() if ("SERVICE" in k.upper() or k.upper() in ("SUPABASE_KEY", "SB_KEY")) and len(v) > 30)
H = {"apikey": KEY, "Authorization": "Bearer " + KEY, "Content-Type": "application/json"}
BASE = URL + "/storage/v1/object/public/catalogo/web/"
fotos = [os.path.basename(f) for f in glob.glob(os.path.join(RAIZ, "_fa_web", "web", "*-800.webp"))]
de = lambda s: BASE + next(f for f in fotos if f.startswith(s))
MAPA = {"FAA4": de("papa-frites-atelier"), "F03": de("papa-private-reserve-9x9"), "F07": de("papa-private-reserve-11x11"), "LWS902": de("papa-twister-sazonada")}


def leer():
    u = f"{URL}/rest/v1/precios_listas_macsa?select=sku,imagen_url&sku=in.({','.join(MAPA)})"
    return json.load(urllib.request.urlopen(urllib.request.Request(u, headers=H), timeout=30))


antes = leer()
print("antes", antes)
assert len(antes) == 4
for sku, img in MAPA.items():
    assert urllib.request.urlopen(urllib.request.Request(img, method="HEAD"), timeout=30).status == 200, img
    u = f"{URL}/rest/v1/precios_listas_macsa?sku=eq.{sku}&imagen_url=is.null"
    r = urllib.request.Request(u, method="PATCH", data=json.dumps({"imagen_url": img}).encode(), headers={**H, "Prefer": "return=representation"})
    print(sku, len(json.load(urllib.request.urlopen(r, timeout=30))), "fila")
despues = leer()
print("despues", despues)
assert all(x["imagen_url"] == MAPA[x["sku"]] for x in despues)
print("OK")
