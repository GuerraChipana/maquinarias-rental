import type { Metadata } from 'next'
import CatalogoExplorer from '@/modules/catalogo/components/CatalogoExplorer'
import { SITE_URL } from '@/shared/config/seo'

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

export default function CatalogoPage() {
  return <CatalogoExplorer />
}
