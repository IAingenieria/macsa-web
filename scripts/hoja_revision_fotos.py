#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Arma la hoja donde Edgar decide a qué producto pertenece cada foto que el
emparejamiento automático no pudo resolver sin adivinar.

Se genera como una página autónoma: las fotos van incrustadas en el HTML, así
que funciona sin conexión y sin depender de que el bucket siga en pie el día
que la abra.
"""

import io
import json
import os

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATOS = os.path.join(RAIZ, "_fotos_catalogo", "_revision.json")
SALIDA = os.path.join(RAIZ, "_fotos_catalogo", "revision-fotos-catalogo.html")

PLANTILLA = """<title>Fotos por confirmar</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700&family=IBM+Plex+Mono:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap">
<style>
  /* Paleta del sistema MACSA: el navy es el color medido del logotipo y el
     ámbar es el acento del sitio. La hoja se ve como el sitio a propósito —
     Edgar la reconoce como la misma pieza de trabajo. */
  :root {
    --navy: #002C49;
    --navy-600: #0A527E;
    --fry: #E8A33D;
    --fry-700: #A66512;
    --fry-100: #FCF1DE;
    --ruta: #2F7D5B;
    --humo: #4A5F6E;
    --humo-400: #6E8493;
    --hielo-50: #F1F6FA;
    --hielo-200: #D2E2EC;
    --hielo-300: #B4CCDD;

    --ground: #F1F6FA;
    --panel: #FFFFFF;
    --borde: #D2E2EC;
    --tinta: #002C49;
    --tinta-suave: #4A5F6E;
    --tinta-tenue: #6E8493;
    --marco-foto: #FFFFFF;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --ground: #04141F;
      --panel: #0A2233;
      --borde: #16394F;
      --tinta: #E8F1F7;
      --tinta-suave: #A8C0D0;
      --tinta-tenue: #7E9AAC;
      --hielo-50: #0E2B3D;
      --fry-100: #3A2A10;
      --marco-foto: #E9F1F6;
    }
  }
  :root[data-theme="dark"] {
    --ground: #04141F;
    --panel: #0A2233;
    --borde: #16394F;
    --tinta: #E8F1F7;
    --tinta-suave: #A8C0D0;
    --tinta-tenue: #7E9AAC;
    --hielo-50: #0E2B3D;
    --fry-100: #3A2A10;
    --marco-foto: #E9F1F6;
  }

  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--ground);
    color: var(--tinta);
    font-family: "IBM Plex Sans", system-ui, sans-serif;
    font-size: 15px;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3 { font-family: Archivo, system-ui, sans-serif; text-wrap: balance; margin: 0; }
  .mono { font-family: "IBM Plex Mono", ui-monospace, monospace; font-variant-numeric: tabular-nums; }

  /* ── Barra de avance, fija: siempre se ve cuánto falta ─────────────── */
  header {
    position: sticky; top: 0; z-index: 10;
    background: var(--panel);
    border-bottom: 1px solid var(--borde);
  }
  .barra {
    max-width: 1040px; margin: 0 auto; padding: 14px 20px;
    display: flex; align-items: center; gap: 18px; flex-wrap: wrap;
  }
  .marca {
    font-family: "IBM Plex Mono", monospace;
    font-size: 10.5px; letter-spacing: .16em; text-transform: uppercase;
    color: var(--tinta-tenue);
  }
  .barra h1 { font-size: 17px; font-weight: 700; letter-spacing: -.01em; }
  .avance { margin-left: auto; display: flex; align-items: center; gap: 12px; }
  .medidor { width: 132px; height: 6px; background: var(--borde); overflow: hidden; }
  .medidor span { display: block; height: 100%; width: 0; background: var(--ruta); transition: width .25s ease; }
  .cuenta { font-size: 13px; color: var(--tinta-suave); }
  button {
    font-family: Archivo, system-ui, sans-serif;
    font-size: 13.5px; font-weight: 600;
    padding: 9px 16px; border: 1px solid var(--navy); border-radius: 0;
    background: var(--navy); color: #fff; cursor: pointer;
  }
  button.secundario { background: transparent; color: var(--tinta); border-color: var(--borde); }
  button:hover { background: var(--navy-600); border-color: var(--navy-600); color: #fff; }
  button:focus-visible, input:focus-visible { outline: 2px solid var(--fry); outline-offset: 2px; }

  main { max-width: 1040px; margin: 0 auto; padding: 26px 20px 90px; }
  .intro { max-width: 62ch; color: var(--tinta-suave); font-size: 15px; }
  .intro strong { color: var(--tinta); font-weight: 600; }
  .intro p { margin: 0 0 12px; }

  .lista { display: flex; flex-direction: column; gap: 14px; margin-top: 26px; }

  /* ── Una ficha por foto ────────────────────────────────────────────── */
  .ficha {
    display: grid; grid-template-columns: 168px 1fr; gap: 20px;
    background: var(--panel);
    border: 1px solid var(--borde);
    border-left: 4px solid var(--hielo-300);
    padding: 16px 18px;
    align-items: start;
  }
  .ficha[data-listo="si"] { border-left-color: var(--ruta); }
  .ficha[data-listo="no-existe"] { border-left-color: var(--humo-400); opacity: .62; }
  .foto {
    background: var(--marco-foto);
    border: 1px solid var(--borde);
    aspect-ratio: 1 / 1;
    display: flex; align-items: center; justify-content: center; padding: 8px;
  }
  .foto img { max-width: 100%; max-height: 100%; object-fit: contain; }
  .pie { margin-top: 8px; font-size: 11px; color: var(--tinta-tenue); text-align: center; }

  .titulo { font-size: 17px; font-weight: 700; letter-spacing: -.01em; }
  .sub { font-size: 13px; color: var(--tinta-tenue); margin-top: 2px; }
  .etiqueta {
    font-family: "IBM Plex Mono", monospace;
    font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
    color: var(--tinta-tenue); margin: 14px 0 7px;
  }

  .opciones { display: flex; flex-direction: column; gap: 6px; }
  .opcion {
    display: flex; align-items: baseline; gap: 10px;
    padding: 8px 11px; border: 1px solid var(--borde);
    background: transparent; cursor: pointer;
  }
  .opcion:hover { border-color: var(--fry); background: var(--fry-100); }
  .opcion input { margin: 0; accent-color: var(--fry-700); }
  .opcion[data-sel="si"] { border-color: var(--ruta); background: color-mix(in srgb, var(--ruta) 9%, transparent); }
  .sku { font-family: "IBM Plex Mono", monospace; font-size: 12.5px; font-weight: 600; color: var(--fry-700); }
  .desc { font-size: 13.5px; color: var(--tinta-suave); }
  .pct { margin-left: auto; font-family: "IBM Plex Mono", monospace; font-size: 11px; color: var(--tinta-tenue); }
  .otro { display: flex; gap: 8px; align-items: center; margin-top: 8px; }
  .otro input[type="text"] {
    flex: 1; padding: 8px 10px; font-family: "IBM Plex Mono", monospace; font-size: 12.5px;
    background: var(--ground); color: var(--tinta); border: 1px solid var(--borde);
  }

  #resultado {
    position: fixed; inset: auto 0 0 0; background: var(--panel);
    border-top: 2px solid var(--navy); padding: 16px 20px; display: none;
  }
  #resultado.abierto { display: block; }
  #resultado .caja { max-width: 1040px; margin: 0 auto; }
  textarea {
    width: 100%; height: 130px; margin-top: 8px; padding: 10px;
    font-family: "IBM Plex Mono", monospace; font-size: 12px;
    background: var(--ground); color: var(--tinta); border: 1px solid var(--borde);
  }
  @media (max-width: 720px) {
    .ficha { grid-template-columns: 1fr; }
    .foto { max-width: 200px; }
  }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
