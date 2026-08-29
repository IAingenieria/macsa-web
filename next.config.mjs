/** @type {import('next').NextConfig} */

// GitHub Pages sirve el sitio en un subdirectorio (/macsa-web), Cloudflare en
// la raiz. El prefijo se controla por entorno para que el MISMO codigo
// compile para los dos destinos sin tocar una sola linea.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig = {
  // Export estatico: el sitio se sirve como HTML plano, sin servidor.
  // Ninguna base de datos en el camino del render — el catalogo se lee de
  // data/catalogo.json en tiempo de build.
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: false },
}

export default nextConfig
