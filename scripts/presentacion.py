#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Saca la presentación de un producto de su propia descripción.

Por qué hace falta: la columna `presentacion` de `precios_listas_macsa` dice
"Por definir" en 115 de los 285 productos sin foto — pero la descripción de
Microsip **sí la trae**, al final y en mayúsculas: "SALSA MANGO HABANERO
GALON", "SAZONADOR LEMON PEPPER BOTE 800 GR", "CATSUP HEINZ 1000 SOBRE DE 9GR".
Enseñar "Por definir" cuando el dato está a la vista en el propio nombre es
pedirle a alguien que capture lo que ya está capturado.

No inventa: si la descripción no dice el envase ni la medida, devuelve None y
la ficha se queda sin presentación, que es lo honesto.
"""

import re

ENVASES = [
    # "GALO" sin N aparece por descripciones truncadas en Microsip.
    (r"\bGAL[OÓ]N\b|\bGALON\b|\bGALO\b|\bGAL\b", "Galón"),
    (r"\bBID[OÓ]N\b", "Bidón"),
    (r"\bCUBETA\b", "Cubeta"),
    (r"\bBOTE\b", "Bote"),
    (r"\bBOTELLITA\b", "Botellita"),
    (r"\bBOTELLA\b", "Botella"),
    (r"\bPOUCH\b", "Pouch"),
    (r"\bBOLSA\b", "Bolsa"),
    (r"\bSOBRES?\b", "Sobre"),
    (r"\bCAJA\b|\bCJ\b", "Caja"),
]

# 500/8G, 72/30G, 12/12.7OZ, y el "6/5 LB" de Lamb Weston (6 bolsas de 5 lb).
RE_PAR = re.compile(r"\b(\d{1,4})\s*/\s*(\d+(?:\.\d+)?)\s*(GR?|G|ML|OZ|KGS?|LBS?|L)\b", re.I)
# "1000 SOBRE DE 9GR", "500 PZ 8GR", "4 BLS DE 3KG"
RE_CUENTA_DE = re.compile(
    r"\b(\d{1,4})\s*(?:SOBRES?|PZ|PZS|PIEZAS?|BLS|BOLSAS?)\s*(?:DE\s*)?(\d+(?:\.\d+)?)\s*(GR?|G|ML|KG|L)\b",
    re.I,
)
RE_MEDIDA = re.compile(
    r"(?<![\d/.-])(\d+(?:[.,]\d+)?)\s*(KILOS?|KGS?|KG|LBS?|LB|LTS?|LT|L|ML|GRS?|GR|G|OZ)\b", re.I
)
RE_PIEZAS = re.compile(r"\b(\d{1,4})\s*(?:PZ|PZS|PIEZAS?)\b", re.I)

UNIDAD = {
    "KILO": "kg", "KILOS": "kg", "KG": "kg", "KGS": "kg",
    "LB": "lb", "LBS": "lb",
    "L": "L", "LT": "L", "LTS": "L",
    "ML": "ml",
    "G": "g", "GR": "g", "GRS": "g",
    "OZ": "oz",
}


def _u(txt):
    return UNIDAD.get(txt.upper(), txt.lower())


def _num(txt):
    n = txt.replace(",", ".")
    return n[:-2] if n.endswith(".0") else n


def presentacion_de(descripcion, sku="", presentacion=None):
    """
    La presentación que se le enseña al cliente.

    Manda la columna de la base cuando dice algo; si dice "Por definir" o está
    vacía, se saca de la descripción; y si de ahí tampoco sale, None.
    """
    if presentacion and presentacion.strip() and presentacion.strip().lower() != "por definir":
        return presentacion.strip()

    d = (descripcion or "").upper()
    if sku and d.startswith(sku.upper()):
        d = d[len(sku):]
    if not d.strip():
        return None

    envase = next((nombre for patron, nombre in ENVASES if re.search(patron, d)), None)

    # "1000 sobres de 9 g" tiene prioridad: dice cuántas piezas Y de cuánto.
    m = RE_CUENTA_DE.search(d) or RE_PAR.search(d)
    if m:
        cuenta, medida, unidad = m.group(1), _num(m.group(2)), _u(m.group(3))
        cuerpo = f"{cuenta} pz de {medida} {unidad}"
        return f"{envase} {cuerpo}" if envase and envase != "Sobre" else cuerpo

    m = RE_MEDIDA.search(d)
    if m:
        cuerpo = f"{_num(m.group(1))} {_u(m.group(2))}"
        return f"{envase} {cuerpo}" if envase else cuerpo

    m = RE_PIEZAS.search(d)
    if m:
        cuerpo = f"{m.group(1)} pz"
        return f"{envase} {cuerpo}" if envase else cuerpo

    return envase


if __name__ == "__main__":
    CASOS = [
        ("SALSA MANGO HABANERO GALON", "MANGOH", "Por definir"),
        ("SALSA BBQ B CULINAIRE 3.78 L", "BBQC", "Por definir"),
        ("SALSA MANGO HABANERO 414 ML.", "MANGOH414", "Por definir"),
        ("SAZONADOR LEMON PEPPER BOTE 800 GR", "LP", "Por definir"),
        ("C1000 CATSUP HEINZ 1000 SOBRE DE 9GR", "C1000", "Por definir"),
        ("JARABE DE MAPLE HEINZ 72/30G", "J72", "Por definir"),
        ("BSA BIDON SALSA PARA ALITAS  ORIGINAL 20 KILOS", "BSA", "Por definir"),
        ("WE95 PAPA WENDY'S CAJA 36 LB", "WE95", "Por definir"),
        ("MZ4B MOSTAZA HEINZ POUCH CAJA CON 4 BLS DE 3KG", "MZ4B", "Por definir"),
        ("ACH9 ALA CHILENA AGROSUPER 9 KG.", "ACH9", "Por definir"),
        ("EM108 ELOTE MITADES 108 PZ DE", "EM108", "Por definir"),
        ("VW01 PAPA ONDULADA NATURAL", "VW01", "Por definir"),
        ("HEINZ RELISHPET 12/12.7OZ", "P12", "Por definir"),
        ("Salsa De Mezcal 3.8 L (4.0 kg)", "P-0155", None),
        ("12021 PAPA ONDULADA 1/2  EXTRA LARGA", "12021", "Caja 13.6 kg (30 lb)"),
    ]
    for desc, sku, pres in CASOS:
        print(f"  {str(presentacion_de(desc, sku, pres)):<22} ← {desc[:50]}")
