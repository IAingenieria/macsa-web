#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Fotos del catálogo optimizadas para el sitio: cada foto en DOS tamaños
(800 px para la ficha y celulares, 400 px para las tarjetas), webp, y con
nombre nuevo — el bucket sirve con `max-age=31536000`, así que un archivo
re-subido con el mismo nombre seguiría saliendo viejo del caché.

S170 · 29-sep-2026. Luis: "toma las imágenes de esta carpeta y sustituye las
que están en la página web, baja las imágenes de peso pero que no se tarde en
el cargado". La carpeta (Drive "MACSA Imagenes") trae las 117 fotos aprobadas
de S150 —idénticas byte a byte— más 7 de Heinz nuevas.

  - La foto base de cada producto es la que ya está aprobada y CUADRADA en el
    bucket (S150 las cuadró desde esta misma carpeta, con tres reglas según el
    fondo). Aquí sólo se reduce y se recomprime: la composición no cambia.
  - Las fotos nuevas se cuadran aquí: fondo blanco, producto centrado.
  - `imagen_url` apunta a la de 800 (la leen sitio, portal, cotizadores, OC y
    bot: 800 px les sobra). El sitio deriva la de 400 cambiando el sufijo.

Uso:
  python scripts/optimizar_fotos.py            # en seco: genera y mide, no sube
  python scripts/optimizar_fotos.py --subir    # sube al bucket catalogo/web/
  python scripts/optimizar_fotos.py --subir --escribir   # y reapunta imagen_url
