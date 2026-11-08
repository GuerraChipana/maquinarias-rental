// src/lib/email.ts
import type { CotizacionPayload } from "@/types";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("es-PE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatSentDate(isoStr: string): string {
  return new Date(isoStr).toLocaleString("es-PE", {
    dateStyle: "full",
    timeStyle: "short",
  });
}

function calcDias(inicio: string, fin: string): number {
  const ms = new Date(fin).getTime() - new Date(inicio).getTime();
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)) + 1);
}

function renderListaEquiposHtml(payload: CotizacionPayload): string {
  if (payload.maquinas && payload.maquinas.length > 0) {
    return `
      <ul style="margin: 8px 0; padding-left: 20px;">
        ${payload.maquinas
          .map(
            (m) =>
              `<li style="margin-bottom: 4px;"><strong>${m.cantidad}x</strong> ${m.maquinaNombre} ${
                m.categoria
                  ? `<span style="color: #6b7280; font-size: 12px;">(${m.categoria})</span>`
                  : ""
              }</li>`,
          )
          .join("")}
      </ul>
    `;
  }
  return `<p><strong>Máquina:</strong> ${payload.maquinaNombre} (${payload.cantidadUnidades} unidades)</p>`;
}

// ── EMAIL PARA EL DUEÑO ───────────────────────────────────────
export function buildEmailOwner(payload: CotizacionPayload): string {
  const dias = calcDias(payload.fechaInicio, payload.fechaFin);
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #1A3C6E; padding: 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0;">Nueva Cotización - MAVTEC</h1>
        <p style="color: #F5A623; margin: 5px 0 0 0;">Recibida el ${formatSentDate(payload.fechaEnvio)}</p>
      </div>
      <div style="padding: 24px; background-color: #f8fafc;">
        <h2 style="color: #1A3C6E; font-size: 16px; border-bottom: 2px solid #F5A623; padding-bottom: 8px;">Detalles del Servicio</h2>
        <div style="margin-bottom: 12px;">
          <strong>Equipos Solicitados (${payload.cantidadUnidades} unidades en total):</strong>
          ${renderListaEquiposHtml(payload)}
        </div>
        <p><strong>Fechas del Proyecto:</strong> ${formatDate(payload.fechaInicio)} al ${formatDate(payload.fechaFin)} (${dias} días)</p>
        <p><strong>Ubicación de la Obra:</strong> ${payload.ubicacionObra}</p>
        
        <h2 style="color: #1A3C6E; font-size: 16px; border-bottom: 2px solid #F5A623; padding-bottom: 8px; margin-top: 24px;">Datos del Cliente</h2>
        <p><strong>Nombre:</strong> ${payload.nombre}</p>
        <p><strong>Empresa/RUC:</strong> ${payload.empresa || "N/A"} / ${payload.ruc || "N/A"}</p>
        <p><strong>Teléfono:</strong> <a href="tel:${payload.telefono}">${payload.telefono}</a></p>
        <p><strong>Email:</strong> <a href="mailto:${payload.email}">${payload.email}</a></p>
        ${payload.mensaje ? `<p><strong>Mensaje:</strong> <em>"${payload.mensaje}"</em></p>` : ""}
      </div>
    </div>
  `;
}

// ── EMAIL DE CONFIRMACIÓN PARA EL CLIENTE ──────────────────────
export function buildEmailCliente(payload: CotizacionPayload): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #1A3C6E; padding: 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0;">¡Recibimos tu solicitud!</h1>
      </div>
      <div style="padding: 24px; background-color: #ffffff;">
        <p>Hola <strong>${payload.nombre}</strong>,</p>
        <p>Gracias por contactar a <strong>MAVTEC E.I.R.L</strong>. Hemos recibido tu solicitud para alquilar los siguientes equipos:</p>
        ${renderListaEquiposHtml(payload)}
     
        <p>Fechas estimadas: del <strong>${formatDate(payload.fechaInicio)}</strong> al <strong>${formatDate(payload.fechaFin)}</strong> en <strong>${payload.ubicacionObra}</strong>.</p>
       
        <p>Nuestro equipo está evaluando disponibilidad y nos comunicaremos contigo al <strong>${payload.telefono}</strong> o vía correo en menos de 2 horas.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        <p style="font-size: 12px; color: #6b7280; text-align: center;">MAVTEC E.I.R.L — Pisco, Ica, Perú</p>
      </div>
    </div>
  `;
}
