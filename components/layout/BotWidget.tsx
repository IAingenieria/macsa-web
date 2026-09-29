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
  return (
    <>
      <script src={BOT_WIDGET} async />
      <script dangerouslySetInnerHTML={{ __html: ABRIR_CHAT }} />
    </>
  )
}

/**
 * Los botones de pedido y precio abren el chat del bot (29-sep-2026).
 *
 * Luis: "el whatsapp de pedidos hace direccionamiento a [wa.me]… ¿por qué no
 * se abre el chat del bot de Forja?". El widget no expone una función para
 * abrirse, pero monta su panel en un shadow root ABIERTO dentro de
 * `[data-forja-widget]`: se hace clic en su propia burbuja y se deja el
 * mensaje escrito en su caja de texto — el visitante lo revisa y lo envía,
 * como en WhatsApp. Si el widget aún no cargó (o cambia su estructura), la
 * función devuelve false y el enlace sigue a WhatsApp: nunca un botón muerto.
 */
const ABRIR_CHAT = `
window.macsaAbrirChat = function (msg) {
  var host = document.querySelector('[data-forja-widget]');
  var raiz = host && host.shadowRoot;
  var panel = raiz && raiz.querySelector('.panel');
  var caja = raiz && raiz.querySelector('textarea');
  if (!panel || !caja) return false;
  if (!panel.classList.contains('abierto')) {
    var burbuja = raiz.querySelector('.burbuja');
    if (burbuja) burbuja.click();
  }
  if (msg) {
    caja.value = msg;
    caja.dispatchEvent(new Event('input'));
  }
  caja.focus();
  return true;
};
document.addEventListener('click', function (e) {
  var a = e.target && e.target.closest ? e.target.closest('a[data-chat]') : null;
  if (!a) return;
  var msg = '';
  try { msg = new URL(a.href).searchParams.get('text') || ''; } catch (_) {}
  if (window.macsaAbrirChat(msg)) e.preventDefault();
});
`