Reversión: el respaldo JSON (sku, antes, después) se aplica al revés con
PATCH sku=eq.X & imagen_url=eq.<después>.
"""

import hashlib, io, json, os, re, sys, urllib.parse, urllib.request, zipfile
from datetime import datetime
from PIL import Image

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
AQUI = os.path.dirname(os.path.abspath(__file__))
MACSA = os.path.dirname(os.path.dirname(AQUI))
ENV = os.path.join(MACSA, 'sync_microsip', '.env')
KEY = [l.split('=', 1)[1].strip() for l in open(ENV, encoding='utf-8') if l.startswith('SB_SERVICE_KEY=')][0]
SB = 'https://jlhvtjsdbdgwvfhjahdi.supabase.co'
PUB = SB + '/storage/v1/object/public/catalogo/'
H = {'apikey': KEY, 'Authorization': 'Bearer ' + KEY}
ZIP = r'C:\Users\Dell\Downloads\MACSA Imagenes-20260929T191643Z-1-001.zip'
SALIDA = os.path.join(os.environ.get('TEMP', '.'), 'macsa_fotos_web')
SUBIR = '--subir' in sys.argv
ESCRIBIR = '--escribir' in sys.argv
TAMANOS = ((800, 80), (400, 78))  # (lado, calidad webp)

# Fotos nuevas de la carpeta → SKU. Cruce por nombre y medida contra la lista
# de precios Y Microsip (ARTICULOS), 29-sep:
NUEVAS = {
    'KR60': 'Fotos Heinz/Catsup Roomservice.png',        # KETCHUP ROOMSERVICE 60/63G — la foto dice 64 g
    'M60': 'Fotos Heinz/Mayonesa Roomservice.png',       # MAYO ROOMSERVICE 60/54 ML — la foto dice 54 ml
    'MZ60': 'Fotos Heinz/Mostaza Roomservice.png',       # MUSTARD ROOMSERVICE DIJON 60/57G — la foto dice 57 g
    'A1': 'Fotos Heinz/Salsa Steak A1.png',              # KRAFT A1 STEAK SAUCE 24/5 OZ — la foto dice 5 oz
    'JP500': 'Fotos Heinz/Salsa Jalapeño Heinz Sobre.png',  # SALSA JALAPENO HEINZ 500/8G — sobre de 8 g
}
# Sin renglón en la lista de precios: se suben, no se escriben.
#  - CABAL (CATSUP ABAL 4/3.8 KG) no está en precios_listas_macsa.
#  - LP12 es WORCESTERSHIRE 12/50 OZ y la foto es la botella de 5 oz:
#    una foto de otra presentación es peor que ninguna (S139).
SOLO_BUCKET = {
    'catsup-abal': 'Fotos Heinz/Catsup Abal.png',
    'worcestershire-lea-perrins-5oz': 'Fotos Heinz/Salsa Worcestershire Lea Y Perrins.png',
}
# 4011 apuntaba a la bolsa de súper "Filete Picante" de pilgrims.com.mx (se
# vende caja de 12 kg). La carpeta trae "Pechuga Enchilada Pilgrim's",
# aprobada en S150 y subida sin renglón: es la pechuga empanizada picante.
REAPUNTAR = {'4011': PUB + 'aprobadas/pechuga-enchilada-pilgrim-s-1x1.webp'}


def get(url, headers=None):
    req = urllib.request.Request(url, headers=headers or {'User-Agent': 'Mozilla/5.0'})
    return urllib.request.urlopen(req, timeout=60).read()


def filas():
    out, i = [], 0
    while True:
        q = '/rest/v1/precios_listas_macsa?select=sku,descripcion,activo,descontinuado,imagen_url,p1,p2,p3&order=sku'
        lote = json.loads(urllib.request.urlopen(urllib.request.Request(SB + q, headers={**H, 'Range': f'{i}-{i + 499}'})).read())
        out += lote
        if len(lote) < 500:
            return out
        i += 500


def publicable(f):
    return (f['activo'] is not False and f['descontinuado'] is not True and f['descripcion']
            and f['imagen_url'] and any((f[k] or 0) > 0 for k in ('p1', 'p2', 'p3')))


def cuadrar(im):
    """Foto nueva (PNG con alfa o fondo blanco) → cuadro blanco, producto centrado, 6 % de aire."""
    im = im.convert('RGBA')
    fondo = Image.new('RGBA', im.size, 'white')
    fondo.alpha_composite(im)
    im = fondo.convert('RGB')
    caja = Image.eval(im.convert('L'), lambda v: 255 if v < 245 else 0).getbbox() or (0, 0, *im.size)
    im = im.crop(caja)
    lado = int(max(im.size) * 1.12)
    lienzo = Image.new('RGB', (lado, lado), 'white')
    lienzo.paste(im, ((lado - im.width) // 2, (lado - im.height) // 2))
    return lienzo


def base_de(url):
    """Foto base ya aprobada y cuadrada. Si trae alfa, se aplana sobre blanco (el sitio usa multiply)."""
    im = Image.open(io.BytesIO(get(url)))
    if im.mode in ('RGBA', 'LA', 'P'):
        im = im.convert('RGBA')
        f = Image.new('RGBA', im.size, 'white')
        f.alpha_composite(im)
        im = f
    im = im.convert('RGB')
    if abs(im.width - im.height) > 2:  # por si alguna no venía cuadrada
        im = cuadrar(im)
    return im


def slug_de(url, sku):
    nombre = urllib.parse.unquote(url.rsplit('/', 1)[-1])
    nombre = re.sub(r'\.(webp|png|jpe?g)$', '', nombre, flags=re.I)
    nombre = re.sub(r'-1x1$', '', nombre)
    if '/catalogo/mrwings/' in url:
        nombre = 'mrwings-' + nombre
    elif '/storage/v1/object/public/catalogo/' not in url:
        nombre = sku.lower()  # hotlink de fabricante: se nombra por el SKU
    return re.sub(r'[^a-z0-9-]+', '-', nombre.lower()).strip('-')


def generar(im, slug):
    """Devuelve {lado: (nombre, bytes)} con hash de contenido en el nombre."""
    out = {}
    for lado, q in TAMANOS:
        r = im.resize((lado, lado), Image.LANCZOS) if im.width != lado else im
        b = io.BytesIO()
        r.save(b, 'WEBP', quality=q, method=6)
        out[lado] = b.getvalue()
    h = hashlib.sha1(out[800]).hexdigest()[:6]
    return {lado: (f'{slug}-{h}-{lado}.webp', data) for lado, data in out.items()}


def subir(nombre, data):
    url = f'{SB}/storage/v1/object/catalogo/web/{nombre}'
    req = urllib.request.Request(url, data=data, method='POST', headers={
        **H, 'Content-Type': 'image/webp', 'cache-control': 'max-age=31536000', 'x-upsert': 'true'})
    urllib.request.urlopen(req, timeout=60).read()
    vuelta = get(PUB + 'web/' + nombre)
    assert vuelta == data, f'{nombre}: lo que sirve el bucket no es lo que se subió'


def main():
    os.makedirs(SALIDA, exist_ok=True)
    todas = filas()
    por_sku = {f['sku']: f for f in todas}
    z = zipfile.ZipFile(ZIP)
    raiz = 'MACSA Imagenes/'

    # Estado propuesto: las nuevas y el reapunte, antes de filtrar.
    propuesta = {}
    for sku, archivo in NUEVAS.items():
        assert por_sku[sku]['imagen_url'] is None, f'{sku} ya tiene foto; revisar antes de pisar'
        propuesta[sku] = ('zip', archivo)
    for sku, url in REAPUNTAR.items():
        propuesta[sku] = ('url', url)

    objetivo = []
    for f in todas:
        g = dict(f)
        if f['sku'] in propuesta:
            g['imagen_url'] = 'pendiente'
        if publicable(g):
            objetivo.append(f)
    print(f'{len(objetivo)} productos publicables (con las nuevas)')

    fuentes = {}  # clave de fuente → (slug, cargador)
    asign = {}    # sku → clave de fuente
    for f in objetivo:
        sku = f['sku']
        if sku in propuesta and propuesta[sku][0] == 'zip':
            clave = 'zip:' + propuesta[sku][1]
            fuentes.setdefault(clave, (sku.lower(), lambda a=propuesta[sku][1]: cuadrar(Image.open(io.BytesIO(z.read(raiz + a))))))
        else:
            url = propuesta[sku][1] if sku in propuesta else f['imagen_url']
            clave = 'url:' + url
            fuentes.setdefault(clave, (slug_de(url, sku), lambda u=url: base_de(u)))
        asign[sku] = clave
    for slug, archivo in SOLO_BUCKET.items():
        fuentes['zip:' + archivo] = (slug, lambda a=archivo: cuadrar(Image.open(io.BytesIO(z.read(raiz + a)))))

    antes_total = despues_800 = despues_400 = 0
    resultado = {}
    for clave, (slug, cargar) in sorted(fuentes.items()):
        im = cargar()
        gen = generar(im, slug)
        for lado, (nombre, data) in gen.items():
            open(os.path.join(SALIDA, nombre), 'wb').write(data)
        resultado[clave] = gen
        despues_800 += len(gen[800][1])
        despues_400 += len(gen[400][1])
        if clave.startswith('url:'):
            try:
                antes_total += len(get(clave[4:]))
            except Exception:
                pass
    n = len(fuentes)
    print(f'{n} fotos distintas · antes {antes_total / 1e6:.2f} MB · '
          f'800 px {despues_800 / 1e6:.2f} MB (prom {despues_800 / n / 1000:.0f} KB) · '
          f'400 px {despues_400 / 1e6:.2f} MB (prom {despues_400 / n / 1000:.0f} KB)')
    print('archivos en', SALIDA)

    if not SUBIR:
        print('En seco: no se subió nada. --subir para subir, --subir --escribir para reapuntar imagen_url.')
        return
    for clave, gen in resultado.items():
        for lado, (nombre, data) in gen.items():
            subir(nombre, data)
    print(f'{2 * len(resultado)} archivos subidos y releídos del bucket (byte a byte)')

    if not ESCRIBIR:
        return
    cambios = []
    for sku, clave in sorted(asign.items()):
        antes = por_sku[sku]['imagen_url']
        despues = PUB + 'web/' + resultado[clave][800][0]
        if antes != despues:
            cambios.append({'sku': sku, 'imagen_url_antes': antes, 'imagen_url_despues': despues})
    marca = datetime.now().strftime('%Y%m%d_%H%M')
    resp = os.path.join(MACSA, 'entregables', f'respaldo_imagen_url_{marca}_s170_web.json')
    json.dump(cambios, open(resp, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'respaldo {resp} ({len(cambios)} renglones)')
    for c in cambios:
        filtro = f"sku=eq.{urllib.parse.quote(c['sku'])}&" + (
            'imagen_url=is.null' if c['imagen_url_antes'] is None
            else 'imagen_url=eq.' + urllib.parse.quote(c['imagen_url_antes'], safe=''))
        req = urllib.request.Request(f'{SB}/rest/v1/precios_listas_macsa?{filtro}',
                                     data=json.dumps({'imagen_url': c['imagen_url_despues']}).encode(), method='PATCH',
                                     headers={**H, 'Content-Type': 'application/json', 'Prefer': 'return=representation'})
        filas_ok = json.loads(urllib.request.urlopen(req).read())
        assert len(filas_ok) == 1, (c['sku'], len(filas_ok))
    relectura = {f['sku']: f['imagen_url'] for f in filas()}
    malos = [c['sku'] for c in cambios if relectura.get(c['sku']) != c['imagen_url_despues']]
    print(f'{len(cambios)} imagen_url reapuntadas; relectura: {len(cambios) - len(malos)} ok, {len(malos)} mal {malos}')


if __name__ == '__main__':
    main()
