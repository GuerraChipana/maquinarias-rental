'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Star, 
  Building2,
  HardHat,
  Factory,
  Tractor,
  Pickaxe
} from 'lucide-react'
import type { Testimonio } from '@/types'
import { testimonios } from '@/data/maquinarias'

/* ── COMPONENTES AUXILIARES ──────────────────────────────── */

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={18}
          className={i < rating ? 'text-[#F5A623] fill-[#F5A623]' : 'text-slate-200 fill-slate-200'}
        />
      ))}
    </div>
  )
}

function Avatar({ nombre, imagen }: { nombre: string; imagen?: string }) {
  const initials = nombre.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()

  if (imagen) {
    return (
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl shadow-md border-2 border-white">
        <img src={imagen} alt={nombre} className="h-full w-full object-cover" />
      </div>
    )
  }

  // Color vibrante para iniciales
  const hue = (nombre.charCodeAt(0) * 137) % 360
  return (
    <div 
      className="h-16 w-16 flex-shrink-0 rounded-2xl shadow-md border-2 border-white flex items-center justify-center text-xl font-black text-white relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, hsl(${hue}, 80%, 55%), hsl(${hue}, 90%, 35%))` }}
    >
      <span className="relative z-10">{initials}</span>
    </div>
  )
}

/* ── MARQUESINA DE CLIENTES (Limpia y Corporativa) ───────── */

const CLIENTES = [
  { nombre: 'Constructora Ica Sur', icon: Building2 },
  { nombre: 'Agroindustrias Valle', icon: Tractor },
  { nombre: 'Municipalidad de Pisco', icon: Factory },
  { nombre: 'Obras & Proyectos SAC', icon: HardHat },
  { nombre: 'Minera del Sur', icon: Pickaxe },
  { nombre: 'Riego Ica S.A.', icon: Building2 },
]

function ClientesMarquee() {
  const duplicatedClients = [...CLIENTES, ...CLIENTES, ...CLIENTES]

  return (
    <div className="relative w-full overflow-hidden py-10 mt-10 bg-white border-y border-slate-200/60">
      <div className="absolute top-0 left-0 w-24 md:w-40 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 md:w-40 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
        className="flex w-max items-center gap-16 md:gap-24 px-8"
      >
        {duplicatedClients.map((cliente, idx) => {
          const Icon = cliente.icon
          return (
            <div key={idx} className="flex items-center gap-4 group cursor-default">
              <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-[#F5A623]/10 group-hover:text-[#F5A623] transition-colors duration-300">
                <Icon size={24} strokeWidth={2} />
              </div>
              <span className="text-sm md:text-base font-bold uppercase tracking-widest text-slate-400 group-hover:text-[#0F172A] transition-colors duration-300">
                {cliente.nombre}
              </span>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

/* ── COMPONENTE PRINCIPAL ────────────────────────────────── */

const AUTOPLAY_DURATION = 6000;

export default function Testimonios() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [direction, setDirection] = useState(1) // 1 para derecha, -1 para izquierda

  const total = testimonios.length

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir)
    setCurrent((idx + total) % total)
  }, [total])

  const prev = useCallback(() => {
    setAutoplay(false)
    goTo(current - 1, -1)
  }, [current, goTo])

  const next = useCallback(() => {
    setAutoplay(false)
    goTo(current + 1, 1)
  }, [current, goTo])

  useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => goTo(current + 1, 1), AUTOPLAY_DURATION)
    return () => clearInterval(timer)
  }, [autoplay, current, goTo])

  // Variantes de animación para las tarjetas (Slide Horizontal)
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    })
  }

  const testimonioActivo = testimonios[current]

  return (
    <section id="testimonios" className="relative w-full bg-[#F8FAFC] pb-24 overflow-hidden">
      
      {/* ── TRANSICIÓN GEOMÉTRICA PERFECTA ── */}
      {/* Este bloque sólido elimina el error de la mancha oscura para siempre */}
      {/* <div className="w-full leading-[0] relative z-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[120px] text-[#142e55]">
          <polygon points="0,0 1440,0 1440,120 0,0" fill="currentColor" />
        </svg>
      </div> */}

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-12 xl:px-20 pt-16 md:pt-24">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-20">
          
          {/* ── LADO IZQUIERDO: Textos Fijos ── */}
          <div className="w-full lg:w-[40%] flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="h-1.5 w-8 bg-[#F5A623] rounded-full" />
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#F5A623]">
                Casos de Éxito
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.1] mb-6"
            >
              Resultados <br className="hidden lg:block"/>
              que hablan <br className="hidden lg:block"/>
              <span className="text-[#142e55]">por sí solos.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-slate-500 mb-10 max-w-md"
            >
              No te fíes solo de nuestra palabra. Descubre por qué las constructoras más exigentes confían su operatividad a nuestra flota.
            </motion.p>

            {/* Controles de Navegación */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <button
                onClick={prev}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-slate-200 text-[#0F172A] shadow-sm hover:shadow-md hover:border-[#F5A623] hover:text-[#F5A623] transition-all"
              >
                <ChevronLeft size={24} strokeWidth={2.5} />
              </button>
              <button
                onClick={next}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-slate-200 text-[#0F172A] shadow-sm hover:shadow-md hover:border-[#F5A623] hover:text-[#F5A623] transition-all"
              >
                <ChevronRight size={24} strokeWidth={2.5} />
              </button>
            </motion.div>
          </div>

          {/* ── LADO DERECHO: Tarjetas Dinámicas (El Slider) ── */}
          <div className="w-full lg:w-[60%] relative min-h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="w-full"
              >
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(15,23,42,0.06)] border border-slate-100 relative overflow-hidden group">
                  
                  {/* Decoración de fondo */}
                  <div className="absolute -top-10 -right-10 opacity-[0.03] transform rotate-12 group-hover:scale-110 transition-transform duration-700">
                    <Quote size={200} className="text-[#142e55]" />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-8">
                      <StarRating rating={testimonioActivo.rating} />
                    </div>

                    <p className="text-xl md:text-2xl lg:text-[22px] font-medium text-slate-700 leading-relaxed mb-10 min-h-[140px]">
                      "{testimonioActivo.texto}"
                    </p>

                    <div className="flex items-center gap-5 pt-8 border-t border-slate-100">
                      <Avatar nombre={testimonioActivo.nombre} imagen={testimonioActivo.imagen} />
                      <div className="flex flex-col">
                        <span className="text-lg font-black tracking-tight text-[#0F172A]">
                          {testimonioActivo.nombre}
                        </span>
                        <span className="text-sm font-bold uppercase tracking-wider text-[#F5A623] mt-1">
                          {testimonioActivo.cargo ? `${testimonioActivo.cargo} · ` : ''}{testimonioActivo.empresa}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

            {/* Puntos Indicadores Inferiores */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {testimonios.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  className="p-2"
                >
                  <motion.div
                    animate={{
                      width: i === current ? 32 : 8,
                      backgroundColor: i === current ? '#F5A623' : '#cbd5e1',
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="h-2 rounded-full"
                  />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── MARQUESINA DE CLIENTES ── */}
      <div className="w-full mt-24">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 px-5">
          Empresas que construyen el futuro con nosotros
        </p>
        <ClientesMarquee />
      </div>

    </section>
  )
}