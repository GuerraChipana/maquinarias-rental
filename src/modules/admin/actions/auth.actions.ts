"use server";

import {
  verifyAdminPassword,
  createAdminSessionCookie,
  clearAdminSessionCookie,
} from "@/lib/admin-auth";

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
