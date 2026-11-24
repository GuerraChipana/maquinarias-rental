# Manual de usuario y administración — MAVTEC E.I.R.L.

> Guía práctica para utilizar el sitio web público, solicitar cotizaciones y administrar el catálogo de maquinaria. Está dirigida al personal comercial y administrativo de MAVTEC. No sustituye la documentación técnica del código, que se mantiene en `estructura.md`.

## 1. ¿Qué permite hacer el sitio?

El sitio web de MAVTEC permite:

- Presentar los servicios de alquiler de maquinaria pesada y transporte de agua.
- Mostrar el catálogo de equipos, sus características y disponibilidad.
- Recibir solicitudes de cotización desde un formulario web.
- Enviar la solicitud al correo de la empresa y una confirmación al cliente.
- Administrar categorías y registros de maquinaria desde un panel protegido.
- Sincronizar el inventario con Google Sheets mediante Google Apps Script, cuando la integración está configurada.

## 2. Secciones del sitio público

| Sección | ¿Para qué sirve? |
|---|---|
| Inicio / Hero | Presenta MAVTEC, su propuesta de servicio y accesos a cotización |
| Servicios | Explica las líneas de servicio que ofrece la empresa |
| Catálogo destacado | Muestra una selección de equipos y permite iniciar una cotización |
| Nosotros | Presenta información institucional y atributos de la empresa |
| Testimonios | Muestra opiniones y referencias publicadas en el sitio |
| Contacto | Facilita la comunicación por teléfono, correo y WhatsApp |
| Catálogo completo | Permite consultar, buscar y filtrar los equipos registrados |

### Cómo consultar el catálogo

1. Ingresar a la página principal y seleccionar **Ver catálogo**, o abrir directamente `/catalogo`.
2. Revisar las tarjetas de maquinaria.
3. Utilizar el buscador para encontrar equipos por nombre o descripción.
4. Seleccionar una categoría para filtrar los resultados.
5. Revisar la descripción, características y disponibilidad del equipo.
6. Seleccionar **Cotizar equipo** para iniciar una solicitud.

La disponibilidad mostrada depende del inventario que entregue la integración configurada. Si Google Sheets no está conectado, el sistema utiliza el catálogo local de respaldo.

## 3. Cómo solicitar una cotización

El formulario se abre desde los botones de cotización de la web o desde el botón flotante.

### Paso 1: servicio y equipos

1. Seleccionar uno o varios equipos.
2. Indicar la cantidad de unidades de cada equipo.
3. Completar la fecha de inicio y la fecha de fin del servicio.
4. Indicar la ubicación de la obra.
5. Avanzar al paso de contacto.

La validación del formulario exige al menos un equipo y una cantidad de entre 1 y 20 unidades por equipo. La fecha de fin no puede ser anterior a la fecha de inicio.

### Paso 2: datos de contacto

Completar:

- Nombre y apellidos.
- Empresa.
- RUC (opcional, cuando corresponda; si se ingresa, debe tener 11 dígitos).
- Teléfono.
- Correo electrónico.
- Mensaje o información adicional (opcional).

Revisar los datos y enviar la solicitud. Si el envío se procesa correctamente, aparecerá la confirmación en pantalla.

### ¿Qué ocurre después del envío?

1. El servidor valida los datos recibidos.
2. Se prepara el resumen de equipos y cantidades.
3. Se envía un correo al buzón comercial configurado.
4. Se intenta enviar un correo de confirmación al cliente.
5. La interfaz informa si la solicitud fue procesada.

La confirmación depende de que Resend y las variables de correo estén correctamente configurados. Si aparece un error, el usuario puede volver a intentar o comunicarse directamente con MAVTEC.

## 4. Acceso al panel administrativo

**Ruta privada**

Abrir `/admin/catalogo` en el navegador. También se puede acceder desde la URL directa:

`https://TU-DOMINIO/admin/catalogo`

