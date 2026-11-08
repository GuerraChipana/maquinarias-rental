"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, ChevronRight, HardHat, Phone, ShieldCheck, MapPin, Radio } from "lucide-react";
import { EMPRESA } from "@/lib/constants";

type NavLink = { label: string; href: string };

type Props = {
  open: boolean;
  active: string;
  navLinks: NavLink[];
  onClose: () => void;
  onNav: (href: string) => void;
  onCotizar?: () => void;
};

// Variantes de animación táctica industrial
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const panelVariants: Variants = {
  hidden: {
    x: "100%",
    boxShadow: "0 0 0 rgba(0,0,0,0)",
  },
  visible: {
    x: 0,
    boxShadow: "-15px 0 50px rgba(2, 5, 9, 0.9)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 28,
      mass: 0.85,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 32,
    },
  },
};

const navListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.12,
    },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, x: 28, skewX: -2 },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 26,
    },
  },
  exit: { opacity: 0, x: 20 },
};

export default function NavDrawer({ open, active, navLinks, onClose, onNav, onCotizar }: Props) {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <>
          {/* ══ 1. BACKDROP TÁCTICO OSCURO CON PATRÓN INDUSTRIAL ══ */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-[#020509]/85 backdrop-blur-md lg:hidden"
          >
            {/* Trama de puntos industriales sutil */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "radial-gradient(circle, #F5A623 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </motion.div>

          {/* ══ 2. PANEL LATERAL (ESTILO TERMINAL INDUSTRIAL) ══ */}
          <motion.div
            key="drawer"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 z-50 h-full w-[88%] max-w-sm bg-[#040a12] border-l-2 border-[#F5A623]/60 lg:hidden flex flex-col font-[Montserrat,sans-serif] overflow-hidden select-none"
          >
            {/* Tira diagonal de peligro (hazard stripe) decorativa */}
            <div
              className="h-1.5 w-full bg-gradient-to-r from-[#F5A623] via-[#FFB84D] to-[#F5A623] opacity-90"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #F5A623 0, #F5A623 10px, #040a12 10px, #040a12 20px)",
              }}
            />

            {/* ── HEADER DEL DRAWER ── */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#071324]/80 backdrop-blur-sm relative">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ rotate: -15, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="relative flex h-10 w-10 items-center justify-center bg-[#F5A623] text-[#040a12] font-black shadow-lg shadow-[#F5A623]/20"
                >
                  <HardHat size={20} strokeWidth={2.4} />
                  <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5A623] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                </motion.div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-black text-base tracking-tight leading-none uppercase">
                      MAVTEC
                    </span>
                    <span className="text-[#F5A623] font-mono text-[9px] font-bold px-1.5 py-0.5 bg-[#F5A623]/10 border border-[#F5A623]/30 tracking-widest">
                      PRO
                    </span>
                  </div>
                  <span className="block text-white/40 font-mono text-[9px] uppercase tracking-[0.2em] mt-1">
                    SISTEMA DE NAVEGACIÓN
                  </span>
                </div>
              </div>

              {/* Botón de cierre animado */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                aria-label="Cerrar navegación"
                className="flex h-9 w-9 items-center justify-center bg-white/[0.04] text-white/60 hover:text-white hover:bg-[#F5A623] hover:text-[#040a12] border border-white/10 transition-colors"
              >
                <X size={18} strokeWidth={2.5} />
              </motion.button>
            </div>

            {/* ── STATUS TÁCTICO ── */}
            <div className="flex items-center justify-between px-6 py-2.5 bg-[#020509]/60 border-b border-white/[0.04] text-[10px] font-mono text-white/40">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Radio size={12} className="animate-pulse" />
                BASE PISCO ACTIVA
              </span>
              <span className="tracking-widest uppercase">DISP. 24/7</span>
            </div>

            {/* ── LISTA DE ENLACES CON ANIMACIÓN EN CASCADA ── */}
            <motion.nav
              variants={navListVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 px-5 py-6 space-y-2.5 overflow-y-auto custom-scrollbar"
            >
              {navLinks.map((link, i) => {
                const targetId = link.href.startsWith("#")
                  ? link.href.replace("#", "")
                  : link.href.replace("/", "");
                const isActive = active === targetId;

                return (
                  <motion.div key={link.href} variants={navItemVariants}>
                    <motion.button
                      whileHover={{ x: 6 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onNav(link.href)}
                      className={`group relative flex w-full items-center justify-between px-4 py-3.5 text-left text-xs font-black uppercase tracking-wider transition-all duration-300 border ${
                        isActive
                          ? "bg-gradient-to-r from-[#F5A623] to-[#FFB84D] text-[#040a12] border-[#F5A623] shadow-md shadow-[#F5A623]/20"
                          : "bg-[#071324]/60 text-white/70 border-white/[0.06] hover:border-[#F5A623]/50 hover:bg-[#071324] hover:text-white"
                      }`}
                    >
                      {/* Borde activo lateral dinámico */}
                      {isActive && (
                        <motion.div
                          layoutId="drawer-active-accent"
                          className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#040a12]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}

                      <div className="flex items-center gap-3 relative z-10">
                        {/* Index estilo industrial monospace */}
                        <span
                          className={`font-mono text-[10px] px-1.5 py-0.5 rounded transition-colors ${
                            isActive
                              ? "bg-[#040a12]/20 text-[#040a12] font-black"
                              : "bg-white/[0.05] text-[#F5A623] group-hover:bg-[#F5A623] group-hover:text-[#040a12]"
                          }`}
                        >
                          0{i + 1}
                        </span>

                        <span className="tracking-widest">{link.label}</span>
                      </div>

                      {/* Flecha con animación lateral */}
                      <ChevronRight
                        size={15}
                        strokeWidth={2.5}
                        className={`transition-all duration-300 ${
                          isActive
                            ? "opacity-100 text-[#040a12] translate-x-1"
                            : "opacity-40 text-white/50 group-hover:opacity-100 group-hover:text-[#F5A623] group-hover:translate-x-1"
                        }`}
                      />
                    </motion.button>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* ── FOOTER INDUSTRIAL DEL DRAWER ── */}
            <div className="p-5 bg-[#071324] border-t border-white/[0.08] relative">
              {/* Botón CTA con efecto Glow Shimmer */}
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onClose();
                  if (onCotizar) {
                    onCotizar();
                  } else {
                    onNav("#contacto");
                  }
                }}
                className="relative overflow-hidden group flex w-full items-center justify-center gap-2 bg-[#F5A623] py-4 text-xs font-black uppercase tracking-widest text-[#040a12] hover:bg-white transition-colors duration-300 shadow-xl shadow-[#F5A623]/20"
              >
                {/* Resplandor animado al pasar el cursor */}
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
                />

                <span className="relative z-10 flex items-center gap-2">
                  Cotizar Requerimiento
                  <ChevronRight
                    size={16}
                    strokeWidth={3}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </motion.button>

              {/* Badges de soporte y ubicación */}
              <div className="mt-4 pt-3 border-t border-white/[0.05] grid grid-cols-2 gap-2 text-[10px] font-mono text-white/50">
                <a
                  href={`tel:+51${String(EMPRESA.contacto.telefono).replace(/\s/g, "")}`}
                  className="flex items-center gap-1.5 hover:text-[#F5A623] transition-colors truncate py-1"
                >
                  <Phone size={12} className="text-[#F5A623] shrink-0" />
                  <span className="truncate">{EMPRESA.contacto.telefono}</span>
                </a>

                <div className="flex items-center gap-1.5 justify-end text-white/40 py-1">
                  <MapPin size={12} className="text-[#F5A623] shrink-0" />
                  <span>Pisco, Ica</span>
                </div>
              </div>

              {/* Certificación MAVTEC */}
              <div className="mt-2.5 flex items-center justify-center gap-1 text-[9px] text-white/30 font-mono tracking-widest uppercase">
                <ShieldCheck size={11} className="text-[#F5A623]" />
                <span>Flota certificada para minería y obra</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
