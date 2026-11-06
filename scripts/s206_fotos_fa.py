"""S206 (6-nov-2026): fotos de la página de Frites Atelier y de las 4 fichas.
- Página: public/frites-atelier/*.webp  (material de la presentación de Sigrid Jobse + fotos reales de la visita).
- Fichas: _fa_web/web/<slug>-<hash>-800.webp y -400.webp, mismo patrón del bucket `catalogo/web/` (ver lib/foto.ts).
  FAA4 = bolsa oficial (presentación de Sigrid). F03, F07, LWS902 = fotos oficiales de lambweston.eu (EMEA).
Uso: python scripts/s206_fotos_fa.py <carpeta con pr9.img, prs.img, tw.img>
"""
import hashlib, io, os, sys, zipfile
from PIL import Image, ImageOps

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PPTX = r"C:\Users\Dell\MrRuta\clientes\macsa\Videos\FRITES_ATELIER\presentacion_vendedores\original\Frites Atelier Sales Presentation.pptx"
PIC = r"C:\Users\Dell\Pictures"
PAG = os.path.join(RAIZ, "public", "frites-atelier")
WEB = os.path.join(RAIZ, "_fa_web", "web")
os.makedirs(PAG, exist_ok=True)
os.makedirs(WEB, exist_ok=True)
LW = sys.argv[1]
z = zipfile.ZipFile(PPTX)


def del_pptx(n):
    return ImageOps.exif_transpose(Image.open(io.BytesIO(z.read("ppt/media/" + n)))).convert("RGB")


def de_disco(*p):
    return ImageOps.exif_transpose(Image.open(os.path.join(PIC, *p))).convert("RGB")


def guardar(im, nombre, lado=1400, q=80):
    im = im.copy()
    im.thumbnail((lado, lado), Image.LANCZOS)
    r = os.path.join(PAG, nombre + ".webp")
    im.save(r, "WEBP", quality=q, method=6)
    print(nombre, im.size, os.path.getsize(r) // 1024, "KB")


guardar(del_pptx("image11.jpeg"), "charola")
guardar(del_pptx("image6.jpeg"), "sergio-herman")
guardar(del_pptx("image16.jpeg"), "atelier-interior")
guardar(del_pptx("image18.jpeg"), "papa-campo", 1000)
guardar(del_pptx("image20.jpeg"), "servicio", 1000)
guardar(del_pptx("image10.jpeg"), "sal", 1000)
guardar(de_disco("04-11-26", "20261104_162325.jpg"), "alex-bolsa", 1200)
guardar(de_disco("Alex Yensen", "Presentacion Frites Atelier", "20261103_113504.jpg"), "alex-cocina", 1200)
guardar(de_disco("Frites Atelier", "DSC04165.JPG"), "alex-presentacion", 1400)
logo = Image.open(io.BytesIO(z.read("ppt/media/image1.png"))).convert("RGBA")
logo.thumbnail((640, 640), Image.LANCZOS)
logo.save(os.path.join(PAG, "logo-frites-atelier.webp"), "WEBP", quality=90)
logo.thumbnail((240, 240), Image.LANCZOS)
logo.save(os.path.join(PAG, "logo-frites-atelier-chico.png"))


def cuadrada(im, lado):
    """Sobre blanco y centrada, como las demás fotos del catálogo."""
    if im.mode != "RGBA":
        im = im.convert("RGBA")
    c = im.copy()
    c.thumbnail((int(lado * 0.92), int(lado * 0.92)), Image.LANCZOS)
    fondo = Image.new("RGBA", (lado, lado), (255, 255, 255, 255))
    fondo.alpha_composite(c, ((lado - c.width) // 2, (lado - c.height) // 2))
    return fondo.convert("RGB")


bolsa = del_pptx("image19.jpeg")
w, h = bolsa.size
lado = int(w * 0.62)
x0, y0 = int(w * 0.19), int(h * 0.34)
bolsa = bolsa.crop((x0, y0, x0 + lado, y0 + lado))
FICHAS = {
    "FAA4": ("papa-frites-atelier", bolsa),
    "F03": ("papa-private-reserve-9x9", Image.open(os.path.join(LW, "pr9.img"))),
    "F07": ("papa-private-reserve-11x11", Image.open(os.path.join(LW, "prs.img"))),
    "LWS902": ("papa-twister-sazonada", Image.open(os.path.join(LW, "tw.img"))),
}
for sku, (slug, im) in FICHAS.items():
    g = cuadrada(im, 800)
    b = io.BytesIO()
    g.save(b, "WEBP", quality=82, method=6)
    hs = hashlib.sha1(b.getvalue()).hexdigest()[:6]
    g.save(os.path.join(WEB, f"{slug}-{hs}-800.webp"), "WEBP", quality=82, method=6)
    g.resize((400, 400), Image.LANCZOS).save(os.path.join(WEB, f"{slug}-{hs}-400.webp"), "WEBP", quality=80, method=6)
    print(sku, f"{slug}-{hs}")
