# -*- coding: utf-8 -*-
"""[S182 · 13-oct-2026] Títulos con las palabras del comprador («por mayoreo», «distribuidor») en las páginas que ya
existen, SIN cambiar ninguna dirección (lo indexado se conserva), + 7 páginas de búsqueda (lib/intenciones.ts) + ligas
en el pie. Cada reemplazo se cuenta (assert == 1). Uso: python scripts/s182_titulos_coloquiales.py ; luego
node scripts/generar_geo.mjs para regenerar las 549 páginas por ciudad con la plantilla nueva."""
import os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def editar(rel, pares):
    p = os.path.join(R, rel)
    s = open(p, encoding='utf-8', newline='').read()
    for a, b in pares:
        c = s.count(a)
        assert c == 1, (rel, c, a[:70])
        s = s.replace(a, b)
    open(p, 'w', encoding='utf-8', newline='').write(s)
    print('ok', rel, len(pares))


def h1(viejo, nuevo):
    return (f"h1: '{viejo}'", f"h1: '{nuevo}'") if "'" not in viejo else (f'h1: "{viejo}"', f'h1: "{nuevo}"')


editar('lib/anclas.ts', [
    h1('Media pechuga de pollo sin piel congelada', 'Media pechuga de pollo congelada por mayoreo'),
    h1('Papa crisscut sazonada congelada', 'Papa crisscut sazonada congelada por mayoreo'),
    h1('Muncher de jalapeño con queso cheddar', 'Munchers de jalapeño con queso por mayoreo'),
    h1('Papa a la francesa con cobertura crujiente', 'Papa a la francesa con cobertura por mayoreo'),
    h1('Papa a la francesa corte 3/8', 'Papa a la francesa 3/8 congelada por mayoreo'),
    h1('Papa a la francesa corte 5/16 delgada', 'Papa a la francesa delgada 5/16 por mayoreo'),
    h1('Queso cheddar en bolsa para food service', 'Queso cheddar por mayoreo para restaurante'),
    h1('Puré de papa congelado para restaurante', 'Puré de papa congelado por mayoreo'),
    h1('Papa gajo sazonada de 8 cortes', 'Papa gajo sazonada congelada por mayoreo'),
    h1('Aceite para freidora de restaurante en bidón', 'Aceite para freidora por mayoreo, en bidón'),
    h1('Boneless de pollo congelado natural y enchilado', 'Boneless de pollo por mayoreo, natural y enchilado'),
    h1('Elote congelado entero, en mitades y desgranado', 'Elote congelado por mayoreo: entero, mitades y desgranado'),
    h1('Papa a la francesa corte 1/4 gruesa', 'Papa a la francesa 1/4 congelada por mayoreo'),
    h1("Pan para hamburguesa Martin's Potato Rolls", "Pan para hamburguesa Martin's por mayoreo"),
    h1('Mayonesa para restaurante en galón y cubeta', 'Mayonesa por galón y cubeta, por mayoreo'),
    h1('Aros de cebolla congelados para freidora', 'Aros de cebolla congelados por mayoreo'),
    h1('Dedos de queso y mozzarella sticks congelados', 'Dedos de queso congelados por mayoreo'),
    h1('Catsup Heinz en sobre, pouch y botella', 'Catsup Heinz por mayoreo: sobre, pouch y botella'),
    h1('Salsa para alitas por galón', 'Salsa para alitas por galón, por mayoreo'),
    h1('Hash brown y papa para desayuno congelada', 'Hash brown congelado por mayoreo'),
])

editar('lib/familias.ts', [
    h1('Papa a la francesa congelada Lamb Weston', 'Distribuidor de papas a la francesa congeladas'),
    h1('Pollo congelado para restaurante', 'Distribuidor de pollo congelado para restaurantes'),
    h1('Salsas para alitas por galón', 'Salsas para alitas por mayoreo'),
    h1('Aros de cebolla congelados', 'Distribuidor de aros de cebolla congelados'),
    h1('Aderezos para restaurante', 'Aderezos para restaurante por mayoreo'),
    h1('Sazonadores para alitas y botana', 'Sazonadores para alitas por mayoreo'),
    h1('Condimentos Heinz para food service', 'Distribuidor de condimentos Heinz para restaurantes'),
    h1('Aceite para freidora de restaurante', 'Aceite para freír por mayoreo para restaurantes'),
    h1('Carne y carne para hamburguesa congelada', 'Carne para hamburguesa congelada por mayoreo'),
    h1('Appetizers y quesos congelados', 'Botanas y appetizers congelados por mayoreo'),
    h1('Verduras congeladas y elote', 'Verduras congeladas por mayoreo'),
    h1("Pan para hamburguesa Martin's", "Distribuidor de pan Martin's para hamburguesa"),
    h1('Toppings y productos para pizza', 'Toppings para pizza por mayoreo'),
    h1('Postres y churros congelados', 'Postres y churros congelados por mayoreo'),
])

