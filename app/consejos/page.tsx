import type { Metadata } from 'next'
import Hero from '@/components/landing/Hero'
import { BarraConfianza, Breadcrumb, CTAFinal, Seccion } from '@/components/landing/Secciones'
import { TarjetaTip } from '@/components/landing/Consejos'
import { TIPS } from '@/lib/tips'
import { HEROES } from '@/lib/heroes'
import { breadcrumbSchema, ld } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Consejos de cocina — cómo freír mejor la papa',
  description:
    'Videos de medio minuto con lo que hace la diferencia en la freidora: temperatura, canastilla, aceite, recepción y por qué la papa descongelada te sale cara.',
  alternates: { canonical: '/consejos/' },
}

export default function Page() {
  const migas = [{ nombre: 'Inicio', url: '/' }, { nombre: 'Consejos' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <Breadcrumb items={migas} />

      <Hero
        eyebrow={`${TIPS.length} videos · medio minuto cada uno`}
        h1="Consejos para la cocina"
        answerFirst="Estos son los consejos de operación que más cambian el resultado en una freidora: a qué temperatura freír, por qué no llenar la canastilla, cómo saber si tu aceite ya se fue y por qué la papa descongelada te sale cara. Cada uno dura menos de medio minuto y está hecho para reenviarse a la cocina."
        anclas={['más cambian el resultado', 'para reenviarse a la cocina']}
        chips={[
          { etiqueta: 'Videos', valor: `${TIPS.length} publicados` },
          { etiqueta: 'Duración', valor: '27 a 30 segundos' },
          { etiqueta: 'Fuente', valor: 'Manual Papas USA y nuestro equipo' },
          { etiqueta: 'Formato', valor: 'Vertical, para WhatsApp' },
        ]}
        ctaWhatsApp="Hola, vi los consejos de cocina y quiero información de sus productos."
        ctaSecundario={{ href: '/papa-a-la-francesa/', label: 'Ver la línea de papa' }}
        imagen={HEROES['consejos'].imagen}
        lambWeston={HEROES['consejos'].lambWeston}
      />

      <BarraConfianza />

      <Seccion
        eyebrow="La serie"
        titulo="Todo lo que le puedes enseñar a tu cocina en media hora"
        intro="Ninguno vende nada: son la operación bien hecha. Si te sirven, reenvíalos — para eso están."
      >
        <div className="grid gap-px bg-hielo-300 sm:grid-cols-2 lg:grid-cols-3">
          {TIPS.map((t) => (
            <TarjetaTip key={t.slug} t={t} />
          ))}
        </div>
      </Seccion>

      <Seccion eyebrow="De dónde salen" titulo="Nada de esto es opinión" fondo="hielo">
        <div className="grid gap-px bg-hielo-300 sm:grid-cols-3">
          <div className="bg-white p-6">
            <h2 className="font-display text-[17px] font-bold text-navy">Manual Papas USA</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-humo">
              El manual de Potatoes USA: grados de calidad, defectos, recepción, almacenaje, freído
              y manejo del aceite.
            </p>
          </div>
          <div className="bg-white p-6">
            <h2 className="font-display text-[17px] font-bold text-navy">Nuestra operación</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-humo">
              Lo que se aprende moviendo producto todos los días: cómo se recibe, cómo se estiba y
              qué se rompe cuando no se cuida.
            </p>
          </div>
          <div className="bg-white p-6">
            <h2 className="font-display text-[17px] font-bold text-navy">Lamb Weston</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-humo">
              Origen de la papa, proceso en planta y por qué la región de cultivo cambia el
              resultado en el plato.
            </p>
          </div>
        </div>
        <p className="mt-6 max-w-prosa text-[14.5px] leading-relaxed text-humo">
          La regla con la que se hicieron: <strong className="text-navy">si un dato no está en
          una de esas fuentes, no se dice</strong>. Las cifras que venían de conversación quedaron
          fuera hasta poder verificarlas.
        </p>
      </Seccion>

      <CTAFinal
        titulo="¿Quieres que probemos la diferencia en tu cocina?"
        texto="Te llevamos una muestra sin compromiso y la fríes tú, con tu freidora y tu gente. Es la única forma honesta de comparar."
        mensaje="Hola, vi los consejos de cocina. Me interesa una muestra."
      />
    </>
  )
}
