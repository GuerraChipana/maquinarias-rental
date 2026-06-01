'use client'

import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ChevronRight,
  Send,
} from 'lucide-react'
import { EMPRESA } from '@/lib/constants'

/* ── Tarjeta de canal de contacto ──────────────────────────── */
function ContactoCard({
  icon: Icon,
  label,
  value,
  sub,
  href,
  color,
  delay,
}: {
  icon: React.ElementType
  label: string
  value: string
  sub?: string
  href: string
  color: string
  delay: number
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, scale: 1.01 }}
      className="group flex flex-col rounded-2xl border border-white/[0.08] bg-[#83858262] p-6 transition-all duration-200 hover:border-white/15 cursor-pointer"
    >
      {/* Icono */}
      <div
        className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-200"
        style={{
          background: `${color}12`,
          borderColor: `${color}25`,
        }}
      >
        <Icon size={20} style={{ color }} />
      </div>

      {/* Label */}
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-[Montserrat,sans-serif] mb-1.5"
        style={{ color }}
      >
        {label}
      </span>

      {/* Valor principal */}
      <span className="text-sm font-black text-white font-[Montserrat,sans-serif] leading-tight mb-1">
        {value}
      </span>

      {/* Sub */}
      {sub && (
        <span className="text-xs text-white/40 font-[Montserrat,sans-serif]">{sub}</span>
      )}

      {/* Arrow */}
      <div className="mt-4 flex items-center gap-1 text-xs font-bold font-[Montserrat,sans-serif] transition-colors duration-200"
        style={{ color: `${color}80` }}
      >
        <span>Contactar</span>
        <ChevronRight size={12} className="mt-px group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </motion.a>
  )
}

/* ── Horario row ───────────────────────────────────────────── */
function HorarioRow({ dia, hora }: { dia: string; hora: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-white/[0.06] last:border-0">
      <span className="text-xs font-semibold text-white/50 font-[Montserrat,sans-serif]">{dia}</span>
      <span className="text-xs font-bold text-white/75 font-[Montserrat,sans-serif]">{hora}</span>
    </div>
  )
}

