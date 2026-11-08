"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Phone, MapPin, Clock, Mail } from "lucide-react";
import { EMPRESA } from "@/lib/constants";
import { useCotizacion } from "@/components/cotizacion/ModalCotizacion";
import NavDrawer from "@/components/sections/NavDrawer";

const NAV_LINKS = [
  { label: "Inicio",    href: "#inicio"    },
  { label: "Servicios", href: "#servicios" },
  { label: "Catálogo",  href: "/catalogo"  },
  { label: "Nosotros",  href: "#nosotros"  },
  { label: "Contacto",  href: "#contacto"  },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("inicio");
  const router = useRouter();
  const pathname = usePathname();
  const { openModal } = useCotizacion();

  /* sincronizar enlace activo según la ruta actual */
  useEffect(() => {
    if (pathname === "/catalogo" || pathname.startsWith("/catalogo/")) {
      setActive("catalogo");
    } else if (pathname === "/") {
      setActive("inicio");
    }
  }, [pathname]);

  /* scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close drawer on desktop resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /**
   * Manejo inteligente de enlaces internos (#sección) y rutas (/catalogo)
   */
  const handleNav = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      setActive(id);
      if (pathname === "/") {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // Si estamos en /catalogo u otra página, regresar a la home con el hash correspondiente
        router.push(href === "#inicio" ? "/" : "/" + href);
      }
    } else {
      const id = href.replace("/", "");
      setActive(id);
      router.push(href);
    }
  };

  return (
    <>
      {/* ══ TOP STRIP ══════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex items-center justify-between bg-[#020509] border-b border-white/[0.05] px-8 py-2.5 text-[11px] text-white/60 font-[Montserrat,sans-serif]">
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

      {/* ══ HEADER PRINCIPAL ══════════════════════════════════════════════ */}
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

          {/* Logo (clic regresa a la página principal) */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNav("#inicio");
            }}
            className="flex items-center py-4 group"
            aria-label="MAVTEC E.I.R.L — Inicio"
          >
            <img
              src="/as.png"
              alt="MAVTEC Logo"
              className="h-12.5 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="-ml-2 flex flex-col leading-none">
              <span className="text-white font-black text-[1.8rem] tracking-tight uppercase">AVTEC</span>
              <span className="text-[#F5A623] text-[10px] font-bold tracking-[0.35em] uppercase mt-1">E.I.R.L</span>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-stretch h-full">
            {NAV_LINKS.map((link) => {
              const id = link.href.startsWith("#")
                ? link.href.replace("#", "")
                : link.href.replace("/", "");
              const isActive = active === id;
              return (
                <li key={link.href} className="flex">
                  <button
                    onClick={() => handleNav(link.href)}
                    className={`group relative flex items-center gap-2 px-6 py-6 text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
                      isActive ? "text-white" : "text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-border"
                        className="absolute bottom-0 left-0 h-1 w-full bg-[#F5A623]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA (Abre Cotización directamente) */}
          <div className="hidden lg:flex items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal()}
              className="group flex items-center gap-2 bg-[#F5A623] px-6 py-3 text-xs font-black uppercase tracking-widest text-[#040a12] transition-colors hover:bg-white shadow-lg shadow-[#F5A623]/10"
            >
              Cotizar Equipo
              <ChevronRight size={14} strokeWidth={3} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>

          {/* Hamburger (Móvil) */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="lg:hidden flex h-10 w-10 items-center justify-center bg-[#071324] border border-white/10 text-white hover:border-[#F5A623] transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span key="ham" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* ══ MOBILE DRAWER (Componente aparte) ════════════════════════════ */}
      <NavDrawer
        open={open}
        active={active}
        navLinks={NAV_LINKS}
        onClose={() => setOpen(false)}
        onNav={handleNav}
        onCotizar={() => openModal()}
      />
    </>
  );
}
