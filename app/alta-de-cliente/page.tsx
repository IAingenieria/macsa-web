import type { Metadata } from 'next'
import Hero from '@/components/landing/Hero'
import { Breadcrumb, CTAFinal, FAQ, Seccion } from '@/components/landing/Secciones'
import { EMPRESA, waLink } from '@/lib/site'
import { HEROES } from '@/lib/heroes'
import { breadcrumbSchema, faqSchema, ld } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Darte de alta como cliente',
  description:
    'Cómo abrir cuenta con MACSA: muestra sin compromiso, datos fiscales para facturar o trabajo con remisión, y acceso al portal para pedir con tu propio precio.',
  alternates: { canonical: '/alta-de-cliente/' },
}

const PASOS = [
  {
    t: 'Pide una muestra',
    d: 'Lo habitual antes del primer pedido. Te la llevamos sin compromiso para que la pruebes en tu cocina, con el producto que te interese.',
  },
  {
    t: 'Danos los datos del negocio',
    d: 'Para facturar necesitamos los datos fiscales. Si prefieres trabajar con remisión, sin factura, también se puede.',
  },
  {
    t: 'Levanta tu primer pedido',
    d: `Por WhatsApp o por el portal. Si entra antes del corte de las ${EMPRESA.corteHora} h, se entrega al día siguiente.`,
  },
  {
    t: 'Recibe tu acceso al portal',
    d: 'Te damos un código y un PIN para que veas tu precio, tus productos frecuentes y tu historial, y pidas sin esperar a nadie.',
  },
]

const PREGUNTAS = [
  {
    p: '¿Necesito RFC para comprar?',
    r: 'Para facturar sí necesitamos los datos fiscales del negocio. Si todavía no los tienes listos, se puede trabajar con remisión mientras tanto.',
  },
  {
    p: '¿Cuánto tarda el alta?',
    r: 'El mismo día. Nos mandas los datos por WhatsApp y te confirmamos para que puedas pedir.',
  },
  {
    p: '¿Le venden a particulares?',
    r: 'No. La venta es exclusiva a negocios: restaurantes, cocinas, fast food, barras y comedores.',
  },
  {
    p: '¿Manejan crédito?',
    r: 'Las condiciones se revisan caso por caso según el historial y el volumen. Escríbenos y lo vemos con un asesor.',
  },
]

export default function Page() {
  const migas = [{ nombre: 'Inicio', url: '/' }, { nombre: 'Alta de cliente' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(faqSchema(PREGUNTAS))} />
      <Breadcrumb items={migas} />

      <Hero
        eyebrow="Cuatro pasos"
        h1="Abre tu cuenta y pide el mismo día"
        answerFirst="Darte de alta como cliente de MACSA toma un día. Lo normal es empezar con una muestra sin compromiso; después nos pasas los datos fiscales del negocio para facturar —o trabajamos con remisión— y te damos acceso al portal para que pidas con tu propio precio, sin esperar a un vendedor."
        anclas={['una muestra sin compromiso', 'tu propio precio']}
        chips={[
          { etiqueta: 'Tiempo', valor: 'El mismo día' },
          { etiqueta: 'Requisito', valor: 'Datos fiscales del negocio' },
          { etiqueta: 'Alternativa', valor: 'Remisión, sin factura' },
          { etiqueta: 'Venta', valor: 'Exclusiva a negocios' },
        ]}
        ctaWhatsApp="Hola, quiero darme de alta como cliente. Mi negocio es…"
        ctaSecundario={{ href: '/catalogo/', label: 'Ver el catálogo' }}
        imagen={HEROES['alta-de-cliente'].imagen}
        lambWeston={HEROES['alta-de-cliente'].lambWeston}
      />

      <Seccion eyebrow="Proceso" titulo="Cómo se abre la cuenta">
        <ol className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-4">
          {PASOS.map((p, i) => (
            <li key={p.t} className="bg-white p-6">
              <span className="font-mono text-[11px] font-semibold text-fry-700">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-2 font-display text-[17px] font-bold text-navy">{p.t}</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-humo">{p.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href={waLink(
              'Hola, quiero darme de alta como cliente. Mi negocio es ____ y está en ____.',
            )}
            className="btn-primario"
          >
            Empezar por WhatsApp
          </a>
          <a href={EMPRESA.portalUrl} className="btn-secundario">
            Ya soy cliente, entrar al portal
          </a>
        </div>
      </Seccion>

      <FAQ preguntas={PREGUNTAS} />
      <CTAFinal />
    </>
  )
}
