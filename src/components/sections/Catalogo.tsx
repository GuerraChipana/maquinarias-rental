'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  AlertTriangle, 
  Truck, 
  Settings2, 
  Barcode, 
  Activity,
  Cpu
} from 'lucide-react'
import MachineCard from '@/components/ui/MachineCard'
import { maquinarias } from '@/data/maquinarias'
import { useCotizacion } from '@/components/cotizacion/ModalCotizacion' 
import type { Maquina } from '@/types'

const TODAS = 'Todas'

/* ── Variantes para animación Mecánica (Peso Pesado) ── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 }
  }
}

const dropVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 20, mass: 1.5 } 
  }
}

export default function Catalogo() {
  const [filtro, setFiltro] = useState<string>(TODAS)
  const [busqueda, setBusqueda] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const { openModal } = useCotizacion()

  const categorias = useMemo(() => {
    const cats = Array.from(new Set(maquinarias.map(m => m.categoria)))
    return [TODAS, ...cats]
  }, [])

  const maquinasFiltradas = useMemo(() => {
    return maquinarias.filter(m => {
      const matchCat = filtro === TODAS || m.categoria === filtro
      const matchSearch = m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          m.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      return matchCat && matchSearch
    })
  }, [filtro, busqueda])

  const handleCotizar = (maquina: Maquina) => {
    openModal(maquina.id)
  }

  return (
    <section
      id="catalogo"
      className="relative w-full bg-[#eef1f5] pt-32 pb-36 md:pt-44 md:pb-48 px-5 lg:px-12 xl:px-20 min-h-screen overflow-hidden font-[Montserrat,sans-serif]"
    >
      {/* ── 1. TRANSICIONES GEOMÉTRICAS (Cortes Estructurales) ────── */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -mt-[1px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[40px] md:h-[80px] lg:h-[120px] text-[#081226]">
          <polygon points="0,0 1440,0 0,100" fill="currentColor" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -mb-[1px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[40px] md:h-[80px] lg:h-[120px] text-[#142e55]">
          <polygon points="0,100 1440,100 1440,0" fill="currentColor" />
        </svg>
      </div>

      {/* ── 2. FONDO "PLANO TÉCNICO" ANIMADO ────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.12]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#071324 1px, transparent 1px), linear-gradient(90deg, #071324 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        {/* Cruz de calibración (Crosshairs) */}
        <div className="absolute top-[10%] left-[5%] w-8 h-8 border-l-2 border-t-2 border-[#071324]" />
        <div className="absolute bottom-[10%] right-[5%] w-8 h-8 border-r-2 border-b-2 border-[#071324]" />
        
        {/* Línea de Escaneo Láser Vertical */}
        <motion.div 
          animate={{ y: ['-10%', '110%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-[2px] bg-[#F5A623] shadow-[0_0_15px_rgba(245,166,35,0.8)] opacity-30" 
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] z-10">
        
        {/* ── 3. ENCABEZADO "SISTEMA LOGÍSTICO" ─────────────────────── */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 md:mb-16">
          <div className="flex flex-col items-start gap-4 border-l-[6px] border-[#F5A623] pl-6 relative">
            {/* Decal Telemetría */}
            <div className="absolute -left-[6px] top-0 w-1.5 h-1/3 bg-[#071324]" />
            
            {/* <div className="inline-flex items-center gap-3 bg-[#071324] px-4 py-2 border border-white/10 shadow-lg">
              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]"></span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                Sistema Operativo
              </span>
              <span className="text-[10px] font-bold text-white/40 ml-2">v.2.4</span>
            </div> */}
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-7xl font-black text-[#071324] uppercase tracking-tighter leading-[0.95]"
            >
              Control de <br />
              <span className="text-[#F5A623] drop-shadow-sm">Inventario.</span>
            </motion.h2>
          </div>

          {/* Tarjeta de estado de flota */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 bg-white border border-slate-300 p-4 shadow-sm"
          >
            <div className="bg-[#071324] p-3 text-[#F5A623]">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Estado de Flota</p>
              <p className="text-xl font-black text-[#071324] leading-none mt-1">ÓPTIMO [OK]</p>
            </div>
          </motion.div>
        </div>

        {/* ── 4. CONSOLA DE MANDO (Buscador y Filtros) ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 bg-[#071324] shadow-2xl relative z-20 flex flex-col xl:flex-row border border-[#142e55]"
        >
          {/* Detalles mecánicos top/bottom */}
          <div className="absolute top-0 left-4 w-12 h-1 bg-[#F5A623]" />
          <div className="absolute bottom-0 right-4 w-12 h-1 bg-[#F5A623]" />

          {/* Buscador Digital (Izquierda) */}
          {/* <div className="xl:w-[450px] border-b xl:border-b-0 xl:border-r border-white/10 p-6 lg:p-8 bg-[#040a12] relative overflow-hidden">
            <Cpu size={120} className="absolute -bottom-6 -right-6 text-white/[0.02] pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5A623] flex items-center gap-2">
                <Barcode size={14} /> Entrada de Datos
              </label>
              <span className="text-[10px] text-white/30 font-mono">REQ: 001-A</span>
            </div>

            <div className={`relative flex items-center bg-[#071324] border-2 transition-all duration-300 ${isFocused ? 'border-[#F5A623] shadow-[0_0_15px_rgba(245,166,35,0.15)]' : 'border-white/10 hover:border-white/30'}`}>
              <div className="pl-4 text-[#F5A623] font-mono font-bold text-lg">
                {isFocused ? <div className="w-2.5 h-5 bg-[#F5A623] animate-pulse" /> : '>'}
              </div>
              <input
                type="text"
                placeholder="ESCANEAR O ESCRIBIR EQUIPO..."
                value={busqueda}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={e => setBusqueda(e.target.value.toUpperCase())}
                className="w-full bg-transparent px-3 py-4 text-sm font-bold text-white placeholder:text-white/20 focus:outline-none uppercase tracking-wider"
              />
              <AnimatePresence>
                {busqueda.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    onClick={() => setBusqueda('')}
                    className="mr-3 p-1.5 text-[#071324] bg-[#F5A623] hover:bg-white transition-colors"
                  >
                    <X size={16} strokeWidth={3} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div> */}

          {/* Filtros de Categorías (Derecha) */}
          <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center bg-gradient-to-br from-[#071324] to-[#0a182b]">
            <div className="flex items-center justify-between mb-4">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 flex items-center gap-2">
                <SlidersHorizontal size={14} /> Selector de Clase
              </label>
              
              {/* Display LCD de Resultados */}
              <div className="flex items-center gap-3 bg-[#040a12] border border-white/10 px-4 py-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Match:</span>
                <span className="text-sm font-mono font-bold text-[#F5A623] drop-shadow-[0_0_8px_rgba(245,166,35,0.5)]">
                  {maquinasFiltradas.length.toString().padStart(3, '0')}
                </span>
              </div>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex overflow-x-auto hide-scrollbar gap-2 pb-2"
            >
              {categorias.map((cat, index) => {
                const isActive = filtro === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setFiltro(cat)}
                    className={`group relative flex-shrink-0 px-6 py-3 text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#F5A623] text-[#071324]' 
                        : 'bg-[#040a12] text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    {/* Efecto de "placa encajada" cuando está activo */}
                    {isActive && (
                      <span className="absolute -top-1 left-0 w-full h-1 bg-[#d68b15]" />
                    )}
                    
                    <span className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono ${isActive ? 'text-[#071324]/60' : 'text-white/20 group-hover:text-white/40'}`}>
                        {index.toString().padStart(2, '0')}
                      </span>
                      {cat.replace('-', ' ')}
                    </span>
                  </button>
                )
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* ── 5. GRID DE MÁQUINAS ──────────────────────────────── */}
        <motion.div layout className="min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {maquinasFiltradas.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {maquinasFiltradas.map((maquina, i) => (
                  <motion.div key={maquina.id} variants={dropVariants} layout>
                    <MachineCard
                      maquina={maquina}
                      onCotizar={handleCotizar}
                      index={i}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* ── ESTADO VACÍO (ERROR DE SISTEMA) ─────────────── */
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="flex flex-col items-center justify-center py-24 text-center border border-[#071324]/20 bg-white shadow-inner relative overflow-hidden"
              >
                {/* Patrón de peligro en las esquinas */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-[linear-gradient(45deg,#F5A623_25%,transparent_25%,transparent_50%,#F5A623_50%,#F5A623_75%,transparent_75%,transparent)] bg-[length:20px_20px] opacity-20" />
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-[linear-gradient(45deg,#F5A623_25%,transparent_25%,transparent_50%,#F5A623_50%,#F5A623_75%,transparent_75%,transparent)] bg-[length:20px_20px] opacity-20" />

                <div className="mb-6 flex h-24 w-24 items-center justify-center bg-[#071324] text-[#F5A623] relative">
                  <span className="absolute -inset-2 border border-[#F5A623]/30 animate-pulse" />
                  <AlertTriangle size={48} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-3xl font-black text-[#071324] uppercase mb-2 tracking-tight">Activo No Localizado</h3>
                <p className="text-[#071324]/60 font-medium max-w-md mb-8 text-sm uppercase tracking-wider">
                  El término <span className="text-[#071324] font-black px-2 py-1 bg-slate-100 border border-slate-300">"{busqueda}"</span> no devolvió resultados en la base de datos actual.
                </p>
                
                <button
                  onClick={() => { setFiltro(TODAS); setBusqueda('') }}
                  className="group flex items-center gap-3 bg-[#071324] px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-[#F5A623] hover:text-[#071324] hover:shadow-[0_0_20px_rgba(245,166,35,0.4)]"
                >
                  <Settings2 size={16} className="group-hover:animate-spin" /> Restaurar Filtros
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Ocultar scrollbar nativa */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  )
}