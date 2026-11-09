'use client';

import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Minus,
  Plus,
  CalendarDays,
  MapPin,
  Tractor,
  Trash2,
  PlusCircle,
  Loader2,
  Wrench,
} from 'lucide-react';
import { getMaquinariasHibrido } from '@/app/actions/db';
import type { CotizacionFormData } from '@/lib/validations';
import type { Maquina, CategoriaItem } from '@/types';

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/60 font-[Montserrat,sans-serif]">
        {label}
        {required && <span className="text-[#F5A623]">*</span>}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] text-red-400 font-[Montserrat,sans-serif] font-semibold"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

const inputBase = [
  'w-full rounded-xl border bg-white/[0.05] px-4 py-3 text-sm text-white',
  'font-[Montserrat,sans-serif] placeholder:text-white/25',
  'focus:outline-none transition-colors duration-200',
  'appearance-none',
].join(' ');

const inputOk = 'border-white/10 focus:border-[#F5A623]/60 focus:bg-white/[0.08]';
const inputError = 'border-red-500/50 focus:border-red-500/70 bg-red-500/[0.04]';

export default function SelectorMaquina() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CotizacionFormData>();

  const [maquinasDisponibles, setMaquinasDisponibles] = useState<Maquina[]>([]);
  const [categoriasList, setCategoriasList] = useState<CategoriaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<{ [index: number]: string }>({});

  const maquinas = watch('maquinas') || [];
  const today = new Date().toISOString().split('T')[0];
  const fechaInicio = watch('fechaInicio');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMaquinariasHibrido();
        const listaMaquinas = (data.maquinaria || []).filter((m) => m.disponible);
        const listaCats = data.categorias || [];

        setMaquinasDisponibles(listaMaquinas);
        setCategoriasList(listaCats);

        const initialCats: { [index: number]: string } = {};
        maquinas.forEach((item, idx) => {
          const encontrada = listaMaquinas.find((m) => m.id === item.maquinaId);
          if (encontrada) {
            initialCats[idx] = encontrada.categoria;
          } else if (listaCats.length > 0) {
            initialCats[idx] = listaCats[0].id;
          }
        });
        setCategoriasSeleccionadas(initialCats);
      } catch (err) {
        console.error("Error al cargar datos para cotización:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleCambiarCategoriaFila = (index: number, nuevaCatId: string) => {
    setCategoriasSeleccionadas({ ...categoriasSeleccionadas, [index]: nuevaCatId });
    const primerEquipoDeCat = maquinasDisponibles.find((m) => m.categoria === nuevaCatId);
    if (primerEquipoDeCat) {
      handleCambiarMaquina(index, primerEquipoDeCat.id);
    }
  };

  const handleCambiarMaquina = (index: number, nuevaId: string) => {
    const copia = [...maquinas];
    copia[index] = { ...copia[index], maquinaId: nuevaId };
    setValue('maquinas', copia, { shouldValidate: true });
    setValue('maquinaId', copia[0]?.maquinaId || '');
  };

  const handleCambiarCantidad = (index: number, delta: number) => {
    const copia = [...maquinas];
    const actual = copia[index]?.cantidad || 1;
    const nuevaCantidad = Math.max(1, Math.min(20, actual + delta));
    copia[index] = { ...copia[index], cantidad: nuevaCantidad };
    setValue('maquinas', copia, { shouldValidate: true });
    const total = copia.reduce((acc, curr) => acc + curr.cantidad, 0);
    setValue('cantidadUnidades', total);
  };

  const handleEliminarEquipo = (index: number) => {
    if (maquinas.length <= 1) return;
    const copia = maquinas.filter((_, i) => i !== index);
    setValue('maquinas', copia, { shouldValidate: true });
    setValue('maquinaId', copia[0]?.maquinaId || '');
    const total = copia.reduce((acc, curr) => acc + curr.cantidad, 0);
    setValue('cantidadUnidades', total);
  };

  const handleAgregarEquipo = () => {
    const idsUsados = maquinas.map((item) => item.maquinaId);
    const siguienteDisponible =
      maquinasDisponibles.find((m) => !idsUsados.includes(m.id)) ||
      maquinasDisponibles[0];

    if (!siguienteDisponible) return;

    const nuevaLista = [
      ...maquinas,
      { maquinaId: siguienteDisponible.id, cantidad: 1 },
    ];
    setValue('maquinas', nuevaLista, { shouldValidate: true });
    
    setCategoriasSeleccionadas({
      ...categoriasSeleccionadas,
      [nuevaLista.length - 1]: siguienteDisponible.categoria,
    });

    const total = nuevaLista.reduce((acc, curr) => acc + curr.cantidad, 0);
    setValue('cantidadUnidades', total);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-white/50 text-xs gap-3 font-[Montserrat,sans-serif]">
        <Loader2 size={26} className="animate-spin text-[#F5A623]" />
        <span>Sincronizando flotas y categorías...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-[Montserrat,sans-serif]">
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#F5A623]">
            <Tractor size={15} /> Equipos para Alquiler
            <span className="text-[#F5A623]/70">*</span>
          </label>
          <span className="text-[10px] font-mono bg-white/10 px-2.5 py-1 rounded-full text-white/70">
            {maquinas.length} {maquinas.length === 1 ? 'equipo seleccionado' : 'equipos seleccionados'}
          </span>
        </div>

        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {maquinas.map((item, index) => {
              const info = maquinasDisponibles.find((m) => m.id === item.maquinaId);
              const catActual = categoriasSeleccionadas[index] || (info ? info.categoria : (categoriasList[0]?.id || ''));
              const maquinasDeLaCategoria = maquinasDisponibles.filter((m) => m.categoria === catActual);

              return (
                <motion.div
                  key={`${item.maquinaId}-${index}`}
                  initial={{ opacity: 0, y: 15, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-white/15 bg-gradient-to-br from-[#071324] to-[#040a12] p-4 shadow-xl space-y-4 relative group overflow-hidden"
                >
                  {/* Borde sutil iluminado superior */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5A623]/40 to-transparent" />

                  {/* Fila superior: Miniatura + Selectores ordenados */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Miniatura de la máquina */}
                    <div className="relative h-20 w-24 shrink-0 rounded-xl bg-slate-900 overflow-hidden border border-white/10 shadow-md">
                      {info?.imagen ? (
                        <div
                          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url('${info.imagen}')` }}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-white/30">
                          <Tractor size={24} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>

                    {/* Selectores de Categoría y Modelo */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 w-full">
                      {/* Selector 1: Categoría */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40">
                          1. Categoría
                        </label>
                        <select
                          value={catActual}
                          onChange={(e) => handleCambiarCategoriaFila(index, e.target.value)}
                          className="w-full bg-[#040a12] text-xs font-bold text-[#F5A623] border border-white/20 focus:border-[#F5A623] rounded-xl px-3 py-2.5 cursor-pointer outline-none shadow-inner transition-all hover:border-white/40"
                          style={{ colorScheme: 'dark' }}
                        >
                          {categoriasList.filter(c => c.id !== 'todas').map((cat) => (
                            <option key={cat.id} value={cat.id} className="bg-[#071324] text-white py-1">
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Selector 2: Maquinaria específica con nombre completo */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40">
                          2. Modelo Específico
                        </label>
                        <select
                          value={item.maquinaId}
                          onChange={(e) => handleCambiarMaquina(index, e.target.value)}
                          className="w-full bg-[#040a12] text-xs font-bold text-white border border-white/20 focus:border-[#F5A623] rounded-xl px-3 py-2.5 cursor-pointer outline-none shadow-inner transition-all hover:border-white/40 truncate"
                          style={{ colorScheme: 'dark' }}
                        >
                          {maquinasDeLaCategoria.map((m) => (
                            <option key={m.id} value={m.id} className="bg-[#071324] text-white py-1">
                              {m.nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Fila inferior: Especificación técnica + Controles de cantidad y botón eliminar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-white/60 min-w-0">
                      <Wrench size={13} className="text-[#F5A623] shrink-0" />
                      <span className="truncate font-mono text-[11px]">
                        {info?.caracteristicas[0] || info?.descripcion || 'Equipo certificado para obra'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
                      <div className="flex items-center gap-2 bg-[#040a12] border border-white/20 rounded-xl p-1 shadow-inner">
                        <button
                          type="button"
                          onClick={() => handleCambiarCantidad(index, -1)}
                          disabled={item.cantidad <= 1}
                          className="h-8 w-8 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-25 transition-colors"
                        >
                          <Minus size={14} strokeWidth={2.5} />
                        </button>
                        <span className="w-8 text-center text-sm font-black text-[#F5A623] font-mono">
                          {item.cantidad}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCambiarCantidad(index, 1)}
                          disabled={item.cantidad >= 20}
                          className="h-8 w-8 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-25 transition-colors"
                        >
                          <Plus size={14} strokeWidth={2.5} />
                        </button>
                      </div>

                      {maquinas.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleEliminarEquipo(index)}
                          className="p-2.5 text-white/40 hover:text-red-400 hover:bg-red-500/15 rounded-xl transition-colors border border-transparent hover:border-red-500/30"
                          title="Quitar equipo"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {errors.maquinas && (
          <p className="text-[11px] text-red-400 font-semibold mt-2">
            {errors.maquinas.message}
          </p>
        )}

        <button
          type="button"
          onClick={handleAgregarEquipo}
          className="mt-4 w-full py-3 px-4 border border-dashed border-[#F5A623]/50 bg-[#F5A623]/5 hover:bg-[#F5A623]/15 hover:border-[#F5A623] text-[#F5A623] rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <PlusCircle size={16} />
          + Agregar otra máquina o equipo al proyecto
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <Field label="Fecha de inicio" required error={errors.fechaInicio?.message}>
          <div className="relative">
            <CalendarDays
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="date"
              min={today}
              {...register('fechaInicio')}
              className={[
                inputBase,
                'pl-10',
                errors.fechaInicio ? inputError : inputOk,
                'cursor-pointer',
              ].join(' ')}
              style={{ colorScheme: 'dark' }}
            />
          </div>
        </Field>

        <Field label="Fecha de fin" required error={errors.fechaFin?.message}>
          <div className="relative">
            <CalendarDays
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="date"
              min={fechaInicio || today}
              {...register('fechaFin')}
              className={[
                inputBase,
                'pl-10',
                errors.fechaFin ? inputError : inputOk,
                'cursor-pointer',
              ].join(' ')}
              style={{ colorScheme: 'dark' }}
            />
          </div>
        </Field>
      </div>

      <Field label="Ubicación de la obra" required error={errors.ubicacionObra?.message}>
        <div className="relative">
          <MapPin
            size={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
          />
          <input
            type="text"
            placeholder="Ej: Km 280 Panamericana Sur, Pisco / Mina San Juan"
            {...register('ubicacionObra')}
            className={[
              inputBase,
              'pl-10',
              errors.ubicacionObra ? inputError : inputOk,
            ].join(' ')}
          />
        </div>
      </Field>
    </div>
  );
}