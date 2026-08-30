import Link from 'next/link'
import { asset, EMPRESA, waLink } from '@/lib/site'

const NAV = [
  { href: '/catalogo/', label: 'Catálogo' },
  { href: '/tienda/', label: 'Tienda' },
  { href: '/marcas/', label: 'Marcas' },
  { href: '/cobertura/', label: 'Cobertura' },
  { href: '/consejos/', label: 'Consejos' },
  { href: '/cadena-de-frio/', label: 'Cadena de frío' },
  { href: '/nosotros/', label: 'Nosotros' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-hielo-300 bg-white/95 backdrop-blur">
      <div className="contenedor flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label={`${EMPRESA.nombre} — inicio`}>
          <img
            src={asset('/isotipo-macsa.png')}
            alt=""
            aria-hidden="true"
            width={38}
            height={36}
            className="h-9 w-auto"
          />
          <span className="leading-none">
            <span className="block font-display text-[17px] font-bold tracking-tight text-navy">
              MACSA
            </span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-humo-400">
              Foodservice
            </span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="font-display text-[14px] font-semibold text-humo-700 transition-colors hover:text-fry-700"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={EMPRESA.portalUrl}
            className="hidden font-display text-[14px] font-semibold text-navy-600 hover:text-fry-700 sm:inline"
          >
            Entrar al portal
          </a>
          <a
            href={waLink('Hola, quiero información de sus productos.')}
            className="btn-primario !px-4 !py-2 text-[14px]"
          >
            Pedir por WhatsApp
          </a>
        </div>
      </div>

      {/* Nav móvil: barra secundaria desplazable */}
      <div className="border-t border-hielo-200 lg:hidden">
        <nav aria-label="Secciones" className="contenedor flex gap-5 overflow-x-auto py-2.5">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="whitespace-nowrap font-display text-[13px] font-semibold text-humo-500"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
