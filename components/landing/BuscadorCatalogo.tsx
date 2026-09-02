'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { ProductoCatalogo } from '@/lib/catalogo'

/**
 * Búsqueda rápida del catálogo.
 *
 * La pidió Edgar el 31-ago-2026 con un ejemplo muy concreto: escribir "dedos
 * de queso" y que salga de inmediato lo que hay, sin recorrer catorce
 * secciones. Por eso busca por nombre, por código Y por marca — el cliente
 * dice "los Sargento" o "el muncher", casi nunca "P38".
 *
 * Corre en el navegador sobre el snapshot ya compilado: el sitio es estático,
 * así que no hay servidor al que preguntarle y no debe haberlo.
 */

/** Quita acentos y baja a minúsculas: "jalapeño" encuentra "JALAPENO". */
const normalizar = (t: string) =>
  t
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')

/** Sinónimos: cómo lo dice el cliente → cómo está escrito en el catálogo. */
const SINONIMOS: Record<string, string[]> = {
  // Edgar, junta del 2-sep-2026: "dedos de queso (Sargento)" y "jalapeños
  // poppers (Ruby)" no salían. Los dedos son los de mozzarella (DQS), no los
  // munchers de cheddar; y "popper" es como Edgar mismo llama al P39.
  'dedos de queso': ['dedo de queso', 'mozzarella', 'sargento'],
  'dedo de queso': ['dedo de queso', 'mozzarella', 'sargento'],
  sargento: ['sargento', 'dedo de queso'],
  poppers: ['popper', 'jalapeno'],
  popper: ['popper', 'jalapeno'],
  'jalapenos poppers': ['popper', 'jalapeno'],
  'jalapeno poppers': ['popper', 'jalapeno'],
  jalapeno: ['muncher', 'jalapeno', 'popper'],
  papas: ['papa'],
  frances: ['papa recta'],
  gajo: ['gajo', 'wedge'],
  cascara: ['cascara', 'skin'],
  pure: ['pure'],
  pan: ['roll', 'bun', 'potato roll'],
  aro: ['aro', 'onion ring'],
  elote: ['elote'],
  aderezo: ['aderezo', 'ranch', 'mayonesa', 'bbq'],
}

export default function BuscadorCatalogo({ productos }: { productos: ProductoCatalogo[] }) {
  const [q, setQ] = useState('')

  const indice = useMemo(
    () =>
      productos.map((p) => ({
        p,
        texto: normalizar([p.sku, p.nombre, p.marca ?? '', p.presentacion ?? ''].join(' ')),
      })),
    [productos],
  )

  const resultados = useMemo(() => {
    const consulta = normalizar(q.trim())
    if (consulta.length < 2) return []

    // Cada palabra tecleada tiene que aparecer en algún lado de la ficha, y
    // los sinónimos amplían la consulta en vez de reemplazarla.
    const terminos = consulta.split(/\s+/)
    const extra = SINONIMOS[consulta] ?? []

    // "dedos" tiene que encontrar "dedo" y "aros" a "aro": si la palabra
    // termina en s, también se prueba sin ella.
    const contiene = (texto: string, t: string) =>
      texto.includes(t) || (t.length > 3 && t.endsWith('s') && texto.includes(t.slice(0, -1)))
    const coincide = indice.filter(
      ({ texto }) =>
        terminos.every((t) => contiene(texto, t)) || extra.some((t) => texto.includes(normalizar(t))),
    )
    return coincide.slice(0, 24).map(({ p }) => p)
  }, [q, indice])

  const buscando = q.trim().length >= 2

  return (
    <div className="border border-hielo-300 bg-white p-6 sm:p-8">
      <label
        htmlFor="buscador-catalogo"
        className="font-mono text-[10px] uppercase tracking-[0.16em] text-humo-400"
      >
        Búsqueda rápida
      </label>
      <input
        id="buscador-catalogo"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Escribe un producto, una marca o un código: dedos de queso, Lamb Weston, 32R…"
        autoComplete="off"
        className="mt-2 w-full border border-hielo-300 bg-hielo-50 px-4 py-3 text-[15px] text-navy outline-none placeholder:text-humo-400 focus:border-fry focus:bg-white"
      />

      {buscando && (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-humo-400">
          {resultados.length === 0
            ? 'Sin resultados en los códigos con ficha'
            : `${resultados.length} ${resultados.length === 1 ? 'resultado' : 'resultados'}`}
        </p>
      )}

      {buscando && resultados.length > 0 && (
        <ul className="mt-4 grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-3">
          {resultados.map((p) => (
            <li key={p.sku}>
              <Link
                href={`/tienda/${p.sku.toLowerCase()}/`}
                className="flex h-full items-center gap-3 bg-white p-3 transition-colors hover:bg-hielo-50"
              >
                <img
                  src={p.imagen}
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-14 flex-none object-contain mix-blend-multiply"
                />
                <span className="min-w-0">
                  <span className="block font-mono text-[10.5px] font-semibold uppercase tracking-wider text-fry-700">
                    {p.sku}
                  </span>
                  <span className="block truncate font-display text-[14px] font-bold text-navy">
                    {p.nombre}
                  </span>
                  <span className="block truncate text-[12.5px] text-humo">
                    {[p.marca, p.presentacion].filter(Boolean).join(' · ')}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {buscando && resultados.length === 0 && (
        <p className="mt-3 max-w-prosa text-[14px] leading-relaxed text-humo">
          El catálogo completo es más amplio que los códigos con ficha fotográfica. Si buscas algo
          que no aparece, escríbenos y te confirmamos si lo manejamos, con su presentación y la
          disponibilidad del día.
        </p>
      )}
    </div>
  )
}