</style>

<header>
  <div class="barra">
    <div>
      <div class="marca">MACSA · catálogo del sitio</div>
      <h1>Fotos que faltan por confirmar</h1>
    </div>
    <div class="avance">
      <span class="cuenta"><strong id="hechas">0</strong> de __TOTAL__</span>
      <div class="medidor"><span id="medidor"></span></div>
      <button class="secundario" id="btn-limpiar">Empezar de nuevo</button>
      <button id="btn-copiar">Copiar decisiones</button>
    </div>
  </div>
</header>

<main>
  <div class="intro">
    <p>El sitio saca las fotos del catálogo de la base de datos, y hoy la mayoría de los productos
    no tiene ninguna. Estas <strong>__TOTAL__ fotos</strong> salieron del catálogo en PDF, pero el
    pie de foto no traía el código, así que <strong>no se pueden asignar sin adivinar</strong> — y
    una foto en el producto equivocado es peor que ninguna foto, porque el cliente pide lo que ve.</p>
    <p>Marca cuál es el producto de cada una. Si ninguno es, escribe el código a mano; y si es algo
    que ya no se maneja, márcalo así y se queda fuera del sitio. Al terminar, dale a
    <strong>Copiar decisiones</strong> y pásaselas a Luis.</p>
    <p class="sub">Tu avance se guarda solo en este navegador: puedes cerrar y seguir después.
    Quedan __SINFOTO__ productos activos sin foto en total.</p>
  </div>

  <div class="lista" id="lista"></div>
