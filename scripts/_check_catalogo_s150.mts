// Corre el catálogo REAL (lib/catalogo.ts + data/catalogo.json) y enseña familia y marca
// de los SKUs que estrenan foto el 12-sep-2026. Se ejecuta con: npx tsx scripts/_check_catalogo_s150.mts
import { CATALOGO, porFamilia } from '../lib/catalogo'
const nuevos = 'GCH20 KF AMG SGP C1000 C1008 C16 C192 CP6 HBBQ M200 M24 M4B MAY13 MZ16 SPPA SHBLP SHBO 12143 G2300 H21 HVT KF101 S1901 X7211B X9181 POL-FE POL-FN POL-HP RD-MLB SC-BITEF SC-CHU12 SC-FRITO12 SC-PANELOT SC-PANZANA 7617 PPM SPP6 SPP HAM200 HAR150 PRM150 SRL150 RB4011 STAB DQS PAYM'.split(' ')
let fallas = 0
for (const s of nuevos) {
  const p = CATALOGO.find((x) => x.sku === s)
  if (!p) { console.log('  (oculto o ausente)', s); continue }
  if (p.familia === 'otros') fallas++
  console.log(`  ${s.padEnd(10)} ${p.familia.padEnd(22)} ${String(p.marca).padEnd(14)} ${p.presentacion ?? '-'} | ${p.nombre}`)
}
console.log('total publicados:', CATALOGO.length, '| en familia "otros":', CATALOGO.filter((p) => p.familia === 'otros').map((p) => p.sku))
const fam: Record<string, number> = {}
for (const p of CATALOGO) fam[p.familia] = (fam[p.familia] ?? 0) + 1
console.log(fam)
console.log('toppings-para-pizza:', porFamilia('toppings-para-pizza').map((p) => p.sku))
if (fallas) process.exit(1)
