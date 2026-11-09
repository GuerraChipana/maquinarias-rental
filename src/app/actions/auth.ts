'use server';

export async function verificarPasswordAdmin(password: string) {
  // Compara la contraseña enviada con la variable de entorno privada
  const correctPassword = process.env.ADMIN_PASSWORD;
  
  if (!correctPassword) {
    console.error("Falta configurar ADMIN_PASSWORD en el archivo .env");
    return false;
  }

  return password === correctPassword;
}