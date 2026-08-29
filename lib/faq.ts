import type { Familia } from './familias'

/**
 * Preguntas que aplican a cualquier familia. Todas se responden con hechos
 * de la base de conocimiento — ninguna inventa una política que no existe.
 */
export function faqBase(f: Familia): { p: string; r: string }[] {
  return [
    {
      p: `¿Le venden ${f.nombre.toLowerCase()} a particulares?`,
      r: 'No. Vendemos exclusivamente a negocios: restaurantes, cocinas, fast food, barras y comedores. No hay venta al público en general.',
    },
    {
      p: '¿Hasta qué hora puedo pedir para que me llegue mañana?',
      r: 'El corte es a las 20:00, hora de Monterrey. Dentro del corte, la entrega es al día siguiente; después del corte, a los dos días. No se programa domingo.',
    },
    {
      p: '¿Necesito factura para comprar?',
      r: 'Para facturar necesitamos los datos fiscales del negocio, pero también se puede trabajar con remisión, sin factura. El alta se hace el mismo día.',
    },
    {
      p: '¿Puedo probar el producto antes de comprarlo?',
      r: 'Sí. Lo habitual antes del primer pedido es una muestra sin compromiso: te la llevamos para que la pruebes en tu cocina.',
    },
    {
      p: '¿Siempre tienen el mismo producto disponible?',
      r: 'Sí. Trabajamos con marcas de línea y existencia continua, no con saldos ni productos de oportunidad: el mismo código está disponible cada vez que lo vuelves a pedir.',
    },
  ]
}