El acceso requiere la contraseña configurada por el responsable técnico mediante la variable de entorno `ADMIN_PASSWORD`. No se debe compartir esta contraseña ni guardarla en documentos públicos.

Al iniciar sesión se muestra el panel de gestión de flota y categorías. Para salir, utilizar **Cerrar sesión**.

## 5. Funciones del panel administrativo

### 5.1 Consultar y buscar equipos

- El panel muestra los equipos registrados.
- El buscador permite localizar equipos por nombre o identificador.
- El filtro permite mostrar una categoría específica.
- Las tarjetas de métricas resumen el total registrado, los equipos disponibles y los que figuran en operación.
- El botón de recarga vuelve a consultar el inventario.

### 5.2 Registrar una categoría

1. Seleccionar **Nueva categoría**.
2. Ingresar un identificador único, por ejemplo `grua-torre`.
3. Ingresar el nombre visible, por ejemplo **Grúa torre**.
4. Guardar la categoría.

Se recomienda utilizar identificadores cortos, en minúsculas, sin espacios ni tildes. El sistema normaliza los espacios a guiones.

### 5.3 Registrar una maquinaria

1. Seleccionar **Añadir equipo**.
2. Completar el identificador único del equipo, por ejemplo `exc-003`.
3. Ingresar el nombre comercial.
4. Elegir la categoría.
5. Indicar la ruta o URL de la imagen.
6. Escribir una descripción clara y específica.
7. Añadir las características técnicas necesarias.
8. Añadir los usos o aplicaciones.
9. Marcar si está disponible.
10. Marcar si debe aparecer como equipo destacado en la página principal.
11. Guardar el registro.

**Recomendaciones para las imágenes:**

- Si la imagen está dentro de `public`, registrar la ruta pública, por ejemplo `/images/machines/excavadora.webp`.
- Utilizar fotografías reales y autorizadas de los equipos que ofrece MAVTEC.
- Preferir imágenes nítidas, comprimidas y con nombres descriptivos.
- No utilizar imágenes que representen un modelo o una capacidad distinta de la maquinaria ofrecida.
- No colocar datos personales ni credenciales dentro de nombres de archivos o URLs.

### 5.4 Cambiar disponibilidad

En la columna de estado, seleccionar el indicador del equipo para alternar entre **Disponible** y **En obra**. La modificación se guarda en la integración de catálogo configurada.

### 5.5 Eliminar un equipo

1. Localizar el equipo.
2. Seleccionar el icono de eliminación.
3. Confirmar la operación.

La eliminación es permanente en el origen de datos conectado. Antes de confirmar, verificar que se está seleccionando el equipo correcto y conservar un respaldo si la empresa necesita mantener su historial.

### 5.6 Limitaciones actuales del panel

- El panel permite registrar, eliminar y cambiar la disponibilidad de equipos.
- No incluye una función de edición de todos los campos de un equipo ya registrado.
- La sincronización bidireccional depende de que `GOOGLE_APPS_SCRIPT_URL` apunte a un Apps Script desplegado y compatible con las operaciones utilizadas por la aplicación.
- Si la integración no está configurada o no autoriza la operación, los cambios no se guardarán en Google Sheets.

## 6. Configuración necesaria para el funcionamiento

Estas variables se configuran en el entorno de despliegue (por ejemplo, Vercel → Project → Settings → Environment Variables). No deben escribirse en el código ni publicarse en Git.

| Variable | Uso | Obligatoria para |
|---|---|---|
| `ADMIN_PASSWORD` | Contraseña del panel administrativo y firma de sesión | Acceso al panel |
| `GOOGLE_APPS_SCRIPT_URL` | URL del Apps Script que lee y modifica el catálogo | Sincronización con Google Sheets |
| `RESEND_API_KEY` | Clave privada del proveedor de correo | Envío de cotizaciones |
| `EMAIL_FROM` | Remitente verificado en Resend | Envío de correos |
| `EMAIL_EMPRESA` | Buzón que recibe las solicitudes comerciales | Recepción de cotizaciones |
| `NEXT_PUBLIC_SITE_URL` | URL pública canónica del sitio, con protocolo HTTPS y sin barra final | Canonical, sitemap, robots y URLs absolutas de SEO |

