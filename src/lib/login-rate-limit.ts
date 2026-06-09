type AttemptRecord = {
  count: number;
  firstAttemptAt: number;
  lockedUntil: number;
};

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 30 * 60 * 1000;

const attempts = new Map<string, AttemptRecord>();

function pruneExpired() {
  const now = Date.now();
  for (const [key, record] of attempts.entries()) {
    if (record.lockedUntil < now && now - record.firstAttemptAt > WINDOW_MS) {
      attempts.delete(key);
    }
  }
}

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds?: number;
  remainingAttempts?: number;
};

export function checkLoginRateLimit(clientKey: string): RateLimitResult {
  pruneExpired();
  const now = Date.now();
  const record = attempts.get(clientKey);

  if (!record) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  if (record.lockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((record.lockedUntil - now) / 1000),
    };
  }

  if (now - record.firstAttemptAt > WINDOW_MS) {
    attempts.delete(clientKey);
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  return {
    allowed: record.count < MAX_ATTEMPTS,
    remainingAttempts: Math.max(0, MAX_ATTEMPTS - record.count),
    retryAfterSeconds:
      record.count >= MAX_ATTEMPTS ? Math.ceil((record.lockedUntil - now) / 1000) : undefined,
  };
}

export function recordFailedLogin(clientKey: string) {
  pruneExpired();
  const now = Date.now();
  const record = attempts.get(clientKey);

  if (!record || now - record.firstAttemptAt > WINDOW_MS) {
    attempts.set(clientKey, { count: 1, firstAttemptAt: now, lockedUntil: 0 });
    return;
  }

  const nextCount = record.count + 1;
  attempts.set(clientKey, {
    count: nextCount,
    firstAttemptAt: record.firstAttemptAt,
    lockedUntil: nextCount >= MAX_ATTEMPTS ? now + LOCKOUT_MS : record.lockedUntil,
  });
}

export function clearLoginAttempts(clientKey: string) {
  attempts.delete(clientKey);
}

export function getLoginDelayMs(clientKey: string): number {
  const record = attempts.get(clientKey);
  if (!record || record.count === 0) {
    return 0;
  }
  return Math.min(8000, 500 * 2 ** Math.min(record.count - 1, 4));
}

export function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  return ip;
}
