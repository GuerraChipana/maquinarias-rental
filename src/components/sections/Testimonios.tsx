'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import type { Testimonio } from '@/types'
import { testimonios } from '@/data/maquinarias'

/* ── Estrellas de rating ──────────────────────────────────── */
function StarRating({ rating }: { rating: Testimonio['rating'] }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < rating ? 'text-[#F5A623] fill-[#F5A623]' : 'text-white/15 fill-white/15'}
        />
      ))}
    </div>
  )
}

/* ── Avatar con iniciales ─────────────────────────────────── */
function Avatar({ nombre, imagen }: { nombre: string; imagen?: string }) {
  const initials = nombre
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()

  if (imagen) {
    return (
      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#F5A623]/30">
        <img src={imagen} alt={nombre} className="h-full w-full object-cover" />
      </div>
    )
  }

  // Gradiente determinístico basado en el nombre
  const hue = nombre.charCodeAt(0) * 17 % 360
  return (
    <div
      className="h-12 w-12 flex-shrink-0 rounded-full border-2 border-[#F5A623]/30 flex items-center justify-center text-sm font-black text-white font-[Montserrat,sans-serif]"
      style={{ background: `hsl(${hue}, 55%, 35%)` }}
      aria-label={nombre}
    >
      {initials}
    </div>
  )
}

/* ── Tarjeta de testimonio ────────────────────────────────── */
function TestimonioCard({
  testimonio,
  isCenter,
  onClick,
}: {
  testimonio: Testimonio
  isCenter: boolean
  onClick: () => void
}) {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={[
        'relative flex flex-col rounded-2xl border p-6 transition-all duration-300 cursor-pointer select-none',
        isCenter
          ? 'border-[#F5A623]/25 bg-[#1a3d6a] shadow-2xl shadow-black/40 scale-[1.02]'
          : 'border-white/[0.07] bg-[#0e2140]/60 opacity-60 hover:opacity-80 scale-[0.97]',
      ].join(' ')}
    >
      {/* Comilla decorativa */}
      <div className="absolute top-5 right-5 opacity-10">
        <Quote size={40} className={isCenter ? 'text-[#F5A623]' : 'text-white'} />
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={testimonio.rating} />
      </div>

      {/* Texto */}
      <p className={[
        'flex-1 text-sm leading-relaxed font-[Montserrat,sans-serif] mb-6',
        isCenter ? 'text-white/80' : 'text-white/45',
      ].join(' ')}>
        "{testimonio.texto}"
      </p>

      {/* Autor */}
      <div className="flex items-center gap-3">
        <Avatar nombre={testimonio.nombre} imagen={testimonio.imagen} />
        <div className="flex flex-col">
          <span className="text-sm font-black text-white font-[Montserrat,sans-serif] leading-tight">
            {testimonio.nombre}
          </span>
          <span className="text-[11px] text-white/40 font-[Montserrat,sans-serif] mt-0.5">
            {testimonio.cargo ? `${testimonio.cargo} · ` : ''}{testimonio.empresa}
          </span>
        </div>
        {/* Línea accent si es el central */}
        {isCenter && (
          <div className="ml-auto h-6 w-0.5 rounded-full bg-[#F5A623]/40" />
        )}
      </div>
    </motion.div>
  )
}

/* ── Componente principal ─────────────────────────────────── */
export default function Testimonios() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const total = testimonios.length

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + total) % total)
  }, [total])

  const prev = useCallback(() => {
    setAutoplay(false)
    goTo(current - 1)
  }, [current, goTo])

  const next = useCallback(() => {
    setAutoplay(false)
    goTo(current + 1)
  }, [current, goTo])

  /* Autoplay */
  useEffect(() => {
    if (!autoplay) return
    intervalRef.current = setInterval(() => goTo(current + 1), 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [autoplay, current, goTo])

  /* Índices visibles: prev, current, next */
  const visibleIdx = [
    (current - 1 + total) % total,
    current,
    (current + 1) % total,
  ]

  return (
    <section
      id="testimonios"
      className="relative w-full bg-[#0e2140] py-24 px-5 lg:px-16 xl:px-24 overflow-hidden"
    >
      {/* ── Fondos decorativos ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F5A623]/15 to-transparent" />
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1A3C6E]/30 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#F5A623]/[0.04] blur-3xl translate-x-1/3 translate-y-1/3" />
        {/* Textura de puntos */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#F5A623]/30 bg-[#F5A623]/10 px-4 py-1.5 mb-5"
          >
            <Quote size={11} className="text-[#F5A623]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623] font-[Montserrat,sans-serif]">
              Lo que dicen nuestros clientes
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl font-black text-white tracking-tight font-[Montserrat,sans-serif] leading-[1.0]"
          >
            Confían en <span className="text-[#F5A623]">MAVTEC</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="mt-4 text-sm text-white/45 font-[Montserrat,sans-serif] max-w-md mx-auto"
          >
            Empresas constructoras, agroindustriales y del Estado que eligen nuestra flota.
          </motion.p>
        </div>

        {/* ── CARRUSEL (3 tarjetas) — desktop ─────────────────── */}
        <div className="hidden lg:block mb-10">
          <div className="grid grid-cols-3 gap-5 items-stretch">
            {visibleIdx.map((idx, pos) => (
              <TestimonioCard
                key={testimonios[idx].id}
                testimonio={testimonios[idx]}
                isCenter={pos === 1}
                onClick={() => {
                  if (pos === 0) prev()
                  if (pos === 2) next()
                }}
              />
            ))}
          </div>
        </div>

        {/* ── CARRUSEL mobile (1 tarjeta) ─────────────────────── */}
        <div className="lg:hidden mb-10 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <TestimonioCard
                testimonio={testimonios[current]}
                isCenter={true}
                onClick={() => {}}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── CONTROLES ─────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-6">
          {/* Botón prev */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={prev}
            aria-label="Testimonio anterior"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 hover:border-[#F5A623]/40 hover:text-[#F5A623] transition-all duration-200"
          >
            <ChevronLeft size={18} />
          </motion.button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonios.map((_, i) => (
              <button
                key={i}
                onClick={() => { setAutoplay(false); goTo(i) }}
                aria-label={`Ir al testimonio ${i + 1}`}
                className="transition-all duration-300"
              >
                <motion.div
                  animate={{
                    width: i === current ? 24 : 6,
                    background: i === current ? '#F5A623' : 'rgba(255,255,255,0.2)',
                  }}
                  className="h-1.5 rounded-full"
                />
              </button>
            ))}
          </div>

          {/* Botón next */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={next}
            aria-label="Siguiente testimonio"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 hover:border-[#F5A623]/40 hover:text-[#F5A623] transition-all duration-200"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>

        {/* ── BANDA de logos / empresas ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-16 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-8 py-6"
        >
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-white/25 font-[Montserrat,sans-serif] mb-5">
            Clientes que confían en nosotros
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              'Constructora Ica Sur',
              'Agroindustrias Valle',
              'Municipalidad de Pisco',
              'Obras & Proyectos SAC',
              'Minera del Sur',
              'Riego Ica S.A.',
            ].map(empresa => (
              <span
                key={empresa}
                className="text-xs font-bold text-white/20 font-[Montserrat,sans-serif] tracking-wide hover:text-white/40 transition-colors cursor-default"
              >
                {empresa}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}