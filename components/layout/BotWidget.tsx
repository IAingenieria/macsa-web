import { BOT_WIDGET } from '@/lib/site'

/**
 * MacsaIA en el sitio.
 *
 * El bot YA existe y está en vivo por WhatsApp (worker `forja-crm-69958e`),
 * con su base de conocimiento cargada. Forja sirve el widget en `/widget.js`
 * — la misma etiqueta que el dueño pegaría en cualquier sitio.
 *
 * El bot filtra por ORIGEN. Medido el 2026-08-31: pasan `iaingenieria.github.io`
 * y `macsa-web.shy-block-053a.workers.dev` (los dos destinos del sitio, que el
 * bot lista en `WEB_SITES`); cualquier otro recibe 403.
 *
 * Si se agrega un destino nuevo —el dominio definitivo, por ejemplo— hay que
 * darlo de alta en el bot ANTES de encender esta variable ahí: un widget que
 * no contesta es peor que ninguno. Por eso, si la variable viene vacía, no se
 * renderiza nada.
 */
export default function BotWidget() {
  if (!BOT_WIDGET) return null
  return <script src={BOT_WIDGET} async />
}
