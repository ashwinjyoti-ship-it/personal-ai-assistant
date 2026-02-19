// Simple credential encryption using Web Crypto API (available in CF Workers)
// Uses AES-GCM with a derived key from the user's PIN hash

const ALGO = 'AES-GCM';
const KEY_LENGTH = 256;

async function deriveKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret.padEnd(32, '0').slice(0, 32)),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: encoder.encode('karna-salt-v1'), iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: ALGO, length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encrypt(plaintext: string, secret: string): Promise<string> {
  const key = await deriveKey(secret);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const encrypted = await crypto.subtle.encrypt(
    { name: ALGO, iv },
    key,
    encoder.encode(plaintext)
  );
  // Combine IV + ciphertext, encode as base64
  const combined = new Uint8Array(iv.length + new Uint8Array(encrypted).length);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);
  return btoa(String.fromCharCode(...combined));
}

export async function decrypt(ciphertext: string, secret: string): Promise<string> {
  const key = await deriveKey(secret);
  const combined = new Uint8Array(atob(ciphertext).split('').map(c => c.charCodeAt(0)));
  const iv = combined.slice(0, 12);
  const data = combined.slice(12);
  const decrypted = await crypto.subtle.decrypt(
    { name: ALGO, iv },
    key,
    data
  );
  return new TextDecoder().decode(decrypted);
}

export async function hashPin(pin: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin + 'karna-pin-salt');
  const hash = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(hash)));
}

export async function verifyPin(pin: string, hash: string): Promise<boolean> {
  const computed = await hashPin(pin);
  return computed === hash;
}
