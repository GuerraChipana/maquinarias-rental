"use server";

import {
  verifyAdminPassword,
  createAdminSessionCookie,
  clearAdminSessionCookie,
} from "@/server/auth/admin-session";

export async function verificarPasswordAdmin(
  password: string,
): Promise<boolean> {
  const isValid = verifyAdminPassword(password);
  if (!isValid) {
    return false;
  }

  await createAdminSessionCookie();
  return true;
}

export async function cerrarSesionAdmin(): Promise<void> {
  await clearAdminSessionCookie();
}
