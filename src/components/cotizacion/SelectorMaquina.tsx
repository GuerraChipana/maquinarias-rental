'use client'

import { useFormContext, Controller } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Minus, Plus, CalendarDays, MapPin, Tractor } from 'lucide-react'
import { maquinarias } from '@/data/maquinarias'
import type { CotizacionFormData } from '@/lib/validations'

/* ── Campo con label y error ────────────────────────────────── */
function Field({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
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
  )
}

/* ── Clases base para inputs ─────────────────────────────────── */
const inputBase = [
  'w-full rounded-xl border bg-white/[0.05] px-4 py-3 text-sm text-white',
  'font-[Montserrat,sans-serif] placeholder:text-white/20',
  'focus:outline-none transition-colors duration-200',
  'appearance-none',
].join(' ')

const inputOk    = 'border-white/10 focus:border-[#F5A623]/50 focus:bg-white/[0.07]'
const inputError = 'border-red-500/50 focus:border-red-500/70 bg-red-500/[0.04]'

/* ── Máquinas disponibles ────────────────────────────────────── */
const MAQUINAS_DISPONIBLES = maquinarias.filter(m => m.disponible)

/* ── Componente principal ────────────────────────────────────── */
export default function SelectorMaquina() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CotizacionFormData>()

  const maquinaId       = watch('maquinaId')
  const cantidad        = watch('cantidadUnidades')
  const maquinaActual   = MAQUINAS_DISPONIBLES.find(m => m.id === maquinaId)
  const today           = new Date().toISOString().split('T')[0]
  const fechaInicio     = watch('fechaInicio')

  const decrementar = () => setValue('cantidadUnidades', Math.max(1, (cantidad ?? 1) - 1))
  const incrementar = () => setValue('cantidadUnidades', Math.min(20, (cantidad ?? 1) + 1))

  return (
    <div className="space-y-5">

      {/* ── Selector de máquina ─────────────────────────────── */}
      <Field label="Máquina a alquilar" required error={errors.maquinaId?.message}>
        <div className="relative">
          <Tractor size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
          <select
            {...register('maquinaId')}
            className={[
              inputBase,
              'pl-10 pr-4',
              errors.maquinaId ? inputError : inputOk,
              'cursor-pointer',
            ].join(' ')}
            style={{ colorScheme: 'dark' }}
          >
            <option value="" disabled className="bg-[#0f2540]">
              Seleccioná una máquina disponible
            </option>
            {MAQUINAS_DISPONIBLES.map(m => (
              <option key={m.id} value={m.id} className="bg-[#0f2540]">
                {m.nombre} — {m.categoria.replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Preview de la máquina seleccionada */}
        {maquinaActual && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
          >
            <div
              className="h-12 w-16 flex-shrink-0 rounded-lg bg-cover bg-center border border-white/10"
              style={{ backgroundImage: `url('${maquinaActual.imagen}')` }}
            />
            <div className="min-w-0">
              <p className="text-xs font-black text-white font-[Montserrat,sans-serif] truncate">
                {maquinaActual.nombre}
              </p>
              <p className="text-[10px] text-white/40 font-[Montserrat,sans-serif] mt-0.5">
                {maquinaActual.caracteristicas.slice(0, 2).join(' · ')}
              </p>
            </div>
          </motion.div>
        )}
      </Field>

      {/* ── Fechas ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Fecha de inicio" required error={errors.fechaInicio?.message}>
          <div className="relative">
            <CalendarDays size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
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
            <CalendarDays size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
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

      {/* ── Ubicación de la obra ────────────────────────────── */}
      <Field label="Ubicación de la obra" required error={errors.ubicacionObra?.message}>
        <div className="relative">
          <MapPin size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Ej: Km 280 Panamericana Sur, Ica"
            {...register('ubicacionObra')}
            className={[
              inputBase,
              'pl-9',
              errors.ubicacionObra ? inputError : inputOk,
            ].join(' ')}
          />
        </div>
      </Field>

      {/* ── Cantidad de unidades ────────────────────────────── */}
      <Field label="Cantidad de unidades" required error={errors.cantidadUnidades?.message}>
        <Controller
          name="cantidadUnidades"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-3">
              {/* Botón decrementar */}
              <button
                type="button"
                onClick={decrementar}
                disabled={field.value <= 1}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 hover:border-[#F5A623]/30 hover:text-[#F5A623] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Disminuir cantidad"
              >
                <Minus size={16} />
              </button>

              {/* Valor */}
              <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.05] py-3 text-center text-xl font-black text-white font-[Montserrat,sans-serif]">
                {field.value}
              </div>

              {/* Botón incrementar */}
              <button
                type="button"
                onClick={incrementar}
                disabled={field.value >= 20}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 hover:border-[#F5A623]/30 hover:text-[#F5A623] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Aumentar cantidad"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        />
        <p className="text-[11px] text-white/25 font-[Montserrat,sans-serif]">
          Máximo 20 unidades por solicitud
        </p>
      </Field>

    </div>
  )
}