// src/app/api/cotizacion/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { buildEmailOwner, buildEmailCliente } from '@/lib/email';
import type { CotizacionPayload } from '@/types';

// Inicializamos Resend con la variable de entorno
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body: CotizacionPayload = await request.json();

    // 1. Enviar correo al dueño/equipo de ventas de MAVTEC
    const ownerEmail = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Cotizaciones MAVTEC <onboarding@resend.dev>',
      to: process.env.EMAIL_EMPRESA || 'atencionalcliente@mavtec.com',
      // 👇 CORRECCIÓN: Debe ser reply_to (con guion bajo)
      replyTo: body.email, 
      subject: `🔥 Nueva Cotización: ${body.maquinaNombre} - ${body.empresa || body.nombre}`,
      html: buildEmailOwner(body),
    });

    if (ownerEmail.error) {
      throw new Error(ownerEmail.error.message);
    }

    // 2. Enviar correo de confirmación al cliente
    const clientEmail = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'MAVTEC <onboarding@resend.dev>',
      to: body.email,
      // 👇 CORRECCIÓN: Debe ser reply_to (con guion bajo)
      replyTo: process.env.EMAIL_EMPRESA || 'atencionalcliente@mavtec.com', 
      subject: 'Hemos recibido tu solicitud de cotización — MAVTEC',
      html: buildEmailCliente(body),
    });

    if (clientEmail.error) {
      console.error('Error enviando confirmación al cliente:', clientEmail.error);
      // No bloqueamos la respuesta exitosa si solo falla el correo del cliente, 
      // pero lo registramos en el servidor.
    }

    return NextResponse.json(
      { success: true, message: 'Cotización enviada correctamente.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en el endpoint de cotización:', error);
    return NextResponse.json(
      { success: false, error: 'Hubo un error interno al procesar la cotización.' },
      { status: 500 }
    );
  }
}