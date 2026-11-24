import type { MetadataRoute } from 'next'
import { getMaquinariasHibrido } from '@/modules/catalogo/actions/catalogo.actions'
import { SITE_URL } from '@/shared/config/seo'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!SITE_URL) return []

  const { maquinaria, categorias } = await getMaquinariasHibrido()
  const categoryUrls = categorias
    .filter(
      (categoria) =>
        categoria.id !== 'todas' &&
        maquinaria.some((item) => item.categoria === categoria.id),
    )
    .map((categoria) => ({
      url: new URL(
        `/catalogo/${encodeURIComponent(String(categoria.id))}`,
        SITE_URL,
      ).toString(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

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
    ...categoryUrls,
  ]
}
