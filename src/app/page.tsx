import Navbar      from '@/components/sections/Navbar'
import Hero        from '@/components/sections/Hero'
import Servicios   from '@/components/sections/Servicios'
import Catalogo    from '@/components/sections/Catalogo'
import Nosotros    from '@/components/sections/Nosotros'
import Testimonios from '@/components/sections/Testimonios'
import Contacto    from '@/components/sections/Contacto'
import Footer      from '@/components/sections/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0e2140]">
      <Navbar />
      <Hero />
      <Servicios />
      <Catalogo />
      <Nosotros />
      <Testimonios />
      <Contacto />
      <Footer />
    </div>
  )
}
