import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/shared/config/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    ...(SITE_URL ? { sitemap: new URL('/sitemap.xml', SITE_URL).toString() } : {}),
  }
}
