// S170: familia y marca de lo que entra al sitio el 29-sep (arnés sobre el catálogo REAL).
import { CATALOGO } from '../lib/catalogo'
const nuevos = '4011 4707 5330 6670 6671 6673 BBQC BE BN F6032 J72 M120 M500 MA120 P12 P39 SALS3000 SBA4 SCHI SRIRACHA STM144 KR60 M60 MZ60 A1 JP500'.split(' ')
const por = new Map(CATALOGO.map((p) => [p.sku, p]))
for (const s of nuevos) {
  const p = por.get(s)
  console.log(s.padEnd(9), p ? `${p.familia.padEnd(22)} ${String(p.marca).padEnd(14)} ${p.presentacion ?? '—'}` : '(no publicado: oculto u otro filtro)')
}
console.log('total publicados:', CATALOGO.length, '· en "otros":', CATALOGO.filter((p) => p.familia === 'otros').map((p) => p.sku).join(' ') || 'ninguno')
