"use client";

import { useState, useMemo, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  SlidersHorizontal,
  Activity,
  HardHat,
  ChevronRight,
  ArrowLeft,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import MachineCard from "@/components/ui/MachineCard";
import { useCotizacion } from "@/components/cotizacion/ModalCotizacion";
import { EMPRESA } from "@/lib/constants";
import type { Maquina } from "@/types";

// Interfaz local para manejar la nueva estructura de categorías que viene del Sheet
export interface CategoriaItem {
  id: string;
  label: string;
}

const TODAS = "todas";

export default function CatalogPage() {
  const router = useRouter();
  const { openModal } = useCotizacion();
  
  const [maquinarias, setMaquinarias] = useState<Maquina[]>([]);
  const [categorias, setCategorias] = useState<CategoriaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<string>(TODAS);
  const [busqueda, setBusqueda] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Conteo de máquinas por categoría basándose en la ID de la categoría
  const conteoPorCategoria = useMemo(() => {
    const counts: Record<string, number> = {};
    maquinarias.forEach((m) => {
      const catKey = m.categoria ? m.categoria.toLowerCase() : "general";
      counts[catKey] = (counts[catKey] || 0) + 1;
    });
    return counts;
  }, [maquinarias]);

  // Máquinas filtradas por categoría y término de búsqueda
  const maquinasFiltradas = useMemo(() => {
    return maquinarias.filter((m) => {
      const mCat = m.categoria ? m.categoria.toLowerCase() : "general";
      const matchCat = filtro === TODAS || mCat === filtro.toLowerCase();
      const matchSearch =
        m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        m.descripcion.toLowerCase().includes(busqueda.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [maquinarias, filtro, busqueda]);

  const handleCotizar = (maquina: Maquina) => {
    openModal(maquina.id);
  };

  const handleSelectCategoria = (catId: string) => {
    setFiltro(catId);
  };

  const telefonoLimpio = String(EMPRESA.contacto.telefono).replace(/\s/g, "");
  const whatsappUrl = `https://wa.me/51${telefonoLimpio}?text=${encodeURIComponent(
    "¡Hola MAVTEC! Deseo cotizar maquinaria de su catálogo completo.",
  )}`;

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMaquinarias() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/maquinas", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("No se pudo cargar el inventario.");
        }

        const data = await res.json();

        // Lógica segura para soportar tanto el nuevo formato dual como el fallback local
        if (data && typeof data === 'object' && !Array.isArray(data) && data.maquinaria) {
          setMaquinarias(data.maquinaria);
          
          let cats = data.categorias || [];
          // Garantizamos que la categoría "todas" siempre exista en el frontend
          if (!cats.some((c: CategoriaItem) => c.id === TODAS)) {
            cats = [{ id: TODAS, label: "Todas las Máquinas" }, ...cats];
          }
          setCategorias(cats);
        } 
        else if (Array.isArray(data)) {
          // Fallback por si la API aún devuelve el array antiguo directamente
          setMaquinarias(data);
          const uniqueCats = Array.from(new Set(data.map((m) => m.categoria)));
          setCategorias([
            { id: TODAS, label: "Todas las Máquinas" },
            ...uniqueCats.map(c => ({ id: c.toLowerCase(), label: c }))
          ]);
        } 
        else {
          throw new Error("El servidor devolvió un formato inválido.");
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        console.error("Error cargando catálogo:", err);
        setError(err instanceof Error ? err.message : "Error inesperado.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchMaquinarias();

    return () => controller.abort();
  }, []);

  // Generar título del filtro activo para la barra superior
  const getFiltroLabel = () => {
    if (filtro === TODAS) return "Todos los Equipos Disponibles";
    const found = categorias.find(c => c.id === filtro);
    return found ? found.label.toUpperCase() : `${filtro.toUpperCase()}S`;
  };

  return (
    <div className="w-full font-[Montserrat,sans-serif]">
      {/* ══ 1. HEADER HERO CON IMAGEN DE FONDO INDUSTRIAL ══════════════ */}
      <section className="relative bg-[#071324] border-b border-white/10 pt-12 pb-16 lg:pt-16 lg:pb-20 px-5 lg:px-12 xl:px-20 overflow-hidden">
        {/* Imagen de fondo de maquinaria pesada / movimiento de tierras */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
          style={{
            backgroundImage: 'url("/images/movimiento-de-tierra-2.png")',
          }}
        />

        {/* Degradados cinemáticos para que no se vea vacío y el texto destaque */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071324] via-[#071324]/85 to-[#071324]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-transparent to-transparent pointer-events-none" />

        {/* Textura de puntos sutil */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative mx-auto max-w-[1440px] z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-white/50 mb-6 uppercase">
            <Link
              href="/"
              className="flex items-center gap-1.5 hover:text-[#F5A623] transition-colors"
            >
              <ArrowLeft size={13} />
              Inicio
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-[#F5A623] font-bold">Catálogo Completo</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            {/* Título Principal */}
            <div className="border-l-[6px] border-[#F5A623] pl-6 max-w-2xl">
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#F5A623] uppercase block mb-2">
                Inventario General de Flota
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95]">
                Catálogo de <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] via-[#ffc059] to-[#F5A623]">
                  Maquinaria Pesada.
                </span>
              </h1>
              <p className="mt-4 text-xs md:text-sm text-white/70 leading-relaxed font-sans max-w-xl">
                Flota moderna y certificada para minería, obras civiles y
                movimiento de tierras. Equipos listos para despacho en Pisco,
                Ica y toda la región sur del Perú.
              </p>
            </div>

            {/* Badges de Estado y Cobertura */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
              <div className="flex items-center gap-4 bg-[#040a12]/90 backdrop-blur-md border border-white/10 p-5 shadow-2xl">
                <div className="bg-[#F5A623] p-3 text-[#040a12]">
                  <Activity size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    Estado de Flota
                  </p>
                  <p className="text-base font-black text-white leading-tight mt-0.5">
                    100% OPERATIVO
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 mt-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    {maquinarias.length} Equipos Registrados
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. CONTENIDO PRINCIPAL: SIDEBAR A UN COSTADO + GRID DE MÁQUINAS ══ */}
      <section className="relative w-full bg-[#eef1f5] py-12 lg:py-16 px-5 lg:px-12 xl:px-20 min-h-[700px] overflow-hidden">
        {/* Fondo "Plano Técnico" de Ingeniería */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.14]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(#071324 1px, transparent 1px), linear-gradient(90deg, #071324 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute top-10 left-10 w-6 h-6 border-l-2 border-t-2 border-[#071324]" />
          <div className="absolute top-10 right-10 w-6 h-6 border-r-2 border-t-2 border-[#071324]" />
          <div className="absolute bottom-10 left-10 w-6 h-6 border-l-2 border-b-2 border-[#071324]" />
          <div className="absolute bottom-10 right-10 w-6 h-6 border-r-2 border-b-2 border-[#071324]" />
        </div>

        <div className="relative mx-auto max-w-[1440px] z-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* ── 2.1 SIDEBAR LATERAL DE FILTROS (A UN COSTADO) ────── */}
            <aside className="w-full lg:w-80 xl:w-84 shrink-0 space-y-6 lg:sticky lg:top-24">
              {/* Buscador */}
              <div className="bg-[#071324] border border-[#142e55] p-5 shadow-xl">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5A623] mb-3 font-mono flex items-center gap-2">
                  <Search size={13} /> Buscar en Catálogo
                </label>
                <div
                  className={`relative flex items-center bg-[#040a12] border-2 transition-all duration-300 ${
                    isFocused
                      ? "border-[#F5A623] shadow-[0_0_15px_rgba(245,166,35,0.2)]"
                      : "border-white/10 hover:border-white/25"
                  }`}
                >
                  <input
                    type="text"
                    placeholder="NOMBRE, MODELO, MARCA..."
                    value={busqueda}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full bg-transparent px-3 py-3 text-xs font-bold text-white placeholder:text-white/30 focus:outline-none uppercase tracking-wider font-mono"
                  />
                  {busqueda && (
                    <button
                      onClick={() => setBusqueda("")}
                      className="mr-2 p-1 text-[#040a12] bg-[#F5A623] hover:bg-white transition-colors"
                      title="Limpiar búsqueda"
                    >
                      <X size={12} strokeWidth={3} />
                    </button>
                  )}
                </div>
              </div>

              {/* Categorías en Columna Vertical dinámicas */}
              <div className="bg-[#071324] border border-[#142e55] p-5 shadow-xl">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 flex items-center gap-2 font-mono">
                    <SlidersHorizontal size={13} className="text-[#F5A623]" />{" "}
                    Categorías
                  </span>
                  <span className="text-[10px] font-mono text-[#F5A623]">
                    {categorias.length} Clases
                  </span>
                </div>

                <div className="space-y-1.5">
                  {categorias.map((cat, idx) => {
                    const isActive = filtro === cat.id;
                    const cantidad = cat.id === TODAS ? maquinarias.length : (conteoPorCategoria[cat.id] || 0);

                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleSelectCategoria(cat.id)}
                        className={`group relative flex w-full items-center justify-between px-3.5 py-3 text-left text-xs font-black uppercase tracking-wider transition-all duration-200 border ${
                          isActive
                            ? "bg-[#F5A623] text-[#040a12] border-[#F5A623] shadow-md shadow-[#F5A623]/20 translate-x-1"
                            : "bg-[#040a12] text-white/70 border-white/[0.06] hover:border-[#F5A623]/50 hover:bg-[#0a182b] hover:text-white"
                        }`}
                      >
                        {/* Indicador de activo */}
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#040a12]" />
                        )}

                        <div className="flex items-center gap-2.5">
                          <span
                            className={`font-mono text-[9px] px-1.5 py-0.5 transition-colors ${
                              isActive
                                ? "bg-[#040a12]/20 text-[#040a12] font-black"
                                : "bg-white/[0.05] text-[#F5A623] group-hover:bg-[#F5A623] group-hover:text-[#040a12]"
                            }`}
                          >
                            0{idx}
                          </span>
                          <span className="truncate">
                            {cat.label.replace("-", " ")}
                          </span>
                        </div>

                        {/* Cantidad de unidades */}
                        <span
                          className={`font-mono text-[10px] ${
                            isActive
                              ? "text-[#040a12] font-black"
                              : "text-white/40 group-hover:text-[#F5A623]"
                          }`}
                        >
                          [{cantidad.toString().padStart(2, "0")}]
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Widget de Asesoría / Contacto Inmediato */}
              <div className="bg-[#071324] border-2 border-[#F5A623]/40 p-5 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center bg-[#F5A623] text-[#040a12]">
                    <HardHat size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-tight">
                      ¿Requieres Asesoría?
                    </h4>
                    <p className="text-[10px] font-mono text-white/40 uppercase">
                      Atención inmediata
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-white/60 mb-4 leading-relaxed font-sans">
                  Cotizamos equipos para minería y construcción con o sin
                  operador certificado.
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() => openModal()}
                    className="w-full bg-[#F5A623] hover:bg-white text-[#040a12] py-2.5 text-xs font-black uppercase tracking-widest transition-colors shadow flex items-center justify-center gap-2"
                  >
                    Cotizar Ahora
                    <ChevronRight size={14} />
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20b858] text-[#040a12] py-2.5 text-xs font-black uppercase tracking-widest transition-colors shadow flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={14} />
                    WhatsApp Directo
                  </a>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[10px] font-mono text-white/40">
                  <ShieldCheck size={13} className="text-[#F5A623]" />
                  <span>Flota certificada con póliza SCTR</span>
                </div>
              </div>
            </aside>

            {/* ── 2.2 GRID PRINCIPAL DE MÁQUINAS (COLUMNA DERECHA) ────── */}
            <main className="flex-1 w-full min-w-0">
              {/* Barra de Encabezado de Resultados */}
              <div className="mb-6 bg-white border border-slate-300 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-1 bg-[#F5A623]" />
                  <h2 className="text-sm md:text-base font-black text-[#071324] uppercase tracking-wider">
                    {getFiltroLabel()}
                  </h2>
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 border border-slate-200">
                    {maquinasFiltradas.length}{" "}
                    {maquinasFiltradas.length === 1 ? "unidad" : "unidades"}
                  </span>
                </div>

                {(filtro !== TODAS || busqueda) && (
                  <button
                    onClick={() => {
                      setFiltro(TODAS);
                      setBusqueda("");
                    }}
                    className="text-xs font-bold text-[#F5A623] hover:text-[#071324] uppercase tracking-wider flex items-center gap-1 self-start sm:self-auto font-mono transition-colors"
                  >
                    <X size={13} />
                    Ver Todo el Catálogo
                  </button>
                )}
              </div>

              {/* Grid de Tarjetas */}
              <AnimatePresence mode="popLayout">
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-32 text-center"
                  >
                    <Loader2 size={40} className="text-[#F5A623] animate-spin mb-4" />
                    <p className="text-xs font-black uppercase tracking-widest text-[#071324]/50 font-mono">
                      Sincronizando Catálogo...
                    </p>
                  </motion.div>
                ) : error ? (
                   <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center border-2 border-red-500/20 bg-red-50 p-8 shadow-sm max-w-lg mx-auto"
                  >
                    <AlertCircle size={30} className="text-red-500 mb-4" />
                    <h3 className="text-xl font-black text-red-900 uppercase tracking-tight">Error de Conexión</h3>
                    <p className="mt-2 text-xs text-red-700">{error}</p>
                  </motion.div>
                ) : maquinasFiltradas.length > 0 ? (
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {maquinasFiltradas.map((maquina, i) => (
                      <motion.div
                        key={maquina.id}
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: i * 0.04 }}
                      >
                        <MachineCard
                          maquina={maquina}
                          onCotizar={handleCotizar}
                          index={i}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  /* Estado vacío con diseño técnico */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-[#071324]/20 bg-white/90 p-8 shadow-sm max-w-lg mx-auto"
                  >
                    <div className="h-16 w-16 rounded-full bg-[#071324] text-[#F5A623] flex items-center justify-center mb-4">
                      <HardHat size={30} />
                    </div>
                    <h3 className="text-xl font-black text-[#071324] uppercase tracking-tight">
                      No se encontraron equipos
                    </h3>
                    <p className="mt-2 text-xs text-slate-500 max-w-sm">
                      No hay unidades que coincidan con &ldquo;
                      {busqueda || filtro}&rdquo;. Intenta con otra categoría o
                      restablece los filtros.
                    </p>
                    <button
                      onClick={() => {
                        setFiltro(TODAS);
                        setBusqueda("");
                      }}
                      className="mt-6 px-6 py-3 bg-[#F5A623] text-[#040a12] font-black text-xs uppercase tracking-widest hover:bg-[#071324] hover:text-white transition-colors"
                    >
                      Restablecer Catálogo
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}