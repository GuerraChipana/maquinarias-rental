"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronRight,
  Phone,
  MapPin,
  HardHat,
  Clock,
  Mail,
} from "lucide-react";
import { EMPRESA } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");

  /* ── scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── close mobile menu on resize ── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    setActive(href.replace("#", ""));
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* ══ TOP STRIP (Contacto Rápido) ════════════════════════════ */}
      <div className="hidden lg:flex items-center justify-between bg-[#020509] border-b border-white/[0.05] px-8 py-2.5 text-[11px] text-white/60 font-[Montserrat,sans-serif]">
        {/* Lado Izquierdo: Ubicación y Horario */}
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2">
            <MapPin size={13} className="text-[#F5A623]" />
            Pisco, Ica — Cobertura en toda la región
          </span>
          <span className="h-3 w-px bg-white/10" />
          <span className="flex items-center gap-2">
            <Clock size={13} className="text-[#F5A623]" />
            Atención: Lun a Sáb de 7:00 AM a 6:00 PM
          </span>
        </div>

        {/* Lado Derecho: Contacto Directo */}
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${EMPRESA.contacto.email}`}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail size={13} className="text-[#F5A623]" />
            {EMPRESA.contacto.email}
          </a>
          <span className="h-3 w-px bg-white/10" />
          <a
            href={`tel:+51${String(EMPRESA.contacto.telefono).replace(/\s/g, "")}`}
            className="flex items-center gap-2 font-bold text-white hover:text-[#F5A623] transition-colors"
          >
            <Phone size={13} className="text-[#F5A623]" />
            {EMPRESA.contacto.telefono}
          </a>
        </div>
      </div>

      {/* ══ NAVBAR PRINCIPAL ═══════════════════════════════════════════ */}
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={[
          "sticky top-0 z-50 w-full transition-all duration-300 font-[Montserrat,sans-serif]",
          scrolled
            ? "bg-[#040a12]/95 backdrop-blur-md shadow-2xl shadow-black/50 border-b border-[#F5A623]/30"
            : "bg-[#040a12]",
        ].join(" ")}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 lg:px-8">
          {/* ── LOGO MAVTEC ── */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleNav("#inicio");
            }}
            className="flex items-center py-4 group"
            aria-label="MAVTEC E.I.R.L — Inicio"
          >
            {/* M (logo) */}
            <img
              src="/as.png"
              alt="MAVTEC Logo"
              className="h-12.5 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />

            {/* Texto pegado al logo */}
            <div className="-ml-2 flex flex-col leading-none">
              <span className="text-white font-black text-[1.8rem] tracking-tight uppercase">
                AVTEC
              </span>

              <span className="text-[#F5A623] text-[10px] font-bold tracking-[0.35em] uppercase mt-1">
                E.I.R.L
              </span>
            </div>
          </a>
          {/* ── DESKTOP LINKS (Panel Central) ── */}
          <ul className="hidden lg:flex items-stretch h-full">
            {NAV_LINKS.map((link, ) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <li key={link.href} className="flex">
                  <button
                    onClick={() => handleNav(link.href)}
                    className={`group relative flex items-center gap-2 px-6 py-6 text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {/* Index Monospace */}
                    <span
                      className={`font-mono text-[9px] transition-colors ${
                        isActive
                          ? "text-[#F5A623]"
                          : "text-white/20 group-hover:text-[#F5A623]/60"
                      }`}
                    >
                      {/* 0{i + 1} */}
                    </span>

                    {link.label}

                    {/* Indicador de Activo (Bottom Border Estricto) */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-border"
                        className="absolute bottom-0 left-0 h-1 w-full bg-[#F5A623]"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ── DESKTOP CTA (Botón Táctico) ── */}
          <div className="hidden lg:flex items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNav("#contacto")}
              className="group flex items-center gap-2 bg-[#F5A623] px-6 py-3 text-xs font-black uppercase tracking-widest text-[#040a12] transition-colors hover:bg-white"
            >
              Cotizar Equipo
              <ChevronRight
                size={14}
                strokeWidth={3}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.button>
          </div>

          {/* ── HAMBURGER (Móvil) ── */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="lg:hidden flex h-10 w-10 items-center justify-center bg-[#071324] border border-white/10 text-white hover:border-[#F5A623] transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="ham"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* ══ MOBILE DRAWER (Terminal Lateral) ═══════════════════════════ */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop Industrial */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-[#020509]/80 backdrop-blur-md lg:hidden"
            >
              {/* Textura sutil en el fondo oscuro */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />
            </motion.div>

            {/* Panel Principal */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm bg-[#040a12] border-l-4 border-[#F5A623] shadow-2xl lg:hidden flex flex-col font-[Montserrat,sans-serif]"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#071324]">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center bg-[#F5A623] text-[#040a12]">
                    <HardHat size={18} />
                  </div>
                  <div>
                    <span className="block text-white font-black text-sm tracking-tight leading-none mb-1">
                      MAVTEC
                    </span>
                    <span className="block text-[#F5A623] font-mono text-[8px] uppercase tracking-widest">
                      E.I.R.L
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 text-white/50 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Links (Comandos) */}
              <nav className="flex-1 px-6 py-8 space-y-2 overflow-y-auto">
                {/* <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">{'//'} Rutas del Sistema</div> */}

                {NAV_LINKS.map((link, i) => {
                  const isActive = active === link.href.replace("#", "");
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleNav(link.href)}
                      className={`group flex w-full items-center justify-between px-4 py-4 text-left text-xs font-black uppercase tracking-widest transition-all duration-200 border ${
                        isActive
                          ? "bg-[#F5A623] text-[#040a12] border-[#F5A623]"
                          : "bg-[#071324] text-white/60 border-white/5 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-[10px] ${isActive ? "text-[#040a12]/50" : "text-[#F5A623]"}`}
                        >
                          0{i + 1}
                        </span>
                        {link.label}
                      </div>
                      <ChevronRight
                        size={14}
                        className={isActive ? "opacity-100" : "opacity-30"}
                      />
                    </motion.button>
                  );
                })}
              </nav>

              {/* Drawer Footer (Acciones Rápidas) */}
              <div className="px-6 py-8 bg-[#071324] border-t border-white/5">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => handleNav("#contacto")}
                  className="group flex w-full items-center justify-center gap-2 bg-[#F5A623] py-4 text-xs font-black uppercase tracking-widest text-[#040a12] hover:bg-white transition-colors"
                >
                  Generar Requerimiento
                  <ChevronRight
                    size={14}
                    strokeWidth={3}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </motion.button>

                <div className="mt-5 flex items-center justify-center gap-4 text-[10px] text-white/40 font-mono tracking-widest uppercase">
                  <span>
                    <Phone size={10} className="inline mr-1" />{" "}
                    {EMPRESA.contacto.telefono}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
