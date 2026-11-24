import Navbar from '@/shared/components/layout/Navbar';
import Footer from '@/shared/components/layout/Footer';

export default function CatalogoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0e2140] font-[Montserrat,sans-serif]">
      {/* ══ NAVBAR PRINCIPAL CON NAVEGACIÓN Y DRAWER MÓVIL ══ */}
      <Navbar />

      {/* ══ CONTENIDO DINÁMICO DEL CATÁLOGO ══ */}
      <main className="flex-1 bg-[#eef1f5]">
        {children}
      </main>

      {/* ══ FOOTER INDUSTRIAL DE CIERRE Y CONTACTO ══ */}
      <Footer />
    </div>
  );
}
