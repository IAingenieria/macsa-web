import Link from 'next/link'
import { asset, waLink } from '@/lib/site'
import { porSkus, rutaFicha } from '@/lib/catalogo'
import { fotoChica } from '@/lib/foto'
import { MEDIOS_FA, SKUS_FA, type TextosFA, type VideoFA } from '@/lib/fritesAtelier'
import { breadcrumbSchema, faqSchema, ld } from '@/lib/schema'
import FormularioProspecto from '@/components/landing/FormularioProspecto'

/**
 * Página de Frites Atelier (S206). Lleva los colores de la marca (azul #212B55, crema #FAF3E4, oro #C9A25B) y letra
 * con remate del sistema: no carga fuentes nuevas. El video usa `preload="none"`: no se baja nada hasta que alguien
 * aprieta reproducir, porque cada bajada sale del consumo de Supabase.
 */
const AZUL = '#212B55'
const CREMA = '#FAF3E4'
const ORO = '#C9A25B'
const ORO_OSCURO = '#7A5C22' // el oro no se lee sobre crema: 5.6:1 con este tono
const SERIF = { fontFamily: 'Georgia, "Times New Roman", serif' }

const foto = (n: string) => asset(`/frites-atelier/${n}.webp`)

export function VideoFritesAtelier({ v }: { v: Pick<VideoFA, 'archivo' | 'titulo' | 'vertical'> }) {
  return (
    <video
      controls
      playsInline
      preload="none"
      poster={`${MEDIOS_FA}${v.archivo}.webp`}
      aria-label={v.titulo}
      className={`w-full bg-black ${v.vertical ? 'aspect-[9/16]' : 'aspect-video'}`}
    >
      <source src={`${MEDIOS_FA}${v.archivo}.mp4`} type="video/mp4" />
    </video>
  )
}

