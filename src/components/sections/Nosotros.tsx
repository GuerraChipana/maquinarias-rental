'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Award,
  Users,
  ShieldCheck,
  MapPin,
  TrendingUp,
  Wrench,
} from 'lucide-react'

/* ── Contador animado al entrar en viewport ─────────────────── */
function AnimatedStat({
  value,
  suffix = '',
  label,
  delay = 0,
}: {
  value: number
  suffix?: string
  label: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center lg:items-start"
    >
      <div className="flex items-end gap-1 leading-none mb-2">
        <motion.span
          className="text-5xl xl:text-6xl font-black text-[#F5A623] font-[Montserrat,sans-serif] tracking-tight tabular-nums"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.1, duration: 0.4 }}
        >
          {inView ? (
            <CountUp to={value} duration={1.4} delay={delay} />
          ) : (
            '0'
          )}
        </motion.span>
        <span className="text-3xl font-black text-[#F5A623]/70 font-[Montserrat,sans-serif] mb-1">
          {suffix}
        </span>
      </div>
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 font-[Montserrat,sans-serif] text-center lg:text-left">
        {label}
      </span>
    </motion.div>
  )
}

/* Componente de conteo incremental */
function CountUp({
  to,
  duration,
  delay,
}: {
  to: number
  duration: number
  delay: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  // Usamos CSS counter trick vía motion value
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onViewportEnter={() => {
        if (!ref.current) return
        let start = 0
        const step = to / (duration * 60)
        const timer = setInterval(() => {
          start += step
          if (start >= to) {
            start = to
            clearInterval(timer)
          }
          if (ref.current) ref.current.textContent = Math.floor(start).toString()
        }, 1000 / 60)
      }}
    >
      0
    </motion.span>
  )
}

/* ── Valor / pilar de la empresa ───────────────────────────── */
const PILARES = [
  {
    icon: ShieldCheck,
    titulo: 'Seguridad primero',
    desc: 'Todos nuestros equipos pasan revisión técnica periódica y nuestros operadores cuentan con certificación vigente.',
  },
  {
    icon: TrendingUp,
    titulo: 'Puntualidad garantizada',
    desc: 'Entregamos el equipo en la fecha acordada o te descontamos un día. Sin excusas.',
  },
  {
    icon: Wrench,
    titulo: 'Mantenimiento incluido',
    desc: 'Falla mecánica durante el alquiler? La reponemos o cambiamos el equipo sin costo adicional.',
  },
  {
    icon: Users,
    titulo: 'Equipo comprometido',
    desc: 'Más de 10 años trabajando con empresas constructoras, agroindustriales y mineras de la región.',
  },
]

/* ── Timeline de hitos ─────────────────────────────────────── */
const HITOS = [
  { year: '2014', evento: 'Fundación de MAVTEC E.I.R.L en Pisco, Ica' },
  { year: '2016', evento: 'Incorporación de la primera flota de camiones cisterna' },
  { year: '2018', evento: 'Expansión a maquinaria pesada: tractores y compactadoras' },
  { year: '2021', evento: 'Certificación de operadores y ampliación de flota' },
  { year: '2024', evento: '+150 proyectos completados en toda la región Ica' },
]

