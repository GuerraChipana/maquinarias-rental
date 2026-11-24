const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

function getSiteUrl(): string | undefined {
  if (!configuredSiteUrl) return undefined;

  try {
    const parsed = new URL(configuredSiteUrl);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return undefined;
    return parsed.origin;
  } catch {
    return undefined;
  }
}

/**
 * Dominio canónico de producción.
 * Configurar NEXT_PUBLIC_SITE_URL en Vercel, por ejemplo https://www.tudominio.pe.
 * No se asume un dominio hasta que el propietario lo confirme.
 */
export const SITE_URL = getSiteUrl();

export function absoluteSiteUrl(path: string): string | undefined {
  if (!SITE_URL) return undefined;
  return new URL(path, SITE_URL).toString();
}
