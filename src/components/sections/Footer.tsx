'use client'

import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ArrowUp,
  ArrowRight,
  HardHat,
  ShieldCheck,
  Terminal
} from 'lucide-react'
import { EMPRESA } from '@/lib/constants'

/* ── Estructura de Navegación ──────────────────────────────── */
const NAV_COLS = [
  {
    titulo: 'Operaciones',
    links: [
      { label: 'Flota Pesada', href: '#catalogo' },
      { label: 'Suministro de Agua', href: '#servicios' },
      { label: 'Servicio con Operador', href: '#servicios' },
      { label: 'Logística en Obra', href: '#servicios' },
    ],
  },
  {
    titulo: 'Base de Datos',
    links: [
      { label: 'Perfil Corporativo', href: '#nosotros' },
      { label: 'Inventario de Equipos', href: '#catalogo' },
      { label: 'Historial de Proyectos', href: '#testimonios' },
      { label: 'Central de Despacho', href: '#contacto' },
    ],
  },
  {
    titulo: 'Legal y Protocolos',
    links: [
      { label: 'Términos de Arrendamiento', href: '#' },
      { label: 'Políticas de Seguridad', href: '#' },
    ],
  },
]

/* ── Utilidades ────────────────────────────────────────────── */
function scrollTo(href: string) {
  if (href === '#') return
  const el = document.querySelector(href)
  el?.scrollIntoView({ behavior: 'smooth' })
}

function ScrollTop() {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver al inicio"
      className="group flex h-12 w-12 items-center justify-center bg-[#071324] border border-white/20 text-white/50 hover:border-[#F5A623] hover:text-[#F5A623] hover:bg-[#142e55] transition-all duration-300"
    >
      <ArrowUp size={20} strokeWidth={2.5} className="transition-transform group-hover:-translate-y-1" />
    </motion.button>
  )
}

/* ── Componente Principal ──────────────────────────────────── */
export default function Footer() {
  const telefono = String(EMPRESA.contacto.telefono)
  const whatsappMsg = encodeURIComponent('¡Hola MAVTEC! Requiero información técnica para iniciar un alquiler.')
  const whatsappUrl = `https://wa.me/51${telefono.replace(/\s/g, '')}?text=${whatsappMsg}`
  const year = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-[#040a12] font-[Montserrat,sans-serif]">

      {/* ── 1. CINTA DE PRECAUCIÓN INDUSTRIAL (Top Border) ────── */}
      <div 
        className="h-2 w-full" 
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #F5A623, #F5A623 15px, #040a12 15px, #040a12 30px)' }}
      />

      {/* ── 2. FONDOS TÉCNICOS ─────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-[radial-gradient(circle_at_top_right,_#142e55_0%,_transparent_70%)] opacity-30" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* ── 3. CTA DE DESPLIEGUE FINAL ─────────────────────────── */}
      <div className="relative z-10 border-b border-white/10 bg-[#071324]">
        <div className="max-w-7xl mx-auto px-5 lg:px-12 xl:px-20 py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-16 w-16 items-center justify-center bg-[#F5A623] text-[#040a12] shrink-0">
                <HardHat size={32} />
              </div>
              <div>
                <p className="flex items-center gap-2 text-[10px] font-mono text-[#F5A623] mb-2 uppercase tracking-widest">
                  <Terminal size={12} /> Siguiente Paso
                </p>
                <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-none">
                  Iniciá tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] to-[#d68b15]">Cotización.</span>
                </h3>
              </div>
            </div>

            <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-4 shrink-0">
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 bg-[#25D366] px-8 py-4 text-xs font-black uppercase tracking-widest text-[#040a12] transition-colors hover:bg-[#20b858]"
              >
                <MessageSquare size={16} />
                WhatsApp Directo
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollTo('#cotizacion')}
                className="group flex items-center justify-center gap-3 border border-[#F5A623] bg-transparent px-8 py-4 text-xs font-black uppercase tracking-widest text-[#F5A623] transition-colors hover:bg-[#F5A623] hover:text-[#040a12]"
              >
                Solicitar Equipo
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
            
          </div>
        </div>
      </div>

      {/* ── 4. PANEL DE INFORMACIÓN (Main Footer) ──────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-12 xl:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Columna 1: Marca y Credenciales */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-4 mb-6 border-l-4 border-[#F5A623] pl-4">
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                MAVTEC
              </h2>
              <span className="bg-white/10 px-2 py-1 text-[10px] font-mono text-white/60">E.I.R.L</span>
            </div>

            <p className="text-sm text-white/50 leading-relaxed mb-8 max-w-sm border-b border-white/5 pb-8">
              Alquiler de maquinaria pesada, camiones cisterna y logística para proyectos de construcción e ingeniería en la región sur del Perú.
            </p>

            <div className="space-y-4">
              <a href={`tel:+51${telefono.replace(/\s/g, '')}`} className="group flex items-center gap-4 text-sm text-white/60 hover:text-[#F5A623] transition-colors">
                <div className="bg-white/5 p-2 group-hover:bg-[#F5A623]/10">
                  <Phone size={14} className="group-hover:text-[#F5A623]" />
                </div>
                <span className="font-mono tracking-wider">{telefono}</span>
              </a>
              <a href={`mailto:${EMPRESA.contacto.email}`} className="group flex items-center gap-4 text-sm text-white/60 hover:text-[#F5A623] transition-colors">
                <div className="bg-white/5 p-2 group-hover:bg-[#F5A623]/10">
                  <Mail size={14} className="group-hover:text-[#F5A623]" />
                </div>
                <span className="tracking-wide">{EMPRESA.contacto.email}</span>
              </a>
              <div className="flex items-center gap-4 text-sm text-white/60">
                <div className="bg-white/5 p-2">
                  <MapPin size={14} className="text-white/40" />
                </div>
                <span className="uppercase tracking-wider text-xs">Pisco, Ica — Base de Operaciones</span>
              </div>
            </div>
          </div>

          {/* Columnas 2, 3 y 4: Rutas de Sistema (Links) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {NAV_COLS.map((col, idx) => (
              <div key={col.titulo}>
                <h4 className="flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-6">
                  <span className="text-[#F5A623]">{'//'}</span> DIR_{idx + 1}: {col.titulo}
                </h4>
                <ul className="space-y-4">
                  {col.links.map(link => (
                    <li key={link.label}>
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="group flex items-center gap-2 text-xs font-bold text-white/50 uppercase tracking-widest hover:text-white transition-colors"
                      >
                        <span className="w-0 h-[2px] bg-[#F5A623] transition-all duration-300 group-hover:w-3" />
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── 5. BARRA DE ESTADO INFERIOR (Status Bar) ───────────── */}
      <div className="relative z-10 border-t border-white/10 bg-[#020509]">
        <div className="max-w-7xl mx-auto px-5 lg:px-12 xl:px-20 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-white/40">
            <span className="flex items-center gap-2 text-[#25D366]">
              <ShieldCheck size={12} /> ESTADO: EN LÍNEA
            </span>
            {/* <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">VER_SISTEMA: 2.0.4</span> */}
          </div>

          <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest text-center">
            © {year} MAVTEC E.I.R.L — LICENCIA ACTIVA
          </div>

          {/* Botón táctico para volver arriba */}
          <div className="absolute right-5 lg:right-12 xl:right-20 -top-6">
            <ScrollTop />
          </div>

        </div>
      </div>

    </footer>
  )
}