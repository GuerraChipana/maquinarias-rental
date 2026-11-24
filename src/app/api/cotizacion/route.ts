// src/app/api/cotizacion/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { buildEmailOwner, buildEmailCliente } from "@/server/email/cotizacion-templates";
import { cotizacionSchema, itemCotizacionSchema } from "@/modules/cotizacion/schemas/cotizacion.schema";
import type { CotizacionPayload } from "@/types";

const cotizacionPayloadSchema = cotizacionSchema.safeExtend({
  maquinas: z
    .array(
      itemCotizacionSchema.extend({
        maquinaNombre: z.string().min(1),
        imagen: z.string().optional(),
        categoria: z.string().optional(),
      }),
    )
    .min(1),
  maquinaNombre: z.string().min(1),
  cantidadUnidades: z.number().int().min(1),
  fechaEnvio: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY no está configurada.");
      return NextResponse.json(
        {
          success: false,
          error: "Servicio de correo no configurado en el servidor.",
        },
        { status: 500 },
      );
    }

    const rawBody: unknown = await request.json();
    const parsed = cotizacionPayloadSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Datos de cotización inválidos o incompletos.",
        },
        { status: 400 },
      );
    }

    const body: CotizacionPayload = parsed.data;
    const resend = new Resend(apiKey);
    const emailFrom =
      process.env.EMAIL_FROM || "Cotizaciones MAVTEC <onboarding@resend.dev>";
    const emailEmpresa =
      process.env.EMAIL_EMPRESA || "atencionalcliente@mavtec.com";

    // 1. Enviar correo al dueño/equipo de ventas de MAVTEC
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

    // 2. Enviar correo de confirmación al cliente
    const clientEmail = await resend.emails.send({
      from: emailFrom,
      to: body.email,
      replyTo: emailEmpresa,
      subject: "Hemos recibido tu solicitud de cotización — MAVTEC",
      html: buildEmailCliente(body),
    });

    if (clientEmail.error) {
      console.error(
        "Error enviando confirmación al cliente:",
        clientEmail.error,
      );
    }

    return NextResponse.json(
      { success: true, message: "Cotización enviada correctamente." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error en el endpoint de cotización:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Hubo un error interno al procesar la cotización.",
      },
      { status: 500 },
    );
  }
}
