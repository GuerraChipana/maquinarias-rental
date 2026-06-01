import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import { EMPRESA } from '@/lib/constants'

// ─── Fuentes ──────────────────────────────────────────────────

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
})

const montserrat = Montserrat({
  subsets:  ['latin'],
  variable: '--font-montserrat',
  display:  'swap',
  weight:   ['400', '500', '600', '700', '800'],
})

// ─── SEO Metadata ─────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default:  `${EMPRESA.nombre} | Alquiler de Maquinaria Pesada – Pisco, Ica`,
    template: `%s | ${EMPRESA.nombre}`,
  },
  description: EMPRESA.descripcion,
  keywords:    [...EMPRESA.seo.palabrasClave],
  authors:     [{ name: EMPRESA.nombre }],
  creator:     EMPRESA.nombre,

  openGraph: {
    type:        'website',
    locale:      'es_PE',
    siteName:    EMPRESA.nombre,
    title:       `${EMPRESA.nombre} | Alquiler de Maquinaria Pesada`,
    description: EMPRESA.descripcion,
    images: [
      {
        url:    '/public/MAVTEC-LOGO.svg',   // Agregar imagen 1200x630 en /public
        width:  1200,
        height: 630,
        alt:    `${EMPRESA.nombre} - Maquinaria Pesada`,
      },
    ],
  },

  twitter: {
    card:        'summary_large_image',
    title:       `${EMPRESA.nombre} | Maquinaria Pesada Pisco`,
    description: EMPRESA.descripcion,
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:  true,
      follow: true,
    },
  },

  // Icono del sitio — colocar favicons en /public
  icons: {
    icon:    '/MAVTEC_ICON.svg',
    apple:   '/apple-touch-icon.png',
    shortcut:'/favicon-32x32.png',
  },
}

// ─── Layout Principal ─────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${montserrat.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased bg-white text-gray-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}