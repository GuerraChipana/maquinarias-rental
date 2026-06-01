// ============================================================
//  MAVTEC — Tipos TypeScript del proyecto
// ============================================================

// ─── Maquinaria ──────────────────────────────────────────────

export type CategoriaMaquina =
  | "excavadora"
  | "compactadora"
  | "tractor"
  | "grua"
  | "camion-cisterna"
  | "retroexcavadora"
  | "volquete";

export interface Maquina {
  id: string;
  nombre: string;
  categoria: CategoriaMaquina;
  descripcion: string;
  caracteristicas: string[];
  imagen: string; // Ruta en /public/images/machines/
  disponible: boolean;
  usos: string[];
  destacada?: boolean; // Para mostrar en el hero o catálogo principal
}

export interface CategoriaItem {
  id: CategoriaMaquina | "todas";
  label: string;
  icono: string;
}

// ─── Formulario de Cotización ─────────────────────────────────

export interface CotizacionForm {
  // Datos del contacto
  nombre: string;
  empresa: string;
  ruc?: string;
  telefono: string;
  email: string;

  // Datos del servicio
  maquinaId: string;
  fechaInicio: string;
  fechaFin: string;
  ubicacionObra: string;
  cantidadUnidades: number;

  // Adicional
  mensaje?: string;
}

export interface CotizacionPayload extends CotizacionForm {
  maquinaNombre: string; // Se resuelve en el cliente antes de enviar
  fechaEnvio: string; // ISO string, generado automáticamente
}

// ─── API Responses ────────────────────────────────────────────

export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
}

export type CotizacionResponse = ApiResponse;

// ─── Navegación ───────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

// ─── Testimonios ──────────────────────────────────────────────

export interface Testimonio {
  id: string;
  nombre: string;
  empresa: string;
  cargo?: string;
  texto: string;
  rating: 1 | 2 | 3 | 4 | 5;
  imagen?: string;
}

// ─── Servicios ────────────────────────────────────────────────

export interface Servicio {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string; 
  imagen: string; 
  span: string;   
  beneficios: string[]; 
}