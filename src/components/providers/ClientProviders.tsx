'use client';

import { CotizacionProvider } from '@/components/cotizacion/ModalCotizacion';
import { Toaster } from 'sonner';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CotizacionProvider>
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
      {children}
    </CotizacionProvider>
  );
}

