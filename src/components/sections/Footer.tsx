'use client'

import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ChevronRight,
  ArrowUp,
} from 'lucide-react'
import { EMPRESA } from '@/lib/constants'

/* ── Nav links del footer ──────────────────────────────────── */
const NAV_COLS = [
  {
    titulo: 'Servicios',
    links: [
      { label: 'Maquinaria Pesada', href: '#catalogo' },
      { label: 'Camiones Cisterna', href: '#servicios' },
      { label: 'Agua Potable',      href: '#servicios' },
      { label: 'Con Operador',      href: '#servicios' },
    ],
  },
  {
    titulo: 'Empresa',
    links: [
      { label: 'Nosotros',    href: '#nosotros' },
      { label: 'Catálogo',    href: '#catalogo' },
      { label: 'Testimonios', href: '#testimonios' },
      { label: 'Contacto',    href: '#contacto' },
    ],
  },
  {
    titulo: 'Legal',
    links: [
      { label: 'Términos de servicio', href: '#' },
      { label: 'Política de privacidad', href: '#' },
    ],
  },
]

/* ── Scroll suave a sección ────────────────────────────────── */
function scrollTo(href: string) {
  if (href === '#') return
  const el = document.querySelector(href)
  el?.scrollIntoView({ behavior: 'smooth' })
}

/* ── Botón de scroll al top ────────────────────────────────── */
function ScrollTop() {
  return (
    <motion.button
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.93 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver al inicio"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/50 hover:border-[#F5A623]/40 hover:text-[#F5A623] transition-all duration-200"
    >
      <ArrowUp size={16} />
    </motion.button>
  )
}

/* ── Componente principal ──────────────────────────────────── */
export default function Footer() {
      const telefono = String(
    (EMPRESA as any).telefono ?? (EMPRESA as any).celular ?? ''
  )
  const whatsappMsg = encodeURIComponent(
    '¡Hola MAVTEC! Quisiera solicitar información sobre el alquiler de maquinaria pesada.'
  )
  const whatsappUrl = `https://wa.me/51${telefono.replace(/\s/g, '')}?text=${whatsappMsg}`

  const year = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-[#0a1a30] border-t border-white/[0.06] overflow-hidden">

      {/* ── Fondos decorativos ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 bg-[#1A3C6E]/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* ══ CTA BANNER SUPERIOR ════════════════════════════════ */}
      <div className="relative border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 lg:px-16 xl:px-24 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

            <div className="text-center lg:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623]/60 font-[Montserrat,sans-serif] mb-2">
                ¿Listo para empezar?
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-[Montserrat,sans-serif] leading-tight">
                Cotizá sin compromiso.{' '}
                <span className="text-[#F5A623]">Hoy.</span>
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white hover:bg-[#1db954] transition-colors font-[Montserrat,sans-serif] tracking-wide"
              >
                <MessageCircle size={16} />
                WhatsApp
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('#cotizacion')}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#F5A623]/40 bg-[#F5A623]/10 px-6 py-3 text-sm font-bold text-[#F5A623] hover:bg-[#F5A623]/15 transition-all font-[Montserrat,sans-serif] tracking-wide"
              >
                Solicitar cotización
                <ChevronRight size={14} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* ══ CUERPO DEL FOOTER ══════════════════════════════════ */}
      <div className="relative max-w-7xl mx-auto px-5 lg:px-16 xl:px-24 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-4">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-xl bg-[#F5A623] flex items-center justify-center shadow-lg shadow-[#F5A623]/20">
                <span className="text-[#1A3C6E] font-black text-lg leading-none">M</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-black text-xl tracking-[-0.03em] font-[Montserrat,sans-serif]">
                  MAVTEC
                </span>
                <span className="text-[#F5A623]/70 text-[10px] font-semibold tracking-[0.18em] uppercase font-[Montserrat,sans-serif]">
                  E.I.R.L
                </span>
              </div>
            </div>

            <p className="text-xs text-white/40 leading-relaxed font-[Montserrat,sans-serif] mb-6 max-w-xs">
              Alquiler de maquinaria pesada, camiones cisterna y suministro de
              agua potable en Pisco, Ica y toda la región sur del Perú.
            </p>

            {/* Contacto rápido */}
            <div className="space-y-2.5">
              <a
                href={`tel:+51${telefono.replace(/\s/g, '')}`}
                className="flex items-center gap-2.5 text-xs text-white/45 hover:text-[#F5A623] transition-colors font-[Montserrat,sans-serif] group"
              >
                <Phone size={12} className="text-white/25 group-hover:text-[#F5A623] transition-colors flex-shrink-0" />
                {EMPRESA.contacto.telefono}
              </a>
              <a
                href={`mailto:${EMPRESA.contacto.email}`}
                className="flex items-center gap-2.5 text-xs text-white/45 hover:text-[#F5A623] transition-colors font-[Montserrat,sans-serif] group"
              >
                <Mail size={12} className="text-white/25 group-hover:text-[#F5A623] transition-colors flex-shrink-0" />
                {EMPRESA.contacto.email}
              </a>
              <div className="flex items-center gap-2.5 text-xs text-white/45 font-[Montserrat,sans-serif]">
                <MapPin size={12} className="text-white/25 flex-shrink-0" />
                Pisco, Ica — Perú
              </div>
            </div>
          </div>

          {/* Col 2-4 — Nav columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {NAV_COLS.map(col => (
              <div key={col.titulo}>
                <h4 className="text-[10px] font-black uppercase tracking-[0.22em] text-[#F5A623]/60 font-[Montserrat,sans-serif] mb-4">
                  {col.titulo}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link.label}>
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="text-xs text-white/40 hover:text-white/75 transition-colors font-[Montserrat,sans-serif] text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Col 5 — Redes + QR ficticio WhatsApp */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-[10px] font-black uppercase tracking-[0.22em] text-[#F5A623]/60 font-[Montserrat,sans-serif] mb-4">
              Contáctanos
            </h4>

            {/* WhatsApp card */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border border-[#25D366]/20 bg-[#25D366]/8 p-5 mb-4 hover:border-[#25D366]/40 transition-all"
            >
              <MessageCircle size={22} className="text-[#25D366]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#25D366]/80 font-[Montserrat,sans-serif] text-center">
                Escribinos por<br />WhatsApp
              </span>
            </motion.a>

            {/* RUC info */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
              <p className="text-[10px] text-white/25 font-[Montserrat,sans-serif] font-semibold uppercase tracking-widest mb-1">
                Datos empresa
              </p>
              <p className="text-xs text-white/40 font-[Montserrat,sans-serif]">
                MAVTEC E.I.R.L<br />
                Pisco, Ica, Perú
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══ BARRA INFERIOR ═════════════════════════════════════ */}
      <div className="relative border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-5 lg:px-16 xl:px-24 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-[11px] text-white/25 font-[Montserrat,sans-serif] text-center sm:text-left">
            © {year} MAVTEC E.I.R.L — Todos los derechos reservados.
            <span className="text-white/15 mx-2">·</span>
            Pisco, Ica, Perú.
          </p>

          <div className="flex items-center gap-4">
            {/* Hecho con */}
            <span className="text-[11px] text-white/20 font-[Montserrat,sans-serif] hidden sm:block">
              Sitio web por{' '}
              <span className="text-white/35 font-semibold">Tu empresa dev</span>
            </span>

            <ScrollTop />
          </div>
        </div>
      </div>
    </footer>
  )
}