#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Arma la hoja de trabajo para Emiliano: qué fotos le faltan al catálogo.

No es una lista plana de 281 productos. Está partida por lo único que importa
para decidir por dónde empezar: **si el producto se vende o no**. Los 100 que
facturaron en 2026 van primero, agrupados por categoría y ordenados por peso
dentro de cada una; los otros 181 van aparte, porque para ésos la pregunta no
es "consígueme la foto" sino "¿esto todavía se maneja?".

⭐ La hoja pide que cada archivo se llame **como el código** (`B36.jpg`). Con eso
la carga de vuelta es automática; sin eso, alguien tiene que emparejar 281 fotos
a mano y ahí es donde se cuelan los errores.

Uso:
    python scripts/hoja_fotos_faltantes.py
"""

import io
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from presentacion import presentacion_de

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARPETA = os.path.join(RAIZ, "_fotos_catalogo")
SALIDA = os.path.join(CARPETA, "fotos-que-faltan.html")

# La carpeta donde Emiliano sube las fotos. Un artifact no puede recibir
# archivos, asi que el canal de las imagenes vive fuera de la pagina.
DRIVE = "https://drive.google.com/drive/folders/1mSumNDTlApKcShgFp7H5xdX83RU4ghfD?usp=drive_link"

# Cómo se llama cada categoría de la base en el lenguaje del catálogo.
NOMBRES = {
    "Papa": "Papa a la francesa",
    "Aderezo": "Aderezos y salsas de barra",
    "Mr Wings": "Salsas Mr. Wings",
    "Heinz": "Heinz y abarrote",
    "Pollo": "Pollo",
    "Postres": "Postres",
    "Postre": "Postres",
    "Bundt": "Postres",
    "Ugasa": "Carne y hamburguesa",
    "Smithfield": "Carne y hamburguesa",
    "Hamburguesa": "Carne y hamburguesa",
    "Vegetal": "Verduras y elote",
    "Vegetales TCF": "Verduras y elote",
    "Aceite": "Aceites para freír",
    "Pescado": "Pescados y mariscos",
    "Queso/Snack": "Quesos y appetizers",
    "Queso": "Quesos y appetizers",
    "Sargento": "Quesos y appetizers",
    "RD Mex Foods": "Pan y varios",
    "Salsa": "Salsas",
    "La Pocima": "Salsas para alitas",
    "Hello Buffalo": "Salsas para alitas",
    "Aro": "Aros de cebolla",
    "Paradiso": "Toppings para pizza",
    "Otro": "Otros",
}


def bonito(desc, sku):
    """Quita el SKU repetido al frente y baja las MAYÚSCULAS de Microsip."""
    t = (desc or "").strip()
    for _ in range(2):
        if t.upper().startswith(sku.upper()):
            t = t[len(sku):].strip()
    t = re.sub(r"\s+", " ", t)
    if t == t.upper() and re.search(r"[A-ZÁÉÍÓÚÑ]{3}", t):
        t = t.title()
    return t or sku


def main():
    sin = json.load(io.open(os.path.join(CARPETA, "_sinfoto.json"), encoding="utf-8"))
    ventas = json.load(io.open(os.path.join(CARPETA, "_ventas2026.json"), encoding="utf-8"))
    resumen = json.load(io.open(os.path.join(CARPETA, "_resumen.json"), encoding="utf-8"))
    imp, ult = ventas["importe"], ventas["ultima"]

    vivos, dormidos, sin_precio = [], [], []
    for p in sin:
        sku = p["sku"]
        fila = {
            "sku": sku,
            "nombre": bonito(p.get("descripcion"), sku),
            "cat": NOMBRES.get(p.get("categoria") or "", p.get("categoria") or "Otros"),
            # La columna de la base dice "Por definir" en 115 de estos; la
            # descripcion si lo trae, asi que se saca de ahi.
            "pres": presentacion_de(p.get("descripcion"), sku, p.get("presentacion")) or "",
            "lb": p.get("peso_lb"),
            "ultima": ult.get(sku, ""),
        }
        # Un producto sin precio no se puede cotizar, así que su foto no sirve
        # de nada mientras Jorge no lo liste. No se le pide a Emiliano: se
        # aparta para que lo vea quien puede resolverlo.
        if not p.get("con_precio"):
            sin_precio.append(fila)
        elif sku in imp:
            fila["peso"] = imp[sku]
            vivos.append(fila)
        else:
            dormidos.append(fila)

    # Prioridad en tres tramos por facturación. Se enseña el tramo, no el
    # importe: la hoja sale del edificio y no tiene por qué llevar cifras.
    vivos.sort(key=lambda f: -f["peso"])
    for i, f in enumerate(vivos):
        f["prio"] = 3 if i < len(vivos) * 0.3 else 2 if i < len(vivos) * 0.65 else 1
        del f["peso"]

    def agrupar(filas):
        g = {}
        for f in filas:
            g.setdefault(f["cat"], []).append(f)
        return sorted(g.items(), key=lambda kv: -len(kv[1]))

    datos = {
        "vivos": agrupar(vivos),
        "dormidos": agrupar(sorted(dormidos, key=lambda f: f["sku"])),
        "sin_precio": agrupar(sorted(sin_precio, key=lambda f: f["sku"])),
        "n_vivos": len(vivos),
        "n_dormidos": len(dormidos),
        "n_sin_precio": len(sin_precio),
        # Se leen del resumen que deja `datos_hoja.py`, nunca a mano: la
        # primera version los traia fijos y la hoja anunciaba "76 de 394"
        # cuando ya eran otros.
        "n_publicados": resumen["publicados"],
        "n_total": resumen["total"],
    }

    html = (
        PLANTILLA.replace("__DATOS__", json.dumps(datos, ensure_ascii=False))
        .replace("__DRIVE__", DRIVE)
    )
    io.open(SALIDA, "w", encoding="utf-8", newline="\n").write(html)
    print(f"se venden y no tienen foto: {len(vivos)}")
    print(f"sin venta en 2026:          {len(dormidos)}")
    print(f"sin precio (van a Jorge):   {len(sin_precio)}")
    print(f"{os.path.getsize(SALIDA) / 1024:.0f} KB → {SALIDA}")


PLANTILLA = """<title>Fotos que faltan</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700&family=IBM+Plex+Mono:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap">
<style>
  :root {
    --navy:#002C49; --navy-600:#0A527E; --fry:#E8A33D; --fry-700:#A66512;
    --fry-100:#FCF1DE; --ruta:#2F7D5B; --humo-400:#6E8493;
    --ground:#F1F6FA; --panel:#FFFFFF; --borde:#D2E2EC; --borde-suave:#E3EDF4;
    --tinta:#002C49; --tinta-suave:#4A5F6E; --tinta-tenue:#6E8493; --fila-alt:#F7FAFC;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --ground:#04141F; --panel:#0A2233; --borde:#16394F; --borde-suave:#102C3E;
      --tinta:#E8F1F7; --tinta-suave:#A8C0D0; --tinta-tenue:#7E9AAC;
      --fry-100:#3A2A10; --fila-alt:#0D2938;
    }
  }
  :root[data-theme="dark"] {
    --ground:#04141F; --panel:#0A2233; --borde:#16394F; --borde-suave:#102C3E;
    --tinta:#E8F1F7; --tinta-suave:#A8C0D0; --tinta-tenue:#7E9AAC;
    --fry-100:#3A2A10; --fila-alt:#0D2938;
  }
  * { box-sizing:border-box; }
  body {
    margin:0; background:var(--ground); color:var(--tinta);
    font-family:"IBM Plex Sans",system-ui,sans-serif; font-size:15px; line-height:1.55;
    -webkit-font-smoothing:antialiased;
  }
  h1,h2,h3 { font-family:Archivo,system-ui,sans-serif; margin:0; text-wrap:balance; }
  .mono { font-family:"IBM Plex Mono",ui-monospace,monospace; font-variant-numeric:tabular-nums; }

  header { position:sticky; top:0; z-index:20; background:var(--panel); border-bottom:1px solid var(--borde); }
  .barra { max-width:1080px; margin:0 auto; padding:13px 20px; display:flex; align-items:center; gap:16px; flex-wrap:wrap; }
  .eyebrow { font-family:"IBM Plex Mono",monospace; font-size:10.5px; letter-spacing:.16em; text-transform:uppercase; color:var(--tinta-tenue); }
  .barra h1 { font-size:17px; font-weight:700; letter-spacing:-.01em; }
  .der { margin-left:auto; display:flex; align-items:center; gap:12px; }
  .medidor { width:120px; height:6px; background:var(--borde); }
  .medidor span { display:block; height:100%; width:0; background:var(--ruta); transition:width .25s; }
  .cuenta { font-size:13px; color:var(--tinta-suave); }
  button { font-family:Archivo,sans-serif; font-size:13.5px; font-weight:600; padding:9px 15px;
    border:1px solid var(--navy); background:var(--navy); color:#fff; cursor:pointer; }
  button.sec { background:transparent; color:var(--tinta); border-color:var(--borde); }
  button:hover { background:var(--navy-600); border-color:var(--navy-600); color:#fff; }
  button:focus-visible, input:focus-visible { outline:2px solid var(--fry); outline-offset:2px; }

  main { max-width:1080px; margin:0 auto; padding:26px 20px 100px; }
  .intro { max-width:64ch; color:var(--tinta-suave); }
  .intro p { margin:0 0 12px; }
  .intro strong { color:var(--tinta); font-weight:600; }

  .como { border:1px solid var(--fry); background:var(--fry-100); padding:16px 18px; margin:22px 0 6px; }
  .como h2 { font-size:15px; margin-bottom:8px; }
  .como ol { margin:0; padding-left:20px; color:var(--tinta-suave); }
  .como li { margin:5px 0; }
  .como code { font-family:"IBM Plex Mono",monospace; background:var(--panel); padding:1px 5px; border:1px solid var(--borde); font-size:13px; }
  .carpeta { display:inline-block; margin-top:6px; padding:8px 14px; background:var(--navy); color:#fff;
    text-decoration:none; font-family:Archivo,sans-serif; font-weight:600; font-size:13.5px; }
  .carpeta:hover { background:var(--navy-600); }
  .estado { font-size:12px; color:var(--tinta-tenue); white-space:nowrap; }
  .estado[data-modo="nube"]::before { content:"● "; color:var(--ruta); }
  .estado[data-modo="enviando"]::before { content:"● "; color:var(--humo-400); }
  .estado[data-modo="local"]::before { content:"● "; color:var(--fry-700); }

  .resumen { display:flex; gap:1px; background:var(--borde); border:1px solid var(--borde); margin:24px 0 8px; flex-wrap:wrap; }
  .dato { flex:1 1 150px; background:var(--panel); padding:14px 16px; }
  .dato .n { font-family:Archivo,sans-serif; font-size:26px; font-weight:700; letter-spacing:-.02em; }
  .dato .t { font-size:12.5px; color:var(--tinta-tenue); margin-top:1px; }
  .dato.acento .n { color:var(--fry-700); }

  h2.seccion { font-size:21px; margin:38px 0 4px; letter-spacing:-.01em; }
  .seccion-sub { color:var(--tinta-suave); max-width:62ch; margin-bottom:14px; }

  details.cat { border:1px solid var(--borde); background:var(--panel); margin-bottom:10px; }
  details.cat > summary { padding:12px 16px; cursor:pointer; display:flex; align-items:center; gap:12px; list-style:none; }
  details.cat > summary::-webkit-details-marker { display:none; }
  details.cat > summary::before { content:"▸"; color:var(--tinta-tenue); font-size:12px; }
  details.cat[open] > summary::before { content:"▾"; }
  .cat-nombre { font-family:Archivo,sans-serif; font-weight:700; font-size:15.5px; }
  .cat-n { margin-left:auto; font-family:"IBM Plex Mono",monospace; font-size:12px; color:var(--tinta-tenue); }

  table { width:100%; border-collapse:collapse; font-size:14px; }
  thead th { text-align:left; font-family:"IBM Plex Mono",monospace; font-size:10px; letter-spacing:.13em;
    text-transform:uppercase; color:var(--tinta-tenue); font-weight:500; padding:8px 10px; border-top:1px solid var(--borde); background:var(--fila-alt); }
  td { padding:9px 10px; border-top:1px solid var(--borde-suave); vertical-align:middle; }
  tr[data-hecho="si"] td { opacity:.5; }
  tr[data-hecho="no"] td { opacity:.45; text-decoration:line-through; text-decoration-color:var(--humo-400); }
  .sku { font-family:"IBM Plex Mono",monospace; font-weight:600; font-size:13px; color:var(--fry-700); white-space:nowrap; }
  .pres { color:var(--tinta-tenue); font-size:12.5px; white-space:nowrap; }
  .prio { letter-spacing:1px; font-size:11px; color:var(--fry-700); white-space:nowrap; }
  .acciones { display:flex; gap:6px; white-space:nowrap; }
  .marca { font-family:Archivo,sans-serif; font-size:11.5px; font-weight:600; padding:5px 9px;
    border:1px solid var(--borde); background:transparent; color:var(--tinta-suave); cursor:pointer; }
  .marca:hover { border-color:var(--fry); background:var(--fry-100); color:var(--tinta); }
  .marca[aria-pressed="true"] { background:var(--ruta); border-color:var(--ruta); color:#fff; }
  .marca.no[aria-pressed="true"] { background:var(--humo-400); border-color:var(--humo-400); color:#fff; }

  #panel { position:fixed; inset:auto 0 0 0; background:var(--panel); border-top:2px solid var(--navy); padding:16px 20px; display:none; }
  #panel.abierto { display:block; }
  #panel .caja { max-width:1080px; margin:0 auto; }
  textarea { width:100%; height:150px; margin-top:8px; padding:10px; font-family:"IBM Plex Mono",monospace;
    font-size:12px; background:var(--ground); color:var(--tinta); border:1px solid var(--borde); }
  @media (max-width:700px){ .pres,.prio{ display:none; } }
  @media (prefers-reduced-motion:reduce){ *{ transition:none !important; } }
</style>

<header>
  <div class="barra">
    <div>
      <div class="eyebrow">MACSA · sitio web</div>
      <h1>Fotos que faltan en el catálogo</h1>
    </div>
    <div class="der">
      <span class="cuenta"><strong id="hechas">0</strong> revisados</span>
      <span class="estado" id="estado"></span>
      <div class="medidor"><span id="medidor"></span></div>
      <button class="sec" id="limpiar">Empezar de nuevo</button>
      <button id="copiar">Ver lo marcado</button>
    </div>
  </div>
</header>

<main>
  <div class="intro">
    <p>Emiliano: el sitio saca las fichas de la lista de precios y sólo publica un producto cuando
    tiene <strong>foto</strong> y <strong>precio</strong>. Hoy cumplen las dos cosas
    <strong id="i-pub"></strong> de <strong id="i-tot"></strong>, así que <strong>el cliente no
    encuentra en la página la mayor parte de lo que vendemos</strong>. Del catálogo en PDF ya se
    sacaron las fotos que traía; éstas son las que siguen faltando.</p>
    <p>No hace falta que las consigas todas, y están puestas en el orden en que conviene atacarlas.
    <strong>Empieza por el primer bloque</strong>: son las que se están vendiendo este año.</p>
  </div>

  <div class="como">
    <h2>Cómo mandarlas</h2>
    <ol>
      <li>Una foto por producto, del producto <strong>como se ve</strong> (la bolsa o la caja, o el
      producto servido si es lo que hay en el catálogo del fabricante).</li>
      <li><strong>El archivo se llama como el código</strong>: <code>B36.jpg</code>,
      <code>HZ-MZ.jpg</code>, <code>4440.jpg</code>. Así entran solas al sitio; si vienen con otro
      nombre hay que emparejarlas a mano y ahí es donde se cuelan los errores.</li>
      <li>De 800 px o más por lado. Sirve JPG, PNG o WEBP.</li>
      <li>Súbelas a esta carpeta:<br>
        <a class="carpeta" href="__DRIVE__" target="_blank" rel="noopener noreferrer">
          Fotos del catálogo — Google Drive
        </a>
      </li>
      <li>Y ve marcando aquí lo que ya subiste. <strong>Lo que marques se guarda solo</strong> y
      Luis lo ve desde su lado: no hace falta que mandes nada más.</li>
    </ol>
  </div>

  <div class="resumen" id="resumen"></div>

  <h2 class="seccion">Primero éstas: se venden y no tienen foto</h2>
  <p class="seccion-sub">Ordenadas por peso en la venta dentro de cada categoría. Las de
    <span class="prio">●●●</span> son las que más mueven.</p>
  <div id="vivos"></div>

  <h2 class="seccion">Y estas otras, ¿todavía se manejan?</h2>
  <p class="seccion-sub">Tienen precio, pero no registran una sola venta en lo que va del año. Antes
    de buscarles foto, lo útil es saber cuáles ya no se venden: ésas se apagan y dejan de estorbar
    en la lista de precios y en el cotizador.</p>
  <div id="dormidos"></div>

  <h2 class="seccion">Éstas no las busques todavía</h2>
  <p class="seccion-sub">No tienen precio en ninguna lista, así que aunque tuvieran foto el vendedor
    no las podría cotizar y el sitio no las publica. Van aquí para que <strong>Jorge</strong> decida
    si les pone precio o se apagan. En cuanto tengan precio, pasan a la lista de arriba.</p>
  <div id="sinprecio"></div>
</main>

<div id="panel">
  <div class="caja">
    <strong>Lo marcado</strong>
    <textarea id="salida" readonly></textarea>
    <div style="margin-top:8px; display:flex; gap:8px;">
      <button id="alportapapeles">Copiar al portapapeles</button>
      <button class="sec" id="cerrar">Cerrar</button>
    </div>
  </div>
</div>

<script id="datos" type="application/json">__DATOS__</script>
<script>
  const D = JSON.parse(document.getElementById('datos').textContent)
  const CLAVE = 'macsa-fotos-faltantes-v1'
  let estado = {}
  try { estado = JSON.parse(localStorage.getItem(CLAVE) || '{}') } catch (e) { estado = {} }

  /**
   * El avance se guarda en el servidor, no en el navegador.
   *
   * La hoja la llena Emiliano desde su computadora y la revisa Luis desde la
   * suya: si el estado viviera en localStorage, cada uno vería el suyo y se
   * perdería al cambiar de equipo. localStorage se conserva sólo como red de
   * seguridad para que un corte de internet no borre lo ya marcado en pantalla.
   */
  let ultimoEnvio = null

  function pintarEstado(modo) {
    const e = document.getElementById('estado')
    if (!e) return
    e.dataset.modo = modo
    e.textContent =
      modo === 'nube' ? 'Guardado' : modo === 'enviando' ? 'Guardando…' : 'Sin conexión'
  }

  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(estado)) } catch (e) {}
    clearTimeout(ultimoEnvio)
    pintarEstado('enviando')
    // Los clics seguidos se agrupan en un solo envío.
    ultimoEnvio = setTimeout(() => {
      fetch('estado', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ marcas: estado }),
      })
        .then((r) => (r.ok ? pintarEstado('nube') : pintarEstado('local')))
        .catch(() => pintarEstado('local'))
    }, 500)
  }

  // Lo que ya esté guardado manda sobre lo que traiga este navegador.
  fetch('estado')
    .then((r) => r.json())
    .then((d) => {
      if (d && d.marcas && Object.keys(d.marcas).length) {
        estado = d.marcas
        document.querySelectorAll('tr[data-sku]').forEach(refrescar)
        avance()
      }
      pintarEstado('nube')
    })
    .catch(() => pintarEstado('local'))

  document.getElementById('resumen').innerHTML = `
    <div class="dato"><div class="n">${D.n_total}</div><div class="t">productos en la lista</div></div>
    <div class="dato"><div class="n">${D.n_publicados}</div><div class="t">se publican hoy</div></div>
    <div class="dato acento"><div class="n">${D.n_vivos}</div><div class="t">faltan y SÍ se venden</div></div>
    <div class="dato"><div class="n">${D.n_dormidos}</div><div class="t">faltan y no se han vendido este año</div></div>
    <div class="dato"><div class="n">${D.n_sin_precio}</div><div class="t">sin precio — las ve Jorge</div></div>`
  document.getElementById('i-pub').textContent = D.n_publicados
  document.getElementById('i-tot').textContent = D.n_total

  const fila = (f, conPrio) => `
    <tr data-sku="${f.sku}">
      <td class="sku">${f.sku}</td>
      <td>${f.nombre}</td>
      <td class="pres">${f.pres || (f.lb ? f.lb + ' lb' : '')}</td>
      ${conPrio ? `<td class="prio">${'●'.repeat(f.prio)}</td>` : `<td class="pres">${f.ultima ? 'últ. ' + f.ultima : '—'}</td>`}
      <td>
        <div class="acciones">
          <button class="marca si" data-v="TENGO" aria-pressed="false">Ya la tengo</button>
          <button class="marca no" data-v="NO_SE_MANEJA" aria-pressed="false">Ya no se maneja</button>
        </div>
      </td>
    </tr>`

  function pintar(destino, grupos, conPrio) {
    document.getElementById(destino).innerHTML = grupos.map(([cat, filas], i) => `
      <details class="cat"${i === 0 && conPrio ? ' open' : ''}>
        <summary>
          <span class="cat-nombre">${cat}</span>
          <span class="cat-n">${filas.length} ${filas.length === 1 ? 'producto' : 'productos'}</span>
        </summary>
        <table>
          <thead><tr>
            <th>Código</th><th>Producto</th><th>Presentación</th>
            <th>${conPrio ? 'Peso' : 'Última venta'}</th><th></th>
          </tr></thead>
          <tbody>${filas.map((f) => fila(f, conPrio)).join('')}</tbody>
        </table>
      </details>`).join('')
  }

  pintar('vivos', D.vivos, true)
  pintar('dormidos', D.dormidos, false)
  pintar('sinprecio', D.sin_precio, false)

  function refrescar(tr) {
    const v = estado[tr.dataset.sku]
    tr.dataset.hecho = v === 'TENGO' ? 'si' : v === 'NO_SE_MANEJA' ? 'no' : ''
    tr.querySelectorAll('.marca').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === v)))
  }

  function avance() {
    const n = Object.values(estado).filter(Boolean).length
    const total = D.n_vivos + D.n_dormidos + D.n_sin_precio
    document.getElementById('hechas').textContent = n
    document.getElementById('medidor').style.width = (n / total * 100) + '%'
  }

  document.querySelectorAll('tr[data-sku]').forEach(refrescar)
  avance()

  document.addEventListener('click', (e) => {
    const b = e.target.closest('.marca')
    if (!b) return
    const tr = b.closest('tr')
    const sku = tr.dataset.sku
    estado[sku] = estado[sku] === b.dataset.v ? null : b.dataset.v
    refrescar(tr)
    avance()
    guardar()
  })

  document.getElementById('copiar').addEventListener('click', () => {
    const todas = [...D.vivos, ...D.dormidos, ...D.sin_precio].flatMap(([cat, fs]) => fs.map((f) => ({ ...f, cat })))
    const lineas = todas.filter((f) => estado[f.sku])
      .map((f) => `${estado[f.sku]}\\t${f.sku}\\t${f.nombre}\\t${f.cat}`)
    document.getElementById('salida').value = lineas.length
      ? 'ESTADO\\tCODIGO\\tPRODUCTO\\tCATEGORIA\\n' + lineas.join('\\n')
      : 'Todavía no hay nada marcado.'
    document.getElementById('panel').classList.add('abierto')
  })
  document.getElementById('alportapapeles').addEventListener('click', async () => {
    const t = document.getElementById('salida'); t.select()
    try { await navigator.clipboard.writeText(t.value) } catch (e) { document.execCommand('copy') }
    const b = document.getElementById('alportapapeles')
    b.textContent = 'Copiado'; setTimeout(() => (b.textContent = 'Copiar al portapapeles'), 1600)
  })
  document.getElementById('cerrar').addEventListener('click', () =>
    document.getElementById('panel').classList.remove('abierto'))
  document.getElementById('limpiar').addEventListener('click', () => {
    estado = {}
    try { localStorage.removeItem(CLAVE) } catch (e) {}
    document.querySelectorAll('tr[data-sku]').forEach(refrescar)
    avance()
    guardar()
  })
</script>
"""


if __name__ == "__main__":
    main()
