/**
 * Las 26 ciudades y su MODO DE ENTREGA.
 *
 * Regla de oro del proyecto: una página nunca promete más de lo que la
 * operación sostiene. El modo decide qué dice la sección de cobertura y,
 * en el caso de `consulta`, la página no promete entrega — sólo captura.
 *
 * ⚠️ La zona de Tampico (Tampico, Ciudad Madero, Altamira y Ciudad Victoria)
 * y con ella el modo `dedicado` se RETIRARON el 2026-08-31 por instrucción de
 * Edgar: anunciarse ahí hace ruido con el distribuidor que ya atiende esa
 * zona. No es un olvido — no reponerlas sin que Edgar lo pida.
 * Reynosa, Nuevo Laredo y Matamoros se quedan: son la frontera, otra zona,
 * y siguen en `consulta`, que no promete entrega.
 */

export type Modo = 'diaria' | 'desarrollo' | 'corredor' | 'consulta'

export type Estado = 'Nuevo León' | 'Tamaulipas' | 'Coahuila'

export interface Ciudad {
  slug: string
  nombre: string
  estado: Estado
  /** Código ISO para la meta geo.region */
  region: 'MX-NLE' | 'MX-TAM' | 'MX-COA'
  modo: Modo
  /** Ventaja propia de esa ciudad que el modo no alcanza a decir. */
  nota?: string
}

export const MODOS: Record<
  Modo,
  { titulo: string; promesa: string; detalle: string; color: string }
> = {
  diaria: {
    titulo: 'Ruta diaria',
    promesa: 'Entrega al día siguiente',
    detalle:
      'Reparto propio todos los días. El pedido que entra antes de las 20:00 se entrega al día siguiente; después del corte, a los dos días. Nunca se programa domingo.',
    color: 'ruta',
  },
  desarrollo: {
    titulo: 'Ruta en desarrollo',
    promesa: 'Días fijos de reparto',
    detalle:
      'Zona de crecimiento activo con reparto en días fijos. Confirmamos el día de tu zona al levantar el primer pedido.',
    color: 'ruta',
  },
  corredor: {
    titulo: 'Corredor Saltillo — Torreón',
    promesa: 'Entrega aprovechando la ruta',
    detalle:
      'Ya hacemos el viaje a Torreón y Saltillo queda en el camino, así que la entrega no carga un flete dedicado. Se programa con la salida de la semana.',
    color: 'navy',
  },
  consulta: {
    titulo: 'Bajo consulta',
    promesa: 'Consulta disponibilidad',
    detalle:
      'Todavía no tenemos ruta establecida en esta ciudad. Déjanos lo que necesitas: si el volumen lo permite, te confirmamos cómo hacértelo llegar.',
    color: 'humo',
  },
}

