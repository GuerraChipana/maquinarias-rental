# MAVTEC E.I.R.L. — Sitio web y catálogo de maquinaria

Aplicación web corporativa de MAVTEC para presentar servicios de alquiler de maquinaria pesada y transporte de agua, consultar el inventario y recibir solicitudes de cotización.

## Tecnologías

- Next.js 16 con App Router
- React 19 y TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form y Zod para formularios y validación
- Google Apps Script / Google Sheets como integración opcional del catálogo
- Resend para el envío de correos de cotización

## Requisitos

- Node.js compatible con Next.js 16
- npm
- Variables de entorno del proyecto configuradas según el entorno de ejecución

## Instalación y ejecución local

```bash
npm install
npm run dev
```

Abrir http://localhost:3000.

## Comprobaciones antes de desplegar

```bash
npm run lint
npm run build
```

No publicar un despliegue si la compilación falla o si no se han configurado las variables necesarias para las funciones que se utilizarán.

## Rutas principales

| Ruta | Función |
|---|---|
| `/` | Página de presentación de MAVTEC |
| `/catalogo` | Catálogo de maquinaria con búsqueda y filtros |
| `/catalogo/[category]` | Página específica e indexable por categoría de maquinaria |
| `/admin/catalogo` | Panel privado para administrar categorías y equipos |
| `/api/maquinas` | Endpoint de consulta del inventario |
| `/api/cotizacion` | Endpoint que valida y procesa solicitudes de cotización |
| `/robots.txt` | Directivas de rastreo para buscadores |
| `/sitemap.xml` | Mapa de URLs públicas para buscadores |

## Variables de entorno

Configurar en el entorno local o en el proveedor de despliegue. No guardar secretos en Git.

| Variable | Función |
|---|---|
| `ADMIN_PASSWORD` | Contraseña del panel administrativo |
| `GOOGLE_APPS_SCRIPT_URL` | Integración con Google Sheets |
| `RESEND_API_KEY` | Clave privada de Resend |
| `EMAIL_FROM` | Remitente verificado para los correos |
| `EMAIL_EMPRESA` | Correo que recibe las cotizaciones |
| `NEXT_PUBLIC_SITE_URL` | Dominio canónico de producción, por ejemplo `https://www.tudominio.pe` |

El sitemap y las URLs canónicas se generan con el dominio indicado en `NEXT_PUBLIC_SITE_URL`. Definirlo antes de registrar el sitio en Google Search Console.

### Protección del formulario de cotización

El endpoint `/api/cotizacion` valida el formato y el contenido de la solicitud, limita el cuerpo a 24 KiB y restringe la cantidad y longitud de los campos recibidos. No requiere servicios externos de almacenamiento o rate limiting.

## Documentación del proyecto

- **[MANUAL_USUARIO.md](./MANUAL_USUARIO.md)** — guía del visitante, proceso de cotización, administración del catálogo, configuración operativa y tareas SEO.
- **[estructura.md](./estructura.md)** — arquitectura, inventario de archivos, módulos, responsabilidades y criterios técnicos.
- **[adt.md](./adt.md)** — notas históricas de diagnóstico y despliegue; revisar su vigencia antes de aplicar instrucciones antiguas.

## Arquitectura resumida

- `src/app`: páginas, layouts, endpoints, sitemap y robots.
- `src/modules`: funcionalidades de landing, catálogo, cotización y administración.
- `src/shared`: componentes compartidos, configuración empresarial y SEO.
- `src/server`: autenticación y servicios exclusivos del servidor.
- `src/types`: tipos compartidos.
- `public`: recursos estáticos.

## SEO y posicionamiento local

La aplicación incorpora metadatos por página, Open Graph, Twitter Cards, datos estructurados JSON-LD de negocio local, texto alternativo descriptivo en imágenes, sitemap y robots. La ficha de Google Business Profile, la verificación en Search Console, las reseñas reales y la definición del dominio canónico requieren acciones del propietario del negocio.

El SEO no garantiza una posición específica: debe mantenerse con contenido útil, datos empresariales correctos, buen rendimiento y seguimiento de resultados.
