import Navbar from '@/shared/components/layout/Navbar'
import Footer from '@/shared/components/layout/Footer'
import Hero from '@/modules/landing/components/Hero'
import Servicios from '@/modules/landing/components/Servicios'
import CatalogoPreview from '@/modules/landing/components/CatalogoPreview'
import Nosotros from '@/modules/landing/components/Nosotros'
import Testimonios from '@/modules/landing/components/Testimonios'
import Contacto from '@/modules/landing/components/Contacto'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0e2140]">
      <Navbar />
      <Hero />
      <Servicios />
      <CatalogoPreview />
      <Nosotros />
      <Testimonios />
      <Contacto />
      <Footer />
    </div>
  )
}
