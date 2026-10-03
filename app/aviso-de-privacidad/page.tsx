import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/landing/Secciones'
import { EMPRESA, GA4_ID, SITE_URL } from '@/lib/site'
import { breadcrumbSchema, ld } from '@/lib/schema'

/**
 * Aviso de privacidad integral (2-oct-2026).
 *
 * Base: el borrador que ya publicaba el sitio (datos, finalidades, correo de
 * MACSA). Se puso al día con la Ley Federal de Protección de Datos Personales
 * en Posesión de los Particulares (DOF 20-mar-2025): art. 15 fr. I–VI, art. 29
 * (departamento de datos personales) y art. 31 (20 días + 15). La autoridad ya
 * no es el INAI sino la Secretaría Anticorrupción y Buen Gobierno.
 *
 * Lo que MACSA debe confirmar (correo, responsable del departamento, C.P.,
 * razón social) está en 02-PENDIENTES. Google Analytics se menciona sólo
 * cuando el build lo carga (`GA4_ID`).
 */

const ACTUALIZADO = '2 de octubre de 2026'

export const metadata: Metadata = {
  title: 'Aviso de privacidad',
  description:
    'Cómo trata MACSA de la Sultana los datos personales que recibe por este sitio, el chat y WhatsApp: para qué los usa, con quién los comparte y cómo ejercer los derechos ARCO.',
  alternates: { canonical: '/aviso-de-privacidad/' },
}

const h2 = 'pt-4 font-display text-[20px] font-bold text-navy'

