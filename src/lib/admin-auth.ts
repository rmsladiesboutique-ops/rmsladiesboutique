export const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD_SHA256 = "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9";
export const ADMIN_SESSION_COOKIE = "rms_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

type AdminSessionPayload = {
  id: string;
  exp: number;
};

function getSessionSecret() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY ?? "rms-admin-session-secret-change-me";
}

function toBase64Url(bytes: Uint8Array) {
  if (typeof Buffer !== "undefined") {
    const base64 = Buffer.from(bytes).toString("base64");
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/u, "");
  }

  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/u, "");
}

function fromBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");

  if (typeof Buffer !== "undefined") {
    const buf = Buffer.from(padded, "base64");
    return new Uint8Array(buf);
  }

  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
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

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function verifyAdminCredentials(id: string, password: string) {
  if (id !== ADMIN_USERNAME) {
    return false;
  }

  return sha256Hex(password) === ADMIN_PASSWORD_SHA256;
}

export async function createAdminSessionToken(id: string) {
  const payload: AdminSessionPayload = {
    id,
    exp: Date.now() + SESSION_TTL_SECONDS * 1000,
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
    return parsed.id === ADMIN_USERNAME && parsed.exp > Date.now();
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
