import type { Maquina, CategoriaItem, Servicio, Testimonio } from "@/types";

// ─── Catálogo de Máquinas ─────────────────────────────────────

export const maquinarias: Maquina[] = [
  {
    id: "exc-001",
    nombre: "Excavadora de Orugas 20T",
    categoria: "excavadora",
    descripcion:
      "Excavadora hidráulica de alto rendimiento para movimiento de tierras en proyectos mineros y obras civiles de gran envergadura.",
    caracteristicas: [
      "Peso operativo: 20 toneladas",
      "Profundidad de excavación: 6.5 m",
      "Motor: 130 HP – Cummins",
      "Capacidad de cuchara: 0.9 m³",
      "Alcance máximo: 9.8 m",
    ],
    imagen: "/images/machines/excavadora.webp",
    disponible: true,
    destacada: true,
    usos: ["Minería", "Obras civiles", "Movimiento de tierras", "Demolición"],
  },
  {
    id: "comp-001",
    nombre: "Compactadora Vibrante 10T",
    categoria: "compactadora",
    descripcion:
      "Rodillo compactador vibrante para compactación de suelos granulares y asfalto en obras viales y de pavimentación.",
    caracteristicas: [
      "Peso operativo: 10 toneladas",
      "Amplitud de vibración: 0.4 mm",
      "Frecuencia: 30 Hz",
      "Ancho de trabajo: 1.8 m",
      "Motor: Deutz 100 HP",
    ],
    imagen: "/images/machines/Rodillo-compactador.jpg",
    disponible: true,
    destacada: true,
    usos: [
      "Obras viales",
      "Pavimentación",
      "Compactación de suelos",
      "Rellenos",
    ],
  },
  {
    id: "trac-001",
    nombre: "Tractor de Orugas D6",
    categoria: "tractor",
    descripcion:
      "Bulldozer de alto rendimiento para nivelación, empuje de materiales y trabajos en terrenos de difícil acceso.",
    caracteristicas: [
      "Potencia: 165 HP",
      "Peso operativo: 17 toneladas",
      "Capacidad de hoja: 3.5 m³",
      "Tracción: Oruga de acero",
      "Motor: Caterpillar 3306",
    ],
    imagen: "/images/machines/Tractor-sobre-orugas.jpeg",
    disponible: true,
    destacada: true,
    usos: [
      "Nivelación de terrenos",
      "Minería",
      "Agricultura industrial",
      "Desbroce",
    ],
  },
  {
    id: "cis-001",
    nombre: "Camión Cisterna 10,000 L",
    categoria: "camion-cisterna",
    descripcion:
      "Unidad de transporte de agua potable para abastecimiento en proyectos mineros, obras civiles y zonas rurales alejadas.",
    caracteristicas: [
      "Capacidad: 10,000 litros",
      "Bomba de descarga incluida",
      "Motor: 240 HP",
      "Chasis: Volvo FM",
      "Certificado para agua potable",
    ],
    imagen: "/images/machines/cisterna.png",
    disponible: true,
    destacada: true,
    usos: [
      "Transporte de agua potable",
      "Obras mineras",
      "Zonas rurales",
      "Construcción",
    ],
  },
  {
    id: "retro-001",
    nombre: "Retroexcavadora JCB 3CX",
    categoria: "retroexcavadora",
    descripcion:
      "Máquina versátil con cargador frontal y brazo excavador posterior, ideal para trabajos múltiples en obra.",
    caracteristicas: [
      "Potencia: 109 HP",
      "Profundidad de excavación: 5.9 m",
      "Capacidad cargador frontal: 1.0 m³",
      "Peso operativo: 8.5 toneladas",
      "Transmisión: Powershift 4x4",
    ],
    imagen: "/images/machines/Retroexcavadora-con-cuchara.webp",
    disponible: true,
    destacada: true,
    usos: ["Construcción", "Instalación de tuberías", "Zanjas", "Cimientos"],
  },
  {
    id: "vol-001",
    nombre: "Volquete 15 m³",
    categoria: "volquete",
    descripcion:
      "Camión volquete de gran capacidad para transporte de materiales, escombros y áridos en proyectos de construcción y minería.",
    caracteristicas: [
      "Capacidad de carga: 15 m³",
      "Carga útil: 20 toneladas",
      "Motor: 300 HP",
      "Transmisión: Automática 9 velocidades",
      "Chasis reforzado doble eje",
    ],
    imagen: "/images/machines/volquete.jpg",
    disponible: true,
    destacada: true,
    usos: ["Transporte de material", "Minería", "Construcción", "Canteras"],
  },
];