Después de cambiar variables de entorno, se debe generar un nuevo despliegue para que los cambios surtan efecto.

## 7. Recomendaciones de seguridad y operación

- No compartir la contraseña del panel ni las claves de Resend.
- No subir archivos `.env` al repositorio.
- Mantener respaldos periódicos de Google Sheets y de las imágenes.
- Verificar que las operaciones de alta, disponibilidad y eliminación se reflejen en el origen de datos.
- Probar el formulario de cotización después de cambios en Resend.
- Revisar periódicamente que teléfono, correo, WhatsApp, ubicación y horarios publicados sigan siendo correctos.
- No publicar como reales testimonios, certificaciones, capacidades, años de experiencia o clientes que no hayan sido verificados por la empresa.

## 8. SEO: tareas del responsable del sitio

La aplicación incorpora metadatos por página, datos estructurados de negocio local, etiquetas descriptivas para imágenes, páginas específicas por categoría, `robots.txt` y un sitemap que incluye las categorías con equipos registrados. Para completar el posicionamiento en producción:

1. Definir el dominio oficial y configurar `NEXT_PUBLIC_SITE_URL` con la versión canónica elegida (con o sin `www`).
2. Verificar el dominio en Google Search Console.
3. Enviar `https://TU-DOMINIO/sitemap.xml` desde Search Console.
4. Revisar `https://TU-DOMINIO/robots.txt` y comprobar que las rutas públicas se puedan rastrear.
5. Crear o reclamar el Perfil de Empresa en Google y completar nombre, dirección, teléfono, categoría, horarios y área de servicio con información real.
6. Mantener los mismos datos de contacto en la web y en los perfiles externos.
7. Solicitar reseñas auténticas a clientes reales y responderlas.
8. Añadir páginas o artículos útiles sobre los servicios, equipos, proyectos y zonas atendidas, evitando repetir palabras clave artificialmente.
9. Medir clics, impresiones, consultas y páginas indexadas en Search Console.

La etiqueta `alt` describe la imagen para accesibilidad y motores de búsqueda. El atributo `title` puede mostrar información adicional al pasar el cursor, pero no sustituye al texto alternativo ni garantiza mejor posicionamiento.

## 9. Solución de problemas frecuentes

| Problema | Qué revisar |
|---|---|
| No se puede ingresar al panel | Que `ADMIN_PASSWORD` esté configurada y que el despliegue esté actualizado |
| El catálogo no refleja cambios | Que `GOOGLE_APPS_SCRIPT_URL` sea correcto y que el Apps Script esté desplegado con permisos adecuados |
| No se envían cotizaciones | Que `RESEND_API_KEY`, `EMAIL_FROM` y `EMAIL_EMPRESA` estén configurados y que el remitente esté verificado |
| El correo llega al buzón incorrecto | Revisar el valor de `EMAIL_EMPRESA` |
| El sitemap aparece vacío | Configurar `NEXT_PUBLIC_SITE_URL` con el dominio oficial y desplegar nuevamente |
| Una imagen no aparece | Revisar que la ruta sea pública, que el archivo exista y que la URL sea accesible |
| Un equipo no aparece en el catálogo | Revisar la categoría, los datos del inventario y la respuesta de la integración |

## 10. Soporte técnico

Para cambios en estructura, componentes, rutas, integraciones, validaciones, autenticación o despliegue, consultar `estructura.md` y el repositorio del proyecto. Las modificaciones técnicas deben probarse con:

```bash
npm run lint
npm run build
```

No editar directamente los archivos de producción sin respaldo y sin comprobar el resultado de compilación.
