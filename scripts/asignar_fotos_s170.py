#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
[S170 · 30-sep-2026] Fotos para productos con precio que no tenían ninguna.

Fuentes, en orden (Protocolo D: primero lo que ya existe):
  1. Fotos APROBADAS de la carpeta de Emiliano (S150) que se subieron sin renglón y nunca se asignaron.
  2. Hermanos: el mismo producto con otro código (B36-3007 = B36; DQS24 = DQS en caja de 24 lb;
     X0036 = Muncher Cheddar P40) y equivalencias registradas (CHRO = 40230).
Cada foto se revisó a ojo antes de entrar aquí. Regla de siempre: foto de otra presentación, no
(RB4012 dispensador 4 kg ≠ bolsa 3 kg de RB4011 → se queda sin foto).

Uso: python scripts/asignar_fotos_s170.py [--escribir]
Sólo escribe donde imagen_url está vacío; respaldo en entregables/.
"""
import io, json, os, sys, urllib.parse, urllib.request
from datetime import datetime
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import optimizar_fotos as of

AP = of.PUB + 'aprobadas/'
FUENTE = {
    'HZBBQP': AP + 'bbq-heinz-390g-1x1.webp',
    'BCH13': AP + 'bch13-1x1.webp',
    'HZROY': AP + 'mayonesa-real-sobre-1x1.webp',
    'MHH': AP + 'mike-s-hot-honey-1x1.webp',
    'MHE': AP + 'mike-s-hot-honey-1x1.webp',
    'UB001': AP + 'papa-1-2-op-1x1.webp',
    'BWS': AP + 'salsa-buffalo-sweet-baby-ray-s-1x1.webp',
    'SS': AP + 'salsa-signature-ventura-foods-1x1.webp',
    'SSCH': AP + 'salsa-sweet-chili-ventura-foods-1x1.webp',
    'TR12': AP + 'salsa-tabasco-355ml-1x1.webp',
    'T01427': AP + 'tocino-en-tira-1x1.webp',
    'CHRO': AP + 'chicharo-desgranado-1x1.webp',
    'B36-3007': 'HERMANO:B36',
    'DQS24': 'HERMANO:DQS',
    'X0036': 'HERMANO:P40',
}


def main(escribir):
    filas = {f['sku']: f for f in of.filas()}
    hechos, cache = [], {}
    for sku, src in FUENTE.items():
        f = filas.get(sku)
        assert f, sku
        if f['imagen_url']:
            print('ya tiene foto, se deja:', sku); continue
        if src.startswith('HERMANO:'):
            url = filas[src.split(':')[1]]['imagen_url']
            assert url and '/catalogo/web/' in url, (sku, url)   # la del hermano ya está optimizada
        else:
            if src not in cache:
                im = of.base_de(src)
                gen = of.generar(im, of.slug_de(src, sku))
                if escribir:
                    for lado, (nombre, data) in gen.items():
                        of.subir(nombre, data)
                cache[src] = of.PUB + 'web/' + gen[800][0]
            url = cache[src]
        hechos.append({'sku': sku, 'imagen_url_antes': None, 'imagen_url_despues': url})
        print('%-9s ← %s' % (sku, url.split('/')[-1]))
    if not escribir:
        print(len(hechos), 'por asignar. --escribir para aplicar.'); return
    marca = datetime.now().strftime('%Y%m%d_%H%M')
    resp = os.path.join(of.MACSA, 'entregables', f'respaldo_imagen_url_{marca}_s170_nuevas.json')
    json.dump(hechos, open(resp, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    for h in hechos:
        req = urllib.request.Request(f"{of.SB}/rest/v1/precios_listas_macsa?sku=eq.{urllib.parse.quote(h['sku'])}&imagen_url=is.null",
                                     data=json.dumps({'imagen_url': h['imagen_url_despues']}).encode(), method='PATCH',
                                     headers={**of.H, 'Content-Type': 'application/json', 'Prefer': 'return=representation'})
        assert len(json.loads(urllib.request.urlopen(req).read())) == 1, h['sku']
    relee = {f['sku']: f['imagen_url'] for f in of.filas()}
    mal = [h['sku'] for h in hechos if relee.get(h['sku']) != h['imagen_url_despues']]
    print(f'respaldo {resp} · {len(hechos)} asignadas · relectura mal: {mal}')


if __name__ == '__main__':
    main('--escribir' in sys.argv)
