"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award,
  Users,
  ShieldCheck,
  MapPin,
  TrendingUp,
  Wrench,
  CheckCircle2,
} from "lucide-react";

/* ── Contador Animado (CountUp) ────────────────────────────── */
function CountUp({
  to,
  duration,
  delay,
}: {
  to: number;
  duration: number;
  delay: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      onAnimationComplete={() => {
        if (!ref.current) return;
        let start = 0;
        const step = to / (duration * 60);
        const timer = setInterval(() => {
          start += step;
          if (start >= to) {
            start = to;
            clearInterval(timer);
          }
          if (ref.current)
            ref.current.textContent = Math.floor(start).toString();
        }, 1000 / 60);
      }}
    >
      0
    </motion.span>
  );
}

/* ── Tarjeta de Estadística Agresiva (Industrial Stat) ─────── */
function IndustrialStat({
  value,
  suffix = "",
  label,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 200 }}
      className="relative flex flex-col justify-center p-6 md:p-8 bg-gradient-to-br from-[#081226] to-[#0a1833] border-t-4 border-[#F5A623] shadow-2xl group hover:-translate-y-2 transition-transform duration-300"
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
      }}
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none" />

      <div className="flex items-baseline gap-1 leading-none mb-2 relative z-10">
        <motion.span
          className="text-5xl lg:text-6xl font-black text-white tracking-tighter"
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: delay + 0.2, duration: 0.4 }}
        >
          {inView ? <CountUp to={value} duration={1.5} delay={delay} /> : "0"}
        </motion.span>
        <span className="text-3xl font-black text-[#F5A623]">{suffix}</span>
      </div>
      <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/60 relative z-10">
        {label}
      </span>

      {/* Brillo inferior */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#F5A623]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

/* ── Datos Estáticos ────────────────────────────────────────── */
const PILARES = [
  {
    icon: ShieldCheck,
    titulo: "Seguridad Total",
    desc: "Equipos bajo revisión técnica estricta.",
  },
  {
    icon: TrendingUp,
    titulo: "Puntualidad",
    desc: "Logística de entrega precisa en obra.",
  },
  {
    icon: Wrench,
    titulo: "Respaldo Técnico",
    desc: "Mantenimiento preventivo incluido.",
  },
  {
    icon: Users,
    titulo: "Aliado Estratégico",
    desc: "Socios de las grandes constructoras.",
  },
];

const HITOS = [
  { year: "2014", evento: "Fundación de MAVTEC en Pisco." },
  { year: "2016", evento: "Ingreso de flota de camiones cisterna." },
  { year: "2018", evento: "Expansión: maquinaria de movimiento de tierras." },
  { year: "2021", evento: "Certificación oficial de nuestros operadores." },
  { year: "2024", evento: "Más de 150 proyectos completados en Ica." },
];

/* ── Componente Principal ───────────────────────────────────── */
export default function Nosotros() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="relative w-full bg-[#142e55] pt-24 pb-32 overflow-hidden"
    >
      {/* ── CORTE GEOMÉTRICO SUPERIOR (Conexión con el gris del Catálogo) ── */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -mt-[1px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="w-full h-[40px] md:h-[80px] lg:h-[120px] text-[#142e55]"
        >
          <polygon points="0,100 1440,100 1440,0" fill="currentColor" />
        </svg>
      </div>

      {/* FONDOS AMBIENTALES */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-0 top-0 h-[800px] w-[800px] rounded-full bg-[#F5A623]/[0.04] blur-[120px] translate-x-1/3 -translate-y-1/4" />
        <div className="absolute left-0 bottom-0 h-[800px] w-[800px] rounded-full bg-[#081226]/80 blur-[150px] -translate-x-1/3 translate-y-1/4" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-12 xl:px-20 pt-10 md:pt-20">
        {/* ══ 1. HERO ASIMÉTRICO (Texto vs Imagen Masiva) ══════════════ */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mb-24 lg:mb-32">
          {/* Columna Izquierda: Textos */}
          <div className="w-full lg:w-[50%] xl:w-[45%] relative z-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5 bg-[#F5A623]/10 border border-[#F5A623]/30 px-4 py-2 mb-6 rounded-full"
            >
              <div className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623]">
                Nuestra Historia
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-[4.5rem] font-black text-white tracking-tighter leading-[1.0] mb-8 uppercase"
            >
              CONSTRUYENDO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] to-[#ffc86b]">
                CONFIANZA.
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6 text-base md:text-lg text-white/70 leading-relaxed font-medium"
            >
              <p>
                MAVTEC E.I.R.L nació en Pisco con una misión inquebrantable:
                brindar maquinaria pesada de alto rendimiento con el nivel de
                seriedad operativa que la gran industria exige.
              </p>
              <p>
                Hoy somos el aliado estratégico de las principales constructoras
                y mineras de la región Ica, empresas que no pueden permitirse un
                solo segundo de inactividad.
              </p>
            </motion.div>

            {/* Tarjeta de Ubicación Flotante */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-10 inline-flex items-center gap-5 bg-white/[0.03] border border-white/10 backdrop-blur-md p-4 rounded-2xl shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center bg-[#F5A623] rounded-xl shadow-inner">
                <MapPin size={24} className="text-[#081226]" />
              </div>
              <div>
                <p className="text-sm font-black text-white uppercase tracking-widest mb-1">
                  Sede Central: Pisco
                </p>
                {/* <p className="text-xs font-semibold text-[#F5A623]">Cobertura total en Región Ica</p> */}
                <p className="text-xs font-semibold text-[#F5A623]">
                  Cobertura total
                </p>
              </div>
            </motion.div>
          </div>

          {/* Columna Derecha: Imagen Industrial (Corte Agresivo) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-[50%] xl:w-[55%] h-[400px] md:h-[500px] lg:h-[650px] relative group"
          >
            {/* El clip-path crea un corte diagonal dinámico */}
            <div
              className="absolute inset-0 bg-cover bg-center shadow-2xl transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1800&auto=format&fit=crop')",
                clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)", // Corte diagonal en la esquina superior izquierda
              }}
            >
              {/* Overlay de color para que no desentone */}
              <div className="absolute inset-0 bg-[#081226]/30 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
            </div>

            {/* Etiqueta flotante sobre la imagen */}
            <div className="absolute bottom-8 -left-6 md:left-[-20px] bg-white text-[#081226] py-3 px-6 shadow-2xl rounded-r-2xl flex items-center gap-3">
              <CheckCircle2 size={20} className="text-[#F5A623]" />
              <span className="font-black uppercase tracking-wider text-sm">
                Operatividad Garantizada
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── 2. ESTADÍSTICAS INDUSTRIALES ───────────────────────── */}
        <div className="relative z-30 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-24">
          <IndustrialStat
            value={10}
            suffix="+"
            label="Años de Experiencia"
            delay={0.1}
          />
          <IndustrialStat
            value={20}
            suffix="+"
            label="Equipos en Flota"
            delay={0.2}
          />
          <IndustrialStat
            value={150}
            suffix="+"
            label="Obras Exitosas"
            delay={0.3}
          />
          <IndustrialStat
            value={100}
            suffix="%"
            label="Operatividad"
            delay={0.4}
          />
        </div>
      </div>

      {/* ══ 3. CINTA AMARILLA (The SEMA Ribbon Style) ══════════════ */}
      {/* Esta cinta cruza de lado a lado con una inclinación de -3 grados */}
      <div className="relative w-full bg-[#F5A623] py-20 mt-10 mb-32 transform -skew-y-2 shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden z-20 border-y-[6px] border-[#d4891a]">
        {/* Textura sutil en la cinta para que no sea un color plano */}
        <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.05] pointer-events-none" />

        <div className="transform skew-y-2 max-w-[1400px] mx-auto px-5 lg:px-12 xl:px-20">
          <div className="flex flex-col xl:flex-row gap-12 items-center justify-between">
            {/* Título de la cinta */}
            <div className="xl:w-1/4 text-center xl:text-left">
              <h3 className="text-4xl md:text-5xl font-black text-[#050B14] uppercase tracking-tighter leading-[0.9]">
                Nuestros <br /> Pilares
              </h3>
              <div className="w-20 h-2 bg-[#050B14] mt-5 mx-auto xl:mx-0 rounded-full" />
            </div>

            {/* Grid de Pilares (Vertical en móvil, Horizontal en Desktop) */}
            <div className="xl:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {PILARES.map((pilar, i) => {
                const Icon = pilar.icon;
                return (
                  <motion.div
                    key={pilar.titulo}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center xl:items-start text-center xl:text-left group bg-white/10 p-6 rounded-2xl border border-[#050B14]/10 hover:bg-white/20 transition-colors"
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#050B14] text-[#F5A623] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-xl">
                      <Icon size={24} strokeWidth={2.5} />
                    </div>
                    <h4 className="text-base font-black text-[#050B14] uppercase tracking-wider mb-2">
                      {pilar.titulo}
                    </h4>
                    <p className="text-sm text-[#050B14]/80 font-bold leading-snug">
                      {pilar.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ══ 4. TIMELINE HORIZONTAL (Solución a tu problema) ═══════ */}
      {/* Ya no alarga la pantalla hacia abajo, todo fluye de izquierda a derecha */}
      <div className="relative mx-auto max-w-[1400px] z-10 px-5 lg:px-12 xl:px-20">
        <div className="text-center mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase"
          >
            Línea de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] to-[#ffc86b]">
              Evolución
            </span>
          </motion.h3>
          <p className="text-white/50 mt-4 text-lg">
            Desliza para ver nuestra trayectoria
          </p>
        </div>

        {/* Contenedor del Timeline Horizontal */}
        <div className="relative w-full">
          {/* La Línea Continua de Fondo */}
          <div className="absolute top-[28px] left-0 w-full h-1.5 bg-[#081226] rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
            <motion.div
              className="h-full bg-[#F5A623]"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>

          {/* Carrusel Horizontal de Hitos */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 lg:gap-10 pb-12 pt-2 hide-scrollbar">
            {HITOS.map((hito, i) => (
              <motion.div
                key={hito.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="flex flex-col min-w-[280px] lg:min-w-[320px] snap-center relative group"
              >
                {/* El "Nodo" en la línea de tiempo */}
                <div className="flex items-center mb-8 relative z-10">
                  <div className="h-12 w-12 rounded-full bg-[#142e55] border-4 border-[#F5A623] flex items-center justify-center shadow-[0_0_15px_rgba(245,166,35,0.4)] group-hover:scale-125 transition-transform duration-300">
                    <div className="h-3 w-3 bg-[#F5A623] rounded-full" />
                  </div>
                </div>

                {/* La Tarjeta de Información */}
                <div
                  className="bg-[#081226] p-6 lg:p-8 border-t-4 border-[#F5A623] relative group-hover:-translate-y-2 transition-transform duration-300 shadow-xl"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)",
                  }}
                >
                  {/* Año gigante de fondo */}
                  <div className="absolute top-2 right-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                    <span className="text-7xl font-black text-white">
                      {hito.year.slice(2)}
                    </span>
                  </div>

                  <span className="inline-block px-3 py-1 mb-4 text-xs font-black uppercase tracking-widest text-[#050B14] bg-[#F5A623]">
                    Año {hito.year}
                  </span>
                  <p className="text-base font-bold text-white/90 leading-snug relative z-10">
                    {hito.evento}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Ocultar barra de scroll en el timeline horizontal */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />
    </section>
  );
}