/* ── Componente principal ──────────────────────────────────── */
export default function Contacto() {
  const telefono = String(
    (EMPRESA.contacto.telefono ?? (EMPRESA as any).contacto.celular ?? '')
  )

  const whatsappMsg = encodeURIComponent(
    '¡Hola MAVTEC! Quisiera solicitar información sobre el alquiler de maquinaria pesada.'
  )
  const whatsappUrl = `https://wa.me/51${telefono.replace(/\s/g, '')}?text=${whatsappMsg}`
// rgb(131 133 130 / 38%)
  return (
    <section
      id="contacto"
      className="relative w-full bg-[#142e55] py-24 px-5 lg:px-16 xl:px-24 overflow-hidden"
    >
      {/* ── Fondos decorativos ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F5A623]/20 to-transparent" />
        <div className="absolute left-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#F5A623]/[0.04] blur-3xl -translate-x-1/2" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#0e2140]/70 blur-3xl translate-x-1/3 translate-y-1/3" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#F5A623]/30 bg-[#F5A623]/10 px-4 py-1.5 mb-5"
            >
              <Send size={11} className="text-[#F5A623]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623] font-[Montserrat,sans-serif]">
                Hablemos
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl font-black text-white tracking-tight font-[Montserrat,sans-serif] leading-[1.0]"
            >
              ¿Necesitás un<br />
              <span className="text-[#F5A623]">equipo hoy?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="mt-4 max-w-md text-sm text-white/50 leading-relaxed font-[Montserrat,sans-serif]"
            >
              Respondemos en menos de 2 horas. Contamos con disponibilidad inmediata
              en la mayoría de equipos para proyectos en Pisco, Ica y alrededores.
            </motion.p>
          </div>

          {/* CTA WhatsApp destacado */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(37,211,102,0.25)' }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 self-start lg:self-auto flex items-center gap-3 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#1db954] transition-colors font-[Montserrat,sans-serif] tracking-wide"
          >
            <MessageCircle size={18} />
            Escribir por WhatsApp
          </motion.a>
        </div>

        {/* ── GRID PRINCIPAL ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Columna izquierda — Canales de contacto */}
          <div className="lg:col-span-1 space-y-4">

            <ContactoCard
              
              icon={Phone}
              label="Teléfono directo"
              value={telefono ? `+51 ${telefono}` : 'No disponible'}
              sub="Llamadas y WhatsApp"
              href={`tel:+51${telefono.replace(/\s/g, '')}`}
              color="#ff9900"
              
              delay={0.1}
            />

            <ContactoCard
              icon={MessageCircle}
              label="WhatsApp"
              value="Chat inmediato"
              sub="Respondemos en minutos"
              href={whatsappUrl}
              color="#00ff5e"
              delay={0.17}
            />

            <ContactoCard
              icon={Mail}
              label="Correo electrónico"
              value={EMPRESA.contacto.email ?? 'No disponible'}
              sub="Respuesta en menos de 2h"
              href={`mailto:${EMPRESA.contacto.email}`}
              color="#3d9bff"
              delay={0.24}
            />

            <ContactoCard
              icon={MapPin}
              label="Ubicación"
              value="Pisco, Ica — Perú"
              sub="Operamos en toda la región"
              href="https://maps.google.com/?q=Pisco,Ica,Peru"
              color="#f14545"
              delay={0.31}
            />

            {/* Horarios */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.38, duration: 0.5 }}
              className="rounded-2xl border border-white/[0.08] bg-[#0e2140]/60 p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock size={13} className="text-[#F5A623]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5A623] font-[Montserrat,sans-serif]">
                  Horario de atención
                </span>
              </div>
              <HorarioRow dia="Lunes — Viernes" hora="7:00 am – 6:00 pm" />
              <HorarioRow dia="Sábados" hora="7:00 am – 1:00 pm" />
              <HorarioRow dia="Emergencias" hora="24 / 7" />
            </motion.div>
          </div>

          {/* Columna derecha — Mapa embed */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Mapa Google */}
            <div className="relative flex-1 min-h-[340px] rounded-2xl overflow-hidden border border-white/[0.08]">
              {/* Overlay de color para integrar con el tema */}
              <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/10" />

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60876.!2d-76.2022!3d-13.7169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9110ef1ac5cfcb91%3A0xa697e5f6c1e0b25f!2sPisco%2C%20Ica!5e0!3m2!1ses!2spe!4v1234567890"
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full grayscale contrast-[1.1] opacity-80"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.4) brightness(0.85)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de MAVTEC E.I.R.L en Pisco, Ica"
              />

              {/* Pin overlay */}
              <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="flex flex-col items-center">
                  <div className="rounded-xl border border-[#F5A623]/40 bg-[#1A3C6E]/90 backdrop-blur-sm px-4 py-2.5 shadow-xl">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#F5A623] animate-pulse" />
                      <span className="text-xs font-black text-white font-[Montserrat,sans-serif]">
                        MAVTEC E.I.R.L
                      </span>
                    </div>
                    <span className="text-[10px] text-white/50 font-[Montserrat,sans-serif] block mt-0.5">
                      Pisco, Ica — Perú
                    </span>
                  </div>
                  <div className="w-px h-4 bg-[#F5A623]/60" />
                  <div className="h-2 w-2 rounded-full bg-[#F5A623]" />
                </div>
              </div>
            </div>

            {/* Banda de respuesta rápida */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '< 2h', label: 'Tiempo de respuesta' },
                { value: '24/7', label: 'Emergencias' },
                { value: '100%', label: 'Atención personalizada' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.45 }}
                  className="flex flex-col items-center justify-center rounded-xl border border-white/[0.07] bg-[#0e2140]/60 py-4 px-3 text-center"
                >
                  <span className="text-xl font-black text-[#F5A623] font-[Montserrat,sans-serif] leading-none mb-1">
                    {item.value}
                  </span>
                  <span className="text-[10px] text-white/35 font-semibold uppercase tracking-widest font-[Montserrat,sans-serif]">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}