import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/shared/config/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL) return []

  return [
    {
      url: SITE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: new URL('/catalogo', SITE_URL).toString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]
}
