import { z } from 'zod'

/* ── Schema de cotización ──────────────────────────────────── */
export const cotizacionSchema = z
  .object({
    /* Datos del servicio */
    maquinaId:        z.string().min(1, 'Seleccioná una máquina'),
    fechaInicio:      z.string().min(1, 'Fecha de inicio requerida'),
    fechaFin:         z.string().min(1, 'Fecha de fin requerida'),
    ubicacionObra:    z.string().min(3, 'Ingresá la ubicación de la obra'),
    cantidadUnidades: z.number().int().min(1, 'Mínimo 1 unidad').max(20, 'Máximo 20 unidades'),

    /* Datos del contacto */
    nombre:   z.string().min(2, 'Ingresá tu nombre completo'),
    empresa:  z.string().min(2, 'Ingresá el nombre de la empresa'),
    ruc:      z
      .string()
      .regex(/^\d{11}$/, 'El RUC debe tener 11 dígitos')
      .optional()
      .or(z.literal('')),
    telefono: z
      .string()
      .min(9, 'Ingresá un teléfono válido')
      .max(15, 'Teléfono demasiado largo'),
    email:    z.string().email('Correo electrónico inválido'),
    mensaje:  z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.fechaInicio || !data.fechaFin) return true
      return new Date(data.fechaFin) >= new Date(data.fechaInicio)
    },
    {
      message: 'La fecha de fin debe ser posterior a la fecha de inicio',
      path: ['fechaFin'],
    }
  )

export type CotizacionFormData = z.infer<typeof cotizacionSchema>

/* Campos que se validan en cada paso */
export const STEP1_FIELDS: (keyof CotizacionFormData)[] = [
  'maquinaId',
  'fechaInicio',
  'fechaFin',
  'ubicacionObra',
  'cantidadUnidades',
]

export const STEP2_FIELDS: (keyof CotizacionFormData)[] = [
  'nombre',
  'empresa',
  'telefono',
  'email',
]