'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ChevronLeft, CheckCircle2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { cotizacionSchema, type CotizacionFormData, STEP1_FIELDS, STEP2_FIELDS } from '@/lib/validations'
import { maquinarias } from '@/data/maquinarias'
import SelectorMaquina from '@/components/cotizacion/SelectorMaquina'
import FormCotizacion  from '@/components/cotizacion/FormCotizacion'

/* ══════════════════════════════════════════════════════════════
   CONTEXT
══════════════════════════════════════════════════════════════ */
interface CotizacionContextType {
  openModal:  (maquinaId?: string) => void
  closeModal: () => void
}

const CotizacionContext = createContext<CotizacionContextType>({
  openModal:  () => {},
  closeModal: () => {},
})

export const useCotizacion = () => useContext(CotizacionContext)

/* ══════════════════════════════════════════════════════════════
   STEP INDICATOR
══════════════════════════════════════════════════════════════ */
function StepIndicator({ step }: { step: 1 | 2 }) {
  const steps = [
    { n: 1, label: 'Servicio' },
    { n: 2, label: 'Contacto' },
  ]
  return (
    <div className="flex items-center gap-3">
      {steps.map(({ n, label }, i) => (
        <div key={n} className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={[
                'flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black font-[Montserrat,sans-serif] transition-all duration-300',
                step >= n
                  ? 'bg-[#F5A623] text-[#1A3C6E]'
                  : 'bg-white/10 text-white/30',
              ].join(' ')}
            >
              {n}
            </div>
            <span
              className={[
                'text-xs font-semibold font-[Montserrat,sans-serif] transition-colors duration-300',
                step >= n ? 'text-white/80' : 'text-white/25',
              ].join(' ')}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={[
              'h-px w-10 rounded-full transition-colors duration-500',
              step > n ? 'bg-[#F5A623]/60' : 'bg-white/10',
            ].join(' ')} />
          )}
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SUCCESS STATE
══════════════════════════════════════════════════════════════ */
function SuccessScreen({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 250, damping: 18, delay: 0.1 }}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30"
      >
        <CheckCircle2 size={36} className="text-emerald-400" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-xl font-black text-white font-[Montserrat,sans-serif] mb-2"
      >
        ¡Solicitud enviada!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-sm text-white/50 font-[Montserrat,sans-serif] leading-relaxed max-w-xs"
      >
        Recibimos tu solicitud de cotización. Nos comunicaremos contigo en menos de 2 horas.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClose}
        className="mt-8 rounded-xl bg-[#F5A623] px-8 py-3 text-sm font-bold text-[#1A3C6E] font-[Montserrat,sans-serif] tracking-wide hover:bg-[#d4891a] transition-colors"
      >
        Cerrar
      </motion.button>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════
   MODAL INTERNO
══════════════════════════════════════════════════════════════ */
interface ModalInternalProps {
  isOpen: boolean
  onClose: () => void
  initialMaquinaId?: string
}

function ModalInternal({ isOpen, onClose, initialMaquinaId }: ModalInternalProps) {
  const [step, setStep]       = useState<1 | 2>(1)
  const [status, setStatus]   = useState<'idle' | 'submitting' | 'success'>('idle')
  const bodyRef = useRef<HTMLDivElement>(null)

  const defaultMaquina = initialMaquinaId || maquinarias[0]?.id || 'exc-001';

  const methods = useForm<CotizacionFormData>({
    resolver: zodResolver(cotizacionSchema),
    defaultValues: {
      maquinas: [
        {
          maquinaId: defaultMaquina,
          cantidad: 1,
        },
      ],
      maquinaId: defaultMaquina,
      cantidadUnidades: 1,
      fechaInicio: '',
      fechaFin: '',
      ubicacionObra: '',
      nombre: '',
      empresa: '',
      ruc: '',
      telefono: '',
      email: '',
      mensaje: '',
    },
    mode: 'onChange',
  })

  /* Pre-seleccionar máquina si viene desde MachineCard */
  useEffect(() => {
    if (initialMaquinaId) {
      methods.setValue(
        'maquinas',
        [{ maquinaId: initialMaquinaId, cantidad: 1 }],
        { shouldValidate: true }
      );
      methods.setValue('maquinaId', initialMaquinaId);
      methods.setValue('cantidadUnidades', 1);
    }
  }, [initialMaquinaId, methods])

  /* Reset al cerrar */
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        if (status !== 'success') {
          setStep(1)
          setStatus('idle')
          methods.reset()
        }
      }, 350)
    }
  }, [isOpen, methods, status])

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  /* Scroll arriba al cambiar de paso */
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  /* ── Avanzar al paso 2 validando paso 1 ── */
  const goToStep2 = useCallback(async () => {
    const valid = await methods.trigger(STEP1_FIELDS)
    if (valid) setStep(2)
  }, [methods])

  /* ── Enviar el formulario a la API Real ── */
  const onSubmit = methods.handleSubmit((data) => {
    setStatus('submitting')
    
    // Mapear la lista completa de máquinas seleccionadas con sus detalles
    const listaEquipos = data.maquinas.map((item) => {
      const info = maquinarias.find((m) => m.id === item.maquinaId);
      return {
        maquinaId: item.maquinaId,
        maquinaNombre: info?.nombre ?? item.maquinaId,
        cantidad: item.cantidad,
        imagen: info?.imagen,
        categoria: info?.categoria,
      };
    });

    const resumenNombres = listaEquipos
      .map((item) => `${item.cantidad}x ${item.maquinaNombre}`)
      .join(', ');
    const totalUnidades = listaEquipos.reduce((sum, item) => sum + item.cantidad, 0);

    const payload = {
      ...data,
      maquinas: listaEquipos,
      maquinaNombre: resumenNombres,
      cantidadUnidades: totalUnidades,
      fechaEnvio: new Date().toISOString(),
    };

    toast.promise(
      fetch('/api/cotizacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then(async (res) => {
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || 'Error al procesar la cotización')
        }
        return res.json()
      }),
      {
        loading: 'Enviando solicitud a MAVTEC...',
        success: () => {
          setStatus('success') // Cambia a la pantalla verde de éxito
          return '¡Solicitud enviada exitosamente!'
        },
        error: (err) => {
          setStatus('idle') // Devuelve al usuario al formulario si hay error
          return err.message || 'Hubo un problema. Por favor, intenta de nuevo.'
        }
      }
    )
  })

  const maquinasList = methods.watch('maquinas') || [];
  const totalEquipos = maquinasList.reduce((acc, curr) => acc + (curr.cantidad || 1), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className={[
              'fixed z-50 bg-[#0f2540] border border-white/[0.09] shadow-2xl shadow-black/60 flex flex-col',
              /* Mobile: bottom sheet */
              'bottom-0 left-0 right-0 rounded-t-3xl max-h-[92vh]',
              /* Desktop: centered dialog */
              'lg:bottom-auto lg:left-1/2 lg:right-auto lg:top-1/2',
              'lg:-translate-x-1/2 lg:-translate-y-1/2',
              'lg:w-[560px] lg:rounded-2xl lg:max-h-[88vh]',
            ].join(' ')}
            role="dialog"
            aria-modal="true"
            aria-label="Formulario de cotización"
          >
            {/* ── HEADER ────────────────────────────────────── */}
            <div className="flex-shrink-0 px-6 pt-5 pb-4 border-b border-white/[0.07]">
              {/* Handle (mobile) */}
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/15 lg:hidden" />

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black text-white font-[Montserrat,sans-serif] leading-tight">
                    Solicitar Cotización
                  </h2>
                  <p className="text-xs text-white/40 font-[Montserrat,sans-serif] mt-0.5">
                    MAVTEC E.I.R.L · Respondemos en &lt; 2 horas
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Cerrar"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/20 transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {status === 'idle' || status === 'submitting' ? (
                <div className="mt-4">
                  <StepIndicator step={step} />
                </div>
              ) : null}
            </div>

            {/* ── BODY ──────────────────────────────────────── */}
            <div
              ref={bodyRef}
              className="flex-1 overflow-y-auto overscroll-contain px-6 py-5"
            >
              {status === 'success' ? (
                <SuccessScreen onClose={onClose} />
              ) : (
                <FormProvider {...methods}>
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.22 }}
                      >
                        <SelectorMaquina />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.22 }}
                      >
                        {/* Resumen de máquinas seleccionadas */}
                        {maquinasList.length > 0 && (
                          <div className="mb-5 rounded-xl border border-[#F5A623]/25 bg-[#F5A623]/5 p-3.5 space-y-2">
                            <div className="flex items-center justify-between text-[11px] font-mono text-white/50 uppercase tracking-wider border-b border-white/5 pb-2">
                              <span>Equipos a cotizar ({totalEquipos} {totalEquipos === 1 ? 'unidad' : 'unidades'})</span>
                              <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="text-[#F5A623] hover:underline font-bold transition-colors"
                              >
                                Editar lista
                              </button>
                            </div>
                            <div className="space-y-1.5 pt-1 max-h-36 overflow-y-auto">
                              {maquinasList.map((item, idx) => {
                                const m = maquinarias.find((maq) => maq.id === item.maquinaId);
                                return (
                                  <div
                                    key={`${item.maquinaId}-${idx}`}
                                    className="flex items-center justify-between text-xs font-bold text-white"
                                  >
                                    <span className="flex items-center gap-2 truncate">
                                      <span className="text-[#F5A623] font-mono font-black shrink-0">
                                        {item.cantidad}x
                                      </span>
                                      <span className="truncate">{m?.nombre ?? item.maquinaId}</span>
                                    </span>
                                    <span className="text-[10px] text-white/40 uppercase font-mono shrink-0 ml-2">
                                      {m?.categoria.replace('-', ' ')}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        <FormCotizacion />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </FormProvider>
              )}
            </div>

            {/* ── FOOTER BOTONES ────────────────────────────── */}
            {status !== 'success' && (
              <div className="flex-shrink-0 border-t border-white/[0.07] px-6 py-4 flex items-center gap-3">
                {step === 2 && (
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white/60 hover:text-white hover:border-white/20 transition-all font-[Montserrat,sans-serif]"
                  >
                    <ChevronLeft size={15} />
                    Atrás
                  </button>
                )}

                {step === 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={goToStep2}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#F5A623] py-3 text-sm font-bold text-[#1A3C6E] hover:bg-[#d4891a] transition-colors font-[Montserrat,sans-serif] tracking-wide shadow-md"
                  >
                    Continuar
                    <ChevronRight size={15} className="mt-px" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onSubmit}
                    disabled={status === 'submitting'}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#F5A623] py-3 text-sm font-bold text-[#1A3C6E] hover:bg-[#d4891a] transition-colors font-[Montserrat,sans-serif] tracking-wide shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <><Loader2 size={15} className="animate-spin" /> Enviando...</>
                    ) : (
                      <>Enviar solicitud <ChevronRight size={15} className="mt-px" /></>
                    )}
                  </motion.button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ══════════════════════════════════════════════════════════════
   PROVIDER + BOTÓN FLOTANTE
══════════════════════════════════════════════════════════════ */
export function CotizacionProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen]             = useState(false)
  const [initialMaquinaId, setInitial]  = useState<string | undefined>()

  const openModal = useCallback((maquinaId?: string) => {
    setInitial(maquinaId)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => setIsOpen(false), [])

  return (
    <CotizacionContext.Provider value={{ openModal, closeModal }}>
      {children}

      {/* Botón flotante */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            whileHover={{ scale: 1.06, boxShadow: '0 8px 32px rgba(245,166,35,0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal()}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full bg-[#F5A623] px-5 py-3.5 text-sm font-bold text-[#1A3C6E] shadow-xl font-[Montserrat,sans-serif] tracking-wide lg:rounded-xl"
            aria-label="Solicitar cotización"
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full animate-ping bg-[#F5A623] opacity-20 pointer-events-none" />
            <span className="relative flex h-2 w-2 rounded-full bg-[#1A3C6E]/40" />
            <span className="hidden sm:inline">Solicitar Cotización</span>
            <span className="sm:hidden text-xs">Cotizar</span>
            <ChevronRight size={14} className="hidden sm:block mt-px" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal */}
      <ModalInternal
        isOpen={isOpen}
        onClose={closeModal}
        initialMaquinaId={initialMaquinaId}
      />
    </CotizacionContext.Provider>
  )
}

export default function ModalCotizacion() {
  return null // El modal se renderiza dentro del Provider
}