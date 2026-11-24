# Estructura del proyecto MAVTEC

> Inventario verificado en la rama `devep2`. Esta documentación refleja los archivos presentes en el repositorio y la organización funcional consolidada. No incluye `node_modules`, `.next`, archivos locales ignorados ni variables de entorno.

## 1. Criterios de organización

- **`src/app`**: enrutamiento de Next.js App Router, layouts, páginas y Route Handlers.
- **`src/modules`**: funcionalidades del negocio agrupadas por dominio (landing, catálogo, cotización y administración).
- **`src/shared`**: componentes, proveedores y configuración compartidos por más de un módulo.
- **`src/server`**: lógica exclusiva del servidor, autenticación y generación de correos.
- **`src/types`**: contratos e interfaces TypeScript compartidos.
- **`public`**: imágenes, iconos y demás recursos estáticos servidos directamente.
- **Raíz**: configuración, dependencias, instrucciones de agentes y documentación. `MANUAL_USUARIO.md` explica el uso del sitio y del panel; este archivo describe la arquitectura técnica.

## 2. Estructura consolidada

```text
maquinarias-rental/
├── public/
│   ├── images/
│   │   ├── machines/
│   │   ├── logo-oficial-h.png
│   │   └── movimiento-de-tierra-2.png
│   ├── MAVTEC_ICON.svg
│   ├── AguaPotable.png
│   ├── as.png
│   └── logonaranja.png
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── catalogo/page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── cotizacion/route.ts
│   │   │   └── maquinas/route.ts
│   │   ├── catalogo/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── modules/
│   │   ├── admin/
│   │   │   ├── actions/auth.actions.ts
│   │   │   └── components/
│   │   │       ├── AdminCatalogClient.tsx
│   │   │       └── DashboardCatalogo.tsx
│   │   ├── catalogo/
│   │   │   ├── actions/catalogo.actions.ts
│   │   │   ├── components/
│   │   │   │   ├── CatalogoExplorer.tsx
│   │   │   │   ├── CategoryCatalogView.tsx
│   │   │   │   └── MachineCard.tsx
│   │   │   └── data/maquinarias.ts
│   │   ├── cotizacion/
│   │   │   ├── components/
│   │   │   │   ├── FormCotizacion.tsx
│   │   │   │   ├── ModalCotizacion.tsx
│   │   │   │   └── SelectorMaquina.tsx
│   │   │   └── schemas/cotizacion.schema.ts
│   │   └── landing/
│   │       └── components/
│   │           ├── CatalogoPreview.tsx
│   │           ├── Contacto.tsx
│   │           ├── Hero.tsx
│   │           ├── Nosotros.tsx
│   │           ├── Servicios.tsx
│   │           └── Testimonios.tsx
│   ├── server/
│   │   ├── auth/admin-session.ts
│   │   └── email/cotizacion-templates.ts
│   ├── shared/
│   │   ├── components/layout/
│   │   │   ├── Footer.tsx
│   │   │   ├── NavDrawer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── config/
│   │   │   ├── empresa.ts
│   │   │   └── seo.ts
│   │   └── providers/ClientProviders.tsx
│   └── types/index.ts
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── MANUAL_USUARIO.md
├── adt.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── estructura.md
```

## 3. Responsabilidad por módulo

| Área | Responsabilidad |
|---|---|
| `app` | Rutas públicas/administrativas, layouts y endpoints HTTP |
| `modules/landing` | Secciones de la página principal |
| `modules/catalogo` | Inventario, tarjetas, consulta y sincronización del catálogo |
| `modules/cotizacion` | Estado del modal, formularios y validación de cotizaciones |
| `modules/admin` | Acceso administrativo y mantenimiento del inventario |
| `shared` | Navegación, pie de página, proveedor global y datos de empresa |
| `server` | Sesiones, autenticación y plantillas de correo |
| `types` | Tipos compartidos entre cliente, servidor y API |
| `shared/config/seo.ts` | Dominio canónico validado y generación de URLs absolutas para SEO |
| `app/sitemap.ts` y `app/robots.ts` | Descubrimiento e instrucciones de rastreo para buscadores |
| `public` | Recursos estáticos con rutas públicas |

## 4. Resolución de imports

El alias único `@/*` apunta a `src/*`. Los imports heredados detectados durante la migración fueron actualizados a sus ubicaciones canónicas; no se mantienen alias de compatibilidad para rutas antiguas.

Los imports deben apuntar directamente a las rutas canónicas:

- `@/modules/cotizacion/components/ModalCotizacion`
- `@/modules/catalogo/components/MachineCard`
- `@/modules/catalogo/data/maquinarias`
- `@/modules/catalogo/actions/catalogo.actions`
- `@/modules/admin/actions/auth.actions`
- `@/shared/config/empresa`
- `@/server/auth/admin-session`

## 5. Reglas para mantener la arquitectura

1. No colocar componentes de negocio dentro de `app`; las páginas deben componer módulos.
2. No importar módulos de servidor desde componentes cliente.
3. Mantener las mutaciones del catálogo en Server Actions y validar autorización en servidor.
4. Mantener los Route Handlers bajo `src/app/api`.
5. Mantener los esquemas de validación junto al módulo que los utiliza.
6. Guardar secretos únicamente en variables de entorno; nunca en `src`, `public` ni documentación.
7. Antes de mover o renombrar un archivo, actualizar todos sus imports y comprobar las rutas afectadas.

## 6. Verificación pendiente

La conexión con GitHub permite revisar y modificar los archivos, pero no ejecuta localmente `npm run build` ni `npm run lint`. Después de aplicar los cambios, ambos comandos deben ejecutarse en un entorno con dependencias instaladas y las variables de entorno necesarias. El resultado de compilación no debe considerarse aprobado hasta que esos comandos terminen correctamente.


## 7. SEO técnico implementado

- Metadatos globales en `src/app/layout.tsx` y metadatos específicos para `/catalogo`.
- Configuración del dominio canónico en `src/shared/config/seo.ts`, mediante `NEXT_PUBLIC_SITE_URL`.
- Datos estructurados JSON-LD de tipo `LocalBusiness` y `WebSite`.
- Sitemap XML generado por `src/app/sitemap.ts`.
- Reglas de rastreo mediante `src/app/robots.ts`, excluyendo administración y API.
- Texto alternativo y títulos descriptivos en imágenes de maquinaria, servicios, testimonios y panel.
- Inventario inicial del catálogo renderizado desde el servidor para que los nombres y descripciones estén presentes en el HTML inicial.

El dominio real debe configurarse antes de enviar el sitemap a Google Search Console. La configuración no inventa ni presupone un dominio de producción.

## 8. Documentación relacionada

- `MANUAL_USUARIO.md`: navegación del sitio, proceso de cotización, panel administrativo, variables de entorno, operación, mantenimiento y tareas de posicionamiento.
- `README.md`: instrucciones generales del proyecto y ejecución local.
