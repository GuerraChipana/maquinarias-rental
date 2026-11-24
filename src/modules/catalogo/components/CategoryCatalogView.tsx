"use client";

import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useCotizacion } from "@/modules/cotizacion/components/ModalCotizacion";
import type { Maquina } from "@/types";

interface CategoryCatalogViewProps {
  maquinas: Maquina[];
  categoryLabel: string;
}

export default function CategoryCatalogView({
  maquinas,
  categoryLabel,
}: CategoryCatalogViewProps) {
  const { openModal } = useCotizacion();

  return (
    <section className="container mx-auto px-5 lg:px-12 py-12 font-[Montserrat,sans-serif]">
      <div className="mb-8">
        <Link
          href="/catalogo"
          className="text-xs font-mono text-slate-500 hover:text-[#F5A623] flex items-center gap-1 mb-2 uppercase"
        >
          <ArrowLeft size={14} /> Volver al catálogo
        </Link>
        <h1 className="text-3xl font-black uppercase tracking-tight text-[#071324] capitalize">
          Alquiler de {categoryLabel} en Pisco e Ica
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl">
          Consulta los equipos de {categoryLabel.toLowerCase()} de MAVTEC para
          proyectos de minería, construcción y obras civiles. Revisa sus
          características y disponibilidad, y solicita una cotización.
        </p>
        <p className="text-xs text-slate-500 mt-3 font-mono">
          {maquinas.length} {maquinas.length === 1 ? "equipo encontrado" : "equipos encontrados"}
        </p>
      </div>

      {maquinas.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto shadow-sm">
          <AlertCircle size={40} className="mx-auto text-amber-500 mb-3" />
          <h2 className="text-base font-bold text-slate-800 uppercase">
            No hay equipos publicados en esta categoría
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Consulta el catálogo completo o comunícate con MAVTEC para confirmar disponibilidad.
          </p>
          <Link
            href="/catalogo"
            className="mt-5 inline-block px-5 py-2.5 bg-[#071324] text-white font-bold text-xs uppercase rounded-xl"
          >
            Ver todo el catálogo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {maquinas.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.imagen}
                    alt={`${item.nombre} para alquiler en Pisco e Ica - MAVTEC`}
                    title={`${item.nombre} | Catálogo de maquinaria MAVTEC`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 text-[10px] font-bold uppercase rounded-full shadow ${item.disponible ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}
                  >
                    {item.disponible ? "Disponible" : "En obra"}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F5A623] bg-amber-50 px-2 py-0.5 rounded">
                    {item.categoria}
                  </span>
                  <h2 className="text-lg font-black text-slate-900 mt-2 uppercase">
                    {item.nombre}
                  </h2>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.descripcion}
                  </p>
                  {item.caracteristicas.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-1">
                      <p className="text-[10px] font-mono font-bold uppercase text-slate-400">
                        Características principales
                      </p>
                      <ul className="text-[11px] text-slate-700 space-y-1">
                        {item.caracteristicas.slice(0, 3).map((caracteristica) => (
                          <li key={caracteristica} className="flex items-start gap-1.5">
                            <span className="mt-1 h-1 w-1 rounded-full bg-[#F5A623] shrink-0" />
                            {caracteristica}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => openModal(item.id)}
                  disabled={!item.disponible}
                  className={`w-full block text-center py-3 font-black text-xs uppercase tracking-wider rounded-xl transition-colors shadow ${item.disponible ? "bg-[#071324] hover:bg-[#10243d] text-white" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
                >
                  {item.disponible ? "Cotizar equipo" : "Equipo en uso"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
