"""S206: A3, A8 y L3 traen invitados de frente (revisado cuadro por cuadro, 6-nov). Salen de la página hasta tener permiso."""
import os

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def cambiar(rel, pares):
    p = os.path.join(RAIZ, rel)
    t = open(p, "rb").read().decode("utf-8")
    assert "\r\n" not in t, rel
    for a, b in pares:
        assert t.count(a) == 1, (rel, a[:60], t.count(a))
        t = t.replace(a, b)
    open(p, "wb").write(t.encode("utf-8"))


cambiar("lib/fritesAtelier.ts", [
    (" *  - Sólo videos sin invitados de frente y sin datos por confirmar: A2, A3, A4, A8, L3 y L6.\n"
     " *    A5/L5 (tiempos) y A1, A9, A10, L1, L7, L8 (permisos) no salen aquí hasta que se resuelvan.\n",
     " *  - Sólo videos sin invitados de frente y sin datos por confirmar: A2, A4 y L6 (revisados cuadro por cuadro, 6-nov).\n"
     " *    A5/L5 (tiempos) y A1, A3, A8, A9, A10, L1, L3, L7, L8 (invitados sin permiso) no salen aquí hasta resolverse.\n"),
    ("    { archivo: 'fa-a3-no-vendemos-papas', titulo: 'No vendemos papas', texto: 'Vendemos una marca y una experiencia.', vertical: true },\n", ""),
    ("    { archivo: 'fa-a8-la-canasta', titulo: 'La canasta', texto: 'Destácala con un topping y es un platillo completo.', vertical: true },\n", ""),
    ("    { archivo: 'fa-l3-el-atelier', titulo: 'El Atelier', texto: 'Cómo son los ateliers y qué se sirve ahí.', vertical: false },\n", ""),
    ("    { archivo: 'fa-en-a3-we-dont-sell-fries', titulo: 'We don’t sell fries', texto: 'A brand and an experience.', vertical: true },\n", ""),
    ("    { archivo: 'fa-en-a8-the-basket', titulo: 'The basket', texto: 'Make it stand out with a topping.', vertical: true },\n", ""),
    ("  video?: string\n  texto: string\n", "  video?: string\n  /** Foto de public/frites-atelier cuando no hay video sin invitados. */\n  foto?: { nombre: string; alt: string }\n  texto: string\n"),
    ("    video: 'fa-a3-no-vendemos-papas',\n", "    foto: { nombre: 'sal', alt: 'Papa de Frites Atelier saltando en el recipiente de servicio' },\n"),
    ("    video: 'fa-a8-la-canasta',\n", "    foto: { nombre: 'servicio', alt: 'Porción de Frites Atelier servida en charola' },\n"),
])

cambiar("app/como-vender-mas-papa/page.tsx", [
    ("import { breadcrumbSchema, ld } from '@/lib/schema'\n", "import { asset } from '@/lib/site'\nimport { breadcrumbSchema, ld } from '@/lib/schema'\n"),
    ("<div className={c.video ? 'grid items-start", "<div className={c.video || c.foto ? 'grid items-start"),
    ("            {c.video && <VideoFritesAtelier v={{ archivo: c.video, titulo: c.titulo, vertical: true }} />}\n",
     "            {c.video && <VideoFritesAtelier v={{ archivo: c.video, titulo: c.titulo, vertical: true }} />}\n"
     "            {c.foto && (\n"
     "              <img src={asset(`/frites-atelier/${c.foto.nombre}.webp`)} alt={c.foto.alt} width={667} height={1000} loading=\"lazy\" className=\"w-full\" />\n"
     "            )}\n"),
])

p = os.path.join(RAIZ, "components/landing/PaginaFritesAtelier.tsx")
t = open(p, "rb").read().decode("utf-8")
i = t.index('          <div className="mt-7 grid grid-cols-2 gap-5 lg:grid-cols-4">')
j = t.index("        </div>\n      </section>\n\n      {/* Productos */}")
nuevo = '''          <div className="mt-7 grid grid-cols-2 items-start gap-5 lg:grid-cols-4">
            {t.videos.map((v) => (
              <figure key={v.archivo} className={v.vertical ? '' : 'col-span-2'}>
                <VideoFritesAtelier v={v} />
                <figcaption className="mt-3">
                  <b className="block text-[15.5px]" style={{ ...SERIF, color: AZUL }}>
                    {v.titulo}
                  </b>
                  <span className="text-[14px] leading-snug" style={{ color: '#3A4266' }}>
                    {v.texto}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
'''
t = t[:i] + nuevo + t[j:]
a = "  const verticales = t.videos.filter((v) => v.vertical)\n  const horizontales = t.videos.filter((v) => !v.vertical)\n"
assert t.count(a) == 1
t = t.replace(a, "")
open(p, "wb").write(t.encode("utf-8"))

cambiar("scripts/s206_subir_fa.py", [
    ('for f in sorted(glob.glob(os.path.join(RAIZ, "_fa_web", "video", "*"))):\n    subir(f,',
     '# Sólo los revisados sin invitados de frente. A3, A8 y L3 se quedan fuera hasta tener permiso.\n'
     'LIMPIOS = ("fa-a2-", "fa-a4-", "fa-l6-", "fa-en-a2-", "fa-en-a4-")\n'
     'for f in sorted(glob.glob(os.path.join(RAIZ, "_fa_web", "video", "*"))):\n'
     '    if not os.path.basename(f).startswith(LIMPIOS):\n        continue\n    subir(f,'),
])
print("ok")
