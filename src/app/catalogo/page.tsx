import type { Metadata } from 'next'
import CatalogoExplorer from '@/modules/catalogo/components/CatalogoExplorer'
import { SITE_URL } from '@/shared/config/seo'
import { getMaquinariasHibrido } from '@/modules/catalogo/actions/catalogo.actions'

const description =
  'Explora el catálogo de MAVTEC: excavadoras, retroexcavadoras, tractores sobre orugas, compactadoras, volquetes y camiones cisterna para alquiler en Pisco e Ica.'

export const metadata: Metadata = {
  title: 'Catálogo de Maquinaria Pesada en Pisco e Ica',
  description,
  alternates: SITE_URL ? { canonical: '/catalogo' } : undefined,
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    title: 'Catálogo de Maquinaria Pesada | MAVTEC',
    description,
    url: SITE_URL ? new URL('/catalogo', SITE_URL).toString() : undefined,
    images: [
      {
        url: '/images/machines/excavadora.webp',
        alt: 'Excavadora de orugas disponible para alquiler en Pisco e Ica',
      },
    ],
  },
}

export default async function CatalogoPage() {
  const { maquinaria, categorias } = await getMaquinariasHibrido()

  const categoriasParaVista = categorias.some((categoria) => categoria.id === 'todas')
    ? categorias
    : [{ id: 'todas' as const, label: 'Todas las máquinas' }, ...categorias]

  return (
    <CatalogoExplorer
      initialMaquinarias={maquinaria}
      initialCategorias={categoriasParaVista}
    />
  )
}
