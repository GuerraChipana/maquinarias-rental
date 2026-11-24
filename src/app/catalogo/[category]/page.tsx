import export const revalidate = 60

type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CategoryCatalogView from '@/modules/catalogo/components/CategoryCatalogView'
import { getMaquinariasHibrido } from '@/modules/catalogo/actions/catalogo.actions'
import { SITE_URL } from '@/shared/config/seo'

type CategoryPageProps = {
  params: Promise<{ category: string }>
}

function normalizeCategory(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
}

async function getCategoryData(categorySlug: string) {
  const { maquinaria, categorias } = await getMaquinariasHibrido()
  const categoria = categorias.find(
    (item) => normalizeCategory(item.id) === normalizeCategory(categorySlug),
  )

  if (!categoria || categoria.id === 'todas') return null

  const maquinas = maquinaria.filter(
    (item) => normalizeCategory(item.categoria) === normalizeCategory(categoria.id),
  )

  if (maquinas.length === 0) return null
  return { categoria, maquinas }
}

export async function generateStaticParams() {
  const { maquinaria, categorias } = await getMaquinariasHibrido()

  return categorias
    .filter(
      (categoria) =>
        categoria.id !== 'todas' &&
        maquinaria.some(
          (item) =>
            normalizeCategory(item.categoria) === normalizeCategory(categoria.id),
        ),
    )
    .map((categoria) => ({ category: String(categoria.id) }))
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const data = await getCategoryData(category)

  if (!data) {
    return {
      title: 'Categoría de maquinaria no encontrada',
      robots: { index: false, follow: true },
    }
  }

  const label = data.categoria.label
  const title = `Alquiler de ${label} en Pisco e Ica`
  const description =
    `Encuentra ${label.toLowerCase()} para alquiler en Pisco e Ica. Consulta equipos, características y disponibilidad para proyectos de minería, construcción y obras civiles con MAVTEC.`
  const image = data.maquinas[0]?.imagen || '/images/machines/excavadora.webp'
  const canonicalPath = `/catalogo/${encodeURIComponent(category)}`

  return {
    title,
    description,
    alternates: SITE_URL ? { canonical: canonicalPath } : undefined,
    openGraph: {
      type: 'website',
      locale: 'es_PE',
      title: `${title} | MAVTEC`,
      description,
      url: SITE_URL ? new URL(canonicalPath, SITE_URL).toString() : undefined,
      images: [
        {
          url: image,
          alt: `${label} para alquiler en Pisco e Ica - MAVTEC`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | MAVTEC`,
      description,
      images: [image],
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const data = await getCategoryData(category)

  if (!data) notFound()

  return (
    <CategoryCatalogView
      maquinas={data.maquinas}
      categoryLabel={data.categoria.label}
    />
  )
}
