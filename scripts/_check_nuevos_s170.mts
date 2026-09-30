// S170: familia y marca de lo que entra al sitio (arnés sobre el catálogo REAL).
import { CATALOGO } from '../lib/catalogo'
const nuevos = 'HZBBQP BCH13 HZROY MHH MHE UB001 BWS SS SSCH TR12 T01427 CHRO B36-3007 DQS24 X0036 1950 B4927 4106 DQSH MZ200 MZ500 MZ4B TP200 BCH MANGOH414 SCAJUN SPY SAPHOT BLCHG CESAR AS64 GP64 BBQ64 SCH64 PCH 36900 36502 36800 36700 DS06 AX046 SC100'.split(' ')
const por = new Map(CATALOGO.map((p) => [p.sku, p]))
for (const s of nuevos) {
  const p = por.get(s)
  console.log(s.padEnd(10), p ? `${p.familia.padEnd(22)} ${String(p.marca).padEnd(16)} ${p.nombre}` : '(no publicado)')
}
console.log('total publicados:', CATALOGO.length, '· en "otros":', CATALOGO.filter((p) => p.familia === 'otros').map((p) => p.sku).join(' ') || 'ninguno')
