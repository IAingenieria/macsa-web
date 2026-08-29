import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb, Seccion } from '@/components/landing/Secciones'
import Hero from '@/components/landing/Hero'
import { EMPRESA, waLink } from '@/lib/site'
import { breadcrumbSchema, ld } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'WhatsApp, teléfono y correo de ventas de MACSA Foodservice. CEDIS en América del Norte 202-B, Las Américas, Guadalupe, Nuevo León. Venta exclusiva a negocios.',
  alternates: { canonical: '/contacto/' },
}

export default function Page() {
  const migas = [{ nombre: 'Inicio', url: '/' }, { nombre: 'Contacto' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <Breadcrumb items={migas} />

      <Hero
        eyebrow="Venta exclusiva a negocios"
        h1="Hablemos de lo que necesita tu cocina"
        answerFirst="El canal principal de MACSA es WhatsApp: por ahí mandamos el catálogo, se levanta el pedido y se da seguimiento. También atendemos por teléfono y por correo, y los clientes formales nos mandan su orden de compra. El corte del día es a las 20:00, hora de Monterrey."
        anclas={['el canal principal', 'a las 20:00']}
        chips={[
          { etiqueta: 'WhatsApp', valor: EMPRESA.whatsapp[0].numero },
          { etiqueta: 'Teléfono', valor: EMPRESA.telefonos[0] },
          { etiqueta: 'Correo', valor: EMPRESA.correo },
          { etiqueta: 'Corte', valor: `${EMPRESA.corteHora} h` },
        ]}
        ctaWhatsApp="Hola, quiero información de sus productos."
        ctaSecundario={{ href: '/alta-de-cliente/', label: 'Darme de alta' }}
      />

      <Seccion eyebrow="Canales" titulo="Por dónde nos escribes">
        <div className="grid gap-px bg-hielo-300 lg:grid-cols-3">
          <div className="bg-white p-7">
            <h2 className="font-display text-[18px] font-bold text-navy">WhatsApp</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-humo">
              Lo más rápido para levantar un pedido o pedir el catálogo.
            </p>
            <ul className="mt-4 space-y-2">
              {EMPRESA.whatsapp.map((w) => (
                <li key={w.e164}>
                  <a
                    href={waLink('Hola, quiero información de sus productos.', w.e164)}
                    className="font-mono text-[14px] font-semibold text-fry-700 hover:text-navy"
                  >
                    {w.numero}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-7">
            <h2 className="font-display text-[18px] font-bold text-navy">Teléfono y correo</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-humo">
              Para órdenes de compra y temas administrativos.
            </p>
            <ul className="mt-4 space-y-2">
              {EMPRESA.telefonos.map((t) => (
                <li key={t} className="font-mono text-[14px] text-humo-900">
                  {t}
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${EMPRESA.correo}`}
                  className="font-mono text-[14px] font-semibold text-fry-700 hover:text-navy"
                >
                  {EMPRESA.correo}
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white p-7">
            <h2 className="font-display text-[18px] font-bold text-navy">Portal de clientes</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-humo">
              Si ya eres cliente, entra con tu código y tu PIN: ahí ves tu precio, tus productos
              frecuentes y tu historial.
            </p>
            <a href={EMPRESA.portalUrl} className="btn-secundario mt-5 !px-4 !py-2 text-[14px]">
              Entrar al portal
            </a>
          </div>
        </div>
      </Seccion>

      <Seccion eyebrow="Dónde estamos" titulo="Centro de distribución" fondo="hielo">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <address className="not-italic text-[17px] leading-relaxed text-humo-900">
              <span className="font-semibold text-navy">{EMPRESA.razonSocial}</span>
              <br />
              {EMPRESA.direccion.calle}
              <br />
              Col. {EMPRESA.direccion.colonia}
              <br />
              {EMPRESA.direccion.ciudad}, {EMPRESA.direccion.estado}
            </address>
            <p className="mt-5 max-w-prosa text-[14.5px] leading-relaxed text-humo">
              Desde aquí sale el reparto diario al área metropolitana de Monterrey, el corredor a
              Saltillo y Torreón, y los viajes dedicados a la zona de Tampico y Ciudad Victoria.
            </p>
            <Link href="/cobertura/" className="btn-secundario mt-6">
              Ver las 30 ciudades
            </Link>
          </div>
          <div className="border border-hielo-300 bg-white p-7">
            <h2 className="font-display text-[18px] font-bold text-navy">
              Antes de tu primer pedido
            </h2>
            <ul className="mt-4 space-y-3 text-[14.5px] leading-relaxed text-humo">
              <li>
                <span className="font-semibold text-navy">Muestra sin compromiso.</span> Es lo
                habitual: te la llevamos para que la pruebes en tu cocina.
              </li>
              <li>
                <span className="font-semibold text-navy">Alta de cliente.</span> Para facturar
                necesitamos los datos fiscales del negocio. También trabajamos con remisión.
              </li>
              <li>
                <span className="font-semibold text-navy">Venta a negocios.</span> No hay venta al
                público en general.
              </li>
            </ul>
            <Link href="/alta-de-cliente/" className="btn-primario mt-6">
              Darme de alta
            </Link>
          </div>
        </div>
      </Seccion>
    </>
  )
}
