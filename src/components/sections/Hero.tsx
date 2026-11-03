"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, ArrowDown, Shield, Clock, MapPin } from "lucide-react";
import { EMPRESA } from "@/lib/constants";

/* ── Contador animado simple ──────────────────────────── */
function StatItem({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center lg:items-start"
    >
      <span className="text-3xl lg:text-4xl font-black text-[#F5A623] leading-none font-[Montserrat,sans-serif] tracking-tight">
        {value}
      </span>
      <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/50 font-[Montserrat,sans-serif]">
        {label}
      </span>
    </motion.div>
  );
}

/* ── Badges flotantes ─────────────────────────────────── */
const BADGES = [
  { icon: Shield, text: "Servicio certificado", delay: 0.9 },
  { icon: Clock, text: "Disponibilidad 24/7", delay: 1.05 },
  { icon: MapPin, text: "Pisco · Ica · Perú", delay: 1.2 },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* parallax en imagen de fondo */
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  /* fade out content al hacer scroll */
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);

  const scrollToNextSection = () => {
    const el = document.querySelector("#servicios");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCotizacion = () => {
    const el = document.querySelector("#cotizacion");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCatalogo = () => {
    const el = document.querySelector("#catalogo");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-screen w-full flex flex-col overflow-hidden"
    >
      {/* ══ FONDO ════════════════════════════════════════════ */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        {/* Imagen de fondo — usamos gradient de placeholder hasta tener foto real */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/movimiento-de-tierra-2.png")',
          }}
        />
        {/* Capas de overlay para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e2140]/90 via-[#1A3C6E]/20 to-[#1A3C6E]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e2140]/90 via-transparent to-transparent" />
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* ══ Línea decorativa diagonal ═════════════════════════ */}
      <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#F5A623]/20 to-transparent hidden xl:block" />

      {/* ══ CONTENIDO PRINCIPAL ══════════════════════════════ */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-12 pb-8 lg:items-start lg:px-16 xl:px-24 lg:justify-center lg:pt-0"
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F5A623]/40 bg-[#F5A623]/15 px-4 py-1.5"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-[#F5A623] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623] font-[Montserrat,sans-serif]">
            Alquiler de Maquinaria Pesada
          </span>
        </motion.div>

        {/* Headline principal */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.35,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-center lg:text-left font-[Montserrat,sans-serif]"
          >
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.9] tracking-[-0.03em]">
              POTENCIA
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-[-0.03em]">
              <span className="text-[#F5A623]">SIN</span>
              <span className="text-white"> LÍMITES</span>
            </span>
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mt-6 max-w-lg text-center lg:text-left text-base lg:text-lg text-white/65 leading-relaxed font-[Montserrat,sans-serif]"
        >
          Tractores, compactadoras, grúas y camiones orugas para tus proyectos
          de construcción.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-9 flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          {/* CTA principal */}
          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 30px rgba(245,166,35,0.35)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToCotizacion}
            className="flex items-center justify-center gap-2.5 rounded-xl bg-[#F5A623] px-7 py-4 text-sm font-bold text-[#1A3C6E] shadow-lg hover:bg-[#d4891a] transition-colors duration-200 font-[Montserrat,sans-serif] tracking-wide uppercase"
          >
            Solicitar Cotización
            <ChevronRight size={16} className="mt-px" />
          </motion.button>

          {/* CTA secundario */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToCatalogo}
            className="flex items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-7 py-4 text-sm font-bold text-white hover:bg-white/10 hover:border-white/30 transition-all duration-200 font-[Montserrat,sans-serif] tracking-wide uppercase"
          >
            Ver Catálogo
          </motion.button>
        </motion.div>

        {/* Badges de confianza */}
        <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
          {BADGES.map(({ icon: Icon, text, delay }) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay, duration: 0.4 }}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-2"
            >
              <Icon size={13} className="text-[#F5A623] flex-shrink-0" />
              <span className="text-xs text-white/70 font-semibold font-[Montserrat,sans-serif] tracking-wide">
                {text}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ══ STATS BAR ════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-5 mb-8 lg:mx-16 xl:mx-24 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6"
      >
        {/* línea decorativa top */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#F5A623]/40 to-transparent" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          <StatItem value="+10" label="Años de experiencia" delay={1.2} />
          <StatItem value="+20" label="Equipos disponibles" delay={1.3} />
          <StatItem value="+150" label="Proyectos completados" delay={1.4} />
          <StatItem value="24/7" label="Disponibilidad" delay={1.5} />
        </div>
      </motion.div>

      {/* ══ SCROLL INDICATOR ═════════════════════════════════ */}
      <motion.button
        onClick={scrollToNextSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="absolute bottom-6 right-8 z-10 hidden lg:flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors group"
        aria-label="Desplazar hacia abajo"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-[Montserrat,sans-serif] rotate-90 mb-2">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
