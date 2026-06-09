import { createHash, timingSafeEqual } from "crypto";
import { DUMMY_PASSWORD_HASH, verifyPassword } from "@/lib/password";

export const ADMIN_SESSION_COOKIE = "rms_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

/** @deprecated Legacy SHA-256 hash — migrate to ADMIN_PASSWORD_HASH (scrypt). */
const LEGACY_PASSWORD_SHA256 = "7676aaafb027c825bd9abab78b234070e702752f625b752e55e55b48e607e358";

type AdminSessionPayload = {
  id: string;
  exp: number;
  iat: number;
  v: number;
};

const SESSION_VERSION = 2;

function getAdminUsername() {
  return (process.env.ADMIN_USERNAME ?? "admin").trim().toLowerCase();
}

function getPasswordHash(): string | null {
  const hash = process.env.ADMIN_PASSWORD_HASH?.trim();
  return hash && hash.length > 0 ? hash : null;
}

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();

  if (secret && secret.length >= 32) {
    return secret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "ADMIN_SESSION_SECRET must be set in production (minimum 32 characters). Generate with: openssl rand -base64 48",
    );
  }

  console.warn(
    "[admin-auth] ADMIN_SESSION_SECRET is not set. Using insecure development fallback. Set ADMIN_SESSION_SECRET before deploying.",
  );
  return "rms-dev-session-secret-do-not-use-in-production-32chars";
}

function toBase64Url(bytes: Uint8Array) {
  const base64 = Buffer.from(bytes).toString("base64");
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/u, "");
}

function fromBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  return new Uint8Array(Buffer.from(padded, "base64"));
}

async function importSessionKey() {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function legacySha256Hex(value: string) {
  if (typeof crypto?.subtle !== "undefined") {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  return createHash("sha256").update(value, "utf8").digest("hex");
}

function safeCompareHex(a: string, b: string) {
  try {
    const bufA = Buffer.from(a, "hex");
    const bufB = Buffer.from(b, "hex");
    if (bufA.length !== bufB.length) {
      return false;
    }
    return timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export async function verifyAdminCredentials(id: string, password: string) {
  const normalizedId = id.trim().toLowerCase();
  const normalizedPassword = password;
  const expectedUsername = getAdminUsername();
  const passwordHash = getPasswordHash();
  const usernameMatches = normalizedId === expectedUsername;

  let hashMatches = false;

  if (passwordHash) {
    const hashToVerify = usernameMatches ? passwordHash : DUMMY_PASSWORD_HASH;
    hashMatches = verifyPassword(normalizedPassword, hashToVerify);

    if (hashMatches && usernameMatches) {
      return true;
    }
  }

  if (!usernameMatches) {
    return false;
  }

  if (!passwordHash || !hashMatches) {
    console.warn(
      "[admin-auth] Using deprecated SHA-256 password verification. Set ADMIN_PASSWORD_HASH (scrypt) immediately.",
    );
  }

  const digest = await legacySha256Hex(normalizedPassword.trim());
  const passwordMatches = safeCompareHex(digest, LEGACY_PASSWORD_SHA256);

  return passwordMatches;
}

export async function createAdminSessionToken(id: string) {
  const now = Date.now();
  const payload: AdminSessionPayload = {
    id: id.trim().toLowerCase(),
    iat: now,
    exp: now + SESSION_TTL_SECONDS * 1000,
    v: SESSION_VERSION,
  };

  const payloadBytes = new TextEncoder().encode(JSON.stringify(payload));
  const payloadToken = toBase64Url(payloadBytes);
  const key = await importSessionKey();
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadToken));

  return `${payloadToken}.${toBase64Url(new Uint8Array(signature))}`;
}

export async function verifyAdminSessionToken(token?: string | null) {
  if (!token) {
    return false;
  }

  const [payloadToken, signatureToken] = token.split(".");
  if (!payloadToken || !signatureToken) {
    return false;
  }

  try {
    const key = await importSessionKey();
    const verified = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(signatureToken),
      new TextEncoder().encode(payloadToken),
    );

    if (!verified) {
      return false;
    }

    const parsed = JSON.parse(new TextDecoder().decode(fromBase64Url(payloadToken))) as AdminSessionPayload;
    return (
      parsed.id === getAdminUsername() &&
      parsed.exp > Date.now() &&
      parsed.v === SESSION_VERSION
    );
  } catch {
    return false;
  }
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

export function clearAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };
}

export { getAdminUsername };
