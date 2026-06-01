# 📋 MAVTEC E.I.R.L — Documentación del Proyecto Web
> Pegar este archivo al inicio de cada nueva conversación con Claude para continuar el desarrollo.

---

## 🏢 Datos de la Empresa

| Campo | Valor |
|-------|-------|
| **Nombre** | MAVTEC E.I.R.L |
| **Rubro** | Alquiler de maquinaria pesada |
| **Email** | atencionalcliente@mavtec.com |
| **Teléfono** | 957 682 641 |
| **Ubicación** | Pisco, Ica, Perú |
| **Color primario** | `#1A3C6E` (azul) |
| **Color secundario** | `#F5A623` (naranja) |
| **Fuentes** | Montserrat (títulos) / Inter (cuerpo) |

### Servicios que ofrece MAVTEC:
- Alquiler de maquinaria pesada (tractores, compactadoras, grúas, camiones orugas)
- Camiones cisterna
- Servicio de agua potable

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Lenguaje** | TypeScript |
| **Estilos** | Tailwind CSS |
| **Formularios** | react-hook-form + Zod |
| **Animaciones** | Framer Motion |
| **Iconos** | Lucide React |
| **Email** | Resend (free tier) |
| **Toast** | Sonner |
| **Modal** | @radix-ui/react-dialog |
| **Deploy** | Vercel (free / hobby) |
| **Imágenes** | Cloudinary (free) |

### Librerías instaladas:
```bash
npm install framer-motion lucide-react clsx tailwind-merge
npm install react-hook-form zod @hookform/resolvers
npm install @radix-ui/react-dialog @radix-ui/react-select
npm install sonner
npm install resend
npm install next-cloudinary
```

---

## 📁 Estructura del Proyecto

```
maquinarias-rental/
├── src/
│   ├── app/
│   │   ├── layout.tsx                ✅ CREADO
│   │   ├── page.tsx                  ⏳ Sprint 2
│   │   └── api/
│   │       └── cotizacion/
│   │           └── route.ts          ⏳ Sprint 7
│   │
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx              ⏳ Sprint 2
│   │   │   ├── Catalogo.tsx          ⏳ Sprint 3
│   │   │   ├── Servicios.tsx         ⏳ Sprint 3
│   │   │   ├── Nosotros.tsx          ⏳ Sprint 4
│   │   │   ├── Testimonios.tsx       ⏳ Sprint 4
│   │   │   ├── Contacto.tsx          ⏳ Sprint 5
│   │   │   └── Footer.tsx            ⏳ Sprint 5
│   │   ├── cotizacion/
│   │   │   ├── ModalCotizacion.tsx   ⏳ Sprint 6
│   │   │   ├── FormCotizacion.tsx    ⏳ Sprint 6
│   │   │   └── SelectorMaquina.tsx   ⏳ Sprint 6
│   │   ├── ui/
│   │   │   ├── Button.tsx            ⏳ Sprint 2
│   │   │   └── MachineCard.tsx       ⏳ Sprint 3
│   │   └── Navbar.tsx                ⏳ Sprint 2
│   │
│   ├── lib/
│   │   ├── constants.ts              ✅ CREADO
│   │   ├── email.ts                  ⏳ Sprint 7
│   │   └── validations.ts            ⏳ Sprint 6
│   │
│   ├── types/
│   │   └── index.ts                  ✅ CREADO
│   │
│   └── data/
│       └── maquinarias.ts            ✅ CREADO
│
├── public/
│   └── images/
│       └── logo.png                  ✅ COPIADO
│
├── tailwind.config.ts                ✅ CREADO
├── tsconfig.json                     ✅ CORREGIDO
└── .env.local                        ⏳ Sprint 7
```

---

## ✅ Estado de los Sprints

### Sprint 1 — Base del Proyecto `COMPLETADO ✅`
- [x] `tailwind.config.ts` — colores MAVTEC + fuentes
- [x] `src/types/index.ts` — interfaces: Maquina, CotizacionForm, Testimonio, Servicio
- [x] `src/data/maquinarias.ts` — catálogo con 6 máquinas + 3 testimonios
- [x] `src/lib/constants.ts` — info centralizada de MAVTEC
- [x] `src/app/layout.tsx` — SEO completo (Open Graph, Twitter Card)
- [x] `tsconfig.json` — alias `@/` configurado apuntando a `src/`