</main>

<div id="resultado">
  <div class="caja">
    <strong>Decisiones — mándaselas a Luis</strong>
    <textarea id="salida" readonly></textarea>
    <div style="margin-top:8px; display:flex; gap:8px;">
      <button id="btn-portapapeles">Copiar al portapapeles</button>
      <button class="secundario" id="btn-cerrar">Cerrar</button>
    </div>
  </div>
</div>

<script id="datos" type="application/json">__DATOS__</script>
<script>
  const DATOS = JSON.parse(document.getElementById('datos').textContent)
  const CLAVE = 'macsa-fotos-catalogo-v1'
  const lista = document.getElementById('lista')

  let elegido = {}
  try { elegido = JSON.parse(localStorage.getItem(CLAVE) || '{}') } catch (e) { elegido = {} }

  const guardar = () => {
    try { localStorage.setItem(CLAVE, JSON.stringify(elegido)) } catch (e) {}
    pintarAvance()
  }

  function pintarAvance() {
    const n = Object.values(elegido).filter(Boolean).length
    document.getElementById('hechas').textContent = n
    document.getElementById('medidor').style.width = (n / DATOS.fotos.length * 100) + '%'
  }

  DATOS.fotos.forEach((f) => {
    const ficha = document.createElement('article')
    ficha.className = 'ficha'
    ficha.dataset.archivo = f.archivo

    const opciones = f.cand.map((c) => `
      <label class="opcion">
        <input type="radio" name="r-${f.archivo}" value="${c.sku}">
        <span class="sku">${c.sku}</span>
        <span class="desc">${c.desc}</span>
        <span class="pct">${c.pct}%</span>
      </label>`).join('')

    ficha.innerHTML = `
      <div>
        <div class="foto"><img src="${f.img}" alt="${f.nombre}"></div>
        <div class="pie mono">página ${f.pagina}</div>
      </div>
      <div>
        <div class="titulo">${f.nombre}</div>
        <div class="sub">Como viene en el catálogo${f.presentacion ? ' · ' + f.presentacion : ''}</div>
        <div class="etiqueta">¿Cuál de estos es?</div>
        <div class="opciones">
          ${opciones}
          <label class="opcion">
            <input type="radio" name="r-${f.archivo}" value="__NO_EXISTE__">
            <span class="desc">Ya no lo manejamos — que no salga en el sitio</span>
          </label>
        </div>
        <div class="otro">
          <span class="etiqueta" style="margin:0">o el código:</span>
          <input type="text" placeholder="por ejemplo B36" data-archivo="${f.archivo}">
        </div>
      </div>`
    lista.appendChild(ficha)
  })

  // Restaurar lo ya decidido
  lista.querySelectorAll('.ficha').forEach((ficha) => {
    const previo = elegido[ficha.dataset.archivo]
    if (!previo) return
    const radio = ficha.querySelector(`input[value="${CSS.escape(previo)}"]`)
    if (radio) { radio.checked = true } else { ficha.querySelector('input[type=text]').value = previo }
    marcar(ficha, previo)
  })

  function marcar(ficha, valor) {
    ficha.dataset.listo = valor === '__NO_EXISTE__' ? 'no-existe' : valor ? 'si' : ''
    ficha.querySelectorAll('.opcion').forEach((o) => {
      const r = o.querySelector('input[type=radio]')
      o.dataset.sel = r && r.checked ? 'si' : ''
    })
  }

  lista.addEventListener('change', (e) => {
    const ficha = e.target.closest('.ficha')
    if (!ficha) return
    const archivo = ficha.dataset.archivo
    if (e.target.type === 'radio') {
      elegido[archivo] = e.target.value
      ficha.querySelector('input[type=text]').value = ''
    } else {
      const v = e.target.value.trim().toUpperCase()
      elegido[archivo] = v || null
      ficha.querySelectorAll('input[type=radio]').forEach((r) => (r.checked = false))
    }
    marcar(ficha, elegido[archivo])
    guardar()
  })
  lista.addEventListener('input', (e) => {
    if (e.target.type === 'text') e.target.dispatchEvent(new Event('change', { bubbles: true }))
  })

  document.getElementById('btn-copiar').addEventListener('click', () => {
    const lineas = DATOS.fotos
      .filter((f) => elegido[f.archivo])
      .map((f) => `${elegido[f.archivo]}\\t${f.archivo}\\t${f.nombre}`)
    const texto = lineas.length
      ? 'CODIGO\\tARCHIVO\\tCOMO VIENE EN EL CATALOGO\\n' + lineas.join('\\n')
      : 'Todavía no hay ninguna decisión marcada.'
    document.getElementById('salida').value = texto
    document.getElementById('resultado').classList.add('abierto')
  })
  document.getElementById('btn-portapapeles').addEventListener('click', async () => {
    const t = document.getElementById('salida')
    t.select()
    try { await navigator.clipboard.writeText(t.value) } catch (e) { document.execCommand('copy') }
    const b = document.getElementById('btn-portapapeles')
    b.textContent = 'Copiado'
    setTimeout(() => (b.textContent = 'Copiar al portapapeles'), 1600)
  })
  document.getElementById('btn-cerrar').addEventListener('click', () =>
    document.getElementById('resultado').classList.remove('abierto'))
  document.getElementById('btn-limpiar').addEventListener('click', () => {
    elegido = {}
    try { localStorage.removeItem(CLAVE) } catch (e) {}
    lista.querySelectorAll('.ficha').forEach((f) => {
      f.querySelectorAll('input').forEach((i) => { i.checked = false; if (i.type === 'text') i.value = '' })
      marcar(f, null)
    })
    guardar()
  })

  pintarAvance()
</script>
"""


def main():
    datos = json.load(io.open(DATOS, encoding="utf-8"))
    html = (
        PLANTILLA.replace("__TOTAL__", str(len(datos["fotos"])))
        .replace("__SINFOTO__", str(datos["total_sin_foto"]))
        .replace("__DATOS__", json.dumps(datos, ensure_ascii=False))
    )
    io.open(SALIDA, "w", encoding="utf-8", newline="\n").write(html)
    print(f"{len(datos['fotos'])} fotos en la hoja")
    print(f"{os.path.getsize(SALIDA) / 1024 / 1024:.1f} MB → {SALIDA}")


if __name__ == "__main__":
    main()
