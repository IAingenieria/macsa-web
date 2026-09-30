// S170: vuelca el catálogo del sitio (nombre limpio, familia, marca, foto) para el prototipo del portal.
import { CATALOGO } from '../lib/catalogo'
import { FAMILIAS } from '../lib/familias'
import fs from 'node:fs'
const fam = Object.fromEntries(FAMILIAS.map((f) => [f.slug, f.nombre]))
fs.writeFileSync(process.argv[2], JSON.stringify(CATALOGO.map((p) => ({ ...p, familiaNombre: fam[p.familia] ?? p.familia }))))
console.log(CATALOGO.length, 'productos')
