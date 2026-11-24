"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import {
  ChevronRight,
  CheckCircle2,
  XCircle,
  Wrench,
  Target,
} from "lucide-react";
import type { Maquina } from "@/types";

interface MachineCardProps {
  maquina: Maquina;
  onCotizar: (maquina: Maquina) => void;
  index?: number;
}

/* Variantes para animación en cascada */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 24,
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: itemTransition },
};

export default function MachineCard({
  maquina,
  onCotizar,
  index = 0,
}: MachineCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.05,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex flex-col rounded-[24px] overflow-hidden border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:border-[#F5A623]/30 hover:shadow-[0_20px_40px_rgba(20,46,85,0.08)] cursor-pointer"
    >
      {/* ── 1. IMAGEN Y BADGES ─────────────────────────────────── */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        {/* Foto con zoom suave al hover */}
        <motion.div
          animate={{ scale: hovered ? 1.08 : 1, rotate: hovered ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 origin-center"
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: maquina.imagen
                ? `url("${maquina.imagen}")`
                : "none",
            }}
          />
        </motion.div>

        {/* Gradiente sutil para que los badges se lean bien */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#142e55]/60 via-transparent to-transparent opacity-80" />

        {/* Número decorativo gigante al fondo */}
        <div className="absolute -bottom-6 -left-2 pointer-events-none select-none overflow-hidden">
          <motion.span
            animate={{ x: hovered ? 10 : 0, opacity: hovered ? 0.2 : 0.1 }}
            transition={{ duration: 0.5 }}
            className="text-[7rem] font-black text-white leading-none tracking-tighter drop-shadow-md"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
        </div>

        {/* Badge Disponibilidad */}
        <motion.div
          animate={{ y: hovered ? -2 : 0 }}
          className={`absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border z-10 shadow-sm ${
            maquina.disponible
              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {maquina.disponible ? (
            <>
              <CheckCircle2
                size={12}
                className={hovered ? "animate-pulse" : ""}
              />{" "}
              Disponible
            </>
          ) : (
            <>
              <XCircle size={12} /> Ocupado
            </>
          )}
        </motion.div>

        {/* Badge Categoría */}
        <div className="absolute top-4 left-4 rounded-xl border border-white/40 bg-white/90 backdrop-blur-md px-3 py-1.5 z-10 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#142e55]">
            {maquina.categoria.replace("-", " ")}
          </span>
        </div>
      </div>

      {/* ── 2. CONTENIDO PRINCIPAL ─────────────────────────────── */}
      <div className="flex flex-1 flex-col p-6 relative z-10">
        {/* Cabecera (Nombre y Desc) */}
        <div className="mb-5">
          <h3 className="text-xl font-black text-[#142e55] leading-tight tracking-tight mb-2 group-hover:text-[#F5A623] transition-colors duration-300">
            {maquina.nombre}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
            {maquina.descripcion}
          </p>
        </div>

        <div className="h-px w-full bg-slate-100 mb-5" />

        {/* ── ESPECIFICACIONES TÉCNICAS (Animación en cascada) ── */}
        {maquina.caracteristicas.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Wrench size={14} className="text-[#F5A623]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#142e55]">
                Ficha Técnica
              </span>
            </div>
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-2.5"
            >
              {maquina.caracteristicas.slice(0, 4).map((item) => (
                <motion.li
                  variants={itemVariants}
                  key={item}
                  className="flex items-start gap-2.5 text-xs text-slate-600 font-medium"
                >
                  <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#142e55]" />
                  <span className="leading-tight">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        )}

        {/* ── APLICACIONES (Formato Tags/Chips) ── */}
        {maquina.usos.length > 0 && (
          <div className="mb-7 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Target size={14} className="text-[#F5A623]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#142e55]">
                Aplicaciones
              </span>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2"
            >
              {maquina.usos.slice(0, 4).map((uso) => (
                <motion.span
                  variants={itemVariants}
                  key={uso}
                  className="rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  {uso}
                </motion.span>
              ))}
            </motion.div>
          </div>
        )}

        {/* ── 3. BOTÓN DE ACCIÓN ───────────────────────────────── */}
        <motion.button
          whileHover={{ scale: maquina.disponible ? 1.03 : 1 }}
          whileTap={{ scale: maquina.disponible ? 0.97 : 1 }}
          onClick={() => onCotizar(maquina)}
          disabled={!maquina.disponible}
          className={`relative mt-auto flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden ${
            maquina.disponible
              ? "bg-[#142e55] text-white shadow-lg hover:shadow-xl hover:bg-[#1a3a6a]"
              : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
          }`}
        >
          <span className="relative z-10 flex items-center gap-2">
            {maquina.disponible ? "Cotizar Equipo" : "Equipo en Uso"}
            {maquina.disponible && (
              <AnimatePresence>
                {hovered && (
                  <motion.span
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -10, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <ChevronRight
                      size={18}
                      strokeWidth={3}
                      className="text-[#F5A623]"
                    />
                  </motion.span>
                )}
              </AnimatePresence>
            )}
          </span>
        </motion.button>
      </div>

      {/* Línea decorativa inferior */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "circOut" }}
        className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-[#F5A623] via-[#ffd085] to-[#F5A623] origin-left"
      />
    </motion.article>
  );
}
