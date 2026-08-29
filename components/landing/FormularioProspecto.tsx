'use client'

import { useState } from 'react'
import { LEAD_ENDPOINT, waLink } from '@/lib/site'

/**
 * El prospecto entra a macsa-crm, no a un correo.
 *
 * Mientras `NEXT_PUBLIC_LEAD_ENDPOINT` esté vacío, el formulario NO se rompe
 * ni finge que envió: arma el mensaje y lo abre en WhatsApp. Es la caída
 * honesta — el visitante siempre termina hablando con alguien.
 *
 * Se capturan `utm_*` y `gclid` de la URL para que la campaña viaje con el
 * prospecto hasta el CRM. Sin eso, no se sabe qué página trajo la venta.
 */

type Estado = 'listo' | 'enviando' | 'enviado' | 'error'

function parametrosDeCampana() {
  if (typeof window === 'undefined') return {}
  const q = new URLSearchParams(window.location.search)
  const campos = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid']
  const salida: Record<string, string> = {}
  for (const c of campos) {
    const v = q.get(c)
    if (v) salida[c] = v
  }
  salida.pagina = window.location.pathname
  return salida
}

export default function FormularioProspecto({
  ciudad,
  producto,
  titulo = 'Cuéntanos qué necesita tu cocina',
}: {
  ciudad?: string
  producto?: string
  titulo?: string
}) {
  const [estado, setEstado] = useState<Estado>('listo')

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const datos = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>

    const mensaje =
      `Hola, soy ${datos.nombre} de ${datos.negocio}` +
      `${datos.ciudad ? ` en ${datos.ciudad}` : ''}. ` +
      `${datos.necesito || 'Quiero información de sus productos.'}`

    // Sin endpoint configurado: se abre WhatsApp con el mensaje ya redactado.
    if (!LEAD_ENDPOINT) {
      window.open(waLink(mensaje), '_blank', 'noopener')
      setEstado('enviado')
      return
    }

    setEstado('enviando')
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...datos,
          ...parametrosDeCampana(),
          origen: 'sitio-web',
          producto: producto ?? null,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setEstado('enviado')
    } catch {
      setEstado('error')
    }
  }

  if (estado === 'enviado') {
    return (
      <div className="border-l-4 border-ruta bg-white p-7">
        <h3 className="font-display text-[19px] font-bold text-navy">Listo, ya lo recibimos</h3>
        <p className="mt-3 max-w-prosa leading-relaxed text-humo">
          Un asesor te contacta hoy mismo. Si prefieres adelantarlo, escríbenos directo por
          WhatsApp y te atendemos al momento.
        </p>
        <a href={waLink('Hola, acabo de llenar el formulario del sitio.')} className="btn-primario mt-5">
          Escribir por WhatsApp
        </a>
      </div>
    )
  }

  const campo =
    'w-full border border-hielo-300 bg-white px-4 py-3 text-[15px] text-humo-900 ' +
    'placeholder:text-humo-300 focus:border-fry focus:outline-none'
  const etiqueta = 'block font-display text-[13px] font-semibold text-navy'

  return (
    <form onSubmit={enviar} className="border border-hielo-300 bg-white p-7">
      <h3 className="font-display text-[19px] font-bold text-navy">{titulo}</h3>
      <p className="mt-2 max-w-prosa text-[14.5px] leading-relaxed text-humo">
        Te contestamos hoy mismo con precio y disponibilidad. Venta exclusiva a negocios.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={etiqueta}>Tu nombre</span>
          <input name="nombre" required autoComplete="name" className={`${campo} mt-1.5`} />
        </label>
        <label className="block">
          <span className={etiqueta}>Nombre del negocio</span>
          <input name="negocio" required autoComplete="organization" className={`${campo} mt-1.5`} />
        </label>
        <label className="block">
          <span className={etiqueta}>WhatsApp o teléfono</span>
          <input
            name="telefono"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={`${campo} mt-1.5`}
          />
        </label>
        <label className="block">
          <span className={etiqueta}>Ciudad</span>
          <input
            name="ciudad"
            defaultValue={ciudad ?? ''}
            autoComplete="address-level2"
            className={`${campo} mt-1.5`}
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className={etiqueta}>¿Qué necesitas?</span>
        <textarea
          name="necesito"
          rows={3}
          defaultValue={producto ? `Me interesa ${producto}.` : ''}
          placeholder="Producto, volumen aproximado y con qué frecuencia lo pides."
          className={`${campo} mt-1.5 resize-y`}
        />
      </label>

      {estado === 'error' && (
        <p className="mt-4 border-l-4 border-fry bg-fry-100 px-4 py-3 text-[14px] text-humo-900">
          No se pudo enviar. Escríbenos por WhatsApp y te atendemos al momento —{' '}
          <a href={waLink('Hola, el formulario del sitio no me dejó enviar.')} className="font-semibold text-fry-700">
            abrir WhatsApp
          </a>
          .
        </p>
      )}

      <button type="submit" disabled={estado === 'enviando'} className="btn-primario mt-6 disabled:opacity-60">
        {estado === 'enviando' ? 'Enviando…' : 'Que me contacten'}
      </button>

      <p className="mt-4 text-[12.5px] leading-relaxed text-humo-400">
        Usamos tus datos sólo para atender esta solicitud. Ver{' '}
        <a href="/aviso-de-privacidad/" className="underline">
          aviso de privacidad
        </a>
        .
      </p>
    </form>
  )
}