export const CIUDADES: Ciudad[] = [
  // ── Modo 1 · Ruta diaria — área metropolitana de Monterrey ──────────
  { slug: 'monterrey', nombre: 'Monterrey', estado: 'Nuevo León', region: 'MX-NLE', modo: 'diaria' },
  { slug: 'guadalupe', nombre: 'Guadalupe', estado: 'Nuevo León', region: 'MX-NLE', modo: 'diaria' },
  { slug: 'san-nicolas-de-los-garza', nombre: 'San Nicolás de los Garza', estado: 'Nuevo León', region: 'MX-NLE', modo: 'diaria' },
  { slug: 'apodaca', nombre: 'Apodaca', estado: 'Nuevo León', region: 'MX-NLE', modo: 'diaria' },
  { slug: 'general-escobedo', nombre: 'General Escobedo', estado: 'Nuevo León', region: 'MX-NLE', modo: 'diaria' },
  { slug: 'santa-catarina', nombre: 'Santa Catarina', estado: 'Nuevo León', region: 'MX-NLE', modo: 'diaria' },
  { slug: 'san-pedro-garza-garcia', nombre: 'San Pedro Garza García', estado: 'Nuevo León', region: 'MX-NLE', modo: 'diaria' },
  { slug: 'garcia', nombre: 'García', estado: 'Nuevo León', region: 'MX-NLE', modo: 'diaria' },
  { slug: 'juarez-nuevo-leon', nombre: 'Juárez', estado: 'Nuevo León', region: 'MX-NLE', modo: 'diaria' },
  { slug: 'cadereyta-jimenez', nombre: 'Cadereyta Jiménez', estado: 'Nuevo León', region: 'MX-NLE', modo: 'diaria' },
  { slug: 'salinas-victoria', nombre: 'Salinas Victoria', estado: 'Nuevo León', region: 'MX-NLE', modo: 'diaria' },
  { slug: 'pesqueria', nombre: 'Pesquería', estado: 'Nuevo León', region: 'MX-NLE', modo: 'diaria' },
  { slug: 'cienega-de-flores', nombre: 'Ciénega de Flores', estado: 'Nuevo León', region: 'MX-NLE', modo: 'diaria' },
  { slug: 'el-carmen', nombre: 'El Carmen', estado: 'Nuevo León', region: 'MX-NLE', modo: 'diaria' },
  { slug: 'santiago', nombre: 'Santiago', estado: 'Nuevo León', region: 'MX-NLE', modo: 'diaria' },

  // ── Modo 2 · Ruta en desarrollo — corredor sur de Nuevo León ────────
  { slug: 'allende-nuevo-leon', nombre: 'Allende', estado: 'Nuevo León', region: 'MX-NLE', modo: 'desarrollo' },
  { slug: 'montemorelos', nombre: 'Montemorelos', estado: 'Nuevo León', region: 'MX-NLE', modo: 'desarrollo' },
  { slug: 'linares', nombre: 'Linares', estado: 'Nuevo León', region: 'MX-NLE', modo: 'desarrollo' },

  // ── Modo 3 · Corredor Torreón ───────────────────────────────────────
  { slug: 'saltillo', nombre: 'Saltillo', estado: 'Coahuila', region: 'MX-COA', modo: 'corredor' },
  { slug: 'ramos-arizpe', nombre: 'Ramos Arizpe', estado: 'Coahuila', region: 'MX-COA', modo: 'corredor' },
  { slug: 'arteaga', nombre: 'Arteaga', estado: 'Coahuila', region: 'MX-COA', modo: 'corredor' },
  {
    slug: 'torreon',
    nombre: 'Torreón',
    estado: 'Coahuila',
    region: 'MX-COA',
    modo: 'corredor',
    nota: 'En Torreón contamos con una segunda bodega para tu mayor comodidad, con productos adicionales a los que viajan en la ruta.',
  },

  // ── Modo 4 · Bajo consulta ──────────────────────────────────────────
  { slug: 'reynosa', nombre: 'Reynosa', estado: 'Tamaulipas', region: 'MX-TAM', modo: 'consulta' },
  { slug: 'nuevo-laredo', nombre: 'Nuevo Laredo', estado: 'Tamaulipas', region: 'MX-TAM', modo: 'consulta' },
  { slug: 'matamoros-tamaulipas', nombre: 'Matamoros', estado: 'Tamaulipas', region: 'MX-TAM', modo: 'consulta' },
  { slug: 'monclova', nombre: 'Monclova', estado: 'Coahuila', region: 'MX-COA', modo: 'consulta' },
]

export const ESTADOS: { nombre: Estado; slug: string }[] = [
  { nombre: 'Nuevo León', slug: 'nuevo-leon' },
  { nombre: 'Tamaulipas', slug: 'tamaulipas' },
  { nombre: 'Coahuila', slug: 'coahuila' },
]

export const porModo = (modo: Modo) => CIUDADES.filter((c) => c.modo === modo)
export const porEstado = (estado: Estado) => CIUDADES.filter((c) => c.estado === estado)
export const ciudad = (slug: string) => CIUDADES.find((c) => c.slug === slug)
