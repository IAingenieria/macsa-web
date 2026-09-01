import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb, Seccion } from '@/components/landing/Secciones'
import Hero from '@/components/landing/Hero'
import FormularioProspecto from '@/components/landing/FormularioProspecto'
import { EMPRESA, WA_BOT, waLink } from '@/lib/site'
import { HEROES } from '@/lib/heroes'
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
        imagen={HEROES['contacto'].imagen}
        lambWeston={HEROES['contacto'].lambWeston}
      />

      <Seccion
        eyebrow="Formulario"
        titulo="Déjanos tus datos y te contactamos"
        intro="Si prefieres que te busquemos nosotros, llénalo y un asesor te contacta hoy mismo con precio y disponibilidad."
      >
        <div className="max-w-2xl">
          <FormularioProspecto titulo="Cuéntanos qué necesita tu cocina" />
        </div>
      </Seccion>

      <Seccion eyebrow="Canales" titulo="Por dónde nos escribes" fondo="hielo">
        <div className="grid gap-px bg-hielo-300 lg:grid-cols-3">
          <div className="bg-white p-7">
            <h2 className="font-display text-[18px] font-bold text-navy">WhatsApp</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-humo">
              Lo más rápido para levantar un pedido o pedir el catálogo.
            </p>

            {/* MacsaIA: contesta a cualquier hora y ya trae el catálogo. */}
            <div className="mt-4 border-l-4 border-fry bg-fry-100 px-4 py-3">
              <p className="font-display text-[14px] font-semibold text-navy">
                Atención inmediata, a cualquier hora
              </p>
              <a
                href={waLink('Hola, quiero información de sus productos.', WA_BOT)}
                className="mt-1 block font-mono text-[14px] font-semibold text-fry-700 hover:text-navy"
              >
                +52 81 8179 1096
              </a>
              <p className="mt-1.5 text-[12.5px] leading-snug text-humo">
                Te contesta nuestro asistente con el catálogo y las presentaciones. Si necesitas a
                una persona, te pasa con un asesor.
              </p>
            </div>

            {/* Antes vivia aqui la lista de celulares de los vendedores. Se
                retiro el 31-ago-2026: el WhatsApp del sitio es uno solo y es
                el de arriba, que ademas registra al prospecto en el CRM. */}
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
              Desde aquí sale el reparto diario al área metropolitana de Monterrey, el reparto en
              días fijos del corredor sur de Nuevo León y el corredor a Saltillo y Torreón, donde
              además tenemos una segunda bodega.
            </p>
            <Link href="/cobertura/" className="btn-secundario mt-6">
              Ver las ciudades donde entregamos
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
                <span className="font-semibold text-navy">Punto de venta.</span> Puedes llevarte
                desde una pieza o una caja, según el producto. A domicilio manejamos un pedido
                mínimo.
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
