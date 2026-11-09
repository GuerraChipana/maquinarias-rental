"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import type { Maquina } from "@/types";

function normalizarCategoria(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-");
}

export default function CategoryCatalogPage() {
  const params = useParams();
  const categoryParam = params?.category as string;
  // Limpiamos la categoría por si viene con codificación o espacios
  const category = categoryParam ? normalizarCategoria(categoryParam) : "";
  const [maquinas, setMaquinas] = useState<Maquina[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCatalog() {
      try {
        setLoading(true);
        const res = await fetch("/api/maquinas");

        if (!res.ok) {
          throw new Error("Error al cargar la información del servidor");
        }

        const data: Maquina[] = await res.json();

        if (category && category !== "todas") {
          const filtradas = data.filter(
            (m) => normalizarCategoria(m.categoria) === category,
          );

          setMaquinas(filtradas);
        } else {
          setMaquinas(data);
        }
      } catch (err: any) {
        setError(err.message || "Ocurrió un error inesperado");
      } finally {
        setLoading(false);
      }
    }

    loadCatalog();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center bg-slate-50 text-slate-500 font-mono text-xs uppercase tracking-widest">
        <Loader2 size={32} className="animate-spin text-[#F5A623] mb-4" />
        Cargando Flota desde Google Sheets...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg max-w-lg mx-auto mt-12">
        <h2 className="text-xl font-bold mb-2">Error de Carga</h2>
        <p className="text-sm">{error}</p>
      </div>
    );
  }
if (loading) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center bg-slate-50 text-slate-500 font-mono text-xs uppercase tracking-widest">
      <Loader2 size={32} className="animate-spin text-[#F5A623] mb-4" />
      Sincronizando inventario...
    </div>
  );
}

if (error) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center px-5">
      <AlertCircle size={40} className="text-red-500 mb-3" />
      <h2 className="text-xl font-black text-[#071324] uppercase">
        Error al cargar el catálogo
      </h2>
      <p className="text-sm text-slate-500 mt-2">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-5 px-5 py-3 bg-[#071324] text-white font-bold text-xs uppercase rounded-xl"
      >
        Reintentar
      </button>
    </div>
  );
}
  return (
    <div className="container mx-auto px-5 lg:px-12 py-12 font-[Montserrat,sans-serif]">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            href="/catalogo"
            className="text-xs font-mono text-slate-500 hover:text-[#F5A623] flex items-center gap-1 mb-2 uppercase"
          >
            <ArrowLeft size={14} /> Volver al catálogo
          </Link>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#071324] capitalize">
            {category && category !== "todas"
              ? `Categoría: ${category.replace("-", " ")}`
              : "Catálogo General de Flota"}
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            {maquinas.length}{" "}
            {maquinas.length === 1
              ? "unidad encontrada"
              : "unidades encontradas"}
          </p>
        </div>
      </div>

      {maquinas.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto shadow-sm">
          <AlertCircle size={40} className="mx-auto text-amber-500 mb-3" />
          <h3 className="text-base font-bold text-slate-800 uppercase">
            No hay equipos en esta categoría
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Intenta seleccionar otra categoría o verifica el Google Sheets.
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
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div
                  className="h-52 w-full bg-slate-100 bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${item.imagen}')` }}
                >
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 text-[10px] font-bold uppercase rounded-full shadow ${item.disponible ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}
                  >
                    {item.disponible ? "Disponible" : "En Obra"}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F5A623] bg-amber-50 px-2 py-0.5 rounded">
                    {item.categoria}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-2 uppercase">
                    {item.nombre}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.descripcion}
                  </p>

                  {item.caracteristicas && item.caracteristicas.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-1">
                      <p className="text-[10px] font-mono font-bold uppercase text-slate-400">
                        Características Clave:
                      </p>
                      <ul className="text-[11px] text-slate-700 space-y-1">
                        {item.caracteristicas.slice(0, 3).map((car, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-1.5 truncate"
                          >
                            <span className="h-1 w-1 rounded-full bg-[#F5A623]" />{" "}
                            {car}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link
                  href={`/cotizar?maquina=${item.id}`}
                  className="w-full block text-center py-3 bg-[#071324] hover:bg-[#10243d] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-colors shadow"
                >
                  Cotizar Equipo
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