editar('app/papa-a-la-francesa/page.tsx', [("title: 'Papa a la francesa congelada Lamb Weston en Monterrey',",
                                             "title: 'Distribuidor de papas a la francesa congeladas en Monterrey',")])
editar('app/pollo/page.tsx', [("title: 'Pollo congelado para restaurante en Monterrey',",
                               "title: 'Distribuidor de pollo congelado en Monterrey: pechuga, alitas y boneless',")])
editar('app/salsas-para-alitas/page.tsx', [("title: 'Salsas para alitas por galón en Monterrey',",
                                            "title: 'Salsas para alitas por mayoreo en Monterrey',")])
editar('app/catalogo/page.tsx', [("title: 'Catálogo de alimentos congelados para restaurante',",
                                  "title: 'Catálogo de alimentos congelados por mayoreo para restaurante',")])

# Plantillas de las páginas por ciudad (se regeneran con generar_geo.mjs)
geo_viejo_t = "  title: '${nombre} en ${c.nombre} — entrega para restaurantes',\n  description:\n    '${nombre} congelada con entrega en ${c.nombre}. Distribuidor con cadena de frío garantizada, sin cortes, y existencia continua. Punto de venta y servicio a domicilio.',"
geo_nuevo_t = "  title: '${nombre} por mayoreo en ${c.nombre}',\n  description:\n    '${nombre} por mayoreo con entrega en ${c.nombre}. Distribuidor para restaurantes con cadena de frío garantizada y existencia continua. Punto de venta y servicio a domicilio.',"
p = os.path.join(R, 'scripts/generar_geo.mjs')
s = open(p, encoding='utf-8', newline='').read()
nl = '\r\n' if '\r\n' in s[:2000] else '\n'
v, n = geo_viejo_t.replace('\n', nl), geo_nuevo_t.replace('\n', nl)
assert s.count(v) == 2, s.count(v)
s = s.replace(v, n)
open(p, 'w', encoding='utf-8', newline='').write(s)
print('ok scripts/generar_geo.mjs 2')

editar('components/landing/PaginaAncla.tsx', [("const h1 = c ? `${a.nombre} en ${c.nombre}` : a.h1",
                                               "const h1 = c ? `${a.nombre} por mayoreo en ${c.nombre}` : a.h1")])
editar('components/landing/PaginaGeo.tsx', [("const h1 = `${f.nombre} en ${c.nombre}`",
                                             "const h1 = `${f.nombre} por mayoreo en ${c.nombre}`")])

# Pie de página: la columna «Tu negocio» era texto sin ligas; pasa a «Lo que más nos buscan» (páginas de búsqueda).
editar('components/layout/Footer.tsx', [
    ("import { GIROS } from '@/lib/giros'", "import { INTENCIONES } from '@/lib/intenciones'"),
    ("""          <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-fry">Tu negocio</h2>
          <ul className="mt-4 space-y-2 text-[14px]">
            {GIROS.slice(0, 7).map((g) => (
              <li key={g.slug} className="text-hielo-300">
                {g.nombre}
              </li>
            ))}
          </ul>""",
     """          <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-fry">Lo que más nos buscan</h2>
          <ul className="mt-4 space-y-2 text-[14px]">
            {INTENCIONES.map((x) => (
              <li key={x.slug}>
                <Link href={`/${x.slug}/`} className="text-hielo-300 hover:text-white">
                  {x.h1}
                </Link>
              </li>
            ))}
          </ul>"""),
])

# Las 7 páginas de búsqueda
import re
src = open(os.path.join(R, 'lib/intenciones.ts'), encoding='utf-8').read()
for slug in re.findall(r"^    slug: '([^']+)',", src, flags=re.M):
    d = os.path.join(R, 'app', slug)
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'page.tsx'), 'w', encoding='utf-8').write(f"""import type {{ Metadata }} from 'next'
import PaginaIntencion from '@/components/landing/PaginaIntencion'
import {{ intencion }} from '@/lib/intenciones'

/* [S182] Página de búsqueda: la frase con que busca el comprador. Datos en lib/intenciones.ts. */
const it = intencion('{slug}')!

export const metadata: Metadata = {{
  title: it.titulo,
  description: it.descripcion,
  alternates: {{ canonical: '/{slug}/' }},
}}

export default function Page() {{
  return <PaginaIntencion slug="{slug}" />
}}
""")
    print('página', slug)
