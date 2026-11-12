"""Videos de la portada (11-nov-2026): sube a Supabase Storage las copias web de public/_previa/*.mp4.
  public/_previa/<clave>.mp4  ->  medios-web/portada/<clave>.mp4   (bucket público; sólo mp4 y webp)
Sólo agrega: si el archivo ya existe NO lo reemplaza (para cambiar un video, súbelo con otro nombre).
Las copias salen de TVMulti/MACSA/marcas-pruebas/muestras con:
  ffmpeg -i <fuente> -vf scale=720:1280 -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart
El del hero (frites-atelier-promo) sale de Videos/FRITES_ATELIER/promo/FA_Promo_Restaurantes_Hoteles_v1.mp4, con el mismo comando.
No imprime la llave. Uso: python scripts/videos_portada_subir.py
"""
import glob, os, pathlib, re, sys, urllib.error, urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = "https://jlhvtjsdbdgwvfhjahdi.supabase.co"
CLAVES = ("por-que-macsa", "en-frio", "papa-rejilla", "papa-gajo", "camote", "frites-atelier-promo")

env = {}
for l in pathlib.Path(r"C:\Users\Dell\MrRuta\clientes\macsa\sync_microsip\.env").read_text(encoding="utf-8-sig", errors="ignore").splitlines():
    if re.match(r"^[A-Za-z_][A-Za-z0-9_]*=", l):
        k, v = l.split("=", 1)
        env[k] = v.strip().strip('"').strip("'")
KEY = next(v for k, v in env.items() if ("SERVICE" in k.upper() or k.upper() in ("SUPABASE_KEY", "SB_KEY")) and len(v) > 30)

for clave in CLAVES:
    local = os.path.join(RAIZ, "public", "_previa", clave + ".mp4")
    if not os.path.exists(local):
        print("FALTA", local); sys.exit(1)
    destino = f"medios-web/portada/{clave}.mp4"
    with open(local, "rb") as f:
        r = urllib.request.Request(f"{URL}/storage/v1/object/{destino}", data=f.read(), method="POST", headers={
            "apikey": KEY, "Authorization": "Bearer " + KEY, "Content-Type": "video/mp4",
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
print("LISTO")
