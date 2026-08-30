import { waLink } from '@/lib/site'

/**
 * Boton flotante de WhatsApp — regla de la anatomia: va en TODAS las paginas.
 *
 * Va a la IZQUIERDA porque la burbuja de MacsaIA se pinta a la derecha
 * (`posicion: "derecha"` en la configuracion del bot). Si las dos van al
 * mismo lado se encinan y ninguna se puede tocar en movil.
 */
export default function WhatsAppFab({ mensaje }: { mensaje?: string }) {
  return (
    <a
      href={waLink(mensaje ?? 'Hola, quiero información de sus productos.')}
      className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center
                 rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-105"
      aria-label="Escribir por WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35M12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.18 4.22-9.4 9.41-9.4a9.34 9.34 0 0 1 6.65 2.76 9.32 9.32 0 0 1 2.75 6.65c0 5.18-4.22 9.41-9.4 9.41M20.5 3.49A11.8 11.8 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.24-1.64a11.9 11.9 0 0 0 5.8 1.48h.01c6.58 0 11.93-5.35 11.94-11.93a11.86 11.86 0 0 0-3.49-8.42" />
      </svg>
    </a>
  )
}
