import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { buildEmailOwner, buildEmailCliente } from "@/server/email/cotizacion-templates";
import { cotizacionSchema, itemCotizacionSchema } from "@/modules/cotizacion/schemas/cotizacion.schema";
import { checkCotizacionRateLimit } from "@/server/security/cotizacion-rate-limit";
import type { CotizacionPayload } from "@/types";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 24 * 1024;

const cotizacionPayloadSchema = cotizacionSchema.safeExtend({
  maquinas: z
    .array(
      itemCotizacionSchema.extend({
        maquinaNombre: z.string().trim().min(1).max(120),
        imagen: z.string().max(500).optional(),
        categoria: z.string().max(80).optional(),
      }),
    )
    .min(1)
    .max(8),
  ubicacionObra: z.string().trim().min(3).max(250),
  nombre: z.string().trim().min(2).max(100),
  empresa: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  mensaje: z.string().max(1000).optional(),
  maquinaNombre: z.string().trim().min(1).max(120),
  cantidadUnidades: z.number().int().min(1).max(160),
  fechaEnvio: z.string().min(1).max(64),
});

async function readLimitedBody(request: Request): Promise<string | null> {
  if (!request.body) return null;

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;

      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(body);
}

export async function POST(request: Request) {
  try {
    const rateLimit = await checkCotizacionRateLimit(request.headers);

    // Fallar de forma cerrada evita enviar correos si el control distribuido
    // no está configurado o Redis no está disponible.
    if (!rateLimit) {
      console.error("Protección de cotizaciones no disponible: revisar Upstash Redis.");
      return NextResponse.json(
        { success: false, error: "El servicio de cotizaciones no está disponible temporalmente." },
        { status: 503 },
      );
    }

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Has enviado demasiadas solicitudes. Inténtalo nuevamente más tarde." },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfter) },
        },
      );
    }

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Formato de solicitud no válido." },
        { status: 415 },
      );
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, error: "La solicitud supera el tamaño permitido." },
        { status: 413 },
      );
    }

    const rawText = await readLimitedBody(request);
    if (rawText === null) {
      return NextResponse.json(
        { success: false, error: "La solicitud supera el tamaño permitido." },
        { status: 413 },
      );
    }

    let rawBody: unknown;
    try {
      rawBody = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        { success: false, error: "El contenido JSON no es válido." },
        { status: 400 },
      );
    }

    const parsed = cotizacionPayloadSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Datos de cotización inválidos o incompletos." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY no está configurada.");
      return NextResponse.json(
        { success: false, error: "Servicio de correo no configurado en el servidor." },
        { status: 500 },
      );
    }

    const body: CotizacionPayload = parsed.data;
    const resend = new Resend(apiKey);
    const emailFrom =
      process.env.EMAIL_FROM || "Cotizaciones MAVTEC <onboarding@resend.dev>";
    const emailEmpresa =
      process.env.EMAIL_EMPRESA || "atencionalcliente@mavtec.com";

    const ownerEmail = await resend.emails.send({
      from: emailFrom,
      to: emailEmpresa,
      replyTo: body.email,
      subject: `Nueva Cotización: ${body.maquinaNombre} - ${body.empresa || body.nombre}`,
      html: buildEmailOwner(body),
    });

    if (ownerEmail.error) {
      throw new Error(ownerEmail.error.message);
    }

    const clientEmail = await resend.emails.send({
      from: emailFrom,
      to: body.email,
      replyTo: emailEmpresa,
      subject: "Hemos recibido tu solicitud de cotización — MAVTEC",
      html: buildEmailCliente(body),
    });

    if (clientEmail.error) {
      console.error("Error enviando confirmación al cliente:", clientEmail.error);
    }

    return NextResponse.json(
      { success: true, message: "Cotización enviada correctamente." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error en el endpoint de cotización:", error);
    return NextResponse.json(
      { success: false, error: "Hubo un error interno al procesar la cotización." },
      { status: 500 },
    );
  }
}
