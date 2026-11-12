import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/landing/Hero'
import VideoPortada from '@/components/landing/VideoPortada'
import { GaleriaProductos } from '@/components/landing/Productos'
import { BarraConfianza, Breadcrumb, CTAFinal } from '@/components/landing/Secciones'
import { videoPoster, videoSrc } from '@/lib/videosPortada'
import { REELS_SOL, SKUS_SOL, SOL_TARJETA } from '@/lib/videosSol'
import { waLink } from '@/lib/site'
import { breadcrumbSchema, ld } from '@/lib/schema'

/**
 * Churros Sol (12-nov-2026): la página a la que lleva su logotipo en /marcas/. Los reels de la marca y sus
 * productos del catálogo. Por qué ahora sí se menciona a Sol: ver `lib/videosSol.ts`.
 */

export const metadata: Metadata = {
  title: 'Churros Sol en Monterrey',
  description:
    'Churros congelados de Sol, hechos desde cero en Aguascalientes: del congelador a la freidora, sin descongelar, en tres minutos. Míralos en video y pídelos a MACSA.',
  alternates: { canonical: '/churros-sol/' },
}

export default function Page() {
  const migas = [{ nombre: 'Inicio', url: '/' }, { nombre: 'Marcas', url: '/marcas/' }, { nombre: 'Churros Sol' }]
  const [primero] = REELS_SOL

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <Breadcrumb items={migas} />

      <Hero
        eyebrow="Marca · Postres y churros"
        h1="Churros Sol, para tu negocio"
        answerFirst="MACSA lleva a tu cocina en Monterrey los churros congelados de Sol, hechos desde cero en su fábrica de Aguascalientes. Van directo del congelador a la freidora, sin descongelar, y en tres minutos están listos para servir. Abajo los ves en video, contados por la gente de Sol."
        anclas={['hechos desde cero', 'sin descongelar', 'en tres minutos']}
        chips={[
          { etiqueta: 'Fábrica', valor: 'Aguascalientes' },
          { etiqueta: 'Preparación', valor: '3 minutos en freidora' },
          { etiqueta: 'Productos', valor: `${SKUS_SOL.length} en catálogo` },
          { etiqueta: 'Videos', valor: `${REELS_SOL.length} reels de la marca` },
        ]}
        ctaWhatsApp="Hola, quiero información de los Churros Sol."
        ctaSecundario={{ href: '#videos', label: 'Ver los videos' }}
        lateral={
          <VideoPortada
            src={videoSrc(primero)}
            poster={videoPoster(primero)}
            titulo={primero.titulo}
            segundos={primero.segundos}
            clave={primero.clave}
            compacto={SOL_TARJETA}
          />
        }
      />

      <BarraConfianza />

      {/* Los reels: misma sección que «No sólo hay una papa» en la portada. En celular se deslizan de lado. */}
      <section id="videos" className="scroll-mt-20 bg-navy py-16 text-white sm:py-20">
        <div className="contenedor">
          <p className="eyebrow !text-fry">Video · Expo Franquicias</p>
          <h2 className="mt-2 max-w-3xl font-display text-[1.7rem] font-bold leading-tight tracking-tight sm:text-[2.1rem]">
            Míralos en video
          </h2>
          <p className="mt-4 max-w-prosa text-[16px] leading-relaxed text-hielo-200">
            Cómo se preparan, qué los hace diferentes y para qué negocios funcionan, contado por la gente de Sol en su
            stand.
          </p>
          <ul className="-mx-5 mt-9 flex snap-x snap-mandatory scroll-pl-5 gap-5 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5 lg:gap-6">
            {REELS_SOL.map((r) => (
              <li key={r.clave} className="w-[68vw] max-w-[260px] shrink-0 snap-start sm:w-auto sm:max-w-none">
                <VideoPortada
                  src={videoSrc(r)}
                  poster={videoPoster(r)}
                  titulo={r.titulo}
                  segundos={r.segundos}
                  clave={r.clave}
                />
                <h3 className="mt-4 font-display text-[17px] font-bold">{r.titulo}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-hielo-200">{r.texto}</p>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <a data-chat href={waLink('Hola, vi los videos de Churros Sol y quiero precio.')} className="btn-primario">
              Pedir precio
            </a>
            <Link href="/postres-y-churros/" className="btn-fantasma">
              Ver postres y churros
            </Link>
          </div>
        </div>
      </section>

      <GaleriaProductos skus={SKUS_SOL} titulo="Los productos de Sol que manejamos" />

      <CTAFinal
        titulo="¿Los pruebas en tu cocina?"
        mensaje="Hola, me interesa una muestra de Churros Sol."
      />
    </>
  )
}
