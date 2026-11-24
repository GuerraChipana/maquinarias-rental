import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import ClientProviders from '@/shared/providers/ClientProviders'
import { EMPRESA } from '@/shared/config/empresa'
import { SITE_URL, absoluteSiteUrl } from '@/shared/config/seo'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const siteDescription =
  'Alquiler de maquinaria pesada en Pisco e Ica: excavadoras, retroexcavadoras, tractores, compactadoras, volquetes y camiones cisterna para minería y construcción. Solicita una cotización a MAVTEC.'

export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  title: {
    default: 'Alquiler de Maquinaria Pesada en Pisco e Ica | MAVTEC',
    template: '%s | MAVTEC E.I.R.L.',
  },
  description: siteDescription,
  applicationName: 'MAVTEC E.I.R.L.',
  keywords: [
    'alquiler de maquinaria pesada en Pisco',
    'alquiler de maquinaria pesada en Ica',
    'alquiler de excavadoras en Pisco',
    'alquiler de retroexcavadoras en Ica',
    'alquiler de compactadoras',
    'alquiler de tractores sobre orugas',
    'alquiler de volquetes',
    'camiones cisterna en Pisco',
    'transporte de agua para minería',
    'maquinaria para obras civiles',
    'MAVTEC E.I.R.L.',
  ],
  authors: [{ name: EMPRESA.nombre }],
  creator: EMPRESA.nombre,
  publisher: EMPRESA.nombre,
  alternates: SITE_URL ? { canonical: '/' } : undefined,
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    siteName: EMPRESA.nombre,
    title: 'Alquiler de Maquinaria Pesada en Pisco e Ica | MAVTEC',
    description: siteDescription,
    url: SITE_URL,
    images: [
      {
        url: '/images/movimiento-de-tierra-2.png',
        alt: 'Maquinaria pesada para proyectos de minería y construcción en Pisco e Ica - MAVTEC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alquiler de Maquinaria Pesada en Pisco e Ica | MAVTEC',
    description: siteDescription,
    images: ['/images/movimiento-de-tierra-2.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/MAVTEC_ICON.svg',
    shortcut: '/MAVTEC_ICON.svg',
  },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': absoluteSiteUrl('/#negocio'),
  name: EMPRESA.nombre,
  legalName: EMPRESA.nombre,
  description: siteDescription,
  url: SITE_URL,
  image: absoluteSiteUrl('/images/movimiento-de-tierra-2.png'),
  logo: absoluteSiteUrl('/MAVTEC_ICON.svg'),
  telephone: '+51957682641',
  email: EMPRESA.contacto.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Pisco',
    addressRegion: 'Ica',
    addressCountry: 'PE',
  },
  areaServed: [
    { '@type': 'City', name: 'Pisco, Ica, Perú' },
    { '@type': 'AdministrativeArea', name: 'Ica, Perú' },
  ],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Alquiler de maquinaria pesada',
        serviceType: 'Alquiler de equipos para minería, construcción y obras civiles',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Servicio de camiones cisterna y transporte de agua',
      },
    },
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': absoluteSiteUrl('/#sitio-web'),
  name: EMPRESA.nombre,
  url: SITE_URL,
  inLanguage: 'es-PE',
  publisher: absoluteSiteUrl('/#negocio')
    ? { '@id': absoluteSiteUrl('/#negocio') }
    : undefined,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [localBusinessJsonLd, websiteJsonLd],
  }).replace(/</g, '\\u003c')

  return (
    <html
      lang="es-PE"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${montserrat.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased bg-white text-gray-900 overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
