import { EMPRESA, SITE_URL } from '@/lib/site'
import { FAMILIAS } from '@/lib/familias'
import { GIROS } from '@/lib/giros'
import { CIUDADES, MODOS } from '@/lib/ciudades'

/**
 * /llms.txt (2-oct-2026): resumen en texto plano para los modelos de IA
 * (ChatGPT, Claude, Perplexity, Copilot) que leen el sitio para contestar
 * "¿quién distribuye papa Lamb Weston en Monterrey?".
 *
 * Sale de los mismos datos de lib/ que arman las páginas: si cambia una
 * familia, un teléfono o una ciudad, este archivo cambia solo en el build.
 * Nada aquí se escribe a mano.
 */
export const dynamic = 'force-static'

export function GET() {
  // Un solo número para llamadas y WhatsApp (Luis, 2-oct-2026): no repetirlo.
  const tel = [...new Set([...EMPRESA.telefonos, ...EMPRESA.whatsapp.map((w) => w.numero)])]
    .map((n) => `${n} (llamadas y WhatsApp)`)
    .join(' · ')
  const d = EMPRESA.direccion
  const porModo = (Object.keys(MODOS) as (keyof typeof MODOS)[])
    .map((m) => {
      const cs = CIUDADES.filter((c) => c.modo === m).map((c) => c.nombre)
      return cs.length ? `- **${MODOS[m].titulo}** (${MODOS[m].promesa}): ${cs.join(', ')}. ${MODOS[m].detalle}` : ''
    })
    .filter(Boolean)

  const lineas = [
    `# ${EMPRESA.nombre}`,
    '',
    `> ${EMPRESA.descripcion}`,
    '',
    `Razón social: ${EMPRESA.razonSocial} · CEDIS en ${d.calle}, Col. ${d.colonia}, ${d.ciudad}, ${d.estado}, México.`,
    `Contacto: ${tel} · ${EMPRESA.correo}. Pedidos antes de las ${EMPRESA.corteHora} se entregan al día siguiente en la ruta diaria.`,
    '',
    '## Líneas de producto',
    ...FAMILIAS.map((f) => `- [${f.nombre}](${SITE_URL}/${f.slug}/): ${f.answerFirst}`),
    '',
    '## Cobertura de entrega',
    ...porModo,
    `- Detalle por ciudad: ${SITE_URL}/cobertura/`,
    '',
    '## Para qué negocios',
    ...GIROS.map((g) => `- ${g.nombre}`),
    '',
    '## Páginas clave',
    `- [Catálogo](${SITE_URL}/catalogo/)`,
    `- [Tienda con ficha por código](${SITE_URL}/tienda/)`,
    `- [Marcas](${SITE_URL}/marcas/)`,
    `- [Cadena de frío](${SITE_URL}/cadena-de-frio/)`,
    `- [Preguntas frecuentes](${SITE_URL}/preguntas-frecuentes/)`,
    `- [Darse de alta como cliente](${SITE_URL}/alta-de-cliente/)`,
    `- [Contacto](${SITE_URL}/contacto/)`,
    `- [Nosotros](${SITE_URL}/nosotros/)`,
    '',
    '## Precios',
    'El precio depende de la lista de cada cliente y no se publica en el sitio: se cotiza por WhatsApp, por el chat del sitio o en el portal de clientes.',
    '',
  ]

  return new Response(lineas.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