export default function Page() {
  const migas = [{ nombre: 'Inicio', url: '/' }, { nombre: 'Aviso de privacidad' }]
  const conAnalitica = Boolean(GA4_ID)
  const d = EMPRESA.direccion
  const correo = (
    <a href={`mailto:${EMPRESA.correo}`} className="font-semibold text-fry-700">
      {EMPRESA.correo}
    </a>
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <Breadcrumb items={migas} />

      <article className="contenedor py-14 sm:py-20">
        <h1 className="font-display text-[2rem] font-bold tracking-tight text-navy sm:text-[2.6rem]">
          Aviso de privacidad
        </h1>
        <p className="mt-3 max-w-prosa text-[16px] leading-relaxed text-humo">
          Cómo usamos y protegemos los datos personales que nos compartes.
        </p>

        <div className="mt-10 max-w-prosa space-y-6 text-[16px] leading-relaxed text-humo-900">
          <h2 className={h2}>1. Quién es el responsable</h2>
          <p>
            <strong className="text-navy">{EMPRESA.razonSocial}</strong> ({EMPRESA.nombre}), con
            domicilio en {d.calle}, Col. {d.colonia}, {d.ciudad}, {d.estado}, México, y sitio de
            internet <a href={SITE_URL} className="font-semibold text-fry-700">macsamty.mx</a>, es
            responsable del uso y protección de tus datos personales.
          </p>

          <h2 className={h2}>2. Qué datos personales usamos</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="text-navy">Cuando nos pides información, una cotización o un pedido</strong>{' '}
              (en el formulario de este sitio, en el chat del sitio, por WhatsApp o por teléfono):
              nombre, nombre del negocio, ciudad, teléfono o WhatsApp, correo electrónico y lo que
              nos cuentes de los productos que necesitas.
            </li>
            <li>
              <strong className="text-navy">Cuando nos compras</strong>: además, Registro Federal de
              Contribuyentes (RFC), razón social, domicilio fiscal y de entrega, y los datos que pida
              la factura.
            </li>
            {conAnalitica ? (
              <li>
                <strong className="text-navy">Cuando navegas en este sitio</strong>: datos de uso que
                reúne Google Analytics con cookies (páginas vistas, tipo de dispositivo, ciudad
                aproximada). Sirven para contar visitas y mejorar el sitio; puedes bloquear las
                cookies en tu navegador.
              </li>
            ) : null}
          </ul>
          <p>No usamos datos personales sensibles.</p>

          <h2 className={h2}>3. Para qué los usamos</h2>
          <p>
            <strong className="text-navy">Finalidades necesarias</strong> para atenderte (sin ellas no
            podemos darte el servicio):
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Contestar tu solicitud de información, cotización o muestra.</li>
            <li>Levantar, surtir y entregar tus pedidos y darles seguimiento.</li>
            <li>Emitir los comprobantes fiscales.</li>
            <li>Darte de alta como cliente y administrar tu cuenta.</li>
          </ul>
          <p>
            <strong className="text-navy">Finalidades adicionales</strong> (no son necesarias; puedes
            negarte):
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Avisarte de promociones, productos nuevos y disponibilidad.</li>
            <li>Mercadotecnia y prospección comercial.</li>
          </ul>
          <p>
            Si no quieres que usemos tus datos para las finalidades adicionales, escríbenos a {correo}{' '}
            con el asunto «No deseo publicidad». Negarte no afecta tu cotización ni tu compra.
          </p>

          <h2 className={h2}>4. Quién más los trata</h2>
          <p>
            Para operar este sitio y su chat nos apoyamos en proveedores que tratan los datos{' '}
            <strong className="text-navy">por cuenta de MACSA</strong> y sólo para lo que les pedimos:
            hospedaje y seguridad del sitio, el servicio de inteligencia artificial que redacta las
            respuestas del chat, el proveedor tecnológico que lo opera
            {conAnalitica ? ', Google Analytics' : ''} y WhatsApp cuando nos escribes por ese medio.
            Algunos de estos servicios están fuera de México.
          </p>
          <p>
            No vendemos ni transferimos tus datos a terceros, salvo en los casos que la ley permite sin
            tu consentimiento (por ejemplo, cuando lo exige una autoridad).
          </p>

          <h2 className={h2}>5. Cómo limitar el uso de tus datos y ejercer tus derechos ARCO</h2>
          <p>
            Tienes derecho a saber qué datos tenemos de ti y para qué (<strong className="text-navy">Acceso</strong>),
            a corregirlos (<strong className="text-navy">Rectificación</strong>), a pedir que los borremos
            (<strong className="text-navy">Cancelación</strong>) y a oponerte a un uso específico
            (<strong className="text-navy">Oposición</strong>). También puedes{' '}
            <strong className="text-navy">revocar tu consentimiento</strong> y{' '}
            <strong className="text-navy">limitar el uso o la divulgación</strong> de tus datos.
          </p>
          <p>Envía tu solicitud a {correo} con:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Tu nombre y el medio por el que quieres la respuesta.</li>
            <li>
              Una identificación oficial; si lo pide alguien en tu nombre, también el documento que
              acredita la representación.
            </li>
            <li>
              Qué datos y qué derecho quieres ejercer. Si es rectificación, qué hay que corregir y el
              documento que lo respalda.
            </li>
          </ul>
          <p>
            Te contestamos en un máximo de 20 días y, si procede, lo hacemos efectivo en los 15 días
            siguientes. La respuesta y, en su caso, la copia de tus datos te las enviamos por medio
            electrónico.
          </p>
          <p>Atiende las solicitudes el Departamento de Datos Personales de MACSA.</p>
          <p>
            Si la revocación o la cancelación tocan datos que la ley nos obliga a conservar (por
            ejemplo, los de tus facturas), los guardaremos sólo por el plazo que marque esa obligación.
          </p>

          <h2 className={h2}>6. Cambios a este aviso</h2>
          <p>Cualquier cambio se publica en esta página, con la fecha de la última actualización.</p>

          <h2 className={h2}>7. Autoridad</h2>
          <p>
            Si consideras que tu derecho a la protección de datos personales fue vulnerado, puedes
            acudir a la Secretaría Anticorrupción y Buen Gobierno, autoridad en la materia conforme a
            la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
          </p>

          <p className="pt-4 font-mono text-[12px] text-humo-400">Última actualización: {ACTUALIZADO}.</p>
        </div>
      </article>
    </>
  )
}
