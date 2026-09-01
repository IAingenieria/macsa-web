#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Empareja cada foto sacada del PDF con su producto de `precios_listas_macsa`.

Hay dos formas de amarrar una foto a un producto y no valen lo mismo:

  ALTA   El pie de la foto trae un código que existe en la base. No hay nada
         que interpretar: la foto es de ese SKU. Se escribe sin preguntar.

  MEDIA  El pie sólo trae el nombre ("Elote Amarillo Entero", "Pan para Hot
         Dog"). Se busca el producto cuya descripción se parece más, y el
         parecido tiene que ser alto Y compartir las palabras que distinguen
         al producto — si no, "Boneless Natural" se lleva la foto del
         "Boneless Buffalo". Va a la hoja de revisión de Edgar.

  BAJA   Ni código ni parecido suficiente. No se toca nada.

Sólo ALTA se escribe sola. Una foto en el producto equivocado es peor que
ninguna foto: el cliente pide lo que ve.
"""

import csv
import json
import os
import re
import unicodedata
from difflib import SequenceMatcher

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARPETA = os.path.join(RAIZ, "_fotos_catalogo")

# Ruido del PDF que no describe al producto: encabezados de sección que caen
# dentro del pie y reclamos de diseño.
RUIDO = {
    "papas", "marinadas", "sazonadas", "appetizers", "naturales", "catalogo",
    "productos", "congelados", "secos", "mr", "wings", "cotiza", "con",
    "el", "la", "los", "las", "de", "del", "para", "tu", "y", "o", "en", "a",
    "toque", "crunchy", "pizza!", "excelencia!", "perfecta!", "mejor", "sabor",
}

# Palabras que DECIDEN de qué producto se trata. Si el candidato no comparte
# al menos una, el parecido global no basta.
CLAVES = {
    "elote", "chicharo", "zanahoria", "mezcla", "campesina", "desgranado",
    "entero", "mitades", "pan", "hamburguesa", "slider", "hot", "dog",
    "pechuga", "boneless", "alita", "ala", "tender", "nugget", "pollo",
    "mayonesa", "ranch", "bbq", "miel", "mostaza", "sriracha", "chili",
    "buffalo", "cheddar", "queso", "mozzarella", "dedo", "muncher",
    "pepperoni", "salchicha", "tocino", "salsa", "catsup", "mostaza",
    "churro", "pay", "manzana", "chocolate", "aceite", "aro", "cebolla",
    "papa", "hashbrown", "tater", "chips", "twister", "crisscut", "gajo",
    "stealth", "crispy", "seashore", "steakhouse", "ondulada", "recta",
}


def normaliza(t):
    t = unicodedata.normalize("NFD", t or "")
    t = "".join(c for c in t if unicodedata.category(c) != "Mn")
    t = re.sub(r"[^a-z0-9/ ]", " ", t.lower())
    return re.sub(r"\s+", " ", t).strip()


def tokens(t):
    return {p for p in normaliza(t).split() if p not in RUIDO and len(p) > 1}


def parecido(a, b):
    return SequenceMatcher(None, a, b).ratio()


def main():
    filas = list(csv.DictReader(open(os.path.join(CARPETA, "_extraidas.csv"), encoding="utf-8")))
    base = json.load(open(os.path.join(CARPETA, "_base.json"), encoding="utf-8"))

    por_sku = {p["sku"].upper(): p for p in base}
    # Sólo se le busca foto a quien no la tiene: nunca se pisa una existente.
    sin_foto = [p for p in base if not p.get("imagen_url")]
    for p in sin_foto:
        p["_tok"] = tokens(p.get("descripcion", ""))
        p["_norm"] = normaliza(p.get("descripcion", ""))

    resultado = []
    usados = set()

    # ── Vuelta 1: por código, que es la que no admite duda ────────────────
    for f in filas:
        cod = (f["codigo_pdf"] or "").upper()
        if cod and cod in por_sku and cod not in usados:
            p = por_sku[cod]
            resultado.append(
                {
                    **f,
                    "sku": p["sku"],
                    "descripcion": p.get("descripcion", ""),
                    "confianza": "ALTA",
                    "motivo": "el codigo aparece en el pie de la foto",
                    "ya_tenia_foto": bool(p.get("imagen_url")),
                    "puntaje": "1.00",
                }
            )
            usados.add(cod)
            f["_resuelta"] = True

    # ── Vuelta 2: por nombre, sólo entre los que no tienen foto ───────────
    for f in filas:
        if f.get("_resuelta"):
            continue
        nom = normaliza(f["nombre_pdf"])
        tok = tokens(f["nombre_pdf"])
        if not tok:
            continue

        # El peso que trae el PDF entre paréntesis desempata a los gemelos:
        # "Ala Chilena Agrosuper" existe en 9 kg y en 13 kg, y el pie dice cuál.
        peso_pdf = re.search(r"(\d+(?:\.\d+)?)\s*kg", (f["presentacion_pdf"] or "").lower())
        peso_pdf = float(peso_pdf.group(1)) if peso_pdf else None

        puntuados = []
        for p in sin_foto:
            if p["sku"].upper() in usados:
                continue
            comunes = tok & p["_tok"]
            if not comunes or not (comunes & CLAVES):
                continue
            ratio = parecido(nom, p["_norm"])
            cobertura = len(comunes) / max(len(tok), 1)
            puntaje = ratio * 0.45 + cobertura * 0.55
            if peso_pdf and re.search(rf"{int(peso_pdf)}\s*(kg|k)", p["_norm"]):
                puntaje += 0.12
            puntuados.append((puntaje, p))

        puntuados.sort(key=lambda x: -x[0])
        mejor, mejor_p = (puntuados[0][1], puntuados[0][0]) if puntuados else (None, 0.0)
        segundo = puntuados[1][0] if len(puntuados) > 1 else 0.0

        # ⚠️ El margen es lo que evita el error caro. "Alita Picosita Bachoco"
        # empataba en 0.52 con una salsa de piña: cuando el segundo pisa los
        # talones al primero, la máquina no sabe y no debe decidir.
        margen = mejor_p - segundo
        if mejor and mejor_p >= 0.55 and margen >= 0.12:
            resultado.append(
                {
                    **f,
                    "sku": mejor["sku"],
                    "descripcion": mejor.get("descripcion", ""),
                    "confianza": "MEDIA",
                    "motivo": f"coincide el nombre (margen {margen:.2f} sobre el segundo)",
                    "ya_tenia_foto": False,
                    "puntaje": f"{mejor_p:.2f}",
                }
            )
            usados.add(mejor["sku"].upper())
        else:
            resultado.append(
                {
                    **f,
                    "sku": "",
                    "descripcion": "",
                    "confianza": "BAJA",
                    "motivo": "sin codigo, o dos productos empatan y hay que verlo",
                    "ya_tenia_foto": False,
                    "puntaje": f"{mejor_p:.2f}",
                }
            )

    campos = [
        "archivo", "pagina", "codigo_pdf", "nombre_pdf", "presentacion_pdf",
        "sku", "descripcion", "confianza", "motivo", "ya_tenia_foto", "puntaje",
    ]
    salida = os.path.join(CARPETA, "_cruce.csv")
    with open(salida, "w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=campos, extrasaction="ignore")
        w.writeheader()
        w.writerows(resultado)

    alta = [r for r in resultado if r["confianza"] == "ALTA"]
    media = [r for r in resultado if r["confianza"] == "MEDIA"]
    baja = [r for r in resultado if r["confianza"] == "BAJA"]
    nuevas = [r for r in alta + media if not r["ya_tenia_foto"]]

    print(f"fotos cruzadas:   {len(resultado)}")
    print(f"  ALTA (codigo):  {len(alta)}   de las cuales {sum(1 for r in alta if r['ya_tenia_foto'])} ya tenian foto")
    print(f"  MEDIA (nombre): {len(media)}")
    print(f"  BAJA:           {len(baja)}")
    print(f"\nproductos que GANAN foto: {len(nuevas)}")
    print(f"salida: {salida}")


if __name__ == "__main__":
    main()
