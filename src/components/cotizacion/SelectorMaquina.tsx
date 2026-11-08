'use client';

import { useState } from 'react';
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
  AlertCircle,
} from 'lucide-react';
import { maquinarias } from '@/data/maquinarias';
import type { CotizacionFormData, ItemCotizacionData } from '@/lib/validations';

/* ── Campo con label y error ────────────────────────────────── */
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
      <label className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50 font-[Montserrat,sans-serif]">
        {label}
        {required && <span className="text-[#F5A623]/70">*</span>}
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

/* ── Clases base para inputs ─────────────────────────────────── */
const inputBase = [
  'w-full rounded-xl border bg-white/[0.05] px-4 py-3 text-sm text-white',
  'font-[Montserrat,sans-serif] placeholder:text-white/20',
  'focus:outline-none transition-colors duration-200',
  'appearance-none',
].join(' ');

const inputOk = 'border-white/10 focus:border-[#F5A623]/50 focus:bg-white/[0.07]';
const inputError = 'border-red-500/50 focus:border-red-500/70 bg-red-500/[0.04]';

/* ── Máquinas disponibles ────────────────────────────────────── */
const MAQUINAS_DISPONIBLES = maquinarias.filter((m) => m.disponible);

export default function SelectorMaquina() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CotizacionFormData>();

  const maquinas = watch('maquinas') || [];
  const today = new Date().toISOString().split('T')[0];
  const fechaInicio = watch('fechaInicio');

  // Actualizar máquina seleccionada en una fila
  const handleCambiarMaquina = (index: number, nuevaId: string) => {
    const copia = [...maquinas];
    copia[index] = { ...copia[index], maquinaId: nuevaId };
    setValue('maquinas', copia, { shouldValidate: true });
    // sincronizar campo de compatibilidad
    setValue('maquinaId', copia[0]?.maquinaId || '');
  };

  // Modificar cantidad al costado de la máquina
  const handleCambiarCantidad = (index: number, delta: number) => {
    const copia = [...maquinas];
    const actual = copia[index]?.cantidad || 1;
    const nuevaCantidad = Math.max(1, Math.min(20, actual + delta));
    copia[index] = { ...copia[index], cantidad: nuevaCantidad };
    setValue('maquinas', copia, { shouldValidate: true });
    // sincronizar total
    const total = copia.reduce((acc, curr) => acc + curr.cantidad, 0);
    setValue('cantidadUnidades', total);
  };

  // Eliminar un equipo de la lista
  const handleEliminarEquipo = (index: number) => {
    if (maquinas.length <= 1) return;
    const copia = maquinas.filter((_, i) => i !== index);
    setValue('maquinas', copia, { shouldValidate: true });
    setValue('maquinaId', copia[0]?.maquinaId || '');
    const total = copia.reduce((acc, curr) => acc + curr.cantidad, 0);
    setValue('cantidadUnidades', total);
  };

  // Agregar otra máquina a la lista
  const handleAgregarEquipo = () => {
    // Buscar la primera máquina que no esté ya en la lista
    const idsUsados = maquinas.map((item) => item.maquinaId);
    const siguienteDisponible =
      MAQUINAS_DISPONIBLES.find((m) => !idsUsados.includes(m.id)) ||
      MAQUINAS_DISPONIBLES[0];

    if (!siguienteDisponible) return;

    const nuevaLista = [
      ...maquinas,
      { maquinaId: siguienteDisponible.id, cantidad: 1 },
    ];
    setValue('maquinas', nuevaLista, { shouldValidate: true });
    const total = nuevaLista.reduce((acc, curr) => acc + curr.cantidad, 0);
    setValue('cantidadUnidades', total);
  };

  return (
    <div className="space-y-6 font-[Montserrat,sans-serif]">
      {/* ── 1. LISTA DE MÁQUINAS A COTIZAR ──────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5A623]">
            <Tractor size={14} /> Máquinas a Alquilar
            <span className="text-[#F5A623]/70">*</span>
          </label>
          <span className="text-[10px] font-mono text-white/40">
            {maquinas.length} {maquinas.length === 1 ? 'equipo' : 'equipos'} seleccionados
          </span>
        </div>

        {/* Filas de máquinas */}
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {maquinas.map((item, index) => {
              const info = MAQUINAS_DISPONIBLES.find((m) => m.id === item.maquinaId);

              return (
                <motion.div
                  key={`${item.maquinaId}-${index}`}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-white/10 bg-[#071324] p-3.5 shadow-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 relative group"
                >
                  {/* Izquierda: Imagen y Selector de Máquina */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {info ? (
                      <div
                        className="h-12 w-16 shrink-0 rounded-lg bg-cover bg-center border border-white/10 shadow"
                        style={{ backgroundImage: `url('${info.imagen}')` }}
                      />
                    ) : (
                      <div className="h-12 w-16 shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                        <Tractor size={20} />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <select
                        value={item.maquinaId}
                        onChange={(e) => handleCambiarMaquina(index, e.target.value)}
                        className="w-full bg-transparent text-xs font-bold text-white border-b border-white/15 focus:border-[#F5A623] pb-1 cursor-pointer outline-none truncate"
                        style={{ colorScheme: 'dark' }}
                      >
                        {MAQUINAS_DISPONIBLES.map((m) => (
                          <option key={m.id} value={m.id} className="bg-[#071324] text-white">
                            {m.nombre} — {m.categoria.replace('-', ' ')}
                          </option>
                        ))}
                      </select>
                      {info && (
                        <p className="text-[10px] text-white/40 truncate mt-1">
                          {info.caracteristicas[0] || info.categoria}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Derecha: CONTROL DE CANTIDAD AL COSTADO + BOTÓN ELIMINAR */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5 shrink-0">
                    <span className="text-[10px] font-mono text-white/40 uppercase sm:hidden">
                      Cantidad:
                    </span>

                    {/* Selector de cantidad compacto al costado */}
                    <div className="flex items-center gap-1.5 bg-[#040a12] border border-white/15 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => handleCambiarCantidad(index, -1)}
                        disabled={item.cantidad <= 1}
                        className="h-7 w-7 flex items-center justify-center rounded text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
                        title="Disminuir"
                      >
                        <Minus size={13} strokeWidth={2.5} />
                      </button>

                      <span className="w-8 text-center text-xs font-black text-[#F5A623] font-mono">
                        {item.cantidad}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleCambiarCantidad(index, 1)}
                        disabled={item.cantidad >= 20}
                        className="h-7 w-7 flex items-center justify-center rounded text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
                        title="Aumentar"
                      >
                        <Plus size={13} strokeWidth={2.5} />
                      </button>
                    </div>

                    {/* Botón para quitar el equipo (si hay más de 1) */}
                    {maquinas.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleEliminarEquipo(index)}
                        className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                        title="Eliminar este equipo"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
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

        {/* Botón para Agregar Más Equipos */}
        <button
          type="button"
          onClick={handleAgregarEquipo}
          className="mt-3 w-full py-2.5 px-4 border border-dashed border-[#F5A623]/40 bg-[#F5A623]/5 hover:bg-[#F5A623]/15 hover:border-[#F5A623] text-[#F5A623] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
        >
          <PlusCircle size={15} />
          + Agregar otra máquina o equipo
        </button>
      </div>

      {/* ── 2. FECHAS DEL SERVICIO ──────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <Field label="Fecha de inicio" required error={errors.fechaInicio?.message}>
          <div className="relative">
            <CalendarDays
              size={14}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
            />
            <input
              type="date"
              min={today}
              {...register('fechaInicio')}
              className={[
                inputBase,
                'pl-9',
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
              size={14}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
            />
            <input
              type="date"
              min={fechaInicio || today}
              {...register('fechaFin')}
              className={[
                inputBase,
                'pl-9',
                errors.fechaFin ? inputError : inputOk,
                'cursor-pointer',
              ].join(' ')}
              style={{ colorScheme: 'dark' }}
            />
          </div>
        </Field>
      </div>

      {/* ── 3. UBICACIÓN DE LA OBRA ─────────────────────────── */}
      <Field label="Ubicación de la obra" required error={errors.ubicacionObra?.message}>
        <div className="relative">
          <MapPin
            size={14}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            type="text"
            placeholder="Ej: Km 280 Panamericana Sur, Pisco / Mina San Juan"
            {...register('ubicacionObra')}
            className={[
              inputBase,
              'pl-9',
              errors.ubicacionObra ? inputError : inputOk,
            ].join(' ')}
          />
        </div>
      </Field>
    </div>
  );
}
