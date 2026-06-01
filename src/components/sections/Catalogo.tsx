'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, PackageX, Sparkles, XCircle, SlidersHorizontal } from 'lucide-react'
import MachineCard from '@/components/ui/MachineCard'
import { maquinarias } from '@/data/maquinarias'
import { useCotizacion } from '@/components/cotizacion/ModalCotizacion' 
import type { Maquina } from '@/types'

const TODAS = 'Todas'

/* ── Variantes para animación en cascada (Stagger) ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const pillVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring"as const, stiffness: 300, damping: 24 } }
}

export default function Catalogo() {
  const [filtro, setFiltro]     = useState<string>(TODAS)
  const [busqueda, setBusqueda] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const { openModal }           = useCotizacion()

  const categorias = useMemo(() => {
    const cats = Array.from(new Set(maquinarias.map(m => m.categoria)))
    return [TODAS, ...cats]
  }, [])

  const maquinasFiltradas = useMemo(() => {
    return maquinarias.filter(m => {
      const matchCat    = filtro === TODAS || m.categoria === filtro
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
      className="relative w-full bg-[#E8EDF2] pt-36 pb-36 md:pt-48 md:pb-48 px-5 lg:px-12 xl:px-20 min-h-screen overflow-hidden"
    >
      {/* ── 1. TRANSICIONES GEOMÉTRICAS PERFECTAS ───────────────── */}
      
      {/* Corte Superior Diagonal (Conecta con el final de Servicios) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -mt-[1px]">
        {/* ⚠️ IMPORTANTE: Este text-[#081226] asume que "Servicios" termina en ese color. 
             Si cambiaste el color de Servicios, solo cambia el HEX aquí */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[40px] md:h-[80px] lg:h-[120px] text-[#081226]">
          <polygon points="0,0 1440,0 0,100" fill="currentColor" />
        </svg>
      </div>

      {/* Corte Inferior Diagonal (Conecta con el inicio de Nosotros) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -mb-[1px]">
        {/* ⚠️ IMPORTANTE: Este text-[#142e55] asume que "Nosotros" empieza con ese azul. 
             Si tu azul de Nosotros es distinto (ej. #0e2140), solo cambia el HEX aquí */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[40px] md:h-[80px] lg:h-[120px] text-[#142e55]">
          <polygon points="0,100 1440,100 1440,0" fill="currentColor" />
        </svg>
      </div>

      {/* ── 2. FONDO "SHOWROOM INDUSTRIAL" ─────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-60" />
        
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-0 h-[600px] w-[600px] rounded-full bg-white/40 blur-[120px] -translate-y-1/2 translate-x-1/3" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-0 h-[800px] w-[800px] rounded-full bg-[#F5A623]/5 blur-[120px] translate-y-1/3 -translate-x-1/3" 
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] z-10">
        
        {/* ── 3. HEADER ANIMADO ─────────────────────────────────── */}
        <div className="mb-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/60 bg-white/50 backdrop-blur-md px-5 py-2 mb-6 shadow-sm"
          >
            <Sparkles size={16} className="text-[#F5A623]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#142e55]">
              Catálogo Interactivo
            </span>
          </motion.div> */}
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-[#142e55] tracking-tight leading-[1.05]"
          >
            Encuentra la <span className="text-[#F5A623] drop-shadow-sm">Fuerza</span> Exacta.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl"
          >
            Explora nuestra flota de maquinaria pesada certificada. Filtra por categoría, busca por especificaciones y cotiza al instante.
          </motion.p>
        </div>

        {/* ── 4. PANEL DE CONTROL (Glassmorphism Premium) ─────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-14 flex flex-col xl:flex-row gap-6 items-center justify-between rounded-[2.5rem] border border-white/60 bg-white/40 backdrop-blur-2xl p-4 shadow-2xl shadow-slate-300/50 relative z-20"
        >
          {/* Categorías (Animación en Cascada y Píldora) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex w-full xl:w-auto overflow-x-auto hide-scrollbar gap-2 p-1"
          >
            {categorias.map(cat => {
              const isActive = filtro === cat;
              return (
                <motion.button
                  variants={pillVariants}
                  key={cat}
                  onClick={() => setFiltro(cat)}
                  className={`relative flex-shrink-0 rounded-2xl px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-slate-500 hover:text-[#142e55]'
                  }`}
                >
                  {/* Animación de la píldora activa */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 bg-[#142e55] rounded-2xl shadow-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.replace('-', ' ')}</span>
                </motion.button>
              )
            })}
          </motion.div>

          {/* Buscador Magnético */}
          <div className={`relative w-full xl:w-[400px] flex-shrink-0 transition-all duration-500 ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}>
            <div className={`absolute -inset-1 rounded-2xl bg-[#F5A623] opacity-0 blur-lg transition-opacity duration-500 ${isFocused ? 'opacity-20' : ''}`} />
            
            <div className="relative flex items-center bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 overflow-hidden shadow-sm hover:bg-white transition-colors">
              <Search size={20} className={`ml-5 transition-colors duration-300 ${isFocused ? 'text-[#F5A623]' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder="Ej. Retroexcavadora, Volquete..."
                value={busqueda}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={e => setBusqueda(e.target.value)}
                className="w-full bg-transparent pl-3 pr-5 py-4 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
              <AnimatePresence>
                {busqueda.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    onClick={() => setBusqueda('')}
                    className="mr-5 text-slate-400 hover:text-[#142e55] transition-colors"
                  >
                    <XCircle size={18} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Indicador de resultados */}
        <motion.div layout className="mb-8 flex items-center gap-3 text-sm font-bold tracking-widest text-slate-500 uppercase">
          <div className="h-px w-8 bg-[#F5A623]" />
          Mostrando <span className="text-[#142e55]">{maquinasFiltradas.length}</span> equipo{maquinasFiltradas.length !== 1 ? 's' : ''}
        </motion.div>

        {/* ── 5. GRID DE MÁQUINAS ANIMADO ──────────────────────── */}
        <motion.div layout className="min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {maquinasFiltradas.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {maquinasFiltradas.map((maquina, i) => (
                  <MachineCard
                    key={maquina.id}
                    maquina={maquina}
                    onCotizar={handleCotizar}
                    index={i}
                  />
                ))}
              </motion.div>
            ) : (
              /* Estado Vacío Premium */
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-32 text-center rounded-[3rem] border-2 border-dashed border-slate-300 bg-white/30 backdrop-blur-sm shadow-sm"
              >
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white text-[#F5A623] shadow-md border border-slate-100"
                >
                  <SlidersHorizontal size={40} />
                </motion.div>
                <h3 className="text-3xl font-black text-[#142e55] mb-3 tracking-tight">Sin coincidencias</h3>
                <p className="text-slate-500 font-medium max-w-md mb-8 text-lg">
                  No tenemos maquinaria que coincida con "<span className="text-[#142e55] font-bold">{busqueda}</span>" en esta categoría.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setFiltro(TODAS); setBusqueda('') }}
                  className="rounded-full bg-[#142e55] px-10 py-4 font-bold uppercase tracking-wider text-white shadow-xl shadow-[#142e55]/20 hover:bg-[#0d1b2a] transition-all"
                >
                  Limpiar Búsqueda
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Ocultar scrollbar nativa en dispositivos móviles para las categorías */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  )
}