/**
 * Los reels de Churros Sol (12-nov-2026), para la página /churros-sol/.
 *
 * Son los cinco reels que Sol grabó en la Expo Franquicias, con Tere y su hija en su stand: tomas reales de la
 * freidora y del producto, nada generado con IA. Son los mismos de su sitio
 * (churrossol-sitio.shy-block-053a.workers.dev/videos.html), con el mismo título y en el mismo orden.
 *
 * Por qué ahora sí se menciona a Sol: el 2-sep-2026 Jorge pidió no hacerles promoción hasta tener garantía de que
 * protegieran a MACSA como distribuidor. El convenio ya está hecho (confirmado el 12-nov-2026).
 *
 * Igual que los videos de la portada (`lib/videosPortada.ts`):
 *  - Los .mp4 viven en el bucket `medios-web` de Supabase, carpeta `churros-sol/` (Safari exige `Range`).
 *  - Las portadas (.webp, 540×960) van en `public/videos/`, mismo origen.
 *  - `clave` es también la etiqueta del evento de medición `video_reproducir`.
 *
 * Cada `texto` sale de lo que dice el propio reel o de la copia del sitio de Sol: aquí no se inventa nada.
 */

import { asset } from './site'
import type { VideoPortada } from './videosPortada'

export const MEDIOS_SOL =
  process.env.NEXT_PUBLIC_MEDIOS_SOL ??
  'https://jlhvtjsdbdgwvfhjahdi.supabase.co/storage/v1/object/public/medios-web/churros-sol/'

export interface ReelSol extends VideoPortada {
  texto: string
}

/** `clave` sin el prefijo `churros-sol-` es el nombre del .mp4 dentro de `churros-sol/`. */
const reel = (archivo: string, titulo: string, segundos: number, texto: string): ReelSol => ({
  clave: `churros-sol-${archivo}`,
  titulo,
  segundos,
  texto,
  src: `${MEDIOS_SOL}${archivo}.mp4`,
})

export const REELS_SOL: ReelSol[] = [
  reel(
    'del-congelador-a-la-freidora',
    'Del congelador a la freidora',
    25,
    'Sin descongelar: directo del congelador a la freidora, y en tres minutos están listos.',
  ),
  reel(
    'que-los-hace-diferentes',
    '¿Qué los hace diferentes?',
    35,
    'Hacen la masa desde cero en su fábrica de Aguascalientes y los ultracongelan.',
  ),
  reel('siempre-igual', 'Siempre igual', 34, 'Un proceso estandarizado: la misma consistencia en cada pedido, a 180 °C.'),
  reel(
    'un-postre-diferente',
    '¿Un postre diferente?',
    22,
    'El taquito de churro: una idea de postre para tu carta.',
  ),
  reel('para-tu-negocio', 'Para tu negocio', 36, 'Para restaurantes, cafeterías, hoteles y más.'),
]

/** La tarjeta chica del hero en celular (como la de la portada): abre el primer reel ahí mismo. */
export const SOL_TARJETA = {
  nombre: 'Del congelador a la freidora',
  cargo: 'Churros Sol, en la Expo Franquicias',
  miniatura: asset('/videos/churros-sol-chico.webp'),
}

/** Los códigos de Sol en el catálogo (prefijo SC-). */
export const SKUS_SOL = ['SC-CHU12', 'SC-FRITO12', 'SC-BITEF', 'SC-PANELOT', 'SC-PANZANA']
