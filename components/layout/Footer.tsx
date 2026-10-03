import Link from 'next/link'
import { asset, EMPRESA, telLink } from '@/lib/site'
import { FAMILIAS } from '@/lib/familias'
import { GIROS } from '@/lib/giros'
import { porModo } from '@/lib/ciudades'

export default function Footer() {
  const conRuta = [...porModo('diaria'), ...porModo('desarrollo')]

  return (
    <footer className="mt-24 border-t-4 border-fry bg-navy-900 text-hielo-200">
      <div className="contenedor grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* El logo es de un solo tono, asi que sobre el navy se invierte a
              blanco con un filtro en vez de cargar otra imagen. */}
          <img
            src={asset('/isotipo-macsa.png')}
            alt="MACSA"
            width={56}
            height={53}
            className="mb-4 h-12 w-auto brightness-0 invert"
          />
          <p className="font-display text-lg font-bold text-white">{EMPRESA.nombre}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fry">
            {EMPRESA.razonSocial}
          </p>
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-hielo-300">
            {EMPRESA.claim}
          </p>
          <address className="mt-5 not-italic text-[13px] leading-relaxed text-hielo-300">
            {EMPRESA.direccion.calle}
            <br />
            Col. {EMPRESA.direccion.colonia}, {EMPRESA.direccion.cp} {EMPRESA.direccion.ciudad}
            <br />
            {EMPRESA.direccion.estado}
          </address>
          <p className="mt-3 text-[13px] leading-relaxed text-hielo-300">
            {EMPRESA.horario.map((h) => `${h.etiqueta} ${h.abre}–${h.cierra}`).join(' · ')} · Domingo cerrado
          </p>
          <a
            href={EMPRESA.perfilGoogle}
            className="mt-2 inline-block text-[13px] font-semibold text-fry hover:text-white"
          >
            Ver en Google Maps
          </a>
        </div>

        <div>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-fry">Catálogo</h2>
          <ul className="mt-4 space-y-2 text-[14px]">
            {FAMILIAS.slice(0, 8).map((f) => (
              <li key={f.slug}>
                <Link href={`/${f.slug}/`} className="text-hielo-300 hover:text-white">
                  {f.nombre}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/catalogo/" className="font-semibold text-fry hover:text-white">
                Ver las 14 líneas
              </Link>
            </li>
            <li>
              <Link href="/tienda/" className="font-semibold text-fry hover:text-white">
                Tienda con ficha por código
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-fry">Tu negocio</h2>
          <ul className="mt-4 space-y-2 text-[14px]">
            {GIROS.slice(0, 7).map((g) => (
              <li key={g.slug} className="text-hielo-300">
                {g.nombre}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-fry">Contacto</h2>
          <ul className="mt-4 space-y-2 text-[14px]">
            {EMPRESA.whatsapp.map((w) => (
              <li key={w.e164}>
                <a href={`https://wa.me/${w.e164}`} className="text-hielo-300 hover:text-white">
                  WhatsApp {w.numero}
                </a>
              </li>
            ))}
            {EMPRESA.telefonos.map((t) => (
              <li key={t}>
                <a href={telLink(t)} className="text-hielo-300 hover:text-white">
                  Llamar al {t}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${EMPRESA.correo}`} className="text-hielo-300 hover:text-white">
                {EMPRESA.correo}
              </a>
            </li>
          </ul>
          <ul className="mt-5 space-y-2 text-[14px]">
            <li>
              <Link href="/alta-de-cliente/" className="text-hielo-300 hover:text-white">
                Darme de alta como cliente
              </Link>
            </li>
            <li>
              <Link href="/contacto/" className="text-hielo-300 hover:text-white">
                Contacto
              </Link>
            </li>
            <li>
              <Link href="/consejos/" className="text-hielo-300 hover:text-white">
                Consejos de cocina
              </Link>
            </li>
            <li>
              <Link href="/preguntas-frecuentes/" className="text-hielo-300 hover:text-white">
                Preguntas frecuentes
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Enlazado por silo: las ciudades con ruta, visibles en todo el sitio */}
      <div className="border-t border-navy-700">
        <div className="contenedor py-8">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-humo-400">
            Entregamos con ruta propia en
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-hielo-300">
            {conRuta.map((c) => c.nombre).join(' · ')}
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-humo-400">
            Y llegamos a Saltillo, Ramos Arizpe, Arteaga y Torreón sobre el corredor, con una
            segunda bodega en Torreón y más ciudades de Coahuila próximamente.{' '}
            <Link href="/cobertura/" className="font-semibold text-fry hover:text-white">
              Ver cobertura completa
            </Link>
          </p>
        </div>
      </div>

      <div className="border-t border-navy-700">
        <div className="contenedor flex flex-col gap-3 py-6 text-[12px] text-humo-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {EMPRESA.razonSocial} · Venta a negocios y a particulares con alta de cliente.
          </p>
          <Link href="/aviso-de-privacidad/" className="hover:text-white">
            Aviso de privacidad
          </Link>
        </div>
      </div>
    </footer>
  )
}
