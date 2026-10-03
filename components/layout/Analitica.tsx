import { GA4_ID } from '@/lib/site'

/**
 * GA4 directo (2-oct-2026), receta de DIHMOSA. Sin Tag Manager: GTM no
 * sustituye a GA4, pesa en celular y deja meter códigos sin pruebas.
 *
 * Sin `GA4_ID` (Pages, builds con noindex, o antes de crear la propiedad) no
 * se pinta nada, y `macsaEvento` existe igual para que nadie truene.
 *
 * Eventos de contacto (se marcan como «key events» en GA4):
 *   generate_lead      → el formulario de «Cuéntanos qué necesita tu cocina»
 *   contacto_whatsapp  → clic a wa.me / api.whatsapp.com que sí sale a WhatsApp
 *   contacto_llamada   → clic a tel:
 *   abrir_asistente    → abren el chat del bot (burbuja o botón con data-chat)
 *
 * ⚠️ El script vive en un string: nada de barras invertidas (P14).
 */
export default function Analitica() {
  return (
    <>
      {GA4_ID ? (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","${GA4_ID}");`,
            }}
          />
        </>
      ) : null}
      <script dangerouslySetInnerHTML={{ __html: EVENTOS }} />
    </>
  )
}

const EVENTOS = `
window.macsaEvento = function (nombre, datos) {
  try {
    if (typeof window.gtag !== 'function') return;
    var d = datos || {};
    d.transport_type = 'beacon';
    window.gtag('event', nombre, d);
  } catch (_) {}
};
function macsaChatListo() {
  var host = document.querySelector('[data-forja-widget]');
  var raiz = host && host.shadowRoot;
  return !!(raiz && raiz.querySelector('.panel') && raiz.querySelector('textarea'));
}
document.addEventListener('click', function (e) {
  try {
    var ruta = e.composedPath ? e.composedPath() : [];
    for (var i = 0; i < ruta.length; i++) {
      var n = ruta[i];
      if (n && n.classList && n.classList.contains('burbuja')) {
        window.macsaEvento('abrir_asistente', { origen: 'burbuja', pagina: location.pathname });
        return;
      }
    }
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (h.indexOf('tel:') === 0) {
      window.macsaEvento('contacto_llamada', { telefono: h.slice(4), pagina: location.pathname });
    } else if (a.hasAttribute('data-chat') && macsaChatListo()) {
      window.macsaEvento('abrir_asistente', { origen: 'boton', pagina: location.pathname });
    } else if (h.indexOf('https://wa.me/') === 0 || h.indexOf('https://api.whatsapp.com/') === 0) {
      window.macsaEvento('contacto_whatsapp', { pagina: location.pathname });
    }
  } catch (_) {}
}, true);
`
