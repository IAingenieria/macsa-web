import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/landing/Secciones'
import { EMPRESA } from '@/lib/site'
import { breadcrumbSchema, ld } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Aviso de privacidad',
  description:
    'Cómo trata MACSA de la Sultana los datos de contacto que recibe a través de este sitio, para qué los usa y cómo ejercer los derechos ARCO.',
  alternates: { canonical: '/aviso-de-privacidad/' },
  robots: { index: false, follow: true },
}

export default function Page() {
  const migas = [{ nombre: 'Inicio', url: '/' }, { nombre: 'Aviso de privacidad' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <Breadcrumb items={migas} />

      <article className="contenedor py-14 sm:py-20">
        <h1 className="font-display text-[2rem] font-bold tracking-tight text-navy sm:text-[2.6rem]">
          Aviso de privacidad
        </h1>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-humo-400">
          Borrador · pendiente de revisión legal
        </p>

        <div className="mt-10 max-w-prosa space-y-6 text-[16px] leading-relaxed text-humo-900">
          <p>
            <strong className="text-navy">{EMPRESA.razonSocial}</strong>, con domicilio en{' '}
            {EMPRESA.direccion.calle}, Col. {EMPRESA.direccion.colonia},{' '}
            {EMPRESA.direccion.ciudad}, {EMPRESA.direccion.estado}, es responsable del tratamiento
            de los datos personales que se recaben a través de este sitio.
          </p>

          <h2 className="pt-4 font-display text-[20px] font-bold text-navy">
            Qué datos recabamos
          </h2>
          <p>
            Únicamente los datos de contacto comercial que la persona proporciona de forma
            voluntaria: nombre, nombre del negocio, teléfono, correo electrónico y ciudad. Para
            facturar se solicitan además los datos fiscales del negocio.
          </p>

          <h2 className="pt-4 font-display text-[20px] font-bold text-navy">Para qué los usamos</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Atender la solicitud de información, cotización o muestra.</li>
            <li>Levantar y dar seguimiento a pedidos.</li>
            <li>Emitir comprobantes fiscales cuando el cliente lo solicita.</li>
            <li>Contactar al negocio por WhatsApp, teléfono o correo para dar seguimiento comercial.</li>
          </ul>

          <h2 className="pt-4 font-display text-[20px] font-bold text-navy">Con quién se comparten</h2>
          <p>
            No vendemos ni transferimos los datos a terceros con fines comerciales. Sólo se
            comparten con proveedores de servicio que participan directamente en la operación
            (facturación y mensajería), y con las autoridades cuando la ley lo exige.
          </p>

          <h2 className="pt-4 font-display text-[20px] font-bold text-navy">Derechos ARCO</h2>
          <p>
            Puedes solicitar el acceso, la rectificación, la cancelación o la oposición al
            tratamiento de tus datos escribiendo a{' '}
            <a href={`mailto:${EMPRESA.correo}`} className="font-semibold text-fry-700">
              {EMPRESA.correo}
            </a>
            . Responderemos por la misma vía.
          </p>

          <h2 className="pt-4 font-display text-[20px] font-bold text-navy">Cambios a este aviso</h2>
          <p>
            Cualquier modificación se publicará en esta misma página. Te recomendamos revisarla
            periódicamente.
          </p>

          <p className="border-l-4 border-fry bg-hielo-50 px-5 py-4 text-[15px]">
            <strong className="text-navy">Nota interna:</strong> este texto es un borrador de
            trabajo para la versión de demostración del sitio. Antes de publicarlo en el dominio
            definitivo debe revisarlo el área legal de la empresa.
          </p>
        </div>
      </article>
    </>
  )
}
