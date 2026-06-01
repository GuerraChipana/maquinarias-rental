'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Copy,
  CheckSquare,
  Truck,
  Wrench,
  HardHat,
  ChevronRight,
  AlertTriangle
} from 'lucide-react'
import { EMPRESA } from '@/lib/constants'

/* ── Hook de Operatividad (Lógica de Horarios) ───────────────── */
function useCurrentTimeStatus() {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date()
      const day = now.getDay()
      const hour = now.getHours()

      if (day >= 1 && day <= 5) {
        setIsOpen(hour >= 7 && hour < 18)
      } else if (day === 6) {
        setIsOpen(hour >= 7 && hour < 13)
      } else {
        setIsOpen(false)
      }
    }

    checkStatus()
    const interval = setInterval(checkStatus, 60000)
    return () => clearInterval(interval)
  }, [])

  return isOpen
}

/* ── Tarjeta de Contacto Estilo "Ficha Técnica" ──────────────── */
function ContactBlock({
  icon: Icon,
  title,
  value,
  actionText,
  href,
  onClick,
  isPrimary = false
}: {
  icon: React.ElementType
  title: string
  value: string
  actionText: string
  href?: string
  onClick?: (e: React.MouseEvent) => void
  isPrimary?: boolean
}) {
  const Wrapper = href ? motion.a : motion.button
  
  return (
    <Wrapper
      href={href}
      onClick={onClick}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex w-full items-center justify-between border-l-4 bg-[#0d1f38] p-5 text-left transition-colors duration-200 hover:bg-[#122848] ${
        isPrimary ? 'border-[#F5A623]' : 'border-white/20 hover:border-[#F5A623]/60'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center bg-[#071324] ${isPrimary ? 'text-[#F5A623]' : 'text-white/70'}`}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 font-[Montserrat,sans-serif]">
            {title}
          </span>
          <span className="mt-1 block text-lg font-bold text-white font-[Montserrat,sans-serif] tracking-tight">
            {value}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 opacity-60 transition-opacity group-hover:opacity-100">
        <span className="hidden text-xs font-bold uppercase text-[#F5A623] sm:block">
          {actionText}
        </span>
        <ChevronRight size={18} className="text-[#F5A623]" />
      </div>
    </Wrapper>
  )
}

/* ── Componente Principal ──────────────────────────────────── */
export default function Contacto() {
  const isOpen = useCurrentTimeStatus()
  const [copied, setCopied] = useState(false)

  // Extraer datos
  const telefono = String((EMPRESA.contacto?.telefono ?? (EMPRESA as any).contacto?.celular ?? ''))
  const email = EMPRESA.contacto?.email ?? 'operaciones@mavtec.com'
  
  // URLs
  const whatsappMsg = encodeURIComponent('¡Hola MAVTEC! Requiero información para alquiler de maquinaria en mi obra.')
  const whatsappUrl = `https://wa.me/51${telefono.replace(/\s/g, '')}?text=${whatsappMsg}`

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="contacto"
      className="relative w-full bg-[#071324] py-24 px-5 lg:px-12 xl:px-20 border-t-8 border-[#F5A623] overflow-hidden"
    >
      {/* ── Fondo Industrial (Patrón de diagonales y texturas) ── */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 12px)'
          }}
        />
        <div className="absolute top-0 right-0 h-[800px] w-[800px] bg-[radial-gradient(circle_at_center,_#142e55_0%,_transparent_70%)] opacity-50 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* ── ENCABEZADO ESTRUCTURAL ───────────────────────────── */}
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            {/* Etiqueta de estado tipo "Panel" */}
            <div className="mb-6 inline-flex items-center gap-3 bg-[#0d1f38] px-4 py-2 border border-white/10">
              <div className="relative flex h-3 w-3 items-center justify-center">
                {isOpen && <span className="absolute inline-flex h-full w-full animate-ping bg-[#25D366] opacity-60"></span>}
                <span className={`relative inline-flex h-2.5 w-2.5 ${isOpen ? 'bg-[#25D366]' : 'bg-red-500'}`}></span>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/80 font-[Montserrat,sans-serif]">
                {isOpen ? 'Operaciones Activas' : 'Fuera de Turno'}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[1.05] font-[Montserrat,sans-serif]">
              Equipos listos <br className="hidden md:block"/>
              <span className="text-[#F5A623]">para tu obra.</span>
            </h2>
            <p className="mt-5 text-base text-white/60 font-[Montserrat,sans-serif] max-w-lg border-l-2 border-white/20 pl-4">
              Disponibilidad inmediata para proyectos en Ica, Pisco y toda la región. 
              Maquinaria operativa, mantenida y lista para trabajar.
            </p>
          </div>

          {/* Estadísticas Rápidas tipo "Dashboard" */}
          <div className="grid grid-cols-2 gap-4 shrink-0">
            <div className="bg-[#0d1f38] border border-white/10 p-4 min-w-[140px]">
              <Truck size={20} className="text-[#F5A623] mb-2" />
              <p className="text-2xl font-black text-white font-[Montserrat,sans-serif] leading-none">100%</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-1 font-[Montserrat,sans-serif]">Operatividad</p>
            </div>
            <div className="bg-[#0d1f38] border border-white/10 p-4 min-w-[140px]">
              <Wrench size={20} className="text-[#F5A623] mb-2" />
              <p className="text-2xl font-black text-white font-[Montserrat,sans-serif] leading-none">Soporte</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-1 font-[Montserrat,sans-serif]">Mecánico en Obra</p>
            </div>
          </div>
        </div>

        {/* ── GRID DE CONTENIDO ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* COLUMNA IZQUIERDA: Canales de Contacto (Col-5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* CTA Principal WhatsApp */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="group relative flex flex-col justify-center overflow-hidden bg-[#25D366] p-8 transition-all hover:bg-[#20b858]"
            >
              {/* Textura de fondo diagonal sutil */}
              <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgNDBsNDAtNDBIMHoiIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')]" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare size={16} className="text-[#071324]" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#071324] font-[Montserrat,sans-serif]">
                      Atención Rápida
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white font-[Montserrat,sans-serif]">Chat vía WhatsApp</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center bg-[#071324] text-[#25D366] shadow-lg transition-transform group-hover:translate-x-2">
                  <ChevronRight size={24} />
                </div>
              </div>
            </motion.a>

            {/* Fichas de contacto secundarias */}
            <ContactBlock 
              icon={Phone} 
              title="Central Telefónica" 
              value={`+51 ${telefono}`} 
              actionText="Llamar" 
              href={`tel:+51${telefono.replace(/\s/g, '')}`} 
              isPrimary={true}
            />
            
            <ContactBlock 
              icon={copied ? CheckSquare : Mail} 
              title="Cotizaciones y Documentos" 
              value={email} 
              actionText={copied ? "Copiado" : "Copiar"} 
              onClick={handleCopyEmail} 
            />

            {/* Horarios Estilo Tabla de Turnos */}
            <div className="mt-2 bg-[#0d1f38] border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-4">
                <Clock size={20} className="text-[#F5A623]" />
                <h4 className="text-sm font-bold uppercase tracking-widest text-white font-[Montserrat,sans-serif]">Turnos Operativos</h4>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-white/50 font-[Montserrat,sans-serif]">Lunes – Viernes</span>
                  <span className="text-sm font-bold text-white font-[Montserrat,sans-serif]">07:00 – 18:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-white/50 font-[Montserrat,sans-serif]">Sábados</span>
                  <span className="text-sm font-bold text-white font-[Montserrat,sans-serif]">07:00 – 18:00</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="flex items-center gap-2 text-sm font-bold text-[#F5A623] font-[Montserrat,sans-serif]">
                    <AlertTriangle size={14} /> Emergencias Obra
                  </span>
                  <span className="text-sm font-black text-[#F5A623] font-[Montserrat,sans-serif]">24 / 7</span>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA: Ubicación Logística (Col-7) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative h-full min-h-[400px] w-full bg-[#0d1f38] border border-white/10 overflow-hidden flex flex-col">
              
              {/* Header del mapa */}
              <div className="flex items-center justify-between bg-[#142e55] px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <HardHat size={20} className="text-[#F5A623]" />
                  <span className="text-sm font-bold uppercase tracking-widest text-white font-[Montserrat,sans-serif]">
                    Base Logística Principal
                  </span>
                </div>
                <span className="text-xs font-bold text-[#F5A623] font-[Montserrat,sans-serif]">Pisco, Ica</span>
              </div>

              {/* Contenedor del Iframe */}
              <div className="relative flex-1">
                {/* Overlay de filtro industrial para el mapa */}
                <div className="absolute inset-0 pointer-events-none mix-blend-color z-10 bg-[#071324] opacity-40" />
                
                {/* Reemplaza el src con tu enlace embed de Google Maps */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15555.267861935637!2d-76.2163484!3d-13.7167663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9110660ea91b7d8d%3A0x6b447605d3b10b03!2sPisco%2C%20Peru!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0, filter: 'grayscale(0.8) contrast(1.2)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Base de Operaciones MAVTEC en Pisco"
                />

                {/* Tarjeta superpuesta sobre el mapa */}
                <div className="absolute bottom-6 left-6 right-6 z-20 bg-[#071324]/95 backdrop-blur-sm border border-[#F5A623]/30 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center bg-[#F5A623] text-[#071324]">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-white font-[Montserrat,sans-serif] uppercase">Patio de Maquinarias MAVTEC</h4>
                      <p className="mt-1 text-xs text-white/60 font-[Montserrat,sans-serif]">
                        Atención directa y despacho de equipos para toda la región sur y alrededores.
                      </p>
                    </div>
                  </div>
                  {/* <a 
                    href="https://goo.gl/maps/tuEnlaceRealAqui" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="shrink-0 border border-[#F5A623] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#F5A623] transition-colors hover:bg-[#F5A623] hover:text-[#071324] font-[Montserrat,sans-serif]"
                  >
                    Cómo llegar
                  </a> */}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}