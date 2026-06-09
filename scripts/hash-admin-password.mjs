#!/usr/bin/env node
/**
 * Generate a scrypt password hash for ADMIN_PASSWORD_HASH.
 *
 * Usage:
 *   node scripts/hash-admin-password.mjs "YourSecurePassword123!"
 *
 * Password requirements:
 *   - At least 12 characters
 *   - Uppercase, lowercase, number, and special character
 */

import { randomBytes, scryptSync } from "crypto";

const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const KEY_LENGTH = 64;
const MIN_LENGTH = 12;

function validate(password) {
  const errors = [];
  if (password.length < MIN_LENGTH) errors.push(`at least ${MIN_LENGTH} characters`);
  if (!/[a-z]/.test(password)) errors.push("a lowercase letter");
  if (!/[A-Z]/.test(password)) errors.push("an uppercase letter");
  if (!/[0-9]/.test(password)) errors.push("a number");
  if (!/[^A-Za-z0-9]/.test(password)) errors.push("a special character");
  return errors;
}

function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, KEY_LENGTH, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
    maxmem: 128 * SCRYPT_N * SCRYPT_R * 2,
  });
  return `scrypt:${SCRYPT_N}:${SCRYPT_R}:${SCRYPT_P}:${salt.toString("hex")}:${hash.toString("hex")}`;
}

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/hash-admin-password.mjs \"YourSecurePassword123!\"");
  process.exit(1);
}

const errors = validate(password);
if (errors.length > 0) {
  console.error("Password does not meet requirements. It must include:");
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

const hash = hashPassword(password);

console.log("\nAdd these to your .env.local (or hosting environment):\n");
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
console.log(`ADMIN_SESSION_SECRET=${randomBytes(48).toString("base64")}`);
console.log(`ADMIN_USERNAME=admin`);
console.log("\nNever commit these values to git.\n");
