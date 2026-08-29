import { BOT_WIDGET } from '@/lib/site'

/**
 * MacsaIA en el sitio.
 *
 * El bot YA existe y está en vivo por WhatsApp (worker `forja-crm-69958e`),
 * con su base de conocimiento cargada. Forja sirve el widget en `/widget.js`
 * — la misma etiqueta que el dueño pegaría en cualquier sitio.
 *
 * ⚠️ Hoy ese endpoint responde 404: «El canal web de este bot no está
 * activado». Activarlo es un cambio de configuración en el bot de producción,
 * así que no se hace desde aquí. Cuando Luis lo habilite, basta con poner la
 * URL en `NEXT_PUBLIC_BOT_WIDGET` y el chat aparece en todas las páginas.
 *
 * Mientras tanto no se renderiza nada: un widget roto es peor que ninguno.
 */
export default function BotWidget() {
  if (!BOT_WIDGET) return null
  return <script src={BOT_WIDGET} async />
}
