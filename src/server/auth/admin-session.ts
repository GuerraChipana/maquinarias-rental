import crypto from "crypto";
import { cookies, headers } from "next/headers";

export const ADMIN_SESSION_COOKIE = "mavtec_admin_session";
const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8 horas

function getSigningKey(): Buffer | null {
  const secret = process.env.ADMIN_PASSWORD?.trim();
  if (!secret) return null;
  return crypto
    .createHash("sha256")
    .update(`mavtec-admin-session:${secret}`)
    .digest();
}

export function verifyAdminPassword(password: string): boolean {
  const correctPassword = process.env.ADMIN_PASSWORD;
  if (!correctPassword || !password) {
    return false;
  }

  try {
    const inputBuffer = Buffer.from(password.trim(), "utf8");
    const correctBuffer = Buffer.from(correctPassword.trim(), "utf8");

    if (inputBuffer.length !== correctBuffer.length) {
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

  const reqHeaders = await headers();
  const proto = reqHeaders.get("x-forwarded-proto");
  const origin = reqHeaders.get("origin");
  const isHttps =
    proto === "https" ||
    Boolean(origin?.startsWith("https://")) ||
    process.env.VERCEL === "1";

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: isHttps,
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
  const expiresAt = Number(expiresStr);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now() || !nonce) {
    return false;
  }

  const expectedSig = signSessionData(`${expiresStr}.${nonce}`, key);
  try {
    const sigBuf = Buffer.from(signature, "hex");
    const expectedBuf = Buffer.from(expectedSig, "hex");
    if (sigBuf.length === 0 || sigBuf.length !== expectedBuf.length) {
      return false;
    }
    return crypto.timingSafeEqual(sigBuf, expectedBuf);
  } catch {
    return false;
  }
}
