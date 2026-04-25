import type { PasswordStrength } from '@/lib/types';

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return 'none';
  const hasLength = password.length >= 8;
  const hasMixed = /[A-Z]/.test(password) && /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const score = [hasLength, hasMixed, hasNumber, hasSymbol].filter(Boolean).length;
  if (score <= 1) return 'weak';
  if (score <= 2) return 'fair';
  return 'strong';
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
