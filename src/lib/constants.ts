// ============================================================
//  MAVTEC E.I.R.L — Constantes de la empresa
//  Editar aquí para actualizar toda la web de una vez
// ============================================================

export const EMPRESA = {
  nombre:      'MAVTEC E.I.R.L',
  nombreCorto: 'MAVTEC',
  slogan:      'Soluciones Confiables para la Minería y la Construcción',
  descripcion: 'Especialistas en alquiler de maquinaria pesada y transporte de agua potable para proyectos mineros, obras civiles y construcciones a gran escala. Garantizamos puntualidad, calidad y equipos en óptimas condiciones.',

  contacto: {
    email:    'atencionalcliente@mavtec.com',
    telefono: ['+51 957 682 641'],
    whatsapp: '+51957682641', // Con código de país para wa.me
  },

  ubicacion: {
    direccion: 'Túpac Amaru Inca, Pisco',
    ciudad:    'Pisco',
    region:    'Ica',
    pais:      'Perú',
    maps:      'https://maps.google.com/?q=-13.7122,-76.2022', // Pisco, Ica — coordenadas exactas
  },

  horario: '24/7 — Disponibles siempre',

  redes: {
    facebook:  'https://facebook.com/mavtec',    // Actualizar
    instagram: 'https://instagram.com/mavtec',   // Actualizar
    whatsapp:  'https://wa.me/51957682641',
  },

  seo: {
    palabrasClave: [
      'alquiler maquinaria pesada Pisco',
      'alquiler excavadora Ica',
      'camión cisterna Pisco',
      'transporte agua potable minería',
      'compactadora tractor orugas',
      'maquinaria construcción Ica Perú',
      'MAVTEC maquinaria',
    ],
  },
} as const

// Links de navegación
export const NAV_ITEMS = [
  { label: 'Inicio',       href: '#inicio'      },
  { label: 'Catálogo',     href: '#catalogo'    },
  { label: 'Servicios',    href: '#servicios'   },
  { label: 'Nosotros',     href: '#nosotros'    },
  { label: 'Testimonios',  href: '#testimonios' },
  { label: 'Contacto',     href: '#contacto'    },
] as const

// Estadísticas para la sección Nosotros
export const STATS = [
  { valor: '10+',  label: 'Años de experiencia'    },
  { valor: '50+',  label: 'Proyectos completados'  },
  { valor: '24/7', label: 'Disponibilidad'         },
  { valor: '100%', label: 'Clientes satisfechos'   },
] as const