export default function PaginaFritesAtelier({ t }: { t: TextosFA }) {
  const es = t.idioma === 'es'
  const productos = porSkus(SKUS_FA)
  const migas = es
    ? [{ nombre: 'Inicio', url: '/' }, { nombre: 'Marcas', url: '/marcas/' }, { nombre: 'Frites Atelier' }]
    : [{ nombre: 'Inicio', url: '/' }, { nombre: 'Frites Atelier', url: '/frites-atelier/' }, { nombre: 'English' }]

  return (
    <div lang={es ? 'es-MX' : 'en'}>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(breadcrumbSchema(migas))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(faqSchema(t.faq))} />

      {/* Portada */}
      <section style={{ background: AZUL }} className="text-white">
        <div className="contenedor grid items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.16em]" style={{ color: ORO }}>
              {t.eyebrow}
            </p>
            <img
              src={foto('logo-frites-atelier')}
              alt=""
              aria-hidden="true"
              width={640}
              height={563}
              className="mt-6 h-auto w-56 sm:w-64"
            />
            <h1 className="sr-only">{es ? 'Frites Atelier para México' : 'Frites Atelier for Mexico'}</h1>
            <p className="mt-7 max-w-xl text-[19px] leading-relaxed" style={{ ...SERIF, color: CREMA }}>
              {t.sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a data-chat href={waLink(t.mensajeDegustar)} className="btn-primario">
                {t.ctaDegustar}
              </a>
              <a href="#productos" className="btn-fantasma">
                {t.ctaVer}
              </a>
              {es ? (
                <Link href="/frites-atelier/en/" className="btn-fantasma">
                  English
                </Link>
              ) : (
                <Link href="/frites-atelier/" className="btn-fantasma">
                  Español
                </Link>
              )}
            </div>
          </div>
          <img
            src={foto('charola')}
            alt={es ? 'Charola de Frites Atelier servida en la mesa' : 'A tray of Frites Atelier served at the table'}
            width={933}
            height={1400}
            fetchPriority="high"
            className="mx-auto max-h-[560px] w-auto object-cover"
          />
        </div>
        <div className="border-t" style={{ borderColor: 'rgba(201,162,91,.35)' }}>
          <dl className="contenedor grid grid-cols-2 gap-5 py-6 lg:grid-cols-4">
            {t.chips.map((c) => (
              <div key={c.etiqueta}>
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: ORO }}>
                  {c.etiqueta}
                </dt>
                <dd className="mt-1 text-[15px]" style={{ color: CREMA }}>
                  {c.valor}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* La marca */}
      <section style={{ background: CREMA }} className="py-16 sm:py-20">
        <div className="contenedor grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <img
            src={foto('sergio-herman')}
            alt={es ? 'El chef Sergio Herman afuera de un atelier' : 'Chef Sergio Herman outside an atelier'}
            width={933}
            height={1400}
            loading="lazy"
            className="mx-auto max-h-[600px] w-auto"
          />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: ORO_OSCURO }}>
              {t.marcaEyebrow}
            </p>
            <h2 className="mt-3 text-[1.9rem] leading-tight sm:text-[2.4rem]" style={{ ...SERIF, color: AZUL }}>
              {t.marcaTitulo}
            </h2>
            {t.marcaParrafos.map((p) => (
              <p key={p} className="mt-5 max-w-prosa text-[16.5px] leading-relaxed" style={{ color: '#3A4266' }}>
                {p}
              </p>
            ))}
            <blockquote className="mt-8 border-l-2 pl-5" style={{ borderColor: ORO }}>
              <p className="text-[18px] italic leading-relaxed" style={{ ...SERIF, color: AZUL }}>
                {t.cita}
              </p>
              <footer className="mt-2 text-[14px] font-semibold" style={{ color: ORO_OSCURO }}>
                {t.citaAutor}
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section style={{ background: AZUL }} className="py-16 sm:py-20">
        <div className="contenedor">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: ORO }}>
            {t.pilaresEyebrow}
          </p>
          <h2 className="mt-3 text-[1.9rem] leading-tight text-white sm:text-[2.4rem]" style={SERIF}>
            {t.pilaresTitulo}
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {t.pilares.map((p) => (
              <article key={p.n}>
                <img
                  src={foto(p.foto)}
                  alt={p.alt}
                  width={667}
                  height={500}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <p className="mt-5 font-mono text-[12px]" style={{ color: ORO }}>
                  {p.n}
                </p>
                <h3 className="mt-1 text-[1.35rem] text-white" style={SERIF}>
                  {p.titulo}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed" style={{ color: CREMA }}>
                  {p.texto}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* La visita */}
      <section style={{ background: CREMA }} className="py-16 sm:py-20">
        <div className="contenedor">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: ORO_OSCURO }}>
            {t.visitaEyebrow}
          </p>
          <h2 className="mt-3 text-[1.9rem] leading-tight sm:text-[2.4rem]" style={{ ...SERIF, color: AZUL }}>
            {t.visitaTitulo}
          </h2>
          <p className="mt-4 max-w-prosa text-[16.5px] leading-relaxed" style={{ color: '#3A4266' }}>
            {t.visitaTexto}
          </p>
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {t.visitaFotos.map((f) => (
              <img
                key={f.foto}
                src={foto(f.foto)}
                alt={f.alt}
                width={900}
                height={1200}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            ))}
          </div>

          <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: ORO_OSCURO }}>
            {t.videosEyebrow}
          </p>
          <h3 className="mt-2 text-[1.5rem]" style={{ ...SERIF, color: AZUL }}>
            {t.videosTitulo}
          </h3>
          <div className="mt-7 grid grid-cols-2 items-start gap-5 lg:grid-cols-4">
            {t.videos.map((v) => (
              <figure key={v.archivo} className={v.vertical ? '' : 'col-span-2'}>
                <VideoFritesAtelier v={v} />
                <figcaption className="mt-3">
                  <b className="block text-[15.5px]" style={{ ...SERIF, color: AZUL }}>
                    {v.titulo}
                  </b>
                  <span className="text-[14px] leading-snug" style={{ color: '#3A4266' }}>
                    {v.texto}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="contenedor">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: ORO_OSCURO }}>
            {t.productosEyebrow}
          </p>
          <h2 className="mt-3 text-[1.9rem] leading-tight sm:text-[2.4rem]" style={{ ...SERIF, color: AZUL }}>
            {t.productosTitulo}
          </h2>
          <p className="mt-4 max-w-prosa text-[16.5px] leading-relaxed text-humo">{t.productosIntro}</p>
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productos.map((p) => (
              <article key={p.sku} className="flex flex-col border border-hielo-300">
                <img
                  src={fotoChica(p.imagen)}
                  alt={`${p.nombre}, código ${p.sku}`}
                  width={400}
                  height={400}
                  loading="lazy"
                  className="aspect-square w-full object-contain"
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fry-700">{p.sku}</p>
                  <h3 className="mt-1 font-display text-[16px] font-bold leading-snug text-navy">{p.nombre}</h3>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-humo">{t.productos[p.sku]}</p>
                  <p className="mt-2 text-[13px] text-humo-400">{p.presentacion}</p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    <a
                      data-chat
                      href={waLink(`Hola, quiero precio del código ${p.sku} — ${p.nombre}.`)}
                      className="font-display text-[14px] font-semibold text-fry-700 hover:underline"
                    >
                      {t.preguntarPrecio}
                    </a>
                    <Link href={rutaFicha(p.sku)} className="font-display text-[14px] font-semibold text-navy hover:underline">
                      {t.verFicha}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Vender más */}
      <section style={{ background: AZUL }} className="py-14 sm:py-16">
        <div className="contenedor grid items-center gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: ORO }}>
              {t.venderEyebrow}
            </p>
            <h2 className="mt-3 text-[1.8rem] leading-tight text-white sm:text-[2.2rem]" style={SERIF}>
              {t.venderTitulo}
            </h2>
            <p className="mt-4 max-w-prosa text-[16px] leading-relaxed" style={{ color: CREMA }}>
              {t.venderTexto}
            </p>
          </div>
          <div>
            <Link href="/como-vender-mas-papa/" className="btn-primario">
              {t.venderCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Preguntas */}
      <section style={{ background: CREMA }} className="py-16 sm:py-20">
        <div className="contenedor">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: ORO_OSCURO }}>
            {t.faqEyebrow}
          </p>
          <h2 className="mt-3 text-[1.9rem] leading-tight" style={{ ...SERIF, color: AZUL }}>
            {t.faqTitulo}
          </h2>
          <div className="mt-7 max-w-3xl divide-y" style={{ borderColor: 'rgba(33,43,85,.2)' }}>
            {t.faq.map((f) => (
              <details key={f.p} className="group py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <h3 className="text-[17px] font-semibold" style={{ color: AZUL }}>
                    {f.p}
                  </h3>
                  <span aria-hidden="true" className="mt-1 font-mono transition-transform group-open:rotate-45" style={{ color: ORO_OSCURO }}>
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-prosa text-[15.5px] leading-relaxed" style={{ color: '#3A4266' }}>
                  {f.r}
                  {es && f.p.startsWith('¿Hasta dónde') && (
                    <>
                      {' '}
                      <Link href="/cobertura/" className="font-semibold underline">
                        Ver cobertura
                      </Link>
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      {es ? (
        <section className="bg-white py-16 sm:py-20">
          <div className="contenedor max-w-2xl">
            <h2 className="text-[1.8rem] leading-tight" style={{ ...SERIF, color: AZUL }}>
              ¿La quieres probar en tu cocina?
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-humo">
              Déjanos tus datos y un asesor te contacta para la degustación o la cotización.
            </p>
            <div className="mt-7">
              <FormularioProspecto producto="Frites Atelier" titulo="Cuéntanos de tu negocio" />
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-white py-14">
          <div className="contenedor">
            <h2 className="text-[1.8rem] leading-tight" style={{ ...SERIF, color: AZUL }}>
              Talk to MACSA
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <a data-chat href={waLink(t.mensajeDegustar)} className="btn-primario">
                {t.ctaDegustar}
              </a>
              <Link href="/nosotros/" className="font-display self-center text-[15px] font-semibold text-navy underline">
                About MACSA (Spanish)
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
