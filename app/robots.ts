import type { MetadataRoute } from 'next'
import { NOINDEX, SITE_URL } from '@/lib/site'

/**
 * Rastreadores de IA permitidos explícitamente (GEO).
 * En B2B esto pesa más que en cualquier otro giro: el comprador que le
 * pregunta a ChatGPT "¿quién distribuye Lamb Weston en Monterrey?" es
 * exactamente el prospecto que buscamos.
 */
const CRAWLERS_IA = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'Google-Extended',
  'PerplexityBot',
  'ClaudeBot',
  'anthropic-ai',
  'cohere-ai',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'Applebot-Extended',
  'YouBot',
  'AI2Bot',
  'Diffbot',
]

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  // Mientras el sitio esté en el dominio provisional: bloqueo total.
  // Es la única forma de que el cambio de dominio no deje mil URLs
  // indexadas que después haya que redirigir una por una.
  if (NOINDEX) {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }

  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...CRAWLERS_IA.map((bot) => ({ userAgent: bot, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
