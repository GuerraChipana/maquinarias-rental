'use server';

import crypto from 'crypto';

export async function verificarPasswordAdmin(password: string): Promise<boolean> {
  const correctPassword = process.env.ADMIN_PASSWORD;
  
  // Si no está configurada la variable en Vercel, denegamos por seguridad
  if (!correctPassword || !password) {
    return false;
  }

  try {
    // Convertimos ambas cadenas en Buffers de longitud fija para comparación segura
    const inputBuffer = Buffer.from(password.trim());
    const correctBuffer = Buffer.from(correctPassword.trim());

    // Si las longitudes no coinciden, fallan de inmediato sin explotar
    if (inputBuffer.length !== correctBuffer.length) {
      return false;
    }

    // timingSafeEqual compara byte a byte de manera segura ante ataques de tiempo
    return crypto.timingSafeEqual(inputBuffer, correctBuffer);
  } catch (error) {
    return false;
  }
}