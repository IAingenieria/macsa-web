import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/landing/Hero'
import { Breadcrumb, CTAFinal, Seccion } from '@/components/landing/Secciones'
import { VideoFritesAtelier } from '@/components/landing/PaginaFritesAtelier'
import { CONSEJOS_VENTA } from '@/lib/fritesAtelier'
import { asset } from '@/lib/site'
import { breadcrumbSchema, ld } from '@/lib/schema'

/**
 * El trasfondo del evento (Luis, 26-oct): traer el método de marketing de Frites Atelier y aplicarlo también con la
 * línea tradicional de Lamb Weston, para que MACSA sea el proveedor que ayuda a sus clientes a vender más.
 * Por eso esta página no vende una papa: cierra con «la papa que ya vendes».
 */
export const metadata: Metadata = {
  title: 'Cómo vender más papa en tu restaurante',
  description:
    'Lo que Alex Jansen, Director Comercial de Frites Atelier, compartió en Monterrey: cuatro ideas para que la papa deje de ser guarnición, con videos y qué hacer en tu menú.',
  alternates: { canonical: '/como-vender-mas-papa/' },
}

export default function Page() {
  const migas = [{ nombre: 'Inicio', url: '/' }, { nombre: 'Cómo vender más papa' }]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <Breadcrumb items={migas} />

      <Hero
        eyebrow="Ideas para tu menú"
        h1="Cómo vender más papa en tu restaurante"
        answerFirst="Alex Jansen, Director Comercial de Frites Atelier, visitó Monterrey y compartió cómo esa marca convirtió la papa en el platillo principal. Estas cuatro ideas no dependen de una marca: las puedes aplicar con la papa que ya sirves."
        ctaWhatsApp="Hola, vi los consejos para vender más papa y quiero platicar de mi menú."
        ctaSecundario={{ href: '/frites-atelier/', label: 'Conocer Frites Atelier' }}
      />

      {CONSEJOS_VENTA.map((c, i) => (
        <Seccion key={c.titulo} eyebrow={`Idea ${i + 1}`} titulo={c.titulo} fondo={i % 2 ? 'hielo' : 'blanco'}>
          <div className={c.video || c.foto ? 'grid items-start gap-8 lg:grid-cols-[1fr_300px] lg:gap-14' : 'max-w-prosa'}>
            <div>
              {c.cita && (
                <blockquote className="border-l-2 border-fry pl-5 font-display text-[1.25rem] font-semibold leading-snug text-navy">
                  {c.cita}
                  <footer className="mt-1 font-sans text-[13.5px] font-normal text-humo-400">Alex Jansen</footer>
                </blockquote>
              )}
              <p className="mt-6 max-w-prosa text-[16px] leading-relaxed text-humo">{c.texto}</p>
              {c.reglas && (
                <ul className="mt-4 max-w-prosa list-disc space-y-1.5 pl-5 text-[16px] text-humo">
                  {c.reglas.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              )}
              <p className="mt-6 max-w-prosa text-[16px] leading-relaxed text-humo-900">
                <b className="text-navy">Aplícalo: </b>
                {c.aplica}
              </p>
              {c.ligas && (
                <ul className="mt-5 flex flex-wrap gap-3">
                  {c.ligas.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="block rounded border border-hielo-300 bg-white px-4 py-2 text-[14.5px] font-semibold text-navy hover:border-fry">
                        {l.texto} →
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {c.video && <VideoFritesAtelier v={{ archivo: c.video, titulo: c.titulo, vertical: true }} />}
            {c.foto && (
              <img src={asset(`/frites-atelier/${c.foto.nombre}.webp`)} alt={c.foto.alt} width={667} height={1000} loading="lazy" className="w-full" />
            )}
          </div>
        </Seccion>
      ))}

      <Seccion eyebrow="Con qué papa" titulo="Empieza con la que ya vendes" fondo="hielo" intro="Estas ideas funcionan con tu papa de línea. Si quieres subir un escalón, también tenemos las de Lamb Weston Europa y Frites Atelier.">
        <ul className="grid gap-3 sm:grid-cols-2">
          <li>
            <Link href="/papa-a-la-francesa/" className="block rounded border border-hielo-300 bg-white px-4 py-3 font-semibold text-navy hover:border-fry">
              Papa a la francesa Lamb Weston →
            </Link>
          </li>
          <li>
            <Link href="/frites-atelier/" className="block rounded border border-hielo-300 bg-white px-4 py-3 font-semibold text-navy hover:border-fry">
              Frites Atelier y Private Reserve →
            </Link>
          </li>
        </ul>
      </Seccion>

      <CTAFinal
        titulo="Platícanos de tu menú"
        texto="Cuéntanos qué vendes y cómo sirves tu papa. Te decimos qué producto y qué complementos te convienen."
        mensaje="Hola, quiero platicar de mi menú y de cómo vender más papa."
      />
    </>
  )
}
