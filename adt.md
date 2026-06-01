maquinarias-rental/
├── src/
│   ├── app/
│   │   ├── layout.tsx            ← Meta SEO, fuentes, idioma
│   │   ├── page.tsx              ← Landing page completa
│   │   └── api/
│   │       └── cotizacion/
│   │           └── route.ts      ← POST: recibe form, envía email
│   │
│   ├── components/
│   │   ├── sections/             ← Cada sección de la landing
│   │   │   ├── Hero.tsx
│   │   │   ├── Catalogo.tsx      ← Catálogo de máquinas
│   │   │   ├── Servicios.tsx
│   │   │   ├── Nosotros.tsx
│   │   │   └── Testimonios.tsx
│   │   │
│   │   ├── cotizacion/           ← Todo el módulo de cotización
│   │   │   ├── ModalCotizacion.tsx
│   │   │   ├── FormCotizacion.tsx
│   │   │   └── SelectorMaquina.tsx
│   │   │
│   │   └── ui/                   ← Botones, cards reutilizables
│   │       ├── Button.tsx
│   │       └── MachineCard.tsx
│   │
│   ├── lib/
│   │   ├── email.ts              ← Template HTML del correo
│   │   └── validations.ts        ← Schemas Zod
│   │
│   ├── types/index.ts            ← Tipos TS (Maquina, Cotizacion...)
│   └── data/maquinarias.ts       ← Catálogo de máquinas (data local)
│
├── public/
│   └── images/machines/          ← Fotos de cada máquina
│
├── .env.local                    ← RESEND_API_KEY, EMAIL_TO, etc.
├── next.config.ts
└── tailwind.config.ts