// ─── Categorías del catálogo ──────────────────────────────────

export const categorias: CategoriaItem[] = [
  { id: "todas", label: "Todas", icono: "LayoutGrid" },
  { id: "excavadora", label: "Excavadoras", icono: "Shovel" },
  { id: "compactadora", label: "Compactadoras", icono: "Layers" },
  { id: "tractor", label: "Tractores", icono: "Tractor" },
  { id: "camion-cisterna", label: "Camiones Cisterna", icono: "Truck" },
  { id: "retroexcavadora", label: "Retroexcavadoras", icono: "Construction" },
  { id: "volquete", label: "Volquetes", icono: "Truck" },
];

// ─── Servicios ────────────────────────────────────────────────

export const servicios: Servicio[] = [
  {
    id: "maquinaria-pesada",
    titulo: "Maquinaria Pesada",
    descripcion:
      "Equipos de alto rendimiento para minería, construcción y movimiento de tierras.",
    icono: "Tractor",
    imagen: "https://develon-ce.cl/wp-content/uploads/2025/12/Como-la-maquinaria-pesada-optimiza-proyectos-de-construccion-e-infraestructura.jpg",
    beneficios: [
      "Excavadoras",
      "Tractores D6-D8",
      "Compactadoras",
      "Grúas",
    ],
    span: "lg:col-span-7 min-h-[360px] lg:min-h-[420px]",
  },
  {
    id: "agua-potable",
    titulo: "Agua Potable",
    descripcion:
      "Suministro certificado para campamentos y operaciones en Pisco e Ica.",
    icono: "Droplets",
    imagen: "/AguaPotable.png",
    beneficios: [
      "Calidad certificada",
      "Atención 24/7",
    ],
    span: "lg:col-span-5 min-h-[360px] lg:min-h-[420px]",
  },
  {
    id: "camiones-cisterna",
    titulo: "Camiones Cisterna",
    descripcion:
      "Control de polvo, riego y abastecimiento para operaciones industriales.",
    icono: "Truck",
    imagen: "https://previews.123rf.com/images/rfoxfoto/rfoxfoto1411/rfoxfoto141100255/34010733-large-tank-truck-working-at-a-construction-site.jpg",
    beneficios: [
      "5k a 20k L",
      "Riego a presión",
    ],
    span: "lg:col-span-5 min-h-[320px] lg:min-h-[340px]",
  },
  {
    id: "operadores",
    titulo: "Operadores",
    descripcion:
      "Personal capacitado bajo estándares estrictos de seguridad para zonas de alta exigencia.",
    icono: "HardHat",
    imagen: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1800&auto=format&fit=crop",
    beneficios: [
      "Licencias vigentes",
      "Experiencia minera",
      "SCTR activo",
    ],
    span: "lg:col-span-7 min-h-[320px] lg:min-h-[340px]",
  },
];

// ─── Testimonios ──────────────────────────────────────────────

export const testimonios: Testimonio[] = [
  {
    id: "test-001",
    nombre: "Carlos Mendoza",
    empresa: "Constructora Andina SAC",
    cargo: "Jefe de Obra",
    texto:
      "Trabajamos con MAVTEC en dos proyectos de movimiento de tierras en Pisco. La excavadora llegó a tiempo, el operador fue muy profesional y el equipo no tuvo ninguna falla. Los volvería a contratar sin dudarlo.",
    rating: 5,
  },
  {
    id: "test-002",
    nombre: "Rosa Quispe",
    empresa: "Minera Pacífico S.A.",
    cargo: "Supervisora de Logística",
    texto:
      "El servicio de cisterna para nuestra operación minera en Ica fue impecable. Puntualidad total, agua certificada y atención 24/7. MAVTEC se convirtió en nuestro proveedor fijo.",
    rating: 5,
  },
  {
    id: "test-003",
    nombre: "Jorge Huamaní",
    empresa: "Municipalidad Provincial de Pisco",
    cargo: "Gerente de Infraestructura",
    texto:
      "Contratamos la compactadora para obra vial. El equipo estaba en excelentes condiciones y el servicio fue muy completo. Buena empresa, seria y responsable.",
    rating: 4,
  },
];
