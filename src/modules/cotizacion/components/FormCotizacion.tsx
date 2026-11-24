'use client'

import { useFormContext } from 'react-hook-form'
import { motion } from 'framer-motion'
import { User, Building2, CreditCard, Phone, Mail, MessageSquare } from 'lucide-react'
import type { CotizacionFormData } from '@/lib/validations'

/* ── Campo genérico con label y error ───────────────────────── */
function Field({
  label,
  error,
  required,
  optional,
  hint,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  optional?: boolean
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50 font-[Montserrat,sans-serif]">
          {label}
          {required && <span className="text-[#F5A623]/70">*</span>}
        </label>
        {optional && (
          <span className="text-[10px] text-white/25 font-[Montserrat,sans-serif]">
            Opcional
          </span>
        )}
      </div>
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
      {hint && !error && (
        <p className="text-[11px] text-white/25 font-[Montserrat,sans-serif]">{hint}</p>
      )}
    </div>
  )
}

/* ── Estilos base de input ──────────────────────────────────── */
const inputBase = [
  'w-full rounded-xl border bg-white/[0.05] px-4 py-3 text-sm text-white',
  'font-[Montserrat,sans-serif] placeholder:text-white/20',
  'focus:outline-none transition-colors duration-200',
].join(' ')
const inputOk    = 'border-white/10 focus:border-[#F5A623]/50 focus:bg-white/[0.07]'
const inputError = 'border-red-500/50 focus:border-red-500/70 bg-red-500/[0.04]'

/* ── Input con ícono izquierdo ──────────────────────────────── */
function InputWithIcon({
  icon: Icon,
  error,
  ...props
}: {
  icon: React.ElementType
  error?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <Icon
        size={14}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
      />
      <input
        {...props}
        className={[
          inputBase,
          'pl-9',
          error ? inputError : inputOk,
          props.className ?? '',
        ].join(' ')}
      />
    </div>
  )
}

/* ── Componente principal ───────────────────────────────────── */
export default function FormCotizacion() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CotizacionFormData>()

  return (
    <div className="space-y-4">

      {/* Título de sección */}
      <div className="mb-2">
        <p className="text-sm font-black text-white font-[Montserrat,sans-serif]">
          Tus datos de contacto
        </p>
        <p className="text-xs text-white/35 font-[Montserrat,sans-serif] mt-0.5">
          Nos comunicaremos a través de estos datos.
        </p>
      </div>

      {/* ── Nombre completo ──────────────────────────────────── */}
      <Field label="Nombre completo" required error={errors.nombre?.message}>
        <InputWithIcon
          icon={User}
          type="text"
          placeholder="Juan Pérez García"
          error={!!errors.nombre}
          {...register('nombre')}
        />
      </Field>

      {/* ── Empresa ──────────────────────────────────────────── */}
      <Field label="Empresa" required error={errors.empresa?.message}>
        <InputWithIcon
          icon={Building2}
          type="text"
          placeholder="Constructora Ejemplo SAC"
          error={!!errors.empresa}
          {...register('empresa')}
        />
      </Field>

      {/* ── RUC (opcional) ───────────────────────────────────── */}
      <Field
        label="RUC"
        optional
        error={errors.ruc?.message}
        hint="11 dígitos, sin guiones ni espacios"
      >
        <InputWithIcon
          icon={CreditCard}
          type="text"
          placeholder="20123456789"
          maxLength={11}
          error={!!errors.ruc}
          {...register('ruc')}
        />
      </Field>

      {/* ── Teléfono y Email en fila ─────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Teléfono" required error={errors.telefono?.message}>
          <InputWithIcon
            icon={Phone}
            type="tel"
            placeholder="957 682 641"
            error={!!errors.telefono}
            {...register('telefono')}
          />
        </Field>

        <Field label="Correo electrónico" required error={errors.email?.message}>
          <InputWithIcon
            icon={Mail}
            type="email"
            placeholder="nombre@empresa.com"
            error={!!errors.email}
            {...register('email')}
          />
        </Field>
      </div>

      {/* ── Mensaje adicional (opcional) ─────────────────────── */}
      <Field
        label="Mensaje adicional"
        optional
        error={errors.mensaje?.message}
      >
        <div className="relative">
          <MessageSquare
            size={14}
            className="pointer-events-none absolute left-3.5 top-3.5 text-white/30"
          />
          <textarea
            rows={3}
            placeholder="Especificaciones adicionales, horarios preferidos, condiciones del terreno..."
            {...register('mensaje')}
            className={[
              inputBase,
              'pl-9 pt-3 resize-none',
              errors.mensaje ? inputError : inputOk,
            ].join(' ')}
          />
        </div>
      </Field>

      {/* ── Aviso de privacidad ──────────────────────────────── */}
      <p className="text-[11px] text-white/20 font-[Montserrat,sans-serif] leading-relaxed pt-1">
        Al enviar, aceptás que MAVTEC E.I.R.L te contacte por los medios indicados
        para gestionar tu solicitud de cotización.
      </p>
    </div>
  )
}