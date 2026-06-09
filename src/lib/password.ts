import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const KEY_LENGTH = 64;

export const MIN_ADMIN_PASSWORD_LENGTH = 12;

export type PasswordStrengthResult = {
  valid: boolean;
  errors: string[];
};

export function validatePasswordStrength(password: string): PasswordStrengthResult {
  const errors: string[] = [];

  if (password.length < MIN_ADMIN_PASSWORD_LENGTH) {
    errors.push(`Password must be at least ${MIN_ADMIN_PASSWORD_LENGTH} characters`);
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must include a lowercase letter");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must include an uppercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must include a number");
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("Password must include a special character");
  }

  return { valid: errors.length === 0, errors };
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, KEY_LENGTH, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
    maxmem: 128 * SCRYPT_N * SCRYPT_R * 2,
  });

  return `scrypt:${SCRYPT_N}:${SCRYPT_R}:${SCRYPT_P}:${salt.toString("hex")}:${hash.toString("hex")}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const parts = storedHash.split(":");
  if (parts.length !== 6 || parts[0] !== "scrypt") {
    return false;
  }

  const [, nStr, rStr, pStr, saltHex, hashHex] = parts;
  const n = Number.parseInt(nStr, 10);
  const r = Number.parseInt(rStr, 10);
  const p = Number.parseInt(pStr, 10);

  if (!Number.isFinite(n) || !Number.isFinite(r) || !Number.isFinite(p)) {
    return false;
  }

  try {
    const salt = Buffer.from(saltHex, "hex");
    const expected = Buffer.from(hashHex, "hex");
    const derived = scryptSync(password, salt, expected.length, {
      N: n,
      r,
      p,
      maxmem: 128 * n * r * 2,
    });

    if (expected.length !== derived.length) {
      return false;
    }

    return timingSafeEqual(expected, derived);
  } catch {
    return false;
  }
}

/** Precomputed dummy hash used to equalize timing when username is wrong. */
export const DUMMY_PASSWORD_HASH =
  "scrypt:16384:8:1:a1b2c3d4e5f60718293a4b5c6d7e8f90:00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
