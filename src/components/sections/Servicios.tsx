'use client'

import { motion } from 'framer-motion'
// 1. Importamos tus datos
import { servicios } from '@/data/maquinarias' 
import type { Servicio } from '@/types' 

// 2. Importamos todos los iconos que vayamos a usar
import {
  Tractor,
  Truck,
  Droplets,
  HardHat,
  ArrowUpRight,
  Wrench,
  Building2
} from 'lucide-react'

/* ── Diccionario de Iconos (Mapea el string de data.ts al componente de React) ── */
const iconMap: Record<string, React.ElementType> = {
  Tractor: Tractor,
  Truck: Truck,
  Droplets: Droplets,
  HardHat: HardHat,
  Wrench: Wrench,
  Building2: Building2,
}

/* ── Banda de features inferior (Estática, no necesita ir a data.ts) ── */
const FEATURES = [
  { label: 'Entrega rápida', desc: 'En menos de 24 hrs' },
  { label: 'Sin cobros ocultos', desc: 'Tarifa todo incluido' },
  { label: 'Contrato claro', desc: 'Procesos transparentes' },
  { label: 'Soporte 24/7', desc: 'Línea directa' },
]

/* ── Tarjeta de Servicio Compacta y Directa ─────────────── */
function ServiceModule({
  servicio,
}: {
  servicio: Servicio
}) {
  // Obtenemos el icono del diccionario o usamos Tractor por defecto si hay un error
  const Icon = iconMap[servicio.icono] || Tractor

  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#081226] shadow-xl ${servicio.span}`}
    >
      <motion.img
        variants={{ initial: { scale: 1 }, hover: { scale: 1.05 } }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        src={servicio.imagen}
        alt={servicio.titulo}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/70 to-transparent transition-opacity duration-500 group-hover:from-[#050B14]/90" />

      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
        
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white">
            <Icon size={24} strokeWidth={2} />
          </div>
          
          <motion.button
            variants={{
              initial: { opacity: 0, x: -10, y: 10 },
              hover: { opacity: 1, x: 0, y: 0 },
            }}
            transition={{ duration: 0.3 }}
            onClick={() => document.querySelector('#cotizacion')?.scrollIntoView({ behavior: 'smooth' })}
            className="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-[#F5A623] text-[#050B14] hover:bg-white transition-colors shadow-lg"
          >
            <ArrowUpRight size={20} strokeWidth={2.5} />
          </motion.button>
        </div>

        <div className="mt-auto">
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
            {servicio.titulo}
          </h3>
          
          <p className="text-sm md:text-base text-gray-300 max-w-sm leading-relaxed mb-5">
            {servicio.descripcion}
          </p>

          <div className="flex flex-wrap gap-2">
            {/* Iteramos sobre "beneficios" ya que así se llama en tu data.ts */}
            {servicio.beneficios.map((item) => (
              <span 
                key={item} 
                className="inline-flex items-center rounded-lg bg-white/10 border border-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-gray-200 backdrop-blur-md"
              >
                {item}
              </span>
            ))}
          </div>
          
          <button 
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-[#F5A623] py-3 text-xs font-bold uppercase tracking-wider text-[#081226] md:hidden"
            onClick={() => document.querySelector('#cotizacion')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Solicitar <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Componente Principal ───────────────────────────────── */
export default function Servicios() {
  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-gradient-to-b from-[#08111F] via-[#10284A] to-[#08111F] py-20 lg:py-24 px-5 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#142e55_0%,transparent_60%)] opacity-30" />
      </div>

      <div className="relative mx-auto max-w-[1280px] z-10">
        
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#F5A623]/30 bg-[#F5A623]/10 px-4 py-1.5 mb-5"
            >
              <div className="h-2 w-2 rounded-full bg-[#F5A623] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623]">
                División de Alquiler
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.1] tracking-tight text-balance"
            >
              Capacidad operativa
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] to-[#ffe29f]">
                sin interrupciones.
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-base md:text-lg text-gray-400 max-w-xl leading-relaxed"
            >
              Proveer equipos es solo el inicio. Entregamos soluciones logísticas integrales 
              para minería, construcción e infraestructura con los estándares más altos.
            </motion.p>
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onClick={() => document.querySelector('#cotizacion')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative inline-flex h-12 md:h-14 items-center justify-center overflow-hidden rounded-full bg-[#F5A623] px-8 font-bold uppercase tracking-wider text-[#050B14] transition-all hover:scale-105 focus:ring-2 focus:ring-[#F5A623]/50 text-sm md:text-base w-full lg:w-auto"
          >
            <span className="relative z-10 flex items-center gap-2">
              Cotizar Proyecto <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </motion.button>
        </div>

        {/* Mapeamos el array importado directamente desde data.ts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 mb-16">
          {servicios.map((servicio) => (
            <ServiceModule key={servicio.id} servicio={servicio} />
          ))}
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
            {FEATURES.map((f) => (
              <div
                key={f.label}
                className="flex flex-col items-center justify-center p-6 text-center hover:bg-white/[0.02] transition-colors"
              >
                <div className="text-xs md:text-sm font-bold text-white tracking-widest uppercase mb-1">
                  {f.label}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}