/* ── Componente principal ───────────────────────────────────── */
export default function Nosotros() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="relative w-full bg-[#142e55] py-24 px-5 lg:px-16 xl:px-24 overflow-hidden"
    >
      {/* ── Fondos decorativos ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Diagonal line superior */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F5A623]/20 to-transparent" />
        {/* Blob naranja */}
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[#F5A623]/[0.04] blur-3xl translate-x-1/2" />
        {/* Blob azul oscuro */}
        <div className="absolute left-0 bottom-0 h-72 w-72 rounded-full bg-[#0e2140]/80 blur-3xl -translate-x-1/3 translate-y-1/3" />
        {/* Patrón de puntos */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* ══ BLOQUE SUPERIOR: texto + stats ══════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

          {/* Columna izquierda — Texto */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#F5A623]/30 bg-[#F5A623]/10 px-4 py-1.5 mb-6"
            >
              <Award size={12} className="text-[#F5A623]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623] font-[Montserrat,sans-serif]">
                Quiénes somos
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl font-black text-white tracking-tight font-[Montserrat,sans-serif] leading-[1.0] mb-6"
            >
              Más de una<br />
              década moviendo<br />
              <span className="text-[#F5A623]">el sur del Perú</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-sm text-white/55 leading-relaxed font-[Montserrat,sans-serif] mb-4 max-w-md"
            >
              MAVTEC E.I.R.L nació en Pisco con una misión clara: brindar maquinaria pesada
              de calidad con el servicio y la seriedad que los proyectos de construcción
              e industria requieren.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28, duration: 0.5 }}
              className="text-sm text-white/55 leading-relaxed font-[Montserrat,sans-serif] max-w-md"
            >
              Hoy operamos en toda la región Ica, trabajando con empresas constructoras,
              agroindustriales y entidades del Estado que confían en nuestra puntualidad
              y en la calidad de nuestra flota.
            </motion.p>

            {/* Ubicación */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.36, duration: 0.45 }}
              className="mt-7 inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5"
            >
              <MapPin size={14} className="text-[#F5A623] flex-shrink-0" />
              <span className="text-xs font-semibold text-white/60 font-[Montserrat,sans-serif]">
                Pisco · Ica · Perú — Atención en toda la región
              </span>
            </motion.div>
          </div>

          {/* Columna derecha — Stats en grid */}
          <div>
            {/* Caja decorativa exterior */}
            <div className="relative rounded-2xl border border-white/[0.08] bg-[#0e2140]/60 p-8 backdrop-blur-sm">
              {/* Línea top accent */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#F5A623]/40 to-transparent" />

              <div className="grid grid-cols-2 gap-10">
                <AnimatedStat value={10}  suffix="+"  label="Años de experiencia"   delay={0.1} />
                <AnimatedStat value={20}  suffix="+"  label="Equipos disponibles"   delay={0.2} />
                <AnimatedStat value={150} suffix="+"  label="Proyectos completados" delay={0.3} />
                <AnimatedStat value={100} suffix="%"  label="Clientes satisfechos"  delay={0.4} />
              </div>

              {/* Línea divisoria */}
              <div className="my-8 h-px bg-white/[0.06]" />

              {/* Certificaciones / badges */}
              <div className="flex flex-wrap gap-2">
                {[
                  'Operadores certificados',
                  'Seguro de responsabilidad',
                  'Mantenimiento preventivo',
                  'Flota actualizada',
                ].map((badge) => (
                  <span
                    key={badge}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40 font-[Montserrat,sans-serif]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ PILARES ═════════════════════════════════════════ */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-[#F5A623]/60 font-[Montserrat,sans-serif] mb-8 text-center"
          >
            Nuestros compromisos
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILARES.map((pilar, i) => {
              const Icon = pilar.icon
              return (
                <motion.div
                  key={pilar.titulo}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col rounded-2xl border border-white/[0.07] bg-[#0e2140]/50 p-6 transition-colors hover:border-[#F5A623]/20"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20">
                    <Icon size={18} className="text-[#F5A623]" />
                  </div>
                  <h4 className="text-sm font-black text-white font-[Montserrat,sans-serif] mb-2 leading-tight">
                    {pilar.titulo}
                  </h4>
                  <p className="text-xs text-white/45 font-[Montserrat,sans-serif] leading-relaxed">
                    {pilar.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ══ TIMELINE ════════════════════════════════════════ */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-[#F5A623]/60 font-[Montserrat,sans-serif] mb-10 text-center"
          >
            Nuestra historia
          </motion.h3>

          <div className="relative">
            {/* Línea vertical central */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#F5A623]/30 via-[#F5A623]/10 to-transparent -translate-x-1/2 hidden lg:block" />

            <div className="space-y-6">
              {HITOS.map((hito, i) => (
                <motion.div
                  key={hito.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={[
                    'flex items-center gap-6 lg:gap-0',
                    i % 2 === 0
                      ? 'lg:flex-row'
                      : 'lg:flex-row-reverse',
                  ].join(' ')}
                >
                  {/* Contenido */}
                  <div className={[
                    'flex-1 rounded-xl border border-white/[0.07] bg-[#0e2140]/50 px-5 py-4',
                    i % 2 === 0 ? 'lg:mr-10 lg:text-right' : 'lg:ml-10',
                  ].join(' ')}>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5A623]/60 font-[Montserrat,sans-serif]">
                      {hito.year}
                    </span>
                    <p className="text-sm font-semibold text-white/70 font-[Montserrat,sans-serif] mt-0.5">
                      {hito.evento}
                    </p>
                  </div>

                  {/* Nodo central (solo desktop) */}
                  <div className="hidden lg:flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#F5A623] bg-[#142e55] z-10">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#F5A623]" />
                  </div>

                  {/* Espacio opuesto */}
                  <div className="hidden lg:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}