#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Saca las fotos de producto del catálogo oficial en PDF y las empareja con su
producto de `precios_listas_macsa`.

Por qué existe
--------------
El sitio publicaba 92 de 394 productos activos porque `sincronizar_catalogo.mjs`
sólo deja pasar los que tienen `imagen_url`, y en la base sólo 95 la tienen —
71 de ellos papa, porque Lamb Weston sí publica foto por SKU. El resto del
catálogo estaba invisible: los jalapeños, los dedos de queso, las verduras.

Las fotos que faltaban ya existían: están dentro del catálogo que arma Emiliano
cada dos meses. Este script las saca de ahí en vez de salir a buscarlas a
internet una por una, que además traería fotos que no son las de MACSA.

Cómo empareja
-------------
En un catálogo la foto va arriba y el nombre debajo. Así que para cada imagen
se busca el bloque de texto cuyo centro cae MÁS CERCA por debajo, dentro de la
misma columna. De ese bloque salen tres cosas: el código (si aparece suelto,
como `B36` o `12021`), el nombre y la presentación entre paréntesis.

⚠️ El emparejamiento no se escribe solo en la base. Sale a un CSV para que
Edgar lo revise: una foto en el producto equivocado es peor que ninguna foto,
y él es quien puede decir si la de la izquierda es la Stealth o la Crispy.

Uso:
    python scripts/extraer_catalogo_pdf.py "<ruta del pdf>"
