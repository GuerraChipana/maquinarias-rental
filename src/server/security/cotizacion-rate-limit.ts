import crypto from "node:crypto";

const WINDOW_SECONDS = 10 * 60;
const MAX_REQUESTS = 5;

type RateLimitResult =
  | { allowed: true; remaining: number }
  | { allowed: false; retryAfter: number };

function getClientIp(headers: Headers): string | null {
  const candidates = [
    headers.get("x-vercel-forwarded-for"),
    headers.get("x-real-ip"),
    headers.get("x-forwarded-for"),
  ];

  for (const candidate of candidates) {
    const ip = candidate?.split(",")[0]?.trim();
    if (ip && ip.length <= 128) return ip;
  }

  return null;
}

/**
 * Límite distribuido y atómico mediante Upstash Redis.
 * Falla de forma cerrada: si Redis no está configurado o no responde,
 * el endpoint no envía correos sin protección.
 */
export async function checkCotizacionRateLimit(
  headers: Headers,
): Promise<RateLimitResult | null> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  const clientIp = getClientIp(headers);

  if (!redisUrl || !redisToken || !clientIp) return null;

  const ipHash = crypto
    .createHmac("sha256", redisToken)
    .update(clientIp)
    .digest("hex");

  const key = `mavtec:rate:cotizacion:${ipHash}`;
  const script =
    "local count = redis.call('INCR', KEYS[1]); " +
    "if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]); end; " +
    "local ttl = redis.call('TTL', KEYS[1]); " +
    "return {count, ttl}";

  try {
    const response = await fetch(`${redisUrl.replace(/\/+$/, "")}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${redisToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["EVAL", script, "1", key, String(WINDOW_SECONDS)]),
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });

    if (!response.ok) return null;

    const data: unknown = await response.json();
    if (
      !data ||
      typeof data !== "object" ||
      !("result" in data) ||
      !Array.isArray(data.result)
    ) {
      return null;
    }

    const count = Number(data.result[0]);
    const ttl = Number(data.result[1]);
    if (!Number.isFinite(count) || !Number.isFinite(ttl)) return null;

    if (count > MAX_REQUESTS) {
      return { allowed: false, retryAfter: Math.max(1, ttl) };
    }

    return { allowed: true, remaining: Math.max(0, MAX_REQUESTS - count) };
  } catch {
    return null;
  }
}
