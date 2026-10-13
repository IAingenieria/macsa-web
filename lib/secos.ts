import datos from '@/data/secos.json'

/**
 * SECO o CONGELADO (S182, 13-oct-2026). Fuente: `sku_clasificacion_macsa` (la del botón «Solicitud SECOS» del
 * CEDIS), regenerada con `python scripts/s182_secos.py`. Una página es SECA si todos sus códigos clasificados son
 * secos: entonces no habla de congelado ni de cadena de frío (Luis: «esta particularidad en secos no es relevante»).
 */
const SECO = new Set<string>([...datos.seco, ...datos.seco_por_linea, ...datos.seco_manual])
const CONGELADO = new Set<string>(datos.congelado)

export function esSeco(skus: string[]): boolean {
  const clasificados = skus.filter((s) => SECO.has(s) || CONGELADO.has(s))
  return clasificados.length > 0 && clasificados.every((s) => SECO.has(s))
}