"""

import csv
import hashlib
import io
import os
import re
import sys
import unicodedata

import fitz
from PIL import Image

SALIDA = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "_fotos_catalogo")

# Un lado de 800 px basta para una ficha: la tarjeta la pinta a 320 y la
# ficha grande a 640. Más allá es peso que el cliente descarga sin verlo.
LADO_MAX = 800
CALIDAD = 82

# Un código de producto suelto en su propia línea: B36, 12021, 3/8 OP, LW200.
RE_CODIGO = re.compile(r"^[A-Z0-9][A-Z0-9\-/ ]{1,11}$")
# La presentación va entre paréntesis: (13.6kg/6), (≈10kg), (13kg)
RE_PRESENTACION = re.compile(r"\(([^)]+)\)")


def normaliza(t: str) -> str:
    """Para comparar nombres: sin acentos, sin dobles espacios, en minúscula."""
    t = unicodedata.normalize("NFD", t)
    t = "".join(c for c in t if unicodedata.category(c) != "Mn")
    return re.sub(r"\s+", " ", t).strip().lower()


def palabras_de(pagina):
    """Palabras con su caja. Se trabaja con palabras y no con bloques porque el
    catálogo es una rejilla: `get_text("blocks")` junta el pie de una foto con
    el de la de al lado y sale "Papa Twister Sazonada Papa CrissCut Sazonada"."""
    return pagina.get_text("words")


# Los SKU reales de `precios_listas_macsa`. Se cargan en main().
SKUS = set()


def es_codigo(token: str) -> bool:
    """
    Un token es código sólo si EXISTE en la base.

    Adivinarlo por la forma no funciona: `3/8` y `5/16` parecen códigos y son
    medidas del nombre, `BBQ` parece código y es sabor, y `PAPAS` o
    `APPETIZERS` son encabezados de sección que también caen bajo una foto.
    Cotejar contra los 394 SKU activos quita toda la ambigüedad de un golpe —
    y de paso garantiza que lo que se escriba en la base apunte a algo real.
    """
    return token.upper() in SKUS


def interpreta(lineas):
    """Del pie de foto saca código, nombre y presentación."""
    codigo, nombre, presentacion = None, [], None
    for linea in lineas:
        # El pie puede traer dos códigos juntos ("D23 X9181"): manda el primero.
        sueltos = [t for t in linea.split() if es_codigo(t)]
        if sueltos and len(" ".join(sueltos)) >= len(linea.strip()) - 2:
            if codigo is None:
                codigo = sueltos[0]
            continue

        m = RE_PRESENTACION.search(linea)
        if m and presentacion is None:
            presentacion = m.group(1)
        limpia = RE_PRESENTACION.sub("", linea).strip()
        # Un codigo incrustado a media linea tampoco es parte del nombre.
        palabras = [t for t in limpia.split() if not es_codigo(t)]
        if codigo is None:
            for t in limpia.split():
                if es_codigo(t):
                    codigo = t
                    break
        if palabras:
            nombre.append(" ".join(palabras))
    return codigo, " ".join(nombre).strip(), presentacion


def pies_por_imagen(cajas, palabras):
    """
    Reparte las palabras de la página entre las fotos, no al revés.

    El catálogo es una rejilla de tres o cuatro columnas. Si para cada foto se
    barre "lo que hay debajo", el barrido invade la columna de al lado y salen
    engendros como "Papa Stealth 3/8 Con S34 Papa Stealth 1/4 Sin". Asignando
    cada palabra a UNA sola foto —la que tiene encima y más alineada— cada pie
    queda entero y sin robarle nada al vecino.
    """
    reparto = {i: [] for i in range(len(cajas))}

    for w in palabras:
        x0, y0, x1, y1 = w[0], w[1], w[2], w[3]
        cx = (x0 + x1) / 2

        mejor, mejor_puntaje = None, None
        for i, c in enumerate(cajas):
            hueco = y0 - c.y1
            if hueco < -4 or hueco > 85:
                continue  # ni encima de la foto ni tan lejos que sea de otra fila
            dx = abs(cx - (c.x0 + c.x1) / 2)
            if dx > c.width * 0.85:
                continue  # está en otra columna
            puntaje = (dx, max(hueco, 0))
            if mejor_puntaje is None or puntaje < mejor_puntaje:
                mejor, mejor_puntaje = i, puntaje

        if mejor is not None:
            reparto[mejor].append(w)

    pies = {}
    for i, ws in reparto.items():
        renglones = {}
        for x0, y0, x1, y1, palabra, bloque, linea, _ in ws:
            renglones.setdefault(round(y0, 0), []).append((x0, palabra))
        pies[i] = [
            " ".join(p for _, p in sorted(renglones[k])).strip()
            for k in sorted(renglones)
        ]
    return pies


def es_encabezado(lineas):
    """Descarta títulos de sección y adornos: no son pies de foto."""
    if not lineas:
        return True
    texto = " ".join(lineas).strip()
    if len(texto) < 4:
        return True
    if texto.upper() == texto and "(" not in texto:
        return True  # PAPAS SAZONADAS, CATÁLOGO, COTIZA CON…
    if re.fullmatch(r"[+\d\s\-()]+", texto):
        return True  # un teléfono
    return False


def cargar_skus():
    """Los SKU activos, para reconocer un código cuando aparece en el PDF."""
    ruta = os.path.join(SALIDA, "_base.json")
    if not os.path.exists(ruta):
        print("aviso: falta _base.json, no se reconoceran codigos")
        return []
    import json

    with open(ruta, encoding="utf-8") as fh:
        filas = json.load(fh)
    SKUS.update(f["sku"].upper() for f in filas if f.get("sku"))
    return filas


def main(ruta_pdf):
    os.makedirs(SALIDA, exist_ok=True)
    cargar_skus()
    doc = fitz.open(ruta_pdf)

    filas = []
    vistos = {}
    descartadas = 0

    for numero, pagina in enumerate(doc, start=1):
        palabras = palabras_de(pagina)
        alto = pagina.rect.height

        # Todas las cajas de imagen de la pagina, para saber donde termina el
        # pie de cada una: justo antes de la siguiente foto de su columna.
        infos = [
            i
            for i in pagina.get_image_info(xrefs=True)
            if fitz.Rect(i["bbox"]).width >= 60 and fitz.Rect(i["bbox"]).height >= 60
        ]
        cajas = [fitz.Rect(i["bbox"]) for i in infos]
        pies = pies_por_imagen(cajas, palabras)

        for indice, info in enumerate(infos):
            xref = info.get("xref")
            if not xref:
                continue
            rect = fitz.Rect(info["bbox"])
            if rect.width < 60 or rect.height < 60:
                descartadas += 1
                continue

            try:
                base = doc.extract_image(xref)
            except Exception:
                continue
            if base["width"] < 120 or base["height"] < 120:
                descartadas += 1
                continue

            huella = hashlib.md5(base["image"]).hexdigest()
            if huella in vistos:
                continue  # la misma foto repetida en varias páginas

            lineas = pies.get(indice, [])
            if es_encabezado(lineas):
                descartadas += 1
                continue
            codigo, nombre, presentacion = interpreta(lineas)
            if not nombre:
                descartadas += 1
                continue

            # A WebP: pesa la cuarta parte y lo entienden todos los navegadores
            # que le importan a un restaurantero con celular.
            imagen = Image.open(io.BytesIO(base["image"]))
            if imagen.mode not in ("RGB", "RGBA"):
                imagen = imagen.convert("RGB")
            imagen.thumbnail((LADO_MAX, LADO_MAX), Image.LANCZOS)

            archivo = f"p{numero:02d}_{huella[:8]}.webp"
            imagen.save(os.path.join(SALIDA, archivo), "WEBP", quality=CALIDAD, method=6)

            vistos[huella] = archivo
            filas.append(
                {
                    "archivo": archivo,
                    "pagina": numero,
                    "codigo_pdf": codigo or "",
                    "nombre_pdf": nombre,
                    "presentacion_pdf": presentacion or "",
                    "nombre_norm": normaliza(nombre),
                    "px": f"{base['width']}x{base['height']}",
                }
            )

    csv_ruta = os.path.join(SALIDA, "_extraidas.csv")
    with open(csv_ruta, "w", newline="", encoding="utf-8") as fh:
        campos = ["archivo", "pagina", "codigo_pdf", "nombre_pdf", "presentacion_pdf", "nombre_norm", "px"]
        w = csv.DictWriter(fh, fieldnames=campos)
        w.writeheader()
        w.writerows(filas)

    peso = sum(os.path.getsize(os.path.join(SALIDA, f["archivo"])) for f in filas)
    con_codigo = sum(1 for f in filas if f["codigo_pdf"])
    print(f"paginas leidas:       {len(doc)}")
    print(f"fotos extraidas:      {len(filas)}")
    print(f"  con codigo en PDF:  {con_codigo}")
    print(f"  solo con nombre:    {len(filas) - con_codigo}")
    print(f"descartadas:          {descartadas}  (iconos, adornos, sin pie de foto)")
    print(f"peso total en webp:   {peso / 1024 / 1024:.1f} MB")
    print(f"\nsalida: {SALIDA}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit("uso: python scripts/extraer_catalogo_pdf.py <ruta del pdf>")
    main(sys.argv[1])
