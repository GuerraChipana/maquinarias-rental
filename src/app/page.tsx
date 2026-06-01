import Navbar      from '@/components/sections/Navbar'
import Hero        from '@/components/sections/Hero'
import Servicios   from '@/components/sections/Servicios'
import Catalogo    from '@/components/sections/Catalogo'
import Nosotros    from '@/components/sections/Nosotros'
import Testimonios from '@/components/sections/Testimonios'
import Contacto    from '@/components/sections/Contacto'
import Footer      from '@/components/sections/Footer'
import { CotizacionProvider } from '@/components/cotizacion/ModalCotizacion'
import { Toaster } from 'sonner'

/*
 * Sprint 7 → API route /api/cotizacion + Resend (email real)
 * Sprint 8 → Deploy en Vercel
 */

export default function HomePage() {
  return (
    /* CotizacionProvider envuelve todo: provee el context + botón flotante + modal */
    <CotizacionProvider>

      {/* Toast notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#142e55',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#ffffff',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '13px',
          },
        }}
      />

      <div className="min-h-screen bg-[#0e2140]">
        {/* ── Sprint 2 ✅ ── */}
        <Navbar />
        <Hero />

        {/* ── Sprint 3 ✅ ── */}
        <Servicios />
        <Catalogo />

        {/* ── Sprint 4 ✅ ── */}
        <Nosotros />
        <Testimonios />

        {/* ── Sprint 5 ✅ ── */}
        <Contacto />
        <Footer />
      </div>

      {/*
        El botón flotante naranja y el modal de cotización
        se renderizan automáticamente dentro de CotizacionProvider
      */}

    </CotizacionProvider>
  )
}