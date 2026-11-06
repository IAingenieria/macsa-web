"""S206: sube a Supabase Storage los medios de Frites Atelier. Sólo agrega archivos nuevos.
  _fa_web/web/*.webp   -> catalogo/web/            (fotos de las 4 fichas)
  _fa_web/video/*      -> medios-web/frites-atelier/ (videos y pósters; bucket público nuevo, sólo mp4 y webp)
  public/.../logo-chico -> catalogo/marcas/frites-atelier.png
No toca `precios_listas_macsa`. No imprime la llave. Uso: python scripts/s206_subir_fa.py
"""
import glob, mimetypes, os, pathlib, re, shutil, sys, urllib.error, urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = "https://jlhvtjsdbdgwvfhjahdi.supabase.co"
env = {}
for l in pathlib.Path(r"C:\Users\Dell\MrRuta\clientes\macsa\sync_microsip\.env").read_text(encoding="utf-8-sig", errors="ignore").splitlines():
    if re.match(r"^[A-Za-z_][A-Za-z0-9_]*=", l):
        k, v = l.split("=", 1)
        env[k] = v.strip().strip('"').strip("'")
KEY = next(v for k, v in env.items() if ("SERVICE" in k.upper() or k.upper() in ("SUPABASE_KEY", "SB_KEY")) and len(v) > 30)
mimetypes.add_type("image/webp", ".webp")


def crear_bucket():
    import json
    r = urllib.request.Request(f"{URL}/storage/v1/bucket", method="POST", data=json.dumps({
        "id": "medios-web", "name": "medios-web", "public": True, "file_size_limit": 31457280,
        "allowed_mime_types": ["video/mp4", "image/webp"]}).encode(), headers={
        "apikey": KEY, "Authorization": "Bearer " + KEY, "Content-Type": "application/json"})
    try:
        urllib.request.urlopen(r, timeout=60)
        print("bucket medios-web creado", flush=True)
    except urllib.error.HTTPError as e:
        c = e.read()[:200].decode("utf-8", "ignore")
        if "already exists" in c or "Duplicate" in c:
            print("bucket ya existia", flush=True)
        else:
            print("ERROR bucket", e.code, c); sys.exit(1)


def subir(local, destino):
    tipo = mimetypes.guess_type(local)[0] or "application/octet-stream"
    with open(local, "rb") as f:
        r = urllib.request.Request(f"{URL}/storage/v1/object/{destino}", data=f.read(), method="POST", headers={
            "apikey": KEY, "Authorization": "Bearer " + KEY, "Content-Type": tipo,
            "Cache-Control": "max-age=31536000", "x-upsert": "false"})
    try:
        urllib.request.urlopen(r, timeout=300)
        print("subido", destino, round(os.path.getsize(local) / 1048576, 2), "MB", flush=True)
    except urllib.error.HTTPError as e:
        cuerpo = e.read()[:160].decode("utf-8", "ignore")
        if "already exists" in cuerpo or "Duplicate" in cuerpo:
            print("ya estaba", destino, flush=True)
        else:
            print("ERROR", e.code, destino, cuerpo, flush=True)
            sys.exit(1)


crear_bucket()
for f in sorted(glob.glob(os.path.join(RAIZ, "_fa_web", "web", "*.webp"))):
    subir(f, "catalogo/web/" + os.path.basename(f))
# Sólo los revisados sin invitados de frente. A3, A8 y L3 se quedan fuera hasta tener permiso.
LIMPIOS = ("fa-a2-", "fa-a4-", "fa-l6-", "fa-en-a2-", "fa-en-a4-")
for f in sorted(glob.glob(os.path.join(RAIZ, "_fa_web", "video", "*"))):
    if not os.path.basename(f).startswith(LIMPIOS):
        continue
    subir(f, "medios-web/frites-atelier/" + os.path.basename(f))
subir(os.path.join(RAIZ, "public", "frites-atelier", "logo-frites-atelier-chico.png"), "catalogo/marcas/frites-atelier.png")
print("LISTO")
