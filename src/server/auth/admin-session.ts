import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "mavtec_admin_session";
const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8 horas
const NONCE_PATTERN = /^[a-f0-9]{32}$/;
const SIGNATURE_PATTERN = /^[a-f0-9]{64}$/;

function getSigningKey(): Buffer | null {
  const secret = process.env.ADMIN_PASSWORD?.trim();
  if (!secret) return null;

  return crypto
    .createHash("sha256")
    .update(`mavtec-admin-session:${secret}`)
    .digest();
}

export function verifyAdminPassword(password: string): boolean {
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (
    typeof password !== "string" ||
    password.length > 1024 ||
    !configuredPassword
  ) {
    return false;
  }

  try {
    const inputBuffer = Buffer.from(password.trim(), "utf8");
    const correctBuffer = Buffer.from(configuredPassword.trim(), "utf8");

    if (inputBuffer.length === 0 || inputBuffer.length !== correctBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(inputBuffer, correctBuffer);
  } catch {
    return false;
  }
}

function signSessionData(data: string, key: Buffer): string {
  return crypto.createHmac("sha256", key).update(data).digest("hex");
}

export async function createAdminSessionCookie(): Promise<void> {
  const key = getSigningKey();
  if (!key) {
    throw new Error("ADMIN_PASSWORD no configurada en el servidor");
  }

  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const nonce = crypto.randomBytes(16).toString("hex");
  const payload = `${expiresAt}.${nonce}`;
  const signature = signSessionData(payload, key);
  const token = `${payload}.${signature}`;

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || process.env.VERCEL === "1",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const key = getSigningKey();
  if (!key) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [expiresStr, nonce, signature] = parts;
  if (
    !/^\d+$/.test(expiresStr) ||
    !NONCE_PATTERN.test(nonce) ||
    !SIGNATURE_PATTERN.test(signature)
  ) {
    return false;
  }

  const expiresAt = Number(expiresStr);
  if (
    !Number.isSafeInteger(expiresAt) ||
    expiresAt <= Date.now() ||
    expiresAt > Date.now() + SESSION_TTL_SECONDS * 1000
  ) {
    return false;
  }

  const expectedSig = signSessionData(`${expiresStr}.${nonce}`, key);
  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedSig, "hex");

  return (
    signatureBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  );
}
