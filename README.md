# MACSA Foodservice — sitio web

Sitio estatico (Next.js 15 + export) para MACSA de la Sultana: distribuidor de
alimentos congelados para food service en Monterrey y su area metropolitana.

**Demo en linea:** https://iaingenieria.github.io/macsa-web/

> ⚠️ **Dominio provisional.** Mientras el sitio no viva en su dominio
> definitivo va con `noindex` y `robots.txt` en `Disallow: /`. No se manda el
> sitemap a Search Console hasta entonces: si se indexa el provisional, el
> cambio de dominio arrastra cientos de duplicados que hay que redirigir.
> Para publicarlo de verdad: cambiar `NEXT_PUBLIC_SITE_URL` y poner
> `NEXT_PUBLIC_NOINDEX=0`.

## Como esta armado

La matriz de dos ejes: **producto x ciudad**.

| Pieza | Que hace |
|---|---|
| `lib/familias.ts` | Eje 1 — las 14 lineas de producto y su narrativa |
| `lib/ciudades.ts` | Eje 2 — las 30 ciudades y su **modo de entrega** |
| `lib/catalogo.ts` | Limpia, reclasifica y calcula rendimiento del catalogo real |
| `data/catalogo.json` | Snapshot del catalogo (sin precios). Ver abajo |
| `components/landing/PaginaFamilia.tsx` | La pagina PILAR de una familia |
| `components/landing/PaginaGeo.tsx` | La plantilla producto x ciudad |
| `scripts/generar_geo.mjs` | Genera las paginas producto x ciudad |
| `scripts/sincronizar_catalogo.mjs` | Regenera el snapshot desde Supabase |

## Reglas que no se rompen

1. **El canonical se define por pagina, nunca en el layout raiz.** Un canonical
   global heredado hace que todas las paginas se declaren duplicado del home.
2. **Una pagina nunca promete mas de lo que la operacion sostiene.** Cada
   ciudad declara su modo de entrega; las que no tienen ruta lo dicen.
3. **No se publican precios.** Es decision de Jorge. `p1` es el precio de
   distribuidor y no puede salir jamas al navegador.
4. **Ninguna familia se genera por ciudad sin tener pilar escrito a mano.**
   Un pilar flojo produce 30 paginas flojas.
5. **Ninguna ficha sale con foto equivocada.** Solo foto del fabricante y del
   producto equivalente; sin coincidencia clara, sin foto.

## Comandos

```bash
npm install
npm run dev                      # desarrollo
node scripts/generar_geo.mjs     # genera producto x ciudad
npm run build                    # compila a out/
npm run typecheck
```

Para refrescar el catalogo (requiere acceso a la base):

```bash
SB_URL=https://<ref>.supabase.co SB_KEY=<key> node scripts/sincronizar_catalogo.mjs
```

## Despliegue

- **GitHub Pages** — automatico en cada push a `main` (`.github/workflows/deploy.yml`).
- **Cloudflare Workers** — `npx wrangler deploy` (sirve en la raiz, sin `basePath`).
