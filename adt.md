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
└── tailwind.config.

# 🚀 MAVTEC — Diagnóstico del Proyecto + Guía de Deploy

## ✅ Estado General del Proyecto

El proyecto está **bien estructurado y es funcional**. Next.js 16 con App Router, TypeScript, Tailwind v4, Resend para emails y Zod para validaciones. 

---

## 🐛 Bugs / Mejoras Detectadas

### 1. ⚠️ `.env` subido a GitHub — CRÍTICO
El `.gitignore` tiene `.env*` pero el archivo `.env` **podría haberse subido antes de agregar la regla**, y además contiene la **API key real de Resend** y el email de la empresa.

**Acciones inmediatas:**
1. Verifica en GitHub que `.env` no sea visible en el repositorio.
2. Si está subido, **regenera la API Key de Resend** en [resend.com/api-keys](https://resend.com/api-keys) inmediatamente.
3. En Vercel, configura las variables de entorno en el panel (Settings → Environment Variables), **nunca en el código**.

---

### 2. ⚠️ Ruta de imagen Open Graph incorrecta
En `layout.tsx` línea 41:
```ts
// ❌ Incorrecto — /public no existe en runtime
url: '/public/MAVTEC-LOGO.svg'

// ✅ Correcto — Next.js sirve /public como raíz
url: '/MAVTEC-LOGO.svg'
```
Además, falta el archivo `MAVTEC-LOGO.svg` de 1200×630px. El OG Image es importante para SEO y redes sociales.

---

### 3. ⚠️ Favicons faltantes
En `layout.tsx` se referencian:
- `/apple-touch-icon.png` → **no existe en `/public`**
- `/favicon-32x32.png` → **no existe en `/public`**

Solo existe `MAVTEC_ICON.svg`. Genera los favicons en [realfavicongenerator.net](https://realfavicongenerator.net/) y colócalos en `/public`.

---

### 4. 📌 WhatsApp con doble espacio en `constants.ts`
```ts
// ❌ Tiene doble espacio
whatsapp: '+51  957682641'

// ✅ Correcto
whatsapp: '+51957682641'
```
Esto podría hacer que el link `wa.me` falle.

---

### 5. 📌 Links de redes sociales pendientes
```ts
facebook:  'https://facebook.com/mavtec',  // ← Actualizar con URL real
instagram: 'https://instagram.com/mavtec', // ← Actualizar con URL real
```

---

### 6. 📌 Google Maps link genérico
```ts
maps: 'https://maps.google.com/?q=Pisco,Ica,Peru' // ← Poner coordenadas exactas
```
Usar coordenadas exactas: `https://maps.google.com/?q=-13.714,-76.202`

---

## 🌐 Deploy: Vercel (Recomendado para Next.js)

**Vercel es la plataforma ideal** para Next.js. CPanel NO funciona bien con Next.js porque requiere un servidor Node.js corriendo, no solo archivos estáticos.

### Paso 1 — Configurar Variables de Entorno en Vercel
1. Ve a [vercel.com](https://vercel.com) → tu proyecto → **Settings → Environment Variables**
2. Agrega estas variables (Production + Preview + Development):

| Nombre | Valor |
|--------|-------|
| `RESEND_API_KEY` | `re_xxxxxxx` (la nueva que generaste) |
| `EMAIL_EMPRESA` | `atencionalcliente@mavtec.com` |
| `EMAIL_FROM` | `no-reply@mavtec.com` |

> [!IMPORTANT]
> El dominio del `EMAIL_FROM` (`mavtec.com`) debe estar **verificado en Resend**. Ve a [resend.com/domains](https://resend.com/domains) y agrega `mavtec.com` siguiendo las instrucciones de DNS.

### Paso 2 — Deploy Automático desde GitHub
Vercel ya detecta los commits a `main`/`master` y hace deploy automáticamente. Solo verifica que:
- El repo esté conectado en Vercel (Settings → Git)
- El branch correcto esté configurado

### Paso 3 — Conectar Dominio Propio a Vercel

#### Si compraste el dominio en **Namecheap / GoDaddy / cualquier registrador**:
1. Vercel → tu proyecto → **Settings → Domains → Add Domain**
2. Escribe tu dominio (ej: `mavtec.com`) → **Add**
3. Vercel te dará 2 opciones:
   - **Nameservers (Recomendado)**: Apunta los nameservers de tu registrador a los de Vercel (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`)
   - **A Record**: Crea un registro `A` apuntando a `76.76.21.21` y un `CNAME` de `www` a `cname.vercel-dns.com`

#### Si el dominio está en **cPanel**:
1. Entra a cPanel → **Zone Editor** (o "DNS Zone Editor")
2. Busca tu dominio y edita los registros:
   ```
   Tipo: A      Nombre: @       Valor: 76.76.21.21
   Tipo: CNAME  Nombre: www     Valor: cname.vercel-dns.com
   ```
3. En Vercel → Settings → Domains → agrega `mavtec.com` y `www.mavtec.com`
4. Vercel generará el SSL automáticamente (puede tardar 24-48hs en propagarse)

> [!NOTE]
> **cPanel no sirve para hostear Next.js**, solo para gestionar el dominio DNS. El código corre en Vercel.

---

## 📦 ¿Por qué NO usar cPanel para hostear Next.js?

| | cPanel (Hosting compartido) | Vercel |
|---|---|---|
| Next.js App Router | ❌ No compatible | ✅ Nativo |
| API Routes (`/api/*`) | ❌ No funciona | ✅ Serverless |
| Server Components | ❌ No funciona | ✅ Nativo |
| Deploy automático | ❌ Manual | ✅ Por cada commit |
| SSL gratis | ✅ | ✅ |
| Plan gratuito | ❌ Pago | ✅ Hobby gratis |

> [!TIP]
> **cPanel** sirve perfectamente para gestionar el DNS de tu dominio y redirigirlo a Vercel. Es la combinación ideal: dominio en cPanel → hosting en Vercel.

---

## 🔧 Fixes Recomendados Antes del Deploy

```bash
# ✅ 1. WhatsApp corregido en constants.ts → '+51957682641'
# ✅ 2. Google Maps con coordenadas exactas → -13.7122,-76.2022
# ✅ 3. OG Image path corregido en layout.tsx → '/og-image.jpg'
# ✅ 4. Favicons rotos comentados — ya no causan 404
# ⏳ 5. Crear og-image.jpg (1200x630px) y ponerla en /public
# ⏳ 6. Generar favicons en realfavicongenerator.net → subir a /public
# ⏳ 7. Actualizar links de Facebook/Instagram en constants.ts
# ⏳ 8. Verificar dominio mavtec.com en Resend (DNS)
```

---

## 📋 Checklist Final de Deploy

### ✅ Código — Ya corregido
- [x] WhatsApp sin doble espacio (`+51957682641`) — `constants.ts`
- [x] Google Maps con coordenadas exactas de Pisco, Ica — `constants.ts`
- [x] OG Image path corregido (`/og-image.jpg`) — `layout.tsx`
- [x] Favicons rotos comentados (no más 404s) — `layout.tsx`
- [x] `.env*` en `.gitignore` ✓

### ⏳ Assets — Necesita archivos manuales
- [ ] Crear `og-image.jpg` (1200×630px) y colocarla en `/public/` — para SEO y redes
- [ ] Generar favicons en [realfavicongenerator.net](https://realfavicongenerator.net/) y subir a `/public/`
- [ ] Actualizar `facebook` e `instagram` con URLs reales en `constants.ts`

### ⏳ Infraestructura — Acciones en paneles externos
- [ ] Verificar en GitHub que `.env` no sea visible en el historial
- [ ] Regenerar API Key de Resend si el `.env` estuvo expuesto
- [ ] Agregar variables de entorno en Vercel (Settings → Environment Variables)
- [ ] Verificar dominio `mavtec.com` en Resend → [resend.com/domains](https://resend.com/domains)
- [ ] Conectar dominio en Vercel (Settings → Domains) y configurar DNS en cPanel/registrador
- [ ] Probar formulario de cotización en producción
