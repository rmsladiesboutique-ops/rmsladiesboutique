import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminCookieOptions,
  verifyAdminCredentials,
} from "@/lib/admin-auth";
import {
  checkLoginRateLimit,
  clearLoginAttempts,
  getClientKey,
  getLoginDelayMs,
  recordFailedLogin,
} from "@/lib/login-rate-limit";

const GENERIC_ERROR = "Invalid credentials. Please try again.";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  const rateLimit = checkLoginRateLimit(clientKey);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: `Too many failed attempts. Try again in ${rateLimit.retryAfterSeconds ?? 60} seconds.`,
        retryAfterSeconds: rateLimit.retryAfterSeconds,
      },
      {
        status: 429,
        headers: rateLimit.retryAfterSeconds
          ? { "Retry-After": String(rateLimit.retryAfterSeconds) }
          : undefined,
      },
    );
  }

  const body = (await request.json().catch(() => null)) as { id?: string; password?: string } | null;
  const id = body?.id ?? "";
  const password = body?.password ?? "";

  if (!id.trim() || !password) {
    recordFailedLogin(clientKey);
    await sleep(getLoginDelayMs(clientKey));
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
  }

  const valid = await verifyAdminCredentials(id, password);

  if (!valid) {
    recordFailedLogin(clientKey);
    await sleep(getLoginDelayMs(clientKey));
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
  }

  clearLoginAttempts(clientKey);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    await createAdminSessionToken(id),
    getAdminCookieOptions(),
  );

  return response;
}
