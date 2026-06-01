'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight, Phone } from 'lucide-react'
import { EMPRESA } from '@/lib/constants'
import { cotizacionSchema } from '@/lib/validations'

const NAV_LINKS = [
  { label: 'Inicio',    href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Catálogo',  href: '#catalogo' },
  { label: 'Nosotros',  href: '#nosotros' },
  { label: 'Contacto',  href: '#contacto' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]   = useState('inicio')

  /* ── scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── close mobile menu on resize ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* ── lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleNav = (href: string) => {
    setOpen(false)
    setActive(href.replace('#', ''))
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* ══ TOP STRIP ══════════════════════════════════════════ */}
      <div className="hidden lg:flex items-center justify-end gap-6 bg-[#0e2140] px-8 py-1.5 text-xs text-blue-200/70 font-mono">
        <span className="flex items-center gap-1.5">
          <Phone size={11} />
          {EMPRESA.contacto.telefono}
        </span>
        <span className="text-blue-200/40">|</span>
        <span>{EMPRESA.contacto.email}</span>
        <span className="text-blue-200/40">|</span>
        <span className="text-[#F5A623]/80 font-semibold tracking-wider uppercase text-[10px]">
          Pisco · Ica · Perú
        </span>
      </div>

      {/* ══ NAVBAR ═════════════════════════════════════════════ */}
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={[
          'sticky top-0 z-50 w-full transition-all duration-300',
          scrolled
            ? 'bg-[#1A3C6E]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/5'
            : 'bg-[#1A3C6E]',
        ].join(' ')}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-0 lg:px-8">

          {/* ── LOGO ── */}
          <a
            href="#inicio"
            onClick={e => { e.preventDefault(); handleNav('#inicio') }}
            className="flex items-center gap-3 py-3 group"
            aria-label="MAVTEC E.I.R.L — Inicio"
          >
            {/* Logo mark */}
            <div className="relative flex-shrink-0">
              <div className="h-10 w-10 rounded-lg bg-[#F5A623] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                <span className="text-[#1A3C6E] font-black text-lg leading-none tracking-tight select-none">M</span>
              </div>
              {/* accent dot */}
              <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#F5A623] border-2 border-[#1A3C6E]" />
            </div>

            {/* Wordmark */}
            <div className="flex flex-col leading-none">
              <span className="text-white font-black text-xl tracking-[-0.03em] font-[Montserrat,sans-serif]">
                MAVTEC
              </span>
              <span className="text-[#F5A623]/80 text-[10px] font-semibold tracking-[0.18em] uppercase font-[Montserrat,sans-serif]">
                E.I.R.L
              </span>
            </div>
          </a>

          {/* ── DESKTOP LINKS ── */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => {
              const isActive = active === link.href.replace('#', '')
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className={[
                      'relative px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 rounded-md',
                      'font-[Montserrat,sans-serif]',
                      isActive
                        ? 'text-[#F5A623]'
                        : 'text-white/80 hover:text-white',
                    ].join(' ')}
                  >
                    {link.label}
                    {/* active underline */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-[#F5A623]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* ── DESKTOP CTA ── */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNav('#contacto')}
              className="flex items-center gap-2 rounded-lg bg-[#F5A623] px-5 py-2.5 text-sm font-bold text-[#1A3C6E] shadow-md hover:bg-[#d4891a] transition-colors duration-200 font-[Montserrat,sans-serif] tracking-wide"
            >
              Solicitar Cotización
              <ChevronRight size={15} className="mt-px" />
            </motion.button>
          </div>

          {/* ── HAMBURGER ── */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open
                ? <motion.span key="x"   initial={{ rotate: -90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:90, opacity:0 }} transition={{ duration: 0.15 }}><X size={22} /></motion.span>
                : <motion.span key="ham" initial={{ rotate:  90, opacity:0 }} animate={{ rotate:0, opacity:1 }} exit={{ rotate:-90, opacity:0 }} transition={{ duration: 0.15 }}><Menu size={22} /></motion.span>
              }
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* ══ MOBILE DRAWER ══════════════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 z-50 h-full w-72 bg-[#1A3C6E] shadow-2xl lg:hidden flex flex-col"
            >
              {/* drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-[#F5A623] flex items-center justify-center">
                    <span className="text-[#1A3C6E] font-black text-base">M</span>
                  </div>
                  <span className="text-white font-black text-lg tracking-tight">MAVTEC</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X size={20} />
                </button>
              </div>

              {/* drawer links */}
              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => handleNav(link.href)}
                    className={[
                      'flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors duration-150',
                      'font-[Montserrat,sans-serif]',
                      active === link.href.replace('#', '')
                        ? 'bg-[#F5A623]/15 text-[#F5A623]'
                        : 'text-white/80 hover:bg-white/5 hover:text-white',
                    ].join(' ')}
                  >
                    {link.label}
                    <ChevronRight size={14} className="opacity-40" />
                  </motion.button>
                ))}
              </nav>

              {/* drawer CTA */}
              <div className="px-4 pb-8 pt-2 border-t border-white/10">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  onClick={() => handleNav('#contacto')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F5A623] py-3.5 text-sm font-bold text-[#1A3C6E] hover:bg-[#d4891a] transition-colors font-[Montserrat,sans-serif] tracking-wide"
                >
                  Solicitar Cotización
                  <ChevronRight size={15} />
                </motion.button>
                <div className="mt-4 text-center text-xs text-white/40 font-mono">
                  {EMPRESA.contacto.telefono} · Pisco, Ica
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}