> **Nota tsconfig:** Se eliminó `"baseUrl": "."` porque desde TS 4.1 no se necesita. Solo se usan los `paths`.

---

### Sprint 2 — Navbar + Hero `→ SIGUIENTE`
- [ ] `components/Navbar.tsx` — logo MAVTEC + menú responsive
- [ ] `components/Navbar.tsx` — menú hamburguesa para móvil
- [ ] `components/sections/Hero.tsx` — imagen de fondo + CTA
- [ ] `components/sections/Hero.tsx` — botón "Solicitar Cotización"
- [ ] `src/app/page.tsx` — página principal ensamblada

---

### Sprint 3 — Catálogo + Servicios `PENDIENTE`
- [ ] `components/sections/Catalogo.tsx` — filtro por categoría
- [ ] `components/ui/MachineCard.tsx` — card con foto y características
- [ ] `components/sections/Servicios.tsx` — 4 tarjetas de servicios

---

### Sprint 4 — Nosotros + Testimonios `PENDIENTE`
- [ ] `components/sections/Nosotros.tsx` — stats animados
- [ ] `components/sections/Testimonios.tsx` — carrusel de testimonios

---

### Sprint 5 — Contacto + Footer `PENDIENTE`
- [ ] `components/sections/Contacto.tsx` — WhatsApp + teléfonos
- [ ] `components/sections/Contacto.tsx` — Google Maps embed (Pisco-Ica)
- [ ] `components/sections/Footer.tsx` — logo + links + redes sociales

---

### Sprint 6 — Módulo de Cotización `PENDIENTE`
- [ ] `src/lib/validations.ts` — schema Zod
- [ ] `components/cotizacion/SelectorMaquina.tsx` — tipo + fechas + cantidad
- [ ] `components/cotizacion/FormCotizacion.tsx` — react-hook-form
- [ ] `components/cotizacion/ModalCotizacion.tsx` — resumen + botón envío

---

### Sprint 7 — API de Email (Resend) `PENDIENTE`
- [ ] `src/lib/email.ts` — template HTML del correo
- [ ] `src/app/api/cotizacion/route.ts` — POST endpoint
- [ ] `.env.local` — RESEND_API_KEY + EMAIL_EMPRESA
- [ ] Toast de confirmación con Sonner

---

### Sprint 8 — Deploy en Vercel `PENDIENTE`
- [ ] Subir proyecto a GitHub (`git push`)
- [ ] Conectar repo en vercel.com
- [ ] Variables de entorno en Vercel dashboard
- [ ] Configurar dominio DNS (registro A)

---

## 🔑 Variables de Entorno (.env.local)

```env
RESEND_API_KEY=re_xxxxxxxxxx
EMAIL_EMPRESA=atencionalcliente@mavtec.com
EMAIL_FROM=no-reply@mavtec.com
```

---

## 📌 Decisiones técnicas tomadas

1. **Hosting:** Vercel Free — el único costo es el dominio (~S/.60/año para .pe)
2. **Email:** Resend free tier (100 emails/día, suficiente para el volumen del negocio)
3. **Imágenes:** Cloudinary free (25 créditos/mes + CDN automático)
4. **No se usa VM/GCP** — sobrecosto innecesario para este tipo de sitio
5. **tsconfig paths:** `@/*` → `./src/*` sin `baseUrl` (TS 4.1+)

---

## 📝 Prompt de contexto para nueva sesión

> Copiar y pegar esto al inicio de una nueva conversación:

```
Estoy desarrollando el sitio web de MAVTEC E.I.R.L, empresa de alquiler de 
maquinaria pesada en Pisco, Ica, Perú.

Stack: Next.js 14 + TypeScript + Tailwind CSS + Framer Motion
Colores: primario #1A3C6E (azul) / secundario #F5A623 (naranja)
Fuentes: Montserrat + Inter

El Sprint 1 está completado (base del proyecto, tipos, datos, layout, constantes).
Estamos en el Sprint 2: Navbar + Hero.

Por favor adjunta el archivo MAVTEC_DOC_PROYECTO.md que te comparto para 
ver el estado completo y continuar desde donde dejamos.
```

---

*Última actualización: Sprint 1 completado — iniciando Sprint